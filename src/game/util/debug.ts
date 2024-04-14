import Phaser from "phaser";

const debugDraw = (wall: Phaser.Tilemaps.TilemapLayer, scene: Phaser.Scene) => {
  const debugGraphic = scene.add.graphics().setAlpha(0.7);
  wall.renderDebug(debugGraphic, {
    tileColor: null, // Color for non
    collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    faceColor: new Phaser.Display.Color(40, 39, 37, 255),
  });
};

function resize(game) {
  let canvas = document.querySelector("canvas");
  let width = document.querySelector("#game-container").clientWidth;
  let height = window.innerHeight;
  var wratio = width / height,
    ratio = canvas.width / canvas.height;

  if (wratio < ratio) {
    canvas.style.width = width + "px";
    canvas.style.height = width / ratio + "px";
  } else {
    canvas.style.width = height * ratio + "px";
    canvas.style.height = height + "px";
  }
}

function toggleFullScreen() {
  let canvas = document.querySelector("canvas");
  console.log(canvas);
  if (!document.fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) {
      canvas.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
  screen.orientation.lock("landscape");
}

export { debugDraw, resize, toggleFullScreen };
