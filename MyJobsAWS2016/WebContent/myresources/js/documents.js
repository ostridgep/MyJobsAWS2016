var photos = new Array()
var formDocuments = new sap.m.Dialog("dlgDocuments",{
    title:"Documents",
    modal: true,
    contentWidth:"1em",
    buttons: [
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
                                    	BuildPhotoList()
                                              
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
	alert("about to take photo")
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
    moveFile(imageData,cordova.file.applicationStorageDirectory + "files/Documents/MyJobs/Global/Photos/")
    moveFile(imageData,cordova.file.applicationStorageDirectory + "files/Documents/MyJobs/Global/")
}

//Callback function when the picture has not been successfully taken
function onGetPhotoDataFail(message) {
    alert('Failed to load picture because: ' + message);
}
function successMoveCallback(entry) {
 alert("New Path: " + entry.fullPath);
   
}

function errorMoveCallback(error) {
    alert("Error:" + error.code+":" + error.source+":" + error.target)
    
}

// fileUri = file:///emu/0/android/cache/something.jpg
function moveFile(fileUri,dir) {
    var opdir = cordova.file.applicationStorageDirectory + "files/Documents/MyJobs/Global/Photos/"
    alert("moving to " + opdir);
    var currentdate = new Date();
    var datetime = (currentdate.getFullYear()).toString() + (currentdate.getMonth() + 1).toString() + (currentdate.getFullYear()).toString()
       + (currentdate.getHours()).toString()
                       + (currentdate.getMinutes()).toString()
                       + (currentdate.getSeconds()).toString();
    
                       oldFileUri = fileUri;
                       fileExt = "." + oldFileUri.split('.').pop();

                       newFileName = datetime + fileExt;
                       window.resolveLocalFileSystemURL(fileUri, function (file) {
                           alert("checking op")
                           window.resolveLocalFileSystemURL(opdir, function (opdir) {
            alert("about tio move")
            file.copyTo(opdir, newFileName, function () {
                alert("done moving" + opdir + newFileName);
               
            }, function () {
                alert("error moving");
            });
        }, errorMoveCallback);
    }, errorMoveCallback);
}
function buildPhotoList(){
	alert("building Photo List")
	listFiles(cordova.file.applicationStorageDirectory+"files/Documents/MyJobs/Private/Photos/")
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
function listFiles(dir) {
  
    alert("listing files")
    window.resolveLocalFileSystemURL(dir, function (dirEntry) {
        var directoryReader = dirEntry.createReader();
          directoryReader.readEntries(dirReadSuccess, dirReadfail);
    });
/*
    $.getJSON('http://192.168.1.20/ListDirjson.php?directory=MyJobs/POSTRIDGE/download', function (data) {
        $op = document.querySelector("#remotecount");
        $op.innerHTML = data.FILES.length;
        $.each(data.FILES, function (index) {
            opMess("remote", "PrivateDownload:"+data.FILES[index].name + ": " + data.FILES[index].size + ": " + data.FILES[index].type + ": " + data.FILES[index].lastmod);
        });
    });
    $.getJSON('http://192.168.1.20/ListDirjson.php?directory=MyJobs/Global/download', function (data) {
        $op = document.querySelector("#remotecount");
        $op.innerHTML = data.FILES.length;
        $.each(data.FILES, function (index) {
            opMess("remote", "GlobalDownload:"+data.FILES[index].name + ": " + data.FILES[index].size + ": " + data.FILES[index].type + ": " + data.FILES[index].lastmod);
        });
    });
    $.getJSON('http://192.168.1.20/ListDirjson.php?directory=MyJobs/POSTRIDGE/upload', function (data) {
        $op = document.querySelector("#remotecount");
        $op.innerHTML = data.FILES.length;
        $.each(data.FILES, function (index) {
            opMess("remote", "PrivateUpload:" + data.FILES[index].name + ": " + data.FILES[index].size + ": " + data.FILES[index].type + ": " + data.FILES[index].lastmod);
        });
    });
    */
}

function file_details_callback(f) {
    var d1 = new Date(f.lastModifiedDate);
    photos.push(f.name + ":" + f.type + ":" + f.size + ":" + d1.toString('yyyyMMdd') );
    alert("pushing to array")
}
function dirReadSuccess(entries) {
	photos = new Array()
   alert("photos found "+entries.length)
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
	
	

