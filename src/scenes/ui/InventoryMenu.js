import {Scene} from 'phaser';

class InventoryMenu extends Scene {
  constructor() {
    super('ui-inventory-menu');
  }

  create() {
    this.title = this.add.text(30, 60, 'Inventory', {
      color: '#FFF',
      fontSize: 26
    });
  }
}

export default InventoryMenu;