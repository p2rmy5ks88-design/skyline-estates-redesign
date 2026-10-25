import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const file=path.join(root,'public/skyline-estates/index.html');
const html=fs.readFileSync(file,'utf8');
let count=0;
for(const match of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)){
 if(!/\bsrc=/.test(match[1])&&match[2].trim()){new vm.Script(match[2],{filename:`game-inline-${++count}.js`});}
}
for(const name of ['redesign.js','visual-v2.js'])new vm.Script(fs.readFileSync(path.join(root,'public/skyline-estates/redesign',name),'utf8'),{filename:name});
const assert=(v,m)=>{if(!v)throw new Error(m)};
assert(html.includes("const PKEY='skylineRedesignPrefsV1'"),'Independent preferences namespace');
assert(html.includes("const SKEY='skylineRedesignSaveV1'"),'Independent saved-game namespace');
assert(!html.includes('else boot(h?.data??{})'),'Only redesign startup may boot');
const countryLine=html.split('\n').find(x=>x.startsWith('const COUNTRIES='));
const countries=JSON.parse(countryLine.replace(/^const COUNTRIES=/,'').replace(/;\s*$/,''));
assert(countries.length===18,'Preserve all 18 countries');
assert(countries.flatMap(x=>x.cities).length===31,'Preserve all 31 cities');
const config=fs.readFileSync(path.join(root,'public/eko-estates/firebase-config.js'),'utf8');
assert(!/apiKey|databaseURL/.test(config),'Do not write to the original Firebase service');
for(const art of ['lagos','abuja','stockholm','tokyo','nyc','london','paris','berlin','harbour','modes','bundle','wheel'])assert(fs.statSync(path.join(root,`public/skyline-estates/redesign/art/${art}.webp`)).size>1000,`City artwork ${art}`);
for(const m of html.matchAll(/<(?:script|link)[^>]+(?:src|href)="([^"]+)"/g)){
 if(/^(?:https?:|data:|#)/.test(m[1]))continue;
 assert(fs.existsSync(path.resolve(path.dirname(file),m[1])),`Missing local dependency ${m[1]}`);
}
console.log(`PASS: ${count} inline scripts, redesign JavaScript, all local dependencies, 18 countries/31 cities, isolated saves/backend, all required city and interface assets.`);

for(const name of ['redesign.css','visual-v2.css']){const css=fs.readFileSync(path.join(root,'public/skyline-estates/redesign',name),'utf8');for(const m of css.matchAll(/url\(['"]?([^)'"]+)['"]?\)/g)){if(!/^(data:|https?:)/.test(m[1]))assert(fs.existsSync(path.join(root,'public/skyline-estates/redesign',m[1])),`Missing CSS artwork ${m[1]}`)}}

// Catch unbalanced CSS blocks/functions while respecting quoted strings/comments.
for(const name of ['redesign.css','visual-v2.css']){
 const css=fs.readFileSync(path.join(root,'public/skyline-estates/redesign',name),'utf8');
 const stack=[];let quote=null,comment=false;
 for(let i=0;i<css.length;i++){const c=css[i],n=css[i+1];if(comment){if(c==='*'&&n==='/'){comment=false;i++}continue}if(quote){if(c==='\\'){i++;continue}if(c===quote)quote=null;continue}if(c==='/'&&n==='*'){comment=true;i++;continue}if(c==='"'||c==="'"){quote=c;continue}if('({['.includes(c))stack.push(c);if(')}]'.includes(c)){const open=stack.pop();assert(open==='({['[')}]'.indexOf(c)],`Unbalanced CSS ${name} at ${i}`)}}
 assert(stack.length===0&&!quote&&!comment,`Incomplete CSS ${name}`);
}

for(const city of countries.flatMap(c=>c.cities))assert(fs.statSync(path.join(root,`public/skyline-estates/redesign/art/${city}.webp`)).size>1000,`Missing destination artwork ${city}`);
