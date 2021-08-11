import {Scene, Geom} from 'phaser';
import MCAfrica from '../../../sprites/pc/MCAfrica';

const {Rectangle} = Geom;

class Level extends Scene {
  initScene({bgColor = '#f5efbf', MCClass = MCAfrica, tilemapKey = 'africa-camp-map', tilesetName = 'Basic', tilesetImage = 'basic-tiles', collisionTiles = [[1, 4], [8, 11], [15, 16]], enemies = [], NPCs = [], mcX = 500, mcY = 1100}) {    
    // Set BG colour
    this.cameras.main.setBackgroundColor(bgColor);
    this.cameras.main.setRoundPixels(true); // seems to solve the janky lines ¯\_(ツ)_/¯

    // Enable multi-touch
    this.input.addPointer(2);

    // Init our level's feature-flags
    if (typeof this.game.flags === 'undefined') {
      this.game.flags = {
        targeting: 'front-and-back'
      };
    }

    // Add enemies & NPCs to respective physics groups
    this.enemies = this.physics.add.group(enemies, {});
    this.NPCs = this.physics.add.group(NPCs, {});

    // Create the bullet particle emitter for our character
    // Add particle emitter for bullets
    // this.bulletContainer = config.scene.add.container(0, 0, []);
    const enemyCollider = {
      contains: (x, y) => {
        let touching = false;

        this.enemies.children.entries.forEach((enemy, i) => {
          if (enemy.body.hitTest(x, y)) {
            const {scaleX} = enemy;
            enemy.setScale(scaleX - 0.001);
            const isDead = enemy.damageOrKill(1);
            touching = true;

            if (isDead) {
              this.enemies.remove(enemy);
            }
          }
        });

        return touching;
      }
    };

    const bullets = this.add.particles('dummy-projectile');
    this.bulletEmitter = bullets.createEmitter({
      // frame: 'blue',
      x: 0,
      y: 0,
      lifespan: 500,
      speed: { min: 500, max: 600 },
      // speed: { min: 600, max: 600 },
      angle: 330,
      gravityY: 0,
      // scale: { start: 0.2, end: 0.2 },
      scale: { start: 0.2, end: 1 },
      quantity: 1,
      alpha: (particle, key, t) => {
        return (1 - t);
      },
      deathZone: {
        type: 'onEnter',
        source: enemyCollider
      }
      // blendMode: 'ADD'
    });
    this.bulletEmitter.setRadial(true);

    // Create our character
    this.mc = new MCClass({
      key: 'mc',
      scene: this,
      x: mcX,
      y: mcY,
      bulletEmitter: this.bulletEmitter,
      enemies: this.enemies
    });

    // Add our maaaaaaap!
    this.map = this.make.tilemap({ key: tilemapKey, tileWidth: 98, tileHeight: 98 });
    const tileset = this.map.addTilesetImage(tilesetName, tilesetImage);
    
    // Map layers
    this.behindLayer = this.map.createStaticLayer('behind-mc', tileset, 0, 0);    
    this.aboveLayer = this.map.createStaticLayer('above-mc', tileset, 0, 0);
    this.solidLayer = this.map.createStaticLayer('solid', tileset, 0, 0);

    // Map v MC collisions
    for (let i = 0; i < collisionTiles.length; i++) {
      const tiles = collisionTiles[i];
      this.solidLayer.setCollisionBetween(tiles[0], tiles[1]);
    }

    // MC vs enemies & solidLayer collisions
    this.physics.add.collider(this.mc, this.solidLayer);
    this.physics.add.collider(this.enemies, this.solidLayer);
    this.physics.add.collider(this.NPCs, this.solidLayer);
    // this.physics.add.overlap(this.enemies, this.solidLayer);

    // Add an HP ticker
    this.hpText = this.add.text(20, 20, 'XX / XX', { fontFamily: 'Sans Serif', color: '#000' });
    this.hpText.setScrollFactor(0);

    // Create subtitle text
    this.subtitle = this.add.text((window.innerWidth / 2), window.innerHeight, '(subtitle)', {
      fontFamily: 'Sans Serif',
      color: '#FFF',
      stroke: '#000',
      strokeThickness: 3,
      align: 'center',
      padding: 20,
      wordWrap: {
        width: window.innerWidth,
        useAdvancedWrap: true
      }
    });
    this.subtitle.setOrigin(0.5, 1);
    this.subtitle.setScrollFactor(0);
    this.subtitle.setAlpha(0);
    this.subtitle.setPosition((window.innerWidth / 2), (window.innerHeight + this.subtitle.displayHeight));

    this.ansLeft = this.add.text(((window.innerWidth / 2) - 10), (window.innerHeight + 50), '[ans1]', {
      fontFamily: 'Sans Serif',
      color: '#FFF',
      backgroundColor: '#000',
      padding: 5,
      align: 'right',
      wordWrap: {
        width: (window.innerWidth / 2),
        useAdvancedWrap: true
      }
    });
    this.ansLeft.setOrigin(1, 1);
    this.ansLeft.setScrollFactor(0);
    this.ansLeft.setAlpha(0);
    this.ansLeft.setInteractive();

    this.ansRight = this.add.text(((window.innerWidth / 2) + 5), (window.innerHeight + 50), '[ans1]', {
      fontFamily: 'Sans Serif',
      color: '#FFF',
      backgroundColor: '#000',
      padding: 5,
      align: 'left',
      wordWrap: {
        width: (window.innerWidth / 2),
        useAdvancedWrap: true
      }
    });
    this.ansRight.setOrigin(0, 1);
    this.ansRight.setScrollFactor(0);
    this.ansRight.setAlpha(0);
    this.ansRight.setInteractive();

    // Add our pause button
    // this.pauseBtn = this.add.image(window.innerWidth - 30, 30, 'ui-ham');
    // this.pauseBtn.setScale(0.5);
    // this.pauseBtn.setScrollFactor(0);
    // this.pauseBtn.setInteractive();
    // this.pauseBtn.on('pointerdown', this.pauseGame, this);
    this.menuBtn = this.add.image(window.innerWidth + 2, -2, 'ui-menu');
    this.menuBtn.setOrigin(1, 0);
    this.menuBtn.setScale(0.5);
    this.menuBtn.setScrollFactor(0);
    this.menuBtn.setInteractive();

    this.menuBtn.on('pointerdown', this.openMenu, this);

    const tintRect = new Rectangle(0, 0, window.innerWidth, window.innerHeight);
    this.viewportTint = this.add.graphics({
      x: 0,
      y: 0,
      fillStyle: { color: 0x000000 }
    });
    this.viewportTint.setScrollFactor(0);
    this.viewportTint.setAlpha(0);
    this.viewportTint.fillRectShape(tintRect);

    // Setup our layering
    this.behindLayer.setDepth(1);
    this.aboveLayer.setDepth(4);
    this.solidLayer.setDepth(2);
    this.mc.setDepth(3);
    bullets.setDepth(2);
    this.enemies.setDepth(2);
    this.NPCs.setDepth(2);
    this.viewportTint.setDepth(5);
    this.hpText.setDepth(6);
    this.subtitle.setDepth(6);
    this.ansLeft.setDepth(6);
    this.ansRight.setDepth(6);
    this.menuBtn.setDepth(6);

    // Set camera follow
    this.cameras.main.startFollow(this.mc);

    // Extra debugging goodies for development mode!
    if (typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'development') {
      this.pointer1Debug = this.add.image(mcX, mcY, 'rotator-enemy');
      this.pointer1Debug.setScale(0.08);
      this.pointer1Debug.setTint(0xff0000);
      this.pointer1Debug.setDepth(5);

      this.pointer2Debug = this.add.image(mcX + 50, mcY, 'rotator-enemy');
      this.pointer2Debug.setScale(0.08);
      this.pointer2Debug.setTint(0x0000ff);
      this.pointer2Debug.setDepth(5);
    }
  }

