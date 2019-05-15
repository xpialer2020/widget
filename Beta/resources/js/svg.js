function SVG( param ){
    return new svg( param );
}

class svg{
	constructor( param ){
		this.svg = param;
		this.svgns = "http://www.w3.org/2000/svg";
		this.item = document.createElementNS( this.svgns, this.svg);
	}
	attr( name , value ){
		console.log(this.item)
		this.item.setAttributeNS(null, name, value);
		return this;
	}
	
}
SVG('rect').attr('class','hi').attr('x','10');

/*
let rect = SVG('draw-rect').create('rect');
    //rect.attr('class', 'sitemap-page');
    //document.getElementById('design').appendChild(rect);
/*
let rect = document.createElementNS(svgns, 'rect');
		rect.setAttributeNS(null, 'class', 'sitemap-page');
		//rect.setAttributeNS(null, 'name', 'sitemap-page');
		rect.setAttributeNS(null, 'x', 25 + (distance*i) + (w*i) );
		rect.setAttributeNS(null, 'y', 25);
		rect.setAttributeNS(null, 'height', h);
		rect.setAttributeNS(null, 'width', w);
		rect.setAttributeNS(null, 'fill', 'rgb(0, 77, 153)');
		rect.setAttributeNS(null, 'rx', BorderRadius);
		rect.setAttributeNS(null, 'ry', BorderRadius);
    svg.appendChild(rect);
*/