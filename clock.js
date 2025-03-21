const canvas = document.getElementById('canvas');
const cxt = document.getElementById("canvas").getContext('2d');
const radius = canvas.width/2;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
cxt.translate(centerX, centerY);

// Load images
const bgImage = new Image();
bgImage.src = 'https://cdn.jsdelivr.net/gh/emoji-css/emoji-css/emoji/1f338.png'; // Cherry blossom emoji

// Colors
const colors = {
  faceColor: '#FFF0F5', // Light pink background
  borderColor: '#FF69B4', // Hot pink border
  centerColor: '#FF1493', // Deep pink center
  numberColor: '#8A2BE2', // Purple numbers
  hourHandColor: '#FF69B4', // Hot pink hour hand
  minuteHandColor: '#9370DB', // Medium purple minute hand
  secondHandColor: '#FF1493' // Deep pink second hand
};

function createStars() {
    const container = document.querySelector('.clock-container');
    const starCount = 20;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position around the clock
        const angle = Math.random() * Math.PI * 2;
        const distance = 220 + Math.random() * 100;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        // Random size
        const size = 3 + Math.random() * 5;
        
        // Set styles
        star.style.left = `calc(50% + ${x}px)`;
        star.style.top = `calc(50% + ${y}px)`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random animation delay
        star.style.animationDelay = `${Math.random() * 2}s`;
        
        container.appendChild(star);
    }
}

function drawClock(){
  drawFace(cxt, radius);
  drawNumbers(cxt, radius);
  drawDecorations(cxt, radius);
  drawTime(cxt, radius);
}       

function drawFace(cxt, radius){  
    // Main clock face
    cxt.beginPath();
    cxt.arc(0, 0, radius-5, 0, 2*Math.PI);    
    
    // Create gradient for face
    const gradient = cxt.createRadialGradient(0, 0, radius*0.5, 0, 0, radius);
    gradient.addColorStop(0, colors.faceColor);
    gradient.addColorStop(0.9, '#FFB6C1');
    cxt.fillStyle = gradient;
    cxt.fill();

    // Border with shadow
    cxt.save();
    cxt.shadowOffsetX = 3;
    cxt.shadowOffsetY = 3;
    cxt.shadowBlur = 10;
    cxt.shadowColor = 'rgba(0, 0, 0, 0.3)';
    cxt.lineWidth = 8;
    cxt.strokeStyle = colors.borderColor;
    cxt.stroke();
    cxt.restore();
    
    // Draw decorative inner circle
    cxt.beginPath();
    cxt.arc(0, 0, radius*0.1, 0, 2*Math.PI);    
    cxt.fillStyle = colors.centerColor;
    cxt.fill();
    
    // Draw small flower petals around center
    for (let i = 0; i < 8; i++) {
        const angle = i * Math.PI / 4;
        cxt.beginPath();
        cxt.arc(Math.cos(angle) * radius * 0.15, Math.sin(angle) * radius * 0.15, radius * 0.05, 0, 2 * Math.PI);
        cxt.fillStyle = '#FFB6C1';
        cxt.fill();
    }
}

function drawNumbers(cxt, radius){   
    cxt.font = 'bold 28px Comic Sans MS';
    cxt.fillStyle = colors.numberColor;
    cxt.textBaseline = 'middle';
    cxt.textAlign = 'center';
    
    for(let i = 1; i <= 12; i++){
        const angle = i * Math.PI / 6;
        cxt.save();
        cxt.rotate(angle);
        cxt.translate(0, -radius*0.75);
        cxt.rotate(-angle);
        
        // Add a cute circle behind each number
        cxt.beginPath();
        cxt.arc(0, 0, radius*0.1, 0, 2*Math.PI);
        cxt.fillStyle = 'rgba(255, 182, 193, 0.7)';
        cxt.fill();
        
        cxt.fillStyle = colors.numberColor;
        cxt.fillText(i.toString(), 0, 0);
        cxt.restore();
    }
}

function drawDecorations(cxt, radius) {
    // Draw tick marks
    for(let i = 0; i < 60; i++) {
        const angle = i * Math.PI / 30;
        cxt.save();
        cxt.rotate(angle);
        
        if(i % 5 === 0) {
            // Hour ticks
            cxt.lineWidth = 4;
            cxt.beginPath();
            cxt.moveTo(0, -radius + 15);
            cxt.lineTo(0, -radius + 30);
            cxt.strokeStyle = colors.borderColor;
            cxt.stroke();
        } else {
            // Minute ticks
            cxt.lineWidth = 2;
            cxt.beginPath();
            cxt.moveTo(0, -radius + 15);
            cxt.lineTo(0, -radius + 25);
            cxt.strokeStyle = '#D8BFD8';
            cxt.stroke();
        }
        
        cxt.restore();
    }
    
    // Draw small hearts at each hour position
    for(let i = 1; i <= 12; i++){
        const angle = i * Math.PI / 6;
        const x = Math.sin(angle) * (radius * 0.6);
        const y = -Math.cos(angle) * (radius * 0.6);
        
        drawHeart(cxt, x, y, radius * 0.05);
    }
}

function drawHeart(cxt, x, y, size) {
    cxt.save();
    cxt.translate(x, y);
    
    cxt.beginPath();
    cxt.moveTo(0, 0);
    cxt.bezierCurveTo(size / 2, -size, size, -size / 2, 0, size);
    cxt.bezierCurveTo(-size, -size / 2, -size / 2, -size, 0, 0);
    cxt.fillStyle = '#FF69B4';
    cxt.fill();
    
    cxt.restore();
}

function drawHand(cxt, pos, length, width, color){
    cxt.beginPath();
    cxt.lineWidth = width;
    cxt.lineCap = 'round';
    cxt.strokeStyle = color;
    
    // Add shadow to hands
    cxt.shadowColor = 'rgba(0, 0, 0, 0.2)';
    cxt.shadowBlur = 5;
    cxt.shadowOffsetX = 2;
    cxt.shadowOffsetY = 2;
    
    cxt.moveTo(0, 0);
    cxt.rotate(pos);
    cxt.lineTo(0, -length);
    cxt.stroke();
    cxt.rotate(-pos);
    
    // Reset shadow
    cxt.shadowColor = 'transparent';
}

function drawTime(cxt, radius){
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    
    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    drawHand(cxt, hour, radius * 0.5, radius * 0.07, colors.hourHandColor);
    
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(cxt, minute, radius * 0.75, radius * 0.05, colors.minuteHandColor);
    
    second = (second * Math.PI / 30);
    drawHand(cxt, second, radius * 0.85, radius * 0.02, colors.secondHandColor);
    
    // Draw decorative cap over the hands
    cxt.beginPath();
    cxt.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
    cxt.fillStyle = 'white';
    cxt.fill();
    cxt.strokeStyle = colors.borderColor;
    cxt.lineWidth = 2;
    cxt.stroke();
}

function updateClock(){
    cxt.clearRect(-radius, -radius, canvas.width, canvas.height);
    drawClock();
    requestAnimationFrame(updateClock);
}

updateClock();