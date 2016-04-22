/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Core","sap/ui/core/library","sap/m/library","sap/ui/layout/library"],function(q,C,l){"use strict";sap.ui.getCore().initLibrary({name:"sap.uxap",dependencies:["sap.ui.core","sap.m","sap.ui.layout"],types:["sap.uxap.BlockBaseColumnLayout","sap.uxap.ObjectPageConfigurationMode","sap.uxap.ObjectPageHeaderDesign","sap.uxap.ObjectPageHeaderPictureShape","sap.uxap.ObjectPageSubSectionLayout","sap.uxap.ObjectPageSubSectionMode"],interfaces:[],controls:["sap.uxap.AnchorBar","sap.uxap.BlockBase","sap.uxap.BreadCrumbs","sap.uxap.HierarchicalSelect","sap.uxap.ObjectPageHeader","sap.uxap.ObjectPageHeaderActionButton","sap.uxap.ObjectPageHeaderContent","sap.uxap.ObjectPageLayout","sap.uxap.ObjectPageSection","sap.uxap.ObjectPageSectionBase","sap.uxap.ObjectPageSubSection"],elements:["sap.uxap.ModelMapping","sap.uxap.ObjectPageHeaderLayoutData"],version:"1.36.7"});sap.uxap.BlockBaseColumnLayout=sap.ui.base.DataType.createType('sap.uxap.BlockBaseColumnLayout',{isValid:function(v){return/^(auto|[1-4]{1})$/.test(v);}},sap.ui.base.DataType.getType('string'));sap.uxap.BlockBaseFormAdjustment={BlockColumns:"BlockColumns",OneColumn:"OneColumn",None:"None"};sap.uxap.ObjectPageConfigurationMode={JsonURL:"JsonURL",JsonModel:"JsonModel"};sap.uxap.ObjectPageHeaderDesign={Light:"Light",Dark:"Dark"};sap.uxap.ObjectPageHeaderPictureShape={Circle:"Circle",Square:"Square"};sap.uxap.ObjectPageSubSectionLayout={TitleOnTop:"TitleOnTop",TitleOnLeft:"TitleOnLeft"};sap.uxap.ObjectPageSubSectionMode={Collapsed:"Collapsed",Expanded:"Expanded"};sap.uxap.Importance={Low:"Low",Medium:"Medium",High:"High"};sap.uxap.i18nModel=(function(){return new sap.ui.model.resource.ResourceModel({bundleUrl:q.sap.getModulePath("sap.uxap.i18n.i18n",".properties")});}());sap.uxap.Utilities={getClosestOPL:function(c){while(c&&c.getMetadata().getName()!=="sap.uxap.ObjectPageLayout"){c=c.getParent();}return c;},isPhoneScenario:function(){if(sap.ui.Device.system.phone){return true;}return sap.uxap.Utilities._isCurrentMediaSize("Phone");},isTabletScenario:function(){if(sap.ui.Device.system.tablet){return true;}return sap.uxap.Utilities._isCurrentMediaSize("Tablet");},_isCurrentMediaSize:function(m){if(sap.ui.Device.media.hasRangeSet(sap.ui.Device.media.RANGESETS.SAP_STANDARD_EXTENDED)){var r=sap.ui.Device.media.getCurrentRange(sap.ui.Device.media.RANGESETS.SAP_STANDARD_EXTENDED);if(r&&r.name===m){return true;}}return q("html").hasClass("sapUiMedia-Std-"+m);}};return sap.uxap;},true);
