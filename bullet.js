'use strict'
class Bullet{
    constructor(loc,angle,bulletImage){
        this.location=loc;
        this.angle=angle;
        this.theta=0;
        this.img=bulletImage;
        this.speed=5;
    }
    run(){
        this.update();
        this.render();
    }

    update(){
      this.location.y+=Math.sin(this.angle)*this.speed;
      this.location.x+=Math.cos(this.angle)*this.speed;
      this.theta+=0.1;
    }
    render(){
        var ctx=towerGame.context;
        ctx.save();
        ctx.translate(this.location.x,this.location.y);
        ctx.rotate(this.theta);
        ctx.drawImage(this.img, -this.img.width/2,-this.img.height/2);
        ctx.restore();
   
    }
}