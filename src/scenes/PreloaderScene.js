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
    this.load.image('dummy-platform', 'assets/images/dummy/dummy-platform.png');

    this.load.multiatlas('mc-africa', 'assets/images/sprites/mc-africa/packed/mc-africa.json', 'assets/images/sprites/mc-africa/packed');

    this.load.image('basic-tiles', 'assets/images/tilemaps/basic.png');
    this.load.tilemapTiledJSON('africa-camp-map', 'assets/maps/africa-camp.json');


    let loadingBar = this.add.graphics({
      fillStyle :{
        color: 0xffffff
      }
    });

    this.load.on('progress', (percent) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
    });
  }

  create() {
    // Called after preload, used to initialize your scene
    if (typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'development') {
      // Replace this w/ whatever scene you're working on
      this.scene.start('africa-camp');
    }
    else {
      // In production start on the title screen
      this.scene.start('title-scene');
    }
  }

  // update() {
  //   // Called repeatedly every frame
  // }
}

export default PreloaderScene;
