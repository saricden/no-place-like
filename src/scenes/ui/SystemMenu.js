import {Scene} from 'phaser';

class SystemMenu extends Scene {
  constructor() {
    super('ui-system-menu');
  }

  create() {
    this.title = this.add.text(30, 60, 'System Menu', {
      color: '#FFF',
      fontSize: 26
    });
  }
}

export default SystemMenu;