
document.getElementById('design').addEventListener('dragover', function(event) {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
});

document.getElementById('design').addEventListener('drop', function(event) {
    event.stopPropagation();
    event.preventDefault();
    let x , y ;
		x = event.pageX - boardX ;
		y = event.pageY - boardY ;
    var files = event.dataTransfer.files[0]; // Array of all files
    var data;
    let reader = new FileReader();
    reader.onload = function(event) {
      data = event.target.result;
      let status = reader.readyState
      console.log(data)
      if( status === 2) {
        $(PAGE_DESIGN).append(unpack(data,x,y))
      }
    };
    reader.readAsText(files);
});

function unpack( data , x ,y){
    let css = "", 
        start = data.search('style') + 7 ,
        end = 0 ,
        len = data.length
    for(let x = start; x < len ; x++){
        c = data.charAt(x)
        if( c !== '"' ) { 
            css += data.charAt(x)
        }
        else {
            end = x
            break
        }
    }
    css += 'position:absolute;top:'+y+'px;left:'+x+'px;'
    let style = data.substring(0,start) + css + data.substring(end, len)
    return style
}
