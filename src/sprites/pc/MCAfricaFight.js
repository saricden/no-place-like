import {GameObjects} from 'phaser';
import {ui} from '../../config';
const {Container} = GameObjects;
const {edgeWidth, nudgeThreshold} = ui;

class MCAfricaFight extends Container {
  constructor(config) {
    const bodyWidth = 60;
    const bodyHeight = 260;
    const core = config.scene.add.sprite((bodyWidth / 2), (bodyHeight / 2), 'mc-africa-noarms');
    const mcArmLeft = config.scene.add.image((bodyWidth / 2 - 6), 80, 'mc-africa-gun-arm-left');
    const mcArmRight = config.scene.add.image((bodyWidth / 2 - 6), 80, 'mc-africa-gun-arm-right');
    const boltPistol = config.scene.add.sprite(0, 0, 'bolt-pistol');

    boltPistol.setScale(0.18);
    boltPistol.setOrigin(-1.75, 0.6);
    boltPistol.setRotation((Math.PI / 2.17));
    mcArmLeft.setOrigin(0.6, 0.15);
    mcArmRight.setOrigin(0.6, 0.15);

    super(config.scene, config.x, config.y, [
      mcArmLeft,
      core,
      boltPistol,
      mcArmRight
    ]);

    config.scene.add.container(this);

    // Add self to scene's physics
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    // Config
    this.speed = 200;
    this.jumpHeight = 350;

    // Variables
    this.persistentVelocityX = 0;
    this.pointer1DownY = null;

    // Setup physics properties
    this.body.setBounce(0);
    this.body.setSize(bodyWidth, bodyHeight);
    this.setScale(0.5);

    // Setup variables for use in update()
    this.core = core;
    this.mcArmLeft = mcArmLeft;
    this.mcArmRight = mcArmRight;
    this.boltPistol = boltPistol;
    this.bodyWidth = bodyWidth;
    this.bodyHeight = bodyHeight;

    // Init arrow keys
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  update() {
    const touchingGround = this.body.blocked.down;
    const touchingWall = (this.body.blocked.left || this.body.blocked.right);
    const {pointer1, pointer2} = this.scene.input;
    const {mousePointer} = this.scene.input;
    const {left, right, up} = this.cursors;

    /* COMPUTER CONTROLS
    ------------------------------------------- */
    if (touchingGround) {
      // Player left-right control logic
      if (left.isDown) {
        this.body.setVelocityX(-this.speed);
        // this.setFlipX(true);
      }
      else if (right.isDown) {
        this.body.setVelocityX(this.speed);
        // this.setFlipX(false);
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

    const spriteCenterX = ((window.innerWidth / 2) + (this.bodyWidth / 4));
    const spriteCenterY = ((window.innerHeight / 2) + (this.bodyHeight / 4));
    console.log(spriteCenterX - mousePointer.x, spriteCenterY - mousePointer.y);

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
      this.core.anims.play('up-noarms', true);
    }
    else if (this.body.velocity.y > 0) {
      this.core.anims.play('down-noarms', true);
    }
    else if (this.body.velocity.x !== 0) {
      this.core.anims.play('run-noarms', true);
    }
    else {
      this.core.anims.play('idle-noarms', true);
    }

    // TODO (bugfix): Trying to play a boltPistol animation errors
    // this.boltPistol.anims.play('bolt-pistol-idle', true);

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

export default MCAfricaFight;