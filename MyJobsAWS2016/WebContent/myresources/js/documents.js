var globaldocs = new Array()
var privatedownload = new Array()
var privateupload = new Array()
var privatephotos = new Array()
var downloadCount;
var getPhotoCaller="DOC"
var selectedDocTable=""
var selectedPhoto=""
var DeviceStorageDirectory;
var AppDocDirectory;


	var selectedPhotoType=""
	var GlobalDirectory=""
	var appDirectory=""
		var oProgInd= new sap.m.ProgressIndicator("pi1", {
			width:"100%",
			percentValue:0,
			displayValue:"0%",
			showValue:true
		});
	var oProgIndDL= new sap.m.ProgressIndicator("pi2", {
		width:"100%",
		percentValue:0,
		displayValue:"0%",
		showValue:true
	});
var formDownloadFiles = new sap.m.Dialog("dlgDownloadFiles",{
		    title:"Download Files",
		    modal: true,
		    contentWidth:"1em",
		    buttons: [
		  
						new sap.m.Button( {
						    text: "Close",
						    type: 	sap.m.ButtonType.Reject,
						    tap: [ function(oEvt) {		  
								 
						    	formDownloadFiles.close()
								  } ]
						}),
						new sap.m.Button( {
						    text: "Download",
						    type: 	sap.m.ButtonType.Accept,
						    tap: [ function(oEvt) {		  
						    	downloadAll(); 
						    	//formDownloadFiles.close()
								  } ]
						})
						],					
		    content:[
		             new sap.m.Label({text:"Checking Server for Documents:"}),
		             oProgInd,
		            new sap.ui.core.HTML({  
					      content: 
					    	    ["<Table><TR><TD>Total on Server:</TD><TD><label id ='DocTot'>0</LABEL></TD></TR>"+
					    	     "<TR><TD>No to Delete:</TD><TD><LABEL id ='DocDel'>0</LABEL></TD></TR>" +
					    	     "<TR><TD>New Documents:</TD><TD><LABEL id ='DocNew'>0</LABEL></TD></TR>"+
					    	     "<TR><TD>Modified Ddocuments:</TD><TD><LABEL id ='DocMod'>0</LABEL></TD></TR>"+
					    	     "<TR><TD>Local Documents:</TD><TD><LABEL id ='DocLoc'>0</LABEL></TD></TR></table>"
					    	     ]}),
					 new sap.m.Label({text:"Downloading Documents:"}),
		             oProgIndDL,


		            ],
		            
		            beforeOpen:function(){
		            	
		            }
		 })

	var formDisplayPhoto = new sap.m.Dialog("dlgDisplayPhoto",{
	    title:"Display Photo",
	    modal: true,
	    contentWidth:"1em",
	    buttons: [
	   
					new sap.m.Button( {
					    text: "Test",
					    type: 	sap.m.ButtonType.Reject,
					    tap: [ function(oEvt) {		  
							 
					    	formDisplayPhoto.close()
							  } ]
					}),
					new sap.m.Button( {
					    text: "Cancel",
					    type: 	sap.m.ButtonType.Reject,
					    tap: [ function(oEvt) {		  
							 
					    	formDisplayPhoto.close()
							  } ]
					})
					],					
	    content:[
				new sap.m.Image("img1",{
					src: selectedPhoto,
					width: "50px",
					height: "50px"
				}),
				new sap.m.Image("Ig22",{
					src: "images/Worker.jpg",
					width: "50px",
					height: "50px"
				}),
				new sap.m.Image("Ig3",{
					src: "xWorker.jpg",
					width: "50px",
					height: "50px"
				})

	            ],
	            
	            beforeOpen:function(){
	            	alert(selectedPhoto)
	            }
	 })
