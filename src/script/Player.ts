import GameObject from "../core/GameObject"
import Component from "../core/Component";
import Event from "../core/Event";

export default class Player extends Component {
    speed = 1;
    start() {

    }
    update() {

        if (Event.keydown) {

            if (Event.input(87)) {
                this.gameObject.position.y -= this.speed;
            }


            if (Event.input('E') || Event.input('e')) {
                this.gameObject.transform.rotate += 1;
            }
            // console.warn(Event.getKeys);

            if (Event.input('Q') || Event.input('q')) {
                this.gameObject.transform.rotate -= 1;
            }

            if (Event.input(65)) {
                this.gameObject.position.x -= this.speed;
            }

            if (Event.input(83)) {
                this.gameObject.position.y += this.speed;
            }

            if (Event.input(68)) {
                this.gameObject.position.x += this.speed;
            }

        }

    }
}