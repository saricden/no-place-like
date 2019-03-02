import NPC from '../../base/NPC';

class Engineer extends NPC {
  constructor(config) {
    super({
      ...config,
      texture: 'npc-engineer'
    });

    const scalar = 0.45;
    const w = 240;
    const h = 270;

    this.body.setSize(w, h);
    this.setScale(scalar);
  }
}

export default Engineer;