/* Color */
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ?
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
}

/* แบบมี #
function rgb2hex(rgb){
    rgb = rgb.match(/^rgb?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
    ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}
*/
function rgba(rgba) {
    rgba = rgba.replace("rgba", "").replace('(', "").replace(')', "")
}

let fontStyle = (param) => {
    let elem = $(param);
    /*
    font-family: 'Open Sans', sans-serif;

    Light = font-weight: 300;
    Light Italic
    Regular = font-weight: 400;
    Regular Italic = font-style: italic;
    Medium = font-weight: 600;
    Medium Italic
    Bold = font-weight: 700;
    Bold Italic
    Black = font-weight: 800;
    Black Italic
    */
}

let margin = (param) => {
    let element = $(param),
        left = element.css('margin-left') || null,
        right = element.css('margin-right') || null,
        top = element.css('margin-top') || null,
        bottom = element.css('margin-bottom') || null;

    left = parseInt(left);
    top = parseInt(top);
    right = parseInt(right);
    bottom = parseInt(bottom);

    return {
        top,
        left,
        right,
        bottom
    };
}
let padding = (param) => {
    let element = $(param),
        left = element.css('padding-left') || null,
        right = element.css('padding-right') || null,
        top = element.css('padding-top') || null,
        bottom = element.css('padding-bottom') || null;

    left = parseInt(left);
    top = parseInt(top);
    right = parseInt(right);
    bottom = parseInt(bottom);

    return {
        top,
        left,
        right,
        bottom
    };
}
let pos = (param) => {
    let element = $(param),
        type = element.css('position'),
        value = null,
        pad = padding(element);
    switch (type) {
        case 'static':
            value = margin(element);
            value.top += pad.top;
            value.left += pad.left;
            break;
        case 'absolute':
            value = {
                top: $(element).position().top,
                left: $(element).position().left
            };
            value.top += pad.top;
            value.left += pad.left;
            break;
        case 'fixed':
            value = {
                top: $(element).offset().top,
                left: $(element).offset().left
            };
            value.top += pad.top;
            value.left += pad.left;
            break;
        case 'relative':
            value = {
                top: $(element).position().top,
                left: $(element).position().left
            };
            value.top += pad.top;
            value.left += pad.left;
            break;
        case 'sticky':
            value = 'Not Support';
            break;
        default:
            value = 'Not Working';
    }
    return value;
}
let posStatic = (element) => {
    let parent = $(element).parent().children(),
        child = null,
        offset = pos(element),
        left = offset.left,
        top = offset.top;
    for (let i = 0; i < parent.length; i++) {
        child = $(parent[i]);
        if (child.is($(element))) {
            break;
        } else {
            switch (child.css('position')) {
                case 'static':
                    offset = pos(child);
                    offset.top += child.height();
                    break;
                case 'relative':
                    offset = pos(child);
                    offset.top += child.height();
                    break;
            }
            left += offset.left;
            top += offset.top;
        }
    }
    console.log(left, top);
    return {
        left,
        top
    };
}

let currentPos = (param) => {
    let element = $(param);
    let owner = $('body'),
        parent = element,
        left = 0,
        top = 0,
        offset,
        haveParent = true;
    while (haveParent) {
        if (parent.parent().is(owner)) {
            haveParent = false;
        } else {
            if (parent.css('position') === 'static' || parent.css('position') === 'relative') {
                offset = posStatic(parent);
            } else {
                offset = pos(parent);
            }
            //console.log(parent, offset);
            left += parseInt(offset.left);
            top += parseInt(offset.top);
            parent = parent.parent();
        }
    };
    return {
        left,
        top
    };
}

let matrix = () => {

}

let rotate = (element) => {
    let matrix = element.css("transform");

    if (matrix === 'none') {
        return false;
    }

    let values = matrix.split('(')[1].split(')')[0].split(',');
    //rotate(Xdeg) = matrix(cos(X), sin(X), -sin(X), cos(X), 0, 0);
    let a = values[0];
    let b = values[1];
    let c = values[2];
    let d = values[3];

    var angle = Math.round(Math.asin(b) * (180 / Math.PI));

    return angle;
    //console.log(angle);
}

