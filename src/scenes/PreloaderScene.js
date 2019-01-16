import {Scene} from 'phaser';

class PreloaderScene extends Scene {
  constructor() {
    super('preloader-scene');
  }

  preload() {
    // Called first, used to load assets
    this.load.image('logo', 'assets/images/logo.png')
    this.load.image('test', 'assets/images/test.jpg')

    let loadingBar = this.add.graphics({
      fillStyle :{
        color: 0xffffff
      }
    });

    //Test the progress bar
    for(let i = 0; i < 100; i++){
      this.load.image('test' + i, 'assets/images/test.jpg')
    }

    this.load.on("progress", (percent) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
    });

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