// Draw Object V1.1
const board = $('#design');
var boardX = document.getElementById('design').offsetLeft + $('.design-content').position().left,
    boardY = document.getElementById('design').offsetTop + $('.design-content').position().top;
let btnDraw = $('.btn-draw'),
    btnDrawInput = $('.btn-draw-input');

function resetDraw() {
    shape = 0;
    inputType = 0;
    gallery = null;
}

let shape = 0,
    inputType = 0,
    typeofinput = [
        '',
        'text',
        'number',
        'radio',
        'checkbox',
        'range'
    ];
btnDraw.click(function () {
    "use strict";
    resetDraw();
    shape = parseInt($(this)[0].attributes.value.value);
    //selection();
    if (shape === 4) {
        board.css('cursor', 'text');
    } else {
        board.css('cursor', 'crosshair');
    }
});
btnDrawInput.click(function () {
    "use strict";
    resetDraw();
    inputType = parseInt($(this)[0].attributes.value.value);
    //selection();
    board.css('cursor', 'crosshair');
});

let createShape = (type) => {
    let item = document.createElement(type);
    if (type === 'text') {
        item.contentEditable = true;
        item.style.fontSize = '16px';
        item.style.width = 'auto';
        item.style.height = 'auto';
    } else {
        item.style.border = '1px solid #000';
        if (type === 'circle') {
            item.style.borderRadius = '50%';
        }
    }
    return item;
}

board.mousedown(function (event) {
    "use strict";
    let element,
        isDraw = false,
        isWindow = false,
        clickElement = event.target,
        x1, x2, y1, y2;
    if (shape > 0 || inputType > 0) {
        isDraw = true;
        if ($(event.target).is(PAGE_DESIGN)) {
            x1 = event.pageX - boardX;
            y1 = event.pageY - boardY;
            isWindow = true;
        } else {
            x1 = event.pageX - boardX;
            y1 = event.pageY - boardY;
            isWindow = false;
            let haveParent = true;
            let parentElement = event.target;
            //	Check Parent Element
            while (haveParent) {
                x1 -= $(parentElement).position().left;
                y1 -= $(parentElement).position().top;
                if ($(parentElement.offsetParent).is(PAGE_DESIGN)) {
                    haveParent = false;
                } else {
                    parentElement = parentElement.offsetParent;
                }
            }
        }
        switch (shape) {
            case 0:
                element = document.createElement('input');
                element.type = typeofinput[inputType];
                element.style.width = 0;
                element.style.height = 0;
                break;
            case 1:
                element = document.createElement('rect');
                element.style.border = '1px solid #000';
                break;
            case 2:
                element = document.createElement('circle');
                element.style.border = '1px solid #000';
                element.style.borderRadius = '50%';
                break;
            case 3:
                element = document.createElement('line');
                element.style.backgroundColor = 'black';
                element.style.height = '1px';
                break;
            case 4:
                element = document.createElement('text');
                element.contentEditable = true;
                element.style.fontSize = '16px';
                element.style.width = 'auto';
                element.style.height = 'auto';
                break;
            default:
                element = document.createElement('div');
        }
        element.style.position = 'absolute';
        element.style.left = x1 + 'px';
        element.style.top = y1 + 'px';
        element.style.pointerEvents = 'none';
        event.target.appendChild(element);
    }
    board.mousemove(function (event) {
        if (isDraw && shape !== 4) {
            if (isWindow) {
                x2 = event.pageX - boardX - 2;
                y2 = event.pageY - boardY - 2;
            } else {
                x2 = event.pageX - boardX;
                y2 = event.pageY - boardY;
                isWindow = false;
                let haveParent = true;
                let parentElement = clickElement;
                //	Check Parent Element
                while (haveParent) {
                    x2 -= $(parentElement).position().left;
                    y2 -= $(parentElement).position().top;
                    if ($(parentElement.offsetParent).is(PAGE_DESIGN)) {
                        haveParent = false;
                    } else {
                        parentElement = parentElement.offsetParent;
                    }
                }
            }
            if (shape === 3) {
                let a, b, c, x, y, sx, sy, angle;

                if (x1 >= x2) {
                    a = x1 - x2;
                }
                if (x2 > x1) {
                    a = x2 - x1;
                }
                if (y1 >= y2) {
                    b = y1 - y2;
                }
                if (y2 > y1) {
                    b = y2 - y1;
                }

                c = Math.sqrt(a * a + b * b);
                sx = (x1 + x2) / 2;
                sy = (y1 + y2) / 2;
                x = sx - c / 2;
                y = sy;
                if (x2 < x1 && y2 > y1 || x2 > x1 && y2 < y1) {
                    angle = Math.PI - Math.atan2(b, a);
                } else {
                    angle = Math.PI - Math.atan2(-b, a);
                }
                element.style.left = x + 'px';
                element.style.top = y + 'px';
                element.style.width = c + 'px';
                element.style.transform = 'rotate(' + angle + 'rad)';
            } else {
                let width, height;
                if (x2 < x1) {
                    element.style.left = x2 + 'px';
                    element.style.width = x1 - x2 + 'px';
                    width = x1 - x2;
                } else {
                    element.style.left = x1 + 'px';
                    element.style.width = x2 - x1 + 'px';
                    width = x2 - x1;
                }
                if (y2 < y1) {
                    element.style.top = y2 + 'px';
                    element.style.height = y1 - y2 + 'px';
                    height = y1 - y2;
                } else {
                    element.style.top = y1 + 'px';
                    element.style.height = y2 - y1 + 'px';
                    height = y2 - y1;
                }

                if (element.type === 'radio' || element.type === 'checkbox') {
                    let size = Math.max(width, height) + 'px';
                    element.style.width = element.style.height = size;
                }
            }
            //uiBoxSize( $(element) , event.pageX , event.pageY);
        }
    });
    board.mouseup(function (event) {
        if (isDraw) {
            element.focus();
            isDraw = false;
            element.style.pointerEvents = '';
            board.css('cursor', '');
        }
        shape = 0;
        inputType = 0;
        //console.log( x1,y1, x2,y2 ,element.style.height,element.style.width)
    });
});

