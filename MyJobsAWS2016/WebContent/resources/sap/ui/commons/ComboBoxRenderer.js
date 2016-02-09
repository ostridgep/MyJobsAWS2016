/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./TextFieldRenderer','sap/ui/core/Renderer'],function(q,T,R){"use strict";var C=R.extend(T);C.renderOuterAttributes=function(r,c){r.addClass("sapUiTfCombo");this.renderComboARIAInfo(r,c);};C.renderOuterContentBefore=function(r,c){this.renderExpander(r,c);this.renderSelectBox(r,c,'-1');};C.renderExpander=function(r,c){r.write("<div");r.writeAttributeEscaped('id',c.getId()+'-icon');r.writeAttribute('unselectable','on');if(sap.ui.getCore().getConfiguration().getAccessibility()){r.writeAttribute("role","presentation");}r.addClass("sapUiTfComboIcon");r.writeClasses();r.write(">&#9660;</div>");};C.renderSelectBox=function(r,c,t){if(c.mobile){r.write("<select");r.writeAttributeEscaped('id',c.getId()+'-select');r.writeAttribute('tabindex',t);if(!c.getEnabled()||!c.getEditable()){r.writeAttribute('disabled','disabled');}r.write(">");for(var i=0;i<c.getItems().length;i++){var I=c.getItems()[i];r.write("<option");r.writeAttributeEscaped('id',c.getId()+"-"+I.getId());if(!I.getEnabled()){r.writeAttribute("disabled","disabled");}r.write(">"+I.getText()+"</option>");}r.write("</select>");}};C.renderInnerAttributes=function(r,c){if(c.mobile){r.writeAttribute('autocapitalize','off');r.writeAttribute('autocorrect','off');}};C.renderComboARIAInfo=function(r,c){var l=c.getListBox();if(!l&&c._oListBox){l=c._oListBox.getId();}var p={role:"combobox",owns:c.getId()+"-input "+l};if(!c.getEnabled()){p["disabled"]=true;}r.writeAccessibilityState(null,p);};C.renderARIAInfo=function(r,c){var p=-1;if(c.getSelectedItemId()){for(var i=0;i<c.getItems().length;i++){var I=c.getItems()[i];if(I.getId()==c.getSelectedItemId()){p=i+1;break;}}}var P={autocomplete:"inline",live:"polite",setsize:c.getItems().length,posinset:(p>=0)?p:undefined};if(c.getValueState()==sap.ui.core.ValueState.Error){P["invalid"]=true;}r.writeAccessibilityState(c,P);};C.setEditable=function(c,e){if(c.mobile){var s=c.$("select");if(e&&c.getEnabled()){s.removeAttr("disabled");}else{s.attr("disabled","disabled");}}T.setEditable.apply(this,arguments);};C.setEnabled=function(c,e){if(c.mobile){var s=c.$("select");if(e&&c.getEditable()){s.removeAttr("disabled");}else{s.attr("disabled","disabled");}}T.setEnabled.apply(this,arguments);};return C;},true);