var formGetPhoto = new sap.m.Dialog("dlgGetPhoto",{
    title:"Attach Photo",
    modal: true,
    contentWidth:"1em",
    buttons: [
   
				new sap.m.Button( {
				    text: "Cancel",
				    type: 	sap.m.ButtonType.Reject,
				    tap: [ function(oEvt) {		  
						 
				    	formGetPhoto.close()
						  } ]
				})	
				],					
    content:[
		new sap.ui.layout.form.SimpleForm({
			minWidth : 1024,
			maxContainerCols : 2,
			content : [
		             new sap.m.Label({text:" "}),
					 new sap.m.Button( {
					    text: "Take Photo",
					    type: 	sap.m.ButtonType.Accept,
					    tap: [ function(oEvt) {		  
							 
					    	getPhoto(selectedPhotoType);
					    	formGetPhoto.close()
							  } ]
					 }),
					 new sap.m.Label({text:" "}),
					 new sap.m.Button( {
					    text: "Select Photo",
					    type: 	sap.m.ButtonType.Reject,
					    tap: [ function(oEvt) {		  
							 
					    	selectPhoto()
					    	formGetPhoto.close()
							  } ]
					 	})
				]
			})
            ],
            
            beforeOpen:function(){
            	try{
            		
            		DeviceStorageDirectory=cordova.file.externalApplicationStorageDirectory
            		AppDocDirectory="MyJobs"
            		if(device.platform=="iOS"){
            			DeviceStorageDirectory=cordova.file.dataDirectory
            			AppDocDirectory="documents/MyJobs"
            		}
            		localStorage.setItem("DeviceType",device.platform)
            	 }catch(err){
            		 localStorage.setItem("DeviceType","WINDOWS")
            	
            	 }
            }
 })
function selectPhoto(){

	 
	window.imagePicker.getPictures(
	    function(results) {
	        for (var i = 0; i < results.length; i++) {
	        	//alert('Image URI: ' + results[i]);
	            try {
	            	alert(DeviceStorageDirectory+AppDocDirectory+"/Private/Photos")
	  			  moveFile2(results[i], DeviceStorageDirectory+AppDocDirectory+"/Private/Photos",i)
	  			}
	  			catch(err) {
	  			   
	  			}  
	        }
	    }, function (error) {
	        opMessage('Error: ' + error);
	    }, {
	        maximumImagesCount: 10,
	        width: 800
	    }
	);
}
function showFile(file){
	window.plugins.fileOpener.open(file)
	//window.open(file, "_blank", 'location=yes,closebuttoncaption=Return') 
	
}
var formDocuments = new sap.m.Dialog("dlgDocuments",{
    title:"Documents",
    modal: true,
    contentWidth:"1em",
    buttons: [
 
  
                                new sap.m.Button( {
                                	icon:"sap-icon://pull-down",
                                    text: "All files",
                                    type: 	sap.m.ButtonType.Accept,
                                    tap: [ function(oEvt) { 
                                    	
                                    	
                                       	
                                    	formDownloadFiles.open()
                                       	
                                    	//downloadMissing();
                                    	//buildDocumentTables();
                                    	
                                              
                                                } ]
                                   
                                }),  
                                new sap.m.Button( {
                                	icon:"sap-icon://download",
                                    text: "files",
                                    type: 	sap.m.ButtonType.Accept,
                                    tap: [ function(oEvt) { 
                                    	
                                    	
                                       	
                                    	
                                    	downloadMissing();
                                    	buildDocumentTables();
                                    	
                                              
                                                } ]
                                   
                                }),  
                                new sap.m.Button( {
                                	icon:"sap-icon://sys-cancel",
                                    text: "Cancel",
                                    type: 	sap.m.ButtonType.Reject,
                                    tap: [ function(oEvt) {         
                                               
                                    	formDocuments.close()} ]   
                                })
                                ],                                
    content:[
buildDocumentList()
    
            ],
            beforeOpen:function(){
            	buildDocumentTables()
            	//buildPhotoList();
            	
            },
           contentWidth:"90%",
        	contentHeight: "90%",
     })

