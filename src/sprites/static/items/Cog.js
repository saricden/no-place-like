import Item from '../../base/Item';

class Cog extends Item {
  constructor(config) {
    super({
      ...config,
      texture: 'item-cog'
    });
  }
}

export default Cog;