export const MAX_DOC = 20 ;
const MAX_ITEM_DOC = 100;
const MAX_ITEM_ALL = 9999;

let doc_count = 0
let page = []
let pageIndex = 0

$('#open-file').on('change', function( event ){
    doc_count++;
    let element = document.createElement('button');
    element.setAttribute('class','page');
    element.value = doc_count;
    element.textContent = doc_count;
    $('.page').removeClass('page-active');
    $(element).addClass('page-active');
    page[doc_count] = "";
    document.getElementById('container-document').appendChild(element);
    console.log(doc_count);
    $(PAGE_DESIGN).html(page[doc_count]);
    pageIndex = doc_count;
    $(element).click(function(){
        widget.resize();
        property();
        page[pageIndex] = $(PAGE_DESIGN).html()
        let index = $(this).val()
        console.log(index)
        $(PAGE_DESIGN).html(page[index])
        pageIndex = index
        console.log(page[pageIndex])
        $('.page').removeClass('page-active')
        $(element).addClass('page-active')
    });
    if(doc_count > 0){
        $('#design').css({
            'pointer-events' : 'auto'
        });
    }
    var files = event.target.files[0]; // Array of all files
    var data;
    let reader = new FileReader();
    reader.onload = function(event) {
      data = event.target.result;
      let status = reader.readyState
      console.log(data)
      page[pageIndex] = data
      $(PAGE_DESIGN).html(page[pageIndex])
    };
    reader.readAsText(files);
    
});