function buildDocumentList(){
	var asset_id=""
	var asset_name=""
	var asset_type=""
	
	
	
	var	docsTabBar  = new sap.m.IconTabBar('DocumentsTabBar',
				{
					expanded:'{device>/isNoPhone}',

					select:[function(oEvt) {	
						
						  if(oEvt.getParameters().key=="Global"){
							  //oDetailPage.setFooter(detailFooter)
							  }
						  if(oEvt.getParameters().key=="Download"){
							  //oDetailPage.setFooter(detailFooter)
							  }
						  if(oEvt.getParameters().key=="Upload"){
							  //oDetailPage.setFooter(detailFooter)
							  }
						  if(oEvt.getParameters().key=="Photos"){
							  //oDetailPage.setFooter(materialFooter)
							  }
						  
						}
					],
					
					items: [

	
	    	                new sap.m.IconTabFilter( {
	    	            	    key:'DocumentsGlobal',
	    	            	    tooltip: 'Global Documents',
	    	            	    icon: "sap-icon://documents",
	    	            	       	                   content:[
	    	            	       	        	               
	    	            									new sap.m.Table("DocumentsGlobalTable",{
	    	            										
	    	            										mode: sap.m.ListMode.SingleSelectMaster,
	    	        											selectionChange: function(evt){
	    	        												
		    	        												if(evt.getParameter("listItem").getCells()[2].getText()==""){
		    	        													
		    	        													buildGlobalDownloads(evt.getParameter("listItem").getCells()[5].getText())
		    	        												}else{
		    	        													showFile(evt.getParameter("listItem").getCells()[5].getText())
		    	        												}
	    	        													
	    	        												
	    	        										    },
	    	            										columns:[
	    	            										         new sap.m.Column({header: new sap.m.Label({text:""}),
	    	            										        	 hAlign: 'Left',width: '5%', minScreenWidth : "" , demandPopin: false}),
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Finename"}),
	    	            										        	 hAlign: 'Left',width: '35%', minScreenWidth : "" , demandPopin: false}),
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Type"}),
	    	            										        	 hAlign: 'Left',width: '15%',minScreenWidth : "" , demandPopin: true}),
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Size"}),
	    	            										        	 hAlign: 'Left',width: '15%',minScreenWidth : "" , demandPopin: true}),	    	            										        	 
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Last Modified"}),
	    	            										        	 hAlign: 'Left',width: '30%',minScreenWidth : "" , demandPopin: true }) ,
	    	            										        	 new sap.m.Column({header: new sap.m.Label({text:"Path"}),
		    	            										        	 hAlign: 'Left',width: '0%', minScreenWidth : "" , visible:false, demandPopin: false})    
	    	            								           	     ]
	    	            								           	  

	    	            									})
	    	            									]
	    	            						           	  
	    	            					    }),
/*	       	                
	    	                new sap.m.IconTabFilter( {
	    	            	    key:'DocumentsDownload',
	    	            	    tooltip: 'Download Documents',
	    	            	    icon: "sap-icon://download",
	    	            	       	                   content:[
	    	            	       	        	               
	    	            									new sap.m.Table("DocumentsDownloadTable",{
	    	            										
	    	            										mode: sap.m.ListMode.SingleSelectMaster,
	    	        											selectionChange: function(evt){
	    	        												showFile(evt.getParameter("listItem").getCells()[4].getText())
	    	        										    },
	    	            										columns:[
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Finename"}),
	    	            										        	 hAlign: 'Left',width: '40%', minScreenWidth : "" , demandPopin: false}),
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Type"}),
	    	            										        	 hAlign: 'Left',width: '15%',minScreenWidth : "" , demandPopin: true}),
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Size"}),
	    	            										        	 hAlign: 'Left',width: '15%',minScreenWidth : "" , demandPopin: true}),	    	            										        	 
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Last Modified"}),
	    	            										        	 hAlign: 'Left',width: '30%',minScreenWidth : "" , demandPopin: true }) ,
	    	            										        	 new sap.m.Column({header: new sap.m.Label({text:"Path"}),
		    	            										        	 hAlign: 'Left',width: '0%', minScreenWidth : "" , visible:false, demandPopin: false})    
	    	            								           	     ]
	    	            								           	  

	    	            									})
	    	            									]
	    	            						           	  
	    	            					    }),
	    	            					    
	    	                new sap.m.IconTabFilter( {
	    	            	    key:'DocumentsUpload',
	    	            	    tooltip: 'Upload Documents',
	    	            	    icon: "sap-icon://upload",
	    	            	       	                   content:[
	    	            	       	        	               
	    	            									new sap.m.Table("DocumentsUploadTable",{
	    	            										
	    	            										mode: sap.m.ListMode.SingleSelectMaster,
	    	            										selectionChange: function(evt){
	    	            											
	    	            											showFile(evt.getParameter("listItem").getCells()[4].getText())
	    	            									    },
	    	            										columns:[
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Finename"}),
	    	            										        	 hAlign: 'Left',width: '40%', minScreenWidth : "" , demandPopin: false}),
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Type"}),
	    	            										        	 hAlign: 'Left',width: '15%',minScreenWidth : "" , demandPopin: true}),
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Size"}),
	    	            										        	 hAlign: 'Left',width: '15%',minScreenWidth : "" , demandPopin: true}),	    	            										        	 
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Last Modified"}),
	    	            										        	 hAlign: 'Left',width: '30%',minScreenWidth : "" , demandPopin: true }),
	    	            										        	 new sap.m.Column({header: new sap.m.Label({text:"Path"}),
		    	            										        	 hAlign: 'Left',width: '0%', minScreenWidth : "" , visible:false, demandPopin: false})    
	    	            								           	     ]
	    	            								           	  

	    	            									})
	    	            									]
	    	            						           	  
	    	            					    }),
	    	            					   
	    	                new sap.m.IconTabFilter( {
	    	            	    key:'Photos',
	    	            	    tooltip: 'Photos',
	    	            	    icon: "sap-icon://attachment-photo",
	    	            	       	                   content:[
new sap.m.Button( {
  		icon:"sap-icon://camera",
       type: 	sap.m.ButtonType.Accept,
       tap: [ function(oEvt) {
    	   selectedPhotoType="DOC"
    	   formGetPhoto.open()
                   } ]
   }),     	            	       	        	               
	    	            									new sap.m.Table("PhotosTable",{
	    	            										mode: sap.m.ListMode.SingleSelectMaster,
	    	        											selectionChange: function(evt){
	    	        												//selectedPhoto=evt.getParameter("listItem").getCells()[4].getText();
	    	        												
	    	        												//formDisplayPhoto.open()
	    	        												showFile(evt.getParameter("listItem").getCells()[4].getText())
	    	        										    },
	    	            										columns:[
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Filename"}),
	    	            										        	 hAlign: 'Left',width: '50%', minScreenWidth : "" , demandPopin: false}),
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Type"}),
	    	            										        	 hAlign: 'Left',width: '15%',minScreenWidth : "" , demandPopin: true}),
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Size"}),
	    	            										        	 hAlign: 'Left',width: '15%',minScreenWidth : "" , demandPopin: true}),	    	            										        	 
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Last Modified"}),
	    	            										        	 hAlign: 'Left',width: '20%',minScreenWidth : "" , demandPopin: true }),
																		 new sap.m.Column({header: new sap.m.Label({text:""}),
	    	            	     										     hAlign: 'Right',width: '0%',minScreenWidth : "" , visible:false, demandPopin: true })         
	    	            								           	     ]
	    	            								           	  

	    	            									})
	    	            									]
	    	            						           	  
	    	            					    }),
*/	    	            					    
	       	                ]

				});
	return docsTabBar
}
function buildDocumentTables(){
	buildGlobalDownloads(AppDocDirectory+"/Global/Download/")
	//buildPrivateDownloads()
	//buildPrivateUploads()
	
}
//get photo and store locally
function getPhoto(caller) {
	getPhotoCaller=caller
    // Take picture using device camera and retrieve image as base64-encoded string
	//alert("about to take photo"+DeviceStorageDirectory)
	
    navigator.camera.getPicture(onGetPhotoDataSuccess, onGetPhotoDataFail, { quality: 50 });
}


