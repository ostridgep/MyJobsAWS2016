var docs = new Array()
var downloadCount;
var formDocuments = new sap.m.Dialog("dlgDocuments",{
    title:"Documents",
    modal: true,
    contentWidth:"1em",
    buttons: [
new sap.m.Button( {
    text: "Photolist",
    type: 	sap.m.ButtonType.Accept,
    tap: [ function(oEvt) { 
    	
    	
       	
       	
       	
    	
    	
        buildGlobalList()      
                } ]
   
}), 
                                new sap.m.Button( {
                                    text: "Save",
                                    type: 	sap.m.ButtonType.Accept,
                                    tap: [ function(oEvt) { 
                                    	
                                    	
                                       	
                                       	
                                       	
                                    	formDocuments.close()
                                              
                                                } ]
                                   
                                }),   
                                new sap.m.Button( {
                                    text: "Photo",
                                    type: 	sap.m.ButtonType.Accept,
                                    tap: [ function(oEvt) { 
                                    	
                                    	
                                       	
                                       	
                                       	
                                    	getPhoto();
                                    	
                                              
                                                } ]
                                   
                                }),   
                                new sap.m.Button( {
                                    text: "files",
                                    type: 	sap.m.ButtonType.Accept,
                                    tap: [ function(oEvt) { 
                                    	
                                    	
                                       	
                                       	
                                       	
                                    	downloadMissing();
                                    	//buildPhotoList()
                                              
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
	    	            											
	    	            											//selectedReserverMaterial=oEvt.getParameter("selectedItem").getKey()
	    	            											
	    	            											//sap.ui.getCore().byId("NewGroup").getSelectedItem().getKey()
	    	            											//selectedCharacteristic=evt.getParameter("listItem").getCells()[0].getText()+":"+evt.getParameter("listItem").getCells()[1].getText()+":"+evt.getParameter("listItem").getCells()[2].getText()
	    	            											//formAssetCharacteristic.open()
	    	            									    },
	    	            										columns:[
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Finename"}),
	    	            										        	 hAlign: 'Left',width: '40%', minScreenWidth : "" , demandPopin: false}),
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Type"}),
	    	            										        	 hAlign: 'Left',width: '15%',minScreenWidth : "" , demandPopin: true}),
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Size"}),
	    	            										        	 hAlign: 'Left',width: '15%',minScreenWidth : "" , demandPopin: true}),	    	            										        	 
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Last Modified"}),
	    	            										        	 hAlign: 'Left',width: '30%',minScreenWidth : "" , demandPopin: true })       	                         
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
	    	            											
	    	            											//selectedReserverMaterial=oEvt.getParameter("selectedItem").getKey()
	    	            											
	    	            											//sap.ui.getCore().byId("NewGroup").getSelectedItem().getKey()
	    	            											//selectedCharacteristic=evt.getParameter("listItem").getCells()[0].getText()+":"+evt.getParameter("listItem").getCells()[1].getText()+":"+evt.getParameter("listItem").getCells()[2].getText()
	    	            											//formAssetCharacteristic.open()
	    	            									    },
	    	            										columns:[
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Finename"}),
	    	            										        	 hAlign: 'Left',width: '40%', minScreenWidth : "" , demandPopin: false}),
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Type"}),
	    	            										        	 hAlign: 'Left',width: '15%',minScreenWidth : "" , demandPopin: true}),
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Size"}),
	    	            										        	 hAlign: 'Left',width: '15%',minScreenWidth : "" , demandPopin: true}),	    	            										        	 
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Last Modified"}),
	    	            										        	 hAlign: 'Left',width: '30%',minScreenWidth : "" , demandPopin: true })       	                         
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
	    	            											
	    	            											//selectedReserverMaterial=oEvt.getParameter("selectedItem").getKey()
	    	            											
	    	            											//sap.ui.getCore().byId("NewGroup").getSelectedItem().getKey()
	    	            											//selectedCharacteristic=evt.getParameter("listItem").getCells()[0].getText()+":"+evt.getParameter("listItem").getCells()[1].getText()+":"+evt.getParameter("listItem").getCells()[2].getText()
	    	            											//formAssetCharacteristic.open()
	    	            									    },
	    	            										columns:[
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Finename"}),
	    	            										        	 hAlign: 'Left',width: '40%', minScreenWidth : "" , demandPopin: false}),
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Type"}),
	    	            										        	 hAlign: 'Left',width: '15%',minScreenWidth : "" , demandPopin: true}),
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Size"}),
	    	            										        	 hAlign: 'Left',width: '15%',minScreenWidth : "" , demandPopin: true}),	    	            										        	 
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Last Modified"}),
	    	            										        	 hAlign: 'Left',width: '30%',minScreenWidth : "" , demandPopin: true })       	                         
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
	    	            											
	    	            											//selectedReserverMaterial=oEvt.getParameter("selectedItem").getKey()
	    	            											
	    	            											//sap.ui.getCore().byId("NewGroup").getSelectedItem().getKey()
	    	            											//selectedCharacteristic=evt.getParameter("listItem").getCells()[0].getText()+":"+evt.getParameter("listItem").getCells()[1].getText()+":"+evt.getParameter("listItem").getCells()[2].getText()
	    	            											//formAssetCharacteristic.open()
	    	            									    },
	    	            										columns:[
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Finename"}),
	    	            										        	 hAlign: 'Left',width: '40%', minScreenWidth : "" , demandPopin: false}),
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Type"}),
	    	            										        	 hAlign: 'Left',width: '15%',minScreenWidth : "" , demandPopin: true}),
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Size"}),
	    	            										        	 hAlign: 'Left',width: '15%',minScreenWidth : "" , demandPopin: true}),	    	            										        	 
	    	            										         new sap.m.Column({header: new sap.m.Label({text:"Last Modified"}),
	    	            										        	 hAlign: 'Left',width: '30%',minScreenWidth : "" , demandPopin: true })       	                         
	    	            								           	     ]
	    	            								           	  

	    	            									})
	    	            									]
	    	            						           	  
	    	            					    }),
	       	                ]


				});
	return docsTabBar
}
function buildDocumentTables(){
	var n = 0;
	var opTable = sap.ui.getCore().getElementById('DocumentsGlobalTable');
	sap.ui.getCore().getElementById('DocumentsGlobalTable').destroyItems();
	while (n < 4) {
		

		opTable.addItem (new sap.m.ColumnListItem({
			cells : 
				[
				new sap.m.Text({text: "GFile"+n+".txt"}),
	            new sap.m.Text({text: "Doc"}),
	            new sap.m.Text({text: n*1000}),
				new sap.m.Text({text:  "2016-01-01 13:0"+n})   
		 		]
			}));
		n++;
	 }
	var n = 0;
	var opTable = sap.ui.getCore().getElementById('DocumentsDownloadTable');
	sap.ui.getCore().getElementById('DocumentsDownloadTable').destroyItems();
	while (n < 4) {
		

		opTable.addItem (new sap.m.ColumnListItem({
			cells : 
				[
				new sap.m.Text({text: "DownloadFile"+n+".txt"}),
	            new sap.m.Text({text: "Doc"}),
	            new sap.m.Text({text: n*1000}),
				new sap.m.Text({text:  "2016-01-01 13:0"+n})   
		 		]
			}));
		n++;
	 }
	var n = 0;
	var opTable = sap.ui.getCore().getElementById('DocumentsUploadTable');
	sap.ui.getCore().getElementById('DocumentsUploadTable').destroyItems();
	while (n < 4) {
		

		opTable.addItem (new sap.m.ColumnListItem({
			cells : 
				[
				new sap.m.Text({text: "UploadFile"+n+".txt"}),
	            new sap.m.Text({text: "Doc"}),
	            new sap.m.Text({text: n*1000}),
				new sap.m.Text({text:  "2016-01-01 13:0"+n})   
		 		]
			}));
		n++;
	 }
	var n = 0;
	var opTable = sap.ui.getCore().getElementById('PhotosTable');
	sap.ui.getCore().getElementById('PhotosTable').destroyItems();
	while (n < 4) {
		

		opTable.addItem (new sap.m.ColumnListItem({
			cells : 
				[
				new sap.m.Text({text: "PhotoFile"+n+".txt"}),
	            new sap.m.Text({text: "Doc"}),
	            new sap.m.Text({text: n*1000}),
				new sap.m.Text({text:  "2016-01-01 13:0"+n})   
		 		]
			}));
		n++;
	 }
}
//get photo and store locally
function getPhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
	alert("about to take photo"+cordova.file.applicationStorageDirectory)
	
    navigator.camera.getPicture(onGetPhotoDataSuccess, onGetPhotoDataFail, { quality: 50 });
}


