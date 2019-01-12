import style from './main.css';
import Phaser, {Game} from 'phaser';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import TitleScene from './scenes/TitleScene';

const canvas = document.getElementById('game-canvas');
const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  canvas,
  scene: [
    BootScene,
    PreloaderScene,
    TitleScene
  ]
};

const game = new Game(config);

window.addEventListener('resize', () => {
  game.resize(window.innerWidth, window.innerHeight);
});