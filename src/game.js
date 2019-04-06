import style from './main.css';
import Phaser, {Game} from 'phaser';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import TitleScene from './scenes/TitleScene';

// Levels
import AfricaCampLevel from './scenes/levels/AfricaCampLevel';
import TestLevel from './scenes/levels/TestLevel';
import Level1 from './scenes/levels/Level1';

// UIs
import PauseMenu from './scenes/ui/PauseMenu';

const canvas = document.getElementById('game-canvas');
const config = {
  type: Phaser.WEBGL,
  width: window.innerWidth,
  height: window.innerHeight,
  canvas,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400 },
      debug: (typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'development')
    }
  },
  scene: [
    BootScene,
    PreloaderScene,
    TitleScene,
    AfricaCampLevel,
    TestLevel,
    Level1,
    PauseMenu
  ],
  pixelArt: true
};

const game = new Game(config);

window.addEventListener('resize', () => {
  game.resize(window.innerWidth, window.innerHeight);
});
