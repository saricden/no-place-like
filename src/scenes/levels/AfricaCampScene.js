import {Scene} from 'phaser';
import MCAfrica from '../../sprites/pc/MCAfrica';

class AfricaCampScene extends Scene {

  constructor() {
    super('africa-camp');

    this.mc = null;
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
    // this.mc = this.physics.add.sprite(500, 0, 'mc-africa');
    this.mc = new MCAfrica({
      key: 'mc',
      scene: this,
      x: 500,
      y: 0
    });
    
    // Add map infront of MC
    map.createStaticLayer('above-mc', tileset, 0, 0);
    const solidLayer = map.createStaticLayer('solid', tileset, 0, 0);

    // Map v MC collisions
    solidLayer.setCollisionBetween(1, 4);
    solidLayer.setCollisionBetween(8, 11);
    solidLayer.setCollisionBetween(15, 16);
    this.physics.add.collider(this.mc, solidLayer);

    // Set camera follow
    this.cameras.main.startFollow(this.mc);
  }

  update() {
    // silence is golden?
    this.mc.update();
  }
}

export default AfricaCampScene;