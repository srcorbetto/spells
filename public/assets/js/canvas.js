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
    // console.log(`img: ${img}`);
    $('#test').attr('src', img);
    clear();
    background('#f6f6f6');
    const imgEncoded = {
        url: img
    }
    $.post('/spell', imgEncoded, (data, status) => {
        console.log('Labels:', data);
        for (i = 0; i < data.length; i++) {
            const spellResponse = data[i].description;
            console.log(spellResponse);
            switch(spellResponse) {
            case 'Circle':
                console.log('Circle response');
            break;
            case 'Oval':
                console.log('Oval response');
            break;
            case 'Line art':
                console.log('Line Art response');
            break;
            default:
                console.log('No Match');
            }
        }
    })
}