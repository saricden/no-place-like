import {GameObjects} from 'phaser';

const {Sprite} = GameObjects;

class JumperBot extends Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);

    // Add self to scene's physics
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.setTexture('jump-blaster');

    // Config
    this.maxSpeed = 100;
    this.jumpHeight = 600;
    this.maxHP = 50;
    this.hp = this.maxHP;

    // Setup physics properties
    this.body.setSize(939, 848);
    this.setScale(0.1);
  }

  damageOrKill(damage) {
    this.hp -= damage;

    if (this.isDead()) {
      this.setActive(false);
      this.setVisible(false);
      return true;
    }

    return false;
  }

  isDead() {
    return (this.hp <= 0);
  }

  jump(coinToss) {
    const randomVelocity = (Math.random() * 100);
    this.body.setVelocityY(-600);
    if (coinToss) {
      this.body.setVelocityX(randomVelocity);
      this.setFlipX(true);
    }
    else {
      this.body.setVelocityX(-randomVelocity);
      this.setFlipX(false);
    }
  }

  jumpRandom() {
    const headsOrTails = (Math.random() > 0.5);
    this.jump(headsOrTails);
  }

  update() {
    if (this.body.blocked.down) {
      this.jumpRandom();
    }
  }
}

export default JumperBot;