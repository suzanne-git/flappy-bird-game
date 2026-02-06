import './style.css';
import Phaser from 'phaser';
import Boot from './scenes/Boot.js';
import Menu from './scenes/Menu.js';
import Play from './scenes/Play.js';
import GameOver from './scenes/GameOver.js';

const config = {
  type: Phaser.AUTO,
  parent: 'app',
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 },
      debug: false,
    },
  },
  scene: [Boot, Menu, Play, GameOver],
};

const game = new Phaser.Game(config);