//Callback function when the picture has been successfully taken
function onGetPhotoDataSuccess(imageData) {
    var currentdate = new Date();
    var datetime = (currentdate.getFullYear()).toString() + (currentdate.getMonth() + 1).toString() + (currentdate.getFullYear()).toString()
       + (currentdate.getHours()).toString()
                       + (currentdate.getMinutes()).toString()
                       + (currentdate.getSeconds()).toString();
    
	  try {
		  moveFile(imageData, DeviceStorageDirectory+AppDocDirectory+"/Private/Photos")
		}
		catch(err) {
		   
		}                    

}

//Callback function when the picture has not been successfully taken
function onGetPhotoDataFail(message) {
    alert('Failed to load picture because: ' + message);
}
function successMoveCallback(entry) {
 alert("New Path: " + entry.fullPath);
   
}

function errorMoveCallback(error) {
    alert("moveCallbackError:" + error.code+":" + error.source+":" + error.target)
    
}
function onDirectorySuccess(parent) {
    alert(" Directory created successfuly")
}

function onDirectoryFail(error) {
    //Error while creating directory
    alert("Unable to create new directory: " + error.code);

}

// fileUri = file:///emu/0/android/cache/something.jpg
function moveFile(fileUri,dir) {
	
	var opdir = dir;




    var currentdate = new Date();
    var datetime = (currentdate.getFullYear()).toString() + (currentdate.getMonth() + 1).toString() + (currentdate.getFullYear()).toString()
       + (currentdate.getHours()).toString()
                       + (currentdate.getMinutes()).toString()
                       + (currentdate.getSeconds()).toString();
    
                       oldFileUri = fileUri;
                       fileExt = "." + oldFileUri.split('.').pop();

                       newFileName = datetime + fileExt;
                  
                       window.resolveLocalFileSystemURL(fileUri, function (file) {
                    	                             
                           window.resolveLocalFileSystemURL(opdir, function (opdir) {
                        	                     	  
            file.moveTo(opdir, newFileName, function (entry) {
            	if(getPhotoCaller=="JOB"){
            		buildJobPhotoList();
            	}
            	if(getPhotoCaller=="DOC"){
            		//buildPhotoList();
            	}
            	
               
            }, function (error) {
            	
                alert("error moving:"+error.code+":"+error.source+":"+error.target);
            });
        }, errorMoveCallback);
    }, errorMoveCallback);
}
function moveFile2(fileUri,dir,cnt) {
	
	var opdir = dir;



    var currentdate = new Date();
    var datetime = (currentdate.getFullYear()).toString() + (currentdate.getMonth() + 1).toString() + (currentdate.getFullYear()).toString()
       + (currentdate.getHours()).toString()
                       + (currentdate.getMinutes()).toString()
                       + (currentdate.getSeconds()).toString();
    
                       oldFileUri = fileUri;
                       fileExt = "." + oldFileUri.split('.').pop();

                       newFileName = datetime +"_"+cnt+ fileExt;
                  
                       window.resolveLocalFileSystemURL(fileUri, function (file) {
                    	                             
                           window.resolveLocalFileSystemURL(opdir, function (opdir) {
                        	                     	  
            file.moveTo(opdir, newFileName, function (entry) {
            	if(getPhotoCaller=="JOB"){
            		buildJobPhotoList();
            	}
            	if(getPhotoCaller=="DOC"){
            		//buildPhotoList();
            	}
            	
               
            }, function (error) {
            	
                alert("error moving:"+error.code+":"+error.source+":"+error.target);
            });
        }, errorMoveCallback);
    }, errorMoveCallback);
}
function buildPhotoList(){
	
	privatephotos = new Array()
	var opTable = sap.ui.getCore().getElementById('PhotosTable');
	opTable.destroyItems();
	try {
		 window.resolveLocalFileSystemURL(DeviceStorageDirectory+AppDocDirectory+"/Private/Photos/", function (dirEntry) {
		    	
		        var directoryReader = dirEntry.createReader();
		          directoryReader.readEntries(photosReadSuccess, photosReadFail);
		    });
	}
	catch(err) {
	   //Not in Cordova
	}

	   

}

