const PAGE_DESIGN = '#design';

$('#design').on('click', function (event) {
    if(shape > 0 ) return;
    if( $(event.target).is(PAGE_DESIGN) ) {
        widget().resize();
        property();
        console.log('Page');
    }
    else{
        widget(event.target).resize();
        console.dir(event.target);
    }
});
/*
$('#design').on( 'mousedown' , function( event ){
    let x1, y1, x2, y2, SelectArea,
        hold = false,
        move = false,
        target = event.target;
    if(shape > 0 ) return;
    else if( $(event.target).is(PAGE_DESIGN) ) {
        hold = true;
        x1 = event.pageX - boardX;
        y1 = event.pageY - boardY;
        SelectArea = document.createElement('div');
        SelectArea.className = 'ui-resizable-group';
        SelectArea.style.position = 'absolute';
        SelectArea.style.display = 'block';
        SelectArea.style.left = x1 + 'px';
        SelectArea.style.top = y1 + 'px';
        SelectArea.style.width = 0 ;
        SelectArea.style.height = 0 ;
        SelectArea.style.border = '1px dashed cyan';
        widget().resize();
        property();
    }
    $('#design').on( 'mousemove' , function(event){
        if( hold ){
            $('#design').append(SelectArea);
            move = true;
            x2 = event.pageX - boardX;
			y2 = event.pageY - boardY;
			if(x2 < x1){
				SelectArea.style.left = x2 + 'px';
				SelectArea.style.width = x1 - x2 - 5 + 'px' ;
			}else{
				SelectArea.style.left = x1 + 'px';
				SelectArea.style.width = x2 - x1 - 3 + 'px' ;
			}
			if(y2 < y1){
				SelectArea.style.top = y2 + 'px';
				SelectArea.style.height = y1 - y2 - 5 +'px' ;
			}else{
				SelectArea.style.top = y1 + 'px';
				SelectArea.style.height = y2 - y1 - 3 + 'px' ;
			}
        }
    });
    $(window).on( 'mouseup' , function(event){
        if( hold && move){
            widget().resize();
            property();
            let child = document.getElementById('design').children,
            //	value to check Element
                cx1 , cy1 , cx2 , cy2,
            //	value of resize-frame
                x = 0 , y = 0 , w = 0 , h = 0,
            //	total of Element selected
                sel = 0 ;
            for( let i = 0 ; i < child.length ; i++ ){
                cx1 = child[i].offsetLeft;
                cy1 = child[i].offsetTop ;
                cx2 = child[i].offsetLeft + child[i].offsetWidth;
                cy2 = child[i].offsetTop + child[i].offsetHeight;
                //	Check size of element to set size SelectedGroup
                if(x1 <= cx1 && y1 <= cy1 && x2 >= cx2 && y2 >= cy2){
                    child[i].setAttribute('widget','true');
                    if(sel===0){
                        x = cx1;y = cy1;
                        w = cx2;h = cy2;
                    }
                    sel++;
                    if(cx1 < x){ x = cx1;}
                    if(cy1 < y){ y = cy1;}
                    if(cx2 > w){ w = cx2;}
                    if(cy2 > h){ h = cy2;}
                }
                else{
                    child[i].removeAttribute('widget');
                }
            }
            if( sel > 0 ){
                widget(document.querySelectorAll('[widget]')).resize();
            }
            $(SelectArea).remove();
        }else if( event.target === target){
            
        }
        hold = false;
        move = false;
    });
});
*/

$(PAGE_DESIGN).on('keyup',function(event){
    if(event.keyCode === 46){
		if( $('[widget]').length ){
            let del = $('[widget]')
            widget().resize();
            property();
            del.remove();
			console.log('Delete');
		}
	}
    console.log(event.keyCode); 
});

let mPosX,mPosY;
//  Capture Mouse Position
$(PAGE_DESIGN).on('mousemove', function(event){
    mPosY = event.clientY;
    mPosX = event.clientX;
});

