import Level from './base/Level';
import McAfricaFight from '../../sprites/pc/MCAfricaFight';
import MCAfricaFight from '../../sprites/pc/MCAfricaFight';

class Level1 extends Level {
  constructor() {
    super('level-level1');
  }

  create() {
    this.initScene({
      MCClass: MCAfricaFight,
      tilemapKey: 'level1-map',
      mxX: 500,
      mcY: 350
    });
  }

  update() {
    this.mc.update();
    this.updateScene();
  }
}

export default Level1;