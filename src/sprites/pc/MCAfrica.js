import {GameObjects} from 'phaser';
import {ui} from '../../config';
const {Sprite} = GameObjects;
const {edgeWidth, nudgeThreshold} = ui;

class PC extends Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);

    // Add self to scene's physics
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    this.setTexture('mc-africa');

    // Config
    this.speed = 200;
    this.jumpHeight = 350;

    // Variables
    this.persistentVelocityX = 0;
    this.pointer1DownY = null;

    // Setup physics properties
    this.body.setBounce(0);
    this.body.setSize(60, 260);
    this.setScale(0.5);

    // Setup sprite animations
    this.scene.anims.create({
      key: 'idle',
      frames: this.scene.anims.generateFrameNames('mc-africa', {prefix: 'idle/', start: 1, end: 4, zeroPad: 2, suffix: '.png'}),
      frameRate: 3,
      repeat: -1
    });
    this.scene.anims.create({
      key: 'run',
      frames: this.scene.anims.generateFrameNames('mc-africa', {prefix: 'run/', start: 1, end: 16, zeroPad: 2, suffix: '.png'}),
      frameRate: 18,
      repeat: -1
    });
    this.scene.anims.create({
      key: 'up',
      frames: this.scene.anims.generateFrameNames('mc-africa', {prefix: 'up/', start: 1, end: 5, zeroPad: 2, suffix: '.png'}),
      frameRate: 12,
      repeat: -1
    });
    this.scene.anims.create({
      key: 'down',
      frames: this.scene.anims.generateFrameNames('mc-africa', {prefix: 'down/', start: 1, end: 4, zeroPad: 2, suffix: '.png'}),
      frameRate: 8,
      repeat: -1
    });

    // Init arrow keys
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  update() {
    const touchingGround = this.body.blocked.down;
    const touchingWall = (this.body.blocked.left || this.body.blocked.right);
    const {pointer1, pointer2} = this.scene.input;
    const {left, right, up} = this.cursors;

    /* COMPUTER CONTROLS
    ------------------------------------------- */
    if (touchingGround) {
      // Player left-right control logic
      if (left.isDown) {
        this.body.setVelocityX(-this.speed);
        this.setFlipX(true);
      }
      else if (right.isDown) {
        this.body.setVelocityX(this.speed);
        this.setFlipX(false);
      }
      else {
        this.body.setVelocityX(0);
      }

      // Player jump logic
      if (up.isDown) {
        this.body.setVelocityY(-this.jumpHeight);
      }

      // Persist X velocity
      this.persistentVelocityX = this.body.velocity.x;
    }

    

    /* TOUCH CONTROLS
    ------------------------------------------- */
    if (touchingGround && pointer1.isDown) {
      // Player left-right control logic
      const touchingLeftEdge = (pointer1.position.x <= edgeWidth);
      const touchingRightEdge = (pointer1.position.x >= window.innerWidth - edgeWidth);

      if (touchingLeftEdge) {
        this.body.setVelocityX(-this.speed);
        this.setFlipX(true);
      }
      else if (touchingRightEdge) {
        this.body.setVelocityX(this.speed);
        this.setFlipX(false);
      }
      else {
        this.body.setVelocityX(0);
      }

      // Player jump logic
      const nudgeUp = ((this.pointer1DownY !== null) && (this.pointer1DownY - pointer1.position.y) > nudgeThreshold);

      if (nudgeUp) {
        this.body.setVelocityY(-this.jumpHeight);
      }

      // Persist X velocity
      this.persistentVelocityX = this.body.velocity.x;
    }

    
    // Reduce X velocity when sliding along wall
    if (touchingWall) {
      this.persistentVelocityX /= 1.1;
    }

    // Persist MC forward momentum when jumping up (like when you hit a wall)
    if (this.body.velocity.y < 0) {
      this.body.setVelocityX(this.persistentVelocityX);
    }

    /* ANIMATION LOGIC
    ------------------------------------------- */
    if (this.body.velocity.y < 0) {
      this.anims.play('up', true);
    }
    else if (this.body.velocity.y > 0) {
      this.anims.play('down', true);
    }
    else if (this.body.velocity.x !== 0) {
      this.anims.play('run', true);
    }
    else {
      this.anims.play('idle', true);
    }

    // Check if player falls too far, death reset
    if (this.y > 5000) {
      this.scene.scene.restart(); // lol scene.scene
    }

    // Update our reference to the pointer's start Y
    if (pointer1.isDown) {
      this.pointer1DownY = pointer1.position.y;
    }
    else {
      this.pointer1DownY = null;
    }
  }
  
}

export default PC;