import {GameObjects} from 'phaser';
import {ui} from '../../config';
const {Container} = GameObjects;
const {edgeWidth, nudgeThreshold} = ui;

class MCAfricaFight extends Container {
  setFlipX(flip) {
    this.list.forEach((child) => { 
      if (!child.isGun) {
        child.setFlipX(flip);
      }
      else {
        child.setFlipY(flip);
      }
    });
  }

  aim(rad) {
    this.mcArmLeft.setRotation(-rad - this.mcArmsOffsetLeft);
    this.mcArmRight.setRotation(-rad - this.mcArmsOffsetLeft);
    this.boltPistol.setRotation(-rad - this.boltPistolOffsetLeft);
    this.bulletEmitter.setAngle(-((rad * 180 / Math.PI) + 82));
  }

  constructor(config) {
    const bodyWidth = 60;
    const bodyHeight = 260;
    const boltPistolOffsetRight = (Math.PI / 2.4);
    const boltPistolOffsetLeft = (Math.PI / 1.85);
    const mcArmsOffsetRight = (Math.PI / 1.1);
    const mcArmsOffsetLeft = (Math.PI / 0.95);

    const core = config.scene.add.sprite((bodyWidth / 2), (bodyHeight / 2), 'mc-africa-noarms');
    const mcArmLeft = config.scene.add.image((bodyWidth / 2 - 6), 80, 'mc-africa-gun-arm-left');
    const mcArmRight = config.scene.add.image((bodyWidth / 2 - 6), 80, 'mc-africa-gun-arm-right');
    const boltPistol = config.scene.add.sprite((bodyWidth / 2 - 6), 80, 'bolt-pistol2');
    
    const bullets = config.scene.add.particles('dummy-projectile');

    boltPistol.setScale(0.18);
    boltPistol.setOrigin(-0.8, 0.5);
    boltPistol.isGun = true;
    mcArmLeft.setOrigin(0.5, 0.15);
    mcArmRight.setOrigin(0.5, 0.15);

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

    // Add particle emitter for bullets
    // this.bulletContainer = config.scene.add.container(0, 0, []);
    this.bulletEmitter = bullets.createEmitter({
      // frame: 'blue',
      x: config.x,
      y: config.y,
      lifespan: 2000,
      speed: { min: 400, max: 600 },
      angle: 330,
      gravityY: 300,
      scale: { start: 0, end: 0.4 },
      quantity: 1
      // blendMode: 'ADD'
    });
    this.bulletEmitter.setRadial(true);

    // Setup variables for use in update()
    this.core = core;
    this.mcArmLeft = mcArmLeft;
    this.mcArmRight = mcArmRight;
    this.boltPistol = boltPistol;
    this.bodyWidth = bodyWidth;
    this.bodyHeight = bodyHeight;
    this.boltPistolOffsetRight = boltPistolOffsetRight;
    this.boltPistolOffsetLeft = boltPistolOffsetLeft;
    this.mcArmsOffsetRight = mcArmsOffsetRight;
    this.mcArmsOffsetLeft = mcArmsOffsetLeft;
    this.bullets = bullets;
    this.lastPointerTouch = false;
    this.touchRad = (Math.PI / 2);

    // Init arrow keys
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  update() {
    const touchingGround = this.body.blocked.down;
    const touchingWall = (this.body.blocked.left || this.body.blocked.right);
    const {pointer1, pointer2} = this.scene.input;
    const {mousePointer} = this.scene.input;
    const {left, right, up} = this.cursors;
    const bothPointersDown = (pointer1.isDown && pointer2.isDown);

    if (pointer1.isDown) {
      this.lastPointerTouch = true;
    }
    else if (mousePointer.isDown) {
      this.lastPointerTouch = false;
    }

    /* COMPUTER CONTROLS
    ------------------------------------------- */
    if (touchingGround) {
      // Player left-right control logic
      if (left.isDown) {
        this.body.setVelocityX(-this.speed);
      }
      else if (right.isDown) {
        this.body.setVelocityX(this.speed);
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
      }
      else if (touchingRightEdge) {
        this.body.setVelocityX(this.speed);
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

    // Aim gun at the mouse
    const spriteCenterX = ((window.innerWidth / 2) + (this.bodyWidth / 4));
    const spriteCenterY = ((window.innerHeight / 2) + (this.bodyHeight / 4));

    // Flip character to face mouse
    if (this.lastPointerTouch) {
      // Handle touch point n shoot controls
      if (pointer1.x < spriteCenterX) {
        this.setFlipX(true);
        this.aim(this.touchRad);
      }
      else {
        this.setFlipX(false);
        this.aim(-this.touchRad);
      }

      if (bothPointersDown) {
        const dX = (pointer2.x - pointer1.x);
        const dY = (pointer2.y - pointer1.y);
        this.touchRad = Math.atan2(dX, dY);
        this.aim(this.touchRad);
      }
    }
    else {
      // Handle desktop point n shoot controls
      const dX = (spriteCenterX - mousePointer.x);
      const dY = (spriteCenterY - mousePointer.y);
      const rad = Math.atan2(dX, dY);

      if (mousePointer.x < spriteCenterX) {
        this.aim(rad);
        this.setFlipX(true);
      }
      else {
        this.aim(rad);
        this.setFlipX(false);
      }

      // Gun projectile logic (dummy)
      if (mousePointer.isDown) {
        this.bulletEmitter.setPosition(this.x + (this.boltPistol.x / 2), this.y + (this.boltPistol.y / 2));
        this.bulletEmitter.start();
      }
      else {
        this.bulletEmitter.stop();
      }
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