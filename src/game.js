import style from './main.css';
import Phaser, {Game} from 'phaser';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import TitleScene from './scenes/TitleScene';
import CreditsScene from './scenes/CreditsScene';

// Levels
import AfricaCampLevel from './scenes/levels/AfricaCampLevel';
import TestLevel from './scenes/levels/TestLevel';
import Level1 from './scenes/levels/Level1';

const canvas = document.getElementById('game-canvas');
const config = {
  type: Phaser.AUTO,
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
    CreditsScene,
    AfricaCampLevel,
    TestLevel,
    Level1
  ],
  pixelArt: true
};

const game = new Game(config);

window.addEventListener('resize', () => {
  game.resize(window.innerWidth, window.innerHeight);
});
