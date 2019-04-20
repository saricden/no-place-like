import Level from './base/Level';

class TestLevel extends Level {
  constructor() {
    super('test-level');
  }

  create() {
    this.initScene({
      tilemapKey: 'test-map',
      mcX: 1000,
      mxY: 0
    });
  }

  update() {
    this.mc.update();
  }
}

export default TestLevel;