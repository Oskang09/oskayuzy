var e=Object.assign;import{D as t,j as a,a as s,b as n,c as l,d as r,i,e as c}from"./vendor.c041a0da.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(a){const s=new URL(e,location),n=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((a,l)=>{const r=new URL(e,s);if(self[t].moduleMap[r])return a(self[t].moduleMap[r]);const i=new Blob([`import * as m from '${r}';`,`${t}.moduleMap['${r}']=m;`],{type:"text/javascript"}),c=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(i),onerror(){l(new Error(`Failed to import: ${e}`)),n(c)},onload(){a(self[t].moduleMap[r]),n(c)}});document.head.appendChild(c)})),self[t].moduleMap={}}}("assets/");const o={position:"relative",textAlign:"center",color:"white"};function m(){const e=new Date("2017-04-15T00:00:00.000Z"),a=Date.now()-e,s=parseInt(a/864e5);return t.createElement("div",{style:o},t.createElement("img",{width:256,height:181,className:"heartbeat",src:"./assets/love.c9962ef8.png"}),t.createElement("div",{className:"heartbeat-text"},s+1,t.createElement("br",null),"Days"))}function d(){return t.useEffect((()=>{var e=setInterval((function(){var e=Math.floor(40*Math.random())+1,t=Math.floor(65*Math.random())+10,s=Math.floor(100*Math.random())+1,n=Math.floor(25*Math.random())+100,l=Math.floor(5*Math.random())+5;a(".bg_heart").append("<div class='heart' style='width:"+t+"px;height:"+t+"px;left:"+s+"%;background:rgba(255,"+(n-25)+","+n+",1);-webkit-animation:love "+l+"s ease;-moz-animation:love "+l+"s ease;-ms-animation:love "+l+"s ease;animation:love "+l+"s ease'></div>"),a(".bg_heart").append("<div class='heart' style='width:"+(t-10)+"px;height:"+(t-10)+"px;left:"+(s+e)+"%;background:rgba(255,"+(n-25)+","+(n+25)+",1);-webkit-animation:love "+(l+5)+"s ease;-moz-animation:love "+(l+5)+"s ease;-ms-animation:love "+(l+5)+"s ease;animation:love "+(l+5)+"s ease'></div>"),a(".heart").each((function(){var e=a(this).css("top").replace(/[^-\d\.]/g,""),t=a(this).css("width").replace(/[^-\d\.]/g,"");(e<=-100||t>=150)&&a(this).detach()}))}),500);return()=>clearInterval(e)}),[]),t.createElement("div",{className:"bg_heart"})}function p(){return t.createElement("div",{className:"psy-container"},t.createElement("div",{className:"psy"},t.createElement("div",{className:"psy-head"},t.createElement("div",{className:"psy-face"},t.createElement("div",{className:"psy-eye-wrap"},t.createElement("div",{className:"psy-eye psy-eye-left"})),t.createElement("div",{className:"psy-eye-wrap"},t.createElement("div",{className:"psy-eye psy-eye-right"})),t.createElement("div",{className:"psy-blush psy-blush-left"}),t.createElement("div",{className:"psy-blush psy-blush-right"})),t.createElement("div",{className:"psy-beak"},t.createElement("div",{className:"psy-beak-nose"})),t.createElement("div",{className:"psy-hair"})),t.createElement("div",{className:"psy-body"},t.createElement("div",{className:"psy-arm psy-arm-left"},t.createElement("div",{className:"psy-arm-claw"})),t.createElement("div",{className:"psy-arm psy-arm-right"},t.createElement("div",{className:"psy-arm-claw"})),t.createElement("div",{className:"psy-tube psy-tube-front"}),t.createElement("div",{className:"psy-tube psy-tube-back"}),t.createElement("div",{className:"psy-torso"}),t.createElement("div",{className:"psy-foot psy-foot-left"},t.createElement("div",{className:"psy-foot-web"})),t.createElement("div",{className:"psy-foot psy-foot-right"},t.createElement("div",{className:"psy-foot-web"})),t.createElement("div",{className:"water-magic"}),t.createElement("div",{className:"water-ripple water-ripple-highlight"}),t.createElement("div",{className:"water-ripple water-ripple-shadow"})),t.createElement("div",{className:"psy-thoughts psy-thoughts-1"},t.createElement("span",{className:"psy-thoughts-symbol"},"?")),t.createElement("div",{className:"psy-thoughts psy-thoughts-2"},t.createElement("span",{className:"psy-thoughts-symbol"},"?"))))}function u(e){return t.useEffect((()=>{a(`#slideshow-${e.id} > div:gt(0)`).hide(),setInterval((function(){a(`#slideshow-${e.id} > div:first`).fadeOut(e.fadeInterval).next().fadeIn(e.fadeInterval).end().appendTo(`#slideshow-${e.id}`)}),e.interval)}),[]),t.createElement("div",{id:`slideshow-${e.id}`,style:e.style},e.images.map(((e,a)=>t.createElement("div",{key:a},t.createElement("img",{src:e})))))}u.propTypes={id:s.string,interval:s.number,fadeInterval:s.number,images:s.array};function y(){return t.createElement("div",{className:"lion"},t.createElement("span",{className:"mane"},t.createElement("span",{className:"head"},t.createElement("span",{className:"eye left"}),t.createElement("span",{className:"eye right"}),t.createElement("span",{className:"nose"})),t.createElement("span",{className:"ear left"},t.createElement("span",{className:"inner"})),t.createElement("span",{className:"ear right"},t.createElement("span",{className:"inner"}))),t.createElement("span",{className:"body"},t.createElement("span",{className:"paw left"}),t.createElement("span",{className:"paw right"}),t.createElement("span",{className:"leg left"}),t.createElement("span",{className:"leg right"})))}function E(e){const[a,s]=t.useState("0");return t.createElement(n.Carousel,{selectedItem:a,onChange:s,autoPlay:!0,swipeable:!0,stopOnHover:!0,showStatus:!1,showArrows:!1,showIndicators:!1,showThumbs:!1,useKeyboardArrows:!0,emulateTouch:!0,dynamicHeight:!1},e.images.map(((a,s)=>t.createElement("div",{id:"carousel-image",key:s},t.createElement("img",{style:{height:"100%",objectFit:"contain"},src:a}),t.createElement("p",{className:"legend"},e.legends[s])))))}E.propTypes={legends:s.array,images:s.array};function g({slide:e,offset:a}){const s=0===a||null;return t.createElement("div",{className:"slide","data-active":s,style:{"--offset":a,"--dir":0===a?0:a>0?1:-1,position:"relative"}},t.createElement("div",{className:"slideBackground",style:{backgroundImage:`url('${e.image}')`,position:"absolute"}}),t.createElement("div",{className:"slideContent",onClick:()=>window.open(e.url),style:{backgroundImage:`url('${e.image}')`,backgroundSize:"contain"}},t.createElement("div",{className:"slideContentTop"},new Date(1e3*e.timestamp).toLocaleString("en-US",{month:"long",day:"numeric",year:"numeric"})),t.createElement("div",{className:"slideContentBottom"},e.caption)))}function h({posts:a}){const[s,n]=t.useReducer(((t,s)=>"NEXT"===s.type?e(e({},t),{slideIndex:(t.slideIndex+1)%a.length}):"PREV"===s.type?e(e({},t),{slideIndex:0===t.slideIndex?a.length-1:t.slideIndex-1}):void 0),{slideIndex:0});return t.useEffect((()=>{const e=setInterval((()=>n({type:"PREV"})),3e3);return()=>clearInterval(e)}),[]),t.createElement("div",{className:"slides"},t.createElement("button",{onClick:()=>n({type:"PREV"})},"‹"),[...a,...a,...a].map(((e,n)=>{let l=a.length+(s.slideIndex-n);return t.createElement(g,{slide:e,offset:l,key:n})})),t.createElement("button",{onClick:()=>n({type:"NEXT"})},"›"))}h.propTypes={posts:s.array};function v(e,a){return e?t.createElement("div",{className:"lds-heart"},t.createElement("div",null)):"function"==typeof a?a():a}const f=l.create({headers:{}});var b={getInstagramInfo:async function(){const e=await async function(e,t,a){let s,n=!1;try{"GET"!==e||"object"!=typeof a&&"string"!=typeof a||(t+="?"+r.stringify(a)),s="GET"!==e?await f[e.toLowerCase()](t,a):await f[e.toLowerCase()](t)}catch(l){n=!l.isAxiosError&&!l.response,s=l.response}if(n||s.status>=400)throw new Error(s.data);return s.data}("GET","https://api.github.com/gists/f552f4285675cce59b1c8a6e8ec90e92");return JSON.parse(i.dig(e,"files,oskayuzy.json,content",{seperator:","}))}};const N={position:"relative",margin:0,border:"none"},w={opacity:.3,position:"absolute",top:0,left:0,zIndex:-998,height:"100%",width:"100%"},x={textAlign:"center",position:"relative"},I={margin:20,marginLeft:30,display:"flex",flex:1,flexDirection:"column"},j={margin:20,marginLeft:30,display:"flex",flex:1,flexDirection:"column"},k={borderRadius:"50%",width:192,height:192},T={fontSize:20,color:"black"};function M(){const[e,a]=t.useState(null),[s,n]=t.useState(null),[l,r]=t.useState([]);return t.useEffect((async function(){const{boy_profile:e,girl_profile:t,posts:s}=await b.getInstagramInfo();a(e),n(t),r(s)}),[]),t.createElement("div",{style:N},t.createElement("div",{id:"header-bar"},t.createElement("h1",{id:"header-boy"},"👦"),t.createElement("h1",null,"OskaYuzy"),t.createElement("h1",{id:"header-girl"},"👧")),t.createElement("div",{style:x},t.createElement(d,null),t.createElement("img",{style:w,src:"./assets/love-bg.48b470ea.jpg"}),t.createElement("div",{id:"love-container"},t.createElement("div",{style:{flex:1}},v(!e,t.createElement("img",{style:k,src:e}))),t.createElement("div",{style:{paddingTop:15,paddingBottom:15,flex:2}},t.createElement("div",{style:T,className:"column"},"We have been together"),t.createElement(m,null),t.createElement("div",{style:T,className:"column"},"Have a better tomorrow")),t.createElement("div",{style:{flex:1}},v(!s,t.createElement("img",{style:k,src:s}))))),t.createElement(E,{images:["./assets/1.809d9370.jpg","./assets/2.c56b6cd6.jpg","./assets/3.b332746f.jpg","./assets/4.9370d912.jpg","./assets/5.d60c8d93.jpg","./assets/6.925323ca.jpg"],legends:["Happy CNY","Kukup Trip","Dating Day","Zenplus Day","Yuzy's KL Trip","Melaka Home Capture"]}),t.createElement("div",{id:"psyduck-container"},t.createElement("div",{style:I},t.createElement("h1",null,"Duck Duck Ducky"),t.createElement("p",null,"some descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome description"),t.createElement(u,{id:"duck",interval:3e3,fadeInterval:1e3,images:["./assets/1.97a638af.jpg","./assets/2.e23b8dcf.jpg","./assets/3.ad76c479.jpg","./assets/4.da8eb10a.jpg","./assets/5.8a771233.jpg"]})),t.createElement("div",{style:{flex:1}},t.createElement(p,null))),t.createElement("div",{id:"lion-container"},t.createElement("div",{style:{flex:1}},t.createElement(y,{className:"column"})),t.createElement("div",{style:j},t.createElement("h1",null,"Lion"),t.createElement("p",null,"some descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome description"),t.createElement(u,{id:"lion",interval:3e3,fadeInterval:1e3,images:["./assets/1.27a8da1b.jpg","./assets/2.dddf5dfa.jpg","./assets/3.26e2f902.jpg","./assets/4.4b73123e.jpg","./assets/5.5958d985.jpg"]}))),t.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",overflow:"hidden",paddingTop:100,paddingBottom:160}},v(!l||0===l.length,t.createElement(h,{posts:l}))))}c.render(t.createElement(M,null),document.getElementById("root"));