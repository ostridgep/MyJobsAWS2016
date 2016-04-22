/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/Device'],function(q,D){"use strict";q.sap.domById=function domById(i,w){return i?(w||window).document.getElementById(i):null;};q.sap.byId=function byId(i,C){var e="";if(i){e="#"+i.replace(/(:|\.)/g,'\\$1');}return q(e,C);};q.sap.focus=function focus(d){if(!d){return;}try{d.focus();}catch(e){var i=(d&&d.id)?" (ID: '"+d.id+"')":"";q.sap.log.warning("Error when trying to focus a DOM element"+i+": "+e.message);return false;}return true;};q.fn.cursorPos=function cursorPos(P){var l=arguments.length,t,L,T,s;T=this.prop("tagName");s=this.prop("type");if(this.length===1&&((T=="INPUT"&&(s=="text"||s=="password"||s=="search"))||T=="TEXTAREA")){var d=this.get(0);if(l>0){if(typeof(d.selectionStart)=="number"){d.focus();d.selectionStart=P;d.selectionEnd=P;}else if(d.createTextRange){t=d.createTextRange();var m=d.value.length;if(P<0||P>m){P=m;}if(t){t.collapse();t.moveEnd("character",P);t.moveStart("character",P);t.select();}}return this;}else{if(typeof(d.selectionStart)=="number"){return d.selectionStart;}else if(d.createTextRange){t=window.document.selection.createRange();var C=t.duplicate();if(d.tagName=="TEXTAREA"){C.moveToElementText(d);var o=C.duplicate();L=C.text.length;o.moveStart("character",L);var S=0;if(o.inRange(t)){S=L;}else{var i=L;while(L>1){i=Math.round(L/2);S=S+i;o=C.duplicate();o.moveStart("character",S);if(o.inRange(t)){L=L-i;}else{S=S-i;L=i;}}}return S;}else if(C.parentElement()===d){C.collapse();var L=d.value.length;C.moveStart('character',-L);return C.text.length;}}return-1;}}else{return this;}};q.fn.selectText=function selectText(s,E){var d=this.get(0);try{if(typeof(d.selectionStart)==="number"){d.setSelectionRange(s,E);}else if(d.createTextRange){var t=d.createTextRange();t.collapse();t.moveStart('character',s);t.moveEnd('character',E-s);t.select();}}catch(e){}return this;};q.fn.getSelectedText=function(){var d=this.get(0);try{if(typeof d.selectionStart==="number"){return d.value.substring(d.selectionStart,d.selectionEnd);}if(document.selection){return document.selection.createRange().text;}}catch(e){}return"";};q.fn.outerHTML=function outerHTML(){var d=this.get(0);if(d&&d.outerHTML){return q.trim(d.outerHTML);}else{var e=this[0]?this[0].ownerDocument:document;var o=e.createElement("div");o.appendChild(d.cloneNode(true));return o.innerHTML;}};q.sap.containsOrEquals=function containsOrEquals(d,o){if(o&&d&&o!=document&&o!=window){return(d===o)||q.contains(d,o);}return false;};q.fn.rect=function rect(){var d=this.get(0);if(d){if(d.getBoundingClientRect){var C=d.getBoundingClientRect();var r={top:C.top,left:C.left,width:C.right-C.left,height:C.bottom-C.top};var w=q.sap.ownerWindow(d);r.left+=q(w).scrollLeft();r.top+=q(w).scrollTop();return r;}else{return{top:10,left:10,width:d.offsetWidth,height:d.offsetWidth};}}return null;};q.fn.rectContains=function rectContains(P,i){var r=this.rect();if(r){return P>=r.left&&P<=r.left+r.width&&i>=r.top&&i<=r.top+r.height;}return false;};q.fn.hasTabIndex=function hasTabIndex(){var t=this.prop("tabIndex");if(this.attr("disabled")&&!this.attr("tabindex")){t=-1;}return!isNaN(t)&&t>=0;};q.fn.firstFocusableDomRef=function firstFocusableDomRef(){var C=this.get(0);var d=function(i){return q(this).css("visibility")=="hidden";};if(!C||q(C).is(':hidden')||q(C).filter(d).length==1){return null;}var o=C.firstChild,e=null;while(o){if(o.nodeType==1&&q(o).is(':visible')){if(q(o).hasTabIndex()){return o;}if(o.childNodes){e=q(o).firstFocusableDomRef();if(e){return e;}}}o=o.nextSibling;}return null;};q.fn.lastFocusableDomRef=function lastFocusableDomRef(){var C=this.get(0);var d=function(i){return q(this).css("visibility")=="hidden";};if(!C||q(C).is(':hidden')||q(C).filter(d).length==1){return null;}var o=C.lastChild,e=null;while(o){if(o.nodeType==1&&q(o).is(':visible')){if(o.childNodes){e=q(o).lastFocusableDomRef();if(e){return e;}}if(q(o).hasTabIndex()){return o;}}o=o.previousSibling;}return null;};q.fn.scrollLeftRTL=function scrollLeftRTL(P){var d=this.get(0);if(d){if(P===undefined){if(!!D.browser.internet_explorer||!!D.browser.edge){return d.scrollWidth-d.scrollLeft-d.clientWidth;}else if(!!D.browser.webkit){return d.scrollLeft;}else if(!!D.browser.firefox){return d.scrollWidth+d.scrollLeft-d.clientWidth;}else{return d.scrollLeft;}}else{d.scrollLeft=q.sap.denormalizeScrollLeftRTL(P,d);return this;}}};q.fn.scrollRightRTL=function scrollRightRTL(){var d=this.get(0);if(d){if(!!D.browser.internet_explorer){return d.scrollLeft;}else if(!!D.browser.webkit){return d.scrollWidth-d.scrollLeft-d.clientWidth;}else if(!!D.browser.firefox){return(-d.scrollLeft);}else{return d.scrollLeft;}}};q.sap.denormalizeScrollLeftRTL=function(n,d){if(d){if(!!D.browser.internet_explorer){return d.scrollWidth-d.clientWidth-n;}else if(!!D.browser.webkit){return n;}else if(!!D.browser.firefox){return d.clientWidth+n-d.scrollWidth;}else{return n;}}};q.sap.denormalizeScrollBeginRTL=function(n,d){if(d){if(!!D.browser.internet_explorer){return n;}else if(!!D.browser.webkit){return d.scrollWidth-d.clientWidth-n;}else if(!!D.browser.firefox){return-n;}else{return n;}}};
/*
	 * The following methods are taken from jQuery UI core but modified.
	 *
	 * jQuery UI Core
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/category/ui-core/
	 */
