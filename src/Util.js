const Canvas = require("canvas");
const jimp = require("jimp");
Canvas.registerFont("./assets/NotoSans-Bold.ttf", { family: "Noto Sans" });

class Utils {
  constructor() {
    console.log("Helper class booted up!");
  }

  async welcome(member, { bgimg, shadow, theme, blur } = {}) {
    blur !== false ? (blur = true) : blur;
    if (!bgimg) {
      throw new Error("A background img must be provided");
    }
    if (!shadow) {
      shadow = false;
    }
    if (!theme) {
      theme = "light";
    }
    if (!blur) {
      blur = false;
    }

    if (shadow === false) {
      shadow = "transparent";
    } else if (shadow === true) {
      shadow = "#000000";
    } else {
      throw new TypeError("Shdow must be a boolean");
    }

    var color = "#191919";

    if (theme === "light") {
      color = "#e3e3e3";
    } else if (theme === "dark") {
      color = "#191919";
    } else {
      throw new TypeError('Theme must be "dark" or "light" ');
    }

    const canvas = Canvas.createCanvas(1024, 420);

    const context = canvas.getContext("2d");

    if (blur === true) {
      const background = await jimp.read(bgimg);

      background.blur(5);

      let mraw = await background.getBufferAsync("image/png");

      const fixedbkg = await Canvas.loadImage(mraw);

      context.drawImage(fixedbkg, 16, 7, canvas.width, canvas.height);
      context.save();
    } else if (blur === false) {
      const fixedbkg = await Canvas.loadImage(bgimg);

      context.drawImage(fixedbkg, 0, 0, canvas.width, canvas.height);
      context.save();
    }

    context.beginPath();
    context.arc(496, 150, 100, 0, Math.PI * 2, true);
    context.shadowColor = shadow;
    context.shadowBlur = 100;
    context.lineWidth = 0;
    context.shadowOffsetX = 1;
    context.shadowOffsetY = 1;
    context.stroke();
    context.save();
    context.closePath();
    context.clip();

    const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({
        dynamic: false,
        format: "png",
        size: 4096,
      })
    );
    const user = member.user.username;
    const name = user.length > 12 ? user.substring(0, 12).trim() + "..." : user;

    context.strokeRect(0, 0, canvas.width, canvas.height);
    context.drawImage(avatar, 396, 50, 200, 200);
    context.restore();
    context.font = `48px 'Noto Sans'`;
    context.fillStyle = color;
    context.shadowOffsetX = 1;
    context.shadowOffsetY = 1;
    context.textAlign = "center";
    context.fillText(`${name} #${member.user.discriminator}`, 526, 315);

    const { guild } = member;
    context.font = `38px 'Noto Sans'`;
    context.fillStyle = color;
    context.fillText(`Member # ${guild.memberCount}`, 496, 378);

    return canvas.toBuffer();
  }
}

module.exports = Utils;