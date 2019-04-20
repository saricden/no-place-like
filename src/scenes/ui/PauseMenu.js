import {Scene} from 'phaser';

class PauseMenu extends Scene {
  constructor() {
    super('ui-pause-menu');
  }

  toggleTargetingMode() {
    const {targeting} = this.game.flags;
    this.game.flags.targeting = (targeting === 'front-and-back' ? 'front-only' : 'front-and-back');
    this.targetingBtn.setText(this.game.flags.targeting);
  }

  create() {
    // Scene management
    this.openMenu = null;

    // Config button end positions
    const inventoryX = 130;
    const inventoryY = 30;
    const systemX = 100;
    const systemY = 100;
    const partyX = 30;
    const partyY = 130;

    // Instantiate buttons offscreen
    this.btnInventory = this.add.image(window.innerWidth + 50, -50, 'ui-inventory');
    this.btnInventory.setScale(0.45);
    this.btnSystem = this.add.image(window.innerWidth + 50, -50, 'ui-system');
    this.btnSystem.setScale(0.45);
    this.btnParty = this.add.image(window.innerWidth + 50, -50, 'ui-party');
    this.btnParty.setScale(0.45);

    this.btnSystem.setInteractive();
    this.btnSystem.on('pointerdown', this.openSystemMenu, this);

    this.btnInventory.setInteractive();
    this.btnInventory.on('pointerdown', this.openInventoryMenu, this);

    // Start dem tweens
    this.tweens.add({
      targets: this.btnInventory,
      x: (window.innerWidth - inventoryX),
      y: inventoryY,
      ease: 'Power1',
      duration: 300,
      yoyo: false,
      repeat: 0
    });
    this.tweens.add({
      targets: this.btnSystem,
      x: (window.innerWidth - systemX),
      y: systemY,
      ease: 'Power1',
      duration: 300,
      yoyo: false,
      repeat: 0
    });
    this.tweens.add({
      targets: this.btnParty,
      x: (window.innerWidth - partyX),
      y: partyY,
      ease: 'Power1',
      duration: 300,
      yoyo: false,
      repeat: 0
    });
  }

  openSystemMenu() {
    this.scene.manager.stop('ui-inventory-menu');
    // this.scene.manager.stop('ui-inventory-menu');

    this.scene.launch('ui-system-menu');
  }

  openInventoryMenu() {
    this.scene.manager.stop('ui-system-menu');

    this.scene.launch('ui-inventory-menu');
  }

  update() {
    
  }
}

export default PauseMenu;