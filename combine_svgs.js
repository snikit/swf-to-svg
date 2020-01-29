const FS = require('fs');
const { createCanvas, loadImage } = require('canvas');
const png2svg = require('svg-png-converter').png2svg;
const DOMParser = require('dom-parser');
const SVGO = require('svgo');
const prettier = require('pretty-data').pd;
const parser = new DOMParser();
const dimensions = 4000;
const log = console.log;
const fname = process.argv[2];
const fillreplacecolor = process.argv[3] ? `#${process.argv[3]}` : null;

// init----------------------------->

const firstFileName = './output/1.svg';
const secondFileName = './output/3.svg';

const data1 = FS.readFileSync(firstFileName).toString();
const data2 = FS.readFileSync(secondFileName).toString();

const xmlDoc1 = parser.parseFromString(data1, 'text/xml');
const gs1 = xmlDoc1.getElementsByTagName('g');

// const xmlDoc2 = parser.parseFromString(data2, 'text/xml');
// const gs2 = xmlDoc2.getElementsByTagName('svg');
const svgname = fname.replace('swf', 'svg');
log(`processing ${svgname}`);

FS.writeFileSync(`${svgname}`, data2.replace('.org/2000/svg">', `.org/2000/svg">${gs1[0].outerHTML}`));
