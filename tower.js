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
        this.coolDown=500;
       
    }

    run(){
      this.update();
      this.checkFire();  
      this.render();
    }
    update(){
        let dx=this.loc.x-towerGame.cnv.mouseX;
        let dy=this.loc.y-towerGame.cnv.mouseY;
        this.towAngle=Math.atan2(dy,dx)-Math.PI;
    }
    checkFire(){
        let dx=this.loc.x-towerGame.cnv.mouseX;
        let dy=this.loc.y-towerGame.cnv.mouseY;
        let dist=Math.sqrt(dx*dx+dy*dy);
        let currentTime=Date.now();
        console.log(currentTime-this.lastTime);

        if(dist<250 && this.placed && (currentTime-this.lastTime)>this.coolDown){
            this.lastTime=currentTime;
            var bulletLocation= vector2d(this.loc.x,this.loc.y);
            var bullet=new Bullet(bulletLocation,this.towAngle,this.bulletImage);
            towerGame.bullets.push(bullet);
            bullet.visible=true;

        }
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