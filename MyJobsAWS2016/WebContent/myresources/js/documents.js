var globaldocs = new Array()
var privatedownload = new Array()
var privateupload = new Array()
var privatephotos = new Array()
var downloadCount;
var getPhotoCaller="DOC"
var selectedDocTable=""
var selectedPhoto=""
	var GlobalDirectory=""
	var appDirectory=""
		var oProgInd= new sap.m.ProgressIndicator("pi1", {
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
		             oProgInd


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
                                    text: "Photo",
                                    type: 	sap.m.ButtonType.Accept,
                                    tap: [ function(oEvt) { 
                                    	
                                    	
                                       	
                                       	
                                       	
                                    	getPhoto("DOC");
                                    	
                                              
                                                } ]
                                   
                                }),   
                                new sap.m.Button( {
                                    text: "All files",
                                    type: 	sap.m.ButtonType.Accept,
                                    tap: [ function(oEvt) { 
                                    	
                                    	
                                       	
                                    	formDownloadFiles.open()
                                       	
                                    	//downloadMissing();
                                    	//buildDocumentTables();
                                    	
                                              
                                                } ]
                                   
                                }),  
                                new sap.m.Button( {
                                    text: "files",
                                    type: 	sap.m.ButtonType.Accept,
                                    tap: [ function(oEvt) { 
                                    	
                                    	
                                       	
                                    	
                                    	downloadMissing();
                                    	buildDocumentTables();
                                    	
                                              
                                                } ]
                                   
                                }),  
                                new sap.m.Button( {
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
            	buildPhotoList();
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
	    	            	       	        	               
	    	            									new sap.m.Table("PhotosTable",{
	    	            										mode: sap.m.ListMode.SingleSelectMaster,
	    	        											selectionChange: function(evt){
	    	        												//selectedPhoto=evt.getParameter("listItem").getCells()[4].getText();
	    	        												
	    	        												//formDisplayPhoto.open()
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
	    	            	 										       	 new sap.m.Column({header: new sap.m.Button( {
	    	            	  										       		icon:"sap-icon://camera",
	    	            	  		    	                                    type: 	sap.m.ButtonType.Accept,
	    	            	  		    	                                    tap: [ function(oEvt) { 
	    	            	  		    	                                    	
	    	            	  		    	                                    	
	    	            	  		    	                                       	
	    	            	  		    	                                       	
	    	            	  		    	                                       	
	    	            	  		    	                                    	getPhoto("JOB");
	    	            	  		    	                                    	
	    	            	  		    	                                              
	    	            	  		    	                                                } ]
	    	            	  		    	                                   
	    	            	  		    	                                }),
	    	            	     										       	 hAlign: 'Right',width: '10%',minScreenWidth : "" , hidden:true, demandPopin: true })         
	    	            								           	     ]
	    	            								           	  

	    	            									})
	    	            									]
	    	            						           	  
	    	            					    }),
	       	                ]

				});
	return docsTabBar
}
function buildDocumentTables(){
	buildGlobalDownloads("MyJobs/Global/Download/")
	buildPrivateDownloads()
	buildPrivateUploads()
	
}
//get photo and store locally
function getPhoto(caller) {
	getPhotoCaller=caller
    // Take picture using device camera and retrieve image as base64-encoded string
	//alert("about to take photo"+cordova.file.externalApplicationStorageDirectory)
	
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
		  moveFile(imageData, cordova.file.externalApplicationStorageDirectory+"MyJobs/Private/Photos")
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
            	if(getPhotoCaller=="JOB"){
            		buildPhotoList();
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
		 window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory+"MyJobs/Private/Photos/", function (dirEntry) {
		    	
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
			new sap.m.Text({text: cordova.file.externalApplicationStorageDirectory+"MyJobs/Private/Photos/"+f.name})
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
GlobalDirectory=dir;

	privatephotos = new Array()
	var opTable = sap.ui.getCore().getElementById("DocumentsGlobalTable");
	opTable.destroyItems();

	try {
		window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory+dir, function (dirEntry) {
	    	
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
    var icon="document-text"
    if(f.Type=="DIRECTORY"){
    	icon="folder"
    	ftype="";
    	fsize=""
    	fdate="";
    }else{
    	ftype=f.type
    	fsize=f.size;
    	fdate=d1.toString('yyyyMMdd');
    }
    var opTable = sap.ui.getCore().getElementById("DocumentsGlobalTable");
	opTable.addItem (new sap.m.ColumnListItem({
		cells : 
			[
			new sap.ui.core.Icon({src : "sap-icon://"+icon}),
			new sap.m.Text({text: f.name}),
            new sap.m.Text({text: ftype}),
            new sap.m.Text({text: fsize}),
			new sap.m.Text({text: fdate}),
			new sap.m.Text({text: cordova.file.externalApplicationStorageDirectory+GlobalDirectory+f.name})
	 		]
		}));
}
function docsGDReadSuccess(entries) {
	
	
  
    var i;
    for (i = 0; i < entries.length; i++) {
       
        if (entries[i].isFile) {
            entries[i].file(gddocs_details_callback);

        } else {
            console.log('docsDirectory - ' + entries[i].name);
            
        }
    }
}
function buildPrivateUploads()

{

	privatephotos = new Array()
	var opTable = sap.ui.getCore().getElementById('DocumentsUploadTable');
	opTable.destroyItems();
	try {
		window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory+"MyJobs/Private/Upload/", function (dirEntry) {
	    	
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
			  new sap.m.Text({text: cordova.file.externalApplicationStorageDirectory+"MyJobs/Private/Upload/"+f.name})
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
		  window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory+"MyJobs/Private/Download/", function (dirEntry) {
		    	
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
			  new sap.m.Text({text: cordova.file.externalApplicationStorageDirectory+"MyJobs/Private/Download/"+f.name}) 
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


function downloadAll()
{
	
	oProgInd.setPercentValue(5);
	oProgInd.setDisplayValue("5" + "%");

    $.getJSON('http://ostridge.synology.me/ListDirjson1.php?directory=MyJobs/Global/download', function (data) {
        

        var cnt = 0;
        st=getFormattedTime()
        $.each(data.FILES, function (index) {
        	sPercent=getPercentage(data.FILES.length,cnt)
        	if(sPercent < 5){sPercent=5}
        	oProgInd.setPercentValue(sPercent);
        	oProgInd.setDisplayValue(sPercent + "%");
            fileName = data.FILES[index].name;
            window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory+data.FILES[index].url+"/"  + data.FILES[index].name, appStart, downloadAllAsset(data.FILES[index].name, data.FILES[index].url+"/"));
            cnt = cnt + 1;

        });
        oProgInd.setPercentValue(100);
    	oProgInd.setDisplayValue(100 + "%");
    	alert("FieTransfer:"+st+" to "+getFormattedTime())
    });
   
}
function getPercentage(tot,val){
	
	var y = Math.round(tot/100) ;
	
	var percent = val / y

	return Math.round(percent) ;
}
function downloadMissing()
{
	
	
    $.getJSON('http://ostridge.synology.me/ListDirjson.php?directory=MyJobs/POSTRIDGE/download', function (data) {
        downloadCount = 0
        
        alert("private"+data.FILES.length)
        var cnt = 0;
        $.each(data.FILES, function (index) {
            fileName = data.FILES[index].name;
            
            window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory+"MyJobs/Private/Download/" + data.FILES[index].name, appStart, downloadAsset(data.FILES[index].name,"MyJobs/Private/Download/"));
            cnt = cnt + 1;
           
        });
    });

    $.getJSON('http://ostridge.synology.me/ListDirjson.php?directory=MyJobs/Global/download', function (data) {
        downloadCount = 0
        alert("Global"+data.FILES.length)
        var cnt = 0;
        $.each(data.FILES, function (index) {
            fileName = data.FILES[index].name;
            window.resolveLocalFileSystemURL( + data.FILES[index].name, appStart, downloadAsset(data.FILES[index].name, "MyJobs/Global/Download/"));
            cnt = cnt + 1;

        });
    });
   
}
function downloadAsset1(fileName) {
    var fileTransfer = new FileTransfer();
    x=fileName.split("/")
    alert("About to start transfer " + "http://ostridge.synology.me/" + fileName + " to " + cordova.file.dataDirectory  + x[3]);
    fileTransfer.download("http://ostridge.synology.me/" + fileName, cordova.file.externalApplicationStorageDirectory+ x[3],
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
    //alert("About to start transfer " + "http://ostridge.synology.me/" + fileName + " to " + cordova.file.externalApplicationStorageDirectory + dir + x[3]);
    fileTransfer.download("http://ostridge.synology.me/" + fileName, cordova.file.externalApplicationStorageDirectory + dir + x[3],
		function (entry) {
		    //alert(entry.fullPath)
		   
		},
		function (error) {
		    
		    alert("download error " + error.source+ ":" + error.target+": " + error.code);
	
		    
		});
}
function downloadAllAsset(fileName,dir) {
    var fileTransfer = new FileTransfer();
   
    //alert("About to start transfer " + "http://ostridge.synology.me/" + fileName + " to " + cordova.file.externalApplicationStorageDirectory + dir + x[3]);
    fileTransfer.download("http://ostridge.synology.me/"+dir+"/" + fileName, cordova.file.externalApplicationStorageDirectory + dir + "/"+fileName,
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
	

