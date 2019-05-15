/*
    Widget JQ version 3.1
    [+] Jquery 3.2.1
    [+] Jquery UI 1.12.1
    [+] Patch Jquery Rotate
    
    Function
    [+] UI Frame version 1.0
    [+] Rotate version 1.0
        
*/
function widget( param ){
    return new uWidget( param );
}

class uWidget{
    constructor( elem ){
        this.target = elem;
        this.window = elem;
        this.uiResizehandle = 'ui-resizable-handle';
        this.uiResize = 'widget-ui-resize';
        this.uiRotatehandle = 'widget-ui-rotate-handle';
        this.uiResizeGroup = 'ui-resizable-group';
        this.uiResizeRegion = 'ui-resize-region';
        this.status = true;
    }
    createUIResize( elem ){
        let ui = {
            region : document.createElement('div'),
            rotate : document.createElement('div')
        },
        offset = currentPos( elem );

        ui.region.setAttribute('id',`${this.uiResizeRegion}`);
        ui.rotate.setAttribute('class',`${this.uiRotatehandle}`);

        elem.offsetParent.appendChild(ui.region);

        let ui_resize_handle = document.getElementsByClassName(this.uiResizehandle);

        console.log(offset);
        console.log(elem.offsetLeft + elem.clientLeft, elem.offsetTop + elem.clientTop);
        console.log(this.isText(elem));

        let type = $(elem).css('position');
        if( type === 'absolute'){
            ui.region.style.top = elem.offsetTop + elem.clientTop + 'px';
            ui.region.style.left = elem.offsetLeft + elem.clientLeft + 'px';
        }else if(type === 'static'){
            ui.region.style.top = offset.top + 'px';
            ui.region.style.left = offset.left + 'px';
        }

        ui.region.style.position = 'absolute';
        ui.region.style.width = elem.clientWidth - 2 + 'px';
        ui.region.style.height = elem.clientHeight - 2 + 'px';
        ui.region.style.userSelect = 'none';
        
        if( elem.style.transform !== 'none' && elem.style.transform !== '' ){
            ui.region.style.transform = elem.style.transform;
        }

        ui.rotate.style.position = 'absolute';
        ui.rotate.style.left = '50%';
        ui.rotate.style.transform = 'translateX(-50%)';
        ui.rotate.style.top = -( ui.rotate.offsetWidth + 15 ) + 'px';

        if( elem.nodeName === 'INPUT' ){
            if( elem.type === 'radio' || elem.type === 'checkbox' ){
                $(ui.region).resizable({
                    handles: 'all',
                    autoHide: true, 
                    aspectRatio : true
                });
            }else{
                $(ui.region).resizable({ handles: 'all' , autoHide: true});
                ui.region.appendChild(ui.rotate);
            }
        }else{
            $(ui.region).resizable({ handles: 'all' , autoHide: true});
            ui.region.appendChild(ui.rotate);
        }

        for( let i=0 ; i < document.getElementsByClassName(this.uiResizehandle).length ; i++){
            document.getElementsByClassName(this.uiResizehandle)[i].addEventListener('mousedown' ,function(event) {
                console.log(event.pageX, event.pageY)
                let MoveDrag = false;
                if(event.target === this) MoveDrag = true;
                let tm = setInterval(function(){
                    if(MoveDrag){
                        $(elem).css({
                            'top' : ui.region.offsetTop - elem.clientTop + 'px',
                            'left' : ui.region.offsetLeft - elem.clientLeft + 'px',
                            'width' : ui.region.clientWidth + 'px',
                            'height' : ui.region.clientHeight + 'px'
                        });
                        property( $(elem) );
                    }
                },1000/120);
                document.addEventListener('mouseup', function(event){
                    if(MoveDrag){
                        MoveDrag = false;
                        $(elem).css({
                            'top' : ui.region.offsetTop - elem.clientTop + 'px',
                            'left' : ui.region.offsetLeft - elem.clientLeft + 'px',
                            'width' : ui.region.clientWidth + 'px',
                            'height' : ui.region.clientHeight + 'px'
                        });
                    }
                    window.clearInterval(tm);
                    console.log(event.pageX, event.pageY);
                });
            });
        }
        //  UI Frame
        ui.region.addEventListener('mousedown', function(event){
            let MoveDrag = false,
                x1 = event.pageX, 
                y1 = event.pageY;
             if(event.target === this) MoveDrag = true;
                document.addEventListener('mousemove', function(event){
                    //	Move Element
                    if(MoveDrag){
                        let x2 = event.pageX ,
                            y2 = event.pageY ,
                            mx = ui.region.offsetLeft + x2 - x1 + 'px',
                            my = ui.region.offsetTop + y2 - y1 + 'px';

                        ui.region.style.top = my;
                        ui.region.style.left = mx;

                        elem.style.top = ui.region.offsetTop - elem.clientTop + 'px';
                        elem.style.left = ui.region.offsetLeft - elem.clientLeft + 'px';

                        x1 = x2; y1 = y2;
                        property( $(elem) );
                    }
                });
                document.addEventListener('mouseup', function(event){
                    if(MoveDrag){
                        MoveDrag = false;
                        property( $(elem) );
                    }
                });
        });

        // Rotate
        ui.rotate.addEventListener('mousedown', function(event){
            let MoveDrag = false;
            if(event.target === this) MoveDrag = true;
                document.addEventListener('mousemove', function(event){
                    //	Move Element
                    if(MoveDrag){
                        let x = event.pageX,
                            y = event.pageY,
                            centerX = elem.offsetLeft + ( elem.offsetWidth/2 ),
                            centerY = elem.offsetTop + ( elem.offsetHeight/2 ),
                            angle = Math.atan2(x - centerX, - (y - centerY) )*(180/Math.PI);
                            
                            ui.region.style.transform = elem.style.transform = 'rotate(' + angle + 'deg)';
                    }
                    property($(element));
                });
                document.addEventListener('mouseup', function(event){
                    if(MoveDrag){
                        MoveDrag = false;
                        property( $(elem) );
                    }
                });
        });
    }
    resize(){
        let elem = this.target || null,
            resize = document.getElementById(this.uiResizeRegion);
        if(elem === null){
            if(resize === null) {return false;}
            resize.parentNode.removeChild(resize);
            document.querySelector('[widget]').removeAttribute('widget');
            return false;
        }else if( elem.id === this.uiResizeRegion ) {
            return false;
        }
        if( elem.length < 1){
            return false;
        }else{
            for( let i = 0 ; i < elem.length ; i++){
                for( let j = 0 ; j < elem[i].classList.length ; j++ ){
                    if( elem[i].classList[i] === this.uiRotatehandle) return false;
                    if( elem[i].classList[i] === this.uiResizeGroup) return false;
                }
            }
        }
        
        if(resize) {
            resize.parentNode.removeChild(resize);
            document.querySelector('[widget]').removeAttribute('widget');
        }

        elem.setAttribute('widget',`${this.status}`);
        //let element = document.querySelector('[widget]');
        property( $(elem) );
        this.createUIResize(elem);
        
        return this;
    }
    resizeGroup(){
        return this;   
    }
    position(){
        return this;
    }
    isText( element ){
        // Formatting
        let type = [
            'abbr','address','b','bdi','bdo','blockquote','cite','code','del','dfn','em','h1','h2','h3','h4','h5','h6',
            'i','ins','kdb','mark','meter','pre','progress','q','rp','rt','ruby','s','samp','small','strong','sub','sup',
            'template','time','u','var','wbr',
            //Not support in HTML5
            'acronym','big','center','font','strike','tt'
        ],
        result = false, name = $(element).prop('tagName').toLowerCase();
        for(let i = 0 ; i < type.length ; i++){
            result = type[i] === name || result;
        }
        return result;
    }
    attr(){
        // Attribute Editer
        //เมนูแก้ไข Attribute ให้กับ Element
        return this;
    }
}
/*
Forms and Input
Tag	Description
<form>	Defines an HTML form for user input
<input>	Defines an input control
<textarea>	Defines a multiline input control (text area)
<button>	Defines a clickable button
<select>	Defines a drop-down list
<optgroup>	Defines a group of related options in a drop-down list
<option>	Defines an option in a drop-down list
<label>	    Defines a label for an <input> element
<fieldset>	Groups related elements in a form
<legend>	Defines a caption for a <fieldset> element
<datalist>	Specifies a list of pre-defined options for input controls
<output>    Defines the result of a calculation
*/
/*
    Select Drop Down Menu [Version 1.0]
*/
$('.select-option , #css-border-style , .border-style').on('click',function(){
	$('.select-option ul.option-group').toggle();
});
$('.option').on('click',function(){
	$('.border-style').css('border-style', $(this).children().css('border-style'));
	$('[widget]').css('border-style' , $(this).children().css('border-style') );
});

