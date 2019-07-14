'use strict'

window.addEventListener('load', init, false);

var towerGame;   
var FRAME_RATE=30;

function init(){ 
    towerGame=new Game();
      window.setTimeout(animate,100);
}

function animate(){
    towerGame.run();
    window.requestAnimationFrame(animate);
}

class Game{
    constructor(){
        this.towers=[];
        this.enemies=[];
        this.bullets=[];
        this.placingTower=false;
        this.isRunning=true;
        this.bankValue=1000;
        this.cnv=document.createElement("canvas");
        if(!this.cnv || !this.cnv.getContext){
            throw "No valid canvas found";
        }
        this.cnv.width=900;
        this.cnv.height=750;
        document.getElementById('canDiv').appendChild(this.cnv);
        this.cnv.addEventListener('mousemove',this.hndlCNVMouseMoved);
        this.cnv.addEventListener('mouseover',this.handleCNVMouseOver);
        this.cnv.addEventListener('click',this.handleCNVMouseClicked);
        this.context=this.cnv.getContext('2d');
        if (!this.context){
            throw "No valid context available";
        }

        this.tileDivs=this.createTileDivs();
        this.handleDomCallBacks(this.tileDivs);
    }


    run(){
        if(this.isRunning){
            this.render();
        }
        for(let i=0;i<this.towers.length;i++){
            this.towers[i].run();
        }

    }
    render(){
        this.context.clearRect(0,0,this.cnv.width,this.cnv.height)
    }
    handleCNVMouseOver() {
        if(towerGame.towers.length < 1) return;
        towerGame.towers[towerGame.towers.length-1].visible = true;
    }
    hndlCNVMouseMoved(event){
        this.mouseX=event.offsetX;
        this.mouseY=event.offsetY;
        if(towerGame.towers.length<1)return;
        if(!towerGame.towers[towerGame.towers.length-1].placed && towerGame.placingTower===true){
           towerGame.towers[towerGame.towers.length-1].loc.x=this.mouseX;
           towerGame.towers[towerGame.towers.length-1].loc.y=this.mouseY;
        }
    }
    handleCNVMouseClicked(){
        towerGame.towers[towerGame.towers.length-1].placed=true;
        towerGame.placingTower=false;
     
    }
    canAddTower(){
        if(towerGame.placingTower)
        return true;
        return(false);
    }
    
  
    
    createTileDivs(){
        var tilesDivs=[];
        for(var i=0;i<5;i++){
            var mtd=document.createElement("div");
            var cnvTowerImagePath=`images/tow${i+1}s.png`;
            var cnvBulletImagePath=`images/b${i+1}.png`;
            mtd.cnvTowerImg=new Image();
            mtd.cnvTowerImg.addEventListener('load',this.hideImgElement);
            mtd.cnvTowerImg.addEventListener('error',()=>{
                console.log(cnvTowerImagePath + "failed to load");
            })
            mtd.cnvTowerImg.src=cnvTowerImagePath;

            mtd.cnvBulletImg=new Image();
            mtd.cnvBulletImg.addEventListener('load',this.hideImgElement);
            mtd.cnvBulletImg.addEventListener('error',()=>{
                console.log(cnvBulletImagePath + "failed to load");
            })
            mtd.cnvBulletImg.src=cnvBulletImagePath;
            document.getElementById("menuDiv").appendChild(mtd);
            mtd.cost=100*i+50;
            mtd.id='towImgDiv' +i;
            tilesDivs.push(mtd);
            var tileImagePath='images/tow' + i + '.png';
            var tileImg=new Image();
            tileImg.addEventListener('error',function(){
                console.log(tileImagePath + "failed to load");
            })
            tileImg.src=tileImagePath;
            mtd.appendChild(tileImg);
        }
        return tilesDivs;
    }
    hideImgElement(){
      this.style.display=`none`;
    }
    handleDomCallBacks(tiles){

       for(var i=0;i<tiles.length;i++){
         var mtd=tiles[i];  
         mtd.addEventListener('mouseover',this.tileRollOver);
         mtd.addEventListener('mouseout',this.tileRollOut);
         mtd.addEventListener('click',this.tileClicked);
         mtd.addEventListener('mousedown',this.tilePressed)
         }  
    }
    tileClicked(){
       if(towerGame.placingTower===true)return;
       if(towerGame.bankValue>this.cost){
        
         towerGame.createTower(this);
         towerGame.placingTower=true;
        }
        console.log(this.towers.length);
    }
    createTower(mtd){
        var tower=new Tower(mtd.cost,mtd.cnvTowerImg,mtd.cnvBulletImg);
        if (tower){
            this.towers.push(tower);
        }
        else{
            console.log('Failed to create tower');
        }
        console.log(this.towers.length);
        }
         

    tileRollOver(){
        this.style.backgroundColor="#f7e22a";
    }
    tileRollOut(){
        this.style.backgroundColor="#DDD";
    }
    tilePressed(){
       this.style.backgroundColor="#900"; 
    }

}