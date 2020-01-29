import GameObject from "./GameObject";

export default class Scene extends GameObject {
    width: number = 1000;
    height: number = 900;
    gameObjects: GameObject[] = [];

    start() {
        this.scene = this;
    }
    addGameObject(go: GameObject) {
        go.scene = this;
        super.addGameObject(go);
    }

    update() {
        super.update();
    }
    render(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.fillStyle = 'rgb(34,34,34)';
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.restore();
        super.render(ctx);
    }
    destroy() {
        super.destroy();
    }
}