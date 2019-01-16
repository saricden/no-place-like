import {Scene, GameObjects} from 'phaser';

class TitleScene extends Scene {
  constructor() {
    super('title-scene');
  }

  create() {
    // Set the background
    this.cameras.main.setBackgroundColor('#FFF');

    // Positioning helper vars
    const centerX = (window.innerWidth / 2);
    const centerY = (window.innerHeight / 2);
    const uiX = (window.innerWidth - 50);

    // Place robo
    const robo = this.add.image(0, 0, 'title-robo');
    robo.setOrigin(0.5, 1);
    robo.setScale(0.75);
    
    const roboStartY = (centerY + robo.displayHeight - 200);
    const roboEndY = centerY;

    robo.setPosition(centerX, roboStartY);

    // Place logo
    const logoStartY = (window.innerHeight + robo.displayHeight - 200);
    const logoEndY = (window.innerHeight - 200);
    const logoWidth = (window.innerWidth - 200);
    const logoScalar = ((logoWidth / window.innerWidth) - 0.25); // TODO: Figure out actual math here, not just 0.25

    const logo = this.add.image(uiX, logoStartY, 'logo');
    logo.setOrigin(1, 1);
    logo.setScale(logoScalar);

    // Place new game button
    const newGameBtnStartY = (window.innerHeight + robo.displayHeight - 175);
    const newGameBtnEndY = (window.innerHeight - 175);
    
    const newGameBtn = this.add.image(uiX, newGameBtnStartY, 'new-game-btn');
    newGameBtn.setOrigin(1, 0.5);
    newGameBtn.setScale(0.5);

    // Place load game button
    const loadGameBtnStartY = (window.innerHeight + robo.displayHeight - 90);
    const loadGameBtnEndY = (window.innerHeight - 90);
    
    const loadGameBtn = this.add.image(uiX, loadGameBtnStartY, 'load-game-btn');
    loadGameBtn.setOrigin(1, 0.5);
    loadGameBtn.setScale(0.5);


    // Start tweening
    this.tweens.add({
      targets: robo,
      y: roboEndY,
      ease: 'Power1',
      duration: 12000,
      yoyo: false,
      repeat: 0
    });

    this.tweens.add({
      targets: logo,
      y: logoEndY,
      ease: 'Power1',
      duration: 14000,
      yoyo: false,
      repeat: 0
    });

    this.tweens.add({
      targets: newGameBtn,
      y: newGameBtnEndY,
      ease: 'Power1',
      duration: 14000,
      yoyo: false,
      repeat: 0
    });

    this.tweens.add({
      targets: loadGameBtn,
      y: loadGameBtnEndY,
      ease: 'Power1',
      duration: 14000,
      yoyo: false,
      repeat: 0
    });
  }

}

export default TitleScene;