function photos_details_callback(f) {
    var d1 = new Date(f.lastModifiedDate);

    var opTable = sap.ui.getCore().getElementById('PhotosTable');
	opTable.addItem (new sap.m.ColumnListItem({
		cells : 
			[
			new sap.m.Text({text: f.name}),
            new sap.m.Text({text: f.type}),
            new sap.m.Text({text: f.size}),
			new sap.m.Text({text: d1.toString('yyyyMMdd')})  ,
			new sap.m.Text({text: DeviceStorageDirectory+AppDocDirectory+"/Private/Photos/"+f.name})
	 		]
		}));
}
function photosReadSuccess(entries) {
	
	
  
    var i;
    for (i = 0; i < entries.length; i++) {
       
        if (entries[i].isFile) {
            entries[i].file(photos_details_callback);

        } else {
            console.log('photosDirectory - ' + entries[i].name);
            
        }
    }
}
function photosReadFail(error) {
    alert("Failed to list Photos contents: "+ error);
}
function buildGlobalDownloads(dir)

{

   
	privatephotos = new Array()
	var opTable = sap.ui.getCore().getElementById("DocumentsGlobalTable");
	opTable.destroyItems();
if(dir!=AppDocDirectory+"/Global/Download/"){
	
		opTable.addItem (new sap.m.ColumnListItem({
			cells : 
				[
				new sap.ui.core.Icon({src : "sap-icon://response"}),
				new sap.m.Text({text: ""}),
	            new sap.m.Text({text: ""}),
	            new sap.m.Text({text: ""}),
				new sap.m.Text({text: ""}),
				new sap.m.Text({text: GlobalDirectory})
		 		]
			}));
}
GlobalDirectory=dir;
	try {
		window.resolveLocalFileSystemURL(DeviceStorageDirectory+dir, function (dirEntry) {
	    	
	        var directoryReader = dirEntry.createReader();
	          directoryReader.readEntries(docsGDReadSuccess, docsGDReadFail);
	    });
	}
	catch(err) {
	   //Not in Cordova
	}
	    

}
function docsGDReadFail(error) {
    alert("Failed to list Photos contents: "+ error);
}
function gddocs_details_callback(f) {
    var d1 = new Date(f.lastModifiedDate);

    var opTable = sap.ui.getCore().getElementById("DocumentsGlobalTable");
    if(f.type!=""){
    	x=f.type.split("/")
    	y=d1.toString('yyyyMMdd')
    	z=y.substring(0,24)	
		opTable.addItem (new sap.m.ColumnListItem({
			cells : 
				[
				new sap.ui.core.Icon({src : "sap-icon://document-text"}),
				new sap.m.Text({text: f.name}),
	            new sap.m.Text({text: x[1]}),
	            new sap.m.Text({text: f.size}),
				new sap.m.Text({text: z}),
				new sap.m.Text({text: DeviceStorageDirectory+GlobalDirectory+f.name})
		 		]
			}));
    }
}
function docsGDReadSuccess(entries) {
	 var opTable = sap.ui.getCore().getElementById("DocumentsGlobalTable");
	
  
    var i;
    for (i = 0; i < entries.length; i++) {
       
        if (entries[i].isFile) {
        	
            entries[i].file(gddocs_details_callback);

        } else {
        	opTable.addItem (new sap.m.ColumnListItem({
        		cells : 
        			[
        			new sap.ui.core.Icon({src : "sap-icon://folder"}),
        			new sap.m.Text({text: entries[i].name}),
                    new sap.m.Text({text: ""}),
                    new sap.m.Text({text:""}),
        			new sap.m.Text({text: ""}),
        			new sap.m.Text({text: GlobalDirectory+entries[i].name+"/"})
        	 		]
        		}));
            
       }
    }
}
function buildPrivateUploads()

