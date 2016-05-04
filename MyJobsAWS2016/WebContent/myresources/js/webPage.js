var formToOpen="Forms/formsindex.html"
var formMode="Forms"
var closeFormName=""
var selectedWebPage=''
var mapLocationField
currentPage=document.location.href;
alert
var theIFrameDoc=""
var formWebPage = new sap.m.Dialog("dlgWebPage",{
   
   
    horizontalScrolling:true,
    verticalScrolling:true,
    modal: true,
    contentWidth:"1em",
    buttons: [

  
					new sap.m.Button( {
					    text: "Close",
					    icon:"sap-icon://sys-cancel",
					    type: sap.m.ButtonType.Reject,
					    tap: [ function(oEvt) {		  
							 
					    	formWebPage.close()} ]   
					}),
					
					],					
    content:[

            ],
            contentWidth:"99%",
            contentHeight: "99%",
      beforeOpen:function(){
    	  
     	   
    	  formWebPage.addContent(new 		sap.ui.core.HTML({
    		 
			content: '<iframe id="HomeWebPage" width="100%"  src="'+selectedWebPage+'"></iframe>'

 
		}))

      },
      afterOpen:function(){
    	  document.getElementById('HomeWebPage').style.height=document.getElementById("dlgWebPage").offsetHeight-130+"px"  
    	  
      },
   	afterClose:function(){
   		
   		formWebPage.destroyContent()
   	}
	
	 })
var formGMaps = new sap.m.Dialog("dlgGMaps",{
	   
	title:"Map",  
    horizontalScrolling:true,
    verticalScrolling:true,
    modal: true,
    contentWidth:"1em",
    buttons: [

  
					new sap.m.Button( {
					    text: "Close",
					    icon:"sap-icon://sys-cancel",
					    type: sap.m.ButtonType.Reject,
					    tap: [ function(oEvt) {		  
							 
					    	formGMaps.close()} ]   
					}),
					
					],					
    content:[

            ],
            contentWidth:"80%",
            contentHeight: "80%",
      beforeOpen:function(){
    	  
     	   
    	  formGMaps.addContent(new 		sap.ui.core.HTML({
    		 
			content: '<iframe id="GMapsPage" width="100%"  src="GoogleMapsGetLocation.html"></iframe>'

 
		}))

      },
      afterOpen:function(){
    	  localStorage.setItem('mapLocation','')
    	  document.getElementById('GMapsPage').style.height=document.getElementById("dlgGMaps").offsetHeight-130+"px"  
    	  
      },
   	afterClose:function(){
   		if(localStorage.getItem('mapLocation')==''){
   			
   		}else{
   			
   			var MyIFrame = document.getElementById("formIframe");
   			
   			var MyIFrameDoc = (MyIFrame.contentWindow || MyIFrame.contentDocument)
	    	if (MyIFrameDoc.document) MyIFrameDoc = MyIFrameDoc.document;
	    	MyIFrameDoc.getElementById(mapLocationField).value=localStorage.getItem('mapLocation')
   		}	
   		
   		formGMaps.destroyContent()
   	}
	
	 })