$('*').on('click',function( event ){
	//console.log(event.target);
	if($(event.target).is('div.select-option')){return false;}
	if($(event.target).is('.border-style')){return false;}
	if($(event.target).is('#css-border-style')){return false;}
	$('.select-option ul.option-group').hide();
	//console.log(event.target);
});

/*
    Screen Resolution [Version 1.0] 4/2018
*/
(function(){
    let desktop = [
        '640x480',
        '800x600',
        '1024x600',
        '1024x768',
        '1152x864',
        '1280x720',
        '1280x768',
        '1280x800',
        '1280x1024',
        '1366x768',
        '1366x768',
        '1440x900',
        '1536x864',
        '1600x900',
        '1680x1050',
        '1920x1080',
        '1920x1200',
        '2560x1080',
        '2560x1440',
        '3440x1440',
        '3840x2160'
    ],
    android = [
        '360x640',
        '360x740',
        '480x853',
        '411x731'
    ],
    tablets = [
        '600 x 960',
        '768 x 1024',
        '800 x 1280',
        '1280 x 850'
    ],
    iphone = [
        '320x568',
        '375x667',
        '414x736',
        '375x812'
    ],
    ipad = [
        '768x1024',
        '1024x1366'
    ];
    for(let i = 0 ; i < android.length ; i++){
        $('.phone-screen-size').append(`<option value="${android[i]}">${android[i]}</option>`);
    }
    for(let i = 0 ; i < iphone.length ; i++){
        $('.phone-screen-size').append(`<option value="${iphone[i]}">${iphone[i]}</option>`);
    }
    for(let i = 0 ; i < tablets.length ; i++){
        $('.tablet-screen-size').append(`<option value="${tablets[i]}">${tablets[i]}</option>`);
    }
    for(let i = 0 ; i < ipad.length ; i++){
        $('.tablet-screen-size').append(`<option value="${ipad[i]}">${ipad[i]}</option>`);
    }
    for(let i = 0 ; i < desktop.length ; i++){
        $('.desktop-screen-size').append(`<option value="${desktop[i]}">${desktop[i]}</option>`);
    }
    let design = $('#design');
    let size = ( str ) => str.match(/([0-9])+/g);
    $('#phone-screen').on('click', function(){
        let screen = size( $('.phone-screen-size').val() );
        design.css({
            'width' : `${screen[0]}px`,
            'height' : `${screen[1]}px`
        });
        boardX = document.getElementById('design').offsetLeft + $('.design-content').position().left;
        boardY = document.getElementById('design').offsetTop + $('.design-content').position().top;
    });
    $('#tablet-screen').on('click', function(){
        let screen = size( $('.tablet-screen-size').val() );
        design.css({
            'width' : `${screen[0]}px`,
            'height' : `${screen[1]}px`
        });
        boardX = document.getElementById('design').offsetLeft + $('.design-content').position().left;
        boardY = document.getElementById('design').offsetTop + $('.design-content').position().top;
    });
    $('#desktop-screen').on('click', function(){
        let screen = size( $('.desktop-screen-size').val() );
        design.css({
            'width' : `${screen[0]}px`,
            'height' : `${screen[1]}px`
        });
        boardX = document.getElementById('design').offsetLeft + $('.design-content').position().left;
        boardY = document.getElementById('design').offsetTop + $('.design-content').position().top;
    });
    $('#custom-screen').on('click', function(){
        design.css({
            'width' : `${ $('.custom-width').val() }px`,
            'height' : `${ $('.custom-height').val() }px`
        });
        boardX = document.getElementById('design').offsetLeft + $('.design-content').position().left;
        boardY = document.getElementById('design').offsetTop + $('.design-content').position().top;
    });
    $('#full-screen').on('click', function(){
        design.css({
            'width' : `100%`,
            'height' : `100%`
        });
        boardX = document.getElementById('design').offsetLeft + $('.design-content').position().left;
        boardY = document.getElementById('design').offsetTop + $('.design-content').position().top;
    });
    $('.size-screen').text( `${ $('.design-content').width() } x ${ $('.design-content').height() }`);
    $(window).resize(function(){
        let w = $('.design-content').width(),
            h = $('.design-content').height();
        $('.size-screen').text( `${w} x ${h}`);
    });
})();