//Callback function when the picture has been successfully taken
function onGetPhotoDataSuccess(imageData) {
    var currentdate = new Date();
    var datetime = (currentdate.getFullYear()).toString() + (currentdate.getMonth() + 1).toString() + (currentdate.getFullYear()).toString()
       + (currentdate.getHours()).toString()
                       + (currentdate.getMinutes()).toString()
                       + (currentdate.getSeconds()).toString();
    alert(imageData)
    //moveFile(imageData, cordova.file.dataDirectory+"MyJobs/Private/Photos/")
moveFile(imageData, cordova.file.applicationStorageDirectory+"files/MyJobs/Private/Photos")
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
           
            file.copyTo(opdir, newFileName, function (entry) {
            	alert("moved to "+entry.fullPath)
            	
               
            }, function (error) {
            	alert(opdir+":"+newFileName)
                alert("error moving:"+error.code+":"+error.source+":"+error.target);
            	moveFile(fileUri,cordova.file.applicationStorageDirectory+"files/MyJobs/Private/Photos")
            });
        }, errorMoveCallback);
    }, errorMoveCallback);
}

function buildPhotoList(){
	alert("building Photo List")
	listFiles(cordova.file.applicationStorageDirectory+"files/MyJobs/Private/Photos")
	var opTable = sap.ui.getCore().getElementById('PhotosTable');
	sap.ui.getCore().getElementById('PhotosTable').destroyItems();
	var photoLength = photos.length;
	alert("total Photos"+photoLength)
	for (var i = 0; i < photoLength; i++) {
	    photodets=photos[i].split(":");
		opTable.addItem (new sap.m.ColumnListItem({
			cells : 
				[
				new sap.m.Text({text: photodets[0]}),
	            new sap.m.Text({text: photodets[1]}),
	            new sap.m.Text({text: photodets[2]}),
				new sap.m.Text({text: photodets[3]})   
		 		]
			}));
	}
	
	

}
function buildGlobalList(){
	alert("building Private List")
	listFiles(cordova.file.applicationStorageDirectory+"/files/MyJobs/Private/Download/")
	var opTable = sap.ui.getCore().getElementById('DocumentsGlobalTable');
	sap.ui.getCore().getElementById('DocumentsGlobalTable').destroyItems();
	var docsLength = docs.length;
	alert("total Private"+docsLength)
	for (var i = 0; i < docsLength; i++) {
	    docsdets=docs[i].split(":");
		opTable.addItem (new sap.m.ColumnListItem({
			cells : 
				[
				new sap.m.Text({text: docsdets[0]}),
	            new sap.m.Text({text: docsdets[1]}),
	            new sap.m.Text({text: docsdets[2]}),
				new sap.m.Text({text: docsdets[3]})   
		 		]
			}));
	}
	
	

}

