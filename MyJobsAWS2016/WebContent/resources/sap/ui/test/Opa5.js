/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Opa','./OpaPlugin','./PageObjectFactory','sap/ui/qunit/QUnitUtils','sap/ui/base/Object','sap/ui/Device','./launchers/iFrameLauncher','./launchers/componentLauncher','sap/ui/core/routing/HashChanger','./matchers/Matcher','./matchers/AggregationFilled','./matchers/PropertyStrictEquals','./pipelines/MatcherPipeline','./pipelines/ActionPipeline'],function($,O,a,P,U,b,D,f,c,H,M,A,d,e,g){"use strict";var p=new a(),m=new e(),o=new g(),F="OpaFrame",C=false;var h=b.extend("sap.ui.test.Opa5",jQuery.extend({},O.prototype,{constructor:function(){O.apply(this,arguments);}}));function s(S,T){this.waitFor({viewName:null,controlType:null,id:null,searchOpenDialogs:false,success:function(){i(S);}});return this.waitFor({viewName:null,controlType:null,id:null,searchOpenDialogs:false,check:f.hasLaunched,timeout:T||80,errorMessage:"unable to load the iframe with the url: "+S});}h.prototype.iStartMyUIComponent=function iStartMyUIComponent(j){j=j||{};this.waitFor({viewName:null,controlType:null,id:null,searchOpenDialogs:false,success:function(){var l=jQuery.sap.getModulePath("sap.ui.test.OpaCss",".css");jQuery.sap.includeStyleSheet(l);H.getInstance().setHash(j.hash||"");c.start(j.componentConfig).then(function(){C=true;});}});var k={viewName:null,controlType:null,id:null,searchOpenDialogs:false,check:function(){return C;},errorMessage:"Unable to load the component with the name: "+j.name};if(j.timeout){k.timeout=j.timeout;}return this.waitFor(k);};h.prototype.iTeardownMyUIComponent=function iTeardownMyUIComponent(){return this.waitFor({success:function(){c.teardown();C=false;}});};h.iStartMyAppInAFrame=s;h.prototype.iStartMyAppInAFrame=s;function t(){return this.waitFor({success:function(){f.teardown();}});}h.iTeardownMyAppFrame=t;h.prototype.iTeardownMyAppFrame=t;h.prototype.waitFor=function(j){var v=j.actions;j=$.extend({},O.config,j);var k=j.check,l=null,n=j.success,r;j.check=function(){if(!this._modifyControlType(j)){return false;}var q=$.extend({},j,{interactable:!!v});l=h.getPlugin().getMatchingControls(q);if((j.viewName||j.searchOpenDialogs)&&!j.id&&!l||(l&&l.length===0)){jQuery.sap.log.debug("found no controls in view: "+j.viewName+" with controlType "+j.sOriginalControlType,"","Opa");return false;}if(typeof j.id==="string"&&!l){jQuery.sap.log.debug("found no control with the id "+j.id,"","Opa");return false;}if(j.id instanceof RegExp&&!l.length){jQuery.sap.log.debug("found no control with the id regex"+j.id);return false;}if($.isArray(j.id)&&(!l||l.length!==j.id.length)){if(l&&l.length){jQuery.sap.log.debug("found not all controls with the ids "+j.id+" onlyFound the controls: "+l.map(function(u){return u.sId;}));}else{jQuery.sap.log.debug("found no control with the id  "+j.id);}return false;}if(j.sOriginalControlType&&!l.length){jQuery.sap.log.debug("found no controls with the type  "+j.sOriginalControlType,"","Opa");return false;}if(l&&j.matchers){r=m.process({matchers:j.matchers,control:l});if(!r){return false;}}else{r=l;}if(k){return this._executeCheck(k,r);}return true;};j.success=function(){if(v&&r){o.process({actions:v,control:r});}if(n){n.call(this,r);}};return O.prototype.waitFor.call(this,j);};h.getPlugin=function(){return f.getPlugin()||p;};h.getJQuery=function(){return f.getJQuery();};h.getWindow=function(){return f.getWindow();};h.getUtils=function(){return f.getUtils();};h.getHashChanger=function(){return f.getHashChanger();};h.extendConfig=O.extendConfig;h.resetConfig=function(){O.resetConfig();O.extendConfig({viewNamespace:"",arrangements:new h(),actions:new h(),assertions:new h(),visible:true,_stackDropCount:1});};h.emptyQueue=O.emptyQueue;h.getContext=O.getContext;h.matchers={};h.matchers.Matcher=M;h.matchers.AggregationFilled=A;h.matchers.PropertyStrictEquals=d;h.createPageObjects=function(j){return P.create(j,h);};h.prototype._modifyControlType=function(j){var v=j.controlType;if(typeof v!=="string"){return true;}j.sOriginalControlType=v;var w=f.getWindow()||window;if(w.sap.ui.lazyRequire&&w.sap.ui.lazyRequire._isStub&&w.sap.ui.lazyRequire._isStub(v)){jQuery.sap.log.debug("The control type "+v+" is currently a lazy stub. Skipped check and will wait until it is invoked",this);return false;}var k=w.jQuery.sap.getObject(v);if(!k){jQuery.sap.log.debug("The control type "+v+" is undefined. Skipped check and will wait until it is required",this);return false;}if(k._sapUiLazyLoader){jQuery.sap.log.debug("The control type "+v+" is currently a lazy stub. Skipped check and will wait until it is invoked",this);return false;}j.controlType=k;return true;};h.prototype._executeCheck=function(j,v){jQuery.sap.log.debug("Opa is executing the check: "+j);var r=j.call(this,v);jQuery.sap.log.debug("Opa check was "+r);return r;};h.resetConfig();function i(S){var I=jQuery.sap.getModulePath("sap.ui.test.OpaCss",".css");jQuery.sap.includeStyleSheet(I);return f.launch({frameId:F,source:S});}$(function(){if($("#"+F).length){i();}$("body").addClass("sapUiBody");$("html").height("100%");});return h;},true);