let copy = null;
let onctrl = false;
$(PAGE_DESIGN).on('keydown',function(event){

    if(event.keyCode === 17) onctrl = true;

    if(onctrl && event.keyCode === 67){ 
        // Copy Element
        //copy = $('[widget]')
        let html = $('[widget]')[0].outerHTML;
        $('#copy-text').val(html);
        let copy = document.getElementById('copy-text');
        copy.select();
        document.execCommand('copy');
        console.log(copy.value);
    }
    if(onctrl && event.keyCode === 86){ 
        // Paste Element
        let paste = document.getElementById('paste-text');
        paste.select()
        document.execCommand('paste')
        $("#dummy-html").append(paste.value);
        let element = $("#dummy-html").children();
        console.log(element)
        element.appendTo(event.target)
        element.offset({
            top : mPosY,
            left : mPosX
        });
        $("#dummy-html").children().remove()
    }
    $(PAGE_DESIGN).on('keyup',function(event){

        if(event.keyCode === 17) onctrl = false;
        
    });
    console.log(event.keyCode); 
});

//  Workspace
(function(){
    let files, 
        file, 
        extension,
        input = document.getElementById("fileURL"), 
        output = ""
    input.addEventListener("change", function(e) {
        fs = e.target.files;
        console.log(input.files[0].getAsDataURL)
        console.log(fs[0].getDisplayPath)
        folder = fs[0].webkitRelativePath.split('/');
        //fullpath = fullpath[0]
        //  Read flie in Folder
        
        for (var i = 0, len = fs.length; i < len; i++) {
            file = fs[i];
            extension = file.name.split(".").pop();
            let path = fs[i].webkitRelativePath
            output += "Path : " + path + "\nType : " + extension + "\nName : " + file.name + "\n";
        }
        console.log(folder)
        console.log(output)
    }, false);
})();

// Menu & Content
$('.tool-content').hide();
$('.property-content').hide();
$('.show-tool').on('click', function(){
    $('.property-content').hide('slide', 'fast');
    $('.tool-content').toggle('slide', 'fast');
});
$('.show-property').on('click', function(){
    $('.tool-content').hide('slide', 'fast');
    $('.property-content').toggle('slide', 'fast');
});
/* Accordion Menu */
$( function() {
    $( '.header-collapsible' ).next().hide();
    $( '.header-collapsible' ).click(function(){
        $(this).next().toggle('puff', 'fast');
        $(this).toggleClass( 'active' );
    });
});

/*  Status Bar */
function status( param ){
    let s = param;
    switch( s ){
        case 0:
            
        break;
    }
}

/* Site Explorer */
var pageIndex = 0,
    page = [],
    pageCount = -1;
let duplicate = null;

$('#design').on('click mousedown mouseup mousemove keyup keydown', function(){ update() });

function update(){
    if(pageCount >= 0 ){
        if( page[pageIndex].html() !== $('#design').html() ) {
            page[pageIndex] = $('#design').clone();
            $(`ul.page[value=${pageIndex}]`).children().not(':first').not(':nth-child(2)').remove();
            $(`ul.page[value=${pageIndex}]`).append( nodelist( document.getElementById('design') ) );
        }
    }
}
/*
setInterval(function(){
    //$(`ul.page[value=${pageIndex}]`)
    if( page[pageIndex].html() !== $('#design').html() ) {
        page[pageIndex] = $('#design').clone();
        $(`ul.page[value=${pageIndex}]`).children().not(':first').remove();
        $(`ul.page[value=${pageIndex}]`).append( nodelist( document.getElementById('design') ) );
    }
}, 1000/60);
*/

// เลือก Node จากเมนู Site Explorer
$('#site-ex').on('click',function(event){
    let isNode = $(event.target).is('.page ul label, .page li label');
    if( isNode ){
        let select = findNode( getIndex(event.target) )
        widget( select ).resize();
    }
});

