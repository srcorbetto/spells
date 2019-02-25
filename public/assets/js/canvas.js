
function setup() {
    createCanvas(500, 500);
    background('#f6f6f6');
}

function draw() {
    
}

function mouseDragged() { 
	strokeWeight(10);
	line(mouseX, mouseY, pmouseX, pmouseY);
}

function mousePressed() { 
	strokeWeight(10);
	line(mouseX, mouseY, pmouseX, pmouseY);
}

function mouseReleased() { 
    console.log('Converted to .jpg');
    clear();
    background('#f6f6f6');
}