var property = (a) => {
    let element = a || null;
    if (element === null) {
        $('.css-value').val('');
        $('.jscolor').css('background-color', 'transparent');
        $('#css-border-style').children().css('border-style', 'none');
        $('#css-border-style').children().css('border-color', 'transparent');
        $('.radio-bg-color')[0].checked = true;
        $('.type-bg-color').hide();
        $('.type-bg-color-0').show();
        $('.border-style-option').css('border-color', 'transparent');
        $('.input-shadow').val('');
        $('#css-opacity').val('');
        return false;
    }
    $('#css-left').val(parseInt(element.css('left')))
    $('#css-top').val(parseInt(element.css('top')))
    $('#css-width').val(parseInt(element.css('width')))
    $('#css-height').val(parseInt(element.css('height')))

    //Box model
    //console.log( margin(element));
    //console.log( padding(element));
    //console.log( currentPos( element ) );

    if (element.css('transform') !== 'none' && element.css('transform') !== '') {
        //console.log(element.css('transform'))
        $('#css-rotate').val(parseInt(rotate(element)))
    }
    // Font
    $('#css-font-family').val(element.css('font-family'))
    $('#css-font-size').val(parseInt(element.css('font-size')))
    $('#css-color').val(rgb2hex(element.css('color')))
    $('#css-color').css('background-color', element.css('color'))
    // Border
    $('#css-border-width').val(parseInt(element.css('border-width')))
    $('#css-border-color').val(rgb2hex(element.css('border-color')))
    $('#css-border-color').css('background-color', element.css('border-color'))
    $('#css-border-radius').val(parseInt(element.css('border-radius')))

    $('#css-border-style').children().css('border-style', element.css('border-style'));
    $('#css-border-style').children().css('border-color', element.css('border-color'));
    $('.border-style-option').css('border-color', element.css('border-color'));

    let opacity = parseInt(element.css('opacity') * 100);
    $('#css-opacity').val(opacity + '%');
    $('#range-transparent').val(opacity);
    // Background
    $('#css-background-color').val(rgb2hex(element.css('background-color')))
    $('#css-background-color').css('background-color', element.css('background-color'))
    // Gradient
    if (/gradient/g.test(element[0].style.background)) {
        $('.radio-bg-color')[1].checked = true;
        $('.type-bg-color').hide();
        $('.type-bg-color-1').show();
        let gradient = element[0].style.background;
        gradient = gradient.match(/rgb?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?\)/g);
        $('#gradients-color-count').val(gradient.length);
        let count = $('#gradients-color-count').val(),
            len = $('.gradients-color').length;
        if (len < count) {
            for (; len < count; len++) {
                let input = document.createElement('input');
                input.setAttribute('class', 'jscolor gradient-value-color');
                $(input).on('change', function () {
                    let v = $('.type-gradients').val() + '-gradient(';
                    for (let i = 0; i < $('.gradients-color').length; i++) {
                        v += '#' + $('.gradient-value-color')[i].value;
                        (i + 1 < $('.gradients-color').length) ? v += ',': v += ')';
                    }
                    $('[widget]').css('background', v);
                });
                let picker = new jscolor(input);
                picker.fromRGB(255, 255, 255);
                let item = $('<tr class="type-bg-color type-bg-color-1 gradients-color"></tr>');
                item.append('<td>Color</td>');
                item.append(input);
                $('.gradients-color-number').parent().append(item);
            }
        } else if (len > count) {
            for (; len > count; len--) {
                $('.type-bg-color.type-bg-color-1.gradients-color')[len - 1].remove();
            }
        }
        for (let a = 0; a < $('.gradient-value-color').length; a++) {
            console.log($('.gradient-value-color')[a])
            $('.gradient-value-color')[a].value = rgb2hex(gradient[a]);
            $('.gradient-value-color')[a].style.backgroundColor = '#' + rgb2hex(gradient[a]);
        }
    }
    // Shadow
    let boxShadow = shadow(element.css('box-shadow'));
    $('#css-shadow-color').val(rgb2hex(String(boxShadow[0])));
    $('#shadow-h-offset').val(parseInt(boxShadow[1]));
    $('#shadow-v-offset').val(parseInt(boxShadow[2]));
    $('#shadow-blur').val(parseInt(boxShadow[3]));
    $('#shadow-spread').val(parseInt(boxShadow[4]));
}