{

	privatephotos = new Array()
	var opTable = sap.ui.getCore().getElementById('DocumentsUploadTable');
	opTable.destroyItems();
	try {
		window.resolveLocalFileSystemURL(DeviceStorageDirectory+AppDocDirectory+"/Private/Upload/", function (dirEntry) {
	    	
	        var directoryReader = dirEntry.createReader();
	          directoryReader.readEntries(docsPUReadSuccess, docsPUReadFail);
	    });
	}
	catch(err) {
	   //Not in Cordova
	}

	    

}
function docsPUReadFail(error) {
    alert("Failed to list Photos contents: "+ error);
}
function pudocs_details_callback(f) {
    var d1 = new Date(f.lastModifiedDate);
    var opTable = sap.ui.getCore().getElementById('DocumentsUploadTable');
	opTable.addItem (new sap.m.ColumnListItem({
		cells : 
			[
			new sap.m.Text({text: f.name}),
            new sap.m.Text({text: f.type}),
            new sap.m.Text({text: f.size}),
			new sap.m.Text({text: d1.toString('yyyyMMdd')}),
			  new sap.m.Text({text: DeviceStorageDirectory+AppDocDirectory+"/Private/Upload/"+f.name})
	 		]
		}));
}
function docsPUReadSuccess(entries) {
	
	
  
    var i;
    for (i = 0; i < entries.length; i++) {
       
        if (entries[i].isFile) {
            entries[i].file(pudocs_details_callback);

        } else {
            console.log('docsDirectory - ' + entries[i].name);
            
        }
    }
}

function buildPrivateDownloads()

{

	privatephotos = new Array()
	var opTable = sap.ui.getCore().getElementById('DocumentsDownloadTable');
	opTable.destroyItems();

	try {
		  window.resolveLocalFileSystemURL(DeviceStorageDirectory+AppDocDirectory+"/Private/Download/", function (dirEntry) {
		    	
		        var directoryReader = dirEntry.createReader();
		          directoryReader.readEntries(docsPDReadSuccess, docsPDReadFail);
		    });
	}
	catch(err) {
	   //Not in Cordova
	}

	  

}
function docsPDReadFail(error) {
    alert("Failed to list Photos contents: "+ error);
}
function pddocs_details_callback(f) {
    var d1 = new Date(f.lastModifiedDate);
    var opTable = sap.ui.getCore().getElementById('DocumentsDownloadTable');
	opTable.addItem (new sap.m.ColumnListItem({
		cells : 
			[
			new sap.m.Text({text: f.name}),
            new sap.m.Text({text: f.type}),
            new sap.m.Text({text: f.size}),
			new sap.m.Text({text: d1.toString('yyyyMMdd')}),
			  new sap.m.Text({text: DeviceStorageDirectory+AppDocDirectory+"/Private/Download/"+f.name}) 
	 		]
		}));
}
function docsPDReadSuccess(entries) {
	
	
  
    var i;
    for (i = 0; i < entries.length; i++) {
       
        if (entries[i].isFile) {
            entries[i].file(pddocs_details_callback);

        } else {
            console.log('docsDirectory - ' + entries[i].name);
            
        }
    }
}


function createDir(rootDirEntry, folders) {
  // Throw out './' or '/' and move on to prevent something like '/foo/.//bar'.
  if (folders[0] == '.' || folders[0] == '') {
    folders = folders.slice(1);
  }
  rootDirEntry.getDirectory(folders[0], {create: true}, function(dirEntry) {
    // Recursively add the new subfolder (if we still have another to create).
    if (folders.length) {
      createDir(dirEntry, folders.slice(1));
    }
  }, errorHandler);
};



