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
        let matchFound = false;
        let searchCounter = 3;
        // console.log('Labels:', data);
        for (i = 0; i < data.length; i++) {
            if (matchFound === false && searchCounter > 0) {
                const spellResponse = data[i].description;
                console.log(spellResponse);
                switch(spellResponse) {
                case 'Circle':
                    console.log('Circle response');
                    matchFound = true;
                break;
                case 'Oval':
                    console.log('Oval response');
                    matchFound = true;
                break;
                default:
                    console.log('No Match');
                    searchCounter --;
                }
            } else if (searchCounter <= 0) {
                console.log('No Match');
            }
        }
    })
}