import {GameObjects} from 'phaser';

const {Sprite} = GameObjects;

class Enemy extends Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);

    // Add self to scene's physics
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.setTexture(config.texture);
    
    this.maxHP = config.maxHP;
    this.hp = this.maxHP;
  }

  damageOrKill(damage) {
    this.hp -= damage;

    if (this.isDead()) {
      this.die();
      return true;
    }

    return false;
  }

  die() {
    this.setActive(false);
    this.setVisible(false);
  }

  isDead() {
    return (this.hp <= 0);
  }
}

export default Enemy;