var formForms = new sap.m.Dialog("dlg",{
   // title:"Forms",
   
    horizontalScrolling:true,
    verticalScrolling:true,
    modal: true,
    contentWidth:"1em",

    buttons: [
  


					new sap.m.Button( {
					    text: "Close",
					    icon:"sap-icon://sys-cancel",
					    type: sap.m.ButtonType.Reject,
					    tap: [ function(oEvt) {		  
							 
					    	formForms.close()} ]   
					}),
					new sap.m.Button("formSaveButton" ,{
						
					    text: "Save",
					    icon:"sap-icon://sys-save",
					    type: sap.m.ButtonType.Accept,
					    tap: [ function(oEvt) {	
					    	var fstate=document.getElementById("formIframe").contentWindow.isComplete()
					    	var MyIFrame = document.getElementById("formIframe");
						    var MyIFrameDoc = (MyIFrame.contentWindow || MyIFrame.contentDocument)
						    if (MyIFrameDoc.document) MyIFrameDoc = MyIFrameDoc.document;
					    	fname=MyIFrameDoc.getElementById("FormName").value
					    	
					    	if(fstate!="COMPLETE"){
					    	    showFormValidationMessage(fname+" Form",fstate)
					    	    
							
					    	}else{
					    		saveFormData("COMPLETE");
					    	}
						    	
						    	

						    	
						    	
						    	
						    	 
							
					    	
					    	
					    	
					    }
					    ]   
					})
					
					],					
    content:[

            ],
            contentWidth:"99%",
            contentHeight: "99%",
      beforeOpen:function(){
    	  formForms.addContent(new 		sap.ui.core.HTML({
    		

			//content: ' <iframe id="formIframe" src="Forms/formsindex.html" onload="this.width=screen.width-170;this.height=screen.height;showhideSaveButton(this.contentWindow.location.toString())"></iframe>'
			content: ' <iframe id="formIframe" src="'+formToOpen+'" frameborder="0" style="width:100%"  width="100%"  onload="this.height=height= screen.height; showhideSaveButton(this.contentWindow.location.toString())"></iframe>'
						

		}))
		

      },
	  
      afterOpen:function(){  
 
    	
	  } ,
	  beforeClose:function(){
		  if(formDG5.isOpen()){
			  initCloseButtons()
		  }
		  formForms.destroyContent();
	  }
	
	 })
function saveFormData(type){
	//Type is COMPLETE or SAVED
	
	var MyIFrame = document.getElementById("formIframe");
    var MyIFrameDoc = (MyIFrame.contentWindow || MyIFrame.contentDocument)
    if (MyIFrameDoc.document) MyIFrameDoc = MyIFrameDoc.document;
	try {
		
		json=buildJSONResponse(MyIFrameDoc)
		if(currentPage.indexOf("Home")<1) {
			w=localStorage.getItem("SelectedItem")

			x=w.split("#")
			y=x[1]
			z=y.split(":")
			createFormsResponse(fname,z[1], z[2],localStorage.getItem("MobileUser"),json,formMode,type)
		}else{
		//Standalone Form
			createFormsResponse(fname,"", "",localStorage.getItem("MobileUser"),json,formMode,type)
		}
		formForms.close()
	}
	catch(err) {
	
		formForms.close()
	}
}
function showhideSaveButton(pageName){
	
	
	if( pageName.indexOf("formsindex")>0){
		sap.ui.getCore().getElementById('formSaveButton').setVisible(false);
		var MyIFrame = document.getElementById("formIframe");
		var MyIFrameDoc = (MyIFrame.contentWindow || MyIFrame.contentDocument)
		if (MyIFrameDoc.document) MyIFrameDoc = MyIFrameDoc.document;	
		BuildFormsList(MyIFrameDoc)
	}else if( pageName.indexOf("ProcessForm")>0){
		sap.ui.getCore().getElementById('formSaveButton').setVisible(false);
		
	}else{
	sap.ui.getCore().getElementById('formSaveButton').setVisible(true);
	var MyIFrame = document.getElementById("formIframe");
	var MyIFrameDoc = (MyIFrame.contentWindow || MyIFrame.contentDocument)
	if (MyIFrameDoc.document) MyIFrameDoc = MyIFrameDoc.document;	
	
	//	formMode='Close' if coming from Close Page
	//need to read the json values into an array
	

		formForms.setTitle(MyIFrameDoc.title)
		theIFrameDoc=MyIFrameDoc;
		buildHeaderFields(MyIFrameDoc);
		buildTables(MyIFrameDoc);
		buildSelects(MyIFrameDoc);
		loadFormFields(MyIFrameDoc)

	}
}
function updateMergeField(fld){
	alert(fld.value)
	if(fld.value=="~OrderNo"){
		fld.value="123456"
			alert(fld.value)
	}
	
}

