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

  readDialog(key) {
    // Read through dialogs in order, until stop property is detected
    const blurb = this.dialog[key];
    this.scene.showSubtitle(blurb);
  }

  readRandom() {
    // Randomly select a dialog key, and read it.
  }
}

export default NPC;