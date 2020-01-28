import Scene from "./Scene";
import Event from "./Event";

export default class Origin {
    scene: Scene;
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById('app');
        this.ctx = this.canvas.getContext('2d');
        Event.init();

    }
    setScene(scene: Scene) {
        this.scene = scene;

    }
    run() {
        this.scene.start();
        setInterval(() => {
            Event.loop();
            this.update();
            this.render();
        }, 1);
    }
    render() {
        this.scene.render(this.ctx);
    }

    update() {
        this.canvas.setAttribute('width', this.scene.width + '');
        this.canvas.setAttribute('height', this.scene.height + '');
        this.scene.update();
    }
}