function buildHeaderFields(formDoc){
	mapLocationField=''
	var items = formDoc.getElementsByTagName("*");
	
	for (var i = items.length; i--;) {
	    //do sth like hide the element
	    if(items[i].hasAttribute("merge")){
	    	
	    		if((items[i].tagName!="TABLE")&&(items[i].tagName!="TR")&&(items[i].tagName!="TH")){
	    			
	    			if(items[i].getAttribute("merge")=='mapLocation'){
	    				mapLocationField=items[i].id
	    			}else if(items[i].getAttribute("merge")=='~currenttime'){
	    				items[i].value=getFormattedTime()
	    			}else if(items[i].getAttribute("merge")=='~currentdate'){
	    				items[i].value=getFormattedDMY();
	    			}else{
	    				if(items[i].getAttribute("merge")=="notifdate")
	    					{
	    					items[i].value=formatDate(selectedJobArray[items[i].getAttribute("merge")])
	    					}else if(items[i].getAttribute("merge")=="notiftime"){
	    						items[i].value=formatTimeString(selectedJobArray[items[i].getAttribute("merge")])	
	    					}else{
	    						items[i].value=selectedJobArray[items[i].getAttribute("merge")]
	    					}
	    			}
	    				
	    			
	    				

	    			
	        }
	    	
	    }
	}	
}
function buildTables(formDoc){
	var items = formDoc.getElementsByTagName("TABLE");
	
		for (var i = items.length; i--;) {
		    //do sth like hide the element
		    if(items[i].hasAttribute("merge")){
		    	if(items[i].getAttribute("merge")!="FormOutputTable"){
		    		rows=items[i].children[0].children
		    		rowtoClone=''    		
		    		for (var r=0; r < rows.length; r++) {
		    			if(rows[r].hasAttribute("mergerow")){
		    			   
		    				rowtoClone=rows[r]; 			   
		    			}
		    		}
		    	mergeTableData(items[i].getAttribute("merge"),items[i].children[0],rowtoClone)
		    	items[i].deleteRow(1)
		    	
		    	}
		    }
		}
	}
function buildSelects(formDoc){
	var items = formDoc.getElementsByTagName("SELECT");
	
		for (var i = items.length; i--;) {
		    //do sth like hide the element
		    if(items[i].hasAttribute("merge")){
		    	
					
					buildOptions(items[i].getAttribute("merge"),items[i]);



	    	
		    	
		    }
		}
	}
function buildOptions(sql,fld){
	html5sql.process(sql,
			function(transaction, results, rowsArray){
				for (var r=0; r < rowsArray.length; r++) {
					
					    
					    var option = document.createElement("option");
					    option.text = rowsArray[r].description;
					    option.value = rowsArray[r].value;
					    fld.appendChild(option);
				}
				
				fld.value=""
			},
			 function(error, statement){
				 console.log("Error: " + error.message + " when processing " + statement);
			 }   
		);
}


