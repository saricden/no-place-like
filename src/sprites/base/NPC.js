import {GameObjects} from 'phaser';

const {Sprite} = GameObjects;

class NPC extends Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);

    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.setTexture(config.texture);

    this.dialog = config.dialog;
    this.scene = config.scene;
  }

  readDialog(key, index = 0) {
    // Read through dialogs in order, until stop property is detected
    const line = this.dialog[key].say[index];
    this.scene.showSubtitle(line).then(() => {
      if (typeof this.dialog[key].say[index + 1] !== 'undefined') {
        this.readDialog(key, index + 1);
      }
      else if (typeof this.dialog[key].say[index + 2] === 'undefined' && this.dialog[key].isQuestion) {
        this.scene.showQuestion(line, this.dialog[key].answers, this).then((answer) => {
        });
      }
    });
  }

  readRandom() {
    // Randomly select a dialog key, and read it.
  }
}

export default NPC;