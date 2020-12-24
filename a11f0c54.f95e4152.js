(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{107:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var r=n(0),o=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=o.a.createContext({}),s=function(e){var t=o.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=s(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},b=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,a=e.parentName,l=u(e,["components","mdxType","originalType","parentName"]),p=s(n),b=r,m=p["".concat(a,".").concat(b)]||p[b]||f[b]||i;return n?o.a.createElement(m,c(c({ref:t},l),{},{components:n})):o.a.createElement(m,c({ref:t},l))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=b;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:r,a[1]=c;for(var l=2;l<i;l++)a[l]=n[l];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},88:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return u})),n.d(t,"default",(function(){return s}));var r=n(3),o=n(7),i=(n(0),n(107)),a={title:"useVideoConfig()",id:"use-video-config"},c={unversionedId:"use-video-config",id:"use-video-config",isDocsHomePage:!1,title:"useVideoConfig()",description:"With this hook, you can retrieve some info about the context of the video that you are making.",source:"@site/docs/use-video-config.md",slug:"/use-video-config",permalink:"/docs/use-video-config",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/use-video-config.md",version:"current",sidebar:"someSidebar",previous:{title:"useCurrentFrame()",permalink:"/docs/use-current-frame"},next:{title:"spring()",permalink:"/docs/spring"}},u=[{value:"See also",id:"see-also",children:[]}],l={toc:u};function s(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"With this hook, you can retrieve some info about the context of the video that you are making.\nNamely, ",Object(i.b)("inlineCode",{parentName:"p"},"useVideoConfig")," will return an object with the following properties:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"width"),": The width of the composition in pixels."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"height"),": The height of the composition in pixels."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"fps"),": The frame rate of the composition in pixels, in frames per seconds."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"durationInFrames")," The duration of the composition in frames.")),Object(i.b)("p",null,"Remember that you control these properties by passing them as props to ",Object(i.b)("inlineCode",{parentName:"p"},"<Composition>"),". Read the page about ",Object(i.b)("a",Object(r.a)({parentName:"p"},{href:"the-fundamentals"}),"the fundamentals")," to learn how to define a composition."),Object(i.b)("h2",{id:"see-also"},"See also"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",Object(r.a)({parentName:"li"},{href:"use-current-frame"}),"useCurrentFrame()"))))}s.isMDXComponent=!0}}]);