function buildRelatedSelect(fld,sql,val){
	

	var theSelect=theIFrameDoc.getElementById(fld)
	
for(var i = theSelect.options.length-1;i>0;i--)
{
	theSelect.removeChild(theSelect.options[i]);
}
		html5sql.process(sql+"'"+val+"'",
				function(transaction, results, rowsArray){
					console.log("found "+rowsArray.length)
					for (var r=0; r < rowsArray.length; r++) {						    
						    var option = document.createElement("option");
						    option.text = rowsArray[r].description;
						    option.value = rowsArray[r].value;
						    theSelect.appendChild(option);
					}
					
		
				},
				 function(error, statement){
					
					console.log("Error: " + error.message + " when processing " + statement);
				 }   
			);

}
function buildRelatedSelectforLoad(fld,sql,val,defaultval){
	
	var theSelect=theIFrameDoc.getElementById(fld)
	
	for(var i = theSelect.options.length-1;i>0;i--)
	{
		theSelect.removeChild(theSelect.options[i]);
	}
			html5sql.process(sql+"'"+val+"'",
					function(transaction, results, rowsArray){
						console.log("found "+rowsArray.length)
						for (var r=0; r < rowsArray.length; r++) {						    
							    var option = document.createElement("option");
							    option.text = rowsArray[r].description;
							    option.value = rowsArray[r].value;
							    theSelect.appendChild(option);
						}
						theSelect.value=defaultval
			
					},
					 function(error, statement){
						
						console.log("Error: " + error.message + " when processing " + statement);
					 }   
				);
	}

	function cloneRow(row,table,cnt,dbArray) {

	    var clone = row.cloneNode(true); // copy children too
	    cols=clone.children;
	    for (var c=0; c < cols.length; c++) {
	    	fld=cols[c].children[0].id
	    	fld=fld+cnt;
	    	if(cols[c].children[0].type){
	    		cols[c].children[0].value=dbArray[cols[c].children[0].id]
	    		
	    	}
	    	if(cols[c].children[0].tagName=="LABEL"){
	    		
	    		
	    		cols[c].children[0].innerHTML=dbArray[cols[c].children[0].id]
	    	}
	    	
	    	cols[c].children[0].name=cols[c].children[0].id

	    }
	    clone.id = "newID"+cnt; // change id or other attributes/contents
	    table.appendChild(clone); // add new row to end of table
	  }
	function  mergeTableData(tablename,table,rowtoClone){
var SQLStatement=''
		       SQLStatement="SELECT * from  "+tablename

		                     SQLStatement+=" where orderno = '"+selectedJobArray["orderno"]+"'"

		                     
		html5sql.process(SQLStatement,
				function(transaction, results, rowsArray){
			
			for (var cnt=0; cnt<rowsArray.length ; cnt++) {
				cloneRow(rowtoClone,table,cnt,rowsArray[cnt])
	    	}
		 },
		 function(error, statement){
			 //outputLogToDB(); 
		 }        
		);	









	}
	function BuildFormsList(doc)
	{
		currentPage=document.location.href;
		
		if(currentPage.indexOf("Home")>0) {
			
			doc.getElementById("stdFList").style.display = "none";
		}else{
			
			doc.getElementById("stdFList").style.display = "block";
		}
		 html5sql.process("Select * from MyForms",
	              function(transaction, results, rowsArray){
			// alert("hello"+rowsArray.length)
			 		doc.getElementById("StandardFormList").innerHTML='';
			 		doc.getElementById("JobFormList").innerHTML='';
			 		//alert("hello")
	            	for(var cntx=0; cntx < rowsArray.length ; cntx++)
					{	
	            		item = rowsArray[cntx];
	            		if(item.type=="ALL"){
	            			doc.getElementById("StandardFormList").innerHTML+="<label class='feedback-input' ><a href='"+item["url"]+"' >"+item["description"]+"</a></label>"				
	            		}else{
	            			doc.getElementById("JobFormList").innerHTML+="<label class='feedback-input' ><a href='"+item["url"]+"' >"+item["description"]+"</a></label>"   					
	            		
	            		}
	            	}	           
	                                

	            },
	            function(error, statement){
	                   
	                   opMessage("Error: " + error.message + " when Reading Forms processing " + statement);
	                   //window.location.href='Home.htm'
	            }        
	            )
	}
