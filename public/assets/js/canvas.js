function setup() {
    const canvas = createCanvas(500, 250);
    background('rgba(230, 230, 230, 0.25)');
    canvas.parent('canvas-holder');
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
    const spellSelector = $('.spell');
    const img = canvas.toDataURL('image/png');
    clear();
    background('rgba(230, 230, 230, 0.25)');
    spellSelector.removeClass('spell-border');
    const imgEncoded = {
        url: img
    }
    $.post('/spell', imgEncoded, (data, status) => {
        const spellAnimation = $('#spell-animation');
        let matchFound = false;
        let searchCounter = 3;
        for (i = 0; i < data.length; i++) {
            if (matchFound === false && searchCounter > 0) {
                const spellResponse = data[i].description;
                console.log(spellResponse);
                switch(spellResponse) {
                case 'Circle':
                    console.log('Circle response');
                    matchFound = true;
                    $('.spell-circle').addClass('spell-border');
                    spellAnimation.attr('src', 'https://media.giphy.com/media/26BRt5hkD6hLzTl3q/giphy.gif');
                break;
                case 'Oval':
                    console.log('Oval response');
                    matchFound = true;
                    $('.spell-circle').addClass('spell-border');
                    spellAnimation.attr('src', 'https://media.giphy.com/media/26BRt5hkD6hLzTl3q/giphy.gif');
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

// https://media.giphy.com/media/26BRt5hkD6hLzTl3q/giphy.gif