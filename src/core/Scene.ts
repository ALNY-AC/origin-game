import GameObject from "./GameObject";

export default class Scene {
    width: number = 1000;
    height: number = 900;
    gameObjects: GameObject[] = [];

    constructor() {

    }
    start() {

    }
    addGameObject(go: GameObject) {
        this.gameObjects.push(go);
        go.scene = this;
        go.start();
    }

    update() {
        this.gameObjects.forEach((el: GameObject) => {
            el.update();
        });
    }
    render(ctx: CanvasRenderingContext2D) {


        ctx.save();
        ctx.fillStyle = 'rgb(34,34,34)';
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.restore();

        this.gameObjects.forEach((el: GameObject) => {
            ctx.save();
            el.render(ctx);
            ctx.restore();
        });
    }
}