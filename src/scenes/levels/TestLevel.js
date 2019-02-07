import Level from './base/Level';

class TestLevel extends Level {
  constructor() {
    super('test-level');
  }

  create() {
    this.initScene({
      tilemapKey: 'test-map'
    });
  }

  update() {
    this.mc.update();
  }
}

export default TestLevel;