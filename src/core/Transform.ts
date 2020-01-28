import GameObject from "./GameObject";

export default class Transform {
    parent: GameObject;
    width: number = 0;
    height: number = 0;
    rotate: number = 0;
    scale: number = 0;
}