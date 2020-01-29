import Origin from './core/Origin';
import './style.css';
import Scene from './core/Scene';
import Run from './script/Run';

let app = new Origin();

let scene = new Scene();
scene.scene = scene;
scene.addComponent(new Run());

app.scene = scene;
app.run();
