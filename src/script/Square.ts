import GameObject from "../core/GameObject"

export default class Square extends GameObject {

    start() {
        this.transform.width = 50;
        this.transform.height = 50;

    }
    update() {
        super.update();
    }

    render(ctx: CanvasRenderingContext2D) {
        super.render(ctx);
        ctx.fillStyle = this.color;

        let x = this.position.x + (this.transform.width / 2);
        let y = this.position.y + (this.transform.height / 2);

        ctx.translate(x, y);
        ctx.rotate(Math.PI / 180 * this.transform.rotate);
        ctx.translate(-x, -y);

        if (this.parent) {
            ctx.fillRect(this.parent.position.x + this.position.x, this.parent.position.y + this.position.y, this.transform.width, this.transform.height);
        } else {
            ctx.fillRect(this.position.x, this.position.y, this.transform.width, this.transform.height);
        }
    }
}