/* Icon Button */
/*
(function(){
	let color1 = 'transparent',
		color2 = '#000'
	let drawRect = SVG('draw-rect').size(30,30);
	let rect = drawRect.rect(20, 15).attr({
		fill : color1,
		'stroke-width' : 2,
		stroke : color2
	}).radius(2).move(5,7);
	let drawCircle = SVG('draw-circle').size(30,30);
	let circle = drawCircle.circle(20).attr({
		fill : color1,
		'stroke-width' : 2,
		stroke : color2
	}).move(5,5);
	let drawLine = SVG('draw-line').size(30,30);
	let line = drawLine.line(0,0,20,20).stroke({
		linecap: 'round',
		width : 2,
		color : color2
	}).move(5,5);
	let drawText = SVG('draw-text').size(30,30);
	let Text = drawText.text("T").attr({ color : color2}).font({ 
		family: 'Times New Roman',
		size : 28
	}).move(7,0);
})();
*/
/* Gallery */
(function () {
    /* FontAwesome */
    let fontawesome;
    $.getJSON("gallery/fontawesome.json", function (json) {
        fontawesome = json;
        console.log("Fontawesome 5.0.8");
    }).done((function () {
        for (let i = 0; i < fontawesome.fab.length; i++) {
            $('.gallery').append('<li class="icon"><i class="fab fa-' + fontawesome.fab[i] + '"></i></li>');
        }
        for (let i = 0; i < fontawesome.far.length; i++) {
            $('.gallery').append('<li class="icon"><i class="far fa-' + fontawesome.far[i] + '"></i></li>');
        }
        for (let i = 0; i < fontawesome.fas.length; i++) {
            $('.gallery').append('<li class="icon"><i class="fas fa-' + fontawesome.fas[i] + '"></i></li>');
        }

        var gallery = null;
        $('.gallery > li').click(function () {
            "use strict";
            resetDraw();
            gallery = $(this)[0].children[0];
            gallery = $(gallery).clone()
            board.css('cursor', 'crosshair');
            console.log(gallery)
        });

        board.mousedown(function (event) {
            "use strict";
            let element,
                isDraw = false,
                isWindow = false,
                clickElement = event.target,
                x1, x2, y1, y2;
            if (gallery != null) {
                isDraw = true;
                element = gallery[0];
                if ($(event.target).is(PAGE_DESIGN)) {
                    x1 = event.pageX - boardX;
                    y1 = event.pageY - boardY;
                    isWindow = true;
                } else {
                    x1 = event.pageX - boardX;
                    y1 = event.pageY - boardY;
                    isWindow = false;
                    let haveParent = true;
                    let parentElement = event.target;
                    //	Check Parent Element
                    while (haveParent) {
                        x1 -= $(parentElement).position().left;
                        y1 -= $(parentElement).position().top;
                        if ($(parentElement.offsetParent).is(PAGE_DESIGN)) {
                            haveParent = false;
                        } else {
                            parentElement = parentElement.offsetParent;
                        }
                    }
                }
                element.style.position = 'absolute';
                element.style.left = x1 + 'px';
                element.style.top = y1 + 'px';
                element.style.pointerEvents = 'none';
                event.target.appendChild(element);
            }

            board.mousemove(function (event) {
                if (isDraw && gallery != null) {
                    if (isWindow) {
                        x2 = event.pageX - boardX - 2;
                        y2 = event.pageY - boardY - 2;
                    } else {
                        x2 = event.pageX - boardX;
                        y2 = event.pageY - boardY;
                        isWindow = false;
                        let haveParent = true;
                        let parentElement = clickElement;
                        //	Check Parent Element
                        while (haveParent) {
                            x2 -= $(parentElement).position().left;
                            y2 -= $(parentElement).position().top;
                            if ($(parentElement.offsetParent).is(PAGE_DESIGN)) {
                                haveParent = false;
                            } else {
                                parentElement = parentElement.offsetParent;
                            }
                        }
                    }
                    if (x2 < x1) {
                        element.style.left = x2 + 'px';
                        element.style.width = x1 - x2 + 'px';
                    } else {
                        element.style.left = x1 + 'px';
                        element.style.width = x2 - x1 + 'px';
                    }
                    if (y2 < y1) {
                        element.style.top = y2 + 'px';
                        element.style.height = y1 - y2 + 'px';
                    } else {
                        element.style.top = y1 + 'px';
                        element.style.height = y2 - y1 + 'px';
                    }
                    element.style.fontSize = Math.max(element.clientWidth, element.clientHeight) + 'px';
                }
            });
            board.mouseup(function (event) {
                if (isDraw) {
                    element.focus();
                    element.style.width = 'auto';
                    element.style.height = 'auto';
                    //Selection($(element))
                    isDraw = false;
                    element.style.pointerEvents = '';
                    //element = $(element);
                    //selection(element);
                    //uiBoxSize();
                    board.css('cursor', '');
                }
                gallery = null;
            });
        });
    }));

    $('.search-gallery').on('input', function () {
        let find = new RegExp('(?:' + $(this).val() + ')', 'g'),
            item = $('.gallery li').children();

        for (let i = 0; i < item.length; i++) {
            let element = $(item[i]);
            if (find.test(element.attr('class'))) {
                element.parent().show();
            } else {
                element.parent().hide();
            }
        }

    });

})();

