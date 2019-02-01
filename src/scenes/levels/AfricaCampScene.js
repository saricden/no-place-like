import {Scene} from 'phaser';

const edgeWidth = 60;
const jumpHeight = 350;
const nudgeThreshold = 30;

class AfricaCampScene extends Scene {

  constructor() {
    super('africa-camp');

    this.cursors = false;
    this.mc = null;
    this.mcSpeed = 200;
    this.pointer1DownY = null;
  }

  create() {
    // Set BG colour
    this.cameras.main.setBackgroundColor('#F3EBA6');    

    // Enable multi-touch
    this.input.addPointer(2);

    // Add our maaaaaaap!
    const map = this.make.tilemap({ key: 'africa-camp-map', tileWidth: 100, tileHeight: 100 });
    const tileset = map.addTilesetImage('Basic', 'basic-tiles');
    
    // Behind sprite layer
    map.createStaticLayer('behind-mc', tileset, 0, 0);    

    // Add our sprite to jump around on them
    this.mc = this.physics.add.sprite(500, 0, 'mc-africa');
    this.mc.setBounce(0);
    this.mc.body.setSize(60, 260);
    this.mc.setScale(0.5);
    
    // Add map infront of MC
    map.createStaticLayer('above-mc', tileset, 0, 0);
    const solidLayer = map.createStaticLayer('solid', tileset, 0, 0);

    // Map v MC collisions
    solidLayer.setCollisionBetween(1, 4);
    solidLayer.setCollisionBetween(8, 11);
    solidLayer.setCollisionBetween(15, 16);
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
    const touchingGround = this.mc.body.blocked.down;
    const {pointer1, pointer2} = this.input;

    /* COMPUTER CONTROLS
    ------------------------------------------- */
    if (touchingGround) {
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
      if (this.cursors.up.isDown) {
        this.mc.setVelocityY(-jumpHeight);
      }
    }

    

    /* TOUCH CONTROLS
    ------------------------------------------- */
    if (touchingGround && pointer1.isDown) {
      // Player left-right control logic
      const touchingLeftEdge = (pointer1.position.x <= edgeWidth);
      const touchingRightEdge = (pointer1.position.x >= window.innerWidth - edgeWidth);

      if (touchingLeftEdge) {
        this.mc.setVelocityX(-this.mcSpeed);
        this.mc.setFlipX(true);
      }
      else if (touchingRightEdge) {
        this.mc.setVelocityX(this.mcSpeed);
        this.mc.setFlipX(false);
      }
      else {
        this.mc.setVelocityX(0);
      }

      // Player jump logic
      const nudgeUp = ((this.pointer1DownY !== null) && (this.pointer1DownY - pointer1.position.y) > nudgeThreshold);

      if (nudgeUp) {
        this.mc.setVelocityY(-jumpHeight);
      }
    }

    // Player jump logic

    /* ANIMATION LOGIC
    ------------------------------------------- */
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

    // Update our reference to the pointer's start Y
    if (pointer1.isDown) {
      this.pointer1DownY = pointer1.position.y;
    }
    else {
      this.pointer1DownY = null;
    }
  }
}

export default AfricaCampScene;