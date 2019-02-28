import Enemy from '../../base/Enemy';

class JumperBot extends Enemy {
  constructor(config) {
    super({
      ...config,
      texture: 'jump-blaster',
      maxHP: 50
    });

    // Config
    this.maxSpeed = 100;
    this.jumpHeight = 600;

    // Setup physics properties
    this.body.setSize(939, 848);
    this.setScale(0.1);
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

  attack() {
    const headsOrTails = (Math.random() > 0.5);
    this.jump(headsOrTails);
  }

  update() {
    if (this.body.blocked.down) {
      this.attack();
    }
  }
}

export default JumperBot;