/* Google Font API */
// เร็วๆนี้
function SetFonts(fonts) {
    for (var i = 0; i < fonts.items.length; i++) {
        $('#google-font')
            .append($("<option></option>")
                .attr("value", fonts.items[i].family)
                .text(fonts.items[i].family));
    }
}
var script = document.createElement('script');
script.src = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAgfui9-yRG6g28Vf30Yq8-IS8K_nBA-Mk&callback=SetFonts';
document.body.appendChild(script);

//	Site Map [Version 1.0]
$('.show-tool, .show-property, #preview-file, .setting').on('click', function () {
    $('#site-management').hide();
});
$('.site-management').on('click', function () {
    $('.container-content').hide();
    let svg = document.getElementById('site-management');
    svg.innerHTML = '';
    $(svg).toggle();
    let w = 125,
        h = 150,
        distance = $('#site-management').width() / (pageCount * 2);
    BorderRadius = 5;
    console.log(distance)
    let svgns = "http://www.w3.org/2000/svg";
    let namepage = $('.site-list > ul.page > label');
    for (let i = 0; i < pageCount + 1; i++) {
        let rect = document.createElementNS(svgns, 'rect');
        rect.setAttributeNS(null, 'class', 'sitemap-page');
        //rect.setAttributeNS(null, 'name', 'sitemap-page');
        rect.setAttributeNS(null, 'x', 25 + (distance * i) + (w * i));
        rect.setAttributeNS(null, 'y', 25);
        rect.setAttributeNS(null, 'height', h);
        rect.setAttributeNS(null, 'width', w);
        rect.setAttributeNS(null, 'fill', 'rgb(0, 77, 153)');
        rect.setAttributeNS(null, 'rx', BorderRadius);
        rect.setAttributeNS(null, 'ry', BorderRadius);
        svg.appendChild(rect);
        let name = namepage[i].textContent;
        let text = document.createElementNS(svgns, 'text');
        text.setAttributeNS(null, 'class', 'sitemap-page-name');
        text.setAttributeNS(null, 'x', 25 + (distance * i) + (w * i));
        text.setAttributeNS(null, 'y', 20);
        text.setAttributeNS(null, 'fill', '#000');
        text.style.fontSize = '12px';
        text.style.fontFamily = 'Arial, Helvetica, sans-serif';
        text.appendChild(document.createTextNode(name));
        svg.appendChild(text);
    }
    // ค้าหา Node ที่มี href
    //console.log($(page[i]).find('[href]'));
    let site = $('.sitemap-page'),
        title = $('.sitemap-page-name');
    for (let from = 0; from < pageCount + 1; from++) {
        let link = $(page[from]).find('[href]'),
            interval = h / link.length;
        for (let a = 0; a < link.length; a++) {
            let href = $(link[a]).attr('href');
            let to;
            for (let b = 0; b < title.length; b++) {
                if ($(title[b]).text() === href.replace('.html', '')) {
                    to = b;
                }
            }

            //console.log(site[from], site[to]);
            //console.dir(site[from]);

            let line = document.createElementNS(svgns, 'line');
            line.setAttributeNS(null, 'class', '.sitemap-page-link');
            line.setAttributeNS(null, 'x1', parseInt($(site[from]).attr('x')) + w / 2);
            line.setAttributeNS(null, 'y1', parseInt($(site[from]).attr('y')) + (interval * a) + interval / 2);
            line.setAttributeNS(null, 'x2', parseInt($(site[to]).attr('x')) + w / 2);
            line.setAttributeNS(null, 'y2', parseInt($(site[to]).attr('y')) + (interval * a) + interval / 2);
            line.setAttributeNS(null, 'stroke', 'rgb(240, 0, 0)');
            line.setAttributeNS(null, 'stroke-width', '1');
            svg.appendChild(line);
            let c1 = document.createElementNS(svgns, 'circle');
            c1.setAttributeNS(null, 'class', '.sitemap-page-link-connect');
            c1.setAttributeNS(null, 'cx', parseInt($(site[from]).attr('x')) + w / 2);
            c1.setAttributeNS(null, 'cy', parseInt($(site[from]).attr('y')) + (interval * a) + interval / 2);
            c1.setAttributeNS(null, 'r', 2);
            c1.setAttributeNS(null, 'fill', 'rgb(255,0,0)');
            svg.appendChild(c1);
            let c2 = document.createElementNS(svgns, 'circle');
            c2.setAttributeNS(null, 'class', '.sitemap-page-link-connect');
            c2.setAttributeNS(null, 'cx', parseInt($(site[to]).attr('x')) + w / 2);
            c2.setAttributeNS(null, 'cy', parseInt($(site[to]).attr('y')) + (interval * a) + interval / 2);
            c2.setAttributeNS(null, 'r', 2);
            c2.setAttributeNS(null, 'fill', 'rgb(255,0,0)');
            svg.appendChild(c2);
        }
    }
});