$('.css-value').on('change', function () {
    let property = $(this).attr('id').replace("css-", "");
    let value = $(this).val();
    if (property === 'left' || property === 'top' || /size/g.test(property) || /radius/g.test(property)) value += 'px';
    if (/color/g.test(property)) value = '#' + value;
    $('[widget]').css(property, value);
    widget(document.querySelector('[widget]')).resize();
    console.log(property, value);
});

// Rotate
(function () {
    let isWindow = false;
    $('#css-rotate').on('click', function () {
        if (isWindow) {
            return true;
        } else {
            isWindow = true;
            let rotateRange = $('<div id="rotate-range"></div>').append('<input type="range" min="0" max="360">');
            rotateRange.css({
                'padding': '2px 5px',
                'background': '#fff',
                'border': '1px solid rgb(187, 187, 187)',
                'border-radius': '5px',
                'box-shadow': 'rgba(0, 0, 0, 0.2) 0px 15px 15px 0px'
            });
            $('body').append(rotateRange);
            let rotatePopper = new Popper($(this), rotateRange, {
                placement: 'bottom',
            });
            $('#rotate-range input').val( rotate($('[widget]')) );
            $('#rotate-range input').on('input change', function () {
                let val = $(this).val();
                $('#css-rotate').val(val);
                $('[widget]').css('transform', 'rotate(' + val + 'deg)');
                widget(document.querySelector('[widget]')).resize();
                property( $('[widget]') );
            });
        }
        $('*').on('click', function (event) {
            if ($(event.target).is('#css-rotate')) {
                return true;
            } else if ($(event.target).is('#rotate-range') || $(event.target).is('#rotate-range input')) {
                return true;
            } else {
                $('#rotate-range').remove();
                isWindow = false;
            }
        });
    });
})();

//	Transparent
$('#css-opacity').on('change', function () {
    $('[widget]').css('opacity', parseFloat($(this).val()) / 100);
    $('#range-transparent').val(parseFloat($(this).val()));
    $('#css-opacity').val(parseFloat($(this).val()) + '%');
});
$('#range-transparent').on('input change', function () {
    "use strict";
    $('#css-opacity').val($(this).val() + '%');
    $('[widget]').css('opacity', parseFloat($(this).val()) / 100);
});

//  Background
$('.radio-bg-color').on('change', function () {
    let type = $(this).val();
    $('.type-bg-color').hide();
    $('.type-bg-color-' + type).show();
});
$('.type-gradients').on('change', function () {
    $('[widget]').css('background', $(this).val() + '-gradient()');
});
$('#gradients-color-count').on('change', function () {
    let count = $(this).val(),
        len = $('.gradients-color').length;
    if (len < count) {
        for (; len < count; len++) {
            let input = document.createElement('input');
            input.setAttribute('class', 'jscolor gradient-value-color');
            $(input).on('change', function () {
                let v = $('.type-gradients').val() + '-gradient(';
                for (let i = 0; i < $('.gradients-color').length; i++) {
                    v += '#' + $('.gradient-value-color')[i].value;
                    (i + 1 < $('.gradients-color').length) ? v += ',': v += ')';
                }
                console.log(v)
                $('[widget]').css('background', v);
            });
            let picker = new jscolor(input);
            picker.fromRGB(255, 255, 255);
            let item = $('<tr class="type-bg-color type-bg-color-1 gradients-color"></tr>');
            item.append('<td>Color</td>');
            item.append(input);
            $('.gradients-color-number').parent().append(item);
        }
        let val = $('.type-gradients').val() + '-gradient(';
        for (let a = 0; a < $('.gradients-color').length; a++) {
            val += '#' + $('.gradient-value-color')[a].value;
            (a + 1 < $('.gradients-color').length) ? val += ',': val += ')';
        }
        console.log(val)
        $('[widget]').css('background', val);
    } else if (len > count) {
        for (; len > count; len--) {
            $('.type-bg-color.type-bg-color-1.gradients-color')[len - 1].remove();
        }
    }
});

