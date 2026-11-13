// Conservative whitespace/comment minification. Preserve strings and value punctuation.
import { readFileSync, writeFileSync } from 'node:fs';
function minifyCss(src){let chunks=[],out="",q=null;for(let i=0;i<src.length;i++){let c=src[i];if(q){out+=c;if(c==="\\"){out+=src[++i]||"";}else if(c===q){chunks.push({s:out,raw:true});out="";q=null;}}else if(c==="'"||c==='"'){if(out){chunks.push({s:out,raw:false});out="";}q=c;out=c;}else if(c==='/'&&src[i+1]==='*'){const end=src.indexOf("*/",i+2);if(end<0)throw Error("comment");out+=" ";i=end+1;}else out+=c;}if(q)throw Error("quote");if(out)chunks.push({s:out,raw:false});return chunks.map(c=>c.raw?c.s:c.s.replace(/\s+/g," ").replace(/\s*([{};])\s*/g,"$1").replace(/;}/g,"}")).join("").trim()+"\n";}
const source = new URL('../css/style.css', import.meta.url);
const target = new URL('../css/style.min.css', import.meta.url);
writeFileSync(target, minifyCss(readFileSync(source, 'utf8')));