function setDlgTitle(formTitle){
	alert(formTitle)
}
	function buildJSONResponse(doc)
	{
		json="[{"
	    var str = '';
		  console.log("tables")
		   var items = doc.getElementsByTagName("TABLE");
		   var mergeTables=[]
		   for (var i=0;i<items.length; i++) {
		      
		       if(items[i].hasAttribute("merge")){
		    	   mergeTables.push(items[i].getAttribute("id"));
		      	   
		       		
		       	
		       	
		       }
		   }		
	    var elem = doc.getElementById('MyJobsForm').elements;
		var fldsop=0
	    for(var i = 0; i < elem.length; i++)
	    {
	    	if ((elem[i].type!='button')&&(elem[i].type!='submit')&&(elem[i].getAttribute("merge")!='mergecol')){
	    		     
	    		
	    			if(!elem[i].hasAttribute("Ignore")){
	    				if(fldsop>0){
	    					json+=","	
	    				}
	    				json+="\""+elem[i].id+"\":\""+elem[i].value+"\""
	    				fldsop++;
	    			
	    		}

	    	}
	    } 
	    
	   str=json
	
	   
	   for (var i = mergeTables.length-1; i >-1; i--) {
		  
	    	   str+=","+getJSONTableContent(doc,mergeTables[i]);
	      	   console.log(mergeTables[i])
	      	  
	   } 
	   
	   
	   
	   
	  
	    return str+"}]";
	    
	}
	
	function getJSONTableContent(doc,tab)
	{
		var str="";
	table=doc.getElementById(tab)
	console.log("doing:"+tab+table.rows.length)
	var firstRow=true;
		var startofRow=false;
	    var str = "\""+tab+"\": ["
	for (var i = 1, row; row = table.rows[i]; i++) {
		   if(i>1){
			   str+="},{"; 
		   }else{
			   str+="{";
		   }
		   console.log("doing row"+i+"cols+"+row.cells.length)
		   //iterate through rows
		   //rows would be accessed using the "row" variable assigned in the for loop
		   for (var j = 0, col; col = row.cells[j]; j++) {
			   if(row.cells[j].childNodes.length>1){
			        //console.log("doing col"+j+row.cells[j].childNodes[1].id+":"+row.cells[j].childNodes[1].value)
			       if(j>0){
				       str+=","; 
			       }
		           str+="\""+row.cells[j].childNodes[1].id+"\":\""+row.cells[j].childNodes[1].value+":"+row.cells[j].childNodes[0].innerHTML+"\""
		   	   }
		   }  
		}
	    if(table.rows.length>1){
	    	 str+="}";
	    }
	    str+="]";
	   
	    console.log(tab+":"+str)
	    return str
	}

	function isObject(element) {
	    return element.constructor == Object;
	}
	function isIterable(element) {
	    return isArray(element) || isObject(element);
	}

	function isArray(element) {
	    return element.constructor == Array;
	}
	function loadFormFields(formDoc){
		var items = formDoc.getElementsByTagName("*");
console.log(closeFormName)
		sqlstatement="SELECT * from myformsresponses where orderno = '"+CurrentOrderNo+"' and opno ='"+CurrentOpNo+"' and formname ='"+closeFormName+"'"
		console.log("here")
		html5sql.process(sqlstatement,
				function(transaction, results, rowsArray){
			console.log("save record found="+rowsArray.length)
					if( rowsArray.length > 0) {
						
						jsonstr=$.parseJSON(rowsArray[0].contents)
						console.log("1:"+jsonstr.length)
						for(var i=0;i<jsonstr.length;i++){
					        var obj = jsonstr[i];
					        for(var key in obj){
					            if(!Array.isArray(obj[key])){
					            	formDoc.getElementById(key).value=obj[key]
					            		console.log("setting "+key+"="+obj[key])
						            	if (formDoc.getElementById(key).hasAttribute("mergeonchange")) { 
						            		try{
						            			rselpars=formDoc.getElementById(key).getAttribute("onChange")
						            			
						            			rselpars=rselpars.substring(26, rselpars.length)
						            			
						            			rselparssplit=rselpars.split(",");
						            			rsfld=rselparssplit[0].substring(1, rselparssplit[0].length-1)
						            			rssql=(rselparssplit[1]+", "+rselparssplit[2]).substring(1, (rselparssplit[1]+", "+rselparssplit[2]).length-1)
						            			rssql=rssql.replace(/\\/g, "");
						            			
						            			buildRelatedSelectforLoad(rsfld,rssql,formDoc.getElementById(key).value+"%",obj[rsfld]);
							            		
						            		}catch(err){}
						            		
						            		
						            	}
						           
					            }else{
					            	jsontable=obj[key];
					            	console.log("Table:"+key+"length="+jsontable.length)
					            	var table = formDoc.getElementById(key);
					            
					            	for(var t=0;t<jsontable.length;t++){
					            		// Create an empty <tr> element and add it to the 1st position of the table:
							            var row = table.insertRow(-1);

					            		subobj = jsontable[t];
								        for(var subkey in subobj){
								            console.log(subkey+":"+subobj[subkey])
								            // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
								            var cell = row.insertCell(-1);								           
								            // Add some text to the new cells:
								            x=subobj[subkey].split(":")
								            rc=subkey.split("-")
								            cell.innerHTML = "<p>"+x[1]+"</p>"+
								            			      '<input type="text" class="feedback-input-table" id="'+subkey + '" value="'+x[0]+'" HIDDEN/>'
								           
								        }
								        var cell = row.insertCell(-1);	
								        cell.innerHTML='<button onclick="delete'+key+'('+rc[1]+')" class="btn btn-small btn-danger">Del</button>'
					            	}
					            }
					           
					        }
					    }
				
			
					}
			
			document.getElementById("formIframe").contentWindow.loadCompleted();
				},
				 function(error, statement){
					 console.log("Error: " + error.message + " when processing " + statement);
				 }   
			);	

	}
	
