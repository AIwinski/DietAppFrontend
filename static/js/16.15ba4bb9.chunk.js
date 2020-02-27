(window.webpackJsonpclient=window.webpackJsonpclient||[]).push([[16],{174:function(n,e,t){"use strict";var r=t(0);e.a=function(n){Object(r.useEffect)((function(){document.title=n}),[n])}},175:function(n,e,t){"use strict";t.d(e,"i",(function(){return v})),t.d(e,"a",(function(){return w})),t.d(e,"h",(function(){return j})),t.d(e,"d",(function(){return O})),t.d(e,"e",(function(){return x})),t.d(e,"c",(function(){return E})),t.d(e,"b",(function(){return k})),t.d(e,"j",(function(){return T})),t.d(e,"l",(function(){return z})),t.d(e,"f",(function(){return P})),t.d(e,"k",(function(){return C})),t.d(e,"g",(function(){return H}));var r=t(7),a=t(8),i=t(172),o=t(3);function c(){var n=Object(r.a)(["\n    width: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    position: relative;\n    padding-bottom: 1rem;\n"]);return c=function(){return n},n}function u(){var n=Object(r.a)(["\n    \n"]);return u=function(){return n},n}function l(){var n=Object(r.a)(["\n    width: 100%;\n    font-weight: bold;\n"]);return l=function(){return n},n}function d(){var n=Object(r.a)(["\n    width: 100%;\n    background: none;\n    border: none;\n    padding: 1rem 2rem;\n    color: white;\n    cursor: pointer;\n    background: ",";\n    border-radius: 5px;\n    transition: background 0.2s;\n\n    :hover {\n        background: ",";\n    }\n\n    ","\n"]);return d=function(){return n},n}function s(){var n=Object(r.a)(["\n    box-sizing: border-box;\n    display: block;\n    width: 100%;\n    padding: 0 0.8rem;\n    font-size: 1.2rem;\n"]);return s=function(){return n},n}function p(){var n=Object(r.a)(["\n    box-sizing: border-box;\n    width: 100%;\n    color: red;\n    padding: 0 0.8rem;\n    font-size: 1.2rem;\n"]);return p=function(){return n},n}function f(){var n=Object(r.a)(["\n    width: 100%;\n    background: none;\n    border: none;\n    box-sizing: border-box;\n    padding: 0.8rem;\n    border: 1px solid #ddd;\n    border-radius: 5px;\n    transition: all 0.2s;\n\n    :focus {\n        outline: none;\n        border: 1px solid ",";\n        box-shadow: 0 0 5px ",';\n    }\n\n    &[type="radio"] {\n        outline: none;\n        border: none;\n        box-shadow: none;\n        cursor: pointer;\n        width: 1.6rem;\n        height: 1.6rem;\n    }\n']);return f=function(){return n},n}function m(){var n=Object(r.a)(["\n    margin-top: 1rem;\n    width: 100%;\n    position: relative;\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    grid-gap: 1rem;\n"]);return m=function(){return n},n}function h(){var n=Object(r.a)(["\n    margin-top: 1rem;\n    width: 100%;\n    position: relative;\n"]);return h=function(){return n},n}function b(){var n=Object(r.a)(["\n    -webkit-box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.2);\n    -moz-box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.2);\n    box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.2);\n\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    padding: 2rem;\n    font-size: 1.5rem;\n    width: 50%;\n\n    @media (max-width: ",") {\n        padding: 1rem;\n        width: 80%;\n    }\n    @media (max-width: ",") {\n        padding: 1rem;\n        width: 100%;\n    }\n"]);return b=function(){return n},n}function g(){var n=Object(r.a)(["\n    width: 100%;\n    padding: 0.8rem;\n    font-size: 1.4rem;\n    border-radius: 5px;\n    color: white;\n    background: #ff4230;\n"]);return g=function(){return n},n}function y(){var n=Object(r.a)(["\n    width: 100%;\n    padding: 0.8rem;\n    border-radius: 5px;\n    font-size: 1.4rem;\n    background: #fff87d;\n"]);return y=function(){return n},n}var v=a.c.span(y()),w=a.c.span(g()),j=Object(a.c)(i.c)(b(),o.a.md,o.a.sm),O=a.c.div(h()),x=a.c.div(m()),E=Object(a.c)(i.b)(f(),o.b.blue,o.b.blue),k=Object(a.c)(i.a)(p()),T=a.c.label(s()),z=a.c.button(d(),o.b.blue,o.b.darkblue,(function(n){return n.light&&"\n            background: #226aff;\n            :hover {\n                background: #042bfc;\n            }\n        "})),P=a.c.div(l()),C=a.c.option(u()),H=a.c.div(c())},179:function(n,e,t){"use strict";var r=t(0),a=t.n(r),i=t(7),o=t(8),c=t(3);function u(){var n=Object(i.a)(["\n    width: 100%;\n    height: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n"]);return u=function(){return n},n}function l(){var n=Object(i.a)(["\n    display: inline-block;\n    position: relative;\n    width: 64px;\n    height: 64px;\n    z-index: 1000;\n    div {\n        position: absolute;\n        top: 27px;\n        width: 11px;\n        height: 11px;\n        border-radius: 50%;\n        background: ",";\n        animation-timing-function: cubic-bezier(0, 1, 1, 0);\n    }\n    div:nth-child(1) {\n        left: 6px;\n        animation: lds-ellipsis1 0.6s infinite;\n    }\n    div:nth-child(2) {\n        left: 6px;\n        animation: lds-ellipsis2 0.6s infinite;\n    }\n    div:nth-child(3) {\n        left: 26px;\n        animation: lds-ellipsis2 0.6s infinite;\n    }\n    div:nth-child(4) {\n        left: 45px;\n        animation: lds-ellipsis3 0.6s infinite;\n    }\n    @keyframes lds-ellipsis1 {\n        0% {\n            transform: scale(0);\n        }\n        100% {\n            transform: scale(1);\n        }\n    }\n    @keyframes lds-ellipsis3 {\n        0% {\n            transform: scale(1);\n        }\n        100% {\n            transform: scale(0);\n        }\n    }\n    @keyframes lds-ellipsis2 {\n        0% {\n            transform: translate(0, 0);\n        }\n        100% {\n            transform: translate(19px, 0);\n        }\n    }\n"]);return l=function(){return n},n}var d=o.c.div(l(),c.b.blue),s=o.c.div(u());e.a=function(){return a.a.createElement(s,null,a.a.createElement(d,null,a.a.createElement("div",null),a.a.createElement("div",null),a.a.createElement("div",null),a.a.createElement("div",null)))}},538:function(n,e,t){"use strict";function r(n){return function(n){if(Array.isArray(n)){for(var e=0,t=new Array(n.length);e<n.length;e++)t[e]=n[e];return t}}(n)||function(n){if(Symbol.iterator in Object(n)||"[object Arguments]"===Object.prototype.toString.call(n))return Array.from(n)}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function a(n,e){if(null==n)return{};var t,r,a=function(n,e){if(null==n)return{};var t,r,a={},i=Object.keys(n);for(r=0;r<i.length;r++)t=i[r],e.indexOf(t)>=0||(a[t]=n[t]);return a}(n,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);for(r=0;r<i.length;r++)t=i[r],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(a[t]=n[t])}return a}function i(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function o(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?i(t,!0).forEach((function(e){c(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):i(t).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function c(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}Object.defineProperty(e,"__esModule",{value:!0}),e.createReduxHistoryContext=e.goForward=e.goBack=e.go=e.replace=e.push=e.LOCATION_CHANGE=e.CALL_HISTORY_METHOD=e.reachify=void 0;e.reachify=function(n){var e=!1,t=function(){},r={_onTransitionComplete:function(){e=!1,t()},listen:function(e){return n.listen((function(n,t){return e({location:n,action:t})}))},navigate:function(r){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=a.state,o=a.replace,c=void 0!==o&&o;return e||c?n.replace({pathname:r,state:i,key:"".concat(Date.now())}):n.push({pathname:r,state:i,key:"".concat(Date.now())}),e=!0,new Promise((function(n){return t=n}))}};return Object.defineProperty(r,"location",{get:function(){return n.location}}),Object.defineProperty(r,"transitioning",{get:function(){return e}}),r};e.CALL_HISTORY_METHOD="@@router/CALL_HISTORY_METHOD";var u="@@router/LOCATION_CHANGE";e.LOCATION_CHANGE=u;var l=function(n){return function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return{type:"@@router/CALL_HISTORY_METHOD",payload:{method:n,args:t}}}},d=l("push");e.push=d;var s=l("replace");e.replace=s;var p=l("go");e.go=p;var f=l("goBack");e.goBack=f;var m=l("goForward");e.goForward=m;e.createReduxHistoryContext=function(n){var e=n.history,t=n.routerReducerKey,i=void 0===t?"router":t,c=n.oldLocationChangePayload,l=void 0!==c&&c,h=n.reduxTravelling,b=void 0!==h&&h,g=n.showHistoryAction,y=void 0!==g&&g,v=n.selectRouterState,w=void 0===v?null:v;"function"!==typeof w&&(w=function(n){return n[i]});var j=function(n,e){return{type:u,payload:l?o({},n,{action:e}):{location:n,action:e}}},O={location:null,action:null},x=!1;return{routerReducer:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=e.type,r=e.payload;if(t===u){if(l){var i=r||{},c=i.action,d=a(i,["action"]);return o({},n,{location:d,action:c})}var s=r||{},p=s.location,f=s.action;return o({},n,{location:p,action:f})}return n},routerMiddleware:function(){return function(n){return function(t){if("@@router/CALL_HISTORY_METHOD"!==t.type)return n(t);var a=t.payload,i=a.method,o=a.args;return e[i].apply(e,r(o)),y?n(t):void 0}}},createReduxHistory:function(n){b&&function(n){n.subscribe((function(){var t,r,a=w(n.getState()).location,i=e.location;a&&i&&(r=i,(t=a).pathname!==r.pathname||t.search!==r.search||t.hash!==r.hash)&&(x=!0,e.push({pathname:a.pathname,search:a.search,hash:a.hash}))}))}(n);var t=[];n.dispatch(j(e.location,e.action)),e.listen((function(e,r){if(x){x=!1;var a=w(n.getState());t.forEach((function(n){return n(a.location,a.action)}))}else{n.dispatch(j(e,r));var i=w(n.getState());t.forEach((function(n){return n(i.location,i.action)}))}}));var r={createHref:e.createHref,push:function(){return n.dispatch(d.apply(void 0,arguments))},replace:function(){return n.dispatch(s.apply(void 0,arguments))},go:function(){return n.dispatch(p.apply(void 0,arguments))},goBack:function(){return n.dispatch(f.apply(void 0,arguments))},goForward:function(){return n.dispatch(m.apply(void 0,arguments))},listen:function(n){return t.indexOf(n)<0&&t.push(n),function(){t=t.filter((function(e){return e!==n}))}}};return Object.defineProperty(r,"location",{get:function(){return w(n.getState()).location}}),Object.defineProperty(r,"action",{get:function(){return w(n.getState()).action}}),Object.defineProperty(r,"length",{get:function(){return e.length}}),r}}}},681:function(n,e,t){"use strict";t.r(e);var r=t(0),a=t.n(r),i=t(172),o=t(194),c=t(30),u=t(24),l=t(538),d=t(175),s=t(7),p=t(8),f=t(3);function m(){var n=Object(s.a)(["\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    width: 100%;\n"]);return m=function(){return n},n}function h(){var n=Object(s.a)(["\n    width: 100vw;\n    min-height: calc(100vh - ",");\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding-bottom: calc(1 * ",");\n"]);return h=function(){return n},n}var b=p.c.div(h(),f.e,f.e),g=p.c.div(m()),y=t(179),v=t(174),w=t(63),j=o.object().shape({email:o.string().email("Nieprawid\u0142owy email").required("Pole email jest wymagane"),password:o.string().required("Pole has\u0142o jest wymagane"),passwordConfirm:o.string().required("Pole powt\xf3rz has\u0142o jest wymagane").oneOf([o.ref("password"),null],"Has\u0142a musz\u0105 si\u0119 zgadza\u0107"),displayName:o.string().required("Nazwa u\u017cytkownika jest wymagana").min(3,"Nazwa musi mie\u0107 d\u0142ugo\u015b\u0107 minimum 3 znak\xf3w").max(50,"Nazwa mo\u017ce mie\u0107 d\u0142ugo\u015b\u0107 maksymalnie 50 znak\xf3w")}),O={registerRequest:u.f,resetAuthError:u.h,push:l.push};e.default=Object(c.c)((function(n){return{isRegistering:n.auth.isRegistering,error:n.auth.error}}),O)((function(n){return Object(v.a)("M\xf3j Lekarz - Rejestracja"),Object(r.useEffect)((function(){return function(){n.resetAuthError()}}),[]),a.a.createElement(i.d,{initialValues:{email:"",password:"",passwordConfirm:"",displayName:"",accountType:"patient"},validationSchema:j,onSubmit:function(e){console.log(e);var t={email:e.email,displayName:e.displayName,password:e.password,accountType:e.accountType};n.registerRequest(t)},render:function(e){var t=e.values,r=e.setFieldValue;return a.a.createElement(b,null,a.a.createElement(w.a,null,a.a.createElement(g,null,a.a.createElement(d.h,null,(n.isRegistering||n.error)&&a.a.createElement(d.g,null,n.isRegistering&&a.a.createElement(y.a,null),n.error&&a.a.createElement(d.a,null,"Rejestracja nie powiod\u0142a si\u0119.")),a.a.createElement(d.f,null,"Zarejestruj si\u0119"),a.a.createElement(d.d,null,a.a.createElement(d.j,{htmlFor:"accountType"},"Typ konta"),a.a.createElement(d.e,null,a.a.createElement(d.j,{htmlFor:"accountType"},"Jako lekarz"),a.a.createElement(d.c,{name:"accountType",checked:"doctor"===t.accountType,onChange:function(){return r("accountType","doctor")},type:"radio",value:"doctor"}),a.a.createElement(d.j,{htmlFor:"accountType"},"Jako pacjent"),a.a.createElement(d.c,{name:"accountType",checked:"patient"===t.accountType,onChange:function(){return r("accountType","patient")},type:"radio",value:"patient"}))),a.a.createElement(d.d,null,a.a.createElement(d.j,{htmlFor:"email"},"Email"),a.a.createElement(d.c,{name:"email",id:"email",placeholder:"Email",type:"email"}),a.a.createElement(d.b,{name:"email",component:"div"})),a.a.createElement(d.d,null,a.a.createElement(d.j,{htmlFor:"displayName"},"Nazwa u\u017cytkownika"),a.a.createElement(d.c,{name:"displayName",id:"displayName",placeholder:"Nazwa u\u017cytkownika"}),a.a.createElement(d.b,{name:"displayName",component:"div"})),a.a.createElement(d.d,null,a.a.createElement(d.j,{htmlFor:"password"},"Has\u0142o"),a.a.createElement(d.c,{name:"password",id:"password",placeholder:"Has\u0142o",type:"password"}),a.a.createElement(d.b,{name:"password",component:"div"})),a.a.createElement(d.d,null,a.a.createElement(d.j,{htmlFor:"passwordConfirm"},"Powt\xf3rz has\u0142o"),a.a.createElement(d.c,{name:"passwordConfirm",id:"passwordConfirm",placeholder:"Powt\xf3rz has\u0142o",type:"password"}),a.a.createElement(d.b,{name:"passwordConfirm",component:"div"})),a.a.createElement(d.d,null,a.a.createElement(d.l,{type:"submit"},"Zarejestruj si\u0119"))))))}})}))}}]);
//# sourceMappingURL=16.15ba4bb9.chunk.js.map