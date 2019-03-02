import {GameObjects} from 'phaser';

const {Sprite} = GameObjects;

class NPC extends Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);

    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.setTexture(config.texture);
  }
}

export default NPC;