/*
    Shadow Offset UI [Version 1.0]
*/
$('#css-shadow-color').bind('change', function(){
    let getVal = $('[widget]').css('box-shadow');
    let boxShadow = shadow( getVal );
    value = `#${$(this).val()} ${boxShadow[1]} ${boxShadow[2]} ${boxShadow[3]} ${boxShadow[4]}`;
    $('[widget]').css('box-shadow',value);
    console.log(value)
});
$('#shadow-h-offset').on('change', function(){
    let getVal = $('[widget]').css('box-shadow');
    let boxShadow = shadow( getVal );
    value = `${boxShadow[0]} ${$(this).val()}px ${boxShadow[2]} ${boxShadow[3]} ${boxShadow[4]}`;
    $('[widget]').css('box-shadow',value);
});
$('#shadow-v-offset').on('change', function(){
    let getVal = $('[widget]').css('box-shadow');
    let boxShadow = shadow( getVal );
    value = `${boxShadow[0]} ${boxShadow[1]} ${$(this).val()}px ${boxShadow[3]} ${boxShadow[4]}`;
    $('[widget]').css('box-shadow',value);
});
$('#shadow-blur').on('change', function(){
    let getVal = $('[widget]').css('box-shadow');
    let boxShadow = shadow( getVal );
    value = `${boxShadow[0]} ${boxShadow[1]} ${boxShadow[2]} ${$(this).val()}px ${boxShadow[4]}`;
    $('[widget]').css('box-shadow',value);
});
$('#shadow-spread').on('change', function(){
    let getVal = $('[widget]').css('box-shadow');
    let boxShadow = shadow( getVal );
    value = `${boxShadow[0]} ${boxShadow[1]} ${boxShadow[2]} ${boxShadow[3]} ${$(this).val()}px`;
    $('[widget]').css('box-shadow',value);
});


