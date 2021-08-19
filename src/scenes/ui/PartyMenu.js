import {Scene} from 'phaser';

class PartyMenu extends Scene {
  constructor() {
    super('ui-party-menu');
  }

  create() {
    this.title = this.add.text(30, 60, 'Party Menu', {
      color: '#FFF',
      fontSize: 26
    });
  }
}

export default PartyMenu;
