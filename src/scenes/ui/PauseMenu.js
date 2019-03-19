import {Scene, Geom} from 'phaser';

const {Rectangle} = Geom;

class PauseMenu extends Scene {
  constructor() {
    super('ui-pause-menu');
  }

  toggleTargetingMode() {
    const {targeting} = this.game.flags;
    this.game.flags.targeting = (targeting === 'front-and-back' ? 'front-only' : 'front-and-back');
    this.targetingBtn.setText(this.game.flags.targeting);
  }

  closePauseMenu() {
    this.tweens.add({
      targets: this.gfxBG,
      alpha: 0,
      ease: 'Power1',
      duration: 200,
      yoyo: false,
      repeat: 0,
      onComplete: () => {
        this.scene.resume('africa-camp');
        this.scene.stop();
      }
    });

    this.tweens.add({
      targets: this.mainTitle,
      alpha: 0,
      ease: 'Power1',
      duration: 200,
      yoyo: false,
      repeat: 0
    });

    this.tweens.add({
      targets: this.targetingTitle,
      alpha: 0,
      ease: 'Power1',
      duration: 200,
      yoyo: false,
      repeat: 0
    });

    this.tweens.add({
      targets: this.targetingBtn,
      alpha: 0,
      ease: 'Power1',
      duration: 200,
      yoyo: false,
      repeat: 0
    });

    this.tweens.add({
      targets: this.closeBtn,
      alpha: 0,
      ease: 'Power1',
      duration: 200,
      yoyo: false,
      repeat: 0
    });
  }

  create() {
    const bgRect = new Rectangle(0, 0, window.innerWidth, window.innerHeight);

    this.gfxBG = this.add.graphics({
      x: 0,
      y: 0,
      fillStyle: { color: 0x000000 }
    });
    this.gfxBG.setScrollFactor(0);
    this.gfxBG.setAlpha(0);

    this.gfxBG.fillRectShape(bgRect);

    this.mainTitle = this.add.text(window.innerWidth, 80, 'MENU', {
      fontFamily: 'Sans Serif',
      fontSize: 42,
      color: '#FFF',
      stroke: '#000',
      strokeThickness: 3,
      align: 'right',
      padding: 40,
      wordWrap: {
        width: window.innerWidth,
        useAdvancedWrap: true
      }
    });
    this.mainTitle.setOrigin(1, 0.5);
    this.mainTitle.setScrollFactor(0);
    this.mainTitle.setAlpha(0);

    this.targetingTitle = this.add.text(window.innerWidth, 160, 'EXPERIMENTAL TARGETING MODE:', {
      fontFamily: 'Sans Serif',
      fontSize: 18,
      color: '#FFF',
      stroke: '#000',
      strokeThickness: 3,
      align: 'right',
      padding: 40,
      wordWrap: {
        width: window.innerWidth,
        useAdvancedWrap: true
      }
    });
    this.targetingTitle.setOrigin(1, 0.5);
    this.targetingTitle.setScrollFactor(0);
    this.targetingTitle.setAlpha(0);

    this.targetingBtn = this.add.text(window.innerWidth, 190, this.game.flags.targeting, {
      fontFamily: 'Sans Serif',
      fontSize: 24,
      color: '#FFF',
      stroke: '#000',
      strokeThickness: 3,
      align: 'right',
      padding: 40,
      wordWrap: {
        width: window.innerWidth,
        useAdvancedWrap: true
      }
    });
    this.targetingBtn.setOrigin(1, 0.5);
    this.targetingBtn.setScrollFactor(0);
    this.targetingBtn.setAlpha(0);
    this.targetingBtn.setInteractive();
    this.targetingBtn.on('pointerdown', this.toggleTargetingMode, this);

    this.closeBtn = this.add.text(window.innerWidth, window.innerHeight - 80, 'CLOSE MENU', {
      fontFamily: 'Sans Serif',
      fontSize: 24,
      color: '#FFF',
      stroke: '#000',
      strokeThickness: 3,
      align: 'right',
      padding: 40,
      wordWrap: {
        width: window.innerWidth,
        useAdvancedWrap: true
      }
    });
    this.closeBtn.setOrigin(1, 0.5);
    this.closeBtn.setScrollFactor(0);
    this.closeBtn.setAlpha(0);
    this.closeBtn.setInteractive();
    this.closeBtn.on('pointerdown', this.closePauseMenu, this);


    // Animate in (tweens)
    this.tweens.add({
      targets: this.gfxBG,
      alpha: 0.75,
      ease: 'Power1',
      duration: 200,
      yoyo: false,
      repeat: 0
    });

    this.tweens.add({
      targets: this.mainTitle,
      alpha: 1,
      ease: 'Power1',
      duration: 200,
      yoyo: false,
      repeat: 0
    });

    this.tweens.add({
      targets: this.targetingTitle,
      alpha: 1,
      ease: 'Power1',
      duration: 200,
      yoyo: false,
      repeat: 0
    });

    this.tweens.add({
      targets: this.targetingBtn,
      alpha: 1,
      ease: 'Power1',
      duration: 200,
      yoyo: false,
      repeat: 0
    });

    this.tweens.add({
      targets: this.closeBtn,
      alpha: 1,
      ease: 'Power1',
      duration: 200,
      yoyo: false,
      repeat: 0
    });
  }

  update() {
    
  }
}

export default PauseMenu;