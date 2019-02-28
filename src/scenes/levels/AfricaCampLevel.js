import Level from './base/Level';
import {Geom} from 'phaser';
import MCAfricaFight from '../../sprites/pc/MCAfricaFight';
import JumperBot from '../../sprites/npc/bad/JumperBot';
import RotatorBot from '../../sprites/npc/bad/RotatorBot';
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
    this.baddies = [];
    for (let i = 0; i < 5; i++) {
      const baddy = new JumperBot({
        scene: this,
        x: 750 + (150 * i),
        y: 0,
        key: 'baddy'+i
      });

      this.baddies.push(baddy);
    }

    const rotatorBot = new RotatorBot({
      scene: this,
      x: 300,
      y: 1100,
      key: 'rotatorBaddy1'
    });

    this.baddies.push(rotatorBot);

    const enemies = [
      ...this.baddies
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
    this.updateScene();
    this.baddies.forEach((baddy) => {
      baddy.update();
    });

    this.hpText.setText('[ '+this.mc.hp+' / '+this.mc.maxHP+' ]');
    
    if (this.checkOverlap(this.mc, this.warpPortal)) {
      this.teleport();
    }
  }
}

export default AfricaCampLevel;