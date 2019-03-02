import Level from './base/Level';
import MCAfrica from '../../sprites/pc/MCAfrica';
import Engineer from '../../sprites/npc/good/Engineer';

class Level1 extends Level {
  constructor() {
    super('level-level1');
  }

  create() {
    const engineer = new Engineer({
      scene: this,
      x: (20 * 100),
      y: (42 * 100),
      key: 'npc-engineer-sprite'
    });

    engineer.anims.play('engineer-idle', true);

    const NPCs = [
      engineer
    ];

    this.initScene({
      MCClass: MCAfrica,
      tilemapKey: 'level1-map',
      mcX: (19 * 100),
      mcY: (42 * 100),
      NPCs
    });
  }

  update() {
    this.mc.update();
    this.updateScene();
  }
}

export default Level1;