function errorHandler(error){

	    alert("Failed to create The Directories: "+ error);
	}
var fileDownloadCnt=0;
var percentagedownloaded=0;
var filesToDownload = [];
function downloadAll()
{

			document.getElementById('DocTot').innerHTML="0"
			document.getElementById('DocDel').innerHTML="0"
			document.getElementById('DocNew').innerHTML="0"
			document.getElementById('DocMod').innerHTML="0"
			document.getElementById('DocLoc').innerHTML="0"

	oProgInd.setPercentValue(5);
	oProgInd.setDisplayValue("5" + "%");
	percentagedownloaded=0;
	filesToDownload = [];
	
    //$.getJSON(localStorage.getItem("DOCSERVER")+'ListDirjson1.php?directory=MyJobs/Global/download', function (data) {
    	$.getJSON("TestData\\ListDir.json", function (data) {    
    	filesToDownload=data;
        var cnt = 0;
        st=getFormattedTime()
     
    	if(filesToDownload.FILES.length>0){
    		fileDownloadCnt=0;
    		//checkFileDownload();
    	
    		updateDocumemntsStatus("*","","","","","DELETE")
    	
    		
    		
    		}else{
    		oProgInd.setPercentValue(100);
        	oProgInd.setDisplayValue("100" + "%");
    		}
       
        
    }).success(function() { 
    	
    	})
    .error(function() { 
    	alert("error"); 
		oProgInd.setPercentValue(100);
    	oProgInd.setDisplayValue("100" + "%");
    })
    .complete(function() { 
    	
    	

    	
    	
    	});
    
  
	
}
function BuildDocumentsTable() { 

	
	//  create a loop function
	   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
		   if(fileDownloadCnt<filesToDownload.FILES.length){
		      updateDocumemntsTable(escape(filesToDownload.FILES[fileDownloadCnt].url),escape(filesToDownload.FILES[fileDownloadCnt].name),filesToDownload.FILES[fileDownloadCnt].type,
		    		  filesToDownload.FILES[fileDownloadCnt].size,filesToDownload.FILES[fileDownloadCnt].lastmod)
	           fileDownloadCnt++;
	           sPercent=getPercentage(filesToDownload.FILES.length,fileDownloadCnt)
	        	if(sPercent < 5){sPercent=5}
	        	if(sPercent!=oProgInd.getPercentValue())
					{
	        		
	        		oProgInd.setPercentValue(sPercent);
	            	oProgInd.setDisplayValue(sPercent + "%");
					}
	        	BuildDocumentsTable();
			   
			}else 
				{
				oProgInd.setPercentValue(100);
			    oProgInd.setDisplayValue("100" + "%");
			   
			    updateDocsTable()

				}

	   }, 10)
	}



function checkFileDownload () { 
	
		
	//  create a loop function
	   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
		   if(fileDownloadCnt<filesToDownload.length){
		       fileName = filesToDownload[fileDownloadCnt].name;
	           window.resolveLocalFileSystemURL(DeviceStorageDirectory+filesToDownload[fileDownloadCnt].url+"/"  + filesToDownload[fileDownloadCnt].name, appStart, downloadAllAsset(filesToDownload[fileDownloadCnt].name, filesToDownload[fileDownloadCnt].url+"/"));
	           fileDownloadCnt++;
	           sPercent=getPercentage(filesToDownload.length,fileDownloadCnt)
	        	if(sPercent < 5){sPercent=5}
	        	if(sPercent!=oProgInd.getPercentValue())
					{
	        		
	        		oProgIndDL.setPercentValue(sPercent);
	            	oProgIndDL.setDisplayValue(sPercent + "%");
					}
	        	
			   checkFileDownload(); 	
			}else 
				{
				
				oProgIndDL.setPercentValue(100);
			    oProgIndDL.setDisplayValue("100" + "%");			
				}

	   }, 10)
	}