// แสดง Node ทั้งหมดใน Page
function nodelist( element ){
    let code = '';
    (element.id === 'design')? code += '' : code += '<ul value="'+indexElem(element)+'"><label>'+element.nodeName+'</label>';
    for(let i = 0 ; i < element.childNodes.length ; i++){
        if(element.childNodes[i].id !== 'ui-resize-region'){
            if(element.childNodes[i].childNodes.length === 0){
                code += '<li value="'+indexElem(element.childNodes[i])+'"><label>'+ element.childNodes[i].nodeName +'</label></li>';
            }else{
                code += nodelist( element.childNodes[i] );
            }
        }
    }
    code += '</ul>';
    return code;
}
// หาตำแหน่งของ Node
function indexElem( element ){
    return Array.from(element.parentNode.children).indexOf(element);
}
//  ค้นหา Node เพื่อหาตำแหน่ง
function getIndex(element){
    let address = '';
    while( !($(element).hasClass('page')) ){
        if( element.nodeName !== 'LABEL'){
            address += element.attributes.value.value + ',';
        }
        element = element.parentNode;
    }
    return address;
}
// ค้นหา Node ในหน้า Design
function findNode( position ){
    let address = position.split(','),
        elem = document.getElementById('design');
    address.pop();
    for(let index = address.length ; index > 0 ; index--){
        elem = elem.children[address[index-1]];
    }
    return elem;
}
function list(){
    page.forEach((pages) => {
        console.log(pages);
    });
}
(function(){
    //  New Document
    $('#new-page').on('click', function(){
        pageCount++;
        $('#site-ex .site-list').append(`<ul class="page" value="${pageCount}"><i class="far fa-file"></i><label>New Page ${pageCount}</label></ul>`);
        pageIndex = pageCount;
        $(PAGE_DESIGN).html('');
        page[pageIndex] = $(PAGE_DESIGN).clone();
        $(`ul.page[value=${pageCount}]`).click(function(event){
            if($(event.target).hasClass('page')){
                widget().resize();
                property();
            }
            let index = $(this).attr('value');
            $(PAGE_DESIGN).html( page[index].html() );
            pageIndex = index;
            $('.page').removeClass('page-active');
            $(this).addClass('page-active');
        });
        $(`ul.page[value=${pageCount}] > label`).on('dblclick',function(){
            $(this).attr('contenteditable','true').focus(function(){
                $(this).attr('contenteditable','true');
                $(this).css('cursor','text');
            }).blur(function(){
                $(this).attr('contenteditable','false');
                $(this).removeAttr('style').removeAttr('contenteditable');
            });
        });
    });
    $('#site-ex > span').on('click', function(){
        console.log( $('#site-ex > .site-list').children() );
    });
    $('#preview-file').on('click', function(){
        // กำลังปรับปรุง
        let $window = window.open();
        $($window.document.head).html(
            `<link href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" rel="stylesheet">`
        );
        widget().resize();
        property();
        $($window.document.body).html($('#design').html());
    });

    $('#open-file').on('change', function( event ){
        let files = event.target.files[0],
            data,
            name = files.name,
            type = name.split('.');
            type = type[type.length - 1];
        if( type === 'json'){
            console.log('JSON FILE!!!!');
        }
        pageCount++;
        $('#site-ex .site-list').append(`<ul class="page" value="${pageCount}"><i class="far fa-file"></i><label>${name}</label></ul>`);
        pageIndex = pageCount;
        $(PAGE_DESIGN).html('');
        page[pageIndex] = $(PAGE_DESIGN).clone();
        $(`ul.page[value=${pageCount}]`).click(function(event){
            if($(event.target).hasClass('page')){
                widget().resize();
                property();
            }
            let index = $(this).attr('value');
            $(PAGE_DESIGN).html( page[index].html() );
            pageIndex = index;
            $('.page').removeClass('page-active');
            $(this).addClass('page-active');
        });
        $(`ul.page[value=${pageCount}] > label`).on('dblclick',function(){
            $(this).attr('contenteditable','true').focus(function(){
                $(this).attr('contenteditable','true');
                $(this).css('cursor','text');
            }).blur(function(){
                $(this).attr('contenteditable','false');
                $(this).removeAttr('style').removeAttr('contenteditable');
            });
        });
        let reader = new FileReader();
        reader.onload = function(event) {
          data = event.target.result;
          let status = reader.readyState;
          console.log(data);
          $(PAGE_DESIGN).html(data);
        };
        reader.readAsText(files);
        console.log(files.name);
    });

    $('#save-file > i').on('click', function(){
        console.log('save')
        let data = '{' + '\n',
            nameFile = $('.site-list > .page > label'),
            name = '"name" : [',
            code = '"data" : [';
        for(let i = 0 ; i < nameFile.length ; i++){
            name += '"' + nameFile[i].textContent + '"';
            if( i + 1 < nameFile.length ){ 
                name += ',';
            }else{
                name += '],\n';
            }
        }
        data += name;
        for(let i = 0 ; i < page.length ; i++){
            $(PAGE_DESIGN).html( page[i].html() );
            widget().resize();
            property();
            console.log($(PAGE_DESIGN).children());
            let text = $(PAGE_DESIGN)[0].innerHTML;
            text = text.replace(/"/g,'\\"');
            code += '"' + text + '"';
            if( i + 1 < page.length ){ 
                code += ',';
            }else{
                code += ']\n';
            }
        }
        data += code;
        data += '}';
        console.log(data)
        packet('file',data,'json');
    });
})();

// Context-Menu
$('#contextmenu').hide();
document.getElementById('design').oncontextmenu =  function( event ){
    let target = $(event.target);
    if( target.is(PAGE_DESIGN) ) { 
        $('#contextmenu').hide();
        return false;
    }
    else{
        let x = event.clientX ,
            y = event.clientY ;
        $('#contextmenu').show();
        $('#contextmenu').offset({
            top : y,
            left : x
        });
        eventTarget = target;
        let list = $('.site-list > ul.page > label');
        $('.list-page').empty();
        $('.list-page').append(`<option value="none">None</option>`);
        for(let x = 0; x < list.length ; x++){
            let name = list[x].textContent;
            $('.list-page').append(`<option value="${name}">${name}</option>`);
        }
        $('.list-page').on('change', function(){
            $('[widget]').attr('href', $(this).val() + '.html' );
            /* กำลังหาชื่อ Tag มาทดแทน <a>
            let href = $(this).val(),
                elem = $('[widget]'),
                tmp = elem[0].outerHTML;
            $(`<a href="${href}.html">${tmp}</a>`).insertAfter(elem);
            elem.remove();
            */
        });
    }
    return false;
};

window.addEventListener('click', function( event ) {
    let target = $(event.target);
    if( target.is($('#contextmenu, #contextmenu *')) ){

    }else{
        $('#contextmenu').hide();
    }
});

var packet = ( name, data , type) => {
    let file = new File([data], name + "." + type , {type: "text/plain;charset=utf-8"});
    saveAs(file);
}

$('#package').click(function(){
    let data = '<link href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" rel="stylesheet">';
    data += $('[widget]')[0].outerHTML;
    console.log($('[widget]'));
    console.log(data);
    widget().resize();
    packet('packfile',data,'html');
    $('#contextmenu').hide();
});

$('#android').click(function(){
    $('.android-code').show();
    $('.android-xml').text( html2xml($('[widget]')[0]) );
    /*
    data = $('[widget]')[0].outerHTML;
    console.log($('[widget]'));
    console.log(data);
    widget.resize();
    packet('shape',data,'xml');
    */
    $('#contextmenu').hide();
});

// Close
$('.close').on('click', function(){
    $(this).parent().hide();
});

//  Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

/* ไว้ทำ Fontawesome
(function(){
let json = {};
let fa = ""
for (x in json) {
    fa += '\"' + x + '\",'
}
console.log(fa)
})();
*/