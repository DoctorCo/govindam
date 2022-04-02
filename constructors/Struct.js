const Canvas = require("canvas");
const jimp = require("jimp");

Canvas.registerFont("assets/Poppins-Bold.ttf", { family: "Poppins" });
Canvas.registerFont("assets/Quicksand-Bold.ttf", { family: "Quicksand" });

module.exports = class Struct {
  static async welcome(member, { bgimg, shadow, theme, blur } = {}) {
    blur !== false ? (blur = true) : blur;

    if (!bgimg) throw new Error("A background img must be provided");
    if (!shadow) shadow = false;
    if (!theme) theme = "light";
    if (!blur) blur = false;

    if (!shadow) {
      shadow = "transparent";
    } else if (shadow) {
      shadow = "#000000";
    } else throw new TypeError("Shdow must be a boolean");

    var color;

    if (theme === "light") {
      color = "#e3e3e3";
    } else if (theme === "dark") {
      color = "#191919";
    } else {
      throw new TypeError('Theme must be "dark" or "light" ');
    }

    const canvas = Canvas.createCanvas(1024, 420);
    const context = canvas.getContext("2d");

    if (blur) {
      const background = await jimp.read(bgimg);
      background.blur(3);

      const fixedbkg = await Canvas.loadImage(
        await background.getBufferAsync("image/png")
      );

      context.drawImage(fixedbkg, 0, 0, canvas.width, canvas.height);
      context.save();
    } else if (!blur) {
      const fixedbkg = await Canvas.loadImage(bgimg);
      await background.getBufferAsync("image/png");

      context.drawImage(fixedbkg, 0, 0, canvas.width, canvas.height);
      context.save();
    }

    context.beginPath();
    context.arc(496, 150, 100, 0, Math.PI * 2, true);
    context.shadowColor = shadow;
    context.shadowBlur = 100;
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
    const user = member.user.username || member.nickname;
    const name = user.length > 12 ? user.substring(0, 12).trim() + "..." : user;

    context.strokeRect(0, 0, canvas.width, canvas.height);
    context.drawImage(avatar, 396, 50, 200, 200);
    context.restore();
    context.font = `48px 'Quicksand'`;
    context.fillStyle = color;
    context.textAlign = "center";
    context.fillText(`${name} #${member.user.discriminator}`, 526, 315);

    const { guild } = member;
    context.font = `32px 'Poppins'`;
    context.fillStyle = color;
    context.fillText(`Member #${guild.memberCount}`, 496, 378);

    return canvas.toBuffer();
  }
};
