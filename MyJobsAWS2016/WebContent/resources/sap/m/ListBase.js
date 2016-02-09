/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./GroupHeaderListItem','./library','sap/ui/core/Control','sap/ui/core/delegate/ItemNavigation','sap/ui/core/theming/Parameters'],function(q,G,l,C,I,P){"use strict";var L=C.extend("sap.m.ListBase",{metadata:{library:"sap.m",properties:{inset:{type:"boolean",group:"Appearance",defaultValue:false},headerText:{type:"string",group:"Misc",defaultValue:null},headerDesign:{type:"sap.m.ListHeaderDesign",group:"Appearance",defaultValue:sap.m.ListHeaderDesign.Standard,deprecated:true},footerText:{type:"string",group:"Misc",defaultValue:null},mode:{type:"sap.m.ListMode",group:"Behavior",defaultValue:sap.m.ListMode.None},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},includeItemInSelection:{type:"boolean",group:"Behavior",defaultValue:false},showUnread:{type:"boolean",group:"Misc",defaultValue:false},noDataText:{type:"string",group:"Misc",defaultValue:null},showNoData:{type:"boolean",group:"Misc",defaultValue:true},enableBusyIndicator:{type:"boolean",group:"Behavior",defaultValue:true},modeAnimationOn:{type:"boolean",group:"Misc",defaultValue:true},showSeparators:{type:"sap.m.ListSeparators",group:"Appearance",defaultValue:sap.m.ListSeparators.All},swipeDirection:{type:"sap.m.SwipeDirection",group:"Misc",defaultValue:sap.m.SwipeDirection.Both},growing:{type:"boolean",group:"Behavior",defaultValue:false},growingThreshold:{type:"int",group:"Misc",defaultValue:20},growingTriggerText:{type:"string",group:"Appearance",defaultValue:null},growingScrollToLoad:{type:"boolean",group:"Behavior",defaultValue:false},rememberSelections:{type:"boolean",group:"Behavior",defaultValue:true}},defaultAggregation:"items",aggregations:{items:{type:"sap.m.ListItemBase",multiple:true,singularName:"item",bindable:"bindable"},swipeContent:{type:"sap.ui.core.Control",multiple:false},headerToolbar:{type:"sap.m.Toolbar",multiple:false},infoToolbar:{type:"sap.m.Toolbar",multiple:false}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{select:{deprecated:true,parameters:{listItem:{type:"sap.m.ListItemBase"}}},selectionChange:{parameters:{listItem:{type:"sap.m.ListItemBase"},listItems:{type:"sap.m.ListItemBase[]"},selected:{type:"boolean"}}},"delete":{parameters:{listItem:{type:"sap.m.ListItemBase"}}},swipe:{allowPreventDefault:true,parameters:{listItem:{type:"sap.m.ListItemBase"},swipeContent:{type:"sap.ui.core.Control"},srcControl:{type:"sap.ui.core.Control"}}},growingStarted:{deprecated:true,parameters:{actual:{type:"int"},total:{type:"int"}}},growingFinished:{deprecated:true,parameters:{actual:{type:"int"},total:{type:"int"}}},updateStarted:{parameters:{reason:{type:"string"},actual:{type:"int"},total:{type:"int"}}},updateFinished:{parameters:{reason:{type:"string"},actual:{type:"int"},total:{type:"int"}}},itemPress:{parameters:{listItem:{type:"sap.m.ListItemBase"},srcControl:{type:"sap.ui.core.Control"}}}}}});L.prototype.sNavItemClass="sapMLIB";L.prototype.init=function(){this._oGrowingDelegate=null;this._bSelectionMode=false;this._bReceivingData=false;this._oSelectedItem=null;this._aSelectedPaths=[];this._aNavSections=[];this._bUpdating=false;this._bRendering=false;this.data("sap-ui-fastnavgroup","true",true);};L.prototype.onBeforeRendering=function(){this._bRendering=true;this._aNavSections=[];this._removeSwipeContent();};L.prototype.onAfterRendering=function(){this._bRendering=false;this._sLastMode=this.getMode();this._bItemNavigationInvalidated=true;if(!this._oGrowingDelegate&&this.isBound("items")){this._updateFinished();}};L.prototype.exit=function(){this._oSelectedItem=null;this._bReceivingData=false;this._aNavSections.length=0;this._aSelectedPaths.length=0;this._destroyGrowingDelegate();this._destroyItemNavigation();};L.prototype.refreshItems=function(r){this._showBusyIndicator();if(this._oGrowingDelegate){this._oGrowingDelegate.refreshItems(r);}else{if(!this._bReceivingData){this._updateStarted(r);this._bReceivingData=true;}this.refreshAggregation("items");}};L.prototype.updateItems=function(r){if(this._oGrowingDelegate){this._oGrowingDelegate.updateItems(r);}else{if(this._bReceivingData){this._bReceivingData=false;}else{this._updateStarted(r);}this.updateAggregation("items");}};L.prototype.setBindingContext=function(){this._resetItemsBinding();return C.prototype.setBindingContext.apply(this,arguments);};L.prototype._bindAggregation=function(n){n=="items"&&this._resetItemsBinding();return this._applyAggregation("_bind",arguments);};L.prototype.addAggregation=function(a,o){a=="items"&&this._applySettingsToItem(o);this._applyAggregation("add",arguments);a=="items"&&this._applySelectionToItem(o);return this;};L.prototype.insertAggregation=function(a,o){a=="items"&&this._applySettingsToItem(o);this._applyAggregation("insert",arguments);a=="items"&&this._applySelectionToItem(o);return this;};L.prototype.destroyAggregation=function(a){a=="items"&&(this._oSelectedItem=null);return this._applyAggregation("destroy",arguments);};L.prototype.removeAggregation=function(a){var o=this._applyAggregation("remove",arguments);if(a=="items"&&o&&o===this._oSelectedItem){this._oSelectedItem=null;}return o;};L.prototype.removeAllAggregation=function(a){a=="items"&&(this._oSelectedItem=null);return this._applyAggregation("removeAll",arguments);};L.prototype.getId=function(s){var i=this.sId;return s?i+"-"+s:i;};L.prototype.setGrowing=function(g){g=!!g;if(this.getGrowing()!=g){this.setProperty("growing",g,!g);if(g){q.sap.require("sap.m.GrowingEnablement");this._oGrowingDelegate=new sap.m.GrowingEnablement(this);}else if(this._oGrowingDelegate){this._oGrowingDelegate.destroy();this._oGrowingDelegate=null;}}return this;};L.prototype.setGrowingThreshold=function(t){this.setProperty("growingThreshold",t,true);this._oItemNavigation&&this._oItemNavigation.setPageSize(this.getGrowingThreshold());return this;};L.prototype.setGrowingTriggerText=function(t){this.setProperty("growingTriggerText",t,true);if(this._oGrowingDelegate){this._oGrowingDelegate.setTriggerText(this.getGrowingTriggerText());}return this;};L.prototype.setEnableBusyIndicator=function(e){this.setProperty("enableBusyIndicator",e,true);if(!this.getEnableBusyIndicator()){this._hideBusyIndicator();}return this;};L.prototype.setBackgroundDesign=function(b){var B=this.getBackgroundDesign();this.setProperty("backgroundDesign",b,true);this.$().removeClass("sapMListBG"+B).addClass("sapMListBG"+this.getBackgroundDesign());return this;};L.prototype.setShowSeparators=function(s){var S=this.getShowSeparators();this.setProperty("showSeparators",s,true);this.$("listUl").removeClass("sapMListShowSeparators"+S).addClass("sapMListShowSeparators"+this.getShowSeparators());return this;};L.prototype.setIncludeItemInSelection=function(i){i=this.validateProperty("includeItemInSelection",i);if(i!=this.getIncludeItemInSelection()){this.setProperty("includeItemInSelection",i,true);this.getItems().forEach(function(o){o._includeItemInSelection=i;o.$().toggleClass("sapMLIBCursor",i);});}return this;};L.prototype.setInset=function(i){i=this.validateProperty("inset",i);if(i!=this.getInset()){this.setProperty("inset",i,true);if(this.getDomRef()){this.$().toggleClass("sapMListInsetBG",i);this.$("listUl").toggleClass("sapMListInset",i);this._setSwipePosition();}}return this;};L.prototype.setWidth=function(w){this.setProperty("width",w,true);this.$().css("width",this.getWidth());return this;};L.prototype.setNoDataText=function(n){this.setProperty("noDataText",n,true);this.$("nodata-text").text(this.getNoDataText());return this;};L.prototype.getNoDataText=function(c){if(c&&this._bBusy){return"";}var n=this.getProperty("noDataText");if(!n){var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");n=r.getText("LIST_NO_DATA");}return n;};L.prototype.getSelectedItem=function(){var a=this.getItems();for(var i=0;i<a.length;i++){if(a[i].getSelected()){return a[i];}}return null;};L.prototype.setSelectedItem=function(o,s,f){if(this.indexOfItem(o)<0){q.sap.log.warning("setSelectedItem is called without valid ListItem parameter on "+this);return;}if(this._bSelectionMode){o.setSelected((s===undefined)?true:!!s);f&&this._fireSelectionChangeEvent([o]);}};L.prototype.getSelectedItems=function(){return this.getItems().filter(function(i){return i.getSelected();});};L.prototype.setSelectedItemById=function(i,s){var o=sap.ui.getCore().byId(i);return this.setSelectedItem(o,s);};L.prototype.getSelectedContexts=function(a){var b=this.getBindingInfo("items"),m=(b||{}).model,M=this.getModel(m);if(!b||!M){return[];}if(a&&this.getRememberSelections()){return this._aSelectedPaths.map(function(p){return M.getContext(p);});}return this.getSelectedItems().map(function(i){return i.getBindingContext(m);});};L.prototype.removeSelections=function(a,f){var c=[];this._oSelectedItem=null;a&&(this._aSelectedPaths.length=0);this.getItems().forEach(function(i){if(i.getSelected()){i.setSelected(false,true);c.push(i);!a&&this._updateSelectedPaths(i);}},this);if(f&&c.length){this._fireSelectionChangeEvent(c);}return this;};L.prototype.selectAll=function(f){if(this.getMode()!="MultiSelect"){return this;}var c=[];this.getItems().forEach(function(i){if(!i.getSelected()){i.setSelected(true,true);c.push(i);this._updateSelectedPaths(i);}},this);if(f&&c.length){this._fireSelectionChangeEvent(c);}return this;};sap.m.ListBase.prototype.getLastMode=function(m){return this._sLastMode;};L.prototype.setMode=function(m){m=this.validateProperty("mode",m);var o=this.getMode();if(o==m){return this;}this.setProperty("mode",m);this._bSelectionMode=m.indexOf("Select")>-1;if(!this._bSelectionMode){this.removeSelections(true);return this;}var s=this.getSelectedItems();if(s.length>1){this.removeSelections(true);}else if(o===sap.m.ListMode.MultiSelect){this._oSelectedItem=s[0];}return this;};L.prototype.getGrowingInfo=function(){if(this._oGrowingDelegate){return this._oGrowingDelegate.getInfo();}return null;};L.prototype.setRememberSelections=function(r){this.setProperty("rememberSelections",r,true);!this.getRememberSelections()&&(this._aSelectedPaths.length=0);return this;};sap.m.ListBase.prototype.setSelectedContextPaths=function(s){this._aSelectedPaths=s||[];};sap.m.ListBase.prototype.getSelectedContextPaths=function(){return this._aSelectedPaths.slice(0);};L.prototype.isAllSelectableSelected=function(){var i=this.getItems(),s=this.getSelectedItems().length,S=i.filter(function(o){return o.isSelectable();}).length;return i.length>0&&s==S;};L.prototype.getVisibleItems=function(){return this.getItems().filter(function(i){return i.getVisible();});};L.prototype.onItemDOMUpdate=function(o){if(!this._bRendering){this._startItemNavigation(true);}};L.prototype.onItemSelectedChange=function(o,s){if(this.getMode()==sap.m.ListMode.MultiSelect){this._updateSelectedPaths(o,s);return;}if(s){this._aSelectedPaths.length=0;this._oSelectedItem&&this._oSelectedItem.setSelected(false,true);this._oSelectedItem=o;}else if(this._oSelectedItem===o){this._oSelectedItem=null;}this._updateSelectedPaths(o,s);};L.prototype.getItemsContainerDomRef=function(){return this.getDomRef("listUl");};L.prototype.onBeforePageLoaded=function(g,c){this._fireUpdateStarted(c,g);this.fireGrowingStarted(g);};L.prototype.onAfterPageLoaded=function(g,c){this._fireUpdateFinished(g);this.fireGrowingFinished(g);};L.prototype.addNavSection=function(i){this._aNavSections.push(i);return i;};L.prototype.getMaxItemsCount=function(){var b=this.getBinding("items");if(b){return b.getLength()||0;}return this.getItems().length;};L.prototype.shouldRenderItems=function(){return true;};L.prototype._applyAggregation=function(f,p){return C.prototype[f+"Aggregation"].apply(this,p);};L.prototype._resetItemsBinding=function(){if(this.isBound("items")){this._bUpdating=false;this._bReceivingData=false;this.removeSelections(true);this._hideBusyIndicator();this._oGrowingDelegate&&this._oGrowingDelegate.reset();if(this._oItemNavigation){this._oItemNavigation.iFocusedIndex=-1;}}};L.prototype._updateStarted=function(r){if(!this._bReceivingData&&!this._bUpdating){this._bUpdating=true;this._fireUpdateStarted(r);}};L.prototype._fireUpdateStarted=function(r,i){this._sUpdateReason=q.sap.charToUpperCase(r||"Refresh");this.fireUpdateStarted({reason:this._sUpdateReason,actual:i?i.actual:this.getItems().length,total:i?i.total:this.getMaxItemsCount()});};L.prototype._updateFinished=function(){if(!this._bReceivingData&&this._bUpdating){this._fireUpdateFinished();this._bUpdating=false;}};L.prototype._fireUpdateFinished=function(i){q.sap.delayedCall(0,this,function(){this._startItemNavigation(true);this._hideBusyIndicator();this.fireUpdateFinished({reason:this._sUpdateReason,actual:i?i.actual:this.getItems().length,total:i?i.total:this.getMaxItemsCount()});});};L.prototype._showBusyIndicator=function(){if(this.getEnableBusyIndicator()&&!this.getBusy()&&!this._bBusy){this._bBusy=true;this._sBusyTimer=q.sap.delayedCall(this.getBusyIndicatorDelay(),this,function(){this.$("nodata-text").text("");});this.setBusy(true,"listUl");}};L.prototype._hideBusyIndicator=function(){if(this._bBusy){this._bBusy=false;this.setBusy(false,"listUl");q.sap.clearDelayedCall(this._sBusyTimer);if(!this.getItems(true).length){this.$("nodata-text").text(this.getNoDataText());}}};L.prototype._applySettingsToItem=function(o){if(o&&!o.getParent()&&o.getSelected()){this.onItemSelectedChange(o,true);}return o;};L.prototype._applySelectionToItem=function(i){if(!this.getRememberSelections()||!i||!this._bSelectionMode||!this._aSelectedPaths.length||i.getSelected()){return;}var p=i.getBindingContextPath();if(p&&this._aSelectedPaths.indexOf(p)>-1){i.setSelected(true);}};L.prototype.onItemSelect=function(o,s){if(this.getMode()==sap.m.ListMode.MultiSelect){this._fireSelectionChangeEvent([o]);}else if(this._bSelectionMode&&s){this._fireSelectionChangeEvent([o]);}};L.prototype._fireSelectionChangeEvent=function(a){var o=a&&a[0];if(!o){return;}this.fireSelectionChange({listItem:o,listItems:a,selected:o.getSelected()});this.fireSelect({listItem:o});};L.prototype.onItemDelete=function(o){this.fireDelete({listItem:o});};L.prototype.onItemPress=function(o,s){if(o.getType()==sap.m.ListType.Inactive){return;}q.sap.delayedCall(0,this,function(){this.fireItemPress({listItem:o,srcControl:s});});};L.prototype._updateSelectedPaths=function(i,s){if(!this.getRememberSelections()){return;}var p=i.getBindingContextPath();if(!p){return;}s=(s===undefined)?i.getSelected():s;var a=this._aSelectedPaths.indexOf(p);if(s){a<0&&this._aSelectedPaths.push(p);}else{a>-1&&this._aSelectedPaths.splice(a,1);}};L.prototype._destroyGrowingDelegate=function(){if(this._oGrowingDelegate){this._oGrowingDelegate.destroy();this._oGrowingDelegate=null;}};L.prototype._destroyItemNavigation=function(){if(this._oItemNavigation){this.removeEventDelegate(this._oItemNavigation);this._oItemNavigation.destroy();this._oItemNavigation=null;}};L.prototype._getTouchBlocker=function(){return this.$().children();};L.prototype._getSwipeContainer=function(){return this._$swipeContainer||(q.sap.require("sap.m.InstanceManager"),this._$swipeContainer=q("<div>",{"id":this.getId("swp"),"class":"sapMListSwp"}));};L.prototype._setSwipePosition=function(){if(this._isSwipeActive){return this._getSwipeContainer().css("top",this._swipedItem.$().position().top);}};L.prototype._renderSwipeContent=function(){var $=this._swipedItem.$(),a=this._getSwipeContainer();this.$().prepend(a.css({top:$.position().top,height:$.outerHeight(true)}));if(this._bRerenderSwipeContent){this._bRerenderSwipeContent=false;var r=sap.ui.getCore().createRenderManager();r.render(this.getSwipeContent(),a.empty()[0]);r.destroy();}return this;};L.prototype._swipeIn=function(){var t=this,$=t._getTouchBlocker(),a=t._getSwipeContainer();t._isSwipeActive=true;t._renderSwipeContent();sap.m.InstanceManager.addDialogInstance(t);window.document.activeElement.blur();q(window).on("resize.swp",function(){t._setSwipePosition();});$.css("pointer-events","none").on("touchstart.swp mousedown.swp",function(e){if(!a[0].firstChild.contains(e.target)){e.preventDefault();e.stopPropagation();}});a.bind("webkitAnimationEnd animationend",function(){q(this).unbind("webkitAnimationEnd animationend");a.css("opacity",1).focus();$.parent().on("touchend.swp touchcancel.swp mouseup.swp",function(e){if(!a[0].firstChild.contains(e.target)){t.swipeOut();}});}).removeClass("sapMListSwpOutAnim").addClass("sapMListSwpInAnim");};L.prototype._onSwipeOut=function(c){this._getSwipeContainer().css("opacity",0).remove();q(window).off("resize.swp");this._getTouchBlocker().css("pointer-events","auto").off("touchstart.swp mousedown.swp");if(typeof c=="function"){c.call(this,this._swipedItem,this.getSwipeContent());}this._isSwipeActive=false;sap.m.InstanceManager.removeDialogInstance(this);};L.prototype.swipeOut=function(c){if(!this._isSwipeActive){return this;}var t=this,$=this._getSwipeContainer();this._getTouchBlocker().parent().off("touchend.swp touchend.swp touchcancel.swp mouseup.swp");$.bind("webkitAnimationEnd animationend",function(){q(this).unbind("webkitAnimationEnd animationend");t._onSwipeOut(c);}).removeClass("sapMListSwpInAnim").addClass("sapMListSwpOutAnim");return this;};L.prototype._removeSwipeContent=function(){if(this._isSwipeActive){this.swipeOut()._onSwipeOut();}};L.prototype.close=L.prototype._removeSwipeContent;L.prototype._onSwipe=function(e){var c=this.getSwipeContent(),s=e.srcControl;if(c&&s&&!this._isSwipeActive&&this!==s&&!this._eventHandledByControl&&(sap.ui.Device.support.touch||(sap.ui.Device.os.windows&&sap.ui.Device.os.version>=8))){for(var a=s;a&&!(a instanceof sap.m.ListItemBase);a=a.oParent);if(a instanceof sap.m.ListItemBase){this._swipedItem=a;this.fireSwipe({listItem:this._swipedItem,swipeContent:c,srcControl:s},true)&&this._swipeIn();}}};L.prototype.ontouchstart=function(e){this._eventHandledByControl=e.isMarked();};L.prototype.onswipeleft=function(e){var a=sap.ui.getCore().getConfiguration().getRTL()?"RightToLeft":"LeftToRight";if(this.getSwipeDirection()!=a){this._onSwipe(e);}};L.prototype.onswiperight=function(e){var a=sap.ui.getCore().getConfiguration().getRTL()?"LeftToRight":"RightToLeft";if(this.getSwipeDirection()!=a){this._onSwipe(e);}};L.prototype.setSwipeDirection=function(d){return this.setProperty("swipeDirection",d,true);};L.prototype.getSwipedItem=function(){return(this._isSwipeActive?this._swipedItem:null);};L.prototype.setSwipeContent=function(c){this._bRerenderSwipeContent=true;this.toggleStyleClass("sapMListSwipable",!!c);return this.setAggregation("swipeContent",c,!this._isSwipeActive);};L.prototype.invalidate=function(o){if(o&&o===this.getSwipeContent()){this._bRerenderSwipeContent=true;this._isSwipeActive&&this._renderSwipeContent();return this;}C.prototype.invalidate.apply(this,arguments);return this;};L.prototype.addItemGroup=function(g,h,s){h=h||new G({title:g.text||g.key});this.addAggregation("items",h,s);return h;};L.prototype.removeGroupHeaders=function(s){this.getItems().forEach(function(i){if(i instanceof G){i.destroy(s);}});};L.prototype.getRole=function(){var m=this.getMode(),M=sap.m.ListMode;return(m==M.None||m==M.Delete)?"list":"listbox";};L.prototype.onNavigationItemFocus=function(e,h,H){var i=e.getParameter("index"),a=this._oItemNavigation.getItemDomRefs(),o=a[i],s=a.length,b=this.getBinding("items");if(this.getGrowing()&&this.getGrowingScrollToLoad()&&b&&b.isLengthFinal()){s=b.getLength();}else{h&&s--;H&&s--;}this.getNavigationRoot().setAttribute("aria-activedescendant",o.id);o.setAttribute("aria-posinset",h?i:i+1);o.setAttribute("aria-setsize",s);};L.prototype.getNavigationRoot=function(){return this.getDomRef("listUl");};L.prototype.getFocusDomRef=function(){return this.getNavigationRoot();};L.prototype._startItemNavigation=function(i){if(i){var n=this.getNavigationRoot();if(!n||!n.contains(document.activeElement)){this._bItemNavigationInvalidated=true;return;}}this._bItemNavigationInvalidated=false;if(sap.ui.Device.os.android&&sap.ui.Device.os.version<4.1){return;}if(!this._oItemNavigation){this._oItemNavigation=new I();this._oItemNavigation.setCycling(false);this.addEventDelegate(this._oItemNavigation);this._oItemNavigation.setTabIndex0();this._oItemNavigation.setPageSize(this.getGrowingThreshold());this._oItemNavigation.setTableMode(true,true).setColumns(1);this._oItemNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"]});this._oItemNavigation.attachEvent(I.Events.BeforeFocus,this.onNavigationItemFocus,this);}var n=this.getNavigationRoot();this._oItemNavigation.setRootDomRef(n);this.setNavigationItems(this._oItemNavigation,n);};L.prototype.setNavigationItems=function(i,n){var N=q(n).children(".sapMLIB").get();i.setItemDomRefs(N);if(i.getFocusedIndex()==-1){i.setFocusedIndex(0);}};L.prototype.getItemNavigation=function(){return this._oItemNavigation;};L.prototype.setItemFocusable=function(o){if(!this._oItemNavigation){return;}var i=this._oItemNavigation.getItemDomRefs();var a=i.indexOf(o.getDomRef());if(a>=0){this._oItemNavigation.setFocusedIndex(a);}};L.prototype.forwardTab=function(f){this._bIgnoreFocusIn=true;this.$(f?"after":"listUl").focus();};L.prototype.onsaptabnext=function(e){if(e.target.id==this.getId("nodata")){this.forwardTab(true);}};L.prototype.onsaptabprevious=function(e){var t=e.target.id;if(t==this.getId("nodata")){this.forwardTab(false);}else if(t==this.getId("trigger")){this.focusPrevious();e.preventDefault();}};L.prototype._navToSection=function(f){var t;var i=0;var s=f?1:-1;var a=this._aNavSections.length;this._aNavSections.some(function(S,b){var d=q.sap.domById(S);if(d&&d.contains(document.activeElement)){i=b;return true;}});var o=this.getItemsContainerDomRef();var c=q.sap.byId(this._aNavSections[i]);if(c[0]===o){c.data("redirect",this._oItemNavigation.getFocusedIndex());}this._aNavSections.some(function(){i=(i+s+a)%a;t=q.sap.byId(this._aNavSections[i]);if(t[0]===o){var r=t.data("redirect");var b=this._oItemNavigation.getItemDomRefs();var T=b[r]||o.children[0];t=q(T);}if(t.is(":focusable")){t.focus();return true;}},this);return t;};L.prototype.onsapshow=function(e){if(e.isMarked()||e.which==q.sap.KeyCodes.F4||e.target.id!=this.getId("trigger")&&!q(e.target).hasClass(this.sNavItemClass)){return;}if(this._navToSection(true)){e.preventDefault();e.setMarked();}};L.prototype.onsaphide=function(e){if(e.isMarked()||e.target.id!=this.getId("trigger")&&!q(e.target).hasClass(this.sNavItemClass)){return;}if(this._navToSection(false)){e.preventDefault();e.setMarked();}};L.prototype.onkeydown=function(e){var c=(e.which==q.sap.KeyCodes.A)&&(e.metaKey||e.ctrlKey);if(e.isMarked()||!c||!q(e.target).hasClass(this.sNavItemClass)){return;}e.preventDefault();if(this.getMode()!==sap.m.ListMode.MultiSelect){return;}if(this.isAllSelectableSelected()){this.removeSelections(false,true);}else{this.selectAll(true);}e.setMarked();};L.prototype.onmousedown=function(e){if(this._bItemNavigationInvalidated){this._startItemNavigation();}};L.prototype.focusPrevious=function(){var n=this._oItemNavigation.getItemDomRefs();var i=this._oItemNavigation.getFocusedIndex();var $=q(n[i]);var r=$.control(0)||{};var t=r.getTabbables?r.getTabbables():$.find(":sapTabbable");var f=t.eq(-1).add($).eq(-1);f.focus();};L.prototype.onfocusin=function(e){if(this._bIgnoreFocusIn){this._bIgnoreFocusIn=false;e.stopImmediatePropagation(true);return;}if(this._bItemNavigationInvalidated){this._startItemNavigation();}if(e.isMarked()||!this._oItemNavigation||e.target.id!=this.getId("after")){return;}this.focusPrevious();e.setMarked();};return L;},true);
