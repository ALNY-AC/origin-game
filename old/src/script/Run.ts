import Component from "../core/Component";
import Event from "../core/Event";
import RigidBody from "../core/components/RigidBody";
import Square from "../core/shape/Square";
import Player from "./Player";
import Color from "./Color";

export default class Run extends Component {


    blockList: Square[] = [];

    start() {

        let go = this.gameObject;
        let scene = this.gameObject.scene;
        for (let i = 0; i < 10; i++) {
            let block = new Square();
            this.blockList.push(block);
            block.addComponent(new Color());
            block.name = "block";
            scene.addGameObject(block);


            block.addComponent(new RigidBody());
            block.color = 'rgba(255,0,0)';

            block.transform.width = 50;
            block.transform.height = 50;
            let x = Math.round(Math.random() * scene.width);
            let y = Math.round(Math.random() * scene.height);
            block.position.x = x;
            block.position.y = y;


        }

        let playerBox = new Square();
        playerBox.name = 'playerBox';

        playerBox.addComponent(new RigidBody());
        playerBox.addComponent(new Player('Player'));




        scene.addGameObject(playerBox);
    }

    update() {

        if (Event.input('f') || Event.input('F')) {
            let scene = this.gameObject.scene;
            this.blockList.forEach((block: Square) => {
                let x = Math.round(Math.random() * scene.width);
                let y = Math.round(Math.random() * scene.height);
                block.position.x = x;
                block.position.y = y;
            });
        }

    }
    destroy(): void {
    }

    onCollisionEnter(other: RigidBody, self: RigidBody): void { }
    onCollisionStay(other: RigidBody, self: RigidBody): void { }
    onCollisionExit(other: RigidBody, self: RigidBody): void { }
}