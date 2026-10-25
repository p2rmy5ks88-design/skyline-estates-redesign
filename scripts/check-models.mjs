import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=new URL('../public/skyline-estates/',import.meta.url),html=fs.readFileSync(new URL('index.html',root),'utf8'),revision=fs.readFileSync(new URL('redesign/visual-v2.js',root),'utf8');
// Exercise the actual software renderer against the native matrix and mesh code.
const slice=(a,b)=>html.slice(html.indexOf(a),html.indexOf(b,html.indexOf(a)));
const math=slice('const M4={','function glInit');
const geometry=slice('function mkGeo(v,idx)','function texFrom');
const scene=slice('class Node{','const ROOT=');
const tokens=slice('function busModel(col,k=1)','/* ================= BUILD / UPDATE');
const renderer=revision.slice(revision.indexOf('let cpu=null;'),revision.indexOf('const finCol='));
const ctx={clearRect(){},drawImage(){},beginPath(){},ellipse(){},fill(){this.fills++},stroke(){},closePath(){},moveTo(x,y){assert.ok(Number.isFinite(x)&&Number.isFinite(y))},lineTo(x,y){assert.ok(Number.isFinite(x)&&Number.isFinite(y))},fills:0};
const sandbox={console,Float32Array,Uint16Array,Uint32Array,Math,Map,JSON,GL:null,S3:null,hex:c=>c.replace('#','').match(/../g).map(x=>parseInt(x,16)/255),document:{createElement:()=>({width:0,height:0,getContext:()=>ctx})},tokenModelX:()=>false};
vm.createContext(sandbox);
new vm.Script(math+geometry+scene+tokens+renderer+`;globalThis.testRender=renderModel;`).runInContext(sandbox);
const canvas={width:500,height:400,getContext:()=>ctx};
for(const token of ['🚌','🛺','🏍️','🥁','🍲','🦅']){
 const before=ctx.fills;sandbox.testRender(canvas,{token,col:'#267391'},-.65);assert.ok(ctx.fills>before,token+' must produce projected faces');
}
assert.equal(sandbox.S3,null,'Preview generation must restore the gameplay renderer');
new vm.Script(revision.slice(revision.indexOf('plotFloor=function'),revision.indexOf('updateCell=function'))+revision.slice(revision.indexOf('busModel=function'),revision.indexOf('const originalTokenX='))).runInContext(sandbox);
for(const level of [1,2,3,4,5]){const before=ctx.fills;sandbox.testRender(canvas,{kind:'building',level},-.65);assert.ok(ctx.fills>before,'Building tier '+level+' renders');}
new vm.Script(slice('const SURROUND_PREMIUM=[','function surroundFor')+`;globalThis.testSurrounds=SURROUND_PREMIUM;`).runInContext(sandbox);
for(const it of sandbox.testSurrounds){const before=ctx.fills;sandbox.testRender(canvas,{kind:'surround',s:it.s},-.65);assert.ok(ctx.fills>before,it.name+' surround renders');}
const before=ctx.fills;sandbox.testRender(canvas,{token:'🚌',col:'#267391'},.5);assert.ok(ctx.fills>before,'A different angle must render a fresh projection');
console.log('PASS: native token mesh projection, finite coordinates, all five architectural tiers, every premium surround, angle changes and renderer isolation.');

const frame=revision.slice(revision.indexOf('buildFrame=function'),revision.indexOf('busModel=function'));
new vm.Script(`const ROOT=new Node();const untouched=new Node().add(new Node());ROOT.add(untouched);const BP={frame:'#142b36'};S3=cpu;`+frame+`;buildFrame();if(!untouched.visible)throw Error('Frame must preserve city scene groups');if(S3.v2frame.kids.filter(n=>n.v2base).length!==8)throw Error('Expected an eight-sided outer frame');for(const n of S3.v2frame.kids)if(![...n.p,...n.r,...n.s].every(Number.isFinite))throw Error('Invalid frame geometry');S3=null;`).runInContext(sandbox);
console.log('PASS: eight-sided frame geometry and preservation of unrelated scene groups.');