function listFiles(dir) {
  
    alert("listing files"+dir)
    window.resolveLocalFileSystemURL(dir, function (dirEntry) {
        var directoryReader = dirEntry.createReader();
          directoryReader.readEntries(dirReadSuccess, dirReadfail);
    });

}

function file_details_callback(f) {
    var d1 = new Date(f.lastModifiedDate);
    docs.push(f.name + ":" + f.type + ":" + f.size + ":" + d1.toString('yyyyMMdd') );
    alert("pushing to array")
}
function dirReadSuccess(entries) {
	 alert("docs found "+entries.length)
	docs = new Array()
  
    var i;
    for (i = 0; i < entries.length; i++) {
       
        if (entries[i].isFile) {
            entries[i].file(file_details_callback);

        } else {
            console.log('Directory - ' + entries[i].name);
            //listdircontents(entries[i])
        }
    }
}
function dirReadFail(error) {
    alert("Failed to list directory contents: "+ error);
}
	


function downloadMissing()
{
	alert("Got here")
	/*
    $.getJSON('http://ostridge.synology.me/ListDirjson.php?directory=MyJobs/POSTRIDGE/download', function (data) {
        downloadCount = 0
        
        alert("private"+data.FILES.length)
        var cnt = 0;
        $.each(data.FILES, function (index) {
            fileName = data.FILES[index].name;
            
            window.resolveLocalFileSystemURL(cordova.file.applicationStorageDirectory+"files/MyJobs/Private/Download/" + data.FILES[index].name, appStart, downloadAsset(data.FILES[index].name,"files/MyJobs/Private/Download/"));
            cnt = cnt + 1;
           
        });
    });
    */
    $.getJSON('http://ostridge.synology.me/ListDirjson.php?directory=MyJobs/Global/download', function (data) {
        downloadCount = 0
        alert("Global"+data.FILES.length)
        var cnt = 0;
        $.each(data.FILES, function (index) {
            fileName = data.FILES[index].name;
            window.resolveLocalFileSystemURL(cordova.file.applicationStorageDirectory+"files/MyJobs/Global/Download/" + data.FILES[index].name, appStart, downloadAsset(data.FILES[index].name, "files/MyJobs/Global/Download/"));
            cnt = cnt + 1;

        });
    });
	 $.getJSON('http://ostridge.synology.me/ListDirjson.php?directory=MyJobs/Global/download', function (data) {
	        downloadCount = 0
	        alert("Global"+data.FILES.length)
	        var cnt = 0;
	        $.each(data.FILES, function (index) {
	            fileName = data.FILES[index].name;
	            window.resolveLocalFileSystemURL(cordova.file.applicationStorageDirectory + data.FILES[index].name, appStart, downloadAsset(data.FILES[index].name, "files"));
	            cnt = cnt + 1;

	        });
	    });
}

function downloadAsset(fileName,dir) {
    var fileTransfer = new FileTransfer();
    x=fileName.split("/")
    alert("About to start transfer " + "http://ostridge.synology.me/" + fileName + " to " + cordova.file.applicationStorageDirectory + dir + x[3]);
    fileTransfer.download("http://ostridge.synology.me/" + fileName, cordova.file.applicationStorageDirectory + dir + x[3],
		function (entry) {
		    alert(cordova.file.applicationStorageDirectory + dir + x[3]+":::"+entry.fullPath)
		   
		},
		function (error) {
		    
		    alert("download error " + error.source+ ":" + error.target+": " + error.code);
	
		    
		});
}
function appStart() {
    alert(downloadCount+" Downloaded")
}
	

