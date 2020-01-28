import Origin from './core/Origin';
import Square from './script/Square';
import './style.css';
import Scene from './core/Scene';
import Player from './script/Player';

let app = new Origin();
let scene = new Scene();

let square = new Square();
let square2 = new Square();

let player = new Player();
square.addComponent(player);


scene.addGameObject(square);
scene.addGameObject(square2);
square2.color = 'rgba(255,0,0)'




app.scene = scene;
app.run();