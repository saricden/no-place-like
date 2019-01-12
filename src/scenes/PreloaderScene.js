import {Scene} from 'phaser';

class PreloaderScene extends Scene {
  constructor() {
    super('preloader-scene');
  }

  preload() {
    // Called first, used to load assets
    this.load.image('logo', 'assets/images/logo.png');
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