q.support.selectstart="onselectstart"in document.createElement("div");q.fn.extend({disableSelection:function(){return this.on((q.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault();});},enableSelection:function(){return this.off(".ui-disableSelection");}});
/*!
	 * The following functions are taken from jQuery UI 1.8.17 but modified
	 *
	 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 * http://jquery.org/license
	 *
	 * http://docs.jquery.com/UI
	 */
function v(e){var o=q(e).offsetParent();var O=false;var $=q(e).parents().filter(function(){if(this===o){O=true;}return O;});return!q(e).add($).filter(function(){return q.css(this,"visibility")==="hidden"||q.expr.filters.hidden(this);}).length;}function f(e,i){var n=e.nodeName.toLowerCase();if(n==="area"){var m=e.parentNode,d=m.name,h;if(!e.href||!d||m.nodeName.toLowerCase()!=="map"){return false;}h=q("img[usemap=#"+d+"]")[0];return!!h&&v(h);}return(/input|select|textarea|button|object/.test(n)?!e.disabled:n=="a"?e.href||i:i)&&v(e);}if(!q.expr[":"].focusable){
/*!
		 * The following function is taken from jQuery UI 1.8.17
		 *
		 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
		 * Dual licensed under the MIT or GPL Version 2 licenses.
		 * http://jquery.org/license
		 *
		 * http://docs.jquery.com/UI
		 *
		 * But since visible is modified, focusable is different too the jQuery UI version too.
		 */
q.extend(q.expr[":"],{focusable:function(e){return f(e,!isNaN(q.attr(e,"tabindex")));}});}if(!q.expr[":"].sapTabbable){
/*!
		 * The following function is taken from
		 * jQuery UI Core 1.11.1
		 * http://jqueryui.com
		 *
		 * Copyright 2014 jQuery Foundation and other contributors
		 * Released under the MIT license.
		 * http://jquery.org/license
		 *
		 * http://api.jqueryui.com/category/ui-core/
		 */
q.extend(q.expr[":"],{sapTabbable:function(e){var t=q.attr(e,"tabindex"),i=isNaN(t);return(i||t>=0)&&f(e,!i);}});}if(!q.expr[":"].sapFocusable){q.extend(q.expr[":"],{sapFocusable:function(e){return f(e,!isNaN(q.attr(e,"tabindex")));}});}if(!q.fn.zIndex){q.fn.zIndex=function(z){if(z!==undefined){return this.css("zIndex",z);}if(this.length){var e=q(this[0]),d,h;while(e.length&&e[0]!==document){d=e.css("position");if(d==="absolute"||d==="relative"||d==="fixed"){h=parseInt(e.css("zIndex"),10);if(!isNaN(h)&&h!==0){return h;}}e=e.parent();}}return 0;};}q.fn.parentByAttribute=function parentByAttribute(A,V){if(this.length>0){if(V){return this.first().parents("["+A+"='"+V+"']").get(0);}else{return this.first().parents("["+A+"]").get(0);}}};q.sap.ownerWindow=function ownerWindow(d){if(d.ownerDocument.parentWindow){return d.ownerDocument.parentWindow;}return d.ownerDocument.defaultView;};var _={};q.sap.scrollbarSize=function(C,F){if(typeof C==="boolean"){F=C;C=null;}var k=C||"#DEFAULT";if(F){if(C){delete _[C];}else{_={};}}if(_[k]){return _[k];}if(!document.body){return{width:0,height:0};}var A=q("<DIV/>").css("visibility","hidden").css("height","0").css("width","0").css("overflow","hidden");if(C){A.addClass(C);}A.prependTo(document.body);var d=q("<div style=\"visibility:visible;position:absolute;height:100px;width:100px;overflow:scroll;opacity:0;\"></div>");A.append(d);var o=d.get(0);var w=o.offsetWidth-o.scrollWidth;var h=o.offsetHeight-o.scrollHeight;A.remove();if(w===0||h===0){return{width:w,height:h};}_[k]={width:w,height:h};return _[k];};var a;function g(){return a||(a=sap.ui.require('sap/ui/core/Control'));}q.sap.syncStyleClass=function(s,S,d){if(!s){return d;}var C=g();if(C&&S instanceof C){S=S.$();}else if(typeof S==="string"){S=q.sap.byId(S);}else if(!(S instanceof q)){return d;}var e=!!S.closest("."+s).length;if(d instanceof q){d.toggleClass(s,e);}else if(C&&d instanceof C){d.toggleStyleClass(s,e);}else{}return d;};function b(A,V){var s=this.attr(A);if(!s){return this.attr(A,V);}var d=s.split(" ");if(d.indexOf(V)==-1){d.push(V);this.attr(A,d.join(" "));}return this;}function c(A,V){var s=this.attr(A)||"",d=s.split(" "),i=d.indexOf(V);if(i==-1){return this;}d.splice(i,1);if(d.length){this.attr(A,d.join(" "));}else{this.removeAttr(A);}return this;}q.fn.addAriaLabelledBy=function(i){return b.call(this,"aria-labelledby",i);};q.fn.removeAriaLabelledBy=function(i){return c.call(this,"aria-labelledby",i);};q.fn.addAriaDescribedBy=function(i){return b.call(this,"aria-describedby",i);};q.fn.removeAriaDescribedBy=function(i){return c.call(this,"aria-describedby",i);};function p(o,n){if(o.childElementCount!=n.childElementCount||o.tagName!=n.tagName){o.parentNode.replaceChild(n,o);return false;}if(o.isEqualNode(n)){return true;}var O=o.attributes;for(var i=0,d=O.length;i<d;i++){var A=O[i].name;if(n.getAttribute(A)===null){o.removeAttribute(A);d=d-1;i=i-1;}}var N=n.attributes;for(var i=0,d=N.length;i<d;i++){var A=N[i].name,e=o.getAttribute(A),h=n.getAttribute(A);if(e===null||e!==h){o.setAttribute(A,h);}}var j=n.childNodes.length;if(!j&&!o.hasChildNodes()){return true;}if(!n.childElementCount){if(!j){o.textContent="";}else if(j==1&&n.firstChild.nodeType==3){o.textContent=n.textContent;}else{o.innerHTML=n.innerHTML;}return true;}for(var i=0,r=0,d=j;i<d;i++){var k=o.childNodes[i],l=n.childNodes[i-r];if(l.nodeType==1){if(!p(k,l)){r=r+1;}}else{k.nodeValue=l.nodeValue;}}return true;}q.sap.replaceDOM=function(o,n,C){var N;if(typeof n==="string"){N=q.parseHTML(n)[0];}else{N=n;}if(C){q.cleanData([o]);q.cleanData(o.getElementsByTagName("*"));}return p(o,N);};return q;});
