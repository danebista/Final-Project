'use strict'
class Tower{
    constructor(cost, tImg, bImg){
        this.cost=cost;
        this.bulletImage=bImg;
        this.towImg=tImg;
        this.loc=vector2d(0,0);
        this.towAngle=0;
        this.visible=false;
        this.lastTime=Date.now();
        this.coolDown=1000;
    }

    run(){
      this.update();
      this.render();  
    }
    update(){
    }
    render(){
        var ctx= towerGame.context;
        ctx.save();
        ctx.translate(this.loc.x,this.loc.y);
        ctx.rotate(this.towAngle);
        if(this.visible){
            ctx.drawImage(this.towImg, -this.towImg.width/2,-this.towImg.height/2);
    }
    ctx.restore();
}
    checkEnemies(){
    }
}