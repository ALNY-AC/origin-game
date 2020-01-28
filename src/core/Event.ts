export default class Event {
    static downCount = 0;
    static keyList: any = {};
    static keyCount: any = {};
    static keyChars: any = {};
    static mouse = { x: 0, y: 0, down: false, downCount: 0 };
    static key: string;
    static keyCode: number;
    static keydown: Boolean;
    static init() {
        let $el = <HTMLCanvasElement>document.getElementById('app');
        for (let i = 0; i < 256; i++) {
            Event.keyList[i] = false;
            Event.keyCount[i] = 0;
        }
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            Event.keyList[e.keyCode] = true;
            Event.key = e.key;
            Event.keyCode = e.keyCode;
            Event.keyChars[e.key] = true;
        });
        window.addEventListener('keyup', (e) => {
            Event.keyList[e.keyCode] = false;
            Event.keyChars[e.key] = false;
        });
        $el.addEventListener('mousemove', (e) => {
            Event.mouse.x = e.clientX;
            Event.mouse.y = e.clientY;
        });
        window.addEventListener('mouseleave', (e: KeyboardEvent) => {
            // Event.keyList[e.keyCode] = false;
        });
        $el.addEventListener('mousedown', (e: MouseEvent) => {
            Event.mouse.down = true;
        });

        $el.addEventListener('mouseup', (e: MouseEvent) => {
            Event.mouse.down = false;
        });
    }
    static loop() {
        let list = Object.keys(Event.keyList).filter(el => Event.keyList[el]);
        Object.keys(Event.keyList).map(el => Event.keyList[el]);
        Object.keys(Event.keyList).forEach(key => {
            if (Event.keyList[key]) {
                Event.keyCount[key]++;
            } else {
                Event.keyCount[key] = 0;
            }
        });

        if (list.length > 0) {
            Event.keydown = true;
            Event.downCount++;
        } else {
            Event.keydown = false;
            Event.downCount = 0;
        }
        if (Event.mouse.down) {
            Event.mouse.downCount++;
        } else {
            Event.mouse.downCount = 0;
        }
    }
    static input(key: number | string): Boolean {
        if (typeof key == 'string') {
            return !!Event.keyChars[key];
        } else {
            return !!Event.keyList[key];
        }

    }
    static getKeys(): Array<String> {
        let list = Object.keys(Event.keyList).filter(el => Event.keyList[el]);
        return list;
    }
    static getCount(key: number): number {
        return Event.keyCount[key];
    }
}