import Level from './base/Level';
import {Geom} from 'phaser';

const {Intersects} = Geom;

class AfricaCampLevel extends Level {
  constructor() {
    super('africa-camp');
  }

  teleport() {
    this.scene.start('test-level');
  }

  checkOverlap(spriteA, spriteB) {
    const boundsA = spriteA.getBounds();
    const boundsB = spriteB.getBounds();

    return Intersects.RectangleToRectangle(boundsA, boundsB);
  }

  create() {
    this.initScene({}); // AfricaCamp is the default level.

    this.anims.create({
      key: 'burn',
      frames: this.anims.generateFrameNames('pink-portal', { start: 0, end: 2 }),
      frameRate: 12,
      repeat: -1
    });

    const portals = this.map.createFromObjects('portal-layer', 9, { key: 'pink-portal' });
    this.warpPortal = portals[0];

    this.warpPortal.anims.play('burn', true);

    // Use a container to arrange map v MC layers
    this.add.container(0, 0, [
      this.behindLayer,
      this.mc,
      this.solidLayer,
      this.aboveLayer,
      this.warpPortal
    ]);
  }

  update() {
    this.mc.update();
    
    if (this.checkOverlap(this.mc, this.warpPortal)) {
      this.teleport();
    }
  }
}

export default AfricaCampLevel;