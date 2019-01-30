import {Scene} from 'phaser';

class AfricaCampScene extends Scene {

  constructor() {
    super('africa-camp');

    this.cursors = false;
    this.mc = null;
    this.mcSpeed = 200;
  }

  create() {
    // Set BG colour
    this.cameras.main.setBackgroundColor('#F3EBA6');

    // Add our sprite to jump around on them
    this.mc = this.physics.add.sprite((window.innerWidth / 2), 0, 'mc-africa');
    this.mc.setBounce(0);
    this.mc.body.setSize(60, 260);
    this.mc.setScale(0.5);
    
    // Add our maaaaaaap!
    const map = this.make.tilemap({ key: 'africa-camp-map', tileWidth: 100, tileHeight: 100 });
    const tileset = map.addTilesetImage('Basic', 'basic-tiles');
    
    const aboveLayer = map.createStaticLayer('above-mc', tileset, 0, 0);
    const solidLayer = map.createStaticLayer('solid', tileset, 0, 0);

    // Map v MC collisions
    solidLayer.setCollisionBetween(1, 10);
    this.physics.add.collider(this.mc, solidLayer);

    // Setup sprite animations
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('mc-africa', {start: 0, end: 4}),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('mc-africa', {start: 6, end: 22}),
      frameRate: 18,
      repeat: -1
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('mc-africa', {start: 24, end: 28}),
      frameRate: 12,
      repeat: -1
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('mc-africa', {start: 30, end: 32}),
      frameRate: 12,
      repeat: -1
    });

    // Init arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // Set camera follow
    this.cameras.main.startFollow(this.mc);
  }

  update() {
    // Player left-right control logic
    if (this.cursors.left.isDown) {
      this.mc.setVelocityX(-this.mcSpeed);
      this.mc.setFlipX(true);
    }
    else if (this.cursors.right.isDown) {
      this.mc.setVelocityX(this.mcSpeed);
      this.mc.setFlipX(false);
    }
    else {
      this.mc.setVelocityX(0);
    }

    // Player jump logic
    if (this.cursors.up.isDown && this.mc.body.blocked.down) {
      this.mc.setVelocityY(-500);
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

    // Check if player falls too far, death reset
    if (this.mc.y > 5000) {
      this.scene.restart();
    }
  }
}

export default AfricaCampScene;