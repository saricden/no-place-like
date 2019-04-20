import {GameObjects} from 'phaser';

const {Sprite} = GameObjects;

class Item extends Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);

    // Add self to scene's physics
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.setTexture(config.texture);

    this.isUI = false;
  }
}

export default Item;