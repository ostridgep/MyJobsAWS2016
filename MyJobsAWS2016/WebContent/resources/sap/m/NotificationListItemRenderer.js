/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){'use strict';var N={};var c='sapMNLI';var a='sapMNLI-TextWrapper';var b='sapMLIB';var d='sapMNLI-AuthorPicture';var e='sapMNLI-Priority';var f='sapMNLI-Header';var g='sapMNLI-Body';var h='sapMNLI-Description';var i='sapMNLI-Details';var j='sapMNLI-Bullet';var k='sapMNLI-Footer';var l='sapMNLI-CloseButton';var m='sapMNLI-CollapseButton';var n='sapMNLI-TitleWrapper--initial-overwrite';var o='sapMNLI-TextWrapper--initial-overwrite';N.render=function(r,C){var p=C.getId();r.write('<li');r.addClass(c);r.addClass(b);r.writeControlData(C);r.writeAttribute('tabindex','0');r.writeAccessibilityState(C,{role:"listitem",labelledby:p+'-title',describedby:(p+'-body')+' '+(p+'-info')});r.writeClasses();r.write('>');this.renderPriorityArea(r,C);this.renderHeader(r,C);this.renderBody(r,C);this.renderFooter(r,C);this.renderCloseButton(r,C);r.write('</li>');};N.renderPriorityArea=function(r,C){r.write('<div');var p='';switch(C.getPriority()){case(sap.ui.core.Priority.Low):p='sapMNLI-Low';break;case(sap.ui.core.Priority.Medium):p='sapMNLI-Medium';break;case(sap.ui.core.Priority.High):p='sapMNLI-High';break;default:p='sapMNLI-None';break;}r.addClass(e);r.addClass(p);r.writeClasses();r.write('>');r.write('</div>');};N.renderAuthorPicture=function(r,C){if(!C.getAuthorPicture()){return;}r.write('<div');r.addClass(d);r.writeClasses();r.write('>');r.renderControl(C._getAuthorImage());r.write('</div>');};N.renderCloseButton=function(r,C){if(C.getShowCloseButton()){r.renderControl(C._closeButton.addStyleClass(l));}};N.renderCollapseButton=function(r,C){r.renderControl(C._collapseButton.addStyleClass(m));};N.renderHeader=function(r,C){r.write('<div');r.addClass(f);r.addClass(n);if(!C.getTruncate()){}r.writeClasses();r.write('>');this.renderTitle(r,C);r.write('</div>');};N.renderTitle=function(r,C){r.renderControl(C._getHeaderTitle());};N.renderBody=function(r,C){r.write('<div class='+g+'>');this.renderAuthorPicture(r,C);r.write('<div class='+h+'>');this.renderDescription(r,C);this.renderDetails(r,C);r.write('</div>');this.renderAriaText(r,C);r.write('</div>');};N.renderDescription=function(r,C){r.write('<div');r.addClass(a);r.addClass(o);if(!C.getTruncate()){}r.writeClasses();r.write('>');r.renderControl(C._getDescriptionText());r.write('</div>');};N.renderDetails=function(r,C){r.write('<div class="'+i+'">');this.renderAuthorName(r,C);if(C.getAuthorName()){r.write('<span class="'+j+'">&#x00B7</span>');}this.renderDatetime(r,C);r.write('</div>');};N.renderDatetime=function(r,C){r.renderControl(C._getDateTimeText());};N.renderAuthorName=function(r,C){r.renderControl(C._getAuthorName());};N.renderAriaText=function(r,C){r.renderControl(C._ariaDetailsText);};N.renderFooter=function(r,C){var B=C.getButtons();r.write('<div class='+k+'>');this.renderCollapseButton(r,C);if(B&&B.length&&C.getShowButtons()){r.renderControl(C.getAggregation('_overflowToolbar'));}r.write('</div>');};return N;},true);