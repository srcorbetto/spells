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
    
    const img = canvas.toDataURL('image/png');
    
    $('#test').attr('src', img);
    clear();
    background('#f6f6f6');
    const imgEncoded = {
        url: img
    }
    $.post('/spell', imgEncoded, (data, status) => {
        // console.log(data);
    })
}