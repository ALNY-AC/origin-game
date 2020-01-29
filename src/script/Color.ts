import Component from "../core/Component";
import Event from "../core/Event";
import RigidBody from "../core/components/RigidBody";
import Square from "../core/shape/Square";

export default class Color extends Component {
    start(): void {
    }
    update(): void {
    }
    destroy(): void {
    }
    onCollisionEnter(other: RigidBody, self: RigidBody): void {
        this.gameObject.color = 'rgb(0,255,0)';
    }
    onCollisionStay(other: RigidBody, self: RigidBody): void {
        this.gameObject.color = 'rgb(0,255,255)';
    }
    onCollisionExit(other: RigidBody, self: RigidBody): void {
        this.gameObject.color = 'rgb(255,0,0)';
    }
}