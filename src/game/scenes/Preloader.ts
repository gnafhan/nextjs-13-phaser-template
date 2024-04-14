import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {}

  preload() {
    this.load.image("tiles", "dung1.png");
    this.load.tilemapTiledJSON("dungeon", "dung.json");

    this.load.atlas("faune", "character/fauna.png", "character/fauna.json");
  }

  create() {
    this.scene.start("game");
  }
}