//  Shadow
//  none|h-offset v-offset blur spread color |inset|initial|inherit
let shadow = (value) => {
    if (value === 'none') {
        value = 'rgb(0,0,0) 0px 0px 0px 0px';
    }
    let c = value.match(/^rgb?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?\)/g);
    /*
    ^rgb?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?\).([0-9])\w+
    */
    let val = value.match(/([0-9]+px)/g);
    //console.log( c ,val )
    let h = val[0] || '0px',
        v = val[1] || '0px',
        b = val[2] || '0px',
        s = val[3] || '0px';
    return [c, h, v, b, s];
}

// Android
let html2xml = (element) => {
    let shape = '';
    (element.nodeName === 'rect') ? shape = '': shape = 'rectangle';
    let xml = `<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="${shape}">\n`;
    //if( element.style.left !== '') 
    //$('#css-top').val( parseInt( element.css('top') ) )
    if (element.style.width !== '' || element.style.height !== '') {
        xml += `\t<size`;
        if (element.style.width !== '') xml += `\n\t\tandroid:width="${element.style.width}"`;
        if (element.style.height !== '') xml += `\n\t\tandroid:height="${element.style.height}"`;
        xml += `\n\t/>\n`;
    }

    /*
    if( element.css('transform') !== 'none' && element.css('transform') !== '' ){
        //console.log(element.css('transform'))
        $('#css-rotate').val( parseInt( rotate(element) ) )
    }
    */
    // Font
    /*
    $('#css-font-family').val( element.css('font-family')  )
    $('#css-font-size').val( parseInt( element.css('font-size') ) )
    $('#css-color').val( rgb2hex(element.css('color')) )
    $('#css-color').css('background-color', element.css('color') )
    <padding
        android:left="0dp"
        android:top="0dp"
        android:right="0dp"
        android:bottom="0dp"
        />
    */
    // Border
    if (element.style.border !== '') {
        xml += `\t<stroke
        \tandroid:width="${element.style.borderWidth}"
        \tandroid:color="#${rgb2hex(element.style.borderColor)}"
    \t/>\n`
    }
    if (element.style.borderRadius !== '') xml += `\t<corners\n\t\tandroid:radius="${element.style.borderRadius}"\n\t/>\n`;
    /*
    let opacity = parseInt( element.css('opacity')*100 )
    $('#css-opacity').val( opacity + '%' )
    $('#range-transparent').val( opacity )
    ใช้กำหนดรูปแบบ dash ขนาด แล้วระยะห่าง
    android:dashGap
    android:dashWidth
    */

    // Background
    if (element.style.backgroundColor !== '') xml += `\t<solid\n\t\tandroid:color="#${rgb2hex(element.style.backgroundColor)}"\n\t/>\n`;
    /*
    // Shadow
    let boxShadow = shadow( element.css('box-shadow') );
    $('#css-shadow-color').val( rgb2hex( String(boxShadow[0]) ) );
    $('#shadow-h-offset').val( parseInt(boxShadow[1]) );
    $('#shadow-v-offset').val( parseInt(boxShadow[2]) );
    $('#shadow-blur').val( parseInt(boxShadow[3]) );
    $('#shadow-spread').val( parseInt(boxShadow[4]) );
    */
    xml += '</shape>'
    return xml;
}

property();