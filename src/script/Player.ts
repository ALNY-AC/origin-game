import Component from "../core/Component";
import Event from "../core/Event";
import RigidBody from "../core/components/RigidBody";
import Square from "../core/shape/Square";

export default class Player extends Component {

    speed = 2;
    weapon: Square;
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
    destroy(): void {
    }

    onCollisionEnter(other: RigidBody, self: RigidBody): void {
    }
    onCollisionStay(other: RigidBody, self: RigidBody): void {
    }
    onCollisionExit(other: RigidBody, self: RigidBody): void {
    }
}