  openMenu() {
    this.viewportTint.setAlpha(0.5);
    this.scene.pause();
    this.scene.launch('ui-pause-menu');
  }

  showSubtitle(line) {
    return new Promise((resolve, reject) => {
      this.subtitle.setText(line);
      this.tweens.add({
        targets: this.subtitle,
        y: window.innerHeight,
        alpha: 1,
        ease: 'Power1',
        duration: 1000,
        hold: (line.length * 10), // 100ms / character
        yoyo: true,
        repeat: 0,
        onComplete: function () { 
          resolve();
        }
      });
    });
  }

  showQuestion(line, answers, npc) {
    return new Promise((resolve, reject) => {
      // Set the text of line + ans
      this.subtitle.setText(line);
      this.ansLeft.setText(answers.left.reply);
      this.ansRight.setText(answers.right.reply);

      // Clear any old events
      this.ansLeft.off('pointerdown');
      this.ansRight.off('pointerdown');

      // Set the click / touch events
      if (typeof answers.left.callback !== 'undefined') {
        this.ansLeft.on('pointerdown', () => {
          answers.left.callback(npc);
        });
      }
      else {
        this.ansLeft.on('pointerdown', () => {
          this.hideAnswers().then(() => {
            npc.readDialog(answers.left.linkTo);
          });
        });
      }

      if (typeof answers.right.callback !== 'undefined') {
        this.ansRight.on('pointerdown', () => {
          answers.right.callback(npc);
        });
      }
      else {
        this.ansRight.on('pointerdown', () => {
          this.hideAnswers().then(() => {
            npc.readDialog(answers.right.linkTo);
          });
        });
      }


      this.tweens.add({
        targets: this.subtitle,
        y: (window.innerHeight - 50),
        alpha: 1,
        ease: 'Power1',
        duration: 1000,
        yoyo: false,
        repeat: 0
      });
      this.tweens.add({
        targets: this.ansLeft,
        y: (window.innerHeight - 25),
        alpha: 1,
        ease: 'Power1',
        duration: 1000,
        yoyo: false,
        repeat: 0
      });
      this.tweens.add({
        targets: this.ansRight,
        y: (window.innerHeight - 25),
        alpha: 1,
        ease: 'Power1',
        duration: 1000,
        yoyo: false,
        repeat: 0
      });
    });
  }

