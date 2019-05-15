
var debugTarget = null;

var packet = ( name, data , type) => {
    let type = type || 'txt';
    let file = new File([data], name + "." + type , {type: "text/plain;charset=utf-8"});
    saveAs(file);
}

/*
<input type="file" id="file-input" />
<h3>Contents of the file:</h3>
<pre id="file-content"></pre>
*/
// Beta Version 1
var readFile = ( event ) => {
  let file = event.target.files[0];
  if (!file) {
    return;
  }
  let reader = new FileReader();
  reader.onload = function(event) {
    let contents = e.target.result;
    displayContents(contents);
  };
  reader.readAsText(file);
}

var displayContents = (contents) => {
  let element = document.getElementById('file-content');
  element.textContent = contents;
}

//document.getElementById('file-input').addEventListener('change', readSingleFile, false);

/*
function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      var contents = e.target.result;
      displayContents(contents);
    };
    reader.readAsText(file);
  }
  
  function displayContents(contents) {
    var element = document.getElementById('file-content');
    element.textContent = contents;
  }
  
  document.getElementById('file-input')
    .addEventListener('change', readSingleFile, false);
*/

// Drag and Drop File
document.getElementById('design').addEventListener('change', readFile, false);


// Debug
var report = () => {
  console.clear()
  console.log('%c Selection ',info)
  console.info(debugTarget)
  /*
  console.log('%c Alert ',alert)
  console.log('%c Information ',info)
  console.log('%c Warning ',warn)
  console.log('%c Success ',sucs)
  console.log('%c Update ',update)
  */
}
var alert = [
  'background-color: #f44336',
  'color: rgb( 255, 255, 255)',
  'font-weight: bold'
].join(';');
var info = [
  'background-color: #3f51b5',
  'color: rgb( 255, 255, 255)',
  'font-weight: bold'
].join(';');
var warn = [
  'background-color: #ffeb3b',
  'color: #000',
  'font-weight: bold'
].join(';');
var sucs = [
  'background-color: #4CAF50',
  'color: #fff',
  'font-weight: bold'
].join(';');
var update = [
  'background-color: #2196F3',
  'color: #fff',
  'font-weight: bold'
].join(';');

// Version
let version = 'Beta 0.01 => Last update : 04/11/2017';
console.log(version);
