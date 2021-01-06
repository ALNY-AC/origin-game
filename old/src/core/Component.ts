import GameObject from "./GameObject";
import RigidBody from "./components/RigidBody";

export default abstract class Component {

    name: string;
    gameObject: GameObject;
    constructor(name: string = '') {
        this.name = name;
    }

    abstract start(): void;
    abstract update(): void;
    abstract destroy(): void;


    /**
     * 当碰撞产生的时候调用
     * @param  {RigidBody} other 产生碰撞的另一个碰撞组件
     * @param  {RigidBody} self  产生碰撞的自身的碰撞组件
     */
    abstract onCollisionEnter(other: RigidBody, self: RigidBody): void;
    /**
    * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
    * @param  {RigidBody} other 产生碰撞的另一个碰撞组件
    * @param  {RigidBody} self  产生碰撞的自身的碰撞组件
    */
    abstract onCollisionStay(other: RigidBody, self: RigidBody): void;

    /**
    * 当碰撞结束后调用
    * @param  {RigidBody} other 产生碰撞的另一个碰撞组件
    * @param  {RigidBody} self  产生碰撞的自身的碰撞组件
    */
    abstract onCollisionExit(other: RigidBody, self: RigidBody): void;



}