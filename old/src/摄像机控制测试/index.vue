
<template>
  <div id="game">
    <div>
      <div>镜头偏移x:{{c_x}}</div>
      <div>镜头偏移y:{{c_y}}</div>
    </div>
    <canvas class="canvas" width="900" height="900" ref="canvas"></canvas>
  </div>
</template>
<script>
import Node from './Node'

export default {
  name: 'game',
  layout: 'root',
  data() {
    return {
      id: this.$getRandom('canvas_'),
      nodes: [],
      c_x: 0,
      c_y: 0,
      keyDowns: [],
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await this.$nextTick();
      this.ctx = this.$refs.canvas.getContext("2d");

      await this.initEvent();
      await this.build();
      await this.run();
    },
    async initEvent() {
      window.addEventListener('keydown', (e) => {
        this.keyDowns[e.keyCode] = true;
      });
      window.addEventListener('keyup', (e) => {
        this.keyDowns[e.keyCode] = false;
      })
    },
    async build() {

      let list = new Array(2).fill('').map((el, i) => {
        let node = new Node();
        if (i == 0) {
          node.w = 200
        }

        if (i == 1) {
          node.h = 200
        }
        // node.y = (10 + 10) * (i + 1);
        return node;
      });
      this.nodes = [...this.nodes, ...list];



      let node = new Node();
      node.color = "#f66";

      node.update = () => {
        // this.c_y = node.y
        // this.c_x = node.x
        let speed = 10.0;
        if (this.keyDowns[87]) {
          // w
          node.y -= speed;
          this.c_y = node.y;
        }
        if (this.keyDowns[65]) {
          // a
          node.x -= speed;
          this.c_x = node.x;
        }
        if (this.keyDowns[83]) {
          // s
          node.y += speed;
          this.c_y = node.y;
        }
        if (this.keyDowns[68]) {
          // d
          node.x += speed;
          this.c_x = node.x;
        }
      }

      this.nodes.push(node);

    },
    async run() {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.update();
        this.render();
      }, 24)
    },
    update() {
      this.nodes.forEach(node => {
        node.update();
      })
    },
    render() {
      this.ctx.fillStyle = "rgb(38,38,38)";
      this.ctx.strokeStyle = "rgb(38,38,38)";
      this.ctx.clearRect(0, 0, 900, 900);
      this.ctx.fillRect(0, 0, 900, 900);
      this.ctx.beginPath();

      let fillStyle = this.ctx.fillStyle;
      let strokeStyle = this.ctx.strokeStyle;
      let center = {
        x: (900 / 2),
        y: (900 / 2),
      };

      // // 横线
      // this.ctx.strokeStyle = "#ffffff";
      // this.ctx.beginPath();
      // this.ctx.moveTo(center.x, 0);
      // this.ctx.lineTo(center.x, 900);
      // this.ctx.lineWidth = 1;
      // this.ctx.stroke();


      // // 竖线
      // this.ctx.strokeStyle = "#ffffff";
      // this.ctx.beginPath();
      // this.ctx.moveTo(0, center.y);
      // this.ctx.lineTo(900, center.y);
      // this.ctx.lineWidth = 1;
      // this.ctx.stroke();

      // // 刻度线竖线
      // for (let i = 0; i < 900 / 10; i++) {
      //   this.ctx.strokeStyle = "#ffffff";
      //   this.ctx.moveTo(center.x, 10 * i);
      //   this.ctx.lineTo(center.x + 5, 10 * i);
      //   this.ctx.lineWidth = 0.1;
      //   this.ctx.stroke();
      // }


      // // 刻度线横线
      // for (let i = 0; i < 900 / 10; i++) {
      //   this.ctx.strokeStyle = "#ffffff";
      //   this.ctx.moveTo(10 * i, center.y,);
      //   this.ctx.lineTo(10 * i, center.y - 5);
      //   this.ctx.lineWidth = 0.1;
      //   this.ctx.stroke();
      // }



      this.nodes.forEach(node => {
        this.ctx.fillStyle = node.color;
        this.ctx.fillRect((node.x + center.x) + -this.c_x, (node.y + center.y) + -this.c_y, node.w, node.h);
        node.render(this.ctx);
      });
      this.ctx.fillStyle = fillStyle;
      this.ctx.strokeStyle = strokeStyle;

    },
  }

}
</script>
<style lang="scss" scoped>
.canvas {
}
</style>

