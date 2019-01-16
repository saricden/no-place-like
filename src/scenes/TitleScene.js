import {Scene, GameObjects} from 'phaser';

class TitleScene extends Scene {
  constructor() {
    super('title-scene');
  }

  create() {
    // Set the background
    this.cameras.main.setBackgroundColor('#FFF'); 

    // Place the logo
    var logoX = window.innerWidth / 2
    var logoY = (window.innerHeight / 2)
    this.add.image(logoX, logoY, 'logo').setScale(0.5)
  }

}

export default TitleScene;