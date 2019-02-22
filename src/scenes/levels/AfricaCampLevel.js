import Level from './base/Level';
import {Geom} from 'phaser';
import MCAfricaFight from '../../sprites/pc/MCAfricaFight';

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
    this.baddy1 = this.physics.add.sprite(750, 0, 'jump-blaster');
    this.baddy1.setScale(0.1);

    const enemies = [
      this.baddy1
    ];

    this.initScene({
      MCClass: MCAfricaFight,
      enemies
    }); // AfricaCamp is the default level.

    const portals = this.map.createFromObjects('portal-layer', 9, { key: 'pink-portal' });
    this.warpPortal = portals[0];

    this.warpPortal.anims.play('burn', true);
  }

  update() {
    this.mc.update();
    
    if (this.checkOverlap(this.mc, this.warpPortal)) {
      this.teleport();
    }

    if (this.baddy1.body.blocked.down) {
      const randomVelocity = (Math.random() * 100);
      const headsOrTails = (Math.random() > 0.5);
      this.baddy1.body.setVelocityY(-600);
      if (headsOrTails) {
        this.baddy1.body.setVelocityX(randomVelocity);
        this.baddy1.setFlipX(true);
      }
      else {
        this.baddy1.body.setVelocityX(-randomVelocity);
        this.baddy1.setFlipX(false);
      }
    }
  }
}

export default AfricaCampLevel;