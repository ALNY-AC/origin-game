import Component from "../Component";
import Transform from "../Transform";
import Position from "../Position";

/**正在碰撞的刚体的接口 */
interface ICollideding {
    /**产生碰撞的另一个碰撞组件 */
    other: RigidBody,
    /**产生碰撞的自身的碰撞组件 */
    self: RigidBody,
    /**碰撞累计 */
    count: number
}



/**
 * 刚体
 * 用于碰撞检测
 */
export default class RigidBody extends Component {


    /**方形刚体 */
    static SQUARE: number = 1;
    /**圆形刚体 */
    static CIRCULAR: number = 2;
    /**累计刚体数 */
    static rigidBodyCount: number = 0;
    /**所有刚体集合 */
    static rigidBodyPool: RigidBody[] = [];


    /**当前已经碰撞的刚体 */
    collideding: ICollideding[] = [];

    /**当前刚体类型 */
    shape: number = RigidBody.SQUARE;

    /**碰撞次数 */
    collisionCount: number = 0;

    static addPool(rigidBody: RigidBody) {
        RigidBody.rigidBodyPool.push(rigidBody);
        RigidBody.rigidBodyCount++;
    }

    static removePool(name: string) {
        RigidBody.rigidBodyPool = RigidBody.rigidBodyPool.filter(el => el.name != name);
    }

    start() {
        this.name = 'RigidBody' + RigidBody.rigidBodyCount;
        RigidBody.addPool(this);
    }

    update() {

        if (this.shape == RigidBody.SQUARE) {
            this.checkSquare();
        }
    }

    checkSquare() {

        const list = RigidBody.rigidBodyPool.filter(el => el.name !== this.name);

        let trasnform1: Transform = this.gameObject.transform;
        let position1: Position = this.gameObject.position;




        let top1 = position1.y;
        let left1 = position1.x;
        let right1 = position1.x + trasnform1.width;
        let bottom1 = position1.y + trasnform1.height;





        list.forEach((rb: RigidBody) => {
            let trasnform2: Transform = rb.gameObject.transform;
            let position2: Position = rb.gameObject.position;

            let top2 = position2.y;
            let left2 = position2.x;
            let right2 = position2.x + trasnform2.width;
            let bottom2 = position2.y + trasnform2.height;


            if (bottom1 < top2 || left1 > right2 || top1 > bottom2 || right1 < left2) {// 表示没碰上
                // 未碰撞
                let index = this.collideding.findIndex((el: ICollideding) => el.other.name == rb.name);
                if (index < 0) {
                    // 不存在

                } else {
                    // 存在

                    let collideding = this.collideding[index];
                    // 通知结束碰撞
                    collideding.self.gameObject.components.forEach((comp: Component) => {
                        comp.onCollisionExit(collideding.other, collideding.self);
                    });

                    this.collideding = this.collideding.filter((el: ICollideding) => el.other.name != rb.name);
                }
            } else {

                let index = this.collideding.findIndex((el: ICollideding) => el.other.name == rb.name);
                let collideding: ICollideding;
                if (index < 0) {
                    // 不存在
                    collideding = {
                        other: rb,
                        self: this,
                        count: 0
                    };
                    this.collideding.push(collideding);

                } else {
                    // 存在
                    collideding = this.collideding[index];

                }


                collideding.count++;

                // 已碰撞
                collideding.self.gameObject.components.forEach((comp: Component) => {
                    if (collideding.count == 1) {
                        comp.onCollisionEnter(rb, this);
                    }
                    comp.onCollisionStay(rb, this);
                });
            }


        });
    }

    destroy() {
        RigidBody.removePool(this.name);
    }

    onCollisionEnter(other: RigidBody, self: RigidBody): void { }
    onCollisionStay(other: RigidBody, self: RigidBody): void { }
    onCollisionExit(other: RigidBody, self: RigidBody): void { }
}