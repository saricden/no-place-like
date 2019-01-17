import {Scene} from 'phaser';

class PreloaderScene extends Scene {
  constructor() {
    super('preloader-scene');
  }

  preload() {
    // Called first, used to load assets
    this.load.image('logo', 'assets/images/logo.png');
    this.load.image('title-robo', 'assets/images/title-robo.png');
    this.load.image('new-game-btn', 'assets/images/new-game-btn.png');
    this.load.image('load-game-btn', 'assets/images/load-game-btn.png');
    this.load.image('title-hill1', 'assets/images/title-hill1.png');
  }

  create() {
    // Called after preload, used to initialize your scene
    this.scene.start('title-scene');
  }

  // update() {
  //   // Called repeatedly every frame
  // }
}

export default PreloaderScene;