/*			Move Group Script			*/
$('#container-resize-group').mousedown(function(event){
	"use strict";
	var element = $( event.target );
	var outsetX , outsetY;
	var MoveDrag = false;
	if( element.is(this) && Shape === null){
		outsetX = event.pageX - $('#design-window').offset().left;
		outsetY = event.pageY - $('#design-window').offset().top;
		var x = $(this).offset().left - $('#design-window').offset().left,
			y = $(this).offset().top - $('#design-window').offset().top,
			w = $(this).width(),
			h = $(this).height();
		selected(x,y,w,h);
		MoveDrag = true;
	}
	$('#container-resize-group').mousemove(function(event){
		var moveX , moveY ;
		if(MoveDrag){
			moveX = event.pageX - $('#design-window').offset().left ;
			moveY = event.pageY - $('#design-window').offset().top ;
			//		Move SelectGroup
			element.css({
				'left': $(this).offset().left + (moveX - outsetX) + 'px',
				'top': $(this).offset().top + (moveY - outsetY) + 'px'
			});
			//		Move Element Selected
			var elemSelected = $('[selected]');
			for(var i = 0 ; i < $('[selected]').length ; i++){
				$(elemSelected[i]).css({
					'left': $(elemSelected[i]).offset().left - $('#design-window').offset().left + (moveX - outsetX) + 'px',
					'top': $(elemSelected[i]).offset().top - $('#design-window').offset().top + (moveY - outsetY) + 'px'
				});
			}
			outsetX = moveX ; outsetY = moveY;
			// Set Resize = Size of SelectGroup
			var x = $(this).offset().left - $('#design-window').offset().left,
				y = $(this).offset().top - $('#design-window').offset().top,
				w = $(this).width(),
				h = $(this).height();
			selected(x,y,w,h);
		}
	});
	$('#container-resize-group').mouseup(function(event){
		if(MoveDrag){
			MoveDrag = false;
		}
	});
});


//	Function Selected Group
function pick(x1,y1,x2,y2){
	"use strict";
	
}