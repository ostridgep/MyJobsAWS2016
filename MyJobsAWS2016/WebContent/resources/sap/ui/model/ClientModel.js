/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./ClientContextBinding','./ClientListBinding','./ClientPropertyBinding','./ClientTreeBinding','./Model'],function(q,C,a,b,c,M){"use strict";var d=M.extend("sap.ui.model.ClientModel",{constructor:function(D){M.apply(this,arguments);this.bCache=true;this.aPendingRequestHandles=[];if(typeof D=="string"){this.loadData(D);}},metadata:{publicMethods:["loadData","setData","getData","setProperty","forceNoCache"]}});d.prototype.getData=function(){return this.oData;};d.prototype.createBindingContext=function(p,o,P,f){if(typeof o=="function"){f=o;o=null;}if(typeof P=="function"){f=P;P=null;}var s=this.resolve(p,o),n=(s==undefined)?undefined:this.getContext(s?s:"/");if(!n){n=null;}if(f){f(n);}return n;};d.prototype._ajax=function(p){var t=this;if(this.bDestroyed){return;}function w(f){return function(){var i=q.inArray(r,t.aPendingRequestHandles);if(i>-1){t.aPendingRequestHandles.splice(i,1);}if(!(r&&r.bSuppressErrorHandlerCall)){f.apply(this,arguments);}};}p.success=w(p.success);p.error=w(p.error);var r=q.ajax(p);if(p.async){this.aPendingRequestHandles.push(r);}};d.prototype.destroy=function(){M.prototype.destroy.apply(this,arguments);if(this.aPendingRequestHandles){for(var i=this.aPendingRequestHandles.length-1;i>=0;i--){var r=this.aPendingRequestHandles[i];if(r&&r.abort){r.bSuppressErrorHandlerCall=true;r.abort();}}delete this.aPendingRequestHandles;}};d.prototype.destroyBindingContext=function(o){};d.prototype.bindContext=function(p,o,P){var B=new C(this,p,o,P);return B;};d.prototype.updateBindings=function(f){this.checkUpdate(f);};d.prototype.forceNoCache=function(f){this.bCache=!f;};return d;},true);
