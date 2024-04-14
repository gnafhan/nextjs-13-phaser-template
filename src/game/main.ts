import { Boot } from "./scenes/Boot";
import { Game } from "./scenes/Game";
import { GameOver } from "./scenes/GameOver";
import { MainMenu } from "./scenes/MainMenu";
import Phaser, { Scale } from "phaser";
import { Preloader } from "./scenes/Preloader";
import { First } from "./scenes/First";

export const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 250,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0, x: 0 },
      debug: true,
    },
  },
  scale: {
    mode: Scale.ZOOM_2X,
    autocenter: Scale.CENTER_BOTH,
  },
  parent: "game-container",
  backgroundColor: "#028af8",
  scene: [Preloader, Game],
};

const StartGame = (parent) => {
  return new Phaser.Game({ ...config, parent });
};

export default StartGame;
