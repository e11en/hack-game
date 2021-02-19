import Phaser from "phaser";
import Scene from "./Scene";

const config = {
  type: Phaser.CANVAS,
  width: 800,
  height: 600,
  backgroundColor: '#53dbf7',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
},
  scene: [ Scene ]
};

const game = new Phaser.Game(config);

export default() => {
  return (
    <div>hallo 123</div>
  );
}