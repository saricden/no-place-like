import {Scene} from 'phaser';

class PreloaderScene extends Scene {
  constructor() {
    super('preloader-scene');
  }

  preload() {
    // Called first, used to load assets
    this.load.image('logo', 'assets/images/logo.png');
    this.load.image('title-robo', 'assets/images/title-robo.png');
    this.load.image('new-game-btn', 'assets/images/new-game-btn.png');
    this.load.image('load-game-btn', 'assets/images/load-game-btn.png');
    this.load.image('title-hill1', 'assets/images/title-hill1.png');
    this.load.image('dummy-platform', 'assets/images/dummy/dummy-platform.png');
    this.load.image('dummy-projectile', 'assets/images/dummy/dummy-projectile.png');
    this.load.image('mc-africa-gun-arm-left', 'assets/images/sprites/mc-africa/gun-arm-left.png');
    this.load.image('mc-africa-gun-arm-right', 'assets/images/sprites/mc-africa/gun-arm-right.png');
    this.load.image('rotator-enemy', 'assets/images/sprites/rotator-baddy/baddy2.png');
    // this.load.image('ui-ham', 'assets/images/ui/icon-ham.png');
    this.load.image('ui-menu', 'assets/images/ui/icon-menu.png');
    this.load.image('ui-inventory', 'assets/images/ui/icon-inventory.png');
    this.load.image('ui-system', 'assets/images/ui/icon-system.png');
    this.load.image('ui-party', 'assets/images/ui/new-icon-party.png');

    this.load.multiatlas('mc-africa', 'assets/images/sprites/mc-africa/packed/mc-africa.json', 'assets/images/sprites/mc-africa/packed');
    this.load.multiatlas('mc-africa-noarms', 'assets/images/sprites/mc-africa-noarms/packed/mc-africa-noarms.json', 'assets/images/sprites/mc-africa-noarms/packed');
    this.load.multiatlas('bolt-pistol2', 'assets/images/sprites/bolt-pistol2/packed/bolt-pistol2.json', 'assets/images/sprites/bolt-pistol2/packed');
    this.load.multiatlas('jump-blaster', 'assets/images/sprites/jump-blaster/packed-scaled/jump-blaster.json', 'assets/images/sprites/jump-blaster/packed-scaled');

    this.load.image('basic-tiles', 'assets/images/tilemaps/basic.png');
    this.load.tilemapTiledJSON('africa-camp-map', 'assets/maps/africa-camp.json');
    this.load.tilemapTiledJSON('test-map', 'assets/maps/test-map.json');
    this.load.tilemapTiledJSON('level1-map', 'assets/maps/level1.json');

    this.load.spritesheet('pink-portal', 'assets/images/sprites/tiles/pink-portal.png', { frameWidth: 100, frameHeight: 100 });
    this.load.spritesheet('npc-engineer', 'assets/images/sprites/npc-engineer/npc-engineer.png', { frameWidth: 240, frameHeight: 270 });

    let loadingBar = this.add.graphics({
      fillStyle :{
        color: 0x7DF9FF
      }
    });

    this.load.on('progress', (percent) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
    });
  }

  create() {
    /* CREATE ANIMATIONS
    ------------------------------ */
    // MCAfrica
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNames('mc-africa', {prefix: 'idle/', start: 1, end: 4, zeroPad: 2, suffix: '.png'}),
      frameRate: 3,
      repeat: -1
    });
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNames('mc-africa', {prefix: 'run/', start: 1, end: 16, zeroPad: 2, suffix: '.png'}),
      frameRate: 18,
      repeat: -1
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNames('mc-africa', {prefix: 'up/', start: 1, end: 5, zeroPad: 2, suffix: '.png'}),
      frameRate: 12,
      repeat: -1
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNames('mc-africa', {prefix: 'down/', start: 1, end: 4, zeroPad: 2, suffix: '.png'}),
      frameRate: 8,
      repeat: -1
    });

    // MCAfrica (noarms)
    this.anims.create({
      key: 'idle-noarms',
      frames: this.anims.generateFrameNames('mc-africa-noarms', {prefix: 'idle/', start: 1, end: 5, zeroPad: 2, suffix: '.png'}),
      frameRate: 3,
      repeat: -1
    });
    this.anims.create({
      key: 'run-noarms',
      frames: this.anims.generateFrameNames('mc-africa-noarms', {prefix: 'run/', start: 1, end: 18, zeroPad: 2, suffix: '.png'}),
      frameRate: 18,
      repeat: -1
    });
    this.anims.create({
      key: 'up-noarms',
      frames: this.anims.generateFrameNames('mc-africa-noarms', {prefix: 'up/', start: 1, end: 6, zeroPad: 2, suffix: '.png'}),
      frameRate: 12,
      repeat: -1
    });
    this.anims.create({
      key: 'down-noarms',
      frames: this.anims.generateFrameNames('mc-africa-noarms', {prefix: 'down/', start: 1, end: 4, zeroPad: 2, suffix: '.png'}),
      frameRate: 8,
      repeat: -1
    });

    // Burning portal thing tile animation create mmkay
    this.anims.create({
      key: 'burn',
      frames: this.anims.generateFrameNames('pink-portal', { start: 0, end: 2 }),
      frameRate: 12,
      repeat: -1
    });

    // Engineer NPC examining his doodad
    this.anims.create({
      key: 'engineer-idle',
      frames: this.anims.generateFrameNames('npc-engineer', { start: 0, end: 12 }),
      frameRate: 8,
      repeat: -1,
      yoyo: true
    });

    // Bolt pistol
    this.anims.create({
      key: 'bolt-pistol-idle',
      frames: this.anims.generateFrameNames('bolt-pistol2', {prefix: 'bolt-pistol-idle/', start: 1, end: 4, zeroPad: 2, suffix: '.png'}),
      frameRate: 18,
      repeat: -1
    });

    // Jump blasta
    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNames('jump-blaster', {prefix: 'jump/', start: 1, end: 3, zeroPad: 2, suffix: '.png'}),
      frameRate: 4,
      repeat: -1
    });

    // Called after preload, used to initialize your scene
    if (typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'development') {
      // Replace this w/ whatever scene you're working on
      this.scene.start('africa-camp');
      // this.scene.start('title-scene');

    }
    else {
      // In production start on the title screen
      this.scene.start('title-scene');
    }
  }

  // update() {
  //   // Called repeatedly every frame
  // }
}

export default PreloaderScene;
