$(document).ready(() => {

    const canvas = $('#defaultCanvas0');
    console.log(canvas);

    $('button').on('click', e => {
        e.preventDefault();
        console.log('Click');
        const img = canvas[0].toDataURL('image/png');
        console.log(img);
        $('#test').attr('src', img)
    })

});