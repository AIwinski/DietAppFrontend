(window.webpackJsonpclient=window.webpackJsonpclient||[]).push([[14],{178:function(n,e,t){"use strict";var r=t(0),i=t.n(r),a=t(7),o=t(8),c=t(3);function u(){var n=Object(a.a)(["\n    width: 100%;\n    height: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n"]);return u=function(){return n},n}function l(){var n=Object(a.a)(["\n    display: inline-block;\n    position: relative;\n    width: 64px;\n    height: 64px;\n    z-index: 1000;\n    div {\n        position: absolute;\n        top: 27px;\n        width: 11px;\n        height: 11px;\n        border-radius: 50%;\n        background: ",";\n        animation-timing-function: cubic-bezier(0, 1, 1, 0);\n    }\n    div:nth-child(1) {\n        left: 6px;\n        animation: lds-ellipsis1 0.6s infinite;\n    }\n    div:nth-child(2) {\n        left: 6px;\n        animation: lds-ellipsis2 0.6s infinite;\n    }\n    div:nth-child(3) {\n        left: 26px;\n        animation: lds-ellipsis2 0.6s infinite;\n    }\n    div:nth-child(4) {\n        left: 45px;\n        animation: lds-ellipsis3 0.6s infinite;\n    }\n    @keyframes lds-ellipsis1 {\n        0% {\n            transform: scale(0);\n        }\n        100% {\n            transform: scale(1);\n        }\n    }\n    @keyframes lds-ellipsis3 {\n        0% {\n            transform: scale(1);\n        }\n        100% {\n            transform: scale(0);\n        }\n    }\n    @keyframes lds-ellipsis2 {\n        0% {\n            transform: translate(0, 0);\n        }\n        100% {\n            transform: translate(19px, 0);\n        }\n    }\n"]);return l=function(){return n},n}var s=o.c.div(l(),c.b.blue),d=o.c.div(u());e.a=function(){return i.a.createElement(d,null,i.a.createElement(s,null,i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null)))}},181:function(n,e,t){"use strict";function r(n){return function(n){if(Array.isArray(n)){for(var e=0,t=new Array(n.length);e<n.length;e++)t[e]=n[e];return t}}(n)||function(n){if(Symbol.iterator in Object(n)||"[object Arguments]"===Object.prototype.toString.call(n))return Array.from(n)}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}t.d(e,"a",(function(){return r}))},189:function(n,e,t){"use strict";var r=t(0);e.a=function(n){Object(r.useEffect)((function(){document.title=n}),[n])}},275:function(n,e,t){"use strict";t.d(e,"d",(function(){return m})),t.d(e,"f",(function(){return v})),t.d(e,"e",(function(){return p})),t.d(e,"g",(function(){return b})),t.d(e,"a",(function(){return g})),t.d(e,"c",(function(){return h})),t.d(e,"b",(function(){return j}));var r=t(7),i=t(8),a=t(3);function o(){var n=Object(r.a)(["\n    display: flex;\n    align-items: center;\n"]);return o=function(){return n},n}function c(){var n=Object(r.a)(["\n\n"]);return c=function(){return n},n}function u(){var n=Object(r.a)(["\n\n"]);return u=function(){return n},n}function l(){var n=Object(r.a)(["\n\n"]);return l=function(){return n},n}function s(){var n=Object(r.a)(["\n    \n"]);return s=function(){return n},n}function d(){var n=Object(r.a)(["\n    margin-left: 1rem;\n"]);return d=function(){return n},n}function f(){var n=Object(r.a)(["\n    position: relative;\n    border-left: 1px solid #eee;\n    min-height: calc(100vh - ",");\n    padding: 0.5rem;\n\n    @media (max-width: ",") {\n        min-height: auto;\n    }\n"]);return f=function(){return n},n}var m=i.c.div(f(),a.e,a.a.md),v=i.c.div(d()),p=i.c.div(s()),b=i.c.div(l()),g=i.c.div(u()),h=i.c.div(c()),j=i.c.div(o())},539:function(n,e,t){(function(t){var r,i,a;i=[],void 0===(a="function"===typeof(r=function(){"use strict";function e(n,e,t){var r=new XMLHttpRequest;r.open("GET",n),r.responseType="blob",r.onload=function(){o(r.response,e,t)},r.onerror=function(){console.error("could not download file")},r.send()}function r(n){var e=new XMLHttpRequest;e.open("HEAD",n,!1);try{e.send()}catch(n){}return 200<=e.status&&299>=e.status}function i(n){try{n.dispatchEvent(new MouseEvent("click"))}catch(e){var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),n.dispatchEvent(t)}}var a="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof t&&t.global===t?t:void 0,o=a.saveAs||("object"!=typeof window||window!==a?function(){}:"download"in HTMLAnchorElement.prototype?function(n,t,o){var c=a.URL||a.webkitURL,u=document.createElement("a");t=t||n.name||"download",u.download=t,u.rel="noopener","string"==typeof n?(u.href=n,u.origin===location.origin?i(u):r(u.href)?e(n,t,o):i(u,u.target="_blank")):(u.href=c.createObjectURL(n),setTimeout((function(){c.revokeObjectURL(u.href)}),4e4),setTimeout((function(){i(u)}),0))}:"msSaveOrOpenBlob"in navigator?function(n,t,a){if(t=t||n.name||"download","string"!=typeof n)navigator.msSaveOrOpenBlob(function(n,e){return"undefined"==typeof e?e={autoBom:!1}:"object"!=typeof e&&(console.warn("Deprecated: Expected third argument to be a object"),e={autoBom:!e}),e.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(n.type)?new Blob(["\ufeff",n],{type:n.type}):n}(n,a),t);else if(r(n))e(n,t,a);else{var o=document.createElement("a");o.href=n,o.target="_blank",setTimeout((function(){i(o)}))}}:function(n,t,r,i){if((i=i||open("","_blank"))&&(i.document.title=i.document.body.innerText="downloading..."),"string"==typeof n)return e(n,t,r);var o="application/octet-stream"===n.type,c=/constructor/i.test(a.HTMLElement)||a.safari,u=/CriOS\/[\d]+/.test(navigator.userAgent);if((u||o&&c)&&"object"==typeof FileReader){var l=new FileReader;l.onloadend=function(){var n=l.result;n=u?n:n.replace(/^data:[^;]*;/,"data:attachment/file;"),i?i.location.href=n:location=n,i=null},l.readAsDataURL(n)}else{var s=a.URL||a.webkitURL,d=s.createObjectURL(n);i?i.location=d:location.href=d,i=null,setTimeout((function(){s.revokeObjectURL(d)}),4e4)}});a.saveAs=o.saveAs=o,n.exports=o})?r.apply(e,i):r)||(n.exports=a)}).call(this,t(27))},673:function(n,e,t){"use strict";t.r(e);var r=t(181),i=t(33),a=t(0),o=t.n(a),c=t(7),u=t(8),l=t(3);function s(){var n=Object(c.a)(["\n\n"]);return s=function(){return n},n}function d(){var n=Object(c.a)(["\n\n"]);return d=function(){return n},n}function f(){var n=Object(c.a)(["\n    position: relative;\n"]);return f=function(){return n},n}function m(){var n=Object(c.a)(["\n    box-sizing: border-box;\n    height: 80%;\n    overflow: auto;\n    padding: 0.5rem;\n    position: relative;\n\n    @media (max-width: ",") {\n        height: 300px;\n    }\n"]);return m=function(){return n},n}function v(){var n=Object(c.a)(["\n    position: relative;\n    height: calc(100vh - ",");\n    box-sizing: border-box;\n\n    @media (max-width: ",") {\n        height: auto;\n    }\n"]);return v=function(){return n},n}function p(){var n=Object(c.a)(["\n    position: relative;\n    height: calc(100vh - ",");\n    display: grid;\n    grid-template-columns: 1fr 2fr 1fr;\n    box-sizing: border-box;\n\n    @media (max-width: ",") {\n        height: auto;\n        display: flex;\n        flex-direction: column;\n    }\n"]);return p=function(){return n},n}function b(){var n=Object(c.a)(["\n    position: relative;\n    width: 100%;\n    height: 20%;\n    form {\n        height: 100%;\n    }\n\n    @media (max-width: ",") {\n        height: auto;\n    }\n"]);return b=function(){return n},n}var g=u.c.div(b(),l.a.md),h=u.c.div(p(),l.e,l.a.md),j=u.c.div(v(),l.e,l.a.md),E=u.c.div(m(),l.a.md),y=u.c.div(f()),w=u.c.div(d()),O=u.c.div(s());function x(){var n=Object(c.a)(["\n    color: red;\n"]);return x=function(){return n},n}function S(){var n=Object(c.a)(["\n    min-height: calc(100vh - ",");\n    overflow: auto;\n    box-sizing: border-box;\n    margin: 0;\n    border-right: 1px solid #ddd;\n    position: relative;\n\n    @media (max-width: ",") {\n        min-height: auto;\n    }\n"]);return S=function(){return n},n}var k=u.c.div(S(),l.e,l.a.md),I=u.c.div(x());function C(){var n=Object(c.a)(["\n    padding: 1rem;\n    cursor: pointer;\n    background: ",";\n    border-left: ",";\n    &:hover {\n        background: #eee;\n    }\n"]);return C=function(){return n},n}var A=u.c.div(C(),(function(n){return n.isActive?"#fff":"#e5e5e5"}),(function(n){return n.isActive?"none":"3px solid #c92d02"})),U=function(n){return o.a.createElement(A,{onClick:n.onClick,isActive:n.isActive},n.children)},T=t(178),z=function(n){var e=n.elements,t=n.onElementClick;return o.a.createElement(k,null,e?0===e.length?o.a.createElement(I,null,"Nie masz jeszcze zadnych konwersacji"):e.map((function(e,r){return o.a.createElement(U,{isActive:String(r)!==String(n.active),key:r,onClick:function(){return t(e.id)}},e.value)})):o.a.createElement(T.a,null))},R=t(275),N=t(47),L=t(11);function M(){var n=Object(c.a)(["\n\n"]);return M=function(){return n},n}function B(){var n=Object(c.a)(["\n\n"]);return B=function(){return n},n}function F(){var n=Object(c.a)(["\n\n"]);return F=function(){return n},n}var D=Object(u.c)(L.e)(F()),H=u.c.div(B()),P=Object(u.c)(L.e)(M()),q=t(46),K=function(n){var e=Object(a.useState)(!0),t=Object(i.a)(e,2),r=t[0],c=t[1],u=Object(a.useState)([]),l=Object(i.a)(u,2),s=l[0],d=l[1];return Object(a.useEffect)((function(){q.e.getPatients().then((function(n){console.log(n.data.patients),d(n.data.patients),c(!1)})).catch((function(n){console.log(n)}))}),[]),o.a.createElement(H,null,r?o.a.createElement(T.a,null):s.map((function(n){return String(n.userAccountId)})).includes(String(n.userAccountId))?o.a.createElement(P,{to:"/patient-details/"+s.find((function(n){return String(n.userAccountId)})).id},"Szczeg\xf3\u0142y pacjenta"):o.a.createElement(D,{to:{pathname:"/add-patient",state:{userAccountId:n.userAccountId}}},"Dodaj pacjenta"))},V=function(n){var e=n.info;return o.a.createElement(R.d,null,e?o.a.createElement(R.e,null,o.a.createElement(R.b,null,o.a.createElement(N.a,{url:e.avatar}),o.a.createElement(R.f,null,e.displayName)),o.a.createElement(R.c,null,"Email: ",e.email),o.a.createElement(R.a,null,"Typ konta: ","doctor"===e.accountType?"lekarz":"pacjent"),o.a.createElement(L.e,{to:"/video/"+e.userId},"Chat video"),"patient"===e.accountType&&o.a.createElement(K,{userAccountId:e.userId})):o.a.createElement(R.e,null,o.a.createElement(R.g,null,"Brak danych")))},_=t(172);function G(){var n=Object(c.a)(["\n    padding: 0 0.5rem;\n"]);return G=function(){return n},n}function J(){var n=Object(c.a)(["\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    position: absolute;\n    bottom: 0;\n    width: 100%;\n    padding: 1rem;\n"]);return J=function(){return n},n}function W(){var n=Object(c.a)(["\n    cursor: pointer;\n    font-size: 1.2rem;\n    color: ",";\n"]);return W=function(){return n},n}function X(){var n=Object(c.a)(["\n    display: none;\n"]);return X=function(){return n},n}function Z(){var n=Object(c.a)(["\n    box-sizing: border-box;\n    width: 100%;\n    height: 100%;\n    resize: none;\n    padding: 1rem;\n    padding-right: 6rem;\n    border: none;\n    display: block;\n    border-top: 1px solid #ddd;\n"]);return Z=function(){return n},n}function Q(){var n=Object(c.a)(["\n    cursor: pointer;\n    padding: 0;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n    font-size: 1.2rem;\n    color: ",";\n    border: none;\n    background: none;\n"]);return Q=function(){return n},n}var Y=u.c.button(Q(),l.b.darkblue),$=Object(u.c)(_.b)(Z()),nn=u.c.input(X()),en=u.c.label(W(),l.b.darkblue),tn=u.c.div(J()),rn=u.c.span(G()),an=t(39),on=t(38),cn=function(n){var e=Object(a.useRef)(null),t=function(n){13==n.keyCode&&0==n.shiftKey&&(n.preventDefault(),e.current.handleSubmit())};return o.a.createElement(_.d,{ref:e,initialValues:{text:"",file:null},onSubmit:function(e,t){var r,i=t.setFieldValue;(e.text.replace(/\s/g,"").length||null!=e.file)&&(r=null==e.file?{conversationId:n.coversationId,text:e.text,file:null,messageType:q.d.text,newConversation:n.newConversation,newConversationUserId:n.newConversationUserId}:{conversationId:n.coversationId,text:e.text,file:e.file,messageType:q.d.file,newConversation:n.newConversation,newConversationUserId:n.newConversationUserId},console.log(r),q.b.sendMessage(r).then((function(e){console.log(e),n.onMessageSent(e.data),i("text",""),i("file",null)})).catch((function(n){console.log(n)})))},render:function(n){var e=n.setFieldValue,r=n.values;return o.a.createElement(_.c,null,o.a.createElement($,{name:"text",placeholder:"Wpisz wiadomo\u015b\u0107...",component:"textarea",onKeyDown:t}),o.a.createElement(tn,null,o.a.createElement(en,null,o.a.createElement(on.a,{icon:an.k}),o.a.createElement(rn,null,r.file?r.file.name:"Za\u0142\u0105cz plik"),o.a.createElement(nn,{id:"file",name:"file",type:"file",onChange:function(n){e("file",n.currentTarget.files[0])}})),o.a.createElement(Y,{type:"submit"},o.a.createElement(rn,null,"Wy\u015blij")," ",o.a.createElement(on.a,{icon:an.b}))))}})};function un(){var n=Object(c.a)(["\n    cursor: pointer;\n    font-weight: bold;\n"]);return un=function(){return n},n}function ln(){var n=Object(c.a)(["\n    width: 100%;\n    box-sizing: border-box;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n"]);return ln=function(){return n},n}function sn(){var n=Object(c.a)(["\n    border: 1px solid #ddd;\n    display: flex;\n    align-self: flex-start;\n    padding: 0;\n    border-radius: 40px;\n    font-size: 1.6rem;\n    line-height: 2rem;\n    vertical-align: baseline;\n    padding: 0.2rem 1.2rem;\n    margin: 0.2rem 0;\n    margin-right: 20%;\n    border-top-left-radius: 6px;\n    background: #ccc;\n    ","\n"]);return sn=function(){return n},n}var dn=u.c.div(sn(),(function(n){return n.isReceived&&"\n        align-self: flex-end;\n        color: white;\n        background: ".concat(l.b.blue,";\n        margin-right: 0;\n        margin-left: 20%;\n        border-top-left-radius: 40px;\n        border-bottom-right-radius: 6px;\n    ")})),fn=u.c.div(ln()),mn=u.c.div(un()),vn=t(539),pn=function(n){var e=n.isReceived,t=n.type,r=n.text,i=(n.date,n.srcPath,n.id),a=n.initialFileName;switch(t){case q.d.text:return o.a.createElement(fn,null,o.a.createElement(dn,{isReceived:e},r));case q.d.file:return o.a.createElement(fn,null,o.a.createElement(dn,{isReceived:e,onClick:function(){return function(n){q.b.getFile(n).then((function(n){if(console.log(n),"OK"===n.statusText){var e=new Blob([n.data],{type:n.data.type});Object(vn.saveAs)(e,a)}})).catch((function(n){console.log(n)}))}(i)}},r,o.a.createElement(mn,null,o.a.createElement(on.a,{icon:an.e}),a)));default:return o.a.createElement(fn,null,"Unsupported message type")}},bn=t(30),gn=t(189),hn=t(22),jn={push:t(15).d};e.default=Object(bn.c)((function(n){return{currentUser:n.auth.currentUser}}),jn)((function(n){Object(gn.a)("Chat");var e=Object(a.useState)(n.match.params.id),t=Object(i.a)(e,2),c=t[0],u=t[1],l=Object(a.useState)([]),s=Object(i.a)(l,2),d=s[0],f=s[1],m=Object(a.useState)([]),v=Object(i.a)(m,2),p=v[0],b=v[1],x=Object(a.useState)(),S=Object(i.a)(x,2),k=S[0],I=S[1],C=Object(a.useState)(n.location&&n.location.state?n.location.state.newConversationUserId:void 0),A=Object(i.a)(C,2),U=A[0],R=A[1],N=Object(a.useState)(!0),L=Object(i.a)(N,2),M=L[0],B=L[1],F=Object(a.useRef)(null);Object(a.useEffect)((function(){P()}),[]),Object(a.useEffect)((function(){q.g.on("MESSAGE",(function(n){D(n)})),G(c)}),[p,c]),Object(a.useEffect)((function(){c&&_()}),[c]),Object(a.useEffect)((function(){if(U){var n=H(d,U);console.log(n),-1!==n&&K(d[n].id)}else if(c){var e=d.findIndex((function(n){return n.id===c}));console.log(e),-1!==e?K(d[e].id):d.length?K(d[0].id):K("")}else d.length?K(d[0].id):K("")}),[d,M]);var D=function(n){n.createdNewConversation&&(console.log(d),f([].concat(Object(r.a)(d),[n.newConversation]))),c==String(n.message.conversationId)&&(b([].concat(Object(r.a)(p),[n.message])),J())},H=function(e,t){var r=-1;return e.forEach((function(e,i){e.users.length>1?e.users.forEach((function(e){String(e.id)===String(t)&&String(e.id)!==String(n.currentUser.id)&&(r=i)})):1===e.users.length&&String(e.users[0].id)===String(n.currentUser.id)&&String(e.users[0].id)===String(t)&&(r=i)})),console.log(e),console.log(r),r},P=function(){q.b.getConversations().then((function(n){f(n.data.conversations),B(!1)})).catch((function(n){console.error(n)}))},K=function(e){u(e),G(e),R(void 0),e?n.push("/chat/"+e):n.push("/chat")},_=function(){var n=p.filter((function(n){return String(n.conversationId)===c}))||[],e={conversationId:c,qty:hn.c,offset:n.length};q.b.getMessages(e).then((function(e){b([].concat(Object(r.a)(n),Object(r.a)(e.data.messages))),J()})).catch((function(n){console.error(n)}))},G=function(e){console.log(d);var t=void 0,r=d.find((function(n){return String(n.id)===String(e)}));if(r)if(1===r.users.length)t={displayName:r.users[0].displayName,accountType:r.users[0].accountType,email:r.users[0].email,avatar:r.users[0].avatar,userId:r.users[0].id};else if(r.users.length>1){var i=r.users.find((function(e){return String(e.id)!==String(n.currentUser.id)}));t=i?{displayName:i.displayName,accountType:i.accountType,email:i.email,avatar:i.avatar,userId:i.id}:void 0}I(t)},J=function(){F&&F.current&&(F.current.scrollTop=F.current.scrollHeight)};return o.a.createElement(h,null,o.a.createElement(z,{elements:!M&&d?function(e){return e.map((function(e){var t="";return e.users.forEach((function(e){e.displayName!==n.currentUser.displayName&&(t+=e.displayName+", ")})),0===t.length&&(t=n.currentUser.displayName+", "),{value:t.slice(0,-2),id:e.id}}))}(d):void 0,onElementClick:function(n){K(String(n))},active:!M&&d?d.findIndex((function(n){return String(n.id)===String(c)})):-1}),o.a.createElement(j,null,o.a.createElement(E,{ref:F},U?o.a.createElement(w,null,"new conversation: ",U):void 0!==p?0!==p.length?p.map((function(e){return o.a.createElement(pn,{text:e.text,key:e.id,id:e.id,date:e.createdAt,type:e.messageType,srcPath:e.srcPath,initialFileName:e.initialFileName,isReceived:String(n.currentUser.id)===String(e.senderId)})})):o.a.createElement(O,null,"brak wiadomosci"):o.a.createElement(T.a,null)),o.a.createElement(g,null,o.a.createElement(cn,{newConversationUserId:U,coversationId:c,newConversation:!!U,onMessageSent:function(n){if(n.createdNewConversation){var e=n.newConversation;f([].concat(Object(r.a)(d),[e])),K(e.id)}}}))),o.a.createElement(y,null,d?o.a.createElement(V,{info:k}):o.a.createElement(T.a,null)))}))}}]);
//# sourceMappingURL=14.9e19b10f.chunk.js.map