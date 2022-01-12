const cow_skin = cc.Class({
    name:"cow_skin",
    properties:{
        cows:{
            default:[],
            type:[cc.SpriteFrame]
        }
    }
})

cc.Class({
    extends: cc.Component,

    properties: {
        cow_set: {
            default: [],
            type: [cow_skin],
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.intervalTime = 0;

        this.randomType = Math.floor(Math.random()*3);
    },

    start () {

    },

    update (dt) {
        this.intervalTime += dt;
        let index = Math.floor( this.intervalTime / 0.2);
        index = index%3;

        let cowSet = this.cow_set[this.randomType];

        let sprite = this.node.getComponent(cc.Sprite);
        sprite.spriteFrame = cowSet.cows[index];
        //cc.log(index);
    },

    runCallback () {
        cc.log("一个轮回结束");
        this.randomType = Math.floor(Math.random()*3);
    }
});