function getPercentage(tot,val){
	
	var y = Math.round(tot/100) ;
	
	var percent = val / y

	return Math.round(percent) ;
}
function downloadMissing()
{
		
    $.getJSON(localStorage.getItem("DOCSERVER")+'ListDirjson.php?directory=MyJobs/POSTRIDGE/download', function (data) {
        downloadCount = 0
        
        alert("private"+data.FILES.length)
        var cnt = 0;
        $.each(data.FILES, function (index) {
            fileName = data.FILES[index].name;
            
            window.resolveLocalFileSystemURL(DeviceStorageDirectory+AppDocDirectory+"/Private/Download/" + data.FILES[index].name, appStart, downloadAsset(data.FILES[index].name,AppDocDirectory+"/Private/Download/"));
            cnt = cnt + 1;
           
        });
    });

    $.getJSON(localStorage.getItem("DOCSERVER")+'ListDirjson.php?directory=MyJobs/Global/download', function (data) {
        downloadCount = 0
        alert("Global"+data.FILES.length)
        var cnt = 0;
        $.each(data.FILES, function (index) {
            fileName = data.FILES[index].name;
            window.resolveLocalFileSystemURL( DeviceStorageDirectory+ data.FILES[index].name, appStart, downloadAsset(data.FILES[index].name, AppDocDirectory+"/Global/Download/"));
            cnt = cnt + 1;
        });
    });
  
}
function downloadLiveLink(fn,node,drawid)
{
	
	try
	{
     window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory+AppDocDirectory+"/LiveLink/" + fn, appStart, downloadLiveLinkFile(fn,AppDocDirectory+"/LiveLink/",node,drawid));
	}
	  catch (err) {
  
	  window.open("http://10.193.162.118/otcs/llisapi.dll?func=LL.login&UserName=Admin&Password=H3nd3rs0n2&NextURL=/otcs/llisapi.dll%3ffunc%3dll%26objId%3d"+node+"%26objAction%3ddownload" ) 
  }
   
}
function downloadLiveLinkFile(fileName,dir,node,drawid) {
	
    var fileTransfer = new FileTransfer();
   
    llurl="http://10.193.162.118/otcs/llisapi.dll?func=LL.login&UserName=Admin&Password=H3nd3rs0n2&NextURL=/otcs/llisapi.dll%3ffunc%3dll%26objId%3d"+node+"%26objAction%3ddownload"
    alert(llurl + fileName + " to " +dir );
    fileTransfer.download(llurl, cordova.file.externalApplicationStorageDirectory + dir + node + "_" + fileName,
		function (entry) {
		    alert(" ll Downloaded")
		    updateMyJobDetsDraw(drawid,dir + node + "_" + fileName)
		   
		},
		function (error) {
		    
		    alert("download error " + error.source+ ":" + error.target+": " + error.code);
	
		    
		});
alert("About to Open")
window.open(llurl, "_blank", 'location=yes,closebuttoncaption=Return') 
}
function downloadAsset1(fileName) {
    var fileTransfer = new FileTransfer();
    x=fileName.split("/")
    alert("About to start transfer " + localStorage.getItem("DOCSERVER")+  fileName + " to " + cordova.file.dataDirectory  + x[3]);
    fileTransfer.download(localStorage.getItem("DOCSERVER") + fileName, cordova.file.externalApplicationStorageDirectory+ x[3],
		function (entry) {
		    alert("xx"+cordova.file.dataDirectory  + x[3]+":::"+entry.fullPath)
		   
		},
		function (error) {
		    
		    alert("xxdownload error " + error.source+ ":" + error.target+": " + error.code);
	
		    
		});
}
function downloadAsset(fileName,dir) {
    var fileTransfer = new FileTransfer();
    x=fileName.split("/")
    //alert("About to start transfer " + localStorage.getItem("DOCSERVER") + fileName + " to " + cordova.file.externalApplicationStorageDirectory + dir + x[3]);
    fileTransfer.download(localStorage.getItem("DOCSERVER")+ fileName, cordova.file.externalApplicationStorageDirectory + dir + x[3],
		function (entry) {
		    //alert(entry.fullPath)
		   
		},
		function (error) {
		    
		    alert("download error " + error.source+ ":" + error.target+": " + error.code);
	
		    
		});
}
function downloadAllAsset(fileName,dir) {
    var fileTransfer = new FileTransfer();
   
    //alert("About to start transfer " + localStorage.getItem("DOCSERVER") + fileName + " to " + cordova.file.externalApplicationStorageDirectory + dir + x[3]);
    fileTransfer.download(localStorage.getItem("DOCSERVER")+dir+"/" + fileName, cordova.file.externalApplicationStorageDirectory + dir + "/"+fileName,
		function (entry) {
    	opMessage("Downloading"+entry.fullPath)
		   
		},
		function (error) {
		    
		    //alert("download error " + error.source+ ":" + error.target+": " + error.code);
	
		    
		});
}
function appStart() {
    //alert(downloadCount+" Downloaded")
}
function appStartLL() {
    alert(" LL Download starting")
}	

