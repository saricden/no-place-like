import Enemy from '../../base/Enemy';

class RotatorBot extends Enemy {
  constructor(config) {
    super({
      ...config,
      texture: 'rotator-enemy',
      maxHP: 1
    });

    // Config
    this.speed = 25;
    this.direction = null;
    this.wasGoingUp = false;
    this.wasGoingRight = true;

    // Physics stuff
    this.body.setSize(593, 560);
    this.setScale(0.15);
  }

  update() {
    const {blocked} = this.body;
    
    // Disable gravity on touchdown and start movement
    if (!blocked.none && this.direction === null) {
      this.body.setAllowGravity(false);
      this.direction = 'left';
    }

    if (blocked.left || blocked.right) {
      this.direction = (this.wasGoingUp ? 'down' : 'up');
      this.wasGoingUp = !this.wasGoingUp;
    }
    else if (blocked.up || blocked.down) {
      this.direction = (this.wasGoingRight ? 'left' : 'right');
      this.wasGoingRight = !this.wasGoingRight;
    }

    switch (this.direction) {
      case 'left':
        this.body.setVelocityX(-this.speed);
        this.body.setVelocityY(0);
      break;
      case 'right':
        this.body.setVelocityX(this.speed);
        this.body.setVelocityY(0);
      break;
      case 'up':
        this.body.setVelocityX(0);
        this.body.setVelocityY(-this.speed);
      break;
      case 'down':
        this.body.setVelocityX(0);
        this.body.setVelocityY(this.speed);
      break;
    }
    
    this.setRotation(this.rotation + (this.speed / 2));

  }

  attack(mc) {
    mc.hp--;
    // eventually he'll explode
  }

}

export default RotatorBot;