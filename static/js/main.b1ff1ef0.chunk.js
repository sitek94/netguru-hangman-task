(this["webpackJsonphangman-game"]=this["webpackJsonphangman-game"]||[]).push([[0],{27:function(t){t.exports=JSON.parse('{"name":"hangman-game","author":"Maciek Sitkowski","homepage":"https://sitek94.github.io/hangman-game","version":"0.1.0","private":true,"scripts":{"start":"react-scripts start","start:msw":"REACT_APP_ENABLE_MSW=true react-scripts start","build":"react-scripts build && rm build/mockServiceWorker.js","build:local":"PUBLIC_URL=/ npm run build","lint":"eslint --ext ts,tsx src/","lint:fix":"npm run lint -- --fix","test":"react-scripts test","test:ci":"npm run test -- --watchAll=false","test:coverage":"npm run test -- --coverage","eject":"react-scripts eject","format":"prettier --write \\"**/*.{js,jsx,ts,tsx,json,md}\\"","cypress:open":"cypress open","prepare":"husky install"},"dependencies":{"clsx":"^1.1.1","lodash.range":"^3.2.0","react":"^17.0.1","react-dom":"^17.0.1","react-scripts":"4.0.1"},"devDependencies":{"@commitlint/cli":"^13.1.0","@commitlint/config-conventional":"^13.1.0","@testing-library/jest-dom":"^5.14.1","@testing-library/react":"^12.1.0","@testing-library/react-hooks":"^5.0.0","@testing-library/user-event":"^13.2.1","@types/jest":"^27.0.1","@types/lodash.range":"^3.2.6","@types/node":"^16.9.1","@types/react":"^17.0.21","@types/react-dom":"^17.0.9","cypress":"^8.4.0","eslint-plugin-cypress":"^2.12.1","eslint-plugin-simple-import-sort":"^7.0.0","flush-promises":"^1.0.2","gh-pages":"^3.1.0","msw":"^0.35.0","husky":">=6","lint-staged":">=10","prettier":"^2.4.1","pretty-quick":"^3.1.1","sass":"^1.42.1","typescript":"^4.4.3"},"lint-staged":{"*.{js,jsx,ts,tsx,json}":"pretty-quick --staged","*.{js,jsx,ts,tsx}":["eslint --fix","npm run test -- --watchAll=false --findRelatedTests"]},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]},"msw":{"workerDirectory":"./public"}}')},38:function(t,e,r){},39:function(t,e,r){},44:function(t,e,r){},46:function(t,e,r){},47:function(t,e,r){},48:function(t,e,r){},49:function(t,e,r){},50:function(t,e,r){},6:function(t,e,r){"use strict";r.d(e,"d",(function(){return a})),r.d(e,"a",(function(){return o})),r.d(e,"b",(function(){return c})),r.d(e,"c",(function(){return u}));var n=function(t){var e=Object({NODE_ENV:"production",PUBLIC_URL:"/hangman-game",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0})[t];if(!e)throw new Error('Missing ENV variable: "'.concat(t,'"'));return e},s=r(27),a={key:n("REACT_APP_WORDS_API_KEY"),host:n("REACT_APP_WORDS_API_HOST"),url:n("REACT_APP_WORDS_API_URL")},i=n("REACT_APP_MY_PROFILE_URL"),o=!1,c=function(t){var e=n(t);if("true"!==e&&"false"!==e)throw new Error('"'.concat(t,'" ENV variable has to be a boolean'));return Boolean(e)}("REACT_APP_ENABLE_MSW"),l=new URL(s.homepage).pathname,u={name:s.name,repoUrl:i+"/"+s.name,pathname:l}},60:function(t,e,r){"use strict";r.r(e);var n=r(3),s=r.n(n),a=r(10),i=(r(38),r(39),r(5)),o=r.n(i),c=r(33),l=r.n(c),u=r(6),d=r(4),p={start:{title:"Netguru Hangman",description:"This is a simple Hangman game, have fun and good luck!",button:"Start game",word:"HANGMAN",missedLetters:["B","D","E","Z","P","U","K","L","Q","W"],guessedLetters:["H","A"]},gameWon:{title:"You won!",description:function(t){return"Congratulations, you missed ".concat(t," letters.")},button:"Play again"},gameLost:{title:"Game over",description:"",button:"Try again"},loading:{title:"Loading..."},error:{title:"Oops",description:"Something went wrong, try refreshing the page."}};function m(){return h.apply(this,arguments)}function h(){return(h=Object(a.a)(s.a.mark((function t(){var e,r,n,a;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=new URLSearchParams({random:"true",limit:"1",lettersMax:String(10)}),t.next=3,fetch(u.d.url+"/?"+e,{method:"GET",headers:{"x-rapidapi-key":u.d.key,"x-rapidapi-host":u.d.host}});case 3:return r=t.sent,t.next=6,r.json();case 6:if(n=t.sent,"string"!==typeof(a=n.word)){t.next=10;break}return t.abrupt("return",a);case 10:throw new Error('\u2620\ufe0f There something\'s wrong with the "word"');case 11:case"end":return t.stop()}}),t)})))).apply(this,arguments)}r(44);var j=r(2),f=["head","neck","corpus","arm arm--right","arm arm--left","hand hand--right","hand hand--left","leg leg--right","leg leg--left","foot foot--right","foot foot--left"];function b(t){var e=t.children;return Object(j.jsxs)("div",{className:"folk-container",children:[Object(j.jsx)("div",{className:"bar bar--horizontal"}),Object(j.jsx)("div",{className:"bar bar--vertical"}),e]})}var v=function(t){var e=t.visiblePartsCount,r=f.slice(0,e);return Object(j.jsx)(b,{children:Object(j.jsx)("div",{className:"folk","data-testid":"folk",children:r.map((function(t){return Object(j.jsx)("div",{className:t},t)}))})})};r(46);var g=function(t){var e=t.children;return Object(j.jsx)("div",{"data-testid":"layout",className:"layout",children:Object(j.jsx)("div",{className:"container",children:e})})},x=(r(47),r(48),r(34));var O=function(t){var e=t.inactive,r=t.children;return Object(j.jsx)("div",{"aria-label":e?"Inactive letter tile":"Active letter tile","data-testid":"letter-tile",className:Object(x.a)("letter-tile",e&&"inactive"),children:r})};var w=function(t){var e=t.word,r=t.guessedLetters,n=e.padStart(11).split("");return Object(j.jsx)("div",{className:"letter-tiles","data-testid":"letter-tiles",children:n.map((function(t,e){return Object(j.jsx)(O,{inactive:" "===t,children:r.includes(t)||"-"===t?t:null},e)}))})};r(49);var k=function(t){var e=t.title,r=t.description,n=t.buttonText,s=t.onButtonClick,a=t.noButton;return Object(j.jsxs)("div",{className:"modal",children:[Object(j.jsx)("h1",{className:"title",children:e}),r&&Object(j.jsx)("p",{className:"description",children:r}),!a&&Object(j.jsx)("button",{className:"button",onClick:s,children:n})]})};r(50);var y=function(t){var e=t.missedLetters;return Object(j.jsxs)("div",{className:"you-missed",children:[Object(j.jsx)("div",{className:"title",children:"You missed:"}),Object(j.jsx)("div",{"data-testid":"missed-letters",className:"missed-letters",children:e.join(" ")})]})};var _=function(){var t=i.useState(!0),e=Object(d.a)(t,2),r=e[0],n=e[1],o=i.useState([]),c=Object(d.a)(o,2),l=c[0],u=c[1],h=function(){var t=i.useState(""),e=Object(d.a)(t,2),r=e[0],n=e[1],o=i.useState("idle"),c=Object(d.a)(o,2),l=c[0],u=c[1],p=i.useCallback(Object(a.a)(s.a.mark((function t(){var e;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return u("pending"),t.prev=1,t.next=4,m();case 4:e=t.sent,u("resolved"),n(e.toUpperCase()),t.next=13;break;case 9:t.prev=9,t.t0=t.catch(1),u("rejected"),console.error(t.t0);case 13:case"end":return t.stop()}}),t,null,[[1,9]])}))),[]);return i.useEffect((function(){p()}),[p]),{status:l,fetchRandomWord:p,randomWord:r,isIdle:"idle"===l,isPending:"pending"===l,isResolved:"resolved"===l,isRejected:"rejected"===l}}(),f=h.randomWord,b=h.fetchRandomWord,x=h.isPending,O=h.isResolved,_=h.isRejected,E=l.filter((function(t){return!f.includes(t)})),P=l.filter((function(t){return f.includes(t)})),S=11===E.length,L=f.split("").every((function(t){return P.includes(t)}));i.useEffect((function(){var t=function(t){var e=t.key;/^[a-z]$/i.test(e)&&(l.includes(e.toUpperCase())||r||L||S||x||_||u(l.concat(e.toUpperCase())))};return window.addEventListener("keydown",t),function(){window.removeEventListener("keydown",t)}}),[l,r,L,S,x,_]);var N=function(){u([]),b()};return r?Object(j.jsxs)(g,{children:[Object(j.jsx)(k,{title:p.start.title,description:p.start.description,buttonText:p.start.button,onButtonClick:function(){n(!1)}}),Object(j.jsx)(v,{visiblePartsCount:11}),Object(j.jsx)(y,{missedLetters:p.start.missedLetters}),Object(j.jsx)(w,{word:p.start.word,guessedLetters:p.start.guessedLetters})]}):Object(j.jsxs)(g,{children:[x&&Object(j.jsx)(k,{title:p.loading.title,noButton:!0}),_&&Object(j.jsx)(k,{title:p.error.title,description:p.error.description,noButton:!0}),O&&S&&Object(j.jsx)(k,{title:p.gameLost.title,buttonText:p.gameLost.button,onButtonClick:N}),O&&L&&Object(j.jsx)(k,{title:p.gameWon.title,buttonText:p.gameWon.button,description:p.gameWon.description(E.length),onButtonClick:N}),Object(j.jsx)(v,{visiblePartsCount:E.length}),Object(j.jsx)(y,{missedLetters:E}),Object(j.jsx)(w,{word:f,guessedLetters:P})]})};function E(){return(E=Object(a.a)(s.a.mark((function t(){var e,n;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!u.a||!u.b){t.next=7;break}if(window.location.pathname!==u.c.pathname){t.next=4;break}return window.location.pathname=u.c.pathname+"/",t.abrupt("return");case 4:return e=r(61),n=e.worker,t.next=7,n.start({quiet:!0,serviceWorker:{url:u.c.pathname+"/mockServiceWorker.js"}});case 7:l.a.render(Object(j.jsx)(o.a.StrictMode,{children:Object(j.jsx)(_,{})}),document.getElementById("root"));case 8:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(){E.apply(this,arguments)}()},61:function(t,e,r){"use strict";r.r(e),r.d(e,"worker",(function(){return l}));var n=r(13),s=r(6),a=r(7),i=0,o=["lotr","ale","pozdro","aaaa","hello","primary","secondary"],c=[a.c.get(s.d.url,(function(t,e,r){if(t.url.searchParams.get("random")){var n=o[i++%o.length];return e(r.json({word:n}))}return e(r.status(400),r.json({message:"Invalid request"}))}))],l=r(31).a.apply(void 0,Object(n.a)(c))}},[[60,1,2]]]);
//# sourceMappingURL=main.b1ff1ef0.chunk.js.map