(function(){
    let body = document.body, section, div, node,
        xmlns = "http://www.w3.org/2000/svg",
        version = 'Beta v2.5';

    function print( text ){
        console.log( text );
    }
    function dir( text ){
        console.dir( text );
    }
    //--------------------------------------------------
    div = document.createElement('div');
    div.className = 'design-content';

    node = document.createElement('section'); node.id = 'design'; node.tabIndex = 1; node.style.width = '100%'; node.style.height = '100%';  div.appendChild(node);
    node = document.createElementNS (xmlns, "svg");; node.id = 'site-management'; node.tabIndex = 1; div.appendChild(node);

    body.appendChild(div);
    //--------------------------------------------------
    section = document.createElement('section');
    section.style.display = 'none';

    node = document.createElement('textarea'); node.id = 'copy-text'; section.appendChild(node);
    node = document.createElement('textarea'); node.id = 'paste-text'; section.appendChild(node);
    node = document.createElement('div'); node.id = 'dummy-html'; section.appendChild(node);

    body.appendChild(section);
    //--------------------------------------------------
    section = document.createElement('section');
    section.className = 'document-list';
    section.style.userSelect = 'none';

    node = document.createElement('span');
    node.style.cssFloat = 'left';
    node.style.padding = '1px';
    node.style.margin = '2px 2px';
    node.style.fontFamily = 'Arial, Helvetica, sans-serif';
    node.style.fontSize = '14px';
    node.style.color = '#fff';
    node.textContent = version;
    section.appendChild(node);

    node = document.createElement('div');
    node.className = 'document-tab';
    section.appendChild(node);

    div = document.createElement('div');
    div.id = 'status';
    div.hidden = true;
    section.appendChild(div);

    node = document.createElement('i'); node.className = 'far fa-clone'; div.appendChild(node);
    node = document.createElement('i'); node.className = 'fas fa-cut'; div.appendChild(node);
    node = document.createElement('i'); node.className = 'far fa-edit'; div.appendChild(node);
    node = document.createElement('i'); node.className = 'far fa-object-ungroup'; div.appendChild(node);
    node = document.createElement('i'); node.className = 'fas fa-trash'; div.appendChild(node);
    node = document.createElement('i'); node.id = 'save-file'; node.className = 'fas fa-download'; div.appendChild(node);

    body.appendChild(section);
    //--------------------------------------------------

})();