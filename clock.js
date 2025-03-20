const canvas = document.getElementById('canvas');
const cxt = document.getElementById("canvas").getContext('2d');
const radius=canvas.width/2;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
cxt.translate(centerX, centerY);

function drawClock(){
  drawFace(cxt,radius);
  drawNumbers(cxt,radius);
  drawTime(cxt,radius);
}       
function drawFace(cxt,radius){  
    cxt.beginPath();
    cxt.arc(0,0,radius-5,0,2*Math.PI);    
    cxt.fillStyle='white';
    cxt.fill();

    cxt.lineWidth=5;
    cxt.strokesStyle='black';
    cxt.stroke();
cxt.beginPath();
cxt.arc(0,0,radius*0.1,0,2*Math.PI);    
cxt.fillStyle='black';
cxt.fill();
}

function drawNumbers(cxt,radius){   
    cxt.font='30px Arial';
    cxt.fillStyle='black';
    cxt.textBaseline='middle';
    cxt.textAlign='center';
    for(let i=1;i<=12;i++){
        let angle=i*Math.PI/6;
        cxt.rotate(angle);
        cxt.translate(0,-radius*0.85);
        cxt.rotate(-angle);
        cxt.fillText(i.toString(),0,0);
        cxt.rotate(angle);
        cxt.translate(0,radius*0.85);
        cxt.rotate(-angle);
    }
}
function drawHand(cxt,pos,length,width){
    cxt.beginPath();
    cxt.lineWidth=width;
    cxt.lineCap='round';
    cxt.moveTo(0,0);
    cxt.rotate(pos);
    cxt.lineTo(0,-length);
    cxt.stroke();
    cxt.rotate(-pos);
}
function drawTime(cxt,radius){
    let now=new Date();
    let hour=now.getHours();
    let minute=now.getMinutes();
    let second=now.getSeconds();
    hour=hour%12;
    hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHand(cxt,hour,radius*0.5,radius*0.07);
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(cxt,minute,radius*0.7,radius*0.07);
    second=(second*Math.PI/30);
    drawHand(cxt,second,radius*0.9,radius*0.02);
}
function updateClock(){
    cxt.clearRect(-radius,-radius,canvas.width,canvas.height);
    drawClock();
    requestAnimationFrame(updateClock);
}
updateClock();