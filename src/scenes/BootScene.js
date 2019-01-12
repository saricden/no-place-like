import {Scene} from 'phaser';

class BootScene extends Scene {
  
  preload() {

  }

  create() {
    console.log('Boot active!');
    this.scene.start('preloader-scene');
  }
}

export default BootScene;