import Component from "./Component";
import Scene from "./Scene";
import Position from "./Position";
import Transform from "./Transform";

export default abstract class GameObject {

    name: string;
    components: Component[] = [];
    parent: GameObject;
    scene: Scene;
    position: Position = new Position();;
    transform: Transform = new Transform();;
    color: string = 'rgb(255,255,255)';
    gameObjects: GameObject[] = [];

    constructor(name: string = '') {
        this.name = name;
    }

    abstract start(): void;

    update() {
        this.components.forEach((el: Component) => {
            el.update();
        });
        this.gameObjects.forEach((el: GameObject) => {
            el.update();
        });
    }
    render(ctx: CanvasRenderingContext2D) {
        this.gameObjects.forEach((el: GameObject) => {
            ctx.save();
            el.render(ctx);
            ctx.restore();
        });
    }



    addComponent(comp: Component) {
        this.components.push(comp);
        comp.gameObject = this;
        comp.start();
    }
    addGameObject(go: GameObject) {
        this.gameObjects.push(go);
        go.parent = this;
        go.start();
    }

    destroy() {
        this.gameObjects.forEach((el: GameObject) => {
            el.destroy();
        });
        this.components.forEach((el: Component) => {
            el.destroy();
        });
    }
}