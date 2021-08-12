import {Scene} from 'phaser';

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

    // Configure the 'mist' gradient
    const mistTexture = this.textures.createCanvas('mist-gradient', window.innerWidth, (robo.displayHeight / 2));
    const mistSrc = mistTexture.getSourceImage();
    const mistContext = mistSrc.getContext('2d');
    const mistGradient = mistContext.createLinearGradient(0, 0, 0, (robo.displayHeight / 2));
    mistGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    mistGradient.addColorStop(1, 'rgba(255, 255, 255, 1)');
    mistContext.fillStyle = mistGradient;
    mistContext.fillRect(0, 0, window.innerWidth, (robo.displayHeight / 2));

    mistTexture.refresh();

    // Place the 'mist' image
    const mistX = 0;
    const mistStartY = roboStartY;
    const mistEndY = roboEndY;

    const mistImage = this.add.image(mistX, mistStartY, "mist-gradient");
    mistImage.setOrigin(0, 1);

    // Place hill w/ person
    const hill1StartY = (robo.displayHeight + centerY);
    const hill1EndY = (centerY);
    const hill1X = centerX;

    const hill1 = this.add.image(hill1X, hill1StartY, 'title-hill1');
    hill1.setScale(0.6);

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
    
    const newGameBtn = this.physics.add.sprite(uiX, newGameBtnStartY, 'new-game-btn');
    newGameBtn.setOrigin(1, 0.5);
    newGameBtn.setScale(0.5);
    newGameBtn.body.setAllowGravity(false);

    // Place load game button
    const loadGameBtnStartY = (window.innerHeight + robo.displayHeight - 90);
    const loadGameBtnEndY = (window.innerHeight - 90);
    
    const loadGameBtn = this.add.image(uiX, loadGameBtnStartY, 'load-game-btn');
    loadGameBtn.setOrigin(1, 0.5);
    loadGameBtn.setScale(0.5);


    // Start tweening
    let robot = this.tweens.add({
      targets: robo,
      y: roboEndY,
      ease: 'Power1',
      duration: 12000,
      yoyo: false,
      repeat: 0
    });

    let mist = this.tweens.add({
      targets: mistImage,
      y: mistEndY,
      ease: 'Power1',
      duration: 12000,
      yoyo: false,
      repeat: 0
    });

   let hill = this.tweens.add({
      targets: hill1,
      y: hill1EndY,
      ease: 'Power1',
      duration: 14000,
      yoyo: false,
      repeat: 0
    });

    let icon = this.tweens.add({
      targets: logo,
      y: logoEndY,
      ease: 'Power1',
      duration: 15000,
      yoyo: false,
      repeat: 0
    });

    let newgame = this.tweens.add({
      targets: newGameBtn,
      y: newGameBtnEndY,
      ease: 'Power1',
      duration: 15000,
      yoyo: false,
      repeat: 0
    });

    let loadgame = this.tweens.add({
      targets: loadGameBtn,
      y: loadGameBtnEndY,
      ease: 'Power1',
      duration: 15000,
      yoyo: false,
      repeat: 0
    });
    
    this.input.on('pointerdown', function () {
        robot.seek(1);
        mist.seek(1);
        hill.seek(1);
        icon.seek(1);
        newgame.seek(1);
        loadgame.seek(1);
    });

    // UI Functionality
    newGameBtn.setInteractive();
    newGameBtn.on('pointerdown', this.newGame.bind(this));
    loadGameBtn.setInteractive();
    loadGameBtn.on('pointerdown', this.loadGame.bind(this));
  }

  newGame() {
    this.scene.start('africa-camp');
  }

  loadGame() {
    this.scene.start('level-level1');
  }

}

export default TitleScene;
