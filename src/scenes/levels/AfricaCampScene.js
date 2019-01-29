import {Scene} from 'phaser';

class AfricaCampScene extends Scene {

  constructor() {
    super('africa-camp');

    this.cursors = false;
    this.mc = null;
    this.mcSpeed = 200;
  }

  create() {
    // Add some dummy platforms
    const platforms = this.physics.add.staticGroup();
    platforms.create((window.innerWidth / 2), (window.innerHeight / 2), 'dummy-platform');
    platforms.create((window.innerWidth / 2) + 450, (window.innerHeight / 2), 'dummy-platform');
    platforms.create((window.innerWidth / 2) - 450, (window.innerHeight / 2), 'dummy-platform');
    platforms.create((window.innerWidth / 2) + 900, (window.innerHeight / 2) + 150, 'dummy-platform');
    platforms.create((window.innerWidth / 2) + 1350, (window.innerHeight / 2) + 250, 'dummy-platform');

    // Add our sprite to jump around on them
    this.mc = this.physics.add.sprite((window.innerWidth / 2), 0, 'guy');
    this.mc.setBounce(0);

    // Setup sprite animations
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('guy', {start: 0, end: 1}),
      frameRate: 6,
      repeat: -1
    });
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('guy', {start: 2, end: 3}),
      frameRate: 6,
      repeat: -1
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('guy', {start: 4, end: 4}),
      frameRate: 6,
      repeat: -1
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('guy', {start: 5, end: 5}),
      frameRate: 6,
      repeat: -1
    });


    // Setup collisions
    this.physics.add.collider(this.mc, platforms);

    // Init arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // Set camera follow
    this.cameras.main.startFollow(this.mc);
  }

  update() {
    // Player left-right control logic
    if (this.cursors.left.isDown) {
      this.mc.setVelocityX(-this.mcSpeed);
    }
    else if (this.cursors.right.isDown) {
      this.mc.setVelocityX(this.mcSpeed);
    }
    else {
      this.mc.setVelocityX(0);
    }

    // Player jump logic
    if (this.cursors.up.isDown && this.mc.body.touching.down) {
      this.mc.setVelocityY(-400);
    }

    // Player animation logic  
    if (this.mc.body.velocity.y < 0) {
      this.mc.anims.play('up', true);
    }
    else if (this.mc.body.velocity.y > 0) {
      this.mc.anims.play('down', true);
    }
    else if (this.mc.body.velocity.x !== 0) {
      this.mc.anims.play('run', true);
    }
    else {
      this.mc.anims.play('idle', true);
    }
  }
}

export default AfricaCampScene;