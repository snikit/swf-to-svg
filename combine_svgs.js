const FS = require('fs');
const { createCanvas, loadImage } = require('canvas');
const png2svg = require('svg-png-converter').png2svg;
const DOMParser = require('dom-parser');
const SVGO = require('svgo');
const prettier = require('pretty-data').pd;
const parser = new DOMParser();
const xmldoc = require('xmldoc');
const dimensions = 4000;
const log = console.log;
const fname = process.argv[2];
const fillreplacecolor = process.argv[3] ? `#${process.argv[3]}` : null;

// init----------------------------->

const firstFileName = './output/DefineSprite_2/1.svg';
const secondFileName = './output/DefineSprite_4/1.svg';

const svgname = fname.replace('swf', 'svg');
log(`processing ${svgname}`);

const data1 = FS.readFileSync(firstFileName).toString();
const data2 = FS.readFileSync(secondFileName).toString();

const xmlDoc1 = new xmldoc.XmlDocument(data1);
const xmlDoc2 = new xmldoc.XmlDocument(data2);

const gs1 = xmlDoc1.childNamed('g');

const height = xmlDoc1.attr.height;
const width = xmlDoc1.attr.width;
const gtransform = gs1.attr.transform;
const useshape0 = gs1.childNamed('use').toString();
const useshape1 = useshape0.replace('shape0', 'shape1');
const gshape0 = xmlDoc1
  .childNamed('defs')
  .childNamed('g')
  .toString({ compressed: true, trimmed: true });
const gshape1 = xmlDoc2
  .childNamed('defs')
  .childNamed('g')
  .toString({ compressed: true, trimmed: true })
  .replace('shape0', 'shape1');

FS.writeFileSync(
  `${svgname}`,
  `<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg xmlns:xlink="http://www.w3.org/1999/xlink" height="${height}" width="${width}" xmlns="http://www.w3.org/2000/svg">
  <g transform="${gtransform}">
    ${useshape0}
	${useshape1}
  </g>
  <defs>
   ${gshape0}
   ${gshape1}
  </defs>
</svg>`
);
