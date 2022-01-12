cc.Class({
    extends: cc.Component,

    properties: {
        rope_node: {
            default: null,
            type: cc.Node,
        },
        cow_ins: {
            default: null,
            type: cc.Node,
        },
        rope_imgs: {
            default: [],
            type: cc.SpriteFrame,
        },
        cow_prefab: {
            default: null,
            type: cc.Prefab,
        },
        time: 0,
    },

    onLoad() {
        this.success = false;
        this.scoreNum = 0;
        console.log("微信开发666")
    },

    start () {
        let countDownLabel = cc.find("Canvas/bg_sprite/ count_down").getComponent(cc.Label);
        countDownLabel.string = this.time + "s";
        this.schedule(function (){
           this.time--;
           countDownLabel.string = this.time + "s";
           if(this.time==0){
               let resultNode = cc.find("Canvas/result");
               let titleNode = resultNode.getChildByName("title");
               let contentNode = resultNode.getChildByName("content");
               titleNode.getComponent(cc.Label).string = "最终得分：" + this.scoreNum;

               let contentLabel = contentNode.getComponent(cc.Label);
               switch (true){
                   case this.scoreNum <=3:
                       contentLabel.string = "套牛青铜";
                       break;
                   case  this.scoreNum <= 6:
                       contentLabel.string = "套牛白银";
                       break;
                   case  this.scoreNum > 6:
                       contentLabel.string = "套牛王者";
                       break;
               };

               resultNode.active = true;
               cc.director.pause();
           }
        },1);
    },

    clickCapture: function (event, customEventData) {
        // 激活当前节点
        this.rope_node.active = true;
        this.rope_node.setSiblingIndex(100);
        this.rope_node.y = -500;
        //往上拉
        const up = cc.moveTo(0.5,this.rope_node.x,0);

        let result = cc.callFunc(function(){
            let currentX = this.cow_ins.x;
            if(currentX>-150 && currentX<150){
                cc.log("捕捉成功");
                let bgNode = this.node.getChildByName("bg_sprite");
                bgNode.removeChild(this.cow_ins);
                let ropeType = this.cow_ins.getComponent("cow").randomType + 1;
                this.rope_node.getComponent(cc.Sprite).spriteFrame = this.rope_imgs[ropeType];
                this.cow_ins = cc.instantiate(this.cow_prefab);
                bgNode.addChild(this.cow_ins);

                this.success = true;
                this.scoreNum += 1;
            }
            else{
                cc.log("捕捉失败");
                this.success = false;
            }
        },this);
        //往回拉
        let down = cc.moveTo(0.5,this.rope_node.x,-600);
        //换绳子
        let finish = cc.callFunc(function (){
            this.rope_node.getComponent(cc.Sprite).spriteFrame = this.rope_imgs[0];
            if(this.success==true){
                let scorelabel = cc.find("Canvas/bg_sprite/score").getComponent(cc.Label);
                scorelabel.string = "Score:" + this.scoreNum;
                this.success = false;
            }
        },this);

        let sequence = cc.sequence(up,result,down,finish);
        this.rope_node.runAction(sequence);
    },

    closeBtn(){
        cc.director.resume();
        cc.director.loadScene("game");
    }

});