  hideAnswers() {
    return new Promise((resolve, reject) => {
      this.tweens.add({
        targets: [this.ansLeft, this.ansRight],
        y: (window.innerHeight + 50),
        alpha: 0,
        ease: 'Power1',
        duration: 1000,
        yoyo: false,
        repeat: 0
      });
      this.tweens.add({
        targets: this.subtitle,
        y: (window.innerHeight + this.subtitle.displayHeight),
        alpha: 1,
        ease: 'Power1',
        duration: 1000,
        yoyo: false,
        repeat: 0,
        onComplete: () => {
          resolve();
        }
      });
    });
  }

  updateScene() {
    if (typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'development') {
      const {pointer1, pointer2} = this.input;

      this.pointer1Debug.setAlpha(0);
      this.pointer2Debug.setAlpha(0);

      if (pointer1.isDown) {
        this.pointer1Debug.setAlpha(1);
        this.pointer1Debug.setPosition(pointer1.worldX, pointer1.worldY);
      }
      if (pointer2.isDown) {
        this.pointer2Debug.setAlpha(1);
        this.pointer2Debug.setPosition(pointer2.worldX, pointer2.worldY);
      }
    }

    // Bad guy hittests
    this.enemies.children.entries.forEach((enemy) => {
      if (this.mc.body.hitTest(enemy.x, enemy.y)) {
        enemy.attack(this.mc);
      }
    });
  }

}

export default Level;
