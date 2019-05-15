$(document).ready(function(){
  console.log('Jquery 3.3.1');
  console.log('Jquery UI 1.12.1');
});

function include(file)
{
  var script  = document.createElement('script');
  script.src  = file;
  document.getElementsByTagName('body').item(0).appendChild(script);
}
let progress = 0;
let scriptSrc = [
  'resources/js/draw.js',
  'resources/js/property.js',
  'resources/js/script.js',
  'resources/js/widget.js'
  //'resources/js/local-storage.js'
  //'resources/js/drag-and-drop.js'
]
for(let i = 0 ; i < scriptSrc.length ; i++){
  progress++;
  include(scriptSrc[i]);
  console.log( parseInt(progress/scriptSrc.length*100) + '%' );
  if(progress === include.length){
    $('.loading').remove();
  }
}
/*
include('resources/js/draw.js');
include('resources/js/property.js');
include('resources/js/script.js');
include('resources/js/color.js');
include('resources/js/widget.js');
include('resources/js/FileSaver.min.js');
//include('resources/js/local-storage.js');
//include('resources/js/file.js');
include('resources/js/package.js');
include('resources/js/drag-and-drop.js');
*/

/*
    <script src="gallery/fontawesome.js"></script>
    <script src="resources/js/draw.js"></script>
    <script src="resources/js/property.js"></script>
    <script src="resources/js/color.js"></script>
    <script src="resources/js/widget.js"></script>
    <script src="resources/js/FileSaver.min.js"></script>
    <script src="resources/js/local-storage.js"></script>
    <!-- script src="resources/js/file.js"></script -->
    <script src="resources/js/package.js"></script>
    <script src="resources/js/drag-and-drop.js"></script>
*/
/*
let progress = 0;
let include = [
  'resources/js/draw.js',
  'resources/js/property.js',
  'resources/js/script.js',
  'resources/js/color.js',
  'resources/js/widget.js',
  'resources/js/FileSaver.min.js',
  'resources/js/local-storage.js',
  'resources/js/package.js',
  'resources/js/drag-and-drop.js'
]
$.ajax({
  url: 'gallery/fontawesome.js',
  dataType: "script",
  success: console.log('Font Awesome')
});

for(let i = 0 ; i < include.length ; i++){
  $.ajax({
    url: include[i],
    dataType: "script",
    success: function(){
      progress++;
      console.log( parseInt(progress/include.length*100) + '%' );
      if(progress === include.length){
        $('.loading').remove();
      }
    },
    error : function (jqXHR, exception) {
      console.log(jqXHR.status);
      console.log(exception)
    }
  });
}
*/