

var w = null;
var objtype="";	
var objid="";	
var objshorttext="";	
var objaddress="";	
var objswerk="";		
var currentlySyncing=false
var SAPServerPrefix="";
var SAPServerSuffix="";	

var parTrace= "ON";
var syncDetsSet=false;
var demoDataLoaded=0;
var syncTransactionalDetsUpdated=false;
var syncReferenceDetsUpdated=false;
var syncStatusType=sap.m.ButtonType.Accept;
var xmlDoc="";
var sqlMyJobsDocs;
var assetStatements=[];
var allAssetCalls=[]
function sendFormData(fname,orderno,opno,notifno){

	var c040="NA"	
		var d040=""		
			var c060="NA"	
				var d060=""	
					var c100="NA"	
						var d100=""
							var 	formalsampletaken = ""	
								var 	upstreamsenttolab= ""
									var 	ptofdiscsenttolab= ""
										var 	downstream1senttolab= ""
											var 	downstream2senttolab= ""
												var 	downstream3senttolab= ""
													console.log("sendForm="+fname+orderno)

													user=localStorage.getItem("MobileUser")
													empid=localStorage.getItem("EmployeeID")	

													sqlstatement="SELECT * from myformsresponses where orderno = '"+orderno+"' and opno ='"+opno+"' and formname ='"+fname+"'"
													console.log(sqlstatement)
													html5sql.process(sqlstatement,
															function(transaction, results, rowsArray){
														if(rowsArray.length>0){
															console.log("form record found="+rowsArray.length)
															jsonstr=$.parseJSON(unescape(rowsArray[0].contents))
															console.log("1:"+jsonstr.length)
															console.log(jsonstr[0].workorder)
															console.log("x:"+jsonstr[0]["workorder"])




															if(fname=="CustomerFeedback"){
																if(jsonstr[0].reason.length>0){
																	c040="LT"	
																		d040=jsonstr[0].reason
																}
																if(jsonstr[0].cause.length>0){
																	c060="LT"	
																		d060=jsonstr[0].cause
																}
																if(jsonstr[0].ppmdetails.length>0){
																	c100="LT"	
																		d100=jsonstr[0].ppmdetails
																}
																params="&RECNO="+rowsArray[0].id+"&NOTIF_TYPE=ZC&USER="+user+"&ORDER_ID="+orderno+"&NOTIF_NO="+notifno+
																"&MAIN_WORK_CTR="+selectedJobArray["orderworkcentre"]+"&PLANT="+selectedJobArray["orderplant"]+"&USER_STATUS_H="+opno+
																"&ACT_CODEGRP_1=CUST010&ACT_CODE_1="+jsonstr[0].spokentoV.substring(0,1)+"&ACT_TEXT_1="+jsonstr[0].spokentoV+
																"&ACT_CODEGRP_2=CUST020&ACT_CODE_2="+jsonstr[0].contactcardV.substring(0,1)+"&ACT_TEXT_2="+jsonstr[0].contactcardV+
																"&ACT_CODEGRP_3=CUST030&ACT_CODE_3="+jsonstr[0].custsatifaction+"&ACT_TEXT_3="+jsonstr[0].custsatifaction+
																"&ACT_CODEGRP_4=CUST040&ACT_CODE_4="+c040+"&ACT_TEXT_4="+d040+
																"&ACT_CODEGRP_5=CUST050&ACT_CODE_5="+jsonstr[0].resolvedV.substring(0,1)+"&ACT_TEXT_5="+jsonstr[0].resolvedV+
																"&ACT_CODEGRP_6=CUST060&ACT_CODE_6="+c060+"&ACT_TEXT_6="+d060+
																"&ACT_CODEGRP_7=CUST070&ACT_CODE_7="+jsonstr[0].furtherworkV.substring(0,1)+"&ACT_TEXT_7="+jsonstr[0].furtherworkV+
																"&ACT_CODEGRP_8=CUST080&ACT_CODE_8="+jsonstr[0].additionalworkV.substring(0,1)+"&ACT_TEXT_8="+jsonstr[0].additionalworkV+
																"&ACT_CODEGRP_9=CUST090&ACT_CODE_9="+jsonstr[0].ppmV.substring(0,1)+"&ACT_TEXT_9="+jsonstr[0].ppmV+
																"&ACT_CODEGRP_10=CUST100&ACT_CODE_10="+c100+"&ACT_TEXT_10="+d100
																sendSAPData("MyJobsCreateCFEED.htm",params,"UPDATE MyFormsResponses SET lastupdated = 'NEW' WHERE id='"+rowsArray[0].id+"'");
															}
															if(fname=="Pollution"){
																if(jsonstr[0].formalsampletakenV=="YES"){	formalsampletaken="X"	}
																if(jsonstr[0].upstreamsenttolabV=="YES"){	upstreamsenttolab="X"	}
																if(jsonstr[0].ptofdiscsenttolabV=="YES"){	ptofdiscsenttolab="X"	}
																if(jsonstr[0].downstream1senttolabV=="YES"){	downstream1senttolab="X"	}
																if(jsonstr[0].downstream2senttolabV=="YES"){	downstream2senttolab="X"	}
																if(jsonstr[0].downstream3senttolabV=="YES"){	downstream3senttolab="X"	}

																params="&RECNO="+rowsArray[0].id+"&USERID="+user+"&AUFNR="+orderno+"&NOTIF_NO="+notifno+"&PPIA="+orderno+','+

																jsonstr[0].pollutionsitetype.trim()+",,"+jsonstr[0].pollutionsite.trim()+","+
																jsonstr[0].dischargetype.trim()+",,"+
																jsonstr[0].watercoursetype.trim()+",,"+
																jsonstr[0].watercoursewidth.trim()+",,"+
																formalsampletaken.trim()+","+
																jsonstr[0].sizeofimpact.trim()+","+
																jsonstr[0].amenitiesimpact.trim()+",,"+
																jsonstr[0].aestheticimpact.trim()+",,"+
																jsonstr[0].upstreamdistance.trim()+","+jsonstr[0].ptofdiscdistance.trim()+","+jsonstr[0].downstream1distance.trim()+","+jsonstr[0].downstream2distance.trim()+","+jsonstr[0].downstream3distance.trim()+","+
																jsonstr[0].upstreamonsitenh3.trim()+","+jsonstr[0].ptofdisconsitenh3.trim()+","+jsonstr[0].downstream1onsitenh3.trim()+","+jsonstr[0].downstream2onsitenh3.trim()+","+jsonstr[0].downstream3onsitenh3.trim()+","+
																upstreamsenttolab.trim()+","+ptofdiscsenttolab.trim()+","+downstream1senttolab.trim()+","+downstream2senttolab.trim()+","+downstream3senttolab.trim()

																sendSAPData("MyJobsPIACreate.htm",params,"UPDATE MyFormsResponses SET lastupdated = 'NEW' WHERE id='"+rowsArray[0].id+"'");
															}

															if(fname=="Flooding"){





																locsArray = [""]
																params="&RECNO="+rowsArray[0].id+"&USERID="+user+"&AUFNR="+orderno+
																"&ZASTYP="+jsonstr[0].sewertype.trim()+
																"&ZAESSTA="+jsonstr[0].sewerstatus.trim()+
																"&ZAWEAT="+jsonstr[0].floodweather.trim()
																var pitem="";
																for(var cnt=0; cnt < jsonstr[0].location.length ; cnt++)
																{
																	if(cnt>0){
																		pitem+=","
																	}
																	row=cnt+1;	
																	litenno = row *10;
																	litem = ("0000" + litenno).slice(-4)
																	type=jsonstr[0].location[cnt]["loctype-"+row].split(":")
																	subtype=jsonstr[0].location[cnt]["locsubtype-"+row].split(":")
																	severity=jsonstr[0].location[cnt]["locseverity-"+row].split(":")
																	floc=jsonstr[0].location[cnt]["locfloc-"+row].split(":")
																	comments=jsonstr[0].location[cnt]["loccomments-"+row].split(":")
																	pitem+=orderno+','+litem+","+type[0]+","+subtype[0]+","+floc[0]+",,,,,,,,,,,,,,,,"+comments[0]+",,"+severity[0]+',1.00'
																	locsArray.push(floc[0])
																	//alert("Loc:"+orderno+','+litem+","+type[0]+","+subtype[0]+","+floc[0])
																}
																roomsArray=[]
																for(var cnt=0; cnt < jsonstr[0].room.length ; cnt++)
																{
																	row=cnt+1;	
																	loc=jsonstr[0].room[cnt]["roomloc-"+row].split(":")
																	room=jsonstr[0].room[cnt]["roomroom-"+row].split(":")
																	depth=jsonstr[0].room[cnt]["roomdepth-"+row].split(":")
																	comments=jsonstr[0].room[cnt]["roomcomments"+row].split(":")

																	roomsArray.push(loc[0]+"|"+room[0]+"|"+depth[0]+"|"+comments[0])


																}
																roomsArray.sort();
																var pdepth="";
																var wasitem=0;
																dno=1;
																for(var cnt=0; cnt < roomsArray.length ; cnt++)
																{
																	if(cnt>0){
																		pdepth+=","
																	}
																	theroom = roomsArray[cnt].split("|");
																	row=cnt+1;	
																	loc=theroom[0]
																	litemno = row *10;
																	f1=locsArray.indexOf(loc);
																	if (f1!=wasitem){
																		wasitem = f1;
																		dno=1;
																	}else{
																		dno++;
																	}
																	litem=("0000" + f1*10).slice(-4)
																	ditem=("0000" + dno*10).slice(-4)

																	room=theroom[1]
																	depth=theroom[2]
																	comments=theroom[3]
																	pdepth+=orderno+','+litem+','+ditem+','+room+",,"+depth+",,"+comments+","
																	//alert("room:"+orderno+','+litem+','+ditem+','+room+",,"+depth+",,"+comments)



																}


																//need to populate the PHDR
																//sort date & time formats
																gridref=jsonstr[0].gridref.split(",");
																if(gridref.length>1){
																	ENRef=gridref[0].substring(0,9)+":"+gridref[1].substring(0,9)
																}else{
																	ENRef=gridref
																}
																jsonstr[0].floodtime=jsonstr[0].floodtime+":u00"
																jsonstr[0].attendancetime=jsonstr[0].attendancetime+":00"
																flooddate=jsonstr[0].flooddate.substring(6,10)+jsonstr[0].flooddate.substring(3,5)+jsonstr[0].flooddate.substring(0,2)
																floodtime=jsonstr[0].floodtime.substring(0,2)+jsonstr[0].floodtime.substring(3,5)+jsonstr[0].floodtime.substring(6,8)
																attenddate=jsonstr[0].attendancedate.substring(6,10)+jsonstr[0].attendancedate.substring(3,5)+jsonstr[0].attendancedate.substring(0,2)
																attendtime=jsonstr[0].attendancetime.substring(0,2)+jsonstr[0].attendancetime.substring(3,5)+jsonstr[0].attendancetime.substring(6,8)
																params+="&PHDR="+orderno+','+jsonstr[0].assetref.trim()+','+jsonstr[0].psshortcode+','+jsonstr[0].causeofflood+','+
																ENRef+',,'+flooddate+','+floodtime+','+empid+','+getShortSAPDate()+','+user+','+''+','+
																""+','+"Comments"+','+jsonstr[0].spillsize+","+attenddate+","+attendtime+','+
																jsonstr[0].attendanceweather+","+jsonstr[0].previousflooding+','+jsonstr[0].floodingsource+','+jsonstr[0].rootcause+
																"&PDEPTH="+pdepth+
																"&PITEM="+pitem


																sendSAPData("MyJobsDG5Create.htm",params,"UPDATE MyFormsResponses SET lastupdated = 'NEW' WHERE id='"+rowsArray[0].id+"'");
															}
														}				
														/*	
				opMessage("NewTconf Details="+newTConfDets);

				sendSAPData("MyJobsCreateTConf.htm",newTConfDets,"UPDATE MyTimeConfs SET confno = 'NEW' WHERE id='"+item['id']+"'");
														 */		

													},
													function(error, statement){
														console.log("send Form Error: " + error.message + " when processing " + statement);
													}   
													);

}

function setUserAgent(window, userAgent) {
	if (window.navigator.userAgent != userAgent) {
		var userAgentProp = { get: function () { return userAgent; } };
		try {
			Object.defineProperty(window.navigator, 'userAgent', userAgentProp);
		} catch (e) {
			window.navigator = Object.create(navigator, {
				userAgent: userAgentProp
			});
		}
	}
}
function isTablet(customUA) {
	var ua = customUA || navigator.userAgent;

	if (device.os.name === device.os.OS.IOS) {
		return /ipad/i.test(ua);
	}	 
}
function sendSMS(to, message)
{
	$.post("https://sms.cginotify.com/api/SMS/Send",{ LicenseKey: "hmJks0HcfKplAP2i4vuVrXxThFbj4JYfHmRRB1Dw", PhoneNumbers: to, Message : message}, function(data, status){
		// alert("Data: " + data + "\nStatus: " + status);
	});
}
function convertDate(dt){
	var fdt="";
	fdt = dt.substring(0,4)+"-"+dt.substring(4,6)+"-"+dt.substring(6,9)+dt.substring(9,11)+":"+dt.substring(11,13);

	return fdt;
}

function setSyncingIndicator(state){

	var path = window.location.pathname;
	var page = path.split("/").pop();
	if(page=="Jobs.html"){

		if(state){
			console.log("on")
			sap.ui.getCore().getElementById("Syncit").setType(syncStatusType)
			sap.ui.getCore().getElementById("Syncit").setVisible(false)			
			sap.ui.getCore().getElementById("jobsyncIndicator").setVisible(true)
		}else{
			console.log("off")
			sap.ui.getCore().getElementById("Syncit").setType(syncStatusType)
			sap.ui.getCore().getElementById("Syncit").setVisible(true)
			sap.ui.getCore().getElementById("jobsyncIndicator").setVisible(false)

		}
	}
	if(page=="Home.html"){

		if(state){
			sap.ui.getCore().getElementById("LastSyncMess").setType(syncStatusType)
			sap.ui.getCore().getElementById("LastSyncMess").setVisible(false)
			sap.ui.getCore().getElementById("syncIndicator").setVisible(true)
		}else{
			sap.ui.getCore().getElementById("LastSyncMess").setType(syncStatusType)
			sap.ui.getCore().getElementById("LastSyncMess").setVisible(true)
			sap.ui.getCore().getElementById("syncIndicator").setVisible(false)

		}
	}
}

function requestSAPData1(page,params){
	var SAPCalls = JSON.parse(localStorage.getItem("SAPCalls"));
	callstomake=""
		for(n=0;n<SAPCalls.length;n++){
			callstomake+=SAPCalls[n]+"\n\n"
		}
	alert("Calls+"+SAPCalls.length+"\n"+callstomake)
	opMessage(SAPServerPrefix+page);
	var myurl=SAPServerPrefix+page+SAPServerSuffix+params;
	SAPCalls.push(myurl)
	localStorage.setItem("SAPCalls",JSON.stringify(SAPCalls));



}

function requestSAPData(page,params){


	opMessage(SAPServerPrefix+page);
	var myurl=SAPServerPrefix+page+SAPServerSuffix+params;
	var urlStart=myurl.substring(0, 4).toUpperCase();
	if((urlStart.indexOf("HTTP") == -1)&&(urlStart.indexOf("HTTPS") == -1)){
		console.log("Invalid URL"+myurl)
		syncStatusType=sap.m.ButtonType.Reject
		setSyncingIndicator(false)

		return
	}


	$.ajax({

		dataType: "json",
		url: myurl,

		timeout: 300000
	}).done(function() {
		console.log("success")
		syncStatusType=sap.m.ButtonType.Accept			
		opMessage("call success"+page );
	}).fail( function( xhr, status ) {


		opMessage(page+status)
		if (status!="parsererror"){

			if( status == "timeout" ) {
				syncStatusType=sap.m.ButtonType.Reject
				setSyncingIndicator(false)
				opMessage(page+status);
			}
		}
	}).always(function() {
		console.log("complete")
		opMessage("Complete"+page );


	});



}	 



function updateMyJobDetsDraw(id,dir)
{
	html5sql.process(

			["UPDATE MyJobDetsDraw set zurl  = '"+dir+"' WHERE id = "+ id],
			function(transaction, results, rowsArray){
				buildJobDocsTable();	
			},
			function(error, statement){
				alert("Error: " + error.message + " when jobdetsdraw processing " + statement);
			} 

	)
}
function requestSAPDataCall(){
	timedout=false;

	html5sql.process("SELECT * from MyAjax where astate = 'NEW'",
			function(transaction, results, rowsArray){

		if( rowsArray.length > 0) {
			html5sql.process(

					["UPDATE MyAjax set astate  = 'SERVER' WHERE id = "+ rowsArray[0].id],
					function(transaction, results, rowsArray1){

					},
					function(error, statement){
						window.console&&console.log("Error: " + error.message + " when processing " + statement);
					}   
			);
			opMessage(SAPServerPrefix+rowsArray[0].acall);
			var myurl=SAPServerPrefix+rowsArray[0].acall+SAPServerSuffix+rowsArray[0].aparams;
			console.log("Called URL:"+myurl)
			$.ajax({
				dataType: "jsonp",
				url: myurl,
				timeout: 120000
			}).done(function() {
				console.log("call success"+page );
			}).fail( function( xhr, status ) {
				console.log("call fail "+status+page );
				if (status!="parsererror"){//console.log(page+status+":"+xhr)
					if( status == "timeout" ) {
						timedout=true;
					}
				}
			}).always(function() {
				if(timedout==false){
					console.log( "Timedout"+rowsArray[0].acall );
				}else{
					console.log( "Complete"+rowsArray[0].acall );

				}
			});
		}




	},
	function(error, statement){
		window.console&&console.log("Error: " + error.message + " when processing " + statement);
	}   
	);




}
function sendSAPData(page,params,timedOutSQL){
	var TimedOut=false;
	SetLastSyncDetails("LASTSYNC_UPLOAD");
	localStorage.setItem("SAPCalling","true")
	opMessage(page+getTime());
	console.log(page+getTime())

	var myurl=SAPServerPrefix+page+SAPServerSuffix+params;

	$.ajax({
		dataType: "json",
		url: myurl,  
		timeout: 60000
	}).done(function() {
		console.log("call success"+page );
	}).fail( function( xhr, status ) {

		if (status!="parsererror"){

			if( status == "timeout" ) {
				console.log("TimedOut1"+TimedOut)
				TimedOut=true;
				resetSENDINGData(timedOutSQL);
				console.log(page+status)
				console.log("TimedOut2"+TimedOut)
			}
		}
	}).always(function() {

		console.log( "Complete "+page+ " at "+getTime()+" Timedout = "+TimedOut);
		if(TimedOut==false){
			localStorage.setItem("SAPCalling","false")
			syncUpload()
		}else{
			localStorage.setItem("SAPCalling","false")

		}


	});

	//})


}	
function resetSENDINGData(sql){

	html5sql.process(sql,
			function(transaction, results, rowsArray){

	},
	function(error, statement){
		window.console&&console.log("Error: " + error.message + " when processing " + statement);
	}   
	);




}
function opMessage(msg){

console.log(msg)

	opLog(msg);


}
function prepLogMessage(msg){

	nowd=getDate();
	nowt=getTime();
	dtstamp=nowd+nowt;


	return('INSERT INTO LogFile (datestamp , type, message ) VALUES ("'+dtstamp+'","I","'+ msg+'")');

}
function opLog(msg){

	nowd=getDate();
	nowt=getTime();
	dtstamp=nowd+nowt;


	var sqlstatement='INSERT INTO LogFile (datestamp , type, message ) VALUES ("'+dtstamp+'","I","'+ msg+'");';
	if (localStorage.getItem("Trace")=='ON'){
		html5sql.process(sqlstatement,
				function(){
			//alert("Success Creating Tables");
		},
		function(error, statement){
			window.console&&console.log("Error: " + error.message + " when processing " + statement);
		}        
		);

	}
}
function getTraceState(){
	traceState="OFF";
	xtraceState="";
	html5sql.process(
			["SELECT * from MyWorkConfig where paramname = 'TRACE'"],
			function(transaction, results, rowsArray){
				if( rowsArray.length > 0) {
					traceState= rowsArray[0].paramvalue;
				}
				localStorage.setItem('Trace',traceState);
				$('#traceState').val(traceState); 	
				$('#traceState').selectmenu('refresh', true);

			},
			function(error, statement){
				window.console&&console.log("Error: " + error.message + " when processing " + statement);
			}   
	);
}	
function getCFeedFollowOnState(orderno,opno){
	sap.ui.getCore().getElementById("Close_Work").setEnabled(true);

	html5sql.process(
			["SELECT * from MyFormsResponses where orderno = '"+orderno+"' and opno = '"+opno+"' and formname = 'CustomerFeedback'"],
			function(transaction, results, rowsArray){

				if( rowsArray.length <1) {
					sap.ui.getCore().getElementById("Close_Work").setState(false);
				}else{
					if(unescape(rowsArray[0].contents).indexOf("\"furtherworkV\":\"YES\"")>0){

						sap.ui.getCore().getElementById("Close_Work").setState(true);

						sap.ui.getCore().getElementById("Close_Work").setEnabled(false);
					}else{

						sap.ui.getCore().getElementById("Close_Work").setState(false);
						sap.ui.getCore().getElementById("Close_Work").setState(false);

						sap.ui.getCore().getElementById("Close_Work").setEnabled(false);
					}
				}


			},
			function(error, statement){

				sap.ui.getCore().getElementById("Close_Work").setState(false);
			}   
	);
}
function databaseExists(){

	html5sql.process(
			["SELECT * FROM sqlite_master WHERE type='table';"],
			function(transaction, results, rowsArray){
				if( rowsArray.length > 10) {
					//alert("Database Existsh");
					return(true);
				}
				//alert("Database does not exist")
				return(false);

			},
			function(error, statement){
				window.console&&console.log("Error: " + error.message + " when processing " + statement);
				return(false);
			}   
	);

}	
function SetLocalStorageChangePage(page){

	html5sql.process(
			["SELECT * from MyWorkConfig "],
			function(transaction, results, rowsArray){
				for(var i = 0; i < rowsArray.length; i++){
					//each row in the rowsArray represents a row retrieved from the database

					if (rowsArray[i].paramname=='SERVERNAME'){
						localStorage.setItem('ServerName',rowsArray[i].paramvalue);

					}
					if (rowsArray[i].paramname=='SAPSYSTEM'){
						localStorage.setItem('SAPSystem',rowsArray[i].paramvalue);

					}
					if (rowsArray[i].paramname=='SAPCLIENT'){
						localStorage.setItem('SAPClient',rowsArray[i].paramvalue);

					}
					if (rowsArray[i].paramname=='SYNC_REFERENCE_FREQUENCY'){
						localStorage.setItem('SyncReferenceFrequency',rowsArray[i].paramvalue);

					}
					if (rowsArray[i].paramname=='SYNC_TRANSACTIONAL_FREQUENCY'){
						localStorage.setItem('SyncTransactionalFrequency',rowsArray[i].paramvalue);
					}
					if (rowsArray[i].paramname=='SYNC_UPLOAD_FREQUENCY'){
						localStorage.setItem('SyncUploadFrequency',rowsArray[i].paramvalue);
					}			

					if (rowsArray[i].paramname=='LASTSYNC_REFERENCE'){
						localStorage.setItem('LastSyncReference',rowsArray[i].paramvalue);

					}
					if (rowsArray[i].paramname=='LASTSYNC_TRANSACTIONAL'){
						localStorage.setItem('LastSyncTransactional',rowsArray[i].paramvalue);
					}
					if (rowsArray[i].paramname=='LASTSYNC_UPLOAD'){
						localStorage.setItem('LastSyncUpload',rowsArray[i].paramvalue);

					}			
					if (rowsArray[i].paramname=='TRACE'){
						localStorage.setItem('Trace',rowsArray[i].paramvalue);

					}
					if (rowsArray[i].paramname=='ASSET_PATH'){
						localStorage.setItem('AssetPath',rowsArray[i].paramvalue);

					}
				}
				window.location.href=page
			},
			function(error, statement){

			}
	);			

}
function SetLocalStorage(){

	html5sql.process(
			["SELECT * from MyWorkConfig "],
			function(transaction, results, rowsArray){
				for(var i = 0; i < rowsArray.length; i++){
					//each row in the rowsArray represents a row retrieved from the database

					if (rowsArray[i].paramname=='SERVERNAME'){
						localStorage.setItem('ServerName',rowsArray[i].paramvalue);

					}
					if (rowsArray[i].paramname=='SYNC_REFERENCE_FREQUENCY'){
						localStorage.setItem('SyncReferenceFrequency',rowsArray[i].paramvalue);

					}
					if (rowsArray[i].paramname=='SYNC_TRANSACTIONAL_FREQUENCY'){
						localStorage.setItem('SyncTransactionalFrequency',rowsArray[i].paramvalue);
					}
					if (rowsArray[i].paramname=='SYNC_UPLOAD_FREQUENCY'){
						localStorage.setItem('SyncUploadFrequency',rowsArray[i].paramvalue);
					}			

					if (rowsArray[i].paramname=='LASTSYNC_REFERENCE'){
						localStorage.setItem('LastSyncReference',rowsArray[i].paramvalue);

					}
					if (rowsArray[i].paramname=='LASTSYNC_TRANSACTIONAL'){
						localStorage.setItem('LastSyncTransactional',rowsArray[i].paramvalue);
					}
					if (rowsArray[i].paramname=='LASTSYNC_UPLOAD'){
						localStorage.setItem('LastSyncUpload',rowsArray[i].paramvalue);

					}			
					if (rowsArray[i].paramname=='TRACE'){
						localStorage.setItem('Trace',rowsArray[i].paramvalue);

					}	
					if (rowsArray[i].paramname=='ASSET_PATH'){
						localStorage.setItem('AssetPath',rowsArray[i].paramvalue);

					}
				}
			},
			function(error, statement){
				//hande error here           
			}
	);			

}



function GetConfigParam(paramName){

	html5sql.process(
			["SELECT * from MyWorkConfig where paramname = '"+paramName+"'"],
			function(transaction, results, rowsArray){
				if( rowsArray.length > 0) {
					if (paramName == "TRACE"){
						parTrace=item['paramvalue'];
					}

				}


			},
			function(error, statement){
				window.console&&console.log("Error: " + error.message + " when processing " + statement);
			}   
	);
}
function updatePinCode(pincode){

	var user=localStorage.getItem('MobileUser')
	localStorage.setItem('PinCode',pincode);

	sqlstatement="UPDATE MyUserDets SET pincode = '"+pincode+"' WHERE mobileuser = '"+user+"';";

	html5sql.process(sqlstatement,
			function(){
		//alert("Success dropping Tables");
	},
	function(error, statement){
		opMessage("Error: " + error.message + " when updateing Pincode " + statement);
	}        
	);

}
function updateVehicleReg(reg,fullname){

	var user=localStorage.getItem('MobileUser')


	sqlstatement="UPDATE MyUserDets SET vehiclereg = '"+reg+"', fullname = '"+fullname+"' WHERE mobileuser = '"+user+"';";

	html5sql.process(sqlstatement,
			function(){
		//alert("Success dropping Tables");
	},
	function(error, statement){
		opMessage("Error: " + error.message + " when updateing Vehicle Reg " + statement);
	}        
	);

}
function SetConfigParam(paramName, paramValue){

	if (paramName=='SERVERNAME'){
		localStorage.setItem('ServerName',paramValue);
	}
	if (paramName=='SAPCLIENT'){
		localStorage.setItem('SAPClient',paramValue);
	}
	if (paramName=='SAPSYSTEM'){
		localStorage.setItem('SAPSystem',paramValue);
	}
	if (paramName=='SYNC_REFERENCE_FREQUENCY'){			
		localStorage.setItem('SyncReferenceFrequency',paramValue);		
	}
	if (paramName=='SYNC_TRANSACTIONAL_FREQUENCY'){
		localStorage.setItem('SyncTransactionalFrequency',paramValue);		
	}
	if (paramName=='SYNC_UPLOAD_FREQUENCY'){
		localStorage.setItem('SyncUploadFrequency',paramValue);		
	}
	if (paramName=='LASTSYNC_REFERENCE'){
		localStorage.setItem('LastSyncReference',paramValue);

	}
	if (paramName=='LASTSYNC_TRANSACTIONAL'){
		localStorage.setItem('LastSyncTransactional',paramValue);
	}
	if (paramName=='LASTSYNC_UPLOAD'){
		localStorage.setItem('LastSyncUpload',paramValue);

	}

	if (paramName=='TRACE'){
		localStorage.setItem('Trace',paramValue);		
	}
	if (paramName=='ASSET_PATH'){
		localStorage.setItem('AssetPath',paramValue);

	}

	html5sql.process(
			["SELECT * from MyWorkConfig where paramname = '"+paramName+"'"],
			function(transaction, results, rowsArray){
				if( rowsArray.length > 0) {
					sqlstatement="UPDATE MyWorkConfig SET paramvalue = '"+paramValue+"' WHERE paramname = '"+paramName+"';";
				}else{
					sqlstatement="INSERT INTO MyWorkConfig (paramname , paramvalue ) VALUES ('"+paramName+"','"+paramValue+"');";
				}
				html5sql.process(sqlstatement,
						function(){
					//alert("Success dropping Tables");
				},
				function(error, statement){
					opMessage("Error: " + error.message + " when SetConfigParam processing " + statement);
				}        
				);
			},
			function(error, statement){
				opMessage("Error: " + error.message + " when SetConfigParam processing " + statement);          
			}
	);
}		
function SetAllConfigParam(p1,v1,p2,v2,p3,v3,p4,v4,p5,v5){
	SetConfigParam(p1,v1);
	SetConfigParam(p2,v2);
	SetConfigParam(p3,v3);
	SetConfigParam(p4,v4);
	SetConfigParam(p5,v5);
}
function CreatePhotoEntry(orderno, opno, url, name, desc , size, date, status){



	html5sql.process("INSERT INTO MyJobsPhotos (orderno, opno, url, name, desc , size, date, status) VALUES ('"+
			orderno+"','" +opno+"','" +url+"','" +name+"','"+desc+"','"+size+"','" + date+"','" + status+"');",
			function(){
		buildJobPhotoList()
	},
	function(error, statement){
		opMessage("Error: " + error.message + " when inserting Photo" + statement);
	}        
	);

}
function UpdatePhotoEntry(orderno, opno, id, name, desc ,status){



	html5sql.process("Update MyJobsPhotos set name ='"+name+"', desc = '"+desc+"', status = '"+status+"' where id = '"+id+"'",
			function(){
		buildJobPhotoList()
	},
	function(error, statement){
		opMessage("Error: " + error.message + " when inserting Photo" + statement);
	}        
	);

}
function UpdatePhotoEntryonClose(orderno, opno, id, name, desc ,status){



	html5sql.process("Update MyJobsPhotos set name ='"+name+"', desc = '"+desc+"', status = '"+status+"' where id = '"+id+"'",
			function(){
		//buildJobPhotoList()
	},
	function(error, statement){
		opMessage("Error: " + error.message + " when inserting Photo" + statement);
	}        
	);

}
function DeletePhotoEntry(orderno, opno, id){



	html5sql.process("Delete from  MyJobsPhotos where orderno ='"+orderno+"' and opno = '"+opno+"' and id = '"+id+"'",
			function(){
		buildJobPhotoList()
	},
	function(error, statement){
		opMessage("Error: " + error.message + " when inserting Photo" + statement);
	}        
	);

}
//*************************************************************************************************************************

//User Maintenance Functions

//*************************************************************************************************************************
function CreateUser(muser,vehiclereg, u, p, employeeid, pincode, maptype, docserver){

	opMessage("Creating User "+muser+":"+vehiclereg+":"+u+":"+p+":"+employeeid);

	html5sql.process("delete from MyUserDets; INSERT INTO MyUserDets (mobileuser , vehiclereg, user, password ,employeeid, pincode, maptype, docserver) VALUES ('"+muser+"','" +vehiclereg+"','" +u+"','" +p+"','"+employeeid+"','"+pincode+"','" + maptype+"','" + docserver+"');",
			function(){
		//alert("User Created");
	},
	function(error, statement){
		opMessage("Error: " + error.message + " when drop processing " + statement);
	}        
	);

}
function updateMapType(maptype){

	opMessage("Setting MAP Type = "+maptype);
	//alert("UPDATE MyUserDets set maptype = '"+maptype+"' Where user = '"+localStorage.setItem("MobileUser")+"';")
	html5sql.process("UPDATE MyUserDets set maptype = '"+maptype+"' Where user = '"+localStorage.getItem("MobileUser")+"';",
			function(){
		localStorage.setItem("MAPTYPE",maptype)
	},
	function(error, statement){
		opMessage("Error: " + error.message + " when drop processing " + statement);
	}        
	);


}
function updateDocServer(docserver){

	opMessage("Setting DocServer = "+docserver);
	html5sql.process("UPDATE MyUserDets set docserver = '"+docserver+"' Where user = '"+localStorage.getItem("MobileUser")+"';",
			function(){
		localStorage.setItem("DOCSERVER",docserver)
	},
	function(error, statement){
		opMessage("Error: " + error.message + " when docserver " + statement);
	}        
	);


}
function ChangeUserPW(muser, u, p){

	opMessage("Changing Password for User "+muser);
	html5sql.process("UPDATE MyUserDets set password = '"+p+"' Where user = '"+u+"';",
			function(){
		//alert("Success dropping Tables");
	},
	function(error, statement){
		opMessage("Error: " + error.message + " when drop processing " + statement);
	}        
	);


}
function validateUser(u, p){
	var wait = true;
	var retVal= false;
	opMessage("Changing Password for User "+u);
	html5sql.process("SELECT * from MyUserDets where user = '"+u+"' and password =  '"+p+"'",
			function(transaction, results, rowsArray){
		if( rowsArray.length > 0) {
			retval = true;
			wait = false;
			//alert("hh")
		}else{
			wait = false;
		}

	},
	function(error, statement){
		opMessage("Error: " + error.message + " when drop processing " + statement);
		wait = false;
	}        
	);
	while(wait == true){
	}
	return(retVal);

}
function validateUserExists(u,p){

	opMessage("Checking for User "+u);
	html5sql.process("SELECT * from MyUserDets where user = '"+u+"' ",
			function(transaction, results, rowsArray){
		if( rowsArray.length < 1) {
			return(2);
		}else if (rowsArray[0].password!=p){
			return(1);
		}else {
			return(0);
		}

	},
	function(error, statement){
		opMessage("Error: " + error.message + " when drop processing " + statement);
		return(2);
	}        
	);
	return(2);

}
function CheckSyncInterval(SyncType){

	var dtNow=getDate()+getTime();
	if (SyncType=='REFERENCE'){
		lastSyncDT=localStorage.getItem('LastSyncReference');

		SyncInterval=localStorage.getItem('SyncReferenceFrequency');
	}
	if (SyncType=='TRANSACTIONAL'){
		lastSyncDT=localStorage.getItem('LastSyncTransactional');
		SyncInterval=localStorage.getItem('SyncTransactionalFrequency');

	}
	if (SyncType=='UPLOAD'){
		lastSyncDT=localStorage.getItem('LastSyncUpload');
		SyncInterval=localStorage.getItem('SyncUploadFrequency');

	}

	var diff = parseDate(dtNow) - parseDate(lastSyncDT);

	//opMessage("Checking Sync Interval:--Type="+SyncType+"--Last Synced="+lastSyncDT+"--Iterval ="+SyncInterval+"--MS Since Last Sync="+diff);


	if (diff>SyncInterval){

		return true;
	}else{

		return false;
	}


}
function createAjaxCall(acall,aparams){

	nowd=getDate();
	nowt=getTime();
	dtstamp=nowd+nowt;


	var sqlstatement='INSERT INTO MyAjax (adate , atime, astate, acall, aparams ) VALUES ("'+nowd+'","'+nowt+'","NEW","'+ acall+'","'+ aparams+'");';

	html5sql.process(sqlstatement,
			function(){

	},
	function(error, statement){
		window.console&&console.log("Error: " + error.message + " when processing " + statement);
	}        
	);


}
function createNotification(type,priority,group,code,grouptext,codetext,description,details,startdate,starttime,funcloc,equipment,assigntome)
{

	var ReportedOn=getDate()+" "+getTime();
	var ReportedBy=localStorage.getItem("MobileUser");
	if (assigntome){
		assigntomechar='X'
	}else{
		assigntomechar=''
	}
	html5sql.process("INSERT INTO  MyNotifications (notifno , type, startdate, starttime, shorttext, longtext , priority , pgroup , pcode , grouptext, codetext, funcloc, equipment, reportedby, reportedon, plant , orderno, funclocgis, equipmentgis,assigntome) VALUES ("+
			"'NEW','"+type+"','"+startdate+"','"+starttime+"','"+description+"','"+details+"','"+priority+"','"+group+"','"+code+"','"+grouptext+"','"+codetext+"','"+funcloc+"','"+equipment+"','"+ReportedBy+"','"+ReportedOn+"','','','','','"+assigntomechar+"');",
			function(transaction, results, rowsArray){


	},
	function(error, statement){


	}        
	)
}
function createJobAnswers(orderno , opno , item , task , value )
{
	var ReportedOn=getDate()+" "+getTime();
	var ReportedBy=localStorage.getItem("MobileUser");



	html5sql.process("INSERT INTO  JobAnswers (orderno , opno, user, updatedate, item , task , value) VALUES ("+
			orderno+"','"+opno+"','"+ReportedBy+"','"+ReportedOn+"','"+item+"','"+task+"','"+value+"');",
			function(transaction, results, rowsArray){


	},
	function(error, statement){


	}        
	)
}


function SetLastSyncDetails(paramName){
	nowd=getDate();
	nowt=getTime();
	paramValue=nowd+nowt;
	var sqlstatement="";
	var lastsync=localStorage.getItem('LastSyncedDT')	;		
	if (paramName=='LASTSYNC_REFERENCE'){
		localStorage.setItem('LastSyncReference',paramValue);

	}
	if (paramName=='LASTSYNC_TRANSACTIONAL'){
		localStorage.setItem('LastSyncTransactional',paramValue);

	}
	if (paramName=='LASTSYNC_UPLOAD'){
		localStorage.setItem('LastSyncUpload',paramValue);

	}	
	if(paramValue>lastsync){
		localStorage.setItem('LastSyncedDT',paramValue);
	}
	html5sql.process(
			["SELECT * from MyWorkConfig where paramname = '"+paramName+"'"],
			function(transaction, results, rowsArray){
				if( rowsArray.length > 0) {
					sqlstatement="UPDATE MyWorkConfig SET paramvalue = '"+paramValue+"' WHERE paramname = '"+paramName+"';";
				}else{
					sqlstatement="INSERT INTO MyWorkConfig (paramname , paramvalue ) VALUES ('"+paramName+"','"+paramValue+"');";
				}
				html5sql.process(sqlstatement,
						function(){
					//alert("Success dropping Tables");
				},
				function(error, statement){
					opMessage("Error: " + error.message + " when Last Sync Update processing " + statement);
				}        
				);
			},
			function(error, statement){
				opMessage("Error: " + error.message + " when Last Sync Update processing " + statement);          
			}
	);




}
function syncTransactional(){
	
	console.log("about sync to Transactional")

	if (!CheckSyncInterval('TRANSACTIONAL')){
		setSyncingIndicator(false)
		return; }
	console.log("syncing Transactional")
	opMessage("Synchronizing Transactional Data");
	setSyncingIndicator(true)
	console.log("Transactional Call "+getTime())
	html5sql.process(
			["SELECT * from MyUserDets"],
			function(transaction, results, rowsArray){
				if( rowsArray.length > 0) {
					SAPServerSuffix="?jsonCallback=?&MYJOBSSYSTEM="+localStorage.getItem('SAPSystem')+"&sap-client="+localStorage.getItem('SAPClient')+"&sap-user="+rowsArray[0].user+"&sap-password="+rowsArray[0].password+"&username="+rowsArray[0].user;
					
					html5sql.process("SELECT * from MyWorkConfig where paramname = 'SERVERNAME'",
							function(transaction, results, rowsArray){
						if( rowsArray.length > 0) {
							SetLastSyncDetails("LASTSYNC_TRANSACTIONAL");
							localStorage.setItem('LastSyncTransactionalDetails','');
							syncTransactionalDetsUpdated=false;
							SAPServerPrefix=$.trim(rowsArray[0].paramvalue);
							currentlySyncing = true;
							//requestSAPData("MyJobsOrders2.htm",'');
							//requestSAPData("MyJobsOrdersObjectsMP.htm",'');
							//requestSAPData("MyJobsNotifications.htm",'');
							//requestSAPData("MyJobsMessages.htm",'');
//Azure Calls
							console.log()
							requestAzureData("ZGW_GET_JOB_DETAILS", localStorage.getItem('MobileUser')) //AZURE

						}

					},
					function(error, statement){
						opMessage("Error: " + error.message + " when syncTransactional processing " + statement); 
					}
					);
				}
			},
			function(error, statement){
				opMessage("Error: " + error.message + " when syncTransactional processing " + statement);          
			}
	);







}

function syncTransactional1(){



	opMessage("Synchronizing Transactional Data");

	html5sql.process(
			["SELECT * from MyUserDets"],
			function(transaction, results, rowsArray){
				if( rowsArray.length > 0) {
					SAPServerSuffix="?jsonCallback=?&MYJOBSSYSTEM="+localStorage.getItem('SAPSystem')+"&sap-client="+localStorage.getItem('SAPClient')+"&sap-user="+rowsArray[0].user+"&sap-password="+rowsArray[0].password+"&username="+rowsArray[0].user;

					html5sql.process("SELECT * from MyWorkConfig where paramname = 'SERVERNAME'",
							function(transaction, results, rowsArray){
						if( rowsArray.length > 0) {
							SetLastSyncDetails("LASTSYNC_TRANSACTIONAL");
							localStorage.setItem('LastSyncTransactionalDetails','');
							syncTransactionalDetsUpdated=false;
							SAPServerPrefix=$.trim(rowsArray[0].paramvalue);
							requestSAPData1("MyJobsOrders.htm",'');
							requestSAPData1("MyJobsOrders1.htm",'');
							requestSAPData1("MyJobsOrdersObjectsMP.htm",'');
							requestSAPData1("MyJobsNotifications.htm",'');
							//requestSAPData("MyJobsMessages.htm",'');
							//requestSAPDataCall();
						}

					},
					function(error, statement){
						opMessage("Error: " + error.message + " when syncTransactional processing " + statement); 
					}
					);
				}
			},
			function(error, statement){
				opMessage("Error: " + error.message + " when syncTransactional processing " + statement);          
			}
	);







}

function syncUploadOriginal(){// Remove once syncing works

	var newDets="";
	var currentUser="";
	syncDetsSet=false;
	var codeval
	SAPServerPrefix=$.trim(localStorage.getItem('ServerName'));
	sapCalls = 0;
	if (!CheckSyncInterval('UPLOAD')){return; }
	if (localStorage.getItem("SAPCalling")=="true"){
		console.log("SAP is being Called")
		return
	}
	//opMessage("Synchronizing Upload Data");

	var syncDetails = false	;
	html5sql.process(
			["SELECT * from MyUserDets"],
			function(transaction, results, rowsArray){
				if( rowsArray.length > 0) {
					curremtUser="&username="+rowsArray[0].user;
					SAPServerSuffix="?jsonCallback=?&MYJOBSSYSTEM="+localStorage.getItem('SAPSystem')+"&sap-client="+localStorage.getItem('SAPClient')+"&sap-user="+rowsArray[0].user+"&sap-password="+rowsArray[0].password;
//					Process Vehicle Defects
					html5sql.process("SELECT * from MyVehicleCheck where state = 'NEW'",
							function(transaction, results, rowsArray){
						if( rowsArray.length > 0) {
							if (syncDetails){
								localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", VehicleCheck:"+String(rowsArray.length));
							}else{
								syncDetails=true;
								localStorage.setItem('LastSyncUploadDetails',"VehicleCheck:"+String(rowsArray.length));
							}
							if(!syncDetsSet){
								syncDetsSet=true;
								SetLastSyncDetails("LASTSYNC_UPLOAD");

							}
							item = rowsArray[0];
							if(item['desc'].length<1){
								codeval='Y'
							}else{
								codeval='N'	
							}

							newVehicleCheck='&MEAS_POINT='+item['mpoint']+'&MEAS_EQUIP='+item['equipment']+'&MEAS_DATE='+item['mdate']+'&MEAS_TIME='+item['mtime']+'&MEAS_TEXT='+item['desc']+'&MEAS_LONG_TEXT='+item['longtext']+'&RECNO='+item['id']+'&MEAS_READ_BY='+item['mreadby']+'&USER='+item['user']+'&MEAS_READING='+item['mileage']+'&MEAS_VAL_CODE='+codeval;
							opMessage("Vehicle Defect"+newVehicleCheck);

							sapCalls+=1;

							html5sql.process("UPDATE MyNewJobs SET state = 'SENDING' WHERE id='"+item['id']+"'",
									function(){
								if(item['reg'].length<1){
									sendSAPData("MyJobsCreateVehicleDefect.htm",newVehicleCheck,"UPDATE MyVehicleCheck SET state = 'NEW' WHERE id='"+item['id']+"'");
								}else{
									sendSAPData("MyJobsCreateVehicleMileage.htm",newVehicleCheck,"UPDATE MyVehicleCheck SET state = 'NEW' WHERE id='"+item['id']+"'");
								}



							},
							function(error, statement){

								opMessage("Error: " + error.message + " when processing " + statement);
							}        
							);
							return;
						}
						// Process New Notifications	EOD			
						html5sql.process("SELECT * from MyNotifications where notifno = 'NEW' and type = 'Z7'",
								function(transaction, results, rowsArray){
							if( rowsArray.length > 0) {
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", EOD:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"EOD:"+String(rowsArray.length));
								}
								if(!syncDetsSet){
									syncDetsSet=true;
									SetLastSyncDetails("LASTSYNC_UPLOAD");

								}
								for (var n = 0; n < rowsArray.length; n++) {
									item = rowsArray[n];
									newEODDets='&TYPE='+item['type']+'&ACT_START_DATE='+item['startdate']+'&ACT_START_TIME='+item['starttime']+'&ACT_END_DATE='+item['enddate']+'&ACT_END_TIME='+item['endtime']+'&SHORT_TEXT='+item['shorttext']
									newEODDets+='&REPORTED_BY='+localStorage.getItem('EmployeeID')+'&USERID='+localStorage.getItem('MobileUser')+'&ID='+item['id'];;
									opMessage("New EOD Notifications Details="+newEODDets);

									sapCalls+=1;
									n=rowsArray.length
									html5sql.process("UPDATE MyNotifications SET notifno = 'SENDING' WHERE id='"+item['id']+"'",
											function(){
										sendSAPData("MyJobsCreateEODNotification.htm",newEODDets,"UPDATE MyNotifications SET notifno = 'NEW' WHERE id='"+item['id']+"'");

									},
									function(error, statement){

										opMessage("Error: " + error.message + " when processing " + statement);
									}        
									);
								}
								return;	
							}
							// Process New Notifications				
							html5sql.process("SELECT * from MyNotifications where notifno = 'NEW' and type <> 'Z7'",
									function(transaction, results, rowsArray){
								if( rowsArray.length > 0) {
									if (syncDetails){
										localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", Notifications:"+String(rowsArray.length));
									}else{
										syncDetails=true;
										localStorage.setItem('LastSyncUploadDetails',"Notifications:"+String(rowsArray.length));
									}
									if(!syncDetsSet){
										syncDetsSet=true;
										SetLastSyncDetails("LASTSYNC_UPLOAD");

									}
									for (var n = 0; n < rowsArray.length; n++) {
										item = rowsArray[n];
										newNotifDets='&NOTIF_TYPE='+item['type']+'&ASSIG_TOME='+item['assigntome']+'&START_DATE='+item['startdate']+'&START_TIME='+item['starttime']+'&END_DATE='+item['startdate']+'&END_TIME='+item['starttime']+'&SHORT_TEXT='+item['shorttext']+'&LONG_TEXT='+item['longtext']+'&ID='+item['id'];
										newNotifDets+='&CODING='+item['pcode']+'&CODE_GROUP='+item['pgroup']+'&EQUIPMENT='+item['equipment']+'&FUNCT_LOC='+item['funcloc']+'&REPORTED_BY='+localStorage.getItem('EmployeeID')+'&USERID='+localStorage.getItem('MobileUser');
										opMessage("New Notifications Details="+newNotifDets);

										sapCalls+=1;
										n=rowsArray.length
										html5sql.process("UPDATE MyNotifications SET notifno = 'SENDING' WHERE id='"+item['id']+"'",
												function(){
											sendSAPData("MyJobsCreateNewJob2.htm",newNotifDets,"UPDATE MyNotifications SET notifno = 'NEW' WHERE id='"+item['id']+"'");

										},
										function(error, statement){

											opMessage("Error: " + error.message + " when processing " + statement);
										}        
										);
									}
									return;
								}
								// Process Status Updates				
								html5sql.process("SELECT * from MyStatus where state = 'NEW'",
										function(transaction, results, rowsArray){
									if( rowsArray.length > 0) {
										if (syncDetails){
											localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", Status:"+String(rowsArray.length));
										}else{
											syncDetails=true;
											localStorage.setItem('LastSyncUploadDetails',"Status:"+String(rowsArray.length));
										}
										if(!syncDetsSet){
											syncDetsSet=true;
											SetLastSyncDetails("LASTSYNC_UPLOAD");

										}
										for (var n = 0; n < rowsArray.length; n++) {
											item = rowsArray[n];
											newStatusDets='&ORDERNO='+item['orderno']+
											'&OPNO='+item['opno']+
											'&STATUS='+item['status']+
											'&STSMA='+item['stsma']+
											'&ACT_DATE='+item['actdate'].substring(8,10)+"."+item['actdate'].substring(5,7)+"."+item['actdate'].substring(0,4)+
											'&ACT_TIME='+item['acttime']+
											'&RECNO='+item['id']+
											'&USERID='+localStorage.getItem('MobileUser');
											opMessage("Newstatus Details="+newStatusDets);

											sapCalls+=1;							
											n = rowsArray.length
											html5sql.process("UPDATE MyStatus SET state = 'SENDING' where id='"+item['id']+"'",
													function(){
												sendSAPData("MyJobsUpdateStatus.htm",newStatusDets,"UPDATE MyStatus SET state = 'NEW' where id='"+item['id']+"'");

											},
											function(error, statement){

												opMessage("Error: " + error.message + " when processing " + statement);
											}        
											);
										}
										return;
									}
									// Process Close Jobs			
									html5sql.process("SELECT * from MyJobClose where state = 'NEW'",
											function(transaction, results, rowsArray){
										if( rowsArray.length > 0) {
											if (syncDetails){
												localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", Close:"+String(rowsArray.length));
											}else{
												syncDetails=true;
												localStorage.setItem('LastSyncUploadDetails',"Close:"+String(rowsArray.length));
											}
											if(!syncDetsSet){
												syncDetsSet=true;
												SetLastSyncDetails("LASTSYNC_UPLOAD");

											}
											for (var n = 0; n < rowsArray.length; n++) {
												item = rowsArray[n];

												newCloseDets='&NOTIFNO='+item['notifno']+'&USERID='+localStorage.getItem('MobileUser')+'&RECNO='+item['id']+
												'&FUNCT_LOC='+item['funcloc']+
												'&EQUIPMENT='+item['equipment']+
												'&LONG_TEXT='+item['details']+
												'&DL_CAT_TYP=P'+'&DL_CODE_GRP='+item['pgrp']+'&DL_CODE='+item['pcode']+
												'&D_CAT_TYP=R'+'&D_CODE_GRP='+item['agrp']+'&D_CODE='+item['acode']+
												'&CAUSE_CAT_TYP=S'+'&CAUSE_CODE_GRP='+item['igrp']+'&CAUSE_CODE='+item['icode']





												opMessage("Close Notif Update Details="+newCloseDets);


												sapCalls+=1;		
												n=rowsArray.length
												html5sql.process("UPDATE MyJobClose SET state = 'SENDING' WHERE id='"+item['id']+"'",
														function(){

													if (item['notifno'].length>5){

														sendSAPData("MyJobsUpdateNotif.htm",newCloseDets,"UPDATE MyJobClose SET state = 'NEW' WHERE id='"+item['id']+"'");
														sendFormData("CustomerFeedback",CurrentOrderNo,CurrentOpNo,currentNotifNo)
														sendFormData("Pollution",CurrentOrderNo,CurrentOpNo,currentNotifNo)
														sendFormData("Flooding",CurrentOrderNo,CurrentOpNo,currentNotifNo)
													}

												},
												function(error, statement){
													// alert("Error: " + error.message + " when processing " + statement);
													opMessage("Error: " + error.message + " when processing " + statement);
												}        
												);
											}
											return;
										}
										// Process Time Confirmations
										html5sql.process("SELECT * from MyTimeConfs where confno = 'NEW'",
												function(transaction, results, rowsArray){
											if( rowsArray.length > 0) {
												if (syncDetails){
													localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", TimeConfs:"+String(rowsArray.length));
												}else{
													syncDetails=true;
													localStorage.setItem('LastSyncUploadDetails',"TimeConfs:"+String(rowsArray.length));
												}
												for (var n = 0; n < rowsArray.length; n++) {
													item = rowsArray[n];
													if(item['final']=="Yes"){
														fconf="X";
													}else{
														fconf="";
													}									
													newTConfDets='&ORDERNO='+item['orderno']+'&OPNO='+item['opno']+'&CONF_TEXT='+item['description']+
													'&TIME='+item['duration']+'&USER='+item['user']+'&RECNO='+item['id']+
													'&SDATE='+item['date'].substring(8,10)+"."+item['date'].substring(5,7)+"."+item['date'].substring(0,4)+'&STIME='+item['time']+'&EDATE='+item['enddate'].substring(8,10)+"."+item['enddate'].substring(5,7)+"."+item['enddate'].substring(0,4)+'&ETIME='+item['endtime']+
													'&ACTIVITYTYPE='+item['type']+'&WORK_CNTR='+item['work_cntr']+'&PERS_NO='+item['empid']+'&LONG_TEXT='+item['longtext']+
													'&ACT_WORK='+item['act_work']+'&REM_WORK='+item['rem_work']+'&FINAL='+item['final']
													if (item['reason']!=null){
														newTConfDets+='&REASON='+item['reason']
													}

													opMessage("NewTconf Details="+newTConfDets);

													sapCalls+=1;
													n = rowsArray.length
													html5sql.process("UPDATE MyTimeConfs SET confno = 'SENDING' WHERE id='"+item['id']+"'",
															function(){
														sendSAPData("MyJobsCreateTConf.htm",newTConfDets,"UPDATE MyTimeConfs SET confno = 'NEW' WHERE id='"+item['id']+"'");

													},
													function(error, statement){

														opMessage("Error: " + error.message + " when processing " + statement);
													}        
													);
												}
												return
											}
											// Upload the Messages READ Indicator

											html5sql.process("SELECT * from MyMessages where state = 'READ'",
													function(transaction, results, rowsArray){

												//opMessage("done READ Message Select");
												//opMessage("READ Messages = "+rowsArray.length);
												if( rowsArray.length > 0) {
													if (syncDetails){
														localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", Read Messages:"+String(rowsArray.length));
													}else{
														syncDetails=true;
														localStorage.setItem('LastSyncUploadDetails',"Read Messages:"+String(rowsArray.length));
													}
													if(!syncDetsSet){
														syncDetsSet=true;
														SetLastSyncDetails("LASTSYNC_UPLOAD");

													}

													item = rowsArray[0];

													newMessageDets='&ID='+item['id']+'&DOCID='+item['msgid'];
													opMessage("READ Status= "+newMessageDets);


													html5sql.process("UPDATE MyMessages SET state = 'SENDING' WHERE id='"+item['id']+"'",
															function(){
														///sendSAPData("MyJobsMessageSetReadFlag.htm",newMessageDets,"UPDATE MyMessages SET state = 'NEW' WHERE id='"+item['id']+"'");

													},
													function(error, statement){

														opMessage("Error: " + error.message + " when processing " + statement);
													}        
													);	
													return;	
												}
												// Upload the NEW Sent Messages

												html5sql.process("SELECT * from MyMessages where state = 'NEW'",
														function(transaction, results, rowsArray){

													//opMessage("done SEND Message Select");
													//opMessage("SEND Messages = "+rowsArray.length);
													if( rowsArray.length > 0) {
														if (syncDetails){
															localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", Messages:"+String(rowsArray.length));
														}else{
															syncDetails=true;
															localStorage.setItem('LastSyncUploadDetails',"Messages:"+String(rowsArray.length));
														}
														if(!syncDetsSet){
															syncDetsSet=true;
															SetLastSyncDetails("LASTSYNC_UPLOAD");
															sapCalls+=1;
														}

														item = rowsArray[0];

														newSentMsgDets='&ID='+item['id']+'&TO='+item['msgtoid']+'&SUBJECT='+item['msgsubject']+'&CONTENT='+item['msgtext'];
														opMessage("SEND Status= "+newSentMsgDets);


														html5sql.process("UPDATE MyMessages SET state = 'SENDING' WHERE id='"+item['id']+"'",
																function(){
															//sendSAPData("MyJobsMessageSend.htm",newSentMsgDets,"UPDATE MyMessages SET state = 'NEW' WHERE id='"+item['id']+"'");

														},
														function(error, statement){

															opMessage("Error: " + error.message + " when processing " + statement);
														}        
														);	
														return;
													}
													// Seding Measurement Docs
													html5sql.process("SELECT * from MyMpointDocs where state = 'NEW'",
															function(transaction, results, rowsArray){

														console.log("found MP"+rowsArray.length)
														if( rowsArray.length > 0) {
															if (syncDetails){
																localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", MPDocs:"+String(rowsArray.length));
															}else{
																syncDetails=true;
																localStorage.setItem('LastSyncUploadDetails',"MPDocs:"+String(rowsArray.length));
															}
															if(!syncDetsSet){
																syncDetsSet=true;
																SetLastSyncDetails("LASTSYNC_UPLOAD");
																sapCalls+=1;
															}

															item = rowsArray[0];
															var mpcode=""
																if(item['code']!="-1"){
																	mpcode=item['code'];
																}
															newMPDoc='&EQUIPMENT='+item['equipment']+'&FUNC_LOC='+item['funcloc']+'&MEAS_POINT='+item['meas_point']+
															'&READING_DATE='+item['date']+
															'&READING_TIME='+item['time']+
															'&RECNO='+item['id']+
															'&READER='+localStorage.getItem('MobileUser')+
															'&RECORDED_VALUE='+item['value']+
															'&VALUATION_CODE='+mpcode+
															'&SHORT_TEXT='+item['shorttext']+
															'&USERID='+localStorage.getItem('MobileUser')
															opMessage("SEND Status= "+newMPDoc);


															html5sql.process("UPDATE MyMpointDocs SET state = 'SENDING' WHERE id='"+item['id']+"'",
																	function(){
																sendSAPData("MyJobsCreateMPDoc.htm",newMPDoc,"UPDATE MyMpointDocs SET state = 'NEW' WHERE id='"+item['id']+"'");

															},
															function(error, statement){

																opMessage("Error: " + error.message + " when processing " + statement);
															}        
															);	
															return;
														}
													},
													function(error, statement){
														opMessage("Error: " + error.message + " when New Measurement Docs processing New " + statement); 
													}
													);	

												},
												function(error, statement){
													opMessage("Error: " + error.message + " when New Message processing New " + statement); 
												}
												);		 
											},
											function(error, statement){
												opMessage("Error: " + error.message + " when Message Read processing " + statement); 
											}
											);		
										},
										function(error, statement){
											opMessage("Error: " + error.message + " when Time Confirmation processing " + statement); 
										}
										);	 
									},
									function(error, statement){
										opMessage("Error: " + error.message + " when Job Status processing " + statement); 
									}
									);	
								},
								function(error, statement){
									opMessage("Error: " + error.message + " when New Notif processing " + statement); 
								}
								);	
							},
							function(error, statement){
								opMessage("Error: " + error.message + " when EOD Notif processing " + statement); 
							}
							);	 

						},
						function(error, statement){
							opMessage("Error: " + error.message + " when Defects processing " + statement); 
						}
						);	 
					},
					function(error, statement){
						opMessage("Error: " + error.message + " when Users processing " + statement); 
					}
					);	










//					Check for New Messages to retrieve

					//requestSAPData("MyJobsMessages.htm",SAPServerSuffix+currentUser);
				}
			},
			function(error, statement){
				opMessage("Error: " + error.message + " when syncTransactional processing " + statement);          
			}
	);







}
function syncUpload(){


	SQLStatement="select 'VehicleCheck' as type, '' as extra,id as id, recordupdated from MyVehicleCheck where state = 'NEW' "
		SQLStatement+=" 	union "
			SQLStatement+=" 	select 'NotificationsZ7' as type,   shorttext as extra,id    as id, recordupdated from MyNotifications where notifno = 'NEW' and type = 'Z7' "
				SQLStatement+=" 	union "
					SQLStatement+=" 	select 'Notifications' as type,   shorttext as extra,id    as id, recordupdated from MyNotifications where notifno = 'NEW' and type <> 'Z7' "
						SQLStatement+=" 	union "
							SQLStatement+=" 	select 'StatusUpdate' as type,  status as extra, id    as id, recordupdated from MyStatus where state = 'NEW' "
								SQLStatement+=" 	union "
									SQLStatement+=" 	select 'JobClose' as type,  '' as extra, id    as id, recordupdated from MyJobClose where state = 'NEW' "
										SQLStatement+=" 	union "
											SQLStatement+=" 	select 'TimeConf' as type,  '' as extra, id    as id, recordupdated from MyTimeConfs where confno = 'NEW' "
												SQLStatement+=" 	union "
													SQLStatement+=" 	select 'FileRequest' as type,  '' as extra, id    as id, recordupdated from MyJobDetsDraw where zurl = 'RequestLiveLink' "
														SQLStatement+=" 	union "
															SQLStatement+=" 	select 'FileDownload' as type,  '' as extra, id    as id, recordupdated from MyJobDetsDraw where zurl = 'WaitingLiveLink' "
																SQLStatement+=" 	union "
																	SQLStatement+=" 	select 'MessageRead' as type,  '' as extra, id    as id, recordupdated from MyMessages where state = 'READ' "
																		SQLStatement+=" 	union "
																			SQLStatement+=" 	select 'MesssageNew' as type,  '' as extra, id    as id, recordupdated from MyMessages where state = 'NEW' "
																				SQLStatement+=" 	union "
																					SQLStatement+=" 	select 'MPointDoc' as type,   '' as extra,id    as id, recordupdated from MyMpointDocs where state = 'NEW' "
																						SQLStatement+=" 	union "
																							SQLStatement+=" 	select 'Flooding' as type,   '' as extra,id    as id, recordupdated from MyFormsResponses where lastupdated='CLOSED' and formname = 'Flooding' "
																								SQLStatement+=" 	union "
																									SQLStatement+=" 	select 'Pollution' as type,   '' as extra,id    as id, recordupdated from MyFormsResponses where lastupdated='CLOSED' and formname = 'Pollution' "
																										SQLStatement+=" 	union "
																											SQLStatement+=" 	select 'CustomerFeedback' as type,  '' as extra, id    as id, recordupdated from MyFormsResponses where lastupdated='CLOSED' and formname = 'CustomerFeedback' "
																												SQLStatement+=" 		order by recordupdated asc "

																													html5sql.process(SQLStatement,
																															function(transaction, results, rowsArray){


																														if (rowsArray.length>0) {

																															item = rowsArray[0];
																															syncUploadAzure(item.id,item.type)
																															//syncUploadNew(item.id,item.type)
																														}else{

																														}
																													},
																													function(error, statement){
																														alert(error+statement)
																													}        
																													);

}

function syncUploadNew(id,type){

	var c040="NA"	
		var d040=""		
			var c060="NA"	
				var d060=""	
					var c100="NA"	
						var d100=""
							var 	formalsampletaken = ""	
								var 	upstreamsenttolab= ""
									var 	ptofdiscsenttolab= ""
										var 	downstream1senttolab= ""
											var 	downstream2senttolab= ""
												var 	downstream3senttolab= ""

													if(checkConnection()=='No network connection'){
														return
													}

	user=localStorage.getItem("MobileUser")
	empid=localStorage.getItem("EmployeeID")
	var newDets="";
	var currentUser="";
	syncDetsSet=false;
	var codeval
	SAPServerPrefix=$.trim(localStorage.getItem('ServerName'));
	sapCalls = 0;
	if (!CheckSyncInterval('UPLOAD')){
		console.log("upload interval not met")
		return; }
	if (localStorage.getItem("SAPCalling")=="true"){
		console.log("SAP is being Called")
		return
	}
	//opMessage("Synchronizing Upload Data");
	console.log(id+"-----"+type)	
	var syncDetails = false	;
	html5sql.process(
			"SELECT * from MyUserDets",
			function(transaction, results, rowsArray){
				if( rowsArray.length > 0) {
					curremtUser="&username="+rowsArray[0].user;
					SAPServerSuffix="?jsonCallback=?&MYJOBSSYSTEM="+localStorage.getItem('SAPSystem')+"&sap-client="+localStorage.getItem('SAPClient')+"&sap-user="+rowsArray[0].user+"&sap-password="+rowsArray[0].password;
					if(type=="VehicleCheck")// Process Vehicle Defects
					{
						html5sql.process("SELECT * from MyVehicleCheck where id = '"+id+"'",
								function(transaction, results, rowsArray){
							if( rowsArray.length > 0) {
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", VehicleCheck:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"VehicleCheck:"+String(rowsArray.length));
								}
								if(!syncDetsSet){
									syncDetsSet=true;
									SetLastSyncDetails("LASTSYNC_UPLOAD");

								}
								item = rowsArray[0];
								if(item['desc'].length<1){
									codeval='Y'
								}else{
									codeval='N'	
								}

								newVehicleCheck='&MEAS_POINT='+item['mpoint']+'&MEAS_EQUIP='+item['equipment']+'&MEAS_DATE='+item['mdate']+'&MEAS_TIME='+item['mtime']+'&MEAS_TEXT='+item['desc']+'&MEAS_LONG_TEXT='+item['longtext']+'&RECNO='+item['id']+'&MEAS_READ_BY='+item['mreadby']+'&USER='+item['user']+'&MEAS_READING='+item['mileage']+'&MEAS_VAL_CODE='+codeval;
								opMessage("Vehicle Defect"+newVehicleCheck);

								sapCalls+=1;

								html5sql.process("UPDATE MyNewJobs SET state = 'SENDING' WHERE id='"+item['id']+"'",
										function(){
									if(item['reg'].length<1){
										sendSAPData("MyJobsCreateVehicleDefect.htm",newVehicleCheck,"UPDATE MyVehicleCheck SET state = 'NEW' WHERE id='"+item['id']+"'");
									}else{
										sendSAPData("MyJobsCreateVehicleMileage.htm",newVehicleCheck,"UPDATE MyVehicleCheck SET state = 'NEW' WHERE id='"+item['id']+"'");
									}



								},
								function(error, statement){

									opMessage("Error: " + error.message + " when processing " + statement);
								}        
								);

							}
						},
						function(error, statement){

							opMessage("Error: " + error.message + " when processing " + statement);
						});
					}

					if(type=="NotificationsZ7")// Process New Notifications	EOD		
					{					

						html5sql.process("SELECT * from MyNotifications where id = '"+id+"'",
								function(transaction, results, rowsArray){
							if( rowsArray.length > 0) {
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", EOD:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"EOD:"+String(rowsArray.length));
								}
								if(!syncDetsSet){
									syncDetsSet=true;
									SetLastSyncDetails("LASTSYNC_UPLOAD");

								}

								item = rowsArray[0];
								newEODDets='&TYPE='+item['type']+'&ACT_START_DATE='+item['startdate']+'&ACT_START_TIME='+item['starttime']+'&ACT_END_DATE='+item['enddate']+'&ACT_END_TIME='+item['endtime']+'&SHORT_TEXT='+item['shorttext']
								newEODDets+='&REPORTED_BY='+localStorage.getItem('EmployeeID')+'&USERID='+localStorage.getItem('MobileUser')+'&ID='+item['id'];;
								opMessage("New EOD Notifications Details="+newEODDets);

								sapCalls+=1;
								n=rowsArray.length
								html5sql.process("UPDATE MyNotifications SET notifno = 'SENDING' WHERE id='"+item['id']+"'",
										function(){
									sendSAPData("MyJobsCreateEODNotification.htm",newEODDets,"UPDATE MyNotifications SET notifno = 'NEW' WHERE id='"+item['id']+"'");

								},
								function(error, statement){

									opMessage("Error: " + error.message + " when processing " + statement);
								}        
								);
							}

						},
						function(error, statement){

							opMessage("Error: " + error.message + " when processing " + statement);
						});
					}

					if(type=="Notifications")// Process New Notifications		
					{	

						html5sql.process("SELECT * from MyNotifications where id = '"+id+"'",
								function(transaction, results, rowsArray){
							if( rowsArray.length > 0) {
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", Notifications:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"Notifications:"+String(rowsArray.length));
								}
								if(!syncDetsSet){
									syncDetsSet=true;
									SetLastSyncDetails("LASTSYNC_UPLOAD");

								}

								item = rowsArray[0];
								newNotifDets='&NOTIF_TYPE='+item['type']+'&ASSIG_TOME='+item['assigntome']+'&START_DATE='+item['startdate']+'&START_TIME='+item['starttime']+'&END_DATE='+item['startdate']+'&END_TIME='+item['starttime']+'&SHORT_TEXT='+item['shorttext']+'&LONG_TEXT='+item['longtext']+'&ID='+item['id'];
								newNotifDets+='&CODING='+item['pcode']+'&CODE_GROUP='+item['pgroup']+'&EQUIPMENT='+item['equipment']+'&FUNCT_LOC='+item['funcloc']+'&REPORTED_BY='+localStorage.getItem('EmployeeID')+'&USERID='+localStorage.getItem('MobileUser');
								opMessage("New Notifications Details="+newNotifDets);

								sapCalls+=1;
								n=rowsArray.length
								html5sql.process("UPDATE MyNotifications SET notifno = 'SENDING' WHERE id='"+item['id']+"'",
										function(){
									sendSAPData("MyJobsCreateNewJob2.htm",newNotifDets,"UPDATE MyNotifications SET notifno = 'NEW' WHERE id='"+item['id']+"'");

								},
								function(error, statement){

									opMessage("Error: " + error.message + " when processing " + statement);
								}        
								);
							}

						},
						function(error, statement){

							opMessage("Error: " + error.message + " when processing " + statement);
						});
					}

					if(type=="StatusUpdate")// Process Status Updates			
					{														
						html5sql.process("SELECT * from MyStatus where id = '"+id+"'",
								function(transaction, results, rowsArray){
							if( rowsArray.length > 0) {
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", Status:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"Status:"+String(rowsArray.length));
								}
								if(!syncDetsSet){
									syncDetsSet=true;
									SetLastSyncDetails("LASTSYNC_UPLOAD");

								}

								item = rowsArray[0];
								newStatusDets='&ORDERNO='+item['orderno']+'&OPNO='+item['opno']+'&STATUS='+item['status']+'&STSMA='+item['stsma']+'&ACT_DATE='+item['actdate'].substring(8,10)+"."+item['actdate'].substring(5,7)+"."+item['actdate'].substring(0,4)+'&ACT_TIME='+item['acttime']+'&RECNO='+item['id']+'&USERID='+localStorage.getItem('MobileUser');
								opMessage("Newstatus Details="+newStatusDets);

								sapCalls+=1;							
								n = rowsArray.length
								html5sql.process("UPDATE MyStatus SET state = 'SENDING' where id='"+item['id']+"'",
										function(){
									sendSAPData("MyJobsUpdateStatus.htm",newStatusDets,"UPDATE MyStatus SET state = 'NEW' where id='"+item['id']+"'");

								},
								function(error, statement){

									opMessage("Error: " + error.message + " when processing " + statement);
								}        
								);
							}

						},
						function(error, statement){

							opMessage("Error: " + error.message + " when processing " + statement);
						});
					}
					if(type=="FileRequest")// Process Status Updates			
					{		

						html5sql.process("SELECT * from MyJobDetsDraw where id = '"+id+"'",
								function(transaction, results, rowsArray){
							if( rowsArray.length > 0) {
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", FileRequest:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"FileRequest:"+String(rowsArray.length));
								}
								if(!syncDetsSet){
									syncDetsSet=true;
									SetLastSyncDetails("LASTSYNC_UPLOAD");

								}

								item = rowsArray[0];
								if(item['zact'].length<4){
									opno="0010"
								}else{
									opno=item['opno']
								}
								params='?reqname='+localStorage.getItem('MobileUser')+item['orderno']+opno+item['id']+".xml"+"&id="+item['id']+
								'&orderno='+parseInt(item['orderno'], 10)+'&opno='+opno+'&user='+localStorage.getItem('MobileUser')+'&scenario=Y008'+'&scenariodesc=Y008Desc'+'&mname='+localStorage.getItem('MobileUser')+'&nodeid='+trim(item['nodeid'])
								opMessage("File Request="+params);

								sapCalls+=1;							
								n = rowsArray.length
								html5sql.process("UPDATE MyJobDetsDraw SET zurl = 'WaitingLiveLink' where id='"+item['id']+"'",
										function(){
									buildJobDocsTable();
									RequestAzureLLFile(params)	
								},
								function(error, statement){

									opMessage("Error: " + error.message + " when processing " + statement);
								}        
								);
							}

						},
						function(error, statement){

							opMessage("Error: " + error.message + " when processing " + statement);
						});
					}
					if(type=="FileDownload")// Process LLDownloads			
					{			

						html5sql.process("SELECT * from MyJobDetsDraw where id = '"+id+"'",
								function(transaction, results, rowsArray){

							if( rowsArray.length > 0) {
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", FileDownload:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"FileDownload:"+String(rowsArray.length));
								}

								if(!syncDetsSet){
									syncDetsSet=true;
									SetLastSyncDetails("LASTSYNC_UPLOAD");

								}

								dir="MyJobs/User/"+localStorage.getItem('MobileUser')+"/"+parseInt(rowsArray[0]['orderno'],10).toString()+"-0010"
								fname=rowsArray[0]['fname']


								sapCalls+=1;							
								n = rowsArray.length
								html5sql.process("UPDATE MyJobDetsDraw SET zurl = 'DownloadingLiveLink' where id='"+rowsArray[0]['id']+"'",
										function(){
									buildJobDocsTable();
									downlodRequestedFile(dir,fname,rowsArray[0]['id'])
								},
								function(error, statement){

									opMessage("Error: " + error.message + " when processing " + statement);
								}        
								);
							}

						},
						function(error, statement){

							opMessage("Error: " + error.message + " when processing " + statement);
						});
					}									
					if(type=="JobClose")// Process Close Jobs			
					{														

						html5sql.process("SELECT * from MyJobClose where id = '"+id+"'",	
								function(transaction, results, rowsArray){
							if( rowsArray.length > 0) {
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", Close:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"Close:"+String(rowsArray.length));
								}
								if(!syncDetsSet){
									syncDetsSet=true;
									SetLastSyncDetails("LASTSYNC_UPLOAD");

								}

								item = rowsArray[0];

								newCloseDets='&NOTIFNO='+item['notifno']+'&USERID='+localStorage.getItem('MobileUser')+'&RECNO='+item['id']+
								'&FUNCT_LOC='+item['funcloc']+
								'&EQUIPMENT='+item['equipment']+
								'&LONG_TEXT='+item['details']+
								'&DL_CAT_TYP=P'+'&DL_CODE_GRP='+item['pgrp']+'&DL_CODE='+item['pcode']+
								'&D_CAT_TYP=R'+'&D_CODE_GRP='+item['agrp']+'&D_CODE='+item['acode']+
								'&CAUSE_CAT_TYP=S'+'&CAUSE_CODE_GRP='+item['igrp']+'&CAUSE_CODE='+item['icode']





								opMessage("Close Notif Update Details="+newCloseDets);


								sapCalls+=1;		

								html5sql.process("UPDATE MyJobClose SET state = 'SENDING' WHERE id='"+item['id']+"'",
										function(){

									if (item['notifno'].length>5){

										sendSAPData("MyJobsUpdateNotif.htm",newCloseDets,"UPDATE MyJobClose SET state = 'NEW' WHERE id='"+item['id']+"'");

									}

								},
								function(error, statement){
									// alert("Error: " + error.message + " when processing " + statement);
									opMessage("Error: " + error.message + " when processing " + statement);
								}        
								);
							}

						},
						function(error, statement){

							opMessage("Error: " + error.message + " when processing " + statement);
						});
					}
					if(type=="Flooding")// Flooding Form			
					{		


						sqlstatement="SELECT * from myformsresponses where  id = '"+id+"'",	

						html5sql.process(sqlstatement,
								function(transaction, results, rowsArray){

							if(rowsArray.length>0){

								jsonstr=$.parseJSON(unescape(rowsArray[0].contents))
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", Flooding:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"Flooding:"+String(rowsArray.length));
								}
								if(!syncDetsSet){
									syncDetsSet=true;
									SetLastSyncDetails("LASTSYNC_UPLOAD");

								}




								item = rowsArray[0];

								params="&RECNO="+rowsArray[0].id+"&USERID="+user+"&AUFNR="+rowsArray[0].orderno+"&NOTIF_NO="+rowsArray[0].notifno+
								"&ZASTYP="+jsonstr[0].sewertype.trim()+
								"&ZAESSTA="+jsonstr[0].sewerstatus.trim()+
								"&ZAWEAT="+jsonstr[0].floodweather.trim()
								var pdepth="";
								var pitem="";





								locsArray = [""]

								for(var cnt=0; cnt < jsonstr[0].location.length ; cnt++)
								{
									if(cnt>0){
										pitem+=","
									}
									row=cnt+1;	
									litenno = row *10;
									litem = ("0000" + litenno).slice(-4)
									type=jsonstr[0].location[cnt]["loctype-"+row].split(":")
									subtype=jsonstr[0].location[cnt]["locsubtype-"+row].split(":")
									severity=jsonstr[0].location[cnt]["locseverity-"+row].split(":")
									floc=jsonstr[0].location[cnt]["locfloc-"+row].split(":")
									comments=jsonstr[0].location[cnt]["loccomments-"+row].split(":")
									pitem+=rowsArray[0].orderno+','+litem+","+type[0]+","+subtype[0]+","+floc[0]+",,,,,,,,,,,,,,,,"+comments[0]+",,"+severity[0]+',1.00'
									locsArray.push(floc[0])
									//alert("Loc:"+orderno+','+litem+","+type[0]+","+subtype[0]+","+floc[0])
								}
								roomsArray=[]
								for(var cnt=0; cnt < jsonstr[0].room.length ; cnt++)
								{
									row=cnt+1;	
									loc=jsonstr[0].room[cnt]["roomloc-"+row].split(":")
									room=jsonstr[0].room[cnt]["roomroom-"+row].split(":")
									depth=jsonstr[0].room[cnt]["roomdepth-"+row].split(":")
									comments=jsonstr[0].room[cnt]["roomcomments"+row].split(":")

									roomsArray.push(loc[0]+"|"+room[0]+"|"+depth[0]+"|"+comments[0])


								}
								roomsArray.sort();
								var pdepth="";
								var wasitem=0;
								dno=1;
								for(var cnt=0; cnt < roomsArray.length ; cnt++)
								{
									if(cnt>0){
										pdepth+=","
									}
									theroom = roomsArray[cnt].split("|");
									row=cnt+1;	
									loc=theroom[0]
									litemno = row *10;
									f1=locsArray.indexOf(loc);
									if (f1!=wasitem){
										wasitem = f1;
										dno=1;
									}else{
										dno++;
									}
									litem=("0000" + f1*10).slice(-4)
									ditem=("0000" + dno*10).slice(-4)

									room=theroom[1]
									depth=theroom[2]
									comments=theroom[3]
									pdepth+=rowsArray[0].orderno+','+litem+','+ditem+','+room+",,"+depth+",,"+comments+","
									//alert("room:"+orderno+','+litem+','+ditem+','+room+",,"+depth+",,"+comments)



								}	

								//need to populate the PHDR
								//sort date & time formats
								gridref=jsonstr[0].gridref.split(",");
								if(gridref.length>1){
									ENRef=gridref[0].substring(0,9)+":"+gridref[1].substring(0,9)
								}else{
									ENRef=gridref
								}
								jsonstr[0].floodtime=jsonstr[0].floodtime+":00"
								jsonstr[0].attendancetime=jsonstr[0].attendancetime+":00"
								flooddate=jsonstr[0].flooddate.substring(6,10)+jsonstr[0].flooddate.substring(3,5)+jsonstr[0].flooddate.substring(0,2)
								floodtime=jsonstr[0].floodtime.substring(0,2)+jsonstr[0].floodtime.substring(3,5)+jsonstr[0].floodtime.substring(6,8)
								attenddate=jsonstr[0].attendancedate.substring(6,10)+jsonstr[0].attendancedate.substring(3,5)+jsonstr[0].attendancedate.substring(0,2)
								attendtime=jsonstr[0].attendancetime.substring(0,2)+jsonstr[0].attendancetime.substring(3,5)+jsonstr[0].attendancetime.substring(6,8)
								params+="&PHDR="+rowsArray[0].orderno+','+jsonstr[0].assetref.trim()+','+jsonstr[0].psshortcode+','+jsonstr[0].causeofflood+','+
								ENRef+',,'+flooddate+','+floodtime+','+empid+','+getShortSAPDate()+','+user+','+''+','+
								""+','+"Comments"+','+jsonstr[0].spillsize+","+attenddate+","+attendtime+','+
								jsonstr[0].attendanceweather+","+jsonstr[0].previousflooding+','+jsonstr[0].floodingsource+','+jsonstr[0].rootcause+
								"&PDEPTH="+pdepth+
								"&PITEM="+pitem


								sendSAPData("MyJobsDG5Create.htm",params,"UPDATE MyFormsResponses SET lastupdated = 'COMPLETE' WHERE id='"+rowsArray[0].id+"'");







								sapCalls+=1;		

								html5sql.process("UPDATE myformsresponses SET lastupdated = 'SENDING' WHERE id='"+item['id']+"'",
										function(){


								},
								function(error, statement){
									// alert("Error: " + error.message + " when processing " + statement);
									opMessage("Error: " + error.message + " when processing " + statement);
								}        
								);
							}

						},
						function(error, statement){

							opMessage("Error: " + error.message + " when processing " + statement);
						});
					}
					if(type=="Pollution")// Pollution Form			
					{														

						sqlstatement="SELECT * from myformsresponses where  id = '"+id+"'",	

						html5sql.process(sqlstatement,
								function(transaction, results, rowsArray){

							if(rowsArray.length>0){

								jsonstr=$.parseJSON(unescape(rowsArray[0].contents))
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", Pollution:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"Pollution:"+String(rowsArray.length));
								}
								if(!syncDetsSet){
									syncDetsSet=true;
									SetLastSyncDetails("LASTSYNC_UPLOAD");

								}




								item = rowsArray[0];

								if(jsonstr[0].formalsampletakenV=="YES"){	formalsampletaken="X"	}
								if(jsonstr[0].upstreamsenttolabV=="YES"){	upstreamsenttolab="X"	}
								if(jsonstr[0].ptofdiscsenttolabV=="YES"){	ptofdiscsenttolab="X"	}
								if(jsonstr[0].downstream1senttolabV=="YES"){	downstream1senttolab="X"	}
								if(jsonstr[0].downstream2senttolabV=="YES"){	downstream2senttolab="X"	}
								if(jsonstr[0].downstream3senttolabV=="YES"){	downstream3senttolab="X"	}

								params="&RECNO="+rowsArray[0].id+"&USERID="+user+"&AUFNR="+rowsArray[0].orderno+"&NOTIF_NO="+rowsArray[0].notifno+"&PPIA="+rowsArray[0].orderno+','+

								jsonstr[0].pollutionsitetype.trim()+",,"+jsonstr[0].pollutionsite.trim()+","+
								jsonstr[0].dischargetype.trim()+",,"+
								jsonstr[0].watercoursetype.trim()+",,"+
								jsonstr[0].watercoursewidth.trim()+",,"+
								formalsampletaken.trim()+","+
								jsonstr[0].sizeofimpact.trim()+","+
								jsonstr[0].amenitiesimpact.trim()+",,"+
								jsonstr[0].aestheticimpact.trim()+",,"+
								jsonstr[0].upstreamdistance.trim()+","+jsonstr[0].ptofdiscdistance.trim()+","+jsonstr[0].downstream1distance.trim()+","+jsonstr[0].downstream2distance.trim()+","+jsonstr[0].downstream3distance.trim()+","+
								jsonstr[0].upstreamonsitenh3.trim()+","+jsonstr[0].ptofdisconsitenh3.trim()+","+jsonstr[0].downstream1onsitenh3.trim()+","+jsonstr[0].downstream2onsitenh3.trim()+","+jsonstr[0].downstream3onsitenh3.trim()+","+
								upstreamsenttolab.trim()+","+ptofdiscsenttolab.trim()+","+downstream1senttolab.trim()+","+downstream2senttolab.trim()+","+downstream3senttolab.trim()

								sendSAPData("MyJobsPIACreate.htm",params,"UPDATE MyFormsResponses SET lastupdated = 'COMPLETE' WHERE id='"+rowsArray[0].id+"'");							






								sapCalls+=1;		

								html5sql.process("UPDATE myformsresponses SET lastupdated = 'SENDING' WHERE id='"+item['id']+"'",
										function(){

								},
								function(error, statement){
									// alert("Error: " + error.message + " when processing " + statement);
									opMessage("Error: " + error.message + " when processing " + statement);
								}        
								);
							}

						},
						function(error, statement){

							opMessage("Error: " + error.message + " when processing " + statement);
						});
					}


					if(type=="CustomerFeedback")// Pollution Form			
					{	

						sqlstatement="SELECT * from myformsresponses where  id = '"+id+"'",	

						html5sql.process(sqlstatement,
								function(transaction, results, rowsArray){

							if(rowsArray.length>0){

								jsonstr=$.parseJSON(unescape(rowsArray[0].contents))
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", Pollution:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"Pollution:"+String(rowsArray.length));
								}
								if(!syncDetsSet){
									syncDetsSet=true;
									SetLastSyncDetails("LASTSYNC_UPLOAD");

								}




								item = rowsArray[0];
								if(jsonstr[0].reason.length>0){
									c040="LT"	
										d040=jsonstr[0].reason
								}
								if(jsonstr[0].cause.length>0){
									c060="LT"	
										d060=jsonstr[0].cause
								}
								if(jsonstr[0].ppmdetails.length>0){
									c100="LT"	
										d100=jsonstr[0].ppmdetails
								}
								params="&RECNO="+rowsArray[0].id+"&NOTIF_TYPE=ZC&USER="+user+"&ORDER_ID="+rowsArray[0].orderno+"&NOTIF_NO="+rowsArray[0].notifno+
								"&MAIN_WORK_CTR="+rowsArray[0].wc+"&PLANT="+rowsArray[0].plant+"&USER_STATUS_H="+rowsArray[0].opno+
								"&ACT_CODEGRP_1=CUST010&ACT_CODE_1="+jsonstr[0].spokentoV.substring(0,1)+"&ACT_TEXT_1="+jsonstr[0].spokentoV+
								"&ACT_CODEGRP_2=CUST020&ACT_CODE_2="+jsonstr[0].contactcardV.substring(0,1)+"&ACT_TEXT_2="+jsonstr[0].contactcardV+
								"&ACT_CODEGRP_3=CUST030&ACT_CODE_3="+jsonstr[0].custsatifaction+"&ACT_TEXT_3="+jsonstr[0].custsatifaction+
								"&ACT_CODEGRP_4=CUST040&ACT_CODE_4="+c040+"&ACT_TEXT_4="+d040+
								"&ACT_CODEGRP_5=CUST050&ACT_CODE_5="+jsonstr[0].resolvedV.substring(0,1)+"&ACT_TEXT_5="+jsonstr[0].resolvedV+
								"&ACT_CODEGRP_6=CUST060&ACT_CODE_6="+c060+"&ACT_TEXT_6="+d060+
								"&ACT_CODEGRP_7=CUST070&ACT_CODE_7="+jsonstr[0].furtherworkV.substring(0,1)+"&ACT_TEXT_7="+jsonstr[0].furtherworkV+
								"&ACT_CODEGRP_8=CUST080&ACT_CODE_8="+jsonstr[0].additionalworkV.substring(0,1)+"&ACT_TEXT_8="+jsonstr[0].additionalworkV+
								"&ACT_CODEGRP_9=CUST090&ACT_CODE_9="+jsonstr[0].ppmV.substring(0,1)+"&ACT_TEXT_9="+jsonstr[0].ppmV+
								"&ACT_CODEGRP_10=CUST100&ACT_CODE_10="+c100+"&ACT_TEXT_10="+d100
								sendSAPData("MyJobsCreateCFEED.htm",params,"UPDATE MyFormsResponses SET lastupdated = 'COMPLETE' WHERE id='"+rowsArray[0].id+"'");




								sapCalls+=1;		

								html5sql.process("UPDATE myformsresponses SET lastupdated = 'SENDING' WHERE id='"+item['id']+"'",
										function(){


								},
								function(error, statement){
									// alert("Error: " + error.message + " when processing " + statement);
									opMessage("Error: " + error.message + " when processing " + statement);
								}        
								);
							}

						},
						function(error, statement){

							opMessage("Error: " + error.message + " when processing " + statement);
						});
					}
					if(type=="TimeConf")// Process Time Confirmations		
					{														

						html5sql.process("SELECT * from MyTimeConfs where id = '"+id+"'",

								function(transaction, results, rowsArray){
							if( rowsArray.length > 0) {
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", TimeConfs:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"TimeConfs:"+String(rowsArray.length));
								}

								item = rowsArray[0];
								if(item['final']=="Yes"){
									fconf="X";
								}else{
									fconf="";
								}									
								newTConfDets='&ORDERNO='+item['orderno']+'&OPNO='+item['opno']+'&CONF_TEXT='+item['description']+
								'&TIME='+item['duration']+'&USER='+item['user']+'&RECNO='+item['id']+
								'&SDATE='+item['date'].substring(8,10)+"."+item['date'].substring(5,7)+"."+item['date'].substring(0,4)+'&STIME='+item['time']+'&EDATE='+item['enddate'].substring(8,10)+"."+item['enddate'].substring(5,7)+"."+item['enddate'].substring(0,4)+'&ETIME='+item['endtime']+
								'&ACTIVITYTYPE='+item['type']+'&WORK_CNTR='+item['work_cntr']+'&PERS_NO='+item['empid']+'&LONG_TEXT='+item['longtext']+
								'&ACT_WORK='+item['act_work']+'&REM_WORK='+item['rem_work']+'&FINAL='+item['final']
								if (item['reason']!=null){
									newTConfDets+='&REASON='+item['reason']
								}

								opMessage("NewTconf Details="+newTConfDets);

								sapCalls+=1;
								n = rowsArray.length
								html5sql.process("UPDATE MyTimeConfs SET confno = 'SENDING' WHERE id='"+item['id']+"'",
										function(){
									sendSAPData("MyJobsCreateTConf.htm",newTConfDets,"UPDATE MyTimeConfs SET confno = 'NEW' WHERE id='"+item['id']+"'");

								},
								function(error, statement){

									opMessage("Error: " + error.message + " when processing " + statement);
								}        
								);
							}

						},
						function(error, statement){

							opMessage("Error: " + error.message + " when processing " + statement);
						});
					}

					if(type=="MessageRead")// Upload the Messages READ Indicator
					{														

						html5sql.process("SELECT * from MyMessages where id = '"+id+"'",
								function(transaction, results, rowsArray){

							//opMessage("done READ Message Select");
							//opMessage("READ Messages = "+rowsArray.length);
							if( rowsArray.length > 0) {
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", Read Messages:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"Read Messages:"+String(rowsArray.length));
								}
								if(!syncDetsSet){
									syncDetsSet=true;
									SetLastSyncDetails("LASTSYNC_UPLOAD");

								}

								item = rowsArray[0];

								newMessageDets='&ID='+item['id']+'&DOCID='+item['msgid'];
								opMessage("READ Status= "+newMessageDets);


								html5sql.process("UPDATE MyMessages SET state = 'SENDING' WHERE id='"+item['id']+"'",
										function(){
									///sendSAPData("MyJobsMessageSetReadFlag.htm",newMessageDets,"UPDATE MyMessages SET state = 'NEW' WHERE id='"+item['id']+"'");

								},
								function(error, statement){

									opMessage("Error: " + error.message + " when processing " + statement);
								}        
								);
							}

						},
						function(error, statement){

							opMessage("Error: " + error.message + " when processing " + statement);
						});
					}

					if(type=="MesssageNew")// Upload the NEW Sent Messages
					{														

						html5sql.process("SELECT * from MyMessages where id = '"+id+"'",

								function(transaction, results, rowsArray){

							//opMessage("done SEND Message Select");
							//opMessage("SEND Messages = "+rowsArray.length);
							if( rowsArray.length > 0) {
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", Messages:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"Messages:"+String(rowsArray.length));
								}
								if(!syncDetsSet){
									syncDetsSet=true;
									SetLastSyncDetails("LASTSYNC_UPLOAD");
									sapCalls+=1;
								}

								item = rowsArray[0];

								newSentMsgDets='&ID='+item['id']+'&TO='+item['msgtoid']+'&SUBJECT='+item['msgsubject']+'&CONTENT='+item['msgtext'];
								opMessage("SEND Status= "+newSentMsgDets);


								html5sql.process("UPDATE MyMessages SET state = 'SENDING' WHERE id='"+item['id']+"'",
										function(){
									//sendSAPData("MyJobsMessageSend.htm",newSentMsgDets,"UPDATE MyMessages SET state = 'NEW' WHERE id='"+item['id']+"'");

								},
								function(error, statement){

									opMessage("Error: " + error.message + " when processing " + statement);
								}        
								);
							}

						},
						function(error, statement){

							opMessage("Error: " + error.message + " when processing " + statement);
						});
					}

					if(type=="MPointDoc")// Seding Measurement Docs
					{														

						html5sql.process("SELECT * from MyMpointDocs where id = '"+id+"'",
								function(transaction, results, rowsArray){

							console.log("found MP"+rowsArray.length)
							if( rowsArray.length > 0) {
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", MPDocs:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"MPDocs:"+String(rowsArray.length));
								}
								if(!syncDetsSet){
									syncDetsSet=true;
									SetLastSyncDetails("LASTSYNC_UPLOAD");
									sapCalls+=1;
								}

								item = rowsArray[0];
								var mpcode=""
									if(item['code']!="-1"){
										mpcode=item['code'];
									}
								newMPDoc='&EQUIPMENT='+item['equipment']+'&FUNC_LOC='+item['funcloc']+'&MEAS_POINT='+item['meas_point']+
								'&READING_DATE='+item['date']+
								'&READING_TIME='+item['time']+
								'&RECNO='+item['id']+
								'&READER='+localStorage.getItem('MobileUser')+
								'&RECORDED_VALUE='+item['value']+
								'&VALUATION_CODE='+mpcode+
								'&SHORT_TEXT='+item['shorttext']+
								'&USERID='+localStorage.getItem('MobileUser')
								opMessage("SEND Status= "+newMPDoc);


								html5sql.process("UPDATE MyMpointDocs SET state = 'SENDING' WHERE id='"+item['id']+"'",
										function(){
									sendSAPData("MyJobsCreateMPDoc.htm",newMPDoc,"UPDATE MyMpointDocs SET state = 'NEW' WHERE id='"+item['id']+"'");

								},
								function(error, statement){

									opMessage("Error: " + error.message + " when processing " + statement);
								}        
								);
							}

						},
						function(error, statement){

							opMessage("Error: " + error.message + " when processing " + statement);
						});
					}
				}
			},
			function(error, statement){

				opMessage("Error: " + error.message + " when processing " + statement);
			});







}

function loadAssetXML(fname){
	$.ajax({
		type: "GET",
		url: fname,
		dataType: "xml",
		success: function (xml) {    
			xmlDoc=xml 
			BuildAssetDetails();
		}    

	});

};
function BuildAssetDetails(){
	var sqlinsert1=""
		var sqlinsert2=""
			var sqlstatement=""
				var opsql=0;
	txt = "";
	x = xmlDoc.documentElement.childNodes;
	for (i = 0; i < x.length; i++) { 
		if (x[i].nodeType == 1) {

			y = x[i].attributes;

			var first=0
			var len=x[i].attributes.length

			for (n = 0; n < 22; n++) { 
				if(first==0){
					sqlinsert1=y[0].name
					sqlinsert2='"'+escape(y[n].value)+'"'
					first=1
				}else{
					sqlinsert1+=","+y[n].name
					sqlinsert2+=',"'+escape(y[n].value)+'"'
				}

			} 
			sqlstatement+="insert into assetdetails ("+sqlinsert1+") values ("+sqlinsert2+");"
			sqlinsert1=""
				sqlinsert2=""
		}
		if((i!=0)&&((i%1000)==0)){

			insertAssetDetails(sqlstatement)

			sqlstatement=""

		}

	}

	insertAssetDetails(sqlstatement)


}

function insertAssetDetails(sql){
	console.log("isertig stuff")
	html5sql.process(sql,
			function(){

		console.log("write ok")
	},
	function(error, statement){
		console.log("Error: " + error.message + " when loading Assets " + statement);
		opMessage("Error: " + error.message + " when loading Assets " + statement);
	}        
	);
}	

function getAllAssets(pplant,mplant){
	allAssetCalls=[]
	if(mplant.search(":")<0){

		requestSAPData("MyJobsassetextbyplant.htm",'&planttype=ZIWERK&plant='+pplant);
	}else{

		mplants = mplant.split(":")
		mplants[1]=mplants[0]
		mplants[0]="NSVE"
			i=0;
		for (i = 0; i < mplants.length; i++) { 

			// requestSAPData("MyJobsassetextbyplant.htm",'&planttype=ZSWERK&plant='+mplants[i]);
			allAssetCalls.push("MyJobsassetextbyplant.htm"+"|"+"&planttype=ZSWERK&plant="+mplants[i]);

		}

		mplnt=allAssetCalls.splice(0,1)+" "
		x=mplnt.split("|")		
		requestSAPData(x[0],x[1])
	}



}
//AZURE
function syncReference(){


	if (!CheckSyncInterval('REFERENCE')){return; }
	opMessage("Synchronizing Reference Data");


	html5sql.process(
			["SELECT * from MyUserDets"],
			function(transaction, results, rowsArray){
				if( rowsArray.length > 0) {
					SAPServerSuffix="?jsonCallback=?&MYJOBSSYSTEM="+localStorage.getItem('SAPSystem')+"&sap-client="+localStorage.getItem('SAPClient')+"&sap-user="+rowsArray[0].user+"&sap-password="+rowsArray[0].password+"&username="+rowsArray[0].mobileuser;
					myScenario = rowsArray[0].scenario
					html5sql.process("SELECT * from MyWorkConfig where paramname = 'SERVERNAME'",
							function(transaction, results, rowsArray){
						if( rowsArray.length > 0) {
							SetLastSyncDetails("LASTSYNC_REFERENCE");
							localStorage.setItem('LastSyncReferenceDetails','');
							syncReferenceDetsUpdated=false;
							SAPServerPrefix=$.trim(rowsArray[0].paramvalue);							
							opMessage("Sending SAP Request for Ref Data");	
							//getAssetFiles()
							//requestSAPData("MyJobsRefData.htm",'');
							//requestSAPData("MyJobsRefDataCodes.htm",'');
							// requestSAPData("MyJobsUsers.htm",''); /////////This was the Old SAP Call
							//requestSAPData("MyJobsAssetPlantsExt.htm",'');
							//requestSAPData("MyJobsVehiclesDefault.htm",'');
							//requestSAPData("MyJobsVehicles.htm",'');
							//requestDEMOData('MyForms.json');
							//requestDEMOData('PE29.json');
							//requestDEMOData('POSTRIDGE2.json');
							//requestDEMOData('MyJobsDG5Codes.json');
//Start of Azure
							requestAzureData("ZGW_MAM_MAINT_PARAM", "Name ne 'ALL'");
						    requestAzureData("ZGW_MAM30_090_GETLIST_T3", "");             //Users
							requestAzureData("ZGW_MAM30_VEHICLE", "");                    //vehicles
							requestAzureData("ZG_MAM30_APPBAR_CTRL_SRV", "WHERE scenario = '"+myScenario+"'");             //AppBar
						    requestAzureData("ZGW_MAM30_REFDATA_T3_SRVActivity", "");     //Activities
						    requestAzureData("ZGW_MAM30_REFDATA_T3_SRVNotifTypes", "WHERE myalmScenario = '"+myScenario+"'");     //NotifTypes
						    requestAzureData("ZGW_MAM30_REFDATA_T3_SRVPAICode", "WHERE myalmScenario = '"+myScenario+"'");        // PAI Codes
						    requestAzureData("ZGW_MAM30_RFV_T3_SRV", "");                 // Variances RFV
						    requestAzureData("ZGW_MAM30_DG5_PIA_CODES_T3Dg5Code", "");
						    requestAzureData("ZGW_MAM30_DG5_PIA_CODES_T3Dg5Rel", "");
						    //getAssets()
						    //requestAzureData("ZGW_GET_JOB_DETAILS","PSMITH11")
//End of Azure							
							getFormsDL();
						}

					},
					function(error, statement){
						opMessage("Error: " + error.message + " when syncTransactional processing " + statement); 
					}
					);
				}
			},
			function(error, statement){
				opMessage("Error: " + error.message + " when syncTransactional processing " + statement);          
			}
	);







}
//AZURE
function syncUsersDetails(server){


	opMessage("Synchronizing Users Details");



	html5sql.process("SELECT * from MyWorkConfig where paramname = 'SERVERNAME'",
			function(transaction, results, rowsArray){
		if( rowsArray.length > 0) {
			SAPServerPrefix=$.trim(server);							
		    requestAzureData("ZGW_MAM30_090_GETLIST_T3", "");             //Users
			
		}

	},
	function(error, statement){
		opMessage("Error: " + error.message + " when syncTransactional processing " + statement); 
	}
	);
			







}

function getAssetFiles(){

	//downloadfile("T2_MPLT_ESVM.XML")
	//downloadfile("T2_MPLT_ESVN.XML")
	//downloadfile("T2_MPLT_ESVS.XML")
	//downloadfile("T2_MPLT_LSVM.XML")
	//downloadfile("T2_MPLT_LSVN.XML")
	//downloadfile("T2_MPLT_LSVS.XML")
	//downloadfile("T2_MPLT_NSVE.XML")
	//downloadfile("T2_MPLT_NSVM.XML")
	//downloadfile("T2_MPLT_NSVW.XML")
	//downloadfile("T2_MPLT_RSVM.XML")
	//downloadfile("T2_MPLT_RSVN.XML")
	//downloadfile("T2_MPLT_RSVS.XML")
}
function downloadfile(fname){ 
	var myurl=SAPServerPrefix+fname+SAPServerSuffix;
	//alert(myurl+"---------------"+cordova.file.dataDirectory)
	opMessage(myurl)

	var fileTransfer = new FileTransfer();
	var uri = encodeURI(myurl);
	//SetConfigParam("ASSET_PATH","cdvfile://localhost/persistent/")
	var fileURL = cordova.file.dataDirectory+fname

	fileTransfer.download(
			uri,
			fileURL,
			function(entry) {
				opMessage("download complete: " + entry.toURL());
			},
			function(error) {
				opMessage("download error source " + error.source);
				opMessage("download error targe", as + error.target);
				opMessage("download error code" + error.code);
			},
			true,
			{
				headers: {

				}
			}
	);	

} 
//*************************************************************************************************************************

//Survery Routines

//*************************************************************************************************************************
function getSurveyType(type){

	var TypeName="";
	switch(type) {
	case "1":
		TypeName="CheckBox";
		break;
	case "2":
		TypeName="Radio";
		break;
	case "3":
		TypeName="Text";
		break;
	case "4":
		TypeName="Number";
		break;
	case "5":
		TypeName="TextArea";
		break;
	case "6":
		TypeName="Select";
		break;
	case "7":
		TypeName="Slider";
		break;
	case "8":
		TypeName="Date";
		break;
	case "9":
		TypeName="Time";
		break;
	case "10":
		TypeName="Group";
		break;

	}

	return TypeName;

}

//*************************************************************************************************************************

//Update Routines

//*************************************************************************************************************************
function updateOrderEquipment(orderno, property, funcloc, equipment)
{

	html5sql.process("UPDATE MyOrders SET property = '"+property+"', funcloc =  '"+funcloc+"',  equipment =  '"+equipment+"' where orderno = '"+orderno+"' ",
			function(){
		//alert("Success dropping Tables");
	},
	function(error, statement){
		opMessage("Error: " + error.message + " when updateOrderEquipment processing " + statement);
	}        
	);
}

function updateTaskLongText(id,longtext)
{

	html5sql.process("UPDATE MyTasks SET longtext = '"+longtext+"' where id = '"+id+"' ",
			function(){
		//alert("Success dropping Tables");
	},
	function(error, statement){
		opMessage("Error: " + error.message + " when updateTaskLongText processing " + statement);
	}        
	);
}
function updateOrderAddress(orderno, house, houseno, street, district, city, postcode, workaddress)
{

	html5sql.process("UPDATE MyOrders SET house = '"+house+"', houseno = '"+houseno+"',  street ='"+street+"',  district = '"+district+"', city = '"+city+"',  postcode = '"+postcode+"',  workaddress='"+workaddress+"' where orderno = '"+orderno+"' ",
			function(){
		//alert("Success dropping Tables");
	},
	function(error, statement){
		opMessage("Error: " + error.message + " when updateOrderAddress processing " + statement);
	}        
	);
}
function updateNotifLatLong(notifno, fname, latlong)
{
	res=notifno.split("|");


	html5sql.process("UPDATE MyOrders SET "+fname+" = '"+latlong+"' where id = '"+res[1]+"';",
			function(){
		//alert("Success dropping Tables");
	},
	function(error, statement){
		opMessage("Error: " + error.message + " when updateNotifLatLong processing " + statement);
	}        
	);
}
function updateOrderLatLong(orderno, fname, latlong)
{

	html5sql.process("UPDATE MyOrders SET "+fname+" = '"+latlong+"' where orderno = '"+orderno+"';",
			function(){
		//alert("Success dropping Tables");
	},
	function(error, statement){
		opMessage("Error: " + error.message + " when updateOrderLatLong processing " + statement);
	}        
	);
}
//AZURE
function updateOperationStatus(orderno, opno, code, status)
{

//	Remove the Create NWWK for New Work and overide the CONF with NWWK
	sqltimestamp=""

		if(code=='ACPT'){
			sqltimestamp=", acptDate = '"+statusUpdateDate+"', acptTime ='"+statusUpdateTime+"'"
		}else if(code=='SITE'){
			sqltimestamp=", onsiteDate = '"+statusUpdateDate+"', onsiteTime ='"+statusUpdateTime+"'"
		}else if(code=='PARK'){
			sqltimestamp=", parkDate = '"+statusUpdateDate+"', parkTime ='"+statusUpdateTime+"'"
			updateMeasurementDocsState(orderno,opno,"NEW")
		}else if(code=='CONF'){
			updateMeasurementDocsState(orderno,opno,"NEW")

		}

	html5sql.process("update  myjobdets set status = '"+code+"', statusDescS = '"+code+"', statusDescL =  '"+code+"'"+sqltimestamp+" ,tconf_date = '"+statusUpdateDate+"', tconf_time = '"+statusUpdateTime+"' where  orderid = '"+orderno+"' and ordnoOp = '"+ opno+"';",
			function(){
		if((code=='CONF')&&(followOnWork=="YES"))
		{
			code='NWWK'
				status='New Work'
		}
		html5sql.process("insert into mystatus (orderno, opno, state,  stsma, status, actdate, acttime, statusdesc) values("+
				"'"+orderno+"','"+opno+"','NEW','ZMAM_1', '"+code+"','"+statusUpdateDate+"','"+statusUpdateTime+"','"+status+"');",				
				function(){
			if((code=="REJ1")||(code=="REJ2")){
				updateJobDetsStatus(orderno, opno, code)
			}
			if((code=='CONF')&&(followOnWork=="YES"))
			{
				// this is where we create the Follow on Work Status NWWK or MRWK
				//createNewStatus(CurrentOrderNo, CurrentOpNo, "NWWK", "New Work")
			}

		},
		function(error, statement){
			opMessage("Error: " + error.message + " when InsertOperationStatus processing " + statement);
		}        
		);
	},
	function(error, statement){
		opMessage("Error: " + error.message + " when insertOperationStatus processing " + statement);          

	}
	);
}
function updateMeasurementDocsState(orderno, opno, state)
{

//	Update all Measurement Docs to state = "NEW" ready for sending


	html5sql.process("update  mympointdocs set state = 'NEW'  where  orderno = '"+orderno+"' and opno = '"+ opno+"';",
			function(){


	},
	function(error, statement){
		opMessage("Error: " + error.message + " when Updateing mympointdocs state " + statement);          

	}
	);
}
function createNewStatus(orderno, opno, code, status)
{



	html5sql.process("insert into mystatus (orderno, opno, state,  stsma, status, actdate, acttime, statusdesc) values("+
			"'"+orderno+"','"+opno+"','NEW','ZMAM_1', '"+code+"','"+statusUpdateDate+"','"+statusUpdateTime+"','"+status+"');",				
			function(){


	},
	function(error, statement){
		opMessage("Error: " + error.message + " when InsertOperationStatus processing " + statement);
	}        
	);

}
//AZURE
function updateJobDetsStatus(orderno, opno, status)
{



	html5sql.process("update  myjobdets set status = '"+status+"', statusDescS = '"+status+"', statusDescL =  '"+status+"' ,tconf_date = '"+statusUpdateDate+"', tconf_time = '"+statusUpdateTime+"' where  orderid = '"+orderno+"' and ordnoOp = '"+ opno+"';",
			function(){


	},
	function(error, statement){
		opMessage("Error: " + error.message + " when insertOperationStatus processing " + statement);          

	}
	);
}
//AZURE
function updateJobDetsDateTime(orderno, opno)
{



	html5sql.process("update  myjobdets set tconf_date = '"+statusUpdateDate+"', tconf_time = '"+statusUpdateTime+"' where  orderid = '"+orderno+"' and ordnoOp = '"+ opno+"';",
			function(){


	},
	function(error, statement){
		opMessage("Error: " + error.message + " when insertOperationStatus processing " + statement);          

	}
	);
}
function countStatus()
{



	html5sql.process("select count(*) as PARK ,   (select count(*)   from myjobdets  where status = 'ACPT') as ACPT, (select count(*)   from myjobdets  where status = 'SITE') as SITE from myjobdets  where status = 'PARK'",
			function(transaction, results, rowsArray){
		localStorage.setItem("totalParked",rowsArray[0].PARK)
		localStorage.setItem("totalAccepted",'0')
		if(rowsArray[0].ACPT!='0'){
			localStorage.setItem("totalAccepted",'1')
		}
		if(rowsArray[0].SITE!='0'){
			localStorage.setItem("totalAccepted",'1')
		}		

	},
	function(error, statement){
		opMessage("Error: " + error.message + " when insertOperationStatus processing " + statement);          

	}
	);
}

//*************************************************************************************************************************

//Create Routines

//*************************************************************************************************************************
function saveQuestionField(id,type,surveyid,dt)
{
	var	value = surveyid+":"+type+":"+id;
	if(type=='S'){
		value=sap.ui.getCore().getElementById(id).getValue()
	}else if(type=='Y'){
		value=sap.ui.getCore().getElementById(id).getState()
	}else if(type=='M'){
		value=sap.ui.getCore().getElementById(id).getValue()
	}else if(type=='!'){
		value=sap.ui.getCore().getElementById(id).getValue()
	}else if(type==';'){
		value=sap.ui.getCore().getElementById(id).getValue()
	}else if(type=='Q'){
		value=sap.ui.getCore().getElementById(id).getValue()
	}else {
		value = surveyid+":"+type+":"+id;

	}
	html5sql.process("select * from JobAnswers where orderno = '"+CurrentOrderNo+
			"' and opno = '"+CurrentOpNo+"' and user = '"+localStorage.getItem('MobileUser')+"' and item = '"+surveyid+"' and task = '"+id+"';",
			function(transaction, results, rowsArray){
		if(rowsArray.length>0){
			html5sql.process("UPDATE JobAnswers SET updateddate = '"+dt+"', value = '" +value+"'"+
					" where orderno = '"+CurrentOrderNo+
					"' and opno = '"+CurrentOpNo+"' and user = '"+localStorage.getItem('MobileUser')+"' and item = '"+surveyid+"' and task = '"+id+"';",
					function(){

			},
			function(error, statement){
				opMessage("Error: " + error.message + " when updateOrderLatLong processing " + statement);
			}        
			);
		}else{
			html5sql.process("INSERT INTO  JobAnswers (orderno , opno, user, updateddate, item , task , value ) VALUES ("+
					"'"+CurrentOrderNo+"','"+CurrentOpNo+"','"+localStorage.getItem('MobileUser')+"','"+dt+"','"+surveyid+"','"+id+"','"+value+"');",
					function(){

			},
			function(error, statement){
				//alert("Error: " + error.message + " when JobAnswers Inserting " + statement);
				opMessage("Error: " + error.message + " when JobAnswers Inserting " + statement);
			}        
			);
		}
	},
	function(error, statement){
		opMessage("Error: " + error.message + " when updateOrderLatLong processing " + statement);
	}        
	);



}
function saveTheAnswer(order,opno,user,dt,item,task,value,type)
{
	var xval;
	if(type=="PHOTO"){
		xval=escape(sap.ui.getCore().getElementById(value).getSrc())
	}else if(type=="SIG"){

		xval=escape(sap.ui.getCore().getElementById(value).getSrc())
	}else{
		xval=value
	}

	html5sql.process("select * from JobAnswers where orderno = '"+order+
			"' and opno = '"+opno+"' and user = '"+user+"' and item = '"+item+"' and task = '"+task+"';",
			function(transaction, results, rowsArray){
		if(rowsArray.length>0){
			html5sql.process("UPDATE JobAnswers SET updateddate = '"+dt+"' , value = '" +xval+"'"+
					" where orderno = '"+order+
					"' and opno = '"+opno+"' and user = '"+user+"' and item = '"+item+"' and task = '"+task+"';",
					function(){

			},
			function(error, statement){
				opMessage("Error: " + error.message + " when updateOrderLatLong processing " + statement);
			}        
			);
		}else{
			html5sql.process("INSERT INTO  JobAnswers (orderno , opno, user, updateddate, item , task , value ) VALUES ("+
					"'"+order+"','"+opno+"','"+user+"','"+dt+"','"+item+"','"+task+"','"+xval+"');",
					function(){

			},
			function(error, statement){
				//alert("Error: " + error.message + " when JobAnswers Inserting " + statement);
				opMessage("Error: " + error.message + " when JobAnswers Inserting " + statement);
			}        
			);
		}
	},
	function(error, statement){
		opMessage("Error: " + error.message + " when updateOrderLatLong processing " + statement);
	}        
	);
}
function createAWSEODNotif(workdate,homedate,empno)
{



	wdate=convertEODDate(workdate).split(" ")
	hdate=convertEODDate(homedate).split(" ")

	html5sql.process("INSERT INTO  MyNotifications (notifno , type, startdate, starttime, enddate, endtime, shorttext) VALUES ("+
			"'NEW','Z7','"+wdate[0]+"','"+wdate[1]+"','"+hdate[0]+"','"+hdate[1]+"','Day End Travel/"+getDate()+"/"+empno+"');",
			function(transaction, results, rowsArray){


	},
	function(error, statement){


	} )   

}

function createAWSJobClose(order,opno,notifno, details, empid,work_cntr,closedate,closetime, funcloc , equipment, inshift , outofshift , pgrp, pcode, agrp, acode, igrp, icode, followon , variance, reason,oSwitchFlooding,oSwitchPollution,oSwitchCustFeed,scode,sdesc)
{

	html5sql.process("INSERT INTO  MyJobClose (orderno , opno, notifno, details, empid, work_cntr, state , closedate, closetime, funcloc , equipment, inshift , outofshift , pgrp, pcode, agrp, acode, igrp, icode, followon , variance, reason) VALUES ("+
			"'"+order+"','"+opno+"','"+notifno+"','"+details+"','"+empid+"','"+work_cntr+"','NEW','"+closedate+"','"+closetime+"','"+
			funcloc+"','"+equipment+"','"+inshift+"','"+outofshift+"','"+pgrp+"','"+pcode+"','"+agrp+"','"+
			acode+"','"+igrp+"','"+icode+"','"+followon+"','"+variance+"','"+reason+"');",
			function(){
		updateOperationStatus(order, opno, scode ,sdesc)
		if(oSwitchFlooding){

			updateFormsResponseDate("Flooding",order,opno)

		}else{

			deleteFormsResponseDate("Flooding",order,opno)
		}
		if(oSwitchPollution){
			updateFormsResponseDate("Pollution",order,opno)
		}else{
			deleteFormsResponseDate("Pollution",order,opno)
		}
		if(	 oSwitchCustFeed){
			updateFormsResponseDate("CustomerFeedback",order,opno)
		}else{
			deleteFormsResponseDate("CustomerFeedback",order,opno)
		}
	},
	function(error, statement){

		opMessage("Error: " + error.message + " when createTConf processing " + statement);
	}        
	);
}
function getAssetHistory(fl)
{
	sqlStatement="select * from MyMenuBar where subitem = 'Asset History'"

		html5sql.process(sqlStatement,
				function(transaction, results, rowsArray){
			if(rowsArray<1){

				return "";
			}else{

				url=rowsArray[0].command

				url=url.replace("{SUPUSERNAME}",localStorage.getItem("MobileUser"))
				url+="&TPLNR="+fl
				window.open(url, "_blank", 'location=yes,closebuttoncaption=Return') 
			}
			console.log("form done")
		},
		function(error, statement){
			opMessage("Error: " + error.message + " when FormsResponses processing " + statement);
		}        
		);
}
function updateDocumentState(id,status)
{


	sqlStatement="UPDATE MyFormsResponses SET status='"+status+"' where id = '"+id+"'";

	html5sql.process(sqlStatement,
			function(){

		//buildJobDocsTable()

	},
	function(error, statement){

		opMessage("Error: " + error.message + " when FormsResponses processing " + statement);
	}        
	);
}
function updatePhotoState(id,status)
{


	sqlStatement="UPDATE MyJobsPhotos SET status='"+status+"' where id = '"+id+"'";

	html5sql.process(sqlStatement,
			function(){


	},
	function(error, statement){

		opMessage("Error: " + error.message + " when FormsResponses processing " + statement);
	}        
	);
}
function updateAttachmentState(id,status)
{


	sqlStatement="UPDATE MyJobsDocs SET status='"+status+"' where id = '"+id+"'";

	html5sql.process(sqlStatement,
			function(){


	},
	function(error, statement){

		opMessage("Error: " + error.message + " when FormsResponses processing " + statement);
	}        
	);
}
function updateAttachmentStatus(url,name,type,size,lastmod,status)
{


	sqlStatement="UPDATE MyJobsDocs SET status='"+status+"';"
	sqlMyJobsDocs="";	
	html5sql.process(sqlStatement,
			function(){

		if(url=="*"){

			BuildDocumentsTable()
		}
	},
	function(error, statement){
		opMessage("Error: " + error.message + " when FormsResponses processing " + statement);
	}        
	);
}
function deleteAllDocs()
{


	sqlStatement="delete from MyJobsDocs"

		html5sql.process(sqlStatement,
				function(){


			opMessage("All Docs deleted")

		},
		function(error, statement){
			opMessage("Error: " + error.message + " when FormsResponses processing " + statement);

		}        
		);
}
function addAttachment(orderno,opno, url, name, type, size)
{


	sqlstatement="insert into MyJobsDocs (orderno,opno, url, name, type, size, status) values ("+
	"'"+orderno+"','"+opno+"','"+url+"','"+name+"','"+type+"','"+size+"','Local')";

	html5sql.process(sqlstatement,
			function(transaction, results, rowsArray){


	},
	function(error, statement){
		opMessage("Error: " + error.message + " when FormsResponses processing " + statement);
	}        
	);
}
function updateDocumemntsTable(url, name,type,size,lastmod)
{


	sqlStatement=

		sqlStatement="select * from MyJobsDocs where url  = '"+url+"' and name = '"+name+"';"

		html5sql.process(sqlStatement,
				function(transaction, results, rowsArray){
			if(rowsArray<1){
				sqlMyJobsDocs+="insert into MyJobsDocs (url, name,type,size,lastmod, status) values ("+
				"\""+url+"\","+"\""+name+"\","+"\""+type+"\","+"\""+size+"\","+"\""+lastmod+"\", \"REMOTE\");" // New Download
			}else if((rowsArray[0].type==type)&&(rowsArray[0].size==size)&&(rowsArray[0].lastmod==lastmod)){

				sqlMyJobsDocs+="UPDATE MyJobsDocs SET status = \"LOCAL\" , size = \""+size+"\" , lastmod = \""+lastmod+"\" where id = "+rowsArray[0].id+";" // File not changed so dont Download
			}else{
				sqlMyJobsDocs+="UPDATE MyJobsDocs SET status = \"REMOTECHANGED\" , type = \""+type+"\" , size = \""+size+"\" , lastmod = \""+lastmod+"\" where id = "+rowsArray[0].id+";"// File Changed so download
			}

		},
		function(error, statement){
			opMessage("Error: " + error.message + " when FormsResponses processing " + statement);
		}        
		);
}
function updateDocsTable()
{

	html5sql.process(sqlMyJobsDocs,
			function(transaction, results, rowsArray){


		html5sql.process("select count(*)  as tot,  (select count(*) from MyJobsDocs where status = \"DELETE\") as del,  " +
				"(select count(*) from MyJobsDocs where status = \"REMOTE\") as ins, "+
				"(select count(*) from MyJobsDocs where status = \"REMOTECHANGED\") as mod, "+
				"(select count(*) from MyJobsDocs where status = \"LOCAL\") as loc from MyJobsDocs",

				function(transaction, results, rowsArray){

			document.getElementById('DocTot').innerHTML=rowsArray[0].tot
			document.getElementById('DocDel').innerHTML=rowsArray[0].del
			document.getElementById('DocNew').innerHTML=rowsArray[0].ins
			document.getElementById('DocMod').innerHTML=rowsArray[0].mod
			document.getElementById('DocLoc').innerHTML=rowsArray[0].loc

			html5sql.process("select * from MyJobsDocs where status = \"REMOTE\" or status = \"REMOTECHANGED\"",

					function(transaction, results, rowsArray){

				oProgIndDL.setPercentValue(5);
				oProgIndDL.setDisplayValue("5" + "%");
				percentagedownloaded=0;
				fileDownloadCnt=0;

				filesToDownload = rowsArray;

				checkFileDownload()
			},
			function(error, statement){

			}        
			);

		},
		function(error, statement){

		}        
		);
	},
	function(error, statement){
		opMessage("Error: " + error.message + " when FormsResponses processing " + statement);
	}        
	);


}
function updateFormsResponseDate(formname, order,opno)
{



	sqlStatement="UPDATE MyFormsResponses "+
	"SET lastupdated='CLOSED', recordupdated=STRFTIME('%Y-%m-%d %H:%M:%f', 'NOW') "+
	"where orderno = '"+order+"' and opno = '"+opno+"' and formname = '"+formname+"' ;"


	opMessage("About to Update Formdata Date "+order+":"+opno+":"+formname)

	html5sql.process(sqlStatement,
			function(transaction, results, rowsArray){

		opMessage("Formdata Updated OK")



	},
	function(error, statement){

		opMessage("Error: " + error.message + " when Updateing FormsResponses Date" );

	}        
	);

}
function deleteFormsResponseDate(formname, order,opno)
{



	sqlStatement="DELETE from MyFormsResponses "+
	"where orderno = '"+order+"' and opno = '"+opno+"' and formname = '"+formname+"' ;"


	opMessage("About to Delete Formdata "+order+":"+opno+":"+formname)

	html5sql.process(sqlStatement,
			function(transaction, results, rowsArray){

		opMessage("Formdata Deleted OK")



	},
	function(error, statement){

		opMessage("Error: " + error.message + " when Deleting FormsResponses" );

	}        
	);

}
function deleteFormsAndDownload()
{



	sqlStatement="DELETE from MyForms "+
	"where type <> 'CLOSE' ;"


	opMessage("About to Delete Forms")

	html5sql.process(sqlStatement,
			function(transaction, results, rowsArray){

		opMessage("Forms Deleted OK")
		downloadForms();


	},
	function(error, statement){

		opMessage("Error: " + error.message + " when Deleting FormsResponses" );

	}        
	);

}
function renameDocument(id){
	selectedDocId=id;
	sqlStatement="select formname, formdesc from MyFormsResponses where id = '"+id+"'"




	html5sql.process(sqlStatement,
			function(transaction, results, rowsArray){

		if(rowsArray.length>0){
			sap.ui.getCore().getElementById('attachmentFname').setValue(rowsArray[0].formdesc)
		}else{
			sap.ui.getCore().getElementById('attachmentFname').setValue("")
		}
		formFileName.open()

	},
	function(error, statement){


	}        
	);
}
function uploadDocument_Image_NotUsed(id){

	selectedDocId=id;
	sqlStatement="select formname, formdesc, htmlbody from MyFormsResponses where id = '"+id+"'"



	html5sql.process(sqlStatement,
			function(transaction, results, rowsArray){

		if(rowsArray.length>0){




			createBase64FormXML(rowsArray[0].htmlbody,rowsArray[0].formdesc+".html",id,rowsArray[0].formdesc)	

		}


	},
	function(error, statement){

		opMessage("uploadDocument:"+error+statement)
	}        
	);
}
function uploadDocument(id){

	selectedDocId=id;
	sqlStatement="select formname, formdesc, htmlbody,htmlreadonly from MyFormsResponses where id = '"+id+"'"



	html5sql.process(sqlStatement,
			function(transaction, results, rowsArray){

		if(rowsArray.length>0){
			x=unescape(rowsArray[0].htmlreadonly)
			y=unescape(encodeURIComponent(x))

			formHTML=window.btoa(HTMLFormStart+y+HTMLFormEnd)

			createBase64FormXML(formHTML,rowsArray[0].formdesc+".html",id,rowsArray[0].formdesc)	

		}


	},
	function(error, statement){

		opMessage("uploadDocument:"+error+statement)
	}        
	);
}
function uploadAttachment(id){

	selectedDocId=id;
	sqlStatement="select * from MyJobsDocs where id = '"+id+"'"



	html5sql.process(sqlStatement,
			function(transaction, results, rowsArray){
		//updatePhotoState(id,"Sending");

		if(rowsArray.length>0){

			getBase64FromAttachmentUrl(rowsArray[0].url,rowsArray[0].id,rowsArray[0].name,rowsArray[0].type)	

		}


	},
	function(error, statement){

		opMessage("uploadDocument:"+error+statement)
	}        
	);

}
function deleteAttachment(id){
	sap.m.MessageBox.show("Delete Attachment", {
		icon: sap.m.MessageBox.Icon.WARNING ,
		title: "Are you sure?",
		actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
		onClose: function(oAction){

			if(oAction=="YES"){

				sqlStatement="Delete from MyJobsDocs where id =  '"+id+"' ;"




				html5sql.process(sqlStatement,
						function(transaction, results, rowsArray){


					buildJobDocsTable()

				},
				function(error, statement){


				}        
				);
			}
		}
	}
	);

}
function deleteDocument(id){
	sap.m.MessageBox.show("Delete Document", {
		icon: sap.m.MessageBox.Icon.WARNING ,
		title: "Are you sure?",
		actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
		onClose: function(oAction){

			if(oAction=="YES"){

				sqlStatement="Delete from MyFormsResponses where id =  '"+id+"' ;"




				html5sql.process(sqlStatement,
						function(transaction, results, rowsArray){


					buildJobDocsTable()

				},
				function(error, statement){


				}        
				);
			}
		}
	}
	);

}
function updateFormDescription(id, desc)
{



	sqlStatement="UPDATE MyFormsResponses "+
	"SET formdesc='"+desc+"'" +
	"where id = '"+id+"' ;"




	html5sql.process(sqlStatement,
			function(transaction, results, rowsArray){
		buildJobDocsTable()
		opMessage("Formdata Renamed")



	},
	function(error, statement){

		opMessage("Error: " + error.message + " when Updateing FormsResponses Date" );

	}        
	);

}
function InsertFormDetails(url, name,type,desc)
{
//	alert("Inserting "+name)


	sqlStatementIns="INSERT INTO  MyForms (name, type, url, description) VALUES ("+
	"'"+name+"','"+type+"','"+url+"','"+desc+"');"

	opMessage("About to Insert Form "+name+":"+desc)


	html5sql.process(sqlStatementIns,
			function(transaction, results, rowsArray){

		opMessage("Form inserted OK ")
	},
	function(error, statement){

		opMessage("Error: " + error.message + " when FormsResponses Insert " );

	}        
	);



}
//need to sort out not a delete if the form already exists


function createFormsResponse(formname, wc,plant,notifno,order,opno,user,content,htmlbody,htmlreadonly,mode,type)
{
	console.log("saving form"+selectedFormId)	
	if(formname.indexOf("~")>0){
		x=formname.split("~");
		formname=x[0]
	}	
	var fdesc=""	
		if (mode=="Close"){ //Called from the Close Screen
			state = "Close"
				fdesc=""
		}else{
			state="FORM"
				fdesc=formname	
		}

	if(selectedFormId>0)
	{
		sqlStatement="UPDATE  MyFormsResponses set lastupdated='"+type+"',  "+
		"contents='"+escape(content) +"', "+
		"htmlbody='"+escape(htmlbody)+"', "+
		"htmlreadonly='"+escape(htmlreadonly)+"', "+
		"date='"+getDate()+"', "+
		"time='"+getTime()+"', "+

		"state='"+state+"', "+"status='Local' where id = "+selectedFormId+";"

	}else{
		sqlStatement="INSERT INTO  MyFormsResponses (formname, formdesc, lastupdated, wc,plant, notifno,orderno , opno, user, contents, htmlbody,htmlreadonly, date , time , state,status) VALUES ("+
		"'"+formname+"','"+fdesc+"','"+type+"','"+wc+"','"+plant+"','"+notifno+"','"+order+"','"+opno+"','"+user+"','"+escape(content)+"','"+escape(htmlbody)+"','"+escape(htmlreadonly)+"','"+getDate()+"',"+"'"+getTime()+"',"+"'"+state+"',"+"'Local');"

	}	


	html5sql.process(sqlStatement,
			function(transaction, results, rowsArray){

		opMessage("Formdata inserted OK ")

		if(formDG5.isOpen()){
			getCFeedFollowOnState(CurrentOrderNo,CurrentOpNo)
		}
		if (mode=="Forms"){ //Called from the Close Screen
			buildJobDocsTable()
		}

		formForms.close()
	},
	function(error, statement){

		opMessage("Error: " + error.message + " when FormsResponses Insert " );
		formForms.close()
	}        
	);



}
function createAWSTConf(order,opno,empid,work_cntr,acttype,reasontype,startdate,starttime,enddate, endtime, actwork,remwork,text,details,finalconf)
{

	html5sql.process("INSERT INTO  MyTimeConfs (orderno , opno,reason,type, confno , description , longtext, date , time , enddate, endtime, act_work, rem_work, empid, work_cntr, final , datestamp, user, state) VALUES ("+
			"'"+order+"','"+opno+"','"+reasontype+"','"+acttype+"','NEW','"+text+"','"+details+"','"+startdate+"','"+starttime+"','"+enddate+"','"+endtime+"','"+actwork+"','"+remwork+"','"+empid+"','"+CurrentJobWorkCentreOp+"','"+finalconf+"','"+getDate()+" "+getTime()+"','"+localStorage.getItem("MobileUser")+"','');",
			function(){
		rebuildTimeConfs();
	},
	function(error, statement){

		opMessage("Error: " + error.message + " when createTConf processing " + statement);
	}        
	);
}

function createMPDocument(order,opno,floc,eq,mpoint,code,val,text)
{


	html5sql.process("INSERT INTO  MyMPointDocs (orderno , opno, funcloc, equipment , meas_point , date , time , code, value, shorttext, state) VALUES ("+
			"'"+order+"','"+opno+"','"+floc+"','"+eq+"','"+mpoint+"','"+getDate()+"', '"+getTime()+"','"+code+"','"+val+"','"+text+"','');",
			function(){

	},
	function(error, statement){

		opMessage("Error: " + error.message + " when createMPDoc processing " + statement);
	}        
	);
}

function updateMPDocument(order,opno,floc,eq,mpoint,code,val,text)
{


	html5sql.process("UPDATE MyMPointDocs set code = '"+code+"' , value = '"+ val+"', shorttext='"+text+"',  where orderno = '"+order+"' and opno= '"+opno+"' and meas_point = '"+mpoint +"';",

			function(){

	},
	function(error, statement){

		opMessage("Error: " + error.message + " when createMPDoc processing " + statement);
	}        
	);
}
function createTConf(order,opno,empid,type,startdate,enddate,duration,finalconf,comments)
{

	var xempid=empid.split("|")
	var xstartdate=convertDateTimePicker(startdate).split("|")

	var xenddate=convertDateTimePicker(enddate).split("|")

	var xtctype="Travel"
		var xfinalconf=""

			if (type=="tconfWork"){
				xtctype="Work"
			}

	if (finalconf=="tconfFinalYes"){
		xfinalconf="X"
	}

	html5sql.process("INSERT INTO  MyTimeConfs (orderno , opno,type, confno , description , date , time , enddate, endtime, duration, empid, final , datestamp, user, state) VALUES ("+
			"'"+order+"','"+opno+"','"+xtctype+"','NEW','"+comments+"','"+xstartdate[0]+"','"+xstartdate[1]+"','"+xenddate[0]+"','"+xenddate[1]+"','"+duration+"','"+xempid[2]+"','"+xfinalconf+"','"+getDate()+" "+getTime()+"','"+localStorage.getItem("MobileUser")+"','');",
			function(){
		rebuildTimeConfs();
	},
	function(error, statement){

		opMessage("Error: " + error.message + " when createTConf processing " + statement);
	}        
	);
}

function createVehicleDefect(type,description,details,equipment)
{
	var startdate=getSAPDate();
	var starttime=getSAPTime();
	var ReportedBy=localStorage.getItem("MobileUser");
	html5sql.process("INSERT INTO  MyNewJobs (state , type, date, time, shorttext, longtext, equipment, reportedby) VALUES ("+
			"'VEHICLEDEFECT','"+type+"','"+startdate+"','"+starttime+"','"+description+"','"+details+"','"+equipment+"','"+ReportedBy+"');",
			function(){
		//alert("Created VDefect");
	},
	function(error, statement){
		//alert("Error: " + error.message + " when createNotification processing " + statement);
		opMessage("Error: " + error.message + " when createNotification processing " + statement);
	}        
	);

}
function createTask(notifno, cattype, groupcd, codecd, grouptext, codetext, description)
{
	html5sql.process("INSERT INTO MyTasks (notifno , item_id, task_cat_typ, task_codegrp , task_code , txt_taskgrp, txt_taskcd , task_text, plnd_start_date, plnd_start_time, plnd_end_date, plnd_end_time, sla_end_date, sla_end_time, longtext, complete, status) VALUES ("+
			"'"+notifno+"','NEW','"+cattype+"','"+groupcd+"','"+codecd+"','"+grouptext+"','"+codetext+"','"+description+"','"+getDate()+"','"+getTime()+"','','','"+ getDate()+"','"+getTime()+"','','','');",
			function(){
		//alert("Success dropping Tables");
	},
	function(error, statement){
		opMessage("Error: " + error.message + " when createNotification processing " + statement);
	}        
	);
}


function createActivity(notifno, cattype, task,groupcd,codecd, grouptext, codetext, description)
{
	html5sql.process("INSERT INTO MyActivities (notifno ,task_id, item_id, act_codegrp , act_code , txt_actgrp, txt_actcd , act_text, act_id, act_cat_typ, start_date, start_time, end_date, end_time, long_text, status) VALUES ("+
			"'"+notifno+"','"+task+"','NEW','"+groupcd+"','"+codecd+"','"+grouptext+"','"+codetext+"','"+description+"','','"+cattype+"','"+getDate()+"','"+getTime()+"','','','','');",
			function(){
		//alert("Success dropping Tables");
	},
	function(error, statement){
		opMessage("Error: " + error.message + " when createActivity processing " + statement);
	}        
	);
}
function createEffect(notifno,cattype,groupcd,codecd, grouptext, codetext, description)
{

	html5sql.process("INSERT INTO MyEffects (notifno , item_id, effect_codegrp , effect_code , txt_effectgrp, txt_effectcd , value, task_id, effect_cat_typ ) VALUES ("+
			"'"+notifno+"','NEW','"+groupcd+"','"+codecd+"','"+grouptext+"','"+codetext+"','"+description+"','','"+cattype+"');",
			function(){
		//alert("Success dropping Tables");
	},
	function(error, statement){
		opMessage("Error: " + error.message + " when createActivity processing " + statement);
	}        
	);
}
function createCause(notifno,cattype,groupcd,codecd, grouptext, codetext, description)
{

	html5sql.process("INSERT INTO MyCauses (notifno , item_id, cause_codegrp , cause_code , txt_causegrp, txt_causecd , cause_text , cause_id, cause_cat_typ, long_text, status) VALUES ("+
			"'"+notifno+"','NEW','"+groupcd+"','"+codecd+"','"+grouptext+"','"+codetext+"','"+description+"','','"+cattype+"','','');",
			function(){
		//alert("Success dropping Tables");
	},
	function(error, statement){
		opMessage("Error: " + error.message + " when createActivity processing " + statement);
	}        
	);
}
//*************************************************************************************************************************

//Create Database Tables

//*************************************************************************************************************************
function createTables(type) { 




	//opMessage("Creating The Tables");	

	sqlstatement='CREATE TABLE IF NOT EXISTS AssetTableColumns (id integer primary key autoincrement,ColumnNumber integer ,ColumnName TEXT,DisplayName TEXT, ColumnWidth TEXT);' +
	'CREATE TABLE IF NOT EXISTS MyJobsParams      		(  id integer primary key autoincrement, name TEXT, key1 TEXT, key2 TEXT, value TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+

	'delete from AssetTableColumns ; ' +
	'INSERT INTO AssetTableColumns ("ColumnNumber","ColumnName","DisplayName","ColumnWidth") VALUES (0,"ZPROCTYP","Processing Type","150px"); ' +
	'INSERT INTO AssetTableColumns ("ColumnNumber","ColumnName","DisplayName","ColumnWidth") VALUES (1,"ZINSTLOCN","Functional Location","150px"); ' +
	'INSERT INTO AssetTableColumns ("ColumnNumber","ColumnName","DisplayName","ColumnWidth") VALUES (2,"HURST","Make","150px"); ' +
	'INSERT INTO AssetTableColumns ("ColumnNumber","ColumnName","DisplayName","ColumnWidth") VALUES (3,"MAPAR","Model","150px"); ' +
	'INSERT INTO AssetTableColumns ("ColumnNumber","ColumnName","DisplayName","ColumnWidth") VALUES (4,"EQUNR","Equipment Number","150px"); ' +
	'INSERT INTO AssetTableColumns ("ColumnNumber","ColumnName","DisplayName","ColumnWidth") VALUES (5,"ZINSLOCDESC","Functional Location Desc","150px"); ' +
	'INSERT INTO AssetTableColumns ("ColumnNumber","ColumnName","DisplayName","ColumnWidth") VALUES (6,"ZOTDESC","Equipment Type Desc","150px"); ' +
	'INSERT INTO AssetTableColumns ("ColumnNumber","ColumnName","DisplayName","ColumnWidth") VALUES (7,"EQKTU","Equipment Desc","150px"); ' +
	'INSERT INTO AssetTableColumns ("ColumnNumber","ColumnName","DisplayName","ColumnWidth") VALUES (8,"EQUNR","Equipment Number","150px"); ' +
	'INSERT INTO AssetTableColumns ("ColumnNumber","ColumnName","DisplayName","ColumnWidth") VALUES (9,"ZATSDESC","Asset Type","150px"); ' +
	'INSERT INTO AssetTableColumns ("ColumnNumber","ColumnName","DisplayName","ColumnWidth") VALUES (10,"ZPRGDESC","Process Group","150px"); ' +
	'INSERT INTO AssetTableColumns ("ColumnNumber","ColumnName","DisplayName","ColumnWidth") VALUES (11,"ZPLGDESC","Plant Group","150px"); ' +
	'INSERT INTO AssetTableColumns ("ColumnNumber","ColumnName","DisplayName","ColumnWidth") VALUES (12,"ZSYSDESC","System Code Description","150px"); ' +
	'INSERT INTO AssetTableColumns ("ColumnNumber","ColumnName","DisplayName","ColumnWidth") VALUES (13,"ZNCDESC","Function Type Description","150px"); ' +
	'INSERT INTO AssetTableColumns ("ColumnNumber","ColumnName","DisplayName","ColumnWidth") VALUES (14,"ZOTDESC","Equipment Type Description","150px"); ' +
	'INSERT INTO AssetTableColumns ("ColumnNumber","ColumnName","DisplayName","ColumnWidth") VALUES (15,"EQKTU","EQKTU","150px"); ' +
	'INSERT INTO AssetTableColumns ("ColumnNumber","ColumnName","DisplayName","ColumnWidth") VALUES (16,"SERGE","Serial Number","150px"); ' +
	'INSERT INTO AssetTableColumns ("ColumnNumber","ColumnName","DisplayName","ColumnWidth") VALUES (17,"ZSITE","Site","150px"); ' +
	'CREATE TABLE IF NOT EXISTS AssetSitesDetails     	( id integer primary key autoincrement,assdesc TEXT, assettag TEXT, asstype TEXT, eqart TEXT, eqktx TEXT, equnr TEXT, herst TEXT, iwerk TEXT, mapar TEXT, ncdesc TEXT, otdesc TEXT, plgrp TEXT, pltxt TEXT, serge TEXT, site TEXT, status TEXT, swerk TEXT, syscode TEXT, sysdesc TEXT, tplnr TEXT, zfl_nc TEXT, zinbdt  TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));' +
//new azure data
	'CREATE TABLE IF NOT EXISTS MyRefUsers    			(  id integer primary key autoincrement, userid TEXT, scenario TEXT, plant TEXT, maintplant TEXT, workcenter TEXT, plannergroup TEXT, plannergroupplant TEXT, storagegroup TEXT, storageplant TEXT, partner TEXT, partnerrole TEXT, funclocint TEXT, funcloc TEXT, compcode TEXT, employeeno TEXT, equipment TEXT, firstname TEXT, lastname TEXT, telno TEXT,maint1 TEXT,maint2 TEXT,maint3 TEXT,maint4 TEXT,maint5 TEXT,maint6 TEXT,maint7 TEXT,maint8 TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+													
		
	 
	
	'CREATE TABLE IF NOT EXISTS MyJobDets 		        ( id integer primary key autoincrement,'+ 
	" orderid TEXT,ordnoOp TEXT,watercare TEXT, textMess TEXT,reduration TEXT, startTime TEXT,startDate TEXT,pmacttypeText TEXT, pmacttype TEXT, "+
	" workTypeCdx TEXT,workTypeCd TEXT,workTypeCgpx TEXT,workTypeCgp TEXT,ordType TEXT,shortText TEXT,priorityx TEXT,priority TEXT, "+
	" statusCrtim TEXT,statusCrdat TEXT,statusDescL TEXT,statusDescS  TEXT,status TEXT,plant TEXT,myalmScenario TEXT,workCntrOper TEXT, "+
	" workCntrUser TEXT,empName TEXT,empNo TEXT,user TEXT,custAppt TEXT,jobPartRef TEXT,locHistRef TEXT,address TEXT, "+
	" custFeed TEXT,equipment TEXT,equipmentDesc TEXT,funcLoc TEXT,funcLocDesc TEXT,flcLonLat TEXT,siteShcode TEXT,acptDate TEXT,acptTime TEXT, "+
	" onsiteDate TEXT,onsiteTime TEXT,tconf_date TEXT, tconf_time TEXT,assocOpRef TEXT,opActtype TEXT,opActtypex TEXT,name1 TEXT,telNumber TEXT,eqpLonLat TEXT,notificationNo TEXT, "+
	" notifCatProf TEXT,enddateLconf TEXT,endtimeLconf TEXT,custNo TEXT,parkDate TEXT,parkTime TEXT,custCmmt TEXT,form1 TEXT,form2 TEXT,mandForm TEXT, "+
	" documents TEXT,tma TEXT,contractAssist TEXT,specialEq TEXT,materials TEXT,measurements TEXT,callAppt TEXT,acNo TEXT,acStatus TEXT,retention TEXT, "+
	" ntTelNo TEXT,skillType TEXT,assettag TEXT,ordWorkCntr TEXT,ordPlant TEXT,userMobile TEXT,notifCrdat TEXT,notifCrtim TEXT,ohdrShortText TEXT, "+
	" zzretc TEXT,zzretn TEXT,zzrettn TEXT,zzemai TEXT,zzgisx TEXT,zzgisy TEXT,zzmogisx TEXT,zzmogisy TEXT, "+
    " recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\'))); "+	
	'CREATE TABLE IF NOT EXISTS MyJobDetsMPcodes       ( id integer primary key autoincrement, code_gp TEXT, code TEXT, code_text TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+	
	'CREATE TABLE IF NOT EXISTS MyJobDetsMPoints       ( id integer primary key autoincrement, meas_point TEXT, object_id TEXT,object_desc TEXT, psort TEXT,pttxt TEXT, format TEXT,no_char TEXT, no_deci TEXT,code_gp TEXT, code TEXT, unit_meas TEXT,read_from TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+					 
	'CREATE TABLE IF NOT EXISTS MyJobDetsLoch          ( id integer primary key autoincrement, orderno TEXT, notification_no TEXT,not_type TEXT, not_date TEXT,not_time TEXT, not_shtxt TEXT,not_order TEXT, meter_no TEXT,meter_rdg TEXT, work_type TEXT, order_type TEXT, op_txt TEXT, order_date TEXT, order_status TEXT, recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+					 
	'CREATE TABLE IF NOT EXISTS MyJobDetsDraw          ( id integer primary key autoincrement, orderno TEXT, zact TEXT,zite TEXT, zmandatoryfield TEXT,zurl TEXT, nodeid TEXT,fname TEXT, mime TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+					 
	'CREATE TABLE IF NOT EXISTS MyJobsDetsEQ			( id integer primary key autoincrement, equnr TEXT, obj_type TEXT, obj_type_desc TEXT, start_date TEXT,manfacture TEXT,manparno TEXT,manserno TEXT,user_status_code TEXT,swerk TEXT ,swerk_desc TEXT,profile TEXT ,device TEXT ,device_info TEXT ,install_date TEXT , install_loc_desc TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyJobsDetsATTR			( id integer primary key autoincrement, equnr TEXT ,classnum TEXT ,klassentext TEXT ,charact TEXT ,charact_desc TEXT,value TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyJobDetsMeasCodes		( id integer primary key autoincrement, code_gp TEXT ,code TEXT ,code_text TEXT ,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyJobDetsComps			( id integer primary key autoincrement, orderno TEXT ,opno TEXT ,material TEXT ,description TEXT ,ent_qty TEXT ,com_qty TEXT ,with_qty TEXT ,upm TEXT ,plant TEXT , stloc TEXT , batch_no TEXT ,req_date TEXT , res_item TEXT ,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyJobDetsOrderLongText	( id integer primary key autoincrement, objtype TEXT ,objkey TEXT ,orderno TEXT ,line_number TEXT, format_col TEXT, text_line TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyJobDetsAddress   		(  id integer primary key autoincrement, orderno TEXT, opno TEXT, address01 TEXT, address02 TEXT, address03 TEXT, address04 TEXT, address05 TEXT, address06 TEXT, address07 TEXT, address08 TEXT,address09 TEXT, address10 TEXT,address11 TEXT,address12 TEXT,caption01 TEXT, caption02 TEXT, caption03 TEXT, caption04 TEXT, caption05 TEXT, caption06 TEXT, caption07 TEXT, caption08 TEXT, caption09 TEXT,caption10 TEXT,caption11 TEXT,caption12 TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+													
	'CREATE TABLE IF NOT EXISTS MyJobDetsNotifLongText	(  id integer primary key autoincrement, objtype TEXT, objkey TEXT, orderno TEXT, line_number TEXT, format_col TEXT, text_line TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+													
	'CREATE TABLE IF NOT EXISTS MyJobDetsOrderOps		(  id integer primary key autoincrement, orderno TEXT, operation TEXT, comp_date_time TEXT, description TEXT, status TEXT, name TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+													
	'CREATE TABLE IF NOT EXISTS MyJobDetsIconPriority	(  id integer primary key autoincrement, orderno TEXT, opno TEXT, icon_filename TEXT, tooltip TEXT, tooltip_desc TEXT, command TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+													
	'CREATE TABLE IF NOT EXISTS MyJobDetsIconJob		(  id integer primary key autoincrement, orderno TEXT, opno TEXT, icon_type TEXT, icon_position TEXT, icon_filename TEXT, icon_txt TEXT, tooltip TEXT, tooltip_desc TEXT, command TEXT,grid TEXT, grid_vals TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+													

	
	
// end of Azure data	
	'CREATE TABLE IF NOT EXISTS MyOrders     			( sysid integer primary key autoincrement,orderno TEXT, changedby TEXT, changeddatetime TEXT, shorttext TEXT, longtext TEXT, startdate TEXT, enddate TEXT, contact TEXT,   telno TEXT,    type TEXT, priority TEXT, address TEXT, workaddress TEXT, house TEXT, houseno TEXT, street TEXT, district TEXT, city TEXT, postcode TEXT,gis TEXT, property TEXT, funcloc TEXT, equipment TEXT, propertygis TEXT, funclocgis TEXT, equipmentgis TEXT, notifno TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyOperations 			( sysid integer primary key autoincrement,orderno TEXT, opno TEXT,      type TEXT,     priority TEXT,  shorttext TEXT, startdate TEXT, enddate TEXT, duration TEXT, status TEXT, assignedto TEXT, apptstart TEXT, apptend TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyOperationsSplit 		( sysid integer primary key autoincrement,orderno TEXT, opno TEXT,      assignedto TEXT,  duration TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyPartners   			( sysid integer primary key autoincrement,orderno TEXT, notifno TEXT, id TEXT,        type TEXT,     name TEXT,      address TEXT,   postcode TEXT, telno TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyAssets     			( sysid integer primary key autoincrement,orderno TEXT, id TEXT,        type TEXT,     name TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyMaterials     		( sysid integer primary key autoincrement,orderno TEXT, id TEXT, material TEXT, qty TEXT, description TEXT, recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyUserStatus     		( id integer primary key autoincrement, type TEXT, orderno TEXT, opno TEXT, inact TEXT, status TEXT, statuscode TEXT, statusdesc TEXT, recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyOperationInfo     	( id integer primary key autoincrement, orderno TEXT, opno TEXT, type TEXT, value1 TEXT, value2 TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyNotifications     	( id integer primary key autoincrement, notifno TEXT, changedby TEXT, changeddatetime TEXT, shorttext TEXT, longtext TEXT, cattype TEXT,  pgroup TEXT, pcode TEXT, grouptext TEXT, codetext TEXT, startdate TEXT, starttime TEXT, enddate TEXT, endtime TEXT, type TEXT, priority TEXT, funcloc TEXT,   equipment TEXT, orderno TEXT, reportedon TEXT,   reportedby TEXT, plant TEXT, funclocgis TEXT,   equipmentgis TEXT, assigntome TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyItems     			( id integer primary key autoincrement, notifno TEXT, item_id TEXT, descript TEXT, d_cat_typ TEXT, d_codegrp TEXT, d_code TEXT, dl_cat_typ TEXT, dl_codegrp TEXT, dl_code TEXT, long_text TEXT, stxt_grpcd TEXT ,txt_probcd TEXT  ,txt_grpcd TEXT , txt_objptcd TEXT, status TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyCauses      			( id integer primary key autoincrement, notifno TEXT, item_id TEXT, cause_id TEXT, cause_text TEXT, cause_cat_typ TEXT, cause_codegrp TEXT, cause_code TEXT, long_text TEXT, txt_causegrp TEXT, txt_causecd TEXT, status TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyActivities     		( id integer primary key autoincrement, notifno TEXT, task_id TEXT, item_id TEXT,  act_id TEXT, act_text TEXT, act_cat_typ TEXT, act_codegrp TEXT, act_code TEXT,  start_date TEXT, start_time TEXT ,end_date TEXT  ,end_time TEXT , long_text TEXT, txt_actgrp TEXT, txt_actcd TEXT, status TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyTasks      			( id integer primary key autoincrement, notifno TEXT, item_id TEXT, task_text TEXT, task_cat_typ TEXT, task_codegrp TEXT, task_code TEXT, txt_taskgrp TEXT, txt_taskcd TEXT, plnd_start_date TEXT, plnd_start_time TEXT ,plnd_end_date TEXT  ,plnd_end_time TEXT , sla_end_date TEXT  ,sla_end_time TEXT , longtext TEXT, complete TEXT, status TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyEffects      		( id integer primary key autoincrement, notifno TEXT, item_id TEXT, task_id TEXT, effect_cat_typ TEXT, effect_codegrp TEXT, effect_code TEXT, txt_effectgrp TEXT, txt_effectcd TEXT, value TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyStatus     			( id integer primary key autoincrement, orderno TEXT, opno TEXT, stsma TEXT, status TEXT, statusdesc, state TEXT, actdate TEXT, acttime TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyTimeConfs     		( id integer primary key autoincrement, orderno TEXT, opno TEXT, confno TEXT, type TEXT, description TEXT, date TEXT, time TEXT, enddate TEXT, endtime TEXT,act_work TEXT, rem_work TEXT, act_type TEXT, work_cntr TEXT, reason TEXT, longtext TEXT, duration TEXT, datestamp TEXT,  user TEXT,  empid TEXT, final TEXT, state TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyMPointDocs     		( id integer primary key autoincrement, orderno TEXT, opno TEXT, funcloc TEXT, equipment TEXT, meas_point TEXT, date TEXT, time TEXT, shorttext TEXT, value TEXT, code TEXT, state TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+

	'CREATE TABLE IF NOT EXISTS MyJobClose             ( id integer primary key autoincrement, orderno TEXT , opno TEXT, notifno TEXT, details TEXT, empid TEXT, work_cntr TEXT, state TEXT , closedate TEXT, closetime TEXT, funcloc  TEXT, equipment TEXT, inshift  TEXT, outofshift  TEXT, pgrp TEXT, pcode TEXT, agrp TEXT, acode TEXT, igrp TEXT, icode TEXT, followon  TEXT, variance TEXT, reason TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyNewJobs     			( id integer primary key autoincrement, type TEXT, defect TEXT, mpoint TEXT, mpval TEXT, shorttext TEXT, longtext TEXT, description TEXT, date TEXT, time TEXT, enddate TEXT, endtime TEXT, funcloc TEXT, equipment TEXT, cattype TEXT, codegroup TEXT, coding TEXT, activitycodegroup TEXT, activitycode TEXT, activitytext TEXT, prioritytype TEXT, priority TEXT, reportedby TEXT, state TEXT, assignment TEXT, spec_reqt TEXT, assig_tome TEXT, userid TEXT, eq_status TEXT, breakdown TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyWorkConfig     		( id integer primary key autoincrement, paramname TEXT, paramvalue TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyWorkSyncDets    		( id integer primary key autoincrement, lastsync TEXT, comments   TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyUserDets             ( id integer primary key autoincrement, mobileuser TEXT, workcenter TEXT, scenario TEXT, fullname TEXT, vehiclereg TEXT, employeeid TEXT, user TEXT, password TEXT,pincode TEXT,docserver TEXT, maptype TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyRefOrderTypes     	(  id integer primary key autoincrement, scenario TEXT, type TEXT, description TEXT, statusprofile TEXT, opstatusprofile TEXT, priorityprofile TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyRefNotifTypes     	(  id integer primary key autoincrement, scenario TEXT, type TEXT, description TEXT, statusprofile TEXT, taskstatusprofile TEXT,priority_type TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyRefPriorityTypes     (  id integer primary key autoincrement, scenario TEXT, type TEXT, priority TEXT, description TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyRefUserStatusProfiles (  id integer primary key autoincrement, scenario TEXT, type TEXT, status TEXT, statuscode TEXT, statusdesc TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyVehiclesDefault     	(  sysid integer primary key autoincrement, equipment TEXT, reg TEXT, id TEXT, partner TEXT, level TEXT, sequence TEXT,mpoint TEXT,mpointdesc TEXT, mpointlongtext TEXT,description TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyVehicles     		(  sysid integer primary key autoincrement, reg TEXT, id TEXT, partner TEXT, mpoints TEXT,description TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyForms        		(  id integer primary key autoincrement, name TEXT, type TEXT, lastupdated TEXT, url TEXT,description TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyFormsResponses  		(  id integer primary key autoincrement, formdesc TEXT, user TEXT, formname TEXT, lastupdated TEXT, wc TEXT, plant TEXT, notifno TEXT, orderno TEXT, opno TEXT, date TEXT, time TEXT, contents TEXT, htmlbody TEXT, htmlreadonly TEXT, state TEXT, status TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+

	'CREATE TABLE IF NOT EXISTS MyVehicleCheck     	(  id integer primary key autoincrement, equipment TEXT, reg TEXT,  mileage TEXT,  mpoint TEXT,  desc TEXT,  longtext TEXT,  mdate TEXT, mtime TEXT, mreadby TEXT, user TEXT,  state TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyMessages    			(  id integer primary key autoincrement, msgid TEXT, type TEXT,  date TEXT, time TEXT, msgfromid TEXT, msgfromname TEXT, msgtoid TEXT, msgtoname TEXT, msgsubject TEXT, msgtext TEXT,  expirydate TEXT, state TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS Assets     			(  sysid integer primary key autoincrement,type TEXT, id TEXT, eqart TEXT, eqtyp TEXT, shorttext TEXT,  address TEXT, workcenter TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS AssetClassVals     	(  sysid integer primary key autoincrement,type TEXT, id TEXT,  charact TEXT,  valuechar TEXT,  valueto TEXT, valueneutral TEXT, description TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS AssetMeasurementPoints (  sysid integer primary key autoincrement,type TEXT, id TEXT,  mpoint TEXT,  description TEXT,  value TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS AssetInstalledEquip    (  sysid integer primary key autoincrement,type TEXT, id TEXT,  eqno TEXT,  description TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS LogFile    			( id integer primary key autoincrement, datestamp TEXT, type TEXT, message TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS RefNotifprofile  		( id integer primary key autoincrement, scenario TEXT, profile TEXT, notif_type TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS RefCodeGroups  		( id integer primary key autoincrement, scenario TEXT, profile TEXT, catalog_type TEXT, code_cat_group TEXT, codegroup TEXT, codegroup_text TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS RefCodes  				( id integer primary key autoincrement, scenario TEXT, profile TEXT, code_cat_group TEXT, code TEXT, code_text TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS HRAbsence     			( id integer primary key autoincrement, requesteddate TEXT, startdate TEXT, enddate TEXT, type TEXT, days TEXT, status TEXT, comments TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+

	'CREATE TABLE IF NOT EXISTS HRTravel     			( id integer primary key autoincrement, requesteddate TEXT, startdate TEXT, enddate TEXT, travelfrom TEXT, travelto TEXT, status TEXT, comments TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS AssetDetails     		( id integer primary key autoincrement,PLAN_PLANT TEXT, MTCE_PLANT TEXT, SITE TEXT, FUNC_LOC TEXT, FUNC_LOC_DESC TEXT, EQUIP TEXT, EQUIP_DESC TEXT, PLANT_GROUP TEXT, ASSET_TYPE TEXT, ASSET_DESC TEXT, MAKE TEXT, MODEL TEXT, SERIAL_NO TEXT, OBJ_TYPE TEXT, EQTYPE_DESC TEXT, EFUNC_TYPE TEXT, FTYPE_DESC TEXT, SYS_CODE TEXT, SCODE_DESC TEXT, ASSET_TAG TEXT, START_UP_DATE TEXT, STATUS TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+

	'CREATE TABLE IF NOT EXISTS JobAnswers     		( id integer primary key autoincrement, orderno TEXT, opno TEXT, user TEXT, updateddate TEXT, item TEXT, task TEXT, value TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS StockSearch     		( id integer primary key autoincrement, materialno TEXT, description TEXT, depot TEXT, available TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS SurveyAnswers     		( id integer primary key autoincrement, orderno TEXT, opno TEXT, user TEXT, updateddate TEXT, surveyid TEXT, groupid TEXT, questionid TEXT, name TEXT, answer TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS Survey     			( id integer primary key autoincrement, surveyid TEXT, name TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS SurveyGroup     		( id integer primary key autoincrement, surveyid TEXT, groupid TEXT, name TEXT, title TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS SurveyQuestion    		( id integer primary key autoincrement, surveyid TEXT, groupid TEXT, questionid TEXT, questiontype TEXT, defaultvalue TEXT, name TEXT, title TEXT, dependsonid TEXT, dependsonval TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS SurveySubQuestion  	( id integer primary key autoincrement, surveyid TEXT, groupid TEXT, questionid TEXT, subquestionid TEXT, subquestiontype TEXT, name TEXT, title TEXT, dependsonid TEXT, dependsonval TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS SurveyQuestionChildren ( id integer primary key autoincrement, surveyid TEXT, groupid TEXT, questionid TEXT, questionvalue TEXT, childquestions TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS FuncLocs			  	( id integer primary key autoincrement, flid TEXT, description TEXT, swerk TEXT, level TEXT, parentid TEXT, children TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS Equipments			  	( id integer primary key autoincrement, eqid TEXT, description TEXT, flid TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyMenuBar 		        ( id integer primary key autoincrement, scenario TEXT, level TEXT, item TEXT, position TEXT, type TEXT,  subitem TEXT, command TEXT, item2 TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+	
	'CREATE TABLE IF NOT EXISTS MyAjax		  	 		( id integer primary key autoincrement, adate TEXT,atime TEXT, astate TEXT, acall TEXT,aparams TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+	
	'CREATE TABLE IF NOT EXISTS TSActivities		    ( id integer primary key autoincrement, code TEXT, skill TEXT,  subskill TEXT, description TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS TSNPJobs			    ( id integer primary key autoincrement, jobno TEXT, subtype TEXT,  description TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS TSData		    		( id integer primary key autoincrement, date TEXT, job TEXT, skill TEXT, activity TEXT, time TEXT, ot15 TEXT, ot20 TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS GASSurveyQ			    ( id integer primary key autoincrement, type TEXT, qno TEXT,  qtype TEXT, description TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS GASSurveyA			    ( id integer primary key autoincrement, type TEXT, qno TEXT,  qkey TEXT, qvalue TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS GASSurveyMake		    ( id integer primary key autoincrement, make TEXT, description TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS GASSurveyModel		    ( id integer primary key autoincrement, make TEXT, model TEXT, description TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS GASSurvey			    ( id integer primary key autoincrement, orderno TEXT, opno TEXT, make TEXT, model TEXT, location TEXT, dv1 TEXT, dv2 TEXT, dv3 TEXT, dv4 TEXT, dv5 TEXT, dv6 TEXT, dv7 TEXT, dv8 TEXT, dv9 TEXT, dv10 TEXT, dv11 TEXT, dv12 TEXT, dv13 TEXT, dv14 TEXT, dv15 TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS GASSurveyHDR		    ( id integer primary key autoincrement, orderno TEXT, opno TEXT, date TEXT, signed TEXT, hv1 TEXT, hv2 TEXT, hv3 TEXT, hv4 TEXT, text1 TEXT, text2 TEXT, text3 TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS REFPAICODES			( id integer primary key autoincrement, scenario TEXT, userid TEXT, level TEXT, stsma TEXT, plant TEXT, work_cntr TEXT, catalogue TEXT, codegrp TEXT, kurztext_group TEXT, code TEXT, kurztext_code TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS REFNOTIFICATIONTYPES	( id integer primary key autoincrement, scenario TEXT, userid TEXT, level_number TEXT, notiftype TEXT, notifdesc TEXT, notifprofile TEXT, priotype TEXT,priority TEXT, prioritydesc TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS REFVARIANCESRFV		( id integer primary key autoincrement, scenario TEXT, userid TEXT, plant TEXT, work_cntr TEXT, job_activity TEXT, dev_reason TEXT, dev_reas_txt TEXT, mandate TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS REFACTIVITY			( id integer primary key autoincrement, scenario TEXT, work_center TEXT, activity TEXT, activity_desc TEXT, action TEXT, deflt TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS DG5REL					( id integer primary key autoincrement, catalogue TEXT, codegrp TEXT, code TEXT, codedesc TEXT, dg5rel TEXT, piarel TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS DG5CODES			    ( id integer primary key autoincrement, type TEXT, level TEXT, coderef TEXT, description TEXT, code TEXT, codedesc TEXT,parenttype TEXT, parentcode TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS CFCODES			    ( id integer primary key autoincrement, level TEXT, catalog_type TEXT, code_cat_group TEXT, codegroup TEXT, codegroup_text TEXT, long_text TEXT,code TEXT, codedesc TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyJobsDocs			    ( id integer primary key autoincrement, orderno TEXT, opno TEXT, url TEXT, name TEXT, type TEXT, size TEXT, lastmod TEXT, status TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS MyJobsPhotos			( id integer primary key autoincrement, orderno TEXT, opno TEXT, url TEXT, name TEXT, desc TEXT, size TEXT, date TEXT, status TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS Properties			    ( id integer primary key autoincrement, funcloc TEXT ,description TEXT ,street TEXT ,district TEXT ,city TEXT,postcode TEXT,easting TEXT,northing TEXT,lat FLOAT,lon FLOAT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+
	'CREATE TABLE IF NOT EXISTS AssetDetailsAll		( id integer primary key autoincrement, floc TEXT ,planplant TEXT ,maintplant TEXT ,site TEXT ,flocdesc TEXT,eq TEXT,eqdesc TEXT,plgrpdesc TEXT,asstype TEXT,assdesc TEXT,manufacturer TEXT,partno TEXT,serialno TEXT,eqtype TEXT,eqtypedesc TEXT,recordupdated TIMESTAMP DATETIME DEFAULT(STRFTIME(\'%Y-%m-%d %H:%M:%f\', \'NOW\')));'+





	'CREATE VIEW viewoperationstatus as SELECT orderno, opno, statusdesc FROM myuserstatus where type = "OV" GROUP BY orderno, opno Order by id desc ;'+

	'CREATE VIEW viewprioritycodes as select myrefordertypes.scenario, myrefordertypes.type as ordertype, myrefordertypes.priorityprofile, myrefprioritytypes.priority as priority, myrefprioritytypes.description as prioritydesc from myrefordertypes left join myrefprioritytypes on myrefordertypes.priorityprofile = myrefprioritytypes.type where myrefordertypes.scenario = myrefprioritytypes.scenario;';
	html5sql.process(sqlstatement,
			function(){

		emptyTables(type);
		try {
			window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, buildDirs, buildDirsErrorHandler);
		}
		catch(err) {
			//Not in Cordova
		}



	},
	function(error, statement){

		opMessage("Error: " + error.message + " when create processing " + statement);


	}        
	);


}

function buildDirsErrorHandler(error){

	opMessage("Failed to create The Directories: "+ error);
}
function buildDirs(fs) {



	var entry=fs; 

	entry.getDirectory("MyJobs", {create: true, exclusive: false}, 
			function(dir){
		console.log("Created dir "+dir.name); 
	}, function(error){
		console.log("error Creating Di MyJobs "+error); 
	}); 

	entry.getDirectory("MyJobs/Global", {create: true, exclusive: false}, 
			function(dir){
		console.log("Created dir Global"+dir.name); 
	}, function(error){
		console.log("error Creating Di MyJobs-Global "+error); 
	}); 

	entry.getDirectory("MyJobs/Private", {create: true, exclusive: false}, 
			function(dir){
		console.log("Created dir Private"+dir.name); 
	}, function(error){
		console.log("error Creating Di MyJobs-Private "+error); 
	});

	entry.getDirectory("MyJobs/Private/Download", {create: true, exclusive: false}, 
			function(dir){
		console.log("Created dir Private-Download"+dir.name); 
	}, function(error){
		console.log("error Creating Di MyJobs-Private-Download"+error); 
	});

	entry.getDirectory("MyJobs/Private/Upload", {create: true, exclusive: false}, 
			function(dir){
		console.log("Created dir Private-Upload"+dir.name); 
	}, function(error){
		console.log("error Creating Di MyJobs-Private-Upload"+error); 
	});

	entry.getDirectory("MyJobs/Private/Photos", {create: true, exclusive: false}, 
			function(dir){
		console.log("Created dir Private-Photos"+dir.name); 
	}, function(error){
		console.log("error Creating Di MyJobs-Private-Photos"+error); 
	});

	entry.getDirectory("MyJobs/Global/Download", {create: true, exclusive: false}, 
			function(dir){
		console.log("Created dir Global-Download"+dir.name); 
	}, function(error){
		console.log("error Creating Di MyJobs-Global-Download"+error); 
	});

	entry.getDirectory("MyJobs/Global/Upload", {create: true, exclusive: false}, 
			function(dir){
		console.log("Created dir Global-Upload"+dir.name); 
	}, function(error){
		console.log("error Creating Di MyJobs-Global-Upload"+error); 
	});

}
//*************************************************************************************************************************

//Delete all Tables

//*************************************************************************************************************************
function dropTables() { 


	sqlstatement=	'DROP TABLE IF EXISTS MyOrders;'+
	'DROP TABLE IF EXISTS MyAjax;'+
	'DROP TABLE IF EXISTS MyOperations;'+
	'DROP TABLE IF EXISTS MyOperationsSplit;'+
	'DROP TABLE IF EXISTS MyPartners;'+
	'DROP TABLE IF EXISTS MyAssets;'+
	'DROP TABLE IF EXISTS AssetDetails;'+
	'DROP TABLE IF EXISTS MyMaterials;'+
	'DROP TABLE IF EXISTS MyUserStatus;'+
	'DROP TABLE IF EXISTS MyOperationInfo;'+
	'DROP TABLE IF EXISTS MyNotifications;'+
	'DROP TABLE IF EXISTS MyItems;'+
	'DROP TABLE IF EXISTS MyCauses;'+
	'DROP TABLE IF EXISTS MyActivities;'+
	'DROP TABLE IF EXISTS MyTasks;'+
	'DROP TABLE IF EXISTS MyEffects;'+
	'DROP TABLE IF EXISTS MyStatus;'+
	'DROP TABLE IF EXISTS MyTimeConfs;'+
	'DROP TABLE IF EXISTS MyMPointDocs;'+
	'DROP TABLE IF EXISTS MyJobClose;'+
	'DROP TABLE IF EXISTS MyNewJobs;'+
	'DROP TABLE IF EXISTS MyWorkConfig;'+
	'DROP TABLE IF EXISTS MyRefUsers;'+
	'DROP TABLE IF EXISTS MyRefOrderTypes;'+
	'DROP TABLE IF EXISTS MyRefNotifTypes;'+
	'DROP TABLE IF EXISTS MyRefPriorityTypes;'+
	'DROP TABLE IF EXISTS MyRefUserStatusProfiles;'+
	'DROP TABLE IF EXISTS MyWorkSyncDets;'+
	'DROP TABLE IF EXISTS MyUserDets;'+
	'DROP TABLE IF EXISTS MyVehicles;'+
	'DROP TABLE IF EXISTS MyVehiclesDefault;'+
	'DROP TABLE IF EXISTS MyVehicleCheck;'+
	'DROP TABLE IF EXISTS MyMessages;'+
	'DROP TABLE IF EXISTS Assets;'+
	'DROP TABLE IF EXISTS LogFile;'+
	'DROP TABLE IF EXISTS AssetClassVals;'+
	'DROP TABLE IF AssetInstalledEquip;'+
	'DROP TABLE IF AssetMeasurementPoints;'+
	'DROP TABLE IF EXISTS RefNotifprofile;'+
	'DROP TABLE IF EXISTS RefCodeGroups;'+
	'DROP TABLE IF EXISTS RefCodes;'+
	'DROP TABLE IF EXISTS HRAbsence;'+	
	'DROP TABLE IF EXISTS HRTravel;'+	
	'DROP TABLE IF EXISTS SurveyAnswers;'+	
	'DROP TABLE IF EXISTS Survey;'+	
	'DROP TABLE IF EXISTS SurveyGroup;'+
	'DROP TABLE IF EXISTS SurveyQuestion;'+
	'DROP TABLE IF EXISTS SurveySubQuestion;'+
	'DROP TABLE IF EXISTS SurveyQuestionChildren;'+
	'DROP TABLE IF EXISTS FuncLocs;'+
	'DROP TABLE IF EXISTS Equipments;'+
	'DROP TABLE IF EXISTS TSActivities;'+	
	'DROP TABLE IF EXISTS TSNPJobs;'+
	'DROP TABLE IF EXISTS TSData;'+
	'DROP TABLE IF EXISTS JobAnswers;'+							
	'DROP TABLE IF EXISTS GASSurveyQ;'+	
	'DROP TABLE IF EXISTS GASSurveyA;'+
	'DROP TABLE IF EXISTS GASSurveyMake;'+
	'DROP TABLE IF EXISTS GASSurveyModel;'+
	'DROP TABLE IF EXISTS GASSurvey;'+
	'DROP TABLE IF EXISTS GASSurveyHDR;'+
	'DROP TABLE IF EXISTS StockSearch;'+
	'DROP TABLE IF EXISTS MyMenuBar;'+
	'DROP TABLE IF EXISTS MyJobDets;'+
	'DROP TABLE IF EXISTS  REFPAICODES;'+
	'DROP TABLE IF EXISTS REFNOTIFICATIONTYPES;'+
	'DROP TABLE IF EXISTS  REFVARIANCESRFV;'+
	'DROP TABLE IF EXISTS  REFACTIVITY;'+
	'DROP TABLE IF EXISTS  MyForms;'+
	'DROP TABLE IF EXISTS  MyFormsResponses;'+
	'DROP TABLE IF EXISTS  DG5REL;'+
	'DROP TABLE IF EXISTS  DG5CODES;'+
	'DROP TABLE IF EXISTS  CFCODES;'+
	'DROP TABLE IF EXISTS  MyJobsDetsEQ;'+
	'DROP TABLE IF EXISTS  MyJobsDetsATTR;'+
	'DROP TABLE IF EXISTS  Properties;'+
	'DROP TABLE IF EXISTS  AssetDetailsAll;'+
	'DROP TABLE IF EXISTS  MyJobsDocs;'+
	'DROP TABLE IF EXISTS  MyJobsPhotos;'+
	'DROP TABLE IF EXISTS  MyJobDetsMPoints;'+
	'DROP TABLE IF EXISTS  MyJobDetsLoch;'+
	'DROP TABLE IF EXISTS  MyJobDetsMPCodes;'+
	'DROP TABLE IF EXISTS  MyJobDetsDraw;'+

	'DROP VIEW IF EXISTS viewoperationstatus;'+
	'DROP TABLE IF EXISTS viewprioritycodes;';

	html5sql.process(sqlstatement,
			function(){
		//alert("Success dropping Tables");
	},
	function(error, statement){

	}        
	);
}
function emptyTables(type) { 

	sqlstatement=	'DELETE FROM  MyOrders;'+
	'DELETE FROM  MyAjax;'+
	'DELETE FROM  MyOperations;'+
	'DELETE FROM  MyOperationsSplit;'+
	'DELETE FROM  MyPartners;'+
	'DELETE FROM  MyMaterials;'+
	'DELETE FROM  MyAssets;'+
	'DELETE FROM  AssetDetails;'+
	'DELETE FROM  MyUserStatus;'+
	'DELETE FROM  MyOperationInfo;'+
	'DELETE FROM  MyNotifications;'+
	'DELETE FROM  MyItems;'+
	'DELETE FROM  MyCauses;'+
	'DELETE FROM  MyActivities;'+
	'DELETE FROM  MyTasks;'+
	'DELETE FROM  MyEffects;'+
	'DELETE FROM  MyStatus;'+
	'DELETE FROM  MyTimeConfs;'+
	'DELETE FROM  MyMPointDocs;'+
	'DELETE FROM  MyJobClose;'+
	'DELETE FROM  MyNewJobs;'+
	'DELETE FROM  MyWorkConfig;'+
	'DELETE FROM  MyRefUsers;'+
	'DELETE FROM  MyRefOrderTypes;'+
	'DELETE FROM  MyRefNotifTypes;'+
	'DELETE FROM  MyRefPriorityTypes;'+
	'DELETE FROM  MyRefUserStatusProfiles;'+
	'DELETE FROM  MyWorkSyncDets;'+
	'DELETE FROM  MyUserDets;'+
	'DELETE FROM  MyVehicles;'+
	'DELETE FROM  MyVehiclesDefault;'+
	'DELETE FROM  MyVehicleCheck;'+
	'DELETE FROM  MyMessages;'+
	'DELETE FROM  Assets;'+
	'DELETE FROM  LogFile;'+
	'DELETE FROM  AssetClassVals;'+
	'DELETE FROM  AssetInstalledEquip;'+
	'DELETE FROM  AssetMeasurementPoints;'+
	'DELETE FROM  RefNotifprofile;'+
	'DELETE FROM  RefCodeGroups;'+
	'DELETE FROM  RefCodes;'+ 
	'DELETE FROM  HRAbsence;'+	
	'DELETE FROM  HRTravel;'+	
	'DELETE FROM  SurveyAnswers;'+	
	'DELETE FROM  Survey;'+	
	'DELETE FROM  SurveyGroup;'+
	'DELETE FROM  SurveyQuestion;'+
	'DELETE FROM  SurveySubQuestion;'+
	'DELETE FROM  SurveyQuestionChildren;'+
	'DELETE FROM  FuncLocs;'+
	'DELETE FROM  Equipments;'+
	'DELETE FROM  TSActivities;'+	
	'DELETE FROM  TSNPJobs;'+
	'DELETE FROM  TSData;'+
	'DELETE FROM  JobAnswers;'+	
	'DELETE FROM  GASSurveyQ;'+	
	'DELETE FROM  GASSurveyA;'+
	'DELETE FROM  GASSurveyMake;'+
	'DELETE FROM  GASSurveyModel;'+
	'DELETE FROM  GASSurvey;'+
	'DELETE FROM  StockSearch;'+
	'DELETE FROM MyMenuBar;'+
	'DELETE FROM MyJobDets;'+
	'DELETE FROM  REFPAICODES;'+
	'DELETE FROM  REFNOTIFICATIONTYPES;'+
	'DELETE FROM  REFVARIANCESRFV;'+
	'DELETE FROM  REFACTIVITY;'+
	'DELETE FROM  MyForms;'+
	'DELETE FROM  MyFormsResponses;'+
	'DELETE FROM  DG5REL;'+
	'DELETE FROM  DG5CODES;'+
	'DELETE FROM  CFCODES;'+
	'DELETE FROM  MyJobsDocs;'+
	'DELETE FROM  MyJobsPhotos;'+
	'DELETE FROM MyJobsDetsEQ;'+
	'DELETE FROM MyJobsDetsATTR;'+
	'DELETE FROM Properties;'+
	'DELETE FROM AssetDetailsAll;'+
	'DELETE FROM  MyJobDetsMPoints;'+
	'DELETE FROM  MyJobDetsLoch;'+
	'DELETE FROM  MyJobDetsMPCodes;'+
	'DELETE FROM  MyJobDetsDraw;'+
	'DELETE FROM  GASSurveyHDR;';



	html5sql.process(sqlstatement,
			function(){

		demoDataLoaded=type;

		SetConfigParam("TRACE", "OFF");
		SetConfigParam("SYNC_REFERENCE_FREQUENCY", "8400000");
		SetConfigParam("SYNC_TRANSACTIONAL_FREQUENCY", "600000");
		SetConfigParam("SYNC_UPLOAD_FREQUENCY", "2000");
		SetConfigParam("LASTSYNC_REFERENCE", "20130316170000");
		SetConfigParam("LASTSYNC_TRANSACTIONAL", "20130316224900");


		SetConfigParam("LASTSYNC_UPLOAD", "20130316214900");
		SetConfigParam("SERVERNAME", "https://AMPService.azurewebsites.net/api/"); //AZURE
		SetConfigParam("SAPCLIENT", "120");
		SetConfigParam("SAPSYSTEM", "");

		busycreateDB.close()
		formLogin.open()




	},
	function(error, statement){

		opMessage("Error: " + error.message + " when delete processing " + statement);
	}        
	);
}
function loadDemoData() { 
	var path = window.location.pathname;
	var page = path.split("/").pop();

	localStorage.setItem("LastSyncedDT",getDate()+getTime())
	sqlstatement=	'DELETE FROM  MyOrders;'+
	'DELETE FROM  MyAjax;'+
	'DELETE FROM  MyOperations;'+
	'DELETE FROM  MyOperationsSplit;'+
	'DELETE FROM  MyPartners;'+
	'DELETE FROM  MyMaterials;'+
	'DELETE FROM  MyAssets;'+
	'DELETE FROM  AssetDetails;'+
	'DELETE FROM  MyUserStatus;'+
	'DELETE FROM  MyOperationInfo;'+
	'DELETE FROM  MyNotifications;'+
	'DELETE FROM  MyItems;'+
	'DELETE FROM  MyCauses;'+
	'DELETE FROM  MyActivities;'+
	'DELETE FROM  MyTasks;'+
	'DELETE FROM  MyEffects;'+
	'DELETE FROM  MyStatus;'+
	'DELETE FROM  MyTimeConfs;'+
	'DELETE FROM  MyMPointDocs;'+
	'DELETE FROM  MyJobClose;'+
	'DELETE FROM  MyNewJobs;'+
	'DELETE FROM  MyWorkConfig;'+
	'DELETE FROM  MyRefUsers;'+
	'DELETE FROM  MyRefOrderTypes;'+
	'DELETE FROM  MyRefNotifTypes;'+
	'DELETE FROM  MyRefPriorityTypes;'+
	'DELETE FROM  MyRefUserStatusProfiles;'+
	'DELETE FROM  MyWorkSyncDets;'+
	//'DELETE FROM  MyUserDets;'+
	'DELETE FROM  MyVehicles;'+
	'DELETE FROM  MyVehiclesDefault;'+
	'DELETE FROM  MyVehicleCheck;'+
	'DELETE FROM  MyMessages;'+
	'DELETE FROM  Assets;'+
	'DELETE FROM  LogFile;'+
	'DELETE FROM  AssetClassVals;'+
	'DELETE FROM  AssetInstalledEquip;'+
	'DELETE FROM  AssetMeasurementPoints;'+
	'DELETE FROM  RefNotifprofile;'+
	'DELETE FROM  RefCodeGroups;'+
	'DELETE FROM  RefCodes;'+ 
	'DELETE FROM  HRAbsence;'+	
	'DELETE FROM  HRTravel;'+	
	'DELETE FROM  SurveyAnswers;'+	
	'DELETE FROM  Survey;'+	
	'DELETE FROM  SurveyGroup;'+
	'DELETE FROM  SurveyQuestion;'+
	'DELETE FROM  SurveySubQuestion;'+
	'DELETE FROM  SurveyQuestionChildren;'+
	'DELETE FROM  FuncLocs;'+
	'DELETE FROM  Equipments;'+
	'DELETE FROM  TSActivities;'+	
	'DELETE FROM  TSNPJobs;'+
	'DELETE FROM  TSData;'+
	'DELETE FROM  JobAnswers;'+	
	'DELETE FROM  GASSurveyQ;'+	
	'DELETE FROM  GASSurveyA;'+
	'DELETE FROM  GASSurveyMake;'+
	'DELETE FROM  GASSurveyModel;'+
	'DELETE FROM  GASSurvey;'+
	'DELETE FROM  StockSearch;'+
	'DELETE FROM MyMenuBar;'+
	'DELETE FROM MyJobDets;'+
	'DELETE FROM  REFPAICODES;'+
	'DELETE FROM  REFNOTIFICATIONTYPES;'+
	'DELETE FROM  REFVARIANCESRFV;'+
	'DELETE FROM  REFACTIVITY;'+
	'DELETE FROM  MyForms;'+
	'DELETE FROM  MyFormsResponses;'+
	'DELETE FROM  DG5REL;'+
	'DELETE FROM  DG5CODES;'+
	'DELETE FROM  CFCODES;'+
	'DELETE FROM  MyJobsDocs;'+
	'DELETE FROM  MyJobsPhotos;'+
	'DELETE FROM MyJobsDetsEQ;'+
	'DELETE FROM MyJobsDetsATTR;'+
	'DELETE FROM Properties;'+
	'DELETE FROM AssetDetailsAll;'+
	'DELETE FROM  MyJobDetsMPoints;'+
	'DELETE FROM  MyJobDetsLoch;'+
	'DELETE FROM  MyJobDetsMPCodes;'+
	'DELETE FROM  MyJobDetsDraw;'+
	'DELETE FROM  GASSurveyHDR;';

	html5sql.process(sqlstatement,
			function(){


		SetConfigParam("TRACE", "ON");
		SetConfigParam("SYNC_REFERENCE_FREQUENCY", "8400000");
		SetConfigParam("SYNC_TRANSACTIONAL_FREQUENCY", "600000");
		SetConfigParam("SYNC_UPLOAD_FREQUENCY", "300");
		SetConfigParam("LASTSYNC_REFERENCE", "20180316170000");
		SetConfigParam("LASTSYNC_TRANSACTIONAL", "20180316224900");
		SetConfigParam("LASTSYNC_UPLOAD", "20180316214900");
		SetConfigParam("SERVERNAME", "XXXX://awssvstol411.globalinfra.net:8000/sap/bc/bsp/sap/zbsp_myjobsall/");
		SetConfigParam("SAPCLIENT", "120");
		//loadAssetXML("TestData\\T2_MPLT_ESVN.XML")
		//loadAssetXML("TestData\\T2_MPLT_LSVM.XML")
		//loadAssetXML("TestData\\T2_MPLT_LSVS.XML")
		//loadAssetXML("TestData\\T2_MPLT_NSVE.XML")
		//loadAssetXML("TestData\\T2_MPLT_NSVM.XML")
		//loadAssetXML("TestData\\T2_MPLT_NSVW.XML")
		//loadAssetXML("TestData\\T2_MPLT_RSVM.XML")
		//loadAssetXML("TestData\\T2_MPLT_RSVN.XML")


		requestDEMOData('MyJobsOrders.json');

		requestDEMOData('MyJobsNotifications.json');

		requestDEMOData('MyJobsUsers.json');
		requestDEMOData('MyJobsAssetPlantsExt.json');

		requestDEMOData('MyJobsOrdersObjects.json');	

		requestDEMOData('MyJobsRefData.json');

		requestDEMOData('MyJobsRefDataCodes.json');

		//requestDEMOData('funclocs.json');
		requestDEMOData('MyForms.json');
		requestDEMOData('PE29.json');
		//requestDEMOData('POSTRIDGE2.json');
		requestDEMOData('MyJobsVehicles.json');
		requestDEMOData('MyJobsVehiclesDefault.json');
		requestDEMOData('MyJobsDG5Codes.json');
		requestDEMOData('AssetSitesDetails.json');
		requestDEMOData('MyJobsParams.json');

		//requestDEMOData('GASSurvey.json');

		//requestDEMOData('GASSurveyHdr.json');
		//requestDEMOData('MyMessagesData.json');
		//
		//requestDEMOData('TimeSheetNPJobs.json');

		//requestDEMOData('TimeSheetActivities.json');
		//requestDEMOData('MySurveys.json');






	},
	function(error, statement){

		opMessage("Error: " + error.message + " when delete processing " + statement);
	}        
	);
}
function resetTables() { 
	var sqlstatement="";

	sqlstatement=	'DELETE FROM  MyOrders;'+
	'DELETE FROM  MyAjax;'+
	'DELETE FROM  MyOperations;'+
	'DELETE FROM  MyOperationsSplit;'+
	'DELETE FROM  MyJobDets;'+
	'DELETE FROM  MyPartners;'+
	'DELETE FROM  MyMaterials;'+
	'DELETE FROM  MyAssets;'+
	'DELETE FROM  AssetDetails;'+
	'DELETE FROM  MyUserStatus;'+
	'DELETE FROM  MyOperationInfo;'+
	'DELETE FROM  MyNotifications;'+
	'DELETE FROM  MyItems;'+
	'DELETE FROM  MyCauses;'+
	'DELETE FROM  MyActivities;'+
	'DELETE FROM  MyTasks;'+
	'DELETE FROM  MyEffects;'+
	'DELETE FROM  MyStatus;'+
	'DELETE FROM  MyTimeConfs;'+
	'DELETE FROM  MyMPointDocs;'+
	'DELETE FROM  MyJobClose;'+
	'DELETE FROM  MyNewJobs;'+
	'DELETE FROM  MyRefUsers;'+
	'DELETE FROM  MyRefOrderTypes;'+
	'DELETE FROM  MyRefNotifTypes;'+
	'DELETE FROM  MyRefPriorityTypes;'+
	'DELETE FROM  MyRefUserStatusProfiles;'+
	'DELETE FROM  MyWorkSyncDets;'+
	'DELETE FROM  MyVehicles;'+
	'DELETE FROM  MyVehiclesDefault;'+
	'DELETE FROM  MyVehicleCheck;'+
	'DELETE FROM  MyMessages;'+
	'DELETE FROM  Assets;'+
	'DELETE FROM  LogFile;'+
	'DELETE FROM  AssetClassVals;'+
	'DELETE FROM  AssetInstalledEquip;'+
	'DELETE FROM  AssetMeasurementPoints;'+
	'DELETE FROM  RefNotifprofile;'+
	'DELETE FROM  RefCodeGroups;'+
	'DELETE FROM  RefCodes;'+  
	'DELETE FROM  HRAbsence;'+
	'DELETE FROM  HRTravel;'+	
	'DELETE FROM  SurveyAnswers;'+	
	'DELETE FROM  Survey;'+	
	'DELETE FROM  SurveyGroup;'+
	'DELETE FROM  SurveyQuestion;'+
	'DELETE FROM  SurveySubQuestion;'+
	'DELETE FROM  SurveyQuestionChildren;'+
	'DELETE FROM  FuncLocs;'+
	'DELETE FROM  Equipments;'+
	'DELETE FROM  TSActivities;'+	
	'DELETE FROM  TSNPJobs;'+
	'DELETE FROM  TSData;'+
	'DELETE FROM  JobAnswers;'+	
	'DELETE FROM  GASSurveyQ;'+	
	'DELETE FROM  GASSurveyA;'+
	'DELETE FROM  GASSurveyMake;'+
	'DELETE FROM  GASSurveyModel;'+
	'DELETE FROM  GASSurvey;'+
	'DELETE FROM  StockSearch;'+
	'DELETE FROM  REFPAICODES;'+
	'DELETE FROM  REFNOTIFICATIONTYPES;'+
	'DELETE FROM  REFVARIANCESRFV;'+
	'DELETE FROM  REFACTIVITY;'+
	'DELETE FROM  MyForms;'+
	'DELETE FROM  MyFormsResponses;'+
	'DELETE FROM  DG5REL;'+
	'DELETE FROM  DG5CODES;'+
	'DELETE FROM  CFCODES;'+
	'DELETE FROM  MyJobsDocs;'+
	'DELETE FROM  MyJobsPhotos;'+
	'DELETE FROM MyJobsDetsEQ;'+
	'DELETE FROM MyJobsDetsATTR;'+
	'DELETE FROM Properties;'+
	'DELETE FROM AssetDetailsAll;'+
	'DELETE FROM  MyJobDetsMPoints;'+
	'DELETE FROM  MyJobDetsLoch;'+
	'DELETE FROM  MyJobDetsMPCodes;'+
	'DELETE FROM  MyJobDetsDraw;'+
	'DELETE FROM  MyUserDets;'+
	'DELETE FROM  GASSurveyHDR;';



	html5sql.process(sqlstatement,
			function(){


		SetConfigParam('LASTSYNC_REFERENCE', "20120101010101");
		SetConfigParam('LASTSYNC_TRANSACTIONAL', "20120101010101");
		SetConfigParam('LASTSYNC_UPLOAD', "20120101010101");


		window.location.href="index.html"


	},
	function(error, statement){

		opMessage("Error: " + error.message + " when delete processing " + statement);
	}        
	);
}
function DeleteLog() { 
	html5sql.process("DELETE FROM LogFile",
			function(){

	},
	function(error, statement){
		opMessage("Error: " + error.message + " when processing " + statement);
	}        
	);

}
function createDB(type){

	createTables(type);




}	


function requestDEMOData(page){

	opMessage("DEMOLoad "+page);

	$.getJSON("TestData/"+page,function(data,status){ 	
		if (page == 'AssetSitesDetails.json') {
			refAssetSitesDetailsCB(data);
		}
		if(page=='MyJobsParams.json'){
			paramCB(data);

		}
		if(page=='MyJobsOrders.json'){

			orderCB(data);

		}
		if(page=='MyJobsNotifications.json'){

			notificationCB(data);

		}
		if(page=='MyJobsUsers.json'){
			userCB(data);

		}
		if(page=='MyJobsAssetPlantsExt.json'){
			assetPlantsCB(data);

		}
		if(page=='MyForms.json'){
			formCB(data);

		}
		if(page=='PE29.json'){
			propsCB(data);

		}
		if(page=='POSTRIDGE2.json'){

			assetdetailsCB(data);

		}
		if(page=='MyJobsOrdersObjects.json'){
			orderobjectsCB(data);

		}
		if(page=='MyJobsRefData.json'){

			refdataCB(data);

		}
		if(page=='MyJobsRefJobsDataCodes.json'){
			refdatacodesCB(data);

		}		
		if(page=='MyJobsVehicles.json'){
			vehicleCB(data);

		}
		if(page=='MyJobsVehiclesDefault.json'){
			vehicleDefaultCB(data);

		}
		if(page=='MyMessagesData.json'){
			messageCB(data);

		}	
		if(page=='GASSurvey.json'){
			refgasCB(data);

		}
		if(page=='GASSurveyHdr.json'){
			refgashdrCB(data);

		}
		if(page=='funclocs.json'){
			refflocsCB(data);

		}
		if(page=='TimeSheetNPJobs.json'){
			tsnpjobsCB(data);

		}
		if(page=='TimeSheetActivities.json'){
			tsactivitiesCB(data);

		}
		if(page=='MySurveys.json'){

			surveysCB(data);

		}
		if(page=='MyJobsDG5Codes.json'){

			dg5CB(data);

		}
	})
	.fail(function(data,status) {
		opMessage( "error:"+status+":"+data );
	})
}
function refAssetSitesDetailsCB(AssetSitesDetails) {

	var sqlstatement = "";

	var first = 0;
	if (AssetSitesDetails.assetdetails.length > 0) {

		if (syncReferenceDetsUpdated) {
			localStorage.setItem('LastSyncReferenceDetails', localStorage.getItem('LastSyncReferenceDetails') + ', AssetSitesDetails:' + String(AssetSitesDetails.assetdetails.length));
		} else {
			localStorage.setItem('LastSyncReferenceDetails', localStorage.getItem('LastSyncReferenceDetails') + 'AssetSitesDetails:' + String(AssetSitesDetails.assetdetails.length));
		}
		opMessage("Deleting Existing AssetSitesDetails");
		sqlstatement += 'DELETE FROM AssetSitesDetails;';
		opMessage("Loading " + AssetSitesDetails.assetdetails.length + " AssetSitesDetails");
		for (var cntx = 0; cntx < AssetSitesDetails.assetdetails.length ; cntx++) {






			sqlstatement += 'INSERT INTO AssetSitesDetails ( assdesc ,assettag ,asstype ,eqart ,eqktx ,equnr ,herst ,iwerk ,mapar ,ncdesc ,otdesc ,plgrp ,pltxt ,serge ,site ,status ,swerk ,syscode ,sysdesc ,tplnr ,zfl_nc ,zinbdt ) VALUES ( ' +
			'"' + AssetSitesDetails.assetdetails[cntx].assdesc + '",' +
			'"' + AssetSitesDetails.assetdetails[cntx].assettag + '",' +
			'"' + AssetSitesDetails.assetdetails[cntx].asstype + '",' +
			'"' + AssetSitesDetails.assetdetails[cntx].eqart + '",' +
			'"' + AssetSitesDetails.assetdetails[cntx].eqktx + '",' +
			'"' + AssetSitesDetails.assetdetails[cntx].equnr + '",' +
			'"' + AssetSitesDetails.assetdetails[cntx].herst + '",' +
			'"' + AssetSitesDetails.assetdetails[cntx].iwerk + '",' +
			'"' + AssetSitesDetails.assetdetails[cntx].mapar + '",' +
			'"' + AssetSitesDetails.assetdetails[cntx].ncdesc + '",' +
			'"' + AssetSitesDetails.assetdetails[cntx].otdesc + '",' +
			'"' + AssetSitesDetails.assetdetails[cntx].plgrp + '",' +
			'"' + AssetSitesDetails.assetdetails[cntx].pltxt + '",' +
			'"' + AssetSitesDetails.assetdetails[cntx].serge + '",' +
			'"' + AssetSitesDetails.assetdetails[cntx].site + '",' +
			'"' + AssetSitesDetails.assetdetails[cntx].status + '",' +
			'"' + AssetSitesDetails.assetdetails[cntx].swerk + '",' +
			'"' + AssetSitesDetails.assetdetails[cntx].syscode + '",' +
			'"' + AssetSitesDetails.assetdetails[cntx].sysdesc + '",' +
			'"' + AssetSitesDetails.assetdetails[cntx].tplnr + '",' +
			'"' + AssetSitesDetails.assetdetails[cntx].zfl_nc + '",' +
			'"' + AssetSitesDetails.assetdetails[cntx].zinbdt + '");';
		}


		html5sql.process(sqlstatement,
				function () {
			opMessage("Success - Finished Loading AssetSitesDetails");
		},
		function (error, statement) {
			opMessage("Error: " + error.message + " when processing " + statement);
		}
		);
	}
}
function orderCB(MyOrders){

	var sqlDelete="";
	OrdersProcessed=[]
	jdetops=[];
	var sqlstatement="";
	var sqlstatements=[];
	var ordernos=[];
	var changeddatetime=[];
	var orderlist="";
	opMessage("Receied Orders Count ="+MyOrders.order.length);


	if(MyOrders.order.length==0){
		setSyncingIndicator(false)
	}

	if(MyOrders.order.length>0){
		if(syncTransactionalDetsUpdated){
			localStorage.setItem('LastSyncTransactionalDetails',localStorage.getItem('LastSyncTransactionalDetails')+', Orders:'+String(MyOrders.order.length));
		}else{
			localStorage.setItem('LastSyncTransactionalDetails',localStorage.getItem('LastSyncTransactionalDetails')+'Orders:'+String(MyOrders.order.length));
		}
		opMessage("Deleting Existing Orders");
		sqlstatementMP ='DELETE FROM MyJobDetsMPoints;'+
		'DELETE FROM MyJobDetsLoch;'+
		'DELETE FROM MyJobDetsMPCodes;'+
		'DELETE FROM MyJobsDetsEQ;'+
		'DELETE FROM MyJobsDetsATTR;';





		for(var cntx=0; cntx < MyOrders.order.length ; cntx++)
		{
			if(cntx>0){
				orderlist+=","	
			}else{
				for(var opscnt=0; opscnt < MyOrders.order[cntx].jobmeascodes.length ; opscnt++)
				{
					sqlstatementMP+='INSERT INTO MyJobDetsMPCodes (code_gp,code,code_text) VALUES ('+

					'"'+MyOrders.order[cntx].jobmeascodes[opscnt].code_gp+  '","'+ MyOrders.order[cntx].jobmeascodes[opscnt].code+  '","'+ MyOrders.order[cntx].jobmeascodes[opscnt].code_text+'");';


				}
				for(var opscnt=0; opscnt < MyOrders.order[cntx].jobmeaspoints.length ; opscnt++)
				{	

					sqlstatementMP+='INSERT INTO MyJobDetsMPoints (meas_point, object_id, object_desc, psort,pttxt,format,no_char,no_deci,code_gp,code,unit_meas,read_from) VALUES ('+
					'"'+MyOrders.order[cntx].jobmeaspoints[opscnt].meas_point+  '","'+ MyOrders.order[cntx].jobmeaspoints[opscnt].object_id+  '","'+MyOrders.order[cntx].jobmeaspoints[opscnt].object_desc+  '",'+
					'"'+MyOrders.order[cntx].jobmeaspoints[opscnt].psort+  '","'+ MyOrders.order[cntx].jobmeaspoints[opscnt].pttxt+  '","'+ MyOrders.order[cntx].jobmeaspoints[opscnt].format+  '",'+  
					'"'+MyOrders.order[cntx].jobmeaspoints[opscnt].no_char+  '","'+ MyOrders.order[cntx].jobmeaspoints[opscnt].no_deci+  '","'+ MyOrders.order[cntx].jobmeaspoints[opscnt].code_gp+  '",'+
					'"'+MyOrders.order[cntx].jobmeaspoints[opscnt].code+  '","'+ MyOrders.order[cntx].jobmeaspoints[opscnt].unit_meas+  '","'+ MyOrders.order[cntx].jobmeaspoints[opscnt].read_from+'");';

				}


				for(var opscnt=0; opscnt < MyOrders.order[cntx].jobloch.length ; opscnt++)
				{	

					sqlstatementMP+='INSERT INTO MyJobDetsloch (orderno, notification_no, not_type, not_date,not_time,not_shtxt,not_order,meter_no,meter_rdg,work_type,order_type,op_txt, order_date, order_status) VALUES ('+
					'"'+MyOrders.order[cntx].jobloch[opscnt].order+  '","'+ MyOrders.order[cntx].jobloch[opscnt].notification_no+  '","'+MyOrders.order[cntx].jobloch[opscnt].not_type+  '",'+
					'"'+MyOrders.order[cntx].jobloch[opscnt].not_date+  '","'+ MyOrders.order[cntx].jobloch[opscnt].not_time+  '","'+ MyOrders.order[cntx].jobloch[opscnt].not_shtxt+  '",'+  
					'"'+MyOrders.order[cntx].jobloch[opscnt].not_order+  '","'+ MyOrders.order[cntx].jobloch[opscnt].meter_no+  '",'+  
					'"'+MyOrders.order[cntx].jobloch[opscnt].meter_rdg+  '","'+ MyOrders.order[cntx].jobloch[opscnt].work_type+  '","'+ MyOrders.order[cntx].jobloch[opscnt].order_type+  '",'+
					'"'+MyOrders.order[cntx].jobloch[opscnt].op_txt+  '","'+ MyOrders.order[cntx].jobloch[opscnt].order_date+  '","'+ MyOrders.order[cntx].jobloch[opscnt].order_status+'");';

				}

			}

			orderlist+="'"+MyOrders.order[cntx].orderno+"'"
			ordernos.push(MyOrders.order[cntx].orderno)
			changeddatetime.push(MyOrders.order[cntx].changed_date+MyOrders.order[cntx].changed_time)

			stext=MyOrders.order[cntx].shorttext.replace(/%2A%20/g,"%0D%0A")
			stext=stext.replace("\/", "");;
			stext=stext.replace(/&/g, "");;
			//alert(MyOrders.order[cntx].longtext)
			ltext=MyOrders.order[cntx].longtext.replace(/%2A%20/g,"%0D%0A")
			ltext=ltext.replace(/%E2%80%A2/g,"%2D")				
			ltext=ltext.replace(/ %2A /g,"%0D%0A")
			ltext=ltext.replace(/%C2/g,"")				
			ltext=ltext.replace(/%3C%28%3E/g,"")	
			ltext=ltext.replace(/%3C%29%3E/g,"")		
			ltext=ltext.replace(/%E2%80%99/g,"")
			//alert(ltext)
			sqlstatement='INSERT INTO MyOrders (orderno , changedby, changeddatetime, shorttext , longtext , startdate ,  enddate ,contact , telno , type , priority , address ,workaddress, house, houseno, street, district, city, postcode, gis,  property, funcloc, equipment, propertygis, funclocgis, equipmentgis, notifno) VALUES ('+
			'"'+MyOrders.order[cntx].orderno+ '","'+ MyOrders.order[cntx].changed_by+ '","'+ MyOrders.order[cntx].changed_date+MyOrders.order[cntx].changed_time+ '","'+ stext + '","'+ ltext + '","'+ MyOrders.order[cntx].startdate + '","'+ MyOrders.order[cntx].enddate + '","'+MyOrders.order[cntx].contact+'",'+ 
			'"'+MyOrders.order[cntx].telno + '","'+MyOrders.order[cntx].type + '","'+MyOrders.order[cntx].priority + '","'+MyOrders.order[cntx].address + '","'+MyOrders.order[cntx].workaddress+ '","'+MyOrders.order[cntx].house+'",'+ 
			'"'+MyOrders.order[cntx].houseno+ '","'+MyOrders.order[cntx].street+ '","'+MyOrders.order[cntx].district+ '","'+MyOrders.order[cntx].city+ '","'+MyOrders.order[cntx].postcode+ '","'+MyOrders.order[cntx].gis+'",'+ 
			'"'+MyOrders.order[cntx].property+  '","'+MyOrders.order[cntx].funcloc+  '","'+MyOrders.order[cntx].equipment+'",'+ 
			'"'+MyOrders.order[cntx].propertygis+  '","'+MyOrders.order[cntx].funclocgis+  '","'+MyOrders.order[cntx].equipmentgis+ '","'+MyOrders.order[cntx].notifno+'");';
			//Loop and write Draw Files to DB
			//Loop and write JobDets
			tcdates=[]
			var orderJdets=MyOrders.order[cntx].orderno
			for(var pcnt=0; pcnt < MyOrders.order[cntx].jobdets.length ; pcnt++)
			{
				orderJdets+=","+MyOrders.order[cntx].jobdets[pcnt].opno;
				if(MyOrders.order[cntx].jobdets[pcnt].orderno.length>1){	
					if (MyOrders.order[cntx].jobdets[pcnt].acpt_date.length>6){

						tcdates.push(MyOrders.order[cntx].jobdets[pcnt].acpt_date+"|"+MyOrders.order[cntx].jobdets[pcnt].acpt_time);
					}
					if (MyOrders.order[cntx].jobdets[pcnt].onsite_date.length>6){

						tcdates.push(MyOrders.order[cntx].jobdets[pcnt].onsite_date+"|"+MyOrders.order[cntx].jobdets[pcnt].onsite_time);
					}
					if (MyOrders.order[cntx].jobdets[pcnt].park_date.length>6){

						tcdates.push(MyOrders.order[cntx].jobdets[pcnt].park_date+"|"+MyOrders.order[cntx].jobdets[pcnt].park_time);
					}

					tcdates.sort()

					if(tcdates.length>0){
						x=tcdates[tcdates.length-1].split("|");
						tconfd=x[0]
						tconft=x[1]
					}else{
						tconfd=""
							tconft=""
					}	

					sqlstatement+='INSERT INTO MyJobDets (orderno, opno, notifno, plant, orderplant, orderworkcentre, eworkcentre, oworkcentre, priority_code, priority_desc, pmactivity_code, pmactivity_desc,oppmactivity_code, oppmactivity_desc, start_date, start_time, duration, equipment_code, equipment_desc, equipment_gis, funcloc_code, funcloc_desc, funcloc_gis, acpt_date, acpt_time, onsite_date, onsite_time, park_date, park_time, tconf_date, tconf_time, status, status_l, status_s, notif_cat_profile, site) VALUES ('+
					'"'+MyOrders.order[cntx].jobdets[pcnt].orderno+'","'+ 
					MyOrders.order[cntx].jobdets[pcnt].opno+'","'+ 
					MyOrders.order[cntx].jobdets[pcnt].notifno+'","'+ 
					MyOrders.order[cntx].jobdets[pcnt].plant+'","'+ 
					MyOrders.order[cntx].jobdets[pcnt].orderplant+'","'+ 
					MyOrders.order[cntx].jobdets[pcnt].orderworkcentre+'","'+ 
					MyOrders.order[cntx].jobdets[pcnt].eworkcentre+'","'+ 
					MyOrders.order[cntx].jobdets[pcnt].oworkcentre+'","'+ 
					MyOrders.order[cntx].jobdets[pcnt].priority_code+'","'+ 
					MyOrders.order[cntx].jobdets[pcnt].priority_desc+'","'+ 
					MyOrders.order[cntx].jobdets[pcnt].pmactivity_code+'","'+ 
					MyOrders.order[cntx].jobdets[pcnt].pmactivity_desc+'","'+ 
					MyOrders.order[cntx].jobdets[pcnt].oppmactivity_code+'","'+ 
					MyOrders.order[cntx].jobdets[pcnt].oppmactivity_desc+'","'+ 
					MyOrders.order[cntx].jobdets[pcnt].start_date+'","'+ 
					MyOrders.order[cntx].jobdets[pcnt].start_time+'","'+ 
					MyOrders.order[cntx].jobdets[pcnt].duration+'","'+ 
					MyOrders.order[cntx].jobdets[pcnt].equipment_code+'","'+ 
					MyOrders.order[cntx].jobdets[pcnt].equipment_desc+'","'+
					MyOrders.order[cntx].jobdets[pcnt].equipment_gis+'","'+
					MyOrders.order[cntx].jobdets[pcnt].funcloc_code+'","'+ 
					MyOrders.order[cntx].jobdets[pcnt].funcloc_desc+'","'+
					MyOrders.order[cntx].jobdets[pcnt].funcloc_gis+'","'+
					MyOrders.order[cntx].jobdets[pcnt].acpt_date+'","'+
					MyOrders.order[cntx].jobdets[pcnt].acpt_time+'","'+
					MyOrders.order[cntx].jobdets[pcnt].onsite_date+'","'+
					MyOrders.order[cntx].jobdets[pcnt].onsite_time+'","'+
					MyOrders.order[cntx].jobdets[pcnt].park_date+'","'+
					MyOrders.order[cntx].jobdets[pcnt].park_time+'","'+
					tconfd+'","'+
					tconft+'","'+
					MyOrders.order[cntx].jobdets[pcnt].status+'","'+
					MyOrders.order[cntx].jobdets[pcnt].status_l+'","'+
					MyOrders.order[cntx].jobdets[pcnt].status_s+'","'+
					MyOrders.order[cntx].jobdets[pcnt].notif_cat_prof+'","'+
					MyOrders.order[cntx].jobdets[pcnt].site+'");';


				}

			}
			//opMessage("Loading "+MyOrders.order[cntx].operation.length+" Operations");
			for(var opscnt=0; opscnt < MyOrders.order[cntx].jobdraw.length ; opscnt++)
			{	

				sqlstatement+='INSERT INTO MyJobDetsDraw (orderno , zact, zite , zmandatoryfield , zurl , nodeid, fname, mime ) VALUES ('+
				'"'+MyOrders.order[cntx].orderno+  '","'+ MyOrders.order[cntx].jobdraw[opscnt].zact+  '","'+ MyOrders.order[cntx].jobdraw[opscnt].zite+  '","'+MyOrders.order[cntx].jobdraw[opscnt].zmandatoryfield+  '",'+
				'"'+MyOrders.order[cntx].jobdraw[opscnt].zurl+  '","'+ MyOrders.order[cntx].jobdraw[opscnt].nodeid+  '","'+ MyOrders.order[cntx].jobdraw[opscnt].fname+  '","'+  MyOrders.order[cntx].jobdraw[opscnt].mime +'");';


			}
			//loop Job Equipment

			for(var opscnt=0; opscnt < MyOrders.order[cntx].jobequipment.length ; opscnt++)
			{	

				sqlstatementMP+='INSERT INTO MyJobsDetsEQ (equnr, obj_type , obj_type_desc , start_date ,manfacture ,manparno ,manserno ,user_status_code ,swerk  ,swerk_desc ,profile  ,device  ,device_info  ,install_date  , install_loc_desc ) VALUES ('+
				'"'+MyOrders.order[cntx].jobequipment[opscnt].equnr+  '","'+ 
				MyOrders.order[cntx].jobequipment[opscnt].obj_type+  '","'+
				MyOrders.order[cntx].jobequipment[opscnt].obj_type_desc+  '","'+
				MyOrders.order[cntx].jobequipment[opscnt].start_date+  '","'+
				MyOrders.order[cntx].jobequipment[opscnt].manfacture+  '","'+
				MyOrders.order[cntx].jobequipment[opscnt].manparno+  '","'+
				MyOrders.order[cntx].jobequipment[opscnt].manserno+  '","'+
				MyOrders.order[cntx].jobequipment[opscnt].user_status_code+  '","'+
				MyOrders.order[cntx].jobequipment[opscnt].swerk+  '","'+
				MyOrders.order[cntx].jobequipment[opscnt].swerk_desc+  '","'+
				MyOrders.order[cntx].jobequipment[opscnt].profile+  '","'+
				MyOrders.order[cntx].jobequipment[opscnt].device+  '","'+
				MyOrders.order[cntx].jobequipment[opscnt].device_info+  '","'+
				MyOrders.order[cntx].jobequipment[opscnt].install_date+  '","'+
				MyOrders.order[cntx].jobequipment[opscnt].install_loc_desc+  '");';



			}
			//loop Job Attribute

			for(var opscnt=0; opscnt < MyOrders.order[cntx].jobattributes.length ; opscnt++)
			{	

				sqlstatementMP+='INSERT INTO MyJobsDetsATTR (equnr  ,classnum  ,klassentext  ,charact  ,charact_desc ,value ) VALUES ('+
				'"'+MyOrders.order[cntx].jobattributes[opscnt].equnr+  '","'+ 
				MyOrders.order[cntx].jobattributes[opscnt].classnum+  '","'+
				MyOrders.order[cntx].jobattributes[opscnt].klassentext+  '","'+
				MyOrders.order[cntx].jobattributes[opscnt].charact+  '","'+
				MyOrders.order[cntx].jobattributes[opscnt].charact_desc+  '","'+
				MyOrders.order[cntx].jobattributes[opscnt].value+  '");';



			}
			for(var opscnt=0; opscnt < MyOrders.order[cntx].operation.length ; opscnt++)
			{	

				sqlstatement+='INSERT INTO MyOperations (orderno , opno, type , priority , shorttext , startdate, enddate, duration , status, apptstart, apptend) VALUES ('+
				'"'+MyOrders.order[cntx].orderno+  '","'+ MyOrders.order[cntx].operation[opscnt].opno+  '","'+ MyOrders.order[cntx].operation[opscnt].type+  '","'+MyOrders.order[cntx].operation[opscnt].priority+  '",'+
				'"'+MyOrders.order[cntx].operation[opscnt].shorttext+  '","'+ MyOrders.order[cntx].operation[opscnt].startdate+  '","'+ MyOrders.order[cntx].operation[opscnt].enddate+  '","'+  MyOrders.order[cntx].operation[opscnt].duration+  '",'+
				'"'+MyOrders.order[cntx].operation[opscnt].status+  '","'+ MyOrders.order[cntx].operation[opscnt].apptstart+  '","'+ MyOrders.order[cntx].operation[opscnt].apptend+'");';

			}

			//opMessage("Loading "+MyOrders.order[cntx].opsplit.length+" Operations Split");


			for(var opscnt=0; opscnt < MyOrders.order[cntx].operationsplit.length ; opscnt++)
			{	

				sqlstatement+='INSERT INTO MyOperationsSplit (orderno , opno, assignedto, duration) VALUES ('+
				'"'+MyOrders.order[cntx].orderno+  '","'+ MyOrders.order[cntx].operationsplit[opscnt].opno+  '","'+ MyOrders.order[cntx].operationsplit[opscnt].assignedto+  '","'+ MyOrders.order[cntx].operationsplit[opscnt].duration+'");';

			}
			//opMessage("Loading "+MyOrders.order[cntx].partner.length+" Partners");

			//Loop and write partners to DB
			for(var pcnt=0; pcnt < MyOrders.order[cntx].partner.length ; pcnt++)
			{	
				sqlstatement+='INSERT INTO MyPartners (orderno , id, type , name , address , postcode , telno, notifno) VALUES ('+ 
				'"'+MyOrders.order[cntx].orderno+  '","'+ MyOrders.order[cntx].partner[pcnt].id+  '","'+  MyOrders.order[cntx].partner[pcnt].type+  '","'+ MyOrders.order[cntx].partner[pcnt].name+  '",'+
				'"'+MyOrders.order[cntx].partner[pcnt].address+  '","'+  MyOrders.order[cntx].partner[pcnt].postcode+  '","'+ MyOrders.order[cntx].partner[pcnt].telno+  '","'+ ""+'");';
			}

			//Loop and write components to DB
			for(var pcnt=0; pcnt < MyOrders.order[cntx].component.length ; pcnt++)
			{	

				sqlstatement+='INSERT INTO Mymaterials (orderno , id, material , description , qty) VALUES ('+ 
				'"'+MyOrders.order[cntx].orderno+  '","'+ MyOrders.order[cntx].component[pcnt].item+  '","'+  MyOrders.order[cntx].component[pcnt].material+  '","'+
				MyOrders.order[cntx].component[pcnt].description+  '","'+ MyOrders.order[cntx].component[pcnt].quantity+  '");';
			}				


			//opMessage("Loading "+MyOrders.order[cntx].userstatus.length+" UserStatus");
			//Loop and write userstatus to DB
			for(var pcnt=0; pcnt < MyOrders.order[cntx].userstatus.length ; pcnt++)
			{	
				sqlstatement+='INSERT INTO MyUserStatus (type , orderno, opno , inact , status , statuscode , statusdesc) VALUES ('+
				'"'+MyOrders.order[cntx].userstatus[pcnt].type+  '","'+  MyOrders.order[cntx].userstatus[pcnt].orderno+  '","'+ MyOrders.order[cntx].userstatus[pcnt].opno+  '",'+
				'"'+MyOrders.order[cntx].userstatus[pcnt].inact+  '","'+  MyOrders.order[cntx].userstatus[pcnt].status+  '","'+  MyOrders.order[cntx].userstatus[pcnt].statuscode+  '",'+
				'"'+MyOrders.order[cntx].userstatus[pcnt].statusdesc+'");';
			}

			//opMessage("Loading "+MyOrders.order[cntx].operationinfo.length+" OperationInfo");
			//Loop and write userstatus to DB

			for(var pcnt=0; pcnt < MyOrders.order[cntx].operationinfo.length ; pcnt++)
			{



				sqlstatement+='INSERT INTO MyOperationInfo (orderno, opno , type , value1 , value2) VALUES ('+
				'"'+MyOrders.order[cntx].operationinfo[pcnt].orderno+  '","'+  MyOrders.order[cntx].operationinfo[pcnt].opno+  '","'+  MyOrders.order[cntx].operationinfo[pcnt].type+  '",'+ 
				'"'+MyOrders.order[cntx].operationinfo[pcnt].value1+  '","'+  MyOrders.order[cntx].operationinfo[pcnt].value2+'");';
			}

			//Loop and write priorityicons
			for(var pcnt=0; pcnt < MyOrders.order[cntx].jobicons.length ; pcnt++)
			{
				if (MyOrders.order[cntx].orderno==	MyOrders.order[cntx].jobicons[pcnt].orderno){	
					val2=MyOrders.order[cntx].jobicons[pcnt].tooltip_desc.replace(/,/g," ")	
					sqlstatement+='INSERT INTO MyOperationInfo (orderno, opno , type , value1 , value2) VALUES ('+
					'"'+MyOrders.order[cntx].jobicons[pcnt].orderno+  '","'+  MyOrders.order[cntx].jobicons[pcnt].opno+  '","'+  "JOBICON"+  '",'+ 
					'"'+MyOrders.order[cntx].jobicons[pcnt].icon_filename+  '","'+  val2+'");';

				}
			}
			//Loop and write Jobicons
			for(var pcnt=0; pcnt < MyOrders.order[cntx].priorityicons.length ; pcnt++)
			{
				if (MyOrders.order[cntx].orderno==	MyOrders.order[cntx].priorityicons[pcnt].orderno){					
					sqlstatement+='INSERT INTO MyOperationInfo (orderno, opno , type , value1 , value2) VALUES ('+
					'"'+MyOrders.order[cntx].priorityicons[pcnt].orderno+  '","'+  MyOrders.order[cntx].priorityicons[pcnt].opno+  '","'+  "PRIORITYICON"+  '",'+ 
					'"'+MyOrders.order[cntx].priorityicons[pcnt].icon_filename+  '","'+  MyOrders.order[cntx].priorityicons[pcnt].tooltip_desc+'");';

				}
			}				

			//Loop and write Assets to DB


			//opMessage("Loading "+MyOrders.order[cntx].asset.length+" Assets");
			for(var acnt=0; acnt < MyOrders.order[cntx].asset.length ; acnt++)
			{
				if (MyOrders.order[cntx].asset[acnt].equipment.length>0){
					sqlstatement+='INSERT INTO MyAssets (orderno , id, type , name ) VALUES ('+
					'"'+MyOrders.order[cntx].orderno+  '","'+   MyOrders.order[cntx].asset[acnt].equipment+  '","'+   'EQ'+  '","'+   MyOrders.order[cntx].asset[acnt].equidescr+'");';
				}
				if (MyOrders.order[cntx].asset[acnt].funcloc.length>0){
					sqlstatement+='INSERT INTO MyAssets (orderno , id, type , name ) VALUES ('+ 
					'"'+MyOrders.order[cntx].orderno+  '","'+   MyOrders.order[cntx].asset[acnt].funcloc+  '","'+  'FL'+  '","'+   MyOrders.order[cntx].asset[acnt].funclocdesc+'");';
				}
			}
			//Loop and write TConfs to DB


			//opMessage("Loading "+MyOrders.order[cntx].tconf.length+" TimeConfs");

			for(var acnt=0; acnt < MyOrders.order[cntx].tconf.length ; acnt++)
			{	
				if(MyOrders.order[cntx].tconf[acnt].description=="Travel"){
					tcType = "Travel";
					tcDesc="";
				}else{
					tcType = "Work";
					tcDesc=MyOrders.order[cntx].tconf[acnt].description;
				}
				if(MyOrders.order[cntx].tconf[acnt].final==""){
					tcFinal="";
				}else{
					tcFinal="Yes";
				}
				sqlstatement+='INSERT INTO MyTimeConfs (orderno , opno,type, confno , description , date , time , enddate, endtime, duration, empid, final,datestamp, user, state ) VALUES ('+
				'"'+MyOrders.order[cntx].orderno+  '","'+   MyOrders.order[cntx].tconf[acnt].activity+  '","'+   tcType+  '","'+   MyOrders.order[cntx].tconf[acnt].confno+  '","'+  tcDesc+  '","'+  MyOrders.order[cntx].tconf[acnt].date+  '","'+  MyOrders.order[cntx].tconf[acnt].time+  '",'+ 
				'"'+MyOrders.order[cntx].tconf[acnt].enddate+  '","'+  MyOrders.order[cntx].tconf[acnt].endtime+  '","'+  MyOrders.order[cntx].tconf[acnt].duration+  '","'+  MyOrders.order[cntx].tconf[acnt].empid+  '","'+  tcFinal+  '","","","");';


			}
			if(OrdersProcessed.indexOf(MyOrders.order[cntx].orderno)==-1){
				sqlstatements.push(sqlstatement);
				OrdersProcessed.push(MyOrders.order[cntx].orderno)
				jdetops.push(orderJdets)
			}
			sqlstatement=""






		}
		for(var cntx=0; cntx < ordernos.length ; cntx++)
		{

			InsertOrder(sqlstatements[cntx],ordernos[cntx],changeddatetime[cntx],jdetops[cntx])
		}
		sqldeleteorders="delete from MyOrders WHERE orderno NOT IN ("+orderlist+");"
		sqldeleteorders+="DELETE FROM MyOperations WHERE orderno NOT IN ("+orderlist+");"
		sqldeleteorders+="DELETE FROM MyOperationsSplit WHERE orderno NOT IN ("+orderlist+");"
		sqldeleteorders+="DELETE FROM MyJobDets WHERE orderno NOT IN ("+orderlist+");"
		sqldeleteorders+="DELETE FROM MyPartners  WHERE orderno NOT IN ("+orderlist+");"
		sqldeleteorders+="DELETE FROM MyMaterials  WHERE orderno NOT IN ("+orderlist+");"
		sqldeleteorders+="DELETE FROM MyAssets  WHERE orderno NOT IN ("+orderlist+");"
		sqldeleteorders+="DELETE FROM MyTimeConfs WHERE orderno NOT IN ("+orderlist+");"
		sqldeleteorders+="DELETE FROM MyUserStatus WHERE orderno NOT IN ("+orderlist+");"
		sqldeleteorders+="DELETE FROM MyOperationInfo WHERE orderno NOT IN ("+orderlist+");"
		sqldeleteorders+="DELETE FROM MyStatus where state='SERVER' and orderno NOT IN ("+orderlist+");"
		sqldeleteorders+="DELETE FROM MyJobDetsDraw where orderno NOT IN ("+orderlist+");"
		sqldeleteorders+="DELETE FROM MyFormsResponses WHERE lastupdated <> 'SENDING' and orderno NOT IN ("+orderlist+");"

		html5sql.process(sqldeleteorders,
				function(transaction, results, rowsArray){
			var path = window.location.pathname;
			var page = path.split("/").pop();
			if(page=="Jobs.html"){

				refreshJobList()
			}else if(page=="Home.html"){

				setCounts()
			}
			setSyncingIndicator(false)
			html5sql.process(sqlstatementMP,
					function(){

			},
			function(error, statement){

				opMessage("Error: " + error.message + " when processing " + statement);
			}        
			)
			DeleteOldPhotos(orderlist)
		},
		function(error, statement){
			opMessage("Error: " + error.message + " when processing " + statement);

		}        
		);



	}

}
function InsertOrder(sqlstatement,orderno,changeddatetime, jdets){
	var sqlstatement1=""

		var jdetslocal="";
	html5sql.process("select * , (select GROUP_CONCAT(opno) from myJobDets where orderno = MyOrders.orderno)  as jdets  from MyOrders where  orderno = '"+orderno+"'",
			function(transaction, results, rowsArray){
		if (rowsArray.length>0) {
			jdetslocal=orderno+","+rowsArray[0].jdets;
		}


		if ((rowsArray.length<1)||((rowsArray.length >0) && (rowsArray[0].changeddatetime<changeddatetime))||(jdets!=jdetslocal)){

			if(rowsArray.length<1){


				sqlstatement1 = '';
			}else{



				sqlstatement1 = 'DELETE FROM MyOrders where orderno = "'+orderno+'";'+
				'DELETE FROM MyOperations where orderno = "'+orderno+'";'+
				'DELETE FROM MyOperationsSplit where orderno = "'+orderno+'";'+
				'DELETE FROM MyJobDets where orderno = "'+orderno+'";'+
				'DELETE FROM MyPartners where orderno = "'+orderno+'";'+
				'DELETE FROM MyMaterials where orderno = "'+orderno+'";'+
				'DELETE FROM MyAssets where orderno = "'+orderno+'";'+

				'DELETE FROM MyTimeConfs where orderno = "'+orderno+'";'+
				'DELETE FROM MyUserStatus where orderno = "'+orderno+'";'+
				'DELETE FROM MyOperationInfo where orderno = "'+orderno+'";'+
				'DELETE FROM MyJobDetsDraw where orderno = "'+orderno+'";'+										

				'DELETE FROM MyStatus where state="SERVER" and orderno = "'+orderno+'";'
			}
			if(rowsArray.length<1){
				console.log("Inserting New Order details "+orderno);

			}else{
				console.log("about to process"+orderno+":"+rowsArray[0].changeddatetime+":"+changeddatetime+sqlstatement1);
			}


			html5sql.process(sqlstatement1+sqlstatement,
					function(transaction, results, rowsArray){
				//sendJobPhotos(CurrentOrderNo,CurrentOpNo)
				//sendJobAttachments(CurrentOrderNo,CurrentOpNo)
				//sendJobForms(CurrentOrderNo,CurrentOpNo)



			},
			function(error, statement){

				console.log(orderno+"Failed"+error+statement)

			}        
			);

		}else{

			console.log("Order Exists "+rowsArray[0].changeddatetime+"SAP="+changeddatetime)

		}

	},
	function(error, statement){
		console.log("Error"+statement)
	}        
	);
}
function objectsCB(Objects){
	opMessage("Receing Objects Count ="+Objects.object.length);

	if(Objects.object.length>0){
		if(syncTransactionalDetsUpdated){
			localStorage.setItem('LastSyncTransactionalDetails',localStorage.getItem('LastSyncTransactionalDetails')+', Objects:'+String(Objects.object.length));
		}else{
			localStorage.setItem('LastSyncTransactionalDetails',localStorage.getItem('LastSyncTransactionalDetails')+'Objects:'+String(Objects.object.length));
		}

		sqlstatement = 	'DELETE FROM Assets;';
		html5sql.process(sqlstatement,
				function(){
			//alert("Success Creating Tables");
		},
		function(error, statement){
			opMessage("Error: " + error.message + " when processing " + statement);
		}        
		);		
		sqlstatement='';	

		for(var cntx=0; cntx < Objects.object.length ; cntx++)
		{

			sqlstatement+='INSERT INTO Assets ( id, type , eqart, eqtyp, shorttext, address, workcenter ) VALUES ('+ 
			'"'+Objects.object[cntx].id+  '","'+  Objects.object[cntx].type+  '","'+  Objects.object[cntx].eqart+  '","'+ 
			Objects.object[cntx].eqtyp+  '","'+ Objects.object[cntx].shorttext+  '","'+ Objects.object[cntx].address+  '","'+ Objects.object[cntx].swerk+'");';

		}

		html5sql.process(sqlstatement,
				function(){
			//alert("Success - Finished Loading Orders");
		},
		function(error, statement){
			opMessage("Error: " + error.message + " when processing " + statement);
		}        
		);			  




	}
}
function notificationCB(MyNotifications){
	var sqlstatement;
	var notiftype=""
		var NotifProcessed=[]
	opMessage("Reecived Notifications Count = "+MyNotifications.notification.length);

	if(MyNotifications.notification.length>0){
		if(syncTransactionalDetsUpdated){
			localStorage.setItem('LastSyncTransactionalDetails',localStorage.getItem('LastSyncTransactionalDetails')+', MyNotifications:'+String(MyNotifications.notification.length));
		}else{
			localStorage.setItem('LastSyncTransactionalDetails',localStorage.getItem('LastSyncTransactionalDetails')+'MyNotifications:'+String(MyNotifications.notification.length));
		}	
		//opMessage("Deleting Existing Notifications");
		sqlstatement = 	'DELETE FROM MyNotifications where notifno!="NEW";'+
		'DELETE FROM MyTasks;'+
		'DELETE FROM MyItems;'+
		'DELETE FROM MyCauses;'+
		'DELETE FROM MyActivities;'+
		'DELETE FROM MyEffects;';

		html5sql.process(sqlstatement,
				function(){
			//alert("Success Creating Tables");
		},
		function(error, statement){
			//alert("Error: " + error.message + " when processing " + statement);
		}        
		);		
		//opMessage("Loading "+MyNotifications.notification.length+" Notifications");
		sqlstatement='';	

		for(var cntx=0; cntx < MyNotifications.notification.length ; cntx++)
		{


			x=unescape(MyNotifications.notification[cntx].shorttext).replace(/'/g,"&#039;");;

			x=x.replace("\/", "");;			
			y=MyNotifications.notification[cntx].longtext.replace(/%2A%20/g,"%0D%0A")
			y=y.replace(/%E2%80%A2/g,"%2D")				
			y=y.replace(/ %2A /g,"%0D%0A")
			y=y.replace(/%C2/g,"")				
			y=y.replace(/%3C%28%3E/g,"")	
			y=y.replace(/%3C%29%3E/g,"")		
			y=y.replace(/%E2%80%99/g,"");
			sqlstatement1='INSERT INTO MyNotifications (notifno , changedby, changeddatetime, shorttext , longtext , startdate , priority , type, funcloc, equipment,orderno, reportedon , reportedby , plant, funclocgis, equipmentgis, cattype, pgroup, pcode, grouptext, codetext) VALUES ( '+ 
			'"'+MyNotifications.notification[cntx].notifno +'",'+
			'"'+MyNotifications.notification[cntx].changed_by+'",'+ 
			'"'+MyNotifications.notification[cntx].changed_date +MyNotifications.notification[cntx].changed_time +'",'+ 
			//'"'+MyNotifications.notification[cntx].shorttext+'",'+ 
			'"'+x+'",'+ 
			'"'+y+'",'+ 
			//'"'+MyNotifications.notification[cntx].longtext +'",'+  
			'"'+MyNotifications.notification[cntx].startdate+'",'+ 
			'"'+MyNotifications.notification[cntx].priority+'",'+
			'"'+MyNotifications.notification[cntx].type+'",'+
			//'"'+notiftype+'",'+
			'"'+MyNotifications.notification[cntx].funcloc +'",'+ 
			'"'+MyNotifications.notification[cntx].equipment +'",'+
			'"'+MyNotifications.notification[cntx].orderno+'",'+
			'"'+MyNotifications.notification[cntx].reportedon +'",'+
			'"'+MyNotifications.notification[cntx].reportedby +'",'+
			'"'+MyNotifications.notification[cntx].plant+'",'+
			'"'+MyNotifications.notification[cntx].funclocgis +'",'+ 
			'"'+MyNotifications.notification[cntx].equipmentgis+'",'+
			'"'+MyNotifications.notification[cntx].cattype+'",'+
			'"'+MyNotifications.notification[cntx].pgroup +'",'+
			'"'+MyNotifications.notification[cntx].pcode+'",'+
			'"'+MyNotifications.notification[cntx].pgrouptext+'",'+ 
			'"'+MyNotifications.notification[cntx].pcodetext+'");';
			//Loop and write Items to DB


			//opMessage("Loading "+MyNotifications.notification[cntx].task.length+" Tasks");
			for(var tcnt=0; tcnt < MyNotifications.notification[cntx].task.length ; tcnt++)
			{	

				sqlstatement1+='INSERT INTO MyTasks (notifno , item_id , task_text , task_cat_typ , task_codegrp , task_code , txt_taskgrp ,txt_taskcd , plnd_start_date , plnd_start_time, plnd_end_date, plnd_end_time, sla_end_date, sla_end_time, longtext, complete, status) VALUES ( '+  
				'"'+MyNotifications.notification[cntx].notifno +'",'+
				'"'+MyNotifications.notification[cntx].task[tcnt].id +'",'+
				'"'+MyNotifications.notification[cntx].task[tcnt].task_text +'",'+
				'"'+MyNotifications.notification[cntx].task[tcnt].task_cat_typ +'",'+
				'"'+MyNotifications.notification[cntx].task[tcnt].task_codegrp +'",'+
				'"'+MyNotifications.notification[cntx].task[tcnt].task_code +'",'+
				'"'+MyNotifications.notification[cntx].task[tcnt].txt_taskgrp +'",'+
				'"'+MyNotifications.notification[cntx].task[tcnt].txt_taskcd +'",'+
				'"'+MyNotifications.notification[cntx].task[tcnt].plnd_start_date +'",'+
				'"'+MyNotifications.notification[cntx].task[tcnt].plnd_start_time +'",'+
				'"'+MyNotifications.notification[cntx].task[tcnt].plnd_end_date +'",'+
				'"'+MyNotifications.notification[cntx].task[tcnt].plnd_end_time +'",'+
				'"'+MyNotifications.notification[cntx].task[tcnt].sla_end_date +'",'+
				'"'+MyNotifications.notification[cntx].task[tcnt].sla_end_time +'",'+
				'"'+MyNotifications.notification[cntx].task[tcnt].longtext +'",'+
				'"'+MyNotifications.notification[cntx].task[tcnt].complete +'",'+
				'"'+MyNotifications.notification[cntx].task[tcnt].status +'");';

			}

			//opMessage("Loading "+MyNotifications.notification[cntx].effect.length+" Effect");
			for(var ecnt=0; ecnt < MyNotifications.notification[cntx].effect.length ; ecnt++)
			{	

				sqlstatement1+='INSERT INTO MyEffects (notifno , item_id , task_id, effect_cat_typ , effect_codegrp , effect_code , txt_effectgrp ,txt_effectcd , value) VALUES (  '+
				'"'+MyNotifications.notification[cntx].notifno+'",'+
				'"'+MyNotifications.notification[cntx].effect[ecnt].id+'",'+
				'"'+MyNotifications.notification[cntx].effect[ecnt].task+'",'+
				'"'+MyNotifications.notification[cntx].effect[ecnt].effect_cat_typ+'",'+
				'"'+MyNotifications.notification[cntx].effect[ecnt].effect_codegrp+'",'+
				'"'+MyNotifications.notification[cntx].effect[ecnt].effect_code+'",'+
				'"'+MyNotifications.notification[cntx].effect[ecnt].txt_effectgrp+'",'+
				'"'+MyNotifications.notification[cntx].effect[ecnt].txt_effectcd+'",'+
				'"'+MyNotifications.notification[cntx].effect[ecnt].value+'");';
			}

			//opMessage("Loading "+MyNotifications.notification[cntx].item.length+" Items");
			for(var icnt=0; icnt < MyNotifications.notification[cntx].item.length ; icnt++)
			{	
				MyNotifications.notification[cntx].item[icnt].txt_objptcd=MyNotifications.notification[cntx].item[icnt].txt_objptcd.replace("\"", "");;	
				sqlstatement1+='INSERT INTO MyItems (notifno , item_id , descript , d_cat_typ , d_codegrp , d_code , dl_cat_typ , dl_codegrp , dl_code , stxt_grpcd , txt_probcd , txt_grpcd, txt_objptcd,  status, long_text) VALUES  (  '+
				'"'+MyNotifications.notification[cntx].notifno +'",'+
				'"'+MyNotifications.notification[cntx].item[icnt].id+'",'+ 
				'"'+MyNotifications.notification[cntx].item[icnt].description+'",'+
				'"'+MyNotifications.notification[cntx].item[icnt].d_cat_typ+'",'+
				'"'+MyNotifications.notification[cntx].item[icnt].d_codegrp+'",'+
				'"'+MyNotifications.notification[cntx].item[icnt].d_code+'",'+
				'"'+MyNotifications.notification[cntx].item[icnt].dl_cat_typ+'",'+
				'"'+MyNotifications.notification[cntx].item[icnt].dl_codegrp+'",'+
				'"'+MyNotifications.notification[cntx].item[icnt].dl_code+'",'+

				'"'+MyNotifications.notification[cntx].item[icnt].stxt_grpcd+'",'+
				'"'+MyNotifications.notification[cntx].item[icnt].txt_prodcd+'",'+
				'"'+MyNotifications.notification[cntx].item[icnt].txt_grpcd+'",'+
				'"'+MyNotifications.notification[cntx].item[icnt].txt_objptcd+  '","S","");';

			}
			//Loop and write Causes to DB

			//opMessage("Loading "+MyNotifications.notification[cntx].cause.length+" Causes");
			for(var ccnt=0; ccnt < MyNotifications.notification[cntx].cause.length ; ccnt++)
			{	

				sqlstatement1+='INSERT INTO MyCauses (notifno , item_id , cause_id, cause_text , cause_cat_typ , cause_codegrp , cause_code , txt_causegrp , txt_causecd ,  status, long_text) VALUES ( '+ 
				'"'+MyNotifications.notification[cntx].notifno+'",'+
				'"'+MyNotifications.notification[cntx].cause[ccnt].id+'",'+
				'"'+MyNotifications.notification[cntx].cause[ccnt].cause_key+'",'+
				'"'+MyNotifications.notification[cntx].cause[ccnt].causetext+'",'+
				'"'+MyNotifications.notification[cntx].cause[ccnt].cause_cat_typ+'",'+
				'"'+MyNotifications.notification[cntx].cause[ccnt].cause_codegrp+'",'+ 
				'"'+MyNotifications.notification[cntx].cause[ccnt].cause_code+'",'+
				'"'+MyNotifications.notification[cntx].cause[ccnt].cause_txt_causegrp+'",'+
				'"'+MyNotifications.notification[cntx].cause[ccnt].cause_txt_causecd+  '","S","");';
			}
			//Loop and write Items to DB

			//opMessage("Loading "+MyNotifications.notification[cntx].activity.length+" Activities");
			for(var acnt=0; acnt < MyNotifications.notification[cntx].activity.length ; acnt++)
			{	

				sqlstatement1+='INSERT INTO MyActivities (notifno , item_id , task_id, act_text , act_cat_typ , act_codegrp , act_code ,txt_actgrp, txt_actcd ,start_date , start_time , end_date , end_time,   status, act_id, long_text) VALUES ( '+ 
				'"'+MyNotifications.notification[cntx].notifno+'",'+
				'"'+MyNotifications.notification[cntx].activity[acnt].id+'",'+ 
				'"'+MyNotifications.notification[cntx].activity[acnt].act_key+'",'+ 
				'"'+MyNotifications.notification[cntx].activity[acnt].acttext+'",'+
				'"'+MyNotifications.notification[cntx].activity[acnt].act_cat_typ+'",'+
				'"'+MyNotifications.notification[cntx].activity[acnt].act_codegrp+'",'+ 
				'"'+MyNotifications.notification[cntx].activity[acnt].act_code+'",'+ 
				'"'+MyNotifications.notification[cntx].activity[acnt].txt_actgrp+'",'+
				'"'+MyNotifications.notification[cntx].activity[acnt].txt_actcd+'",'+
				'"'+MyNotifications.notification[cntx].activity[acnt].start_date+'",'+
				'"'+MyNotifications.notification[cntx].activity[acnt].start_time+'",'+ 
				'"'+MyNotifications.notification[cntx].activity[acnt].end_date+'",'+
				'"'+MyNotifications.notification[cntx].activity[acnt].end_time+  '","S","","");';
			}

			if((MyNotifications.notification[cntx].notifno=="null")	||
					(MyNotifications.notification[cntx].notifno.length<4)){
				sqlstatement1=""
			}else{
				if(NotifProcessed.indexOf(MyNotifications.notification[cntx].notifno)==-1){
					sqlstatement+=sqlstatement1;
					NotifProcessed.push(MyNotifications.notification[cntx].notifno)
				}

			}


		}

		html5sql.process(sqlstatement,
				function(transaction, results, rowsArray){


		},
		function(error, statement){

			opMessage("Error: " + error.message + " when processing " + statement);
		}        
		);	
	}
}		
function sapCB(MySAP){

	var sqlstatement="";
	opMessage("Callback sapCB triggured");






	if(MySAP.message.length>0){

		opMessage("Processing Update Response: ");
//		Handle NewJob Create Response
		if (MySAP.message[0].type=="createnewjob"){
			//alert(MySAP.message[0].type+":"+MySAP.message[0].recno+":"+MySAP.message[0].sapmessage+":"+MySAP.message[0].message+":"+MySAP.message[0].notifno)
			opMessage("-->Type= "+MySAP.message[0].type);
			opMessage("-->row= "+MySAP.message[0].recno);
			opMessage("-->Message= "+MySAP.message[0].sapmessage);
			opMessage("-->Message= "+MySAP.message[0].message);
			opMessage("-->NotifNo= "+MySAP.message[0].notifno);
			if((MySAP.message[0].message=="Success")&&(MySAP.message[0].sapmessage.indexof("Created")>0))
			{
				sqlstatement+="UPDATE MyNotifications SET notifno = '"+ MySAP.message[0].notifno+"' WHERE id='"+ MySAP.message[0].recno+"';";
			}else{
				sqlstatement+="UPDATE MyNotifications SET notifno = 'SENT"+MySAP.message[0].recno+"' WHERE id='"+ MySAP.message[0].recno+"';";
			}



		}
		//Handle requestLL callback
		if (MySAP.message[0].type=="requestll"){
			//alert(MySAP.message[0].type+":"+MySAP.message[0].recno+":"+MySAP.message[0].sapmessage+":"+MySAP.message[0].message+":"+MySAP.message[0].notifno)
			opMessage("-->Type= "+MySAP.message[0].type);
			opMessage("-->row= "+MySAP.message[0].recno);
			opMessage("-->Message= "+MySAP.message[0].message);
			opMessage("-->NotifNo= "+MySAP.message[0].message_type);
			if(MySAP.message[0].message_type=="E")
			{
				sqlstatement+="UPDATE MyJobDetsDraw SET zurl = '"+ MySAP.message[0].message+"' where id = '"+ MySAP.message[0].recno+"';";
			}else{
				sqlstatement+="UPDATE MyJobDetsDraw SET zurl = 'Waiting File Transfer' where id = '"+ MySAP.message[0].recno+"';";
			}



		}
		//Handle NewJob Create Customer Feedback
		if (MySAP.message[0].type=="createcfeed"){
			//alert(MySAP.message[0].type+":"+MySAP.message[0].recno+":"+MySAP.message[0].sapmessage+":"+MySAP.message[0].message+":"+MySAP.message[0].notifno)
			opMessage("-->Type= "+MySAP.message[0].type);
			opMessage("-->row= "+MySAP.message[0].recno);
			opMessage("-->Message= "+MySAP.message[0].sapmessage);
			opMessage("-->Message= "+MySAP.message[0].message);
			opMessage("-->NotifNo= "+MySAP.message[0].notifno);
			if(MySAP.message[0].message_type=="E")
			{
				sqlstatement+="UPDATE MyFormsResponses SET LastUpdated = '"+ MySAP.message[0].message+"' WHERE id='"+ MySAP.message[0].recno+"';";
			}else{
				sqlstatement+="UPDATE MyFormsResponses SET LastUpdated = 'SAPRECEIVED' WHERE id='"+ MySAP.message[0].recno+"';";
			}



		}
		//Handle NewJob Create PIA
		if (MySAP.message[0].type=="createpia"){
			//alert(MySAP.message[0].type+":"+MySAP.message[0].recno+":"+MySAP.message[0].sapmessage+":"+MySAP.message[0].message+":"+MySAP.message[0].notifno)
			opMessage("-->Type= "+MySAP.message[0].type);
			opMessage("-->row= "+MySAP.message[0].recno);
			opMessage("-->Message= "+MySAP.message[0].sapmessage);
			opMessage("-->Message= "+MySAP.message[0].message);
			opMessage("-->NotifNo= "+MySAP.message[0].notifno);
			if(MySAP.message[0].message_type=="E")
			{
				sqlstatement+="UPDATE MyFormsResponses SET LastUpdated = '"+ MySAP.message[0].message+"' WHERE id='"+ MySAP.message[0].recno+"';";
			}else{
				sqlstatement+="UPDATE MyFormsResponses SET LastUpdated = 'SAPRECEIVED' WHERE id='"+ MySAP.message[0].recno+"';";
			}



		}
		//Handle NewJob Create DG5
		if (MySAP.message[0].type=="createdg5"){
			//alert(MySAP.message[0].type+":"+MySAP.message[0].recno+":"+MySAP.message[0].message+":"+MySAP.message[0].message_type)
			opMessage("-->Type= "+MySAP.message[0].type);
			opMessage("-->row= "+MySAP.message[0].recno);				
			opMessage("-->Message= "+MySAP.message[0].message);
			opMessage("-->NotifNo= "+MySAP.message[0].message_type);
			if(MySAP.message[0].message_type=="E")
			{
				sqlstatement+="UPDATE MyFormsResponses SET LastUpdated = '"+ MySAP.message[0].message+"' WHERE id='"+ MySAP.message[0].recno+"';";
			}else{
				sqlstatement+="UPDATE MyFormsResponses SET LastUpdated = 'SAPRECEIVED' WHERE id='"+ MySAP.message[0].recno+"';";
			}



		}
//		Handle EOD Create Response
		if (MySAP.message[0].type=="createeodnotification"){
			//alert(MySAP.message[0].type+":"+MySAP.message[0].recno+":"+MySAP.message[0].message+":"+MySAP.message[0].notifno)
			opMessage("-->Type= "+MySAP.message[0].type);
			opMessage("-->row= "+MySAP.message[0].recno);
			opMessage("-->Message= "+MySAP.message[0].sapmessage);
			opMessage("-->Message= "+MySAP.message[0].message);
			opMessage("-->NotifNo= "+MySAP.message[0].notifno);
			if(MySAP.message[0].message=="E")
			{
				sqlstatement+="UPDATE MyNotifications SET notifno = '"+ MySAP.message[0].notifno+"' WHERE id='"+ MySAP.message[0].recno+"';";
			}else{
				sqlstatement+="UPDATE MyNotifications SET notifno = 'SENT"+MySAP.message[0].recno+"' WHERE id='"+ MySAP.message[0].recno+"';";	
			}





		}
//		Handle Close Create Response
		if (MySAP.message[0].type=="updatenotification"){
			console.log(MySAP.message[0].type+":"+MySAP.message[0].recno+":"+MySAP.message[0].message+":"+MySAP.message[0].notifno)
			opMessage("-->Type= "+MySAP.message[0].type);
			opMessage("-->row= "+MySAP.message[0].recno);
			opMessage("-->Message= "+MySAP.message[0].sapmessage);
			opMessage("-->Message= "+MySAP.message[0].message);
			opMessage("-->NotifNo= "+MySAP.message[0].notifno);
			sqlstatement+="UPDATE MyJobClose SET state = 'SENT"+MySAP.message[0].recno+"' WHERE id='"+ MySAP.message[0].recno+"';";






		}
//		Handle Notification Create Response
		if (MySAP.message[0].type=="createnotificationxx"){
			//alert(MySAP.message[0].type+":"+MySAP.message[0].recno+":"+MySAP.message[0].message+":"+MySAP.message[0].notifno)
			opMessage("-->Type= "+MySAP.message[0].type);
			opMessage("-->row= "+MySAP.message[0].recno);
			opMessage("-->Message= "+MySAP.message[0].message);
			opMessage("-->NotifNo= "+MySAP.message[0].notifno);


			sqlstatement+="UPDATE MyNewJobs SET state = '"+ MySAP.message[0].recno+"' WHERE id='"+ MySAP.message[0].notifno+"';";



		}
//		Handle Vehicle Defect Response
		if (MySAP.message[0].type=="fileupload"){
//			alert("File Uploaded response");
		}		
//		Handle Vehicle Defect Response
		if (MySAP.message[0].type=="createvehiclemileage"){
			opMessage("VehicleMilege-->Message= "+MySAP.message[0].message+"-->NotifNo= "+MySAP.message[0].notifno+"-->measdoc= "+MySAP.message[0].measdoc);

			if(MySAP.message[0].message=="Success"){
				sqlstatement+="delete from MyVehicleCheck WHERE id='"+MySAP.message[0].recno+"';";
			}

		}	
		if (MySAP.message[0].type=="createvehicledefect"){
			opMessage("-->Message= "+MySAP.message[0].message);
			opMessage("-->NotifNo= "+MySAP.message[0].notifno);
			opMessage("-->measdoc= "+MySAP.message[0].measdoc);
			if(MySAP.message[0].message=="Success"){
				sqlstatement+="delete from MyVehicleCheck WHERE id='"+MySAP.message[0].recno+"';";

			}

		}	
//		Handle Time Confirmation Create Response			
		if (MySAP.message[0].type=="createtconf"){
			console.log(MySAP.message[0].type+":"+MySAP.message[0].message+":"+MySAP.message[0].message_type+":"+MySAP.message[0].confno+":"+MySAP.message[0].recno)
			opMessage("-->Type= "+MySAP.message[0].type);
			opMessage("-->confno= "+MySAP.message[0].confno);
			if(MySAP.message[0].confno!="0000000000"){



				sqlstatement+="UPDATE MyTimeConfs SET confno = '"+MySAP.message[0].confno+"' WHERE id='"+MySAP.message[0].recno+"';";


			}else{
				sqlstatement+="UPDATE MyTimeConfs SET confno = 'SENT"+MySAP.message[0].recno+"' WHERE id='"+MySAP.message[0].recno+"';";
			}

		}
//		Handle MPDoc Create Response			
		if (MySAP.message[0].type=="creatempdoc"){
			console.log(MySAP.message[0].type+":"+MySAP.message[0].message+":"+MySAP.message[0].message_type+":"+MySAP.message[0].mpdocno+":"+MySAP.message[0].recno)
			opMessage("-->Type= "+MySAP.message[0].type);
			opMessage("-->confno= "+MySAP.message[0].mpdocno);
			if(MySAP.message[0].confno!="0000000000"){



				sqlstatement+="UPDATE MyMpointdocs SET state = '"+MySAP.message[0].mpdocno+"' WHERE id='"+MySAP.message[0].recno+"';";


			}else{
				sqlstatement+="UPDATE MyMpointdocs SET state = 'SENT"+MySAP.message[0].recno+"' WHERE id='"+MySAP.message[0].recno+"';";
			}

		}
//		Handle Status Update Response
		if (MySAP.message[0].type=="updatestatus"){
			console.log("-->UpdateStatus"+MySAP.message[0].orderno+":"+MySAP.message[0].opno+":"+MySAP.message[0].message+":"+MySAP.message[0].recno);
			opMessage("-->UpdateStatus");
			opMessage("-->Orderno= "+MySAP.message[0].orderno);
			opMessage("-->Opno= "+MySAP.message[0].opno);
			opMessage("-->Message= "+MySAP.message[0].message);
			if(MySAP.message[0].message=="Operation successfully updated"){


				sqlstatement+="delete from MyStatus WHERE id = '"+MySAP.message[0].recno + "';";

			}else{
				sqlstatement+="UPDATE MyStatus SET state = 'SENT"+MySAP.message[0].recno+"' WHERE id='"+ MySAP.message[0].recno+"';";	
			}

		}	
//		Handle Create Notification Response
		if (MySAP.message[0].type=="createnotification"){
			//alert(MySAP.message[0].type+":"+MySAP.message[0].recno+":"+MySAP.message[0].message+":"+MySAP.message[0].notifno)
			opMessage("-->Create Notification");
			opMessage("-->NotifNo= "+MySAP.message[0].notifno);
			opMessage("-->Message= "+MySAP.message[0].message);
			if(MySAP.message[0].message=="Success"){

				sqlstatement+="UPDATE MyNotifications SET notifno = '"+MySAP.message[0].notifno+"' WHERE id='"+MySAP.message[0].recno+"';";



			}

		}			
		if (MySAP.message[0].type=="updatemessagereadstatus"){
			//alert("mess read-->"+MySAP.message[0].id+":"+MySAP.message[0].message)
			opMessage("-->UpdateMessage Read");
			opMessage("-->ID= "+MySAP.message[0].id);
			opMessage("-->Message= "+MySAP.message[0].message);
			if(MySAP.message[0].message=="Success"){



				sqlstatement+="UPDATE MyMessages SET state = '1' WHERE id='"+MySAP.message[0].id + "';";



			}

		}	
		if (MySAP.message[0].type=="messagesend"){
			//alert("mess send-->"+MySAP.message[0].id+":"+MySAP.message[0].message)
			opMessage("-->UpdateMessage Sent");
			opMessage("-->ID= "+MySAP.message[0].id);
			opMessage("-->Message= "+MySAP.message[0].message);
			if(MySAP.message[0].message=="Success"){



				sqlstatement+="UPDATE MyMessages SET state = 'SENT' WHERE id="+MySAP.message[0].id + ";";



			}

		}
		html5sql.process(sqlstatement,
				function(){
			console.log("Success handling SAPCB"+sqlstatement);
			SetConfigParam('LASTSYNC_UPLOAD', "20120101010101");

		},
		function(error, statement){
			console.log("Error: " + error.message + " when processing " + statement);
			opMessage("Error: " + error.message + " when processing " + statement);
		}        
		);	
	}
}		
function getFlocs(){

	$.getJSON('MyFuncloc.json',function(Funcloc){ 
		var sqlstatement="";

		opMessage("Loading "+Funcloc.funcloc.length+" Functional Locations");
		for(var cntx=0; cntx < Funcloc.funcloc.length ; cntx++)
		{	
			sqlstatement+='INSERT INTO Assets (type , id , shorttext , name , city , street, postcode ) VALUES ('+ 
			'"FL",' + 
			'"'+Funcloc.funcloc[cntx].id +'",'+ 
			'"'+Funcloc.funcloc[cntx].shorttext +'",'+  
			'"'+Funcloc.funcloc[cntx].name +'",'+ 
			'"'+Funcloc.funcloc[cntx].city +'",'+ 
			'"'+Funcloc.funcloc[cntx].street +'",'+ 
			'"'+Funcloc.funcloc[cntx].postcod+'");';
			//Loop and write Tasks to DB

			opMessage("Loading "+Funcloc.funcloc[cntx].classval.length+" Class Vals");
			for(var opscnt=0; opscnt < Funcloc.funcloc[cntx].classval.length ; opscnt++)
			{	

				sqlstatement+='INSERT INTO AssetClassVals (type , id, charact , valuechar , valueto , valueneutral , description) VALUES ('+ 
				'"FL",' + 
				'"'+Funcloc.funcloc[cntx].id +'",'+ 
				'"'+Funcloc.funcloc[cntx].classval[opscnt].charact +'",'+ 
				'"'+Funcloc.funcloc[cntx].classval[opscnt].valuechar +'",'+ 
				'"'+Funcloc.funcloc[cntx].classval[opscnt].valueto +'",'+ 
				'"'+Funcloc.funcloc[cntx].classval[opscnt].valueneutral +'",'+ 
				'"'+Funcloc.funcloc[cntx].classval[opscnt].description+'");';

			}


		}
		html5sql.process(sqlstatement,
				function(){
			//alert("Success - Finished Loading Orders");
		},
		function(error, statement){
			opMessage("Error: " + error.message + " when processing " + statement);
		}        
		);	


	});




}
function refflocsCB(Funcloc){


	var sqlstatement="";

	opMessage("Loading "+Funcloc.funcloc.length+" Reference Functional Locations");
	if(syncTransactionalDetsUpdated){
		localStorage.setItem('LastSyncTransactionalDetails',localStorage.getItem('LastSyncTransactionalDetails')+', Funcloc:'+String(Funcloc.funcloc.length));
	}else{
		localStorage.setItem('LastSyncTransactionalDetails',localStorage.getItem('LastSyncTransactionalDetails')+'Funcloc:'+String(Funcloc.funcloc.length));
	}
	sqlstatement = 	'DELETE FROM funclocs;'



		for(var cntx=0; cntx < Funcloc.funcloc.length ; cntx++)
		{	
			fllevel=((Funcloc.funcloc[cntx].id).match(/-/g) || []).length;
			if(fllevel=="0"){
				parentid="";
			}else{		
				parentid=(Funcloc.funcloc[cntx].id).substring(0,(Funcloc.funcloc[cntx].id).lastIndexOf("-"));
			}
			childcnt=cntx+1;
			if(childcnt<Funcloc.funcloc.length)
			{
				fllevelchild=((Funcloc.funcloc[childcnt].id).match(/-/g) || []).length;
				if(fllevelchild=="0"){
					parentidchild="";
				}else{		
					parentidchild=(Funcloc.funcloc[childcnt].id).substring(0,(Funcloc.funcloc[childcnt].id).lastIndexOf("-"));
				}
				if(parentidchild==Funcloc.funcloc[cntx].id)
				{
					children=1;
				}else{
					children=0;
				}
			}else{
				Children=0;
			}

			sqlstatement+='INSERT INTO FuncLocs (flid , description , swerk , level , parentid , children ) VALUES ('+ 
			'"'+Funcloc.funcloc[cntx].id +'",'+ 
			'"'+Funcloc.funcloc[cntx].shorttext +'",'+  
			'"'+Funcloc.funcloc[cntx].swerk +'",'+ 		
			'"'+fllevel +'",'+  //Works out the level by number of Hyphens
			'"'+parentid+'",' + // Gets the Parent Id as before last hyphen
			'"'+children+'");';



		}

	html5sql.process(sqlstatement,
			function(){
		opMessage("Flocs inserted and now we do the Parent ID bit");

	},

	function(error, statement){
		opMessage("Error: " + error.message + " when processing " + statement);
	}        
	);	








}
function refequipsCB(Equipment){


	var sqlstatement="";

	opMessage("Loading "+Equipment.equipment.length+" Reference Equipment Locations");
	if(syncTransactionalDetsUpdated){
		localStorage.setItem('LastSyncTransactionalDetails',localStorage.getItem('LastSyncTransactionalDetails')+', Equipment:'+String(Equipment.equipment.length));
	}else{
		localStorage.setItem('LastSyncTransactionalDetails',localStorage.getItem('LastSyncTransactionalDetails')+'Equipment:'+String(Equipment.equipment.length));
	}
	sqlstatement = 	'DELETE FROM equipments;'



		for(var cntx=0; cntx < Equipment.equipment.length ; cntx++)
		{	


			sqlstatement+='INSERT INTO Equipments (eqid , description , flid  ) VALUES ('+ 
			'"'+Equipment.equipment[cntx].id.replace(/^0+/, '') +'",'+ 
			'"'+Equipment.equipment[cntx].shorttext +'",'+  
			'"'+Equipment.equipment[cntx].funcloc+'");';	




		}

	html5sql.process(sqlstatement,
			function(){
		opMessage("New Equipment List inserted ");

	},

	function(error, statement){
		opMessage("Error: " + error.message + " when processing " + statement);
	}        
	);	








}
function refgasCB(Survey){


	var sqlstatement="";

	opMessage("Loading "+Survey.QUESTION.length+" Reference Gas Survey Questions");
	for(var cntx=0; cntx < Survey.QUESTION.length ; cntx++)
	{	

		sqlstatement+='INSERT INTO GASSurveyQ (type , qno , qtype , description) VALUES ('+ 
		'"Q",'+ 
		'"'+Survey.QUESTION[cntx].KEY +'",'+  
		'"'+Survey.QUESTION[cntx].TYPE +'",'+ 		
		'"'+Survey.QUESTION[cntx].LABEL +'");';

		if (Survey.QUESTION[cntx].TYPE=="LB")
		{
			opMessage("Loading "+Survey.QUESTION[cntx].ANSWER.length+" Answers");
			for(var opscnt=0; opscnt < Survey.QUESTION[cntx].ANSWER.length ; opscnt++)
			{	

				sqlstatement+='INSERT INTO GASSurveyA (type , qno, qkey , qvalue) VALUES ('+ 
				'"Q",'+ 
				'"'+ Survey.QUESTION[cntx].KEY+'",'+ 
				'"'+ Survey.QUESTION[cntx].ANSWER[opscnt].KEY+'",'+  
				'"'+ Survey.QUESTION[cntx].ANSWER[opscnt].VALUE+'");' ;
			}
		}//End of LB Build
		else
		{
			sqlstatement+='INSERT INTO GASSurveyA (type , qno, qkey , qvalue) VALUES ('+ 
			'"Q",'+ 
			'"'+ Survey.QUESTION[cntx].KEY+'",'+ 
			'" ",'+  
			'" ");' ;	
		}
		if (Survey.QUESTION[cntx].TYPE=="LDB")
		{
			//alert (Survey.QUESTION[cntx].LABEL+" - "+Survey.QUESTION[cntx].ANSWER.length)

			opMessage("Loading "+Survey.QUESTION[cntx].ANSWER.length+" Answers");
			for(var opscnt=0; opscnt < Survey.QUESTION[cntx].ANSWER.length ; opscnt++)
			{	
				if (Survey.QUESTION[cntx].LABEL=="Make") 
				{
					sqlstatement+='INSERT INTO GASSurveyMake (make , description) VALUES ('+ 
					'"'+ Survey.QUESTION[cntx].ANSWER[opscnt].KEY+'",'+  
					'"'+ Survey.QUESTION[cntx].ANSWER[opscnt].VALUE+'");' ;
				}
				if (Survey.QUESTION[cntx].LABEL=="Model") 
				{
					var res = Survey.QUESTION[cntx].ANSWER[opscnt].VALUE.split("-");
					sqlstatement+='INSERT INTO GASSurveyModel (make , model, description) VALUES ('+ 
					'"'+res[0]+'",'+  
					'"'+ Survey.QUESTION[cntx].ANSWER[opscnt].KEY+'",'+ 
					'"'+res[1]+'");' ;
				}
				if (Survey.QUESTION[cntx].LABEL=="Model") {
					if (opscnt>600) {
						//alert (Survey.QUESTION[cntx].ANSWER[opscnt].VALUE)
						opscnt = 10000;
					}
				} 
			}
		}//End of LDB Build
	}
	//alert(sqlstatement)
	html5sql.process(sqlstatement,
			function(){
		opMessage("Flocs inserted and now we do the Parent ID bit");
		//alert("good")
	},

	function(error, statement){
		opMessage("Error: " + error.message + " when processing " + statement);
		//alert("bad")
	}        
	);	 

}
function refgashdrCB(Survey){


	var sqlstatement="";

	opMessage("Loading "+Survey.QUESTION.length+" Reference Gas Survey Header Questions");
	for(var cntx=0; cntx < Survey.QUESTION.length ; cntx++)
	{

		sqlstatement+='INSERT INTO GASSurveyQ (type , qno , qtype , description) VALUES ('+ 
		'"H",'+ 
		'"'+Survey.QUESTION[cntx].KEY +'",'+  
		'"'+Survey.QUESTION[cntx].TYPE +'",'+ 		
		'"'+Survey.QUESTION[cntx].LABEL +'");';

		if (Survey.QUESTION[cntx].TYPE=="LB")
		{
			opMessage("Loading "+Survey.QUESTION[cntx].ANSWER.length+" Answers");
			for(var opscnt=0; opscnt < Survey.QUESTION[cntx].ANSWER.length ; opscnt++)
			{	

				sqlstatement+='INSERT INTO GASSurveyA (type , qno, qkey , qvalue) VALUES ('+ 
				'"H",'+ 
				'"'+ Survey.QUESTION[cntx].KEY+'",'+ 
				'"'+ Survey.QUESTION[cntx].ANSWER[opscnt].KEY+'",'+  
				'"'+ Survey.QUESTION[cntx].ANSWER[opscnt].VALUE+'");' ;
			}
		}//End of LB Build
		else
		{
			sqlstatement+='INSERT INTO GASSurveyA (type , qno, qkey , qvalue) VALUES ('+ 
			'"H",'+ 
			'"'+ Survey.QUESTION[cntx].KEY+'",'+ 
			'" ",'+  
			'" ");' 	;
		}
	}
//	alert(sqlstatement)
	html5sql.process(sqlstatement,
			function(){
		opMessage("Flocs inserted and now we do the Parent ID bit");

	},

	function(error, statement){
		opMessage("Error: " + error.message + " when processing " + statement);
	}        
	);	 








}


function getEquips(){	

	$.getJSON('MyEquipment.json',function(Equipment){ 
		var sqlstatement="";

		opMessage("Loading "+Equipment.equipment.length+" Equipment");
		for(var cntx=0; cntx < Equipment.equipment.length ; cntx++)
		{	
			sqlstatement+='INSERT INTO Assets (type , id , shorttext , name , city , street, postcode ) VALUES ('+ 
			'"EQ",'+ 
			'"'+ Equipment.equipment[cntx].id +'",'+ 
			'"'+ Equipment.equipment[cntx].shorttext +'",'+ 
			'"'+ Equipment.equipment[cntx].name +'",'+ 
			'"'+ Equipment.equipment[cntx].city +'",'+ 
			'"'+ Equipment.equipment[cntx].street +'",'+ 
			'"'+ Equipment.equipment[cntx].postcode+'");' ;
			//Loop and write Tasks to DB

			opMessage("Loading "+Equipment.equipment[cntx].classval.length+" Class Vals");
			for(var opscnt=0; opscnt < Equipment.equipment[cntx].classval.length ; opscnt++)
			{	

				sqlstatement+='INSERT INTO AssetClassVals (type , id, charact , valuechar , valueto , valueneutral , description) VALUES ('+ 
				'"EQ",'+ 
				'"'+ Equipment.equipment[cntx].id+'",'+ 
				'"'+ Equipment.equipment[cntx].classval[opscnt].charact+'",'+  
				'"'+ Equipment.equipment[cntx].classval[opscnt].valuechar+'",'+ 
				'"'+ Equipment.equipment[cntx].classval[opscnt].valueto+'",'+ 
				'"'+ Equipment.equipment[cntx].classval[opscnt].valueneutral+'",'+  
				'"'+ Equipment.equipment[cntx].classval[opscnt].description+'");' ;

			}


		}
		html5sql.process(sqlstatement,
				function(){
			//alert("Success - Finished Loading Orders");
		},
		function(error, statement){
			opMessage("Error: " + error.message + " when processing " + statement);
		}        
		);


	});
}
function formCB(data){
	var sqlstatement="";		

	if(data.forms.length>0){
		if(syncReferenceDetsUpdated){
			localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', Forms:'+String(data.forms.length));
		}else{
			localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'Forms:'+String(data.forms.length));
		}

		opMessage("Deleting Existing forms");
		sqlstatement+='DELETE FROM MyForms;';
		opMessage("Loading"+data.forms.length+" Existing forms");
		for(var cntx=0; cntx < data.forms.length ; cntx++)
		{	

			sqlstatement+='INSERT INTO MyForms (name , type , lastupdated , url , description) VALUES ('+ 
			'"'+data.forms[cntx].name +'",'+  
			'"'+data.forms[cntx].type +'",'+  
			'"'+data.forms[cntx].lastupdated +'",'+  
			'"'+data.forms[cntx].url+'",'+  
			'"'+data.forms[cntx].description+'");';			
		}	

		html5sql.process(sqlstatement,
				function(){

		},
		function(error, statement){
			opMessage("Error: " + error.message + " when processing " + statement);
		}        
		);


	}
}
function propsCB(data){
	var sqlstatement="";		

	if(data.props.length>0){
		if(syncReferenceDetsUpdated){
			localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', Props:'+String(data.props.length));
		}else{
			localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'Props:'+String(data.props.length));
		}

		opMessage("Deleting Existing Properties");
		sqlstatement+='DELETE FROM Properties;';
		opMessage("Loading"+data.props.length+" Existing Props");
		for(var cntx=0; cntx < data.props.length ; cntx++)
		{	
			en=data.props[cntx].SearchTerm.split("-")
			y=convertToLatLon(data.props[cntx].SearchTerm)
			sqlstatement+='INSERT INTO Properties (funcloc , description , street , district , city, postcode , easting , northing , lat , lon) VALUES ('+ 
			'"'+data.props[cntx].FuncLoc +'",'+  
			'"'+data.props[cntx].Description +'",'+  
			'"'+data.props[cntx].Street +'",'+  
			'"'+data.props[cntx].District+'",'+  
			'"'+data.props[cntx].City +'",'+  
			'"'+data.props[cntx].PostCode +'",'+  
			'"'+en[0] +'",'+  
			'"'+en[1] +'",'+  
			'"'+y[0]+'",'+  
			'"'+y[1]+'");';			
		}	

		html5sql.process(sqlstatement,
				function(){

		},
		function(error, statement){
			opMessage("Error: " + error.message + " when processing " + statement);
		}        
		);


	}
}
function assetdetailsCB(data){
	var sqlstatement="";		
	alert("about to do Asset Details")
	if(data.allAsset.length>0){
		if(syncReferenceDetsUpdated){
			localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', AssetDetailsAll:'+String(data.props.length));
		}else{
			localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'AssetDetailsAll:'+String(data.props.length));
		}

		opMessage("Deleting Existing AssetDetailsAll");
		sqlstatement+='DELETE FROM AssetDetailsAll;';
		opMessage("Loading"+data.allAsset.length+" Existing Asset Details All");
		for(var cntx=0; cntx < data.allAsset.length ; cntx++)
		{
			adets=data.allAsset[cntx].adata.split("|");
			en=data.props[cntx].SearchTerm.split("-")
			y=convertToLatLon(data.props[cntx].SearchTerm)
			sqlstatement+='INSERT INTO AssetDetailsAll (floc , planplant , maintplant , site , flocdesc, eq , eqdesc , plgrpdesc , asstype , assdesc,manufacturer,partno ,serialno ,eqtype ,eqtypedesc ) VALUES ('+ 
			'"'+adets[0] +'",'+  
			'"'+adets[1] +'",'+  
			'"'+adets[2] +'",'+  
			'"'+adets[3]+'",'+  
			'"'+adets[4] +'",'+  
			'"'+adets[5] +'",'+  
			'"'+adets[6] +'",'+  
			'"'+adets[7] +'",'+  
			'"'+adets[8]+'",'+  
			'"'+adets[9] +'",'+  
			'"'+adets[10] +'",'+  
			'"'+adets[11] +'",'+  
			'"'+adets[12]+'",'+  
			'"'+adets[13]+'",'+  
			'"'+adets[14]+'");';			
		}	

		html5sql.process(sqlstatement,
				function(){
		},
		function(error, statement){
			opMessage("Error: " + error.message + " when processing " + statement);
		}        
		);


	}
}
function assetPlantsCB(data){
	var sqlstatement="";		

	if(data.allAssetPlants.length>0){
		if(syncReferenceDetsUpdated){
			localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', UserAssetPlants:'+String(data.allAssetPlants.length));
		}else{
			localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'UserAssetPlants:'+String(data.allAssetPlants.length));
		}

		opMessage("Loading Users Mintenance Plants");
		sqlstatement="UPDATE MyRefUsers SET maintplant = '"+data.allAssetPlants[0].MPLANTS+"' WHERE userid = '"+localStorage.getItem('MobileUser')+"';";

		html5sql.process(sqlstatement,
				function(){
			getAllAssets(data.allAssetPlants[0].PPLANT,data.allAssetPlants[0].MPLANTS)
		},
		function(error, statement){
			opMessage("Error: " + error.message + " when processing " + statement);
		}        
		);


	}
}

function assetsByPlantsCB(data){
	var sqlstatement="";
	assetStatements=[];

	if(data.assetsByPlant.length>0){
		//alert("Loading Assets for Plant "+data.assetsByPlant[0].planttype+" "+data.assetsByPlant[0].plant +" RECS="+data.assetsByPlant.length);
		if(syncReferenceDetsUpdated){
			localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', PlantAssets:'+String(data.assetsByPlant.length));
		}else{
			localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'PlantAssets:'+String(data.assetsByPlant.length));
		}
		if(data.assetsByPlant[0].planttype=="ZIWERK"){
			sqlstatement= " Delete from AssetDetailsAll where planplant = '"+data.assetsByPlant[0].plant+"';"
		}else{
			sqlstatement= " Delete from AssetDetailsAll where maintplant = '"+data.assetsByPlant[0].plant+"';"
		}

		reccnt=0
		sqlcnt=0;
		console.log("Loading Assets for Plant "+data.assetsByPlant[0].planttype+" "+data.assetsByPlant[0].plant+" Length = "+data.assetsByPlant.length);
		opMessage("Loading Assets for Plant "+data.assetsByPlant[0].planttype+" "+data.assetsByPlant[0].plant);
		for(var cntx=0; cntx < data.assetsByPlant.length; cntx++)
		{
			adets=data.assetsByPlant[cntx].adata.split("|");
			flocdesc=unescape(adets[4])
			flocdesc=flocdesc.replace(/`/g, "");
			flocdesc=flocdesc.replace(/'/g, "");
			flocdesc=flocdesc.replace(/"/g, "");
			flocdesc=flocdesc.replace(/\\/g, "-");
			flocdesc=flocdesc.replace(/\//g, "-");
			flocdesc=flocdesc.replace(/&/g, "");
			flocdesc=flocdesc.replace(/#/g, "");
			flocdesc=flocdesc.replace(/\)/g, "");	
			flocdesc=flocdesc.replace(/\(/g, "");	
			eqdesc=unescape(adets[6])
			eqdesc=eqdesc.replace(/`/g, "");
			eqdesc=eqdesc.replace(/'/g, "");
			eqdesc=eqdesc.replace(/"/g, "");
			eqdesc=eqdesc.replace(/\\/g, "-");
			eqdesc=eqdesc.replace(/\//g, "-");
			eqdesc=eqdesc.replace(/&/g, "");
			eqdesc=eqdesc.replace(/#/g, "");
			eqdesc=eqdesc.replace(/\)/g, "");	
			eqdesc=eqdesc.replace(/\(/g, "");
			plgrpdesc=adets[8]
			plgrpdesc=plgrpdesc.replace(/`/g, "");
			plgrpdesc=plgrpdesc.replace(/'/g, "");
			plgrpdesc=plgrpdesc.replace(/"/g, "");
			plgrpdesc=plgrpdesc.replace(/\\/g, "-");
			plgrpdesc=plgrpdesc.replace(/\//g, "-");
			plgrpdesc=plgrpdesc.replace(/&/g, "");
			plgrpdesc=plgrpdesc.replace(/#/g, "");
			plgrpdesc=plgrpdesc.replace(/\)/g, "");	
			plgrpdesc=plgrpdesc.replace(/\(/g, "");
			assdesc=unescape(adets[9])
			assdesc=assdesc.replace(/`/g, "");
			assdesc=assdesc.replace(/'/g, "");
			assdesc=assdesc.replace(/"/g, "");
			assdesc=assdesc.replace(/\\/g, "-");
			assdesc=assdesc.replace(/\//g, "-");
			assdesc=assdesc.replace(/&/g, "");
			assdesc=assdesc.replace(/#/g, "");
			assdesc=assdesc.replace(/\)/g, "");	
			assdesc=assdesc.replace(/\(/g, "");
			manufacturer=adets[10]
			manufacturer=manufacturer.replace(/`/g, "");
			manufacturer=manufacturer.replace(/`/g, "");
			manufacturer=manufacturer.replace(/'/g, "");
			manufacturer=manufacturer.replace(/"/g, "");
			manufacturer=manufacturer.replace(/\\/g, "-");
			manufacturer=manufacturer.replace(/\//g, "-");
			manufacturer=manufacturer.replace(/&/g, "");
			manufacturer=manufacturer.replace(/#/g, "");
			manufacturer=manufacturer.replace(/\)/g, "");	
			manufacturer=manufacturer.replace(/\(/g, "");
			partno=unescape(adets[11])
			partno=partno.replace(/`/g, "");
			partno=partno.replace(/'/g, "");
			partno=partno.replace(/"/g, "");
			partno=partno.replace(/\\/g, "-");
			partno=partno.replace(/\//g, "-");
			partno=partno.replace(/&/g, "");
			partno=		partno.replace(/#/g, "");
			partno=partno.replace(/\)/g, "");	
			partno=partno.replace(/\(/g, "");
			serialno=unescape(adets[12])
			serialno=serialno.replace(/`/g, "");
			serialno=serialno.replace(/'/g, "");
			serialno=serialno.replace(/"/g, "");
			serialno=serialno.replace(/\\/g, "-");
			serialno=serialno.replace(/\//g, "-");
			serialno=serialno.replace("\/", "-");

			serialno=serialno.replace(/&/g, "");
			serialno=serialno.replace(/#/g, "");
			serialno=serialno.replace(/\)/g, "");	
			serialno=serialno.replace(/\(/g, "");
			eqtypedesc=unescape(adets[14])
			eqtypedesc=eqtypedesc.replace(/`/g, "");
			eqtypedesc=eqtypedesc.replace(/'/g, "");
			eqtypedesc=eqtypedesc.replace(/"/g, "");
			eqtypedesc=eqtypedesc.replace(/\\/g, "-");
			eqtypedesc=eqtypedesc.replace(/\//g, "-");
			eqtypedesc=eqtypedesc.replace(/&/g, "");
			eqtypedesc=eqtypedesc.replace(/#/g, "");
			eqtypedesc=eqtypedesc.replace(/\)/g, "");	
			eqtypedesc=eqtypedesc.replace(/\(/g, "");
			sqlstatement+=' INSERT INTO AssetDetailsAll (floc , planplant , maintplant , site , flocdesc, eq , eqdesc , plgrpdesc , asstype , assdesc,manufacturer,partno ,serialno ,eqtype ,eqtypedesc ) VALUES ('+ 
			'"'+adets[0] +'",'+  
			'"'+adets[1] +'",'+  
			'"'+adets[2] +'",'+  
			'"'+adets[3]+'",'+  
			'"'+flocdesc +'",'+  
			'"'+adets[5] +'",'+  
			'"'+eqdesc +'",'+  
			'"'+adets[7] +'",'+  
			'"'+plgrpdesc+'",'+  
			'"'+assdesc +'",'+  
			'"'+manufacturer +'",'+  
			'"'+escape(partno) +'",'+  
			'"'+escape(serialno)+'",'+  
			'"'+adets[13]+'",'+  
			'"'+eqtypedesc+'");';	
			reccnt++;
			if (reccnt>500){


				assetStatements.push(sqlstatement)
				reccnt=0;
				sqlstatement="";

			}
		}
		assetStatements.push(sqlstatement)

		insertAssetsByPlant()

	}		

}


function insertAssetsByPlant(){
	var sql=""
		console.log("Inserting "+assetStatements.length)
		if(assetStatements.length>0){

			sql=assetStatements.splice(0,1)+" "
			//if((assetStatements.length==2790)||(assetStatements.length==9)||(assetStatements.length==158)){

			//	console.log("xxxxz"+sql)
			//insertAssetsByPlant()
			//	}else{
			try{
				html5sql.process(sql,
						function(){

					insertAssetsByPlant()

				},
				function(error, statement){
					opMessage("Error: " + error.message + " when processing " );

					console.log("Error: " + error.message+ statement);

					insertAssetsByPlant()
				}        
				);
			}catch (err){

			}
			//}

		}else{
			console.log("Inserting Finished")
			console.log(allAssetCalls.length)
			if(allAssetCalls.length>0){
				mplnt=allAssetCalls.splice(0,1)+" "
				x=mplnt.split("|")		
				requestSAPData(x[0],x[1])
			}
		}

}
function userCB(MyUsers){
	var sqlstatement="";		
	var MyEmployeeID=""
		if(MyUsers.user.length>0){
			if(syncReferenceDetsUpdated){
				localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', Users:'+String(MyUsers.user.length));
			}else{
				localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'Users:'+String(MyUsers.user.length));
			}

			opMessage("Deleting Existing Users");
			sqlstatement+='DELETE FROM MyRefUsers;';
			opMessage("Loading"+MyUsers.user.length+" Existing Users");
			for(var cntx=0; cntx < MyUsers.user.length ; cntx++)
			{	
				if(MyUsers.user[cntx].userid==localStorage.getItem('MobileUser')){
					localStorage.setItem('EmployeeID',MyUsers.user[cntx].employeeno)
					localStorage.setItem('EmployeeWorkCenter',MyUsers.user[cntx].workcenter)
					localStorage.setItem('EmployeeScenario',MyUsers.user[cntx].scenario)
					localStorage.setItem('MobileFullname', MyUsers.user[cntx].firstname +" "+ MyUsers.user[cntx].lastname)
				}
				sqlstatement+='INSERT INTO MyRefUsers (userid , scenario , plant , workcenter , plannergroup , plannergroupplant, storagegroup, storageplant, partner, partnerrole, funclocint, funcloc, compcode, employeeno, equipment, firstname, lastname, telno ) VALUES ('+ 
				'"'+MyUsers.user[cntx].userid +'",'+  
				'"'+MyUsers.user[cntx].scenario +'",'+   
				'"'+MyUsers.user[cntx].plant +'",'+   
				'"'+MyUsers.user[cntx].workcenter +'",'+  
				'"'+MyUsers.user[cntx].plannergroup +'",'+  
				'"'+MyUsers.user[cntx].plannergroupplant +'",'+   
				'"'+MyUsers.user[cntx].storagegroup +'",'+  
				'"'+MyUsers.user[cntx].storageplant +'",'+   
				'"'+MyUsers.user[cntx].partner +'",'+  
				'"'+MyUsers.user[cntx].partnerrole +'",'+  
				'"'+MyUsers.user[cntx].funclocint +'",'+  
				'"'+MyUsers.user[cntx].funcloc +'",'+  
				'"'+MyUsers.user[cntx].compcode +'",'+  
				'"'+MyUsers.user[cntx].employeeno +'",'+  
				'"'+MyUsers.user[cntx].equipment +'",'+  
				'"'+MyUsers.user[cntx].firstname +'",'+  
				'"'+MyUsers.user[cntx].lastname+'",'+  
				'"'+MyUsers.user[cntx].telno+'");';			
			}	

			html5sql.process(sqlstatement,
					function(){
				sqlstatement="UPDATE MyUserDets SET employeeid = '"+localStorage.getItem('EmployeeID')+"', fullname='"+localStorage.getItem('MobileFullname')+"', workcenter='"+localStorage.getItem('EmployeeWorkCenter')+"', scenario='"+localStorage.getItem('EmployeeScenario')+"' WHERE mobileuser = '"+localStorage.getItem('MobileUser')+"';";

				html5sql.process(sqlstatement,
						function(){
				},
				function(error, statement){
					opMessage("Error: " + error.message + " when updateing EmployeeID " + statement);
				}        
				);
			},
			function(error, statement){
				opMessage("Error: " + error.message + " when processing " + statement);
			}        
			);


		}
}
function vehicleCB(MyVehicles){
	var sqlstatement="";	

	var first=0;
	if(MyVehicles.vehicle.length>0){

		if(syncReferenceDetsUpdated){
			localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', Vehicles:'+String(MyVehicles.vehicle.length));
		}else{
			localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'Vehicles:'+String(MyVehicles.vehicle.length));
		}
		opMessage("Deleting Existing Vehicles");
		sqlstatement+='DELETE FROM MyVehicles;';
		opMessage("Loading"+MyVehicles.vehicle.length+" Vehicles");
		for(var cntx=0; cntx < MyVehicles.vehicle.length ; cntx++)
		{	
			if(MyVehicles.vehicle[cntx].level==1){
				if(first==0)
				{
					first=1;
				}else{
					sqlstatement+='");';	
				}
				sqlstatement+='INSERT INTO MyVehicles (id , reg , partner, description , mpoints ) VALUES ( '+
				'"'+MyVehicles.vehicle[cntx].equipment +'",'+ 
				'"'+MyVehicles.vehicle[cntx].vehicle +'",'+ 
				'"'+MyVehicles.vehicle[cntx].partner +'",'+ 
				'"'+MyVehicles.vehicle[cntx].description+'","'
			}else{

				sqlstatement+=MyVehicles.vehicle[cntx].mpoint+':';	
			}



		}	
		sqlstatement+='");';
		html5sql.process(sqlstatement,
				function(){
			//alert("Success - Finished Loading Orders");
		},
		function(error, statement){
			opMessage("Error: " + error.message + " when processing " + statement);
		}        
		);


	}
}
function vehicleDefaultCB(MyVehicles){
	var sqlstatement="";	
	//alert("def"+MyVehicles.vehicle.length)
	if(MyVehicles.vehicle.length>0){

		if(syncReferenceDetsUpdated){
			localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', Vehicles:'+String(MyVehicles.vehicle.length));
		}else{
			localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'Vehicles:'+String(MyVehicles.vehicle.length));
		}
		opMessage("Deleting Existing VehiclesDefault");
		sqlstatement+='DELETE FROM MyVehiclesDefault;';
		opMessage("Loading"+MyVehicles.vehicle.length+" Vehicles");
		for(var cntx=0; cntx < MyVehicles.vehicle.length ; cntx++)
		{	
			//alert(cntx)
			if(MyVehicles.vehicle[cntx].level=="2"){
				//alert("lev2"+MyVehicles.vehicle[cntx].mpointdesc)
				sqlstatement+='INSERT INTO MyVehiclesDefault (equipment , reg , partner, level, sequence, description , mpoint, mpointdesc, mpointlongtext  ) VALUES ( '+
				'"'+MyVehicles.vehicle[cntx].equipment +'",'+ 
				'"'+MyVehicles.vehicle[cntx].vehicle +'",'+ 
				'"'+MyVehicles.vehicle[cntx].partner +'",'+ 
				'"'+MyVehicles.vehicle[cntx].level +'",'+ 
				'"'+MyVehicles.vehicle[cntx].sequence +'",'+ 
				'"'+MyVehicles.vehicle[cntx].description+'",'+ 
				'"'+MyVehicles.vehicle[cntx].mpoint+'",'+
				'"'+escape(MyVehicles.vehicle[cntx].mpointdesc)+'",'+
				'"'+escape(MyVehicles.vehicle[cntx].mpointLongtext)+'");';
			}


		}
		//alert("about to sql"+sqlstatement)
		html5sql.process(sqlstatement,
				function(){
			//alert("Success - Finished Loading Orders");
		},
		function(error, statement){
			//alert("Error: " + error.message + " when processing " + statement);
			opMessage("Error: " + error.message + " when processing " + statement);
		}        
		);


	}
}
function messageCB(MyMessages){
	var sqlstatement="";


	if(MyMessages.messages.length>0){
		if(syncTransactionalDetsUpdated){
			localStorage.setItem('LastSyncTransactionalDetails',localStorage.getItem('LastSyncTransactionalDetails')+', Messages:'+String(MyMessages.messages.length));
		}else{
			localStorage.setItem('LastSyncTransactionalDetails',localStorage.getItem('LastSyncTransactionalDetails')+'Messages:'+String(MyMessages.messages.length));
		}

		opMessage("Deleting Existing Messages");
		sqlstatement+='DELETE FROM MyMessages where msgfromid <> "SENTMSG";';
		opMessage("Loading"+MyMessages.messages.length+" Messages");
		//alert("Loading"+MyMessages.messages.length+" Messages");
		for(var cntx=0; cntx < MyMessages.messages.length ; cntx++)
		{	

			sqlstatement+='INSERT INTO MyMessages (msgid, type , date , time , msgfromid, msgfromname, msgtoid, msgtoname, msgsubject, msgtext, expirydate, state ) VALUES ('+ 
			'"'+MyMessages.messages[cntx].id +'",'+  
			'"'+MyMessages.messages[cntx].type +'",'+  
			'"'+MyMessages.messages[cntx].date +'",'+ 
			'"'+MyMessages.messages[cntx].time +'",'+ 
			'"'+MyMessages.messages[cntx].fromid +'",'+ 
			'"'+MyMessages.messages[cntx].fromname +'",'+ 
			'"'+MyMessages.messages[cntx].toid +'",'+ 
			'"'+MyMessages.messages[cntx].toname +'",'+ 
			'"'+MyMessages.messages[cntx].description +'",'+ 
			'"'+MyMessages.messages[cntx].body+'",'+  
			'"'+MyMessages.messages[cntx].expirydate+'",'+
			'"'+MyMessages.messages[cntx].read+'");'  ;

		}

		html5sql.process(sqlstatement,
				function(){
			var x = window.location.href.split("/")
			if(x[x.length-1]=="Home.html"){
				setCounts()
			}
		},
		function(error, statement){
			//opMessage("Error: " + error.message + " when processing " + statement);
			//alert("Error: " + error.message + " when processing " + statement);
		}        
		);


	}
}
function formsCB(data){
	var sqlstatement="";


	if(data.form.length>0){


		opMessage("Deleting Existing Forms");
		sqlstatement+='DELETE FROM MyForms;';
		opMessage("Loading"+data.form.length+" Forms");
		//alert("Loading"+MyMessages.messages.length+" Messages");
		for(var cntx=0; cntx < data.form.length ; cntx++)
		{	

			sqlstatement+='INSERT INTO MyForms ( name, type, lastupdated, description, url ) VALUES ('+ 

			'"'+data.form[cntx].Name +'",'+ 
			'"'+data.form[cntx].Type +'",'+ 
			'"'+data.form[cntx].Created+'",'+  
			'"'+data.form[cntx].Description+'",'+
			'"'+data.form[cntx].URL+'");'  ;

		}

		html5sql.process(sqlstatement,
				function(){

		},
		function(error, statement){

		}        
		);


	}
}
function materialsearchCB(data){


	var n = 0;


	var opTable = sap.ui.getCore().getElementById("MaterialsSearch");
	if(data.material.length>0){

		for(var cntx=0; cntx < data.material.length ; cntx++)
		{	
			opTable.addItem (new sap.m.ColumnListItem({
				key:"RM:"+data.material[cntx].id+":"+data.material[cntx].depot+":"+data.material[cntx].desc+":"+data.material[cntx].available,
				cells : 
					[
					 new sap.m.Text({text: data.material[cntx].id}),
					 new sap.m.Text({text: data.material[cntx].depot}),
					 new sap.m.Text({text: unescape(data.material[cntx].desc)}),
					 new sap.m.Text({text: data.material[cntx].available})   
					 ]
			}));

		}

	}else{
		alert("nothing found")
	}
}
function tsnpjobsCB(jobs){
	var sqlstatement="";		

	if(jobs.NPJOBSRECORD.length>0){


		opMessage("Deleting Existing TS NP Jobs");
		sqlstatement+='DELETE FROM TSNPJobs;';
		opMessage("Loading"+jobs.NPJOBSRECORD.length+" TS NPJobs");
		for(var cntx=0; cntx < jobs.NPJOBSRECORD.length ; cntx++)
		{	

			sqlstatement+='INSERT INTO TSNPJobs (jobno , subtype , description ) VALUES ('+ 
			'"'+jobs.NPJOBSRECORD[cntx].JOBNO +'",'+  
			'"'+jobs.NPJOBSRECORD[cntx].SUBTYPE+'",'+  
			'"'+jobs.NPJOBSRECORD[cntx].DESC+'");' ;



		}		
		html5sql.process(sqlstatement,
				function(){
			//alert("Success - Finished Loading Orders");
		},
		function(error, statement){
			opMessage("Error: " + error.message + " when processing " + statement);
		}        
		);


	}
}
function tsactivitiesCB(activities){
	var sqlstatement="";		

	if(activities.ACTIVITYRECORD.length>0){


		opMessage("Deleting Existing TS Activities");
		sqlstatement+='DELETE FROM TSActivities;';
		opMessage("Loading"+activities.ACTIVITYRECORD.length+" TS Activities");
		for(var cntx=0; cntx < activities.ACTIVITYRECORD.length ; cntx++)
		{	

			sqlstatement+='INSERT INTO TSActivities (code , skill , subskill, description ) VALUES ('+ 
			'"'+activities.ACTIVITYRECORD[cntx].CODE +'",'+  
			'"'+activities.ACTIVITYRECORD[cntx].SKILL+'",'+ 
			'"'+activities.ACTIVITYRECORD[cntx].SUBSKILL+'",'+  					
			'"'+activities.ACTIVITYRECORD[cntx].DESC+'");' ;



		}		
		html5sql.process(sqlstatement,
				function(){
			//alert("Success - Finished Loading Orders");
		},
		function(error, statement){
			opMessage("Error: " + error.message + " when processing " + statement);
		}        
		);


	}
}
function existsInArray(array,val){

	retv=false;
	for(var cntx=0; cntx <   array.length ; cntx++){
		if(array[cntx]==val){
			retv=true;
			cntx=array.length;
		}
	}
	return retv
}
function orderobjectsCB(MyObjects){
	var objectsArray=[];
	var sqlstatement="";		

	if(MyObjects.orderobjects.length>0){

		if(syncTransactionalDetsUpdated){
			localStorage.setItem('LastSyncTransactionalDetails',localStorage.getItem('LastSyncTransactionalDetails')+', Order Objects:'+String(MyObjects.orderobjects.length));
		}else{
			localStorage.setItem('LastSyncTransactionalDetails',localStorage.getItem('LastSyncTransactionalDetails')+'Order Objects:'+String(MyObjects.orderobjects.length));
		}
		opMessage("Deleting Existing Assets");
		sqlstatement+='DELETE FROM Assets;';
		sqlstatement+='DELETE FROM AssetClassVals;';
		sqlstatement+='DELETE FROM AssetMeasurementPoints;';
		sqlstatement+='DELETE FROM AssetInstalledEquip;';
		opMessage("Loading "+MyObjects.orderobjects.length+" Assets");
		for(var cntx=0; cntx <   MyObjects.orderobjects.length ; cntx++){
			if(!existsInArray(objectsArray,MyObjects.orderobjects[cntx].objtype+":"+MyObjects.orderobjects[cntx].objid))
			{
				objectsArray.push(MyObjects.orderobjects[cntx].objtype+":"+MyObjects.orderobjects[cntx].objid)
				objtype=MyObjects.orderobjects[cntx].objtype;
				objid=MyObjects.orderobjects[cntx].objid;
				objshorttext=MyObjects.orderobjects[cntx].shorttext; 
				objaddress=MyObjects.orderobjects[cntx].address;
				objswerk=MyObjects.orderobjects[cntx].swerk;

				sqlstatement+='INSERT INTO Assets (type , id , shorttext , address, workcenter ) VALUES ("'+objtype+'","'+  objid+'","'+ objshorttext+'","'+ objaddress+'","'+ objswerk+'");';
				//Loop and write Classvals to DB

				opMessage("Loading "+MyObjects.orderobjects[cntx].classval.length+" Class Vals");

				for(var opscnt=0; opscnt < MyObjects.orderobjects[cntx].classval.length ; opscnt++)
				{	

					sqlstatement+='INSERT INTO AssetClassVals (type , id, charact , valuechar , valueto , valueneutral , description) VALUES ('+ 
					'"'+objtype+'",'+
					'"'+objid+'",'+
					'"'+MyObjects.orderobjects[cntx].classval[opscnt].charact+'",'+
					'"'+MyObjects.orderobjects[cntx].classval[opscnt].valuechar+'",'+
					'"'+MyObjects.orderobjects[cntx].classval[opscnt].valueto+'",'+
					'"'+MyObjects.orderobjects[cntx].classval[opscnt].valueneutralv +'",'+
					'"'+MyObjects.orderobjects[cntx].classval[opscnt].description+'");'

				}
				//Loop and write Measurement Points to DB

				opMessage("Loading "+MyObjects.orderobjects[cntx].measpoint.length+" Mesurement Points");

				for(var opscnt=0; opscnt < MyObjects.orderobjects[cntx].measpoint.length ; opscnt++)
				{	

					sqlstatement+='INSERT INTO AssetMeasurementPoints (type , id, mpoint  , description) VALUES ( '+
					'"'+objtype+'",'+
					'"'+objid+'",'+
					'"'+MyObjects.orderobjects[cntx].measpoint[opscnt].mpoint+'",'+ 
					'"'+MyObjects.orderobjects[cntx].measpoint[opscnt].description+'");'

				}

				//Loop and write Installed Equipment to DB

				opMessage("Loading "+MyObjects.orderobjects[cntx].installedquip.length+" Installed Equipment");

				for(var opscnt=0; opscnt < MyObjects.orderobjects[cntx].installedquip.length ; opscnt++)
				{	

					sqlstatement+='INSERT INTO AssetInstalledEquip (type , id, eqno , description) VALUES ( '+
					'"'+objtype+'",'+
					'"'+objid+'",'+
					'"'+MyObjects.orderobjects[cntx].installedquip[opscnt].eqno+'",'+ 
					'"'+MyObjects.orderobjects[cntx].installedquip[opscnt].type+'");'

				}

			} //End of if in array
		}	//end of the Objects Loop

		html5sql.process(sqlstatement,
				function(){
			//alert("Success - Finished Loading Orders");
		},
		function(error, statement){
			opMessage("Error: " + error.message + " when processing " + statement);

		}        
		);


	}
}

function refdataCB(MyReference){
	var sqlstatement="";

	opMessage("Callback Reference Data triggured");

	if(MyReference.scenario.length>0){
		if(syncReferenceDetsUpdated){
			localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', Scenarios:'+String(MyReference.scenario.length));
		}else{
			localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'Scenarios:'+String(MyReference.scenario.length));
		}
		opMessage("Deleting Existing Reference Data");
		sqlstatement+='DELETE FROM MyRefOrderTypes;';
		sqlstatement+='DELETE FROM MyRefNotifTypes;';
		sqlstatement+='DELETE FROM MyMenuBar;';                // done
		sqlstatement+='DELETE FROM REFPAICODES;';              //done
		sqlstatement+='DELETE FROM REFNOTIFICATIONTYPES;';     // done
		sqlstatement+='DELETE FROM REFVARIANCESRFV;';          //done
		sqlstatement+='DELETE FROM REFACTIVITY;';              //done
		sqlstatement+='DELETE FROM MyRefPriorityTypes;';       //done
		sqlstatement+='DELETE FROM MyRefUserStatusProfiles;';
		html5sql.process(sqlstatement,
				function(){




			for(var cntx=0; cntx < MyReference.scenario.length ; cntx++)
			{
				sqlstatement="";
				opMessage("Loading Scenario "+MyReference.scenario[cntx].scenario + " Reference Data");
				//Loop and write MenuBar to DB

				opMessage("Loading "+MyReference.scenario[cntx].appbar.length+" Menu Bar");
				for(var opscnt=0; opscnt < MyReference.scenario[cntx].appbar.length ; opscnt++)
				{	

					sqlstatement+='INSERT INTO MyMenuBar (scenario, level ,item, position, type ,subitem ,command, item2) VALUES ('+
					'"'+MyReference.scenario[cntx].scenario+'",'+
					'"'+MyReference.scenario[cntx].appbar[opscnt].level+'",'+
					'"'+MyReference.scenario[cntx].appbar[opscnt].item+'",'+
					'"'+MyReference.scenario[cntx].appbar[opscnt].position+'",'+
					'"'+MyReference.scenario[cntx].appbar[opscnt].type+'",'+
					'"'+MyReference.scenario[cntx].appbar[opscnt].subitem+'",'+
					'"'+unescape(MyReference.scenario[cntx].appbar[opscnt].command)+'",'+
					'"'+MyReference.scenario[cntx].appbar[opscnt].item2+'");';
				}
				//Loop and write ordertypes to DB

				opMessage("Loading "+MyReference.scenario[cntx].ordertype.length+" Order Types");
				for(var opscnt=0; opscnt < MyReference.scenario[cntx].ordertype.length ; opscnt++)
				{	

					sqlstatement+='INSERT INTO MyRefOrderTypes (scenario, type , description, statusprofile ,opstatusprofile ,priorityprofile) VALUES ('+
					'"'+MyReference.scenario[cntx].scenario+'",'+
					'"'+MyReference.scenario[cntx].ordertype[opscnt].type+'",'+
					'"'+MyReference.scenario[cntx].ordertype[opscnt].description+'",'+
					'"'+MyReference.scenario[cntx].ordertype[opscnt].statusprofile+'",'+
					'"'+MyReference.scenario[cntx].ordertype[opscnt].opstatusprofile+'",'+
					'"'+MyReference.scenario[cntx].ordertype[opscnt].priorityprofile+'");';
				}
				//Loop and write notiftypes to DB


				opMessage("Loading "+MyReference.scenario[cntx].notiftype.length+" Notif Types");
				for(var opscnt=0; opscnt < MyReference.scenario[cntx].notiftype.length ; opscnt++)
				{	

					sqlstatement+='INSERT INTO MyRefNotifTypes (scenario , type , description , statusprofile,	taskstatusprofile , priority_type ) VALUES  ('+
					'"'+MyReference.scenario[cntx].scenario+'",'+
					'"'+MyReference.scenario[cntx].notiftype[opscnt].type+'",'+
					'"'+MyReference.scenario[cntx].notiftype[opscnt].description+'",'+
					'"'+MyReference.scenario[cntx].notiftype[opscnt].statusprofile+'",'+
					'"'+MyReference.scenario[cntx].notiftype[opscnt].taskstatusprofile+'",'+
					'"'+MyReference.scenario[cntx].notiftype[opscnt].priority_type+'");';
				}

//				Loop and write paicodes to DB


				opMessage("Loading "+MyReference.scenario[cntx].pai_codes.length+" PAI Codes");
				for(var opscnt=0; opscnt < MyReference.scenario[cntx].pai_codes.length ; opscnt++)
				{	
					y=unescape(MyReference.scenario[cntx].pai_codes[opscnt].kurztext_code)
					x=y.replace(/'/g, "");;
					x=x.replace(/"/g, "");;
					x=x.replace("\/", " ");;
					x=x.replace(/&/g, "");;	
					sqlstatement+='INSERT INTO REFPAICODES (scenario , userid , level , stsma,	plant, work_cntr , catalogue , codegrp , kurztext_group,	code , kurztext_code) VALUES  ('+
					'"'+MyReference.scenario[cntx].scenario+'",'+
					'"'+MyReference.scenario[cntx].pai_codes[opscnt].userid+'",'+
					'"'+MyReference.scenario[cntx].pai_codes[opscnt].level+'",'+
					'"'+MyReference.scenario[cntx].pai_codes[opscnt].stsma+'",'+
					'"'+MyReference.scenario[cntx].pai_codes[opscnt].plant+'",'+
					'"'+MyReference.scenario[cntx].pai_codes[opscnt].work_cntr+'",'+
					'"'+MyReference.scenario[cntx].pai_codes[opscnt].catalogue+'",'+
					'"'+MyReference.scenario[cntx].pai_codes[opscnt].codegrp+'",'+
					'"'+MyReference.scenario[cntx].pai_codes[opscnt].kurztext_group+'",'+
					'"'+MyReference.scenario[cntx].pai_codes[opscnt].code+'",'+
					'"'+x+'");';
				}
//				Loop and write Notification Types to DB


				opMessage("Loading "+MyReference.scenario[cntx].notification_types.length+" notification Types");
				for(var opscnt=0; opscnt < MyReference.scenario[cntx].notification_types.length ; opscnt++)
				{	

					sqlstatement+='INSERT INTO REFNOTIFICATIONTYPES (scenario , userid , level_number , notiftype,	notifdesc , notifprofile , priotype , priority,	prioritydesc ) VALUES  ('+
					'"'+MyReference.scenario[cntx].scenario+'",'+
					'"'+MyReference.scenario[cntx].notification_types[opscnt].userid+'",'+
					'"'+MyReference.scenario[cntx].notification_types[opscnt].level_number+'",'+
					'"'+MyReference.scenario[cntx].notification_types[opscnt].notiftype+'",'+
					'"'+MyReference.scenario[cntx].notification_types[opscnt].notifdesc+'",'+
					'"'+MyReference.scenario[cntx].notification_types[opscnt].notifprofile+'",'+
					'"'+MyReference.scenario[cntx].notification_types[opscnt].priotype+'",'+
					'"'+MyReference.scenario[cntx].notification_types[opscnt].priority+'",'+
					'"'+unescape(MyReference.scenario[cntx].notification_types[opscnt].prioritydesc)+'");';
				}	
//				Loop and write VariancesRFV to DB


				opMessage("Loading "+MyReference.scenario[cntx].variancesrfv.length+" VariancesRFV");
				for(var opscnt=0; opscnt < MyReference.scenario[cntx].variancesrfv.length ; opscnt++)
				{	

					sqlstatement+='INSERT INTO REFVARIANCESRFV (scenario , userid , plant , work_cntr,	job_activity , dev_reason , dev_reas_txt , mandate ) VALUES  ('+
					'"'+MyReference.scenario[cntx].scenario+'",'+
					'"'+MyReference.scenario[cntx].variancesrfv[opscnt].userid+'",'+
					'"'+MyReference.scenario[cntx].variancesrfv[opscnt].plant+'",'+
					'"'+MyReference.scenario[cntx].variancesrfv[opscnt].work_cntr+'",'+
					'"'+MyReference.scenario[cntx].variancesrfv[opscnt].job_activity+'",'+
					'"'+MyReference.scenario[cntx].variancesrfv[opscnt].dev_reason+'",'+
					'"'+unescape(MyReference.scenario[cntx].variancesrfv[opscnt].dev_reas_txt)+'",'+
					'"'+MyReference.scenario[cntx].variancesrfv[opscnt].mandate+'");';
				}
//				Loop and write Activity to DB


				opMessage("Loading "+MyReference.scenario[cntx].activity.length+" Activity");
				for(var opscnt=0; opscnt < MyReference.scenario[cntx].activity.length ; opscnt++)
				{	
					y=MyReference.scenario[cntx].activity[opscnt].activity_desc
					x=y.replace(/'/g, "");;
					x=x.replace("\/", "");;
					x=x.replace(/&/g, "");;	
					sqlstatement+='INSERT INTO REFACTIVITY (scenario , work_center , activity , activity_desc,	action , deflt  ) VALUES  ('+
					'"'+MyReference.scenario[cntx].scenario+'",'+
					'"'+MyReference.scenario[cntx].activity[opscnt].work_center+'",'+
					'"'+MyReference.scenario[cntx].activity[opscnt].activity+'",'+
					'"'+x+'",'+
					'"'+MyReference.scenario[cntx].activity[opscnt].action+'",'+
					'"'+MyReference.scenario[cntx].activity[opscnt].deflt+'");';
				}						
				//Loop and write prioritytypes to DB

				opMessage("Loading "+MyReference.scenario[cntx].prioritytype.length+" Priority Types");
				for(var opscnt=0; opscnt < MyReference.scenario[cntx].prioritytype.length ; opscnt++)
				{	

					sqlstatement+='INSERT INTO MyRefPriorityTypes (scenario, type , priority, description ) VALUES  ('+
					'"'+MyReference.scenario[cntx].scenario+'",'+
					'"'+MyReference.scenario[cntx].prioritytype[opscnt].type+'",'+
					'"'+MyReference.scenario[cntx].prioritytype[opscnt].priority+'",'+
					'"'+MyReference.scenario[cntx].prioritytype[opscnt].description+'");';

				}
				//Loop and write prioritytypes to DB
				opMessage("Loading "+MyReference.scenario[cntx].userstatus.length+" Status Profiles");
				for(var opscnt=0; opscnt < MyReference.scenario[cntx].userstatus.length ; opscnt++)
				{	
					y=unescape(MyReference.scenario[cntx].userstatus[opscnt].statusdesc)
					x=y.replace(/'/g, "");;
					x=x.replace("\/", "");;
					x=x.replace(/&/g, "");;		
					sqlstatement+='INSERT INTO MyRefUserStatusProfiles (scenario, type , status, statuscode, statusdesc ) VALUES  ('+
					'"'+MyReference.scenario[cntx].scenario+'",'+
					'"'+MyReference.scenario[cntx].userstatus[opscnt].type+'",'+
					'"'+MyReference.scenario[cntx].userstatus[opscnt].status+'",'+
					'"'+MyReference.scenario[cntx].userstatus[opscnt].statuscode+'",'+
					'"'+x +'");';

				}			



				html5sql.process(sqlstatement,
						function(){
					BuildMenuBar();

				},
				function(error, statement){
					// alert("Error: " + error.message + " when processing " + statement);
					opMessage("Error: " + error.message + " when processing " + statement);

				}        
				);				
			}

		},
		function(error, statement){
			opMessage("Error: " + error.message + " when processing " + statement);
		}        
		);


	}

}
function refdatacodesCB(MyReference){
	var sqlstatement="";


	opMessage("Callback Reference Data Codes triggured");

	if(MyReference.catprofile.length>0){
		if(syncReferenceDetsUpdated){
			localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', CatProfiles:'+String(MyReference.catprofile.length));
		}else{
			localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'CatProfiles:'+String(MyReference.catprofile.length));
		}
		opMessage("Deleting Existing Reference Data");
		sqlstatement+='DELETE FROM RefNotifprofile;';
		sqlstatement+='DELETE FROM RefCodeGroups;';
		sqlstatement+='DELETE FROM RefCodes;';
		sqlstatement1="";
		//alert(MyReference.catprofile.length)
		html5sql.process(sqlstatement,
				function(){

			sqlstatement='';
			rcgcnt=0;
			for(var cntx=0; cntx < MyReference.catprofile.length ; cntx++)
			{	

				sqlstatement+='INSERT INTO RefNotifprofile (scenario, profile , notif_type ) VALUES ('+
				'"'+MyReference.catprofile[cntx].scenario+'",'+
				'"'+MyReference.catprofile[cntx].notifcat_profile+'",'+
				'"'+MyReference.catprofile[cntx].notifcat_type+'");';



				//Loop and write codegroups to DB

				sqlstatement+=prepLogMessage("Loading "+MyReference.catprofile[cntx].notifcat_profile+MyReference.catprofile[cntx].codegroup.length)+";";
				for(var opscnt=0; opscnt < MyReference.catprofile[cntx].codegroup.length ; opscnt++)
				{
					sqlstatement+='INSERT INTO RefCodeGroups (scenario, profile , catalog_type , code_cat_group , codegroup , codegroup_text  ) VALUES  ('+
					'"'+MyReference.catprofile[cntx].scenario+'",'+
					'"'+MyReference.catprofile[cntx].notifcat_profile+'",'+
					'"'+MyReference.catprofile[cntx].codegroup[opscnt].catalog_type+'",'+
					'"'+MyReference.catprofile[cntx].codegroup[opscnt].code_cat_group+'",'+
					'"'+MyReference.catprofile[cntx].codegroup[opscnt].codegroup+'",'+
					'"'+unescape(MyReference.catprofile[cntx].codegroup[opscnt].codegroup_text)+'");';


					//Loop and write codes to DB

					sqlstatement+=prepLogMessage("Loading "+MyReference.catprofile[cntx].codegroup[opscnt].codes.length+" Codes")+";";
					for(var ccnt=0; ccnt < MyReference.catprofile[cntx].codegroup[opscnt].codes.length ; ccnt++)
					{	
						y=unescape(MyReference.catprofile[cntx].codegroup[opscnt].codes[ccnt].code_text)
						x=y.replace(/'/g, "");;
						x=x.replace(/"/g, "");;
						x=x.replace("\/", "");;
						x=x.replace(/&/g, "");;
						sqlstatement+='INSERT INTO RefCodes (scenario, profile , code_cat_group , code , code_text ) VALUES  ('+
						'"'+MyReference.catprofile[cntx].scenario+'",'+
						'"'+MyReference.catprofile[cntx].notifcat_profile+'",'+
						'"'+MyReference.catprofile[cntx].codegroup[opscnt].code_cat_group+'",'+
						'"'+MyReference.catprofile[cntx].codegroup[opscnt].codes[ccnt].code+'",'+
						'"'+x+'");';
					}

				}
			}				 


			html5sql.process(sqlstatement,
					function(){
				//alert("Success - Finished Reference Codes");
			},
			function(error, statement){
				// alert("Error: " + error.message + " when processing " + statement);
			}        
			);		
			rcgcnt=0;
		},
		function(error, statement){
			opMessage("Error: " + error.message + " when processing " + statement);
		}        
		);	



	}

}






function surveysCB(data){
	var sqlstatement="";
	var ret = [];
	var dependson;

	opMessage("Callback Surveys triggured");

	if(data.Surveys.length>0){

		opMessage("Deleting Existing Reference Data");

		sqlstatement+='DELETE FROM Survey;';
		sqlstatement+='DELETE FROM SurveyGroup;';
		sqlstatement+='DELETE FROM SurveyQuestion;';
		sqlstatement+='DELETE FROM SurveySubQuestion;';
		sqlstatement+='DELETE FROM  SurveyQuestionChildren;';
		sqlstatement1="";

		html5sql.process(sqlstatement,
				function(){

			sqlstatement='';
			rcgcnt=0;
			for(var cntx=0; cntx < data.Surveys.length ; cntx++)
			{	

				sqlstatement+='INSERT INTO Survey (surveyid, name ) VALUES ('+
				'"'+data.Surveys[cntx].SurveyID+'",'+
				'"'+data.Surveys[cntx].SurveyName+'");';
				for(var cntg=0; cntg < data.Surveys[cntx].Group.length ; cntg++)
				{	

					sqlstatement+='INSERT INTO SurveyGroup (surveyid, groupid, name, title ) VALUES ('+
					'"'+data.Surveys[cntx].SurveyID+'",'+
					'"'+data.Surveys[cntx].Group[cntg].GroupID+'",'+
					'"'+data.Surveys[cntx].Group[cntg].GroupName+'",'+
					'"'+data.Surveys[cntx].Group[cntg].GroupDescription+'");';


					for(var cntq=0; cntq < data.Surveys[cntx].Group[cntg].Question.length ; cntq++)
					{	
						dependson=data.Surveys[cntx].Group[cntg].Question[cntq].QuestionDependsOn+": : ";
						ret=dependson.split(':');
						sqlstatement+='INSERT INTO SurveyQuestion (surveyid, groupid, questionid, questiontype, defaultvalue, name, title, dependsonid, dependsonval) VALUES ('+
						'"'+data.Surveys[cntx].SurveyID+'",'+
						'"'+data.Surveys[cntx].Group[cntg].GroupID+'",'+
						'"'+data.Surveys[cntx].Group[cntg].Question[cntq].QuestionID+'",'+
						'"'+data.Surveys[cntx].Group[cntg].Question[cntq].QuestionType+'",'+
						'"'+data.Surveys[cntx].Group[cntg].Question[cntq].QuestionDefaultValue+'",'+
						'"'+data.Surveys[cntx].Group[cntg].Question[cntq].QuestionName+'",'+
						'"'+data.Surveys[cntx].Group[cntg].Question[cntq].QuestionText+'",'+
						'"'+ret[0]+'",'+	
						'"'+ret[1]+'");';
						for(var cntsq=0; cntsq < data.Surveys[cntx].Group[cntg].Question[cntq].SubQuestion.length ; cntsq++)
						{	
							dependson=data.Surveys[cntx].Group[cntg].Question[cntq].SubQuestion[cntsq].SubQuestionDependsOn+": : ";
							ret=dependson.split(':');
							sqlstatement+='INSERT INTO SurveySubQuestion (surveyid, groupid, questionid, subquestionid, subquestiontype, name, title, dependsonid, dependsonval) VALUES ('+
							'"'+data.Surveys[cntx].SurveyID+'",'+
							'"'+data.Surveys[cntx].Group[cntg].GroupID+'",'+
							'"'+data.Surveys[cntx].Group[cntg].Question[cntq].QuestionID+'",'+
							'"'+data.Surveys[cntx].Group[cntg].Question[cntq].SubQuestion[cntsq].SubQuestionID+'",'+
							'"'+data.Surveys[cntx].Group[cntg].Question[cntq].SubQuestion[cntsq].SubQuestionType+'",'+
							'"'+data.Surveys[cntx].Group[cntg].Question[cntq].SubQuestion[cntsq].SubQuestionName+'",'+
							'"'+data.Surveys[cntx].Group[cntg].Question[cntq].SubQuestion[cntsq].SubQuestionText+'",'+
							'"'+ret[0]+'",'+	
							'"'+ret[1]+'");';



						}																	


					}										


				}





			}				 


			html5sql.process(sqlstatement,
					function(){
				//alert("Success - Finished Loading Survey Data");
			},
			function(error, statement){
				//alert("Error: " + error.message + " when processing " + statement);
			}        
			);	
			BuildQuestionChildren();
		},	
		function(error, statement){
			//alert("Error: " + error.message + " when processing " + statement);
		}        
		);		

	}

}
function BuildQuestionChildren(){
	var sqlstatement="";
	var sqlstatement1="";
	var question = " ";
	var questionchildren='';
	var questionvalue="";

	opMessage("Building Survey Question Children");


	sqlstatement='Select * from SurveyQuestion where dependsonid > 0 order by dependsonid';

	html5sql.process(sqlstatement,
			function(transaction, results, rowsArray){
		if( rowsArray.length > 0) {
			for (var n = 0; n < rowsArray.length; n++) {
				item = rowsArray[n];
				//alert(item.questionid+"-"+item.name);

				if (item.dependsonid != question){
					if (question != ' '){								

						sqlstatement1+='INSERT INTO surveyquestionchildren (surveyid , groupid, questionid, questionvalue, childquestions ) VALUES ("'+
						item.surveyid+'", "'+item.groupid+'", "'+question+'", "'+questionvalue+'", "'+questionchildren+'");';
					}

					question=item.dependsonid;
					questionvalue=item.dependsonval;
					questionchildren =item.questionid;	
				}else{
					questionchildren += ":"+item.questionid;	
				}


			}


			html5sql.process(sqlstatement1,
					function(transaction, results, rowsArray){


			},
			function(error, statement){
				window.console&&console.log("Error: " + error.message + " when processing " + statement);
			}   
			);									

		}

	},
	function(error, statement){
		window.console&&console.log("Error: " + error.message + " when processing " + statement);
	}   
	);	




}
function dg5CB(data){
	var sqlstatement="";

	opMessage("Callback DG5 Data triggured");

	if(data.dg5.length>0){
		if(syncReferenceDetsUpdated){
			localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', DG5:'+String(data.dg5.length));
		}else{
			localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'DG5:'+String(data.dg5.length));
		}
		opMessage("Deleting Existing Reference Data");
		sqlstatement+='DELETE FROM DG5REL;';
		sqlstatement+='DELETE FROM DG5CODES;';
		sqlstatement+='DELETE FROM CFCODES;';

		html5sql.process(sqlstatement,
				function(){




			cntx=0

			sqlstatement="";
			opMessage("Loading dg5 Data");
			//Loop and write DG5REL to DB

			opMessage("Loading "+data.dg5[cntx].cfcodes.length+" DG5REL");

			for(var opscnt=0; opscnt < data.dg5[cntx].cfcodes.length ; opscnt++)
			{	

				sqlstatement+='INSERT INTO CFCODES (level, catalog_type ,code_cat_group, codegroup,codegroup_text, long_text, code ,codedesc) VALUES ('+
				'"'+data.dg5[cntx].cfcodes[opscnt].level+'",'+
				'"'+data.dg5[cntx].cfcodes[opscnt].catalog_type+'",'+
				'"'+data.dg5[cntx].cfcodes[opscnt].code_cat_group+'",'+
				'"'+data.dg5[cntx].cfcodes[opscnt].codegroup+'",'+
				'"'+data.dg5[cntx].cfcodes[opscnt].codegroup_text+'",'+
				'"'+data.dg5[cntx].cfcodes[opscnt].long_text.replace(/'/g, "''")	+'",'+
				'"'+data.dg5[cntx].cfcodes[opscnt].code+'",'+
				'"'+data.dg5[cntx].cfcodes[opscnt].codedesc+'");';
			}
			opMessage("Loading dg5 Data");
			//Loop and write DG5REL to DB

			opMessage("Loading "+data.dg5[cntx].rel.length+" DG5REL");

			for(var opscnt=0; opscnt < data.dg5[cntx].rel.length ; opscnt++)
			{	

				sqlstatement+='INSERT INTO DG5REL (catalogue, codegrp ,code, codedesc, dg5rel ,piarel) VALUES ('+
				'"'+data.dg5[cntx].rel[opscnt].catalogue+'",'+
				'"'+data.dg5[cntx].rel[opscnt].codegrp+'",'+
				'"'+data.dg5[cntx].rel[opscnt].code+'",'+
				'"'+data.dg5[cntx].rel[opscnt].codedesc+'",'+
				'"'+data.dg5[cntx].rel[opscnt].dg5rel+'",'+
				'"'+data.dg5[cntx].rel[opscnt].piarel+'");';
			}
			//Loop and write DG5CODES to DB

			opMessage("Loading "+data.dg5[cntx].codes.length+" DG5REL");
			for(var opscnt=0; opscnt < data.dg5[cntx].codes.length ; opscnt++)
			{	

				sqlstatement+='INSERT INTO DG5CODES (type, level ,coderef, description,code, codedesc, parenttype ,parentcode) VALUES ('+
				'"'+data.dg5[cntx].codes[opscnt].type+'",'+
				'"'+data.dg5[cntx].codes[opscnt].level+'",'+
				'"'+data.dg5[cntx].codes[opscnt].coderef+'",'+
				'"'+data.dg5[cntx].codes[opscnt].description+'",'+
				'"'+data.dg5[cntx].codes[opscnt].code+'",'+
				'"'+data.dg5[cntx].codes[opscnt].codedesc+'",'+
				'"'+data.dg5[cntx].codes[opscnt].parenttype+'",'+
				'"'+data.dg5[cntx].codes[opscnt].parentcode+'");';
			}




			html5sql.process(sqlstatement,
					function(){


			},
			function(error, statement){
				opMessage("Error: " + error.message + " when processing " + statement);

			}        
			);				


		},
		function(error, statement){
			opMessage("Error: " + error.message + " when processing " + statement);
		}        
		);


	}

}
function DeleteOldPhotos(orderlist){
	console.log("Delete Old Photos")

}
function UpdateJobDetClose(orderno, opno){
	status="CLOSED";
	html5sql.process("update  myjobdets set status = '"+status+"', status_s = '"+status+"', status_l =  '"+status+"' ,tconf_date = '"+statusUpdateDate+"', tconf_time = '"+statusUpdateTime+"' where  orderno = '"+orderno+"' and opno = '"+ opno+"';",
			function(){
		buildJobs();

	},
	function(error, statement){
		opMessage("Error: " + error.message + " when insertOperationStatus processing " + statement);          

	}
	);
}
function sendJobPhotos(orderno,opno){
	var sqlstatement="";

	sqlstatement+='SELECT  p.id as id,p.url as url, p.name as name, p.orderno as orderno, p.opno as opno, p.status as status '
		sqlstatement+=' from MyJobsPhotos p where   p.orderno = "'+orderno+'"  and p.opno = "'+opno+'";'



		opMessage("Processing Photos");


	html5sql.process(sqlstatement,
			function(transaction, results, rowsArray){
		if( rowsArray.length > 0) {
			for (var n = 0; n < rowsArray.length; n++) {
				item = rowsArray[n];
				if(item.status!="Sent"){

					getBase64FromImageUrl(item.url,item.id,item.name)
					UpdatePhotoEntryonClose(item.orderno,item.opno, item.id, item.name, "","Sending")
					//same as other without build list
				}

			}



		}

	},
	function(error, statement){
		window.console&&console.log("Error: " + error.message + " when processing " + statement);
	}   
	);




}
function sendJobAttachments(orderno,opno){
	var sqlstatement="";

	sqlstatement+='SELECT  p.id as id,p.url as url,p.name as name,p.type as type, p.orderno as orderno, p.opno as opno, p.status as status '
		sqlstatement+=' from MyJobsDocs p where   p.orderno = "'+orderno+'"  and p.opno = "'+opno+'";'



		opMessage("Processing Photos");


	html5sql.process(sqlstatement,
			function(transaction, results, rowsArray){
		if( rowsArray.length > 0) {
			for (var n = 0; n < rowsArray.length; n++) {
				item = rowsArray[n];
				if(item.status!="Sent"){

					getBase64FromAttachmentUrl(item.url,item.id,item.name,item.type,"close")
					//UpdatePhotoEntryonClose(item.orderno,item.opno, item.id, item.name, "","Sending")
					//same as other without build list
				}

			}



		}

	},
	function(error, statement){
		window.console&&console.log("Error: " + error.message + " when processing " + statement);
	}   
	);




}
function sendJobForms(orderno,opno){
	var sqlstatement="";

	sqlstatement+='SELECT  p.id as id,p.formdesc as formdesc,p.formname as formname,p.htmlbody as htmlbody,p.htmlreadonly as htmlreadonly, p.orderno as orderno, p.opno as opno, p.status as status '
		sqlstatement+=' from MyFormsResponses p where   p.orderno = "'+orderno+'"  and p.opno = "'+opno+'";'



		opMessage("Processing Photos");


	html5sql.process(sqlstatement,
			function(transaction, results, rowsArray){
		if( rowsArray.length > 0) {
			for (var n = 0; n < rowsArray.length; n++) {
				item = rowsArray[n];
				if(item.status!="Sent"){
					x=unescape(item.htmlreadonly)
					y=unescape(encodeURIComponent(x))

					formHTML=window.btoa(HTMLFormStart+y+HTMLFormEnd)

					createBase64FormXML(formHTML,item.formdesc+".html",item.id,item.formdesc,"close")	

				}

			}



		}

	},
	function(error, statement){
		window.console&&console.log("Error: " + error.message + " when processing " + statement);
	}   
	);




}
function paramCB(data){
	var sqlstatement="";		

	if(data.params.length>0){
		if(syncReferenceDetsUpdated){
			localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', Params:'+String(data.params.length));
		}else{
			localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'Params:'+String(data.params.length));
		}

		opMessage("Deleting Existing PParameters");
		sqlstatement+='DELETE FROM MyJobsParams;';
		opMessage("Loading"+data.params.length+" Existing Params");
		for(var cntx=0; cntx < data.params.length ; cntx++)
		{	

			sqlstatement+=' INSERT INTO MyJobsParams (name , key1 , key2 , value ) VALUES ('+ 
			'"'+data.params[cntx].name +'",'+  
			'"'+data.params[cntx].key1 +'",'+   
			'"'+data.params[cntx].key2 +'",'+ 
			'"'+data.params[cntx].value+'");';			
		}	

		html5sql.process(sqlstatement,
				function(){

		},
		function(error, statement){
			opMessage("Error: " + error.message + " when processing Parm loading " + statement);
		}        
		);


	}
}

function populateEquipmentTypeCode(EquipmentTypeCodeData) {
    var sqlstatement = "";

    opMessage("Deleting Existing EquipmentTypeCode");
    sqlstatement += 'DELETE FROM EquipmentTypeCode;';
    opMessage("Loading " + EquipmentTypeCodeData.EquipmentTypeCode.length + " records");

    var myarray = [{ 'sql': 'DELETE FROM EquipmentTypeCode', 'data': [] }];

    for (var cntx = 0; cntx < EquipmentTypeCodeData.EquipmentTypeCode.length ; cntx++) {
        myarray.push({
            'sql': 'INSERT INTO EquipmentTypeCode (EARTX ,ZATCODE,ZOTDEF,ZOTDEF_EXT,ZOTDESC,ZZEQPT_EGI) VALUES  (?, ?,?,?,?,?)', 'data':
    [EquipmentTypeCodeData.EquipmentTypeCode[cntx].EARTX, EquipmentTypeCodeData.EquipmentTypeCode[cntx].ZATCODE,
     EquipmentTypeCodeData.EquipmentTypeCode[cntx].ZOTDEF, EquipmentTypeCodeData.EquipmentTypeCode[cntx].ZOTDEF_EXT,
     EquipmentTypeCodeData.EquipmentTypeCode[cntx].ZOTDESC, EquipmentTypeCodeData.EquipmentTypeCode[cntx].ZZEQPT_EGI
    ]
        })
    }

    html5sql.process(
          myarray
        ,
         function () {
             opMessage("Success - Finished Loading EquipmentTypeCode");
         },
         function (error, statement) {
             opMessage("Error: " + error.message + " when processing " + statement);
         }
    );
}
function sendSAPData(page,params,timedOutSQL){
	var TimedOut=false;
	SetLastSyncDetails("LASTSYNC_UPLOAD");
	localStorage.setItem("SAPCalling","true")
	opMessage(page+getTime());
	console.log(page+getTime())

	var myurl=SAPServerPrefix+page+SAPServerSuffix+params;

	$.ajax({
		dataType: "json",
		url: myurl,  
		timeout: 60000
	}).done(function() {
		console.log("call success"+page );
	}).fail( function( xhr, status ) {

		if (status!="parsererror"){

			if( status == "timeout" ) {
				console.log("TimedOut1"+TimedOut)
				TimedOut=true;
				resetSENDINGData(timedOutSQL);
				console.log(page+status)
				console.log("TimedOut2"+TimedOut)
			}
		}
	}).always(function() {

		console.log( "Complete "+page+ " at "+getTime()+" Timedout = "+TimedOut);
		if(TimedOut==false){
			localStorage.setItem("SAPCalling","false")
			syncUpload()
		}else{
			localStorage.setItem("SAPCalling","false")

		}


	});

	//})


}

//Azure Callback Handlers
//Added 10-09-2016

function postAzureData(page, postData, timedOutSQL,recno) {

	var myurl = SAPServerPrefix + page + "?" +  localStorage.getItem('MobileUser');
   // var myurl = "https://AMPService.azurewebsites.net/api/" + page + "?" +  localStorage.getItem('MobileUser');
  // var myurl = "http://10.193.123.32/AMPServiceService/api/" + page + "?" + localStorage.getItem('MobileUser'); //"SMUNJEWAR2";
console.log(page+":"+postData)

   $.ajax({
       type: "POST",
       contentType: "application/json; charset=UTF-8",
       url: myurl,
       data: JSON.stringify(postData),
       headers: {
           "ZUMO-API-VERSION": "2.0.0"
       },
       timeout: 3000000
   }).done(function (data) {
       opMessage("call success" + page);
       postAzureCB(data.d, page,recno);
   }).fail(function (data, xhr, status) {
       opMessage(page + status + data);
       if (status != "parsererror") {
           if (status == "timeout") {
        	  
				TimedOut=true;
				resetSENDINGData(timedOutSQL);
				
           }
       }
   }).always(function () {
       opMessage("Complete" + page);
   });
}
function postAzureDataOriginal(page, postData) {


    var myurl = SAPServerPrefix + page + "?" +  localStorage.getItem('MobileUser');
  // var myurl = "http://10.193.123.32/AMPServiceService/api/" + page + "?" + localStorage.getItem('MobileUser'); //"SMUNJEWAR2";


   $.ajax({
       type: "POST",
       contentType: "application/json; charset=UTF-8",
       url: myurl,
       data: JSON.stringify(postData),
       headers: {
           "ZUMO-API-VERSION": "2.0.0"
       },
       timeout: 3000000
   }).done(function (data) {
       opMessage("call success" + page);
       chooseCB(data, page);
   }).fail(function (data, xhr, status) {
       opMessage(page + status + data);
       if (status != "parsererror") {
           if (status == "timeout") {
               opMessage(page + status);
           }
       }
   }).always(function () {
       opMessage("Complete" + page);
   });
}
function requestAzureData(page, params) {
	console.log("Azure"+page+":"+params)
	if (params.length > 0) {

		var myurl = SAPServerPrefix + page + "?" + params;//"real" azure
		//var myurl = "http://10.193.123.32/AMPServiceService/api/" + page + "?" + params;//"real" azure

	}
	else {
		var myurl = SAPServerPrefix + page;//"real" azure
		// var myurl = "http://10.193.123.32/AMPServiceService/api/" + page;//"real" azure

	}

	$.ajax({
		dataType: "json",
		url: myurl,
		headers: {
			"ZUMO-API-VERSION": "2.0.0"
				// ,"My-Second-Header":"second value"
		},
		timeout: 3000000
	}).done(function (data) {
		opMessage("call success" + page);
		chooseCB(data, page);
	}).fail(function (data, xhr, status) {
		opMessage(page + status + data);
		if (status != "parsererror") {
			if (status == "timeout") {
				opMessage(page + status);
			}
		}
	}).always(function () {
		opMessage("Complete" + page);
	});
}

function chooseCB(mydata, page) {
	switch (page) {
	case "ZACAT001AssetCaptureCategory":
		ZACAT001AssetCaptureCategoryCB(mydata);
		break;
	case "ZPRG002ProcessGroupCodes":
		ZPRG002ProcessGroupCodesCB(mydata);
		break;
	case "PlantGroupCodesZPLG003":
		PlantGroupCodesZPLG003CB(mydata);
		break;
	case "SystemCodesDescriptionZSYS004":
		SystemCodesDescriptionZSYS004CB(mydata);
		break;
	case "FunctionTypeCodesZNAM005":
		FunctionTypeCodesZNAM005CB(mydata);
		break;
	case "EquipmentTypeCodesZEGI006":
		EquipmentTypeCodesZEGI006CB(mydata);
		break;
	case "PlantGroupProcessGroupCodesZPLG_PRG007":
		PlantGroupProcessGroupCodesZPLG_PRG007CB(mydata);
		break;
	case "AssetTypeCodesZAST008":
		AssetTypeCodesZAST008CB(mydata);
		break;
	case "EGINameCodeMappingZAEGI_NC":
		EGINameCodeMappingZAEGI_NCCB(mydata);
		break;
	case "DecommissionStatusZDECOMSTAT":
		DecommissionStatusZDECOMSTATCB(mydata);
		break;
	case "ZGW_MAM_SITE_REFDATA":
		ZGW_MAM_SITE_REFDATACB(mydata);
		break;


	case "ZGW_MAM30_090_GETLIST_T3":             //done
		ZGW_MAM30_090_GETLIST_T3CB(mydata);
		break;
	case "ZGW_MAM30_VEHICLE":                    //done
		ZGW_MAM30_VEHICLECB(mydata);
		break;
	case "ZGW_MAM30_ADOBE_PREPOP_SRV":
		ZGW_MAM30_ADOBE_PREPOP_SRVCB(mydata);
		break;
	case "ZGW_MAM30_ADOBE_PREPOP_GIS_T3_SRV":
		ZGW_MAM30_ADOBE_PREPOP_GIS_T3_SRVCB(mydata);
		break;
	case "ZGW_MAM30_SEWER_TECH_T3":
		ZGW_MAM30_SEWER_TECH_T3CB(mydata);
		break;
	case "ZGW_MAM30_RFV_T3_SRV":
		ZGW_MAM30_RFV_T3_SRVCB(mydata);
		break;
	case "ZGW_MAM30_VERSION_DEPLOY":
		ZGW_MAM30_VERSION_DEPLOYCB(mydata);
		break;
	case "ZG_MAM30_APPBAR_CTRL_SRV":             //done
		ZG_MAM30_APPBAR_CTRL_SRVCB(mydata);
		break;
	case "ZGW_MAM30_REFDATA_T3_SRVActivity":
		ZGW_MAM30_REFDATA_T3_SRVActivityCB(mydata);
		break;
	case "ZGW_MAM30_REFDATA_T3_SRVNotifTypes":
		ZGW_MAM30_REFDATA_T3_SRVNotifTypesCB(mydata);
		break;
	case "ZGW_MAM30_REFDATA_T3_SRVPAICode":
		ZGW_MAM30_REFDATA_T3_SRVPAICodeCB(mydata);
		break;
	case "ZGW_MAM30_016_GETDETAIL_CFEED_SRVCodeGPCF":
		ZGW_MAM30_016_GETDETAIL_CFEED_SRVCodeGPCFCB(mydata);
		break;
	case "ZGW_MAM30_016_GETDETAIL_CFEED_SRVScenCodeGPS":
		ZGW_MAM30_016_GETDETAIL_CFEED_SRVScenCodeGPSCB(mydata);
		break;
	case "ZGW_MAM30_031_REFDATA_T3_SRVManufacturer":
		ZGW_MAM30_031_REFDATA_T3_SRVManufacturerCB(mydata);
		break;
	case "ZGW_MAM30_031_REFDATA_T3_SRVModel":
		ZGW_MAM30_031_REFDATA_T3_SRVModelCB(mydata);
		break;
	case "ZGW_MAM30_031_REFDATA_T3_SRVObjType":
		ZGW_MAM30_031_REFDATA_T3_SRVObjTypeCB(mydata);
		break;
	case "ZGW_MAM30_031_REFDATA_T3_SRVPlant":
		ZGW_MAM30_031_REFDATA_T3_SRVPlantCB(mydata);
		break;
	case "ZGW_MAM30_031_REFDATA_T3_SRVProfile":
		ZGW_MAM30_031_REFDATA_T3_SRVProfileCB(mydata);
		break;
	case "ZGW_MAM_EXTRACT_ASSET_DATA":
		ZGW_MAM_EXTRACT_ASSET_DATACB(mydata);
		break;
	case "ZGW_MAM_ASSETDATA_T3":
		ZGW_MAM_ASSETDATA_T3CB(mydata);
		break;
	case "ZGW_GET_JOB_DETAILS":
		ZGW_GET_JOB_DETAILSCB(mydata);
		break;
	case "ZGW_MAM_MAINT_PARAM":
		ZGW_MAM_MAINT_PARAMCB(mydata);
		break;
	case "ZGW_MAM30_CHECK_SURVEY":
		ZGW_MAM30_CHECK_SURVEYCB(mydata);
		break;
	case "ZGW_MAM30_USER_VALIDATE_SRV":
		ZGW_MAM30_USER_VALIDATE_SRVCB(mydata);
		break;
    case "ZGW_MAM30_DG5_PIA_CODES_T3Dg5Code":
        ZGW_MAM30_DG5_PIA_CODES_T3Dg5CodeCB(mydata);
        break;
    case "ZGW_MAM30_DG5_PIA_CODES_T3Dg5Rel":
        ZGW_MAM30_DG5_PIA_CODES_T3Dg5RelCB(mydata);
        break;
	default:
	}
}
/************************************************/
/* User Data Call back							*/
/************************************************/
function ZGW_MAM30_090_GETLIST_T3CB(data) {
	

	var sqlstatement="";		
	var MyEmployeeID=""
		if(data.length>0){
			if(syncReferenceDetsUpdated){
				localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', Users:'+String(data.length));
			}else{
				localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'Users:'+String(data.length));
			}

			opMessage("Deleting Existing Users");
			opMessage("Loading"+data.length+" Users");

			var myarray = [{ 'sql': 'DELETE FROM MyRefUsers', 'data': [] }];
			for(var cntx=0; cntx < data.length ; cntx++)
			{	
				myarray.push({
					'sql': 'INSERT INTO MyRefUsers (userid , scenario , plant , workcenter , plannergroup , plannergroupplant, storagegroup, storageplant, partner, partnerrole, funclocint, funcloc, compcode, employeeno, equipment, firstname, lastname, telno ,maint1,maint2,maint3,maint4,maint5,maint6,maint7,maint8) VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 'data':
						[data[cntx].userid, data[cntx].myalmScenario,data[cntx].plant, data[cntx].workCntr,data[cntx].plangroup, data[cntx].plangroupPlant,
						 data[cntx].stgeLoc, data[cntx].stgeLocPlant,data[cntx].partner, data[cntx].partnerRole,data[cntx].funclocInt, data[cntx].funcloc,
						 data[cntx].compCode, data[cntx].employeeno,"", data[cntx].firstname,data[cntx].lastname, "",
						 data[cntx].maint1, data[cntx].maint2,data[cntx].maint3, data[cntx].maint4,data[cntx].maint5, data[cntx].maint6,data[cntx].maint7, data[cntx].maint8

						 ]
				})

				if(data[cntx].userid==localStorage.getItem('MobileUser')){
					localStorage.setItem('EmployeeID',data[cntx].employeeno)
					localStorage.setItem('EmployeeWorkCenter',data[cntx].workCntr)
					localStorage.setItem('EmployeeScenario',data[cntx].myalmScenario)
					localStorage.setItem('MobileFullname', data[cntx].firstname +" "+ data[cntx].lastname)
				}

			}	

			html5sql.process(myarray ,
					function(){
				sqlstatement="UPDATE MyUserDets SET employeeid = '"+localStorage.getItem('EmployeeID')+"', fullname='"+localStorage.getItem('MobileFullname')+"', workcenter='"+localStorage.getItem('EmployeeWorkCenter')+"', scenario='"+localStorage.getItem('EmployeeScenario')+"' WHERE mobileuser = '"+localStorage.getItem('MobileUser')+"';";

				html5sql.process(
						sqlstatement
						,
						function(){
						},
						function(error, statement){
							opMessage("Error: " + error.message + " when updateing EmployeeID " + statement);
						}        
				);
			},
			function(error, statement){
				opMessage("Error: " + error.message + " when processing " + statement);
			}        
			);
			


		}
}
/************************************************/
/* Vehicle Data Call back						*/
/************************************************/
function zFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}
function ZGW_MAM30_VEHICLECB(data) {
	
	
	
	var sqlstatement="";		
	var MyEmployeeID=""
		
		html5sql.process(
        		["select value from MyJobsParams where name = 'VEHICLE'"],
        		function (transaction, results, rowsArray) {
        		    if (rowsArray.length> 0) {
        		    	processVehicles(data,zFill(rowsArray[0].value,18))
        		    }

        		},
        		 function (error, statement) {
        		     window.console && console.log("Error: " + error.message + " when processing " + statement);
        		 }
        	);
}
function processVehicles(data,defaultVehicle) {	
	//vehicle
	console.log(defaultVehicle+"="+data.length)
	var first=0;
	var v_mpoint=""
			if(data.length>0){
			if(syncReferenceDetsUpdated){
				localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', Vehicles:'+String(data.length));
			}else{
				localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'Vehicles:'+String(data.length));
			}

			opMessage("Deleting Existing Vehicles");
			opMessage("Loading"+data.length+" Vehicles");

			var myarray = [{ 'sql': 'DELETE FROM MyVehicles', 'data': [] }];
			myarray.push({ 'sql': 'DELETE FROM MyVehiclesDefault', 'data': [] });
			for(var cntx=0; cntx < data.length ; cntx++)
			{	
				if(data[cntx].equipmentNo==defaultVehicle){
					console.log("Default Found")
					if(data[cntx].level=="2"){
						myarray.push({
							'sql': 'INSERT INTO MyVehiclesDefault (equipment , reg , partner, level, sequence, description , mpoint, mpointdesc, mpointlongtext ) VALUES  (?,?,?,?,?,?,?,?,?)', 'data':
								[data[cntx].equipmentNo, data[cntx].inventoryNo,data[cntx].partner, data[cntx].level,data[cntx].sequence,
								 data[cntx].description,data[cntx].measmntPoint,data[cntx].measPntDesc,data[cntx].measPntLongtxt]
						})
					}
				}else{
					//Now real Vehicles
					
					if(data[cntx].level==1){
						if(first==0)
						{
							first=1;
						}else{
							
							myarray.push({
								'sql': 'INSERT INTO MyVehicles (id , reg , partner, description , mpoints) VALUES  (?,?,?,?,?)', 'data':
									[v_eq, v_reg,v_partner,v_description,v_mpoint]
							})
							
						}
						
						v_eq=data[cntx].equipmentNo
						v_reg=data[cntx].inventoryNo 
						v_partner=data[cntx].partner
						v_description=data[cntx].description
						v_mpoint=""
					}else{

						v_mpoint+=data[cntx].measmntPoint+':';	
						
					}
				}
				
				

			}	


				html5sql.process(
						myarray
						,
						function(){
						},
						function(error, statement){
							opMessage("Error: " + error.message + " when inserting Vehicles" + statement);
						}        
				);

			


		}
}

/************************************************/
/* AppBar Data Call back						*/
/************************************************/
function ZG_MAM30_APPBAR_CTRL_SRVCB(data) {
	
	
	
	var sqlstatement="";		
	var MyEmployeeID=""
		if(data.length>0){
			if(syncReferenceDetsUpdated){
				localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', AppBar:'+String(data.length));
			}else{
				localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'AppBar:'+String(data.length));
			}

			opMessage("Deleting Existing MenuBar");
			opMessage("Loading"+data.length+" MenuBar");

			var myarray = [{ 'sql': 'DELETE FROM MyMenuBar', 'data': [] }];
			for(var cntx=0; cntx < data.length ; cntx++)
			{	

				myarray.push({
					'sql': 'INSERT INTO MyMenuBar (scenario, level ,item, position, type ,subitem ,command, item2) VALUES  (?,?,?,?,?,?,?,?)', 'data':
						[data[cntx].scenario, data[cntx].level,data[cntx].item, data[cntx].position,data[cntx].type,data[cntx].subitem,data[cntx].command,data[cntx].item2]
				})
				

			}	


				html5sql.process(
						myarray
						,
						function(){
						},
						function(error, statement){
							opMessage("Error: " + error.message + " when inserting AppBar" + statement);
						}        
				);

			


		}
}
/************************************************/
/* Activities Data Call back				    */
/************************************************/
function ZGW_MAM30_REFDATA_T3_SRVActivityCB(data) {
	
	
	
		if(data.length>0){
			if(syncReferenceDetsUpdated){
				localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', Ref:Activities:'+String(data.length));
			}else{
				localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'Ref:Activities:'+String(data.length));
			}

			opMessage("Deleting Existing REFACTIVITY");
			opMessage("Loading"+data.length+" REFACTIVITY");

			var myarray = [{ 'sql': 'DELETE FROM REFACTIVITY', 'data': [] }];
			for(var cntx=0; cntx < data.length ; cntx++)
			{	

				myarray.push({
					'sql': 'INSERT INTO REFACTIVITY (scenario , work_center , activity , activity_desc,	action , deflt ) VALUES  (?,?,?,?,?,?)', 'data':
						["", data[cntx].workCenter,data[cntx].activity, data[cntx].activityDesc,data[cntx].action,data[cntx].deflt]
				})
				

			}	


				html5sql.process(
						myarray
						,
						function(){
						},
						function(error, statement){
							opMessage("Error: " + error.message + " when inserting REFACTIVITY" + statement);
						}        
				);

			


		}
}
/************************************************/
/* PAICODES Data Call back				        */
/************************************************/
function ZGW_MAM30_REFDATA_T3_SRVPAICodeCB(data) {
	
	
	
		if(data.length>0){
			if(syncReferenceDetsUpdated){
				localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', REFPAICODES:'+String(data.length));
			}else{
				localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'REFPAICODES:'+String(data.length));
			}

			opMessage("Deleting Existing REFPAICODES");
			opMessage("Loading"+data.length+" REFPAICODES");

			var myarray = [{ 'sql': 'DELETE FROM REFPAICODES', 'data': [] }];
			for(var cntx=0; cntx < data.length ; cntx++)
			{	

				myarray.push({
					'sql': 'INSERT INTO REFPAICODES (scenario , userid , level , stsma,	plant, work_cntr , catalogue , codegrp , kurztext_group,	code , kurztext_code) VALUES  (?,?,?,?,?,?,?,?,?,?,?)', 'data':
						[ data[cntx].myalmScenario, "", data[cntx].level,data[cntx].stsma,data[cntx].plant, data[cntx].workCntr,data[cntx].catalogue,data[cntx].codegrp, data[cntx].kurztextGroup,data[cntx].code,data[cntx].kurztextCode]
				})
				

			}	


				html5sql.process(
						myarray
						,
						function(){
						},
						function(error, statement){
							opMessage("Error: " + error.message + " when inserting REFPAICODES" + statement);
						}        
				);

			


		}
}
/************************************************/
/* VARIANCESRFV Data Call back			        */
/************************************************/
function ZGW_MAM30_RFV_T3_SRVCB(data) {
	
	
		if(data.length>0){
			if(syncReferenceDetsUpdated){
				localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', REFVARIANCESRFV:'+String(data.length));
			}else{
				localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'REFVARIANCESRFV:'+String(data.length));
			}

			opMessage("Deleting Existing REFVARIANCESRFV");
			opMessage("Loading"+data.length+" REFVARIANCESRFV");

			var myarray = [{ 'sql': 'DELETE FROM REFVARIANCESRFV', 'data': [] }];
			for(var cntx=0; cntx < data.length ; cntx++)
			{	

				myarray.push({
					'sql': 'INSERT INTO REFVARIANCESRFV (scenario , userid ,  plant , work_cntr,	job_activity , dev_reason , dev_reas_txt , mandate) VALUES  (?,?,?,?,?,?,?,?)', 'data':
						["", "", data[cntx].plant,data[cntx].workCntr,data[cntx].jobActivity, data[cntx].devReason,data[cntx].jobActDesc,data[cntx].mandate]
				})
				

			}	


				html5sql.process(
						myarray
						,
						function(){
						},
						function(error, statement){
							opMessage("Error: " + error.message + " when inserting REFVARIANCESRFV" + statement);
						}        
				);

			


		}
}
/************************************************/
/* Notif Types Data Call back			        */
/************************************************/
function ZGW_MAM30_REFDATA_T3_SRVNotifTypesCB(data) {

	
		if(data.length>0){
			if(syncReferenceDetsUpdated){
				localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', REFNOTIFICATIONTYPES:'+String(data.length));
			}else{
				localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'REFNOTIFICATIONTYPES:'+String(data.length));
			}

			opMessage("Deleting Existing REFNOTIFICATIONTYPES and PRIORITIES");
			opMessage("Loading"+data.length+" REFNOTIFICATIONTYPES and PRIORITIES");

			var myarray = [{ 'sql': 'DELETE FROM REFNOTIFICATIONTYPES', 'data': [] }];
			myarray.push({ 'sql': 'DELETE FROM MyRefPriorityTypes', 'data': [] });
			for(var cntx=0; cntx < data.length ; cntx++)
			{	
				if(data[cntx].levelNumber=="2"){
					myarray.push({
						'sql': 'INSERT INTO REFNOTIFICATIONTYPES (scenario , userid , level_number , notiftype,	notifdesc , notifprofile , priotype , priority,	prioritydesc ) VALUES  (?, ?,?,?,?,?,?,?,?)', 'data':
							[data[cntx].myalmScenario, "", data[cntx].levelNumber,data[cntx].notiftype,data[cntx].notifdesc, data[cntx].notifprofile,data[cntx].priotype,data[cntx].priority,data[cntx].prioritydesc]
					})
				}
				if(data[cntx].levelNumber=="3"){
					myarray.push({
						'sql': 'INSERT INTO MyRefPriorityTypes (scenario, type , priority, description  ) VALUES  (?,?,?,?)', 'data':
							[data[cntx].myalmScenario, data[cntx].priotype ,data[cntx].priority, data[cntx].prioritydesc]
					})
				}
				

			}	


				html5sql.process(
						myarray
						,
						function(){
						},
						function(error, statement){
							opMessage("Error: " + error.message + " when inserting REFNOTIFICATIONTYPES and PRIORITIES" + statement);
						}        
				);

			


		}
}

/************************************************/
/* PARAMS Data Call back		    	        */
/************************************************/
function ZGW_MAM_MAINT_PARAMCB(data) {
	
	
		if(data.length>0){
			if(syncReferenceDetsUpdated){
				localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', ZMAMPARAMS:'+String(data.length));
			}else{
				localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'ZMAMPARAMS:'+String(data.length));
			}

			opMessage("Deleting Existing ZMAMPARAMS");
			opMessage("Loading"+data.length+" ZMAMPARAMS");

			var myarray = [{ 'sql': 'DELETE FROM MyJobsParams', 'data': [] }];
			for(var cntx=0; cntx < data.length ; cntx++)
			{	

				myarray.push({
					'sql': 'INSERT INTO MyJobsParams (name , key1 , key2 , value) VALUES  (?,?,?,?)', 'data':
						[data[cntx].name,data[cntx].key1,data[cntx].key2, data[cntx].value]
				})
				

			}	


				html5sql.process(
						myarray
						,
						function(){
						},
						function(error, statement){
							opMessage("Error: " + error.message + " when inserting ZMAMPARAMS" + statement);
						}        
				);

			


		}
}
   
      
      
        /************************************************/
        /* DG5 Codes Data Call back		    	        */
        /************************************************/
        function ZGW_MAM30_DG5_PIA_CODES_T3Dg5CodeCB(data) {

        		if(data.length>0){
        			if(syncReferenceDetsUpdated){
        				localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', DG5CODES:'+String(data.length));
        			}else{
        				localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'DG5CODES:'+String(data.length));
        			}

        			opMessage("Deleting Existing DG5CODES");
        			opMessage("Loading"+data.length+" DG5CODES");

        			var myarray = [{ 'sql': 'DELETE FROM DG5CODES', 'data': [] }];
        			for(var cntx=0; cntx < data.length ; cntx++)
        			{	

        				myarray.push({
        					'sql': 'INSERT INTO DG5CODES (type , level , coderef , description,code,codedesc,parenttype,parentcode) VALUES  (?,?,?,?,?,?,?,?)', 'data':
        						[data[cntx].type,data[cntx].level,data[cntx].coderef, data[cntx].description,
        						 data[cntx].code,data[cntx].codedesc,data[cntx].parenttype, data[cntx].parentcode]
        				})
        				

        			}	


        				html5sql.process(
        						myarray
        						,
        						function(){
        						},
        						function(error, statement){
        							opMessage("Error: " + error.message + " when inserting DG5CODES" + statement);
        						}        
        				);

        			


        		}
        }

        /************************************************/
        /* DG5 Rel Data Call back		    	        */
        /************************************************/
        function ZGW_MAM30_DG5_PIA_CODES_T3Dg5RelCB(data) {
        	
        	      	
        		if(data.length>0){
        			if(syncReferenceDetsUpdated){
        				localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+', DG5REL:'+String(data.length));
        			}else{
        				localStorage.setItem('LastSyncReferenceDetails',localStorage.getItem('LastSyncReferenceDetails')+'DG5REL:'+String(data.length));
        			}

        			opMessage("Deleting Existing DG5REL");
        			opMessage("Loading"+data.length+" DG5REL");

        			var myarray = [{ 'sql': 'DELETE FROM DG5REL', 'data': [] }];
        			for(var cntx=0; cntx < data.length ; cntx++)
        			{	

        				myarray.push({
        					'sql': 'INSERT INTO DG5REL (catalogue,codegrp,code,codedesc,dg5rel,piarel ) VALUES  (?,?,?,?,?,?)', 'data':
        						[data[cntx].catalogue,data[cntx].codegrp,data[cntx].code,data[cntx].codedesc,data[cntx].dg5rel, data[cntx].piarel]
        				})
        				

        			}	


        				html5sql.process(
        						myarray
        						,
        						function(){
        						},
        						function(error, statement){
        							opMessage("Error: " + error.message + " when inserting DG5REL" + statement);
        						}        
        				);

        			


        		}
        }
/************************************************/
/* Get Asset Data            	    	        */
/************************************************/
        function getAssets() {//The server keeps deleted records for MaxDaysSinceLastDownload  days (currently 90 days).
            //If the client hasn't synced Assets for more than 90 days
            //then we must empty the local asset table and download it all again.
            var lastSyncReference = localStorage.getItem('LastSyncReference');

            var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            var firstDate = new Date();//today
            var secondDate = new Date(lastSyncReference.substring(0, 4), lastSyncReference.substring(4, 6) - 1, lastSyncReference.substring(6, 8));

            var daysSinceLastDownload = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));

            var MaxDaysSinceLastDownload = 90;

            html5sql.process(
        		["select count(*) AS REC from AssetSitesDetails"],
        		function (transaction, results, rowsArray) {
        		    if (daysSinceLastDownload > MaxDaysSinceLastDownload || rowsArray[0].REC == 0) {
        		        //get all records
        		        var recordsRetrieved = -1;
        		        var currentEquipNum = 0;
        		        var numRecordsToGet = 10000;

        		        getAssetsRecursive("ZGW_MAM_EXTRACT_ASSET_DATA", currentEquipNum + numRecordsToGet)
        		    }
        		    else {
        		        //get deltas
        		        var datestring = getDate();

        		        getAssetRecords("ZGW_MAM_EXTRACT_ASSET_DATA", "?" + datestring, function (data) {
        		            recordsRetrieved = data.length;

        		            if (recordsRetrieved > 0) {
        		                addRecordstoDb(data, function () {
        		                    //Get last equipment number
        		                    getBiggestZequnr(function (BiggestZequnr) {
        		                        console.log("BiggestZequnr=" + BiggestZequnr);
        		                    })
        		                })
        		            }
        		            else {
        		                console.log("No Records found");
        		            }

        		        });
        		    }
        		},
        		 function (error, statement) {
        		     window.console && console.log("Error: " + error.message + " when processing " + statement);
        		 }
        	);



        }
        function getAssetsRecursive(currentEquipNum, numRecordsToGet) {
            getAssetRecords("ZGW_MAM_EXTRACT_ASSET_DATA", "?" + currentEquipNum + "?" + numRecordsToGet, function (data) {
                recordsRetrieved = data.length;

                if (recordsRetrieved > 0) {
                    addRecordstoDb(data, function () {
                        //Get last equipment number
                        getBiggestZequnr(function (BiggestZequnr) {
                            console.log("BiggestZequnr=" + BiggestZequnr);
                            getAssetsRecursive(BiggestZequnr, numRecordsToGet);
                        })
                    })



                }
                else {
                    alert("done");
                }

            });
        }

        function getAssetRecords(page, params, callback) {
            var myurl = SAPServerPrefix + page + params;//"real" azure
            // var myurl = "http://10.193.123.32/AMPServiceService/api/" + page + params;//My local version

            $.ajax({
                dataType: "json",
                url: myurl,
                headers: {
                    "ZUMO-API-VERSION": "2.0.0"
                },
                timeout: 3000000
            }).done(function (data) {
                callback(data);
            }).fail(function (data, xhr, status) {
                opMessage(page + status + data);
                if (status != "parsererror") {
                    if (status == "timeout") {
                        opMessage(page + status);
                    }
                }
            }).always(function () {
                opMessage("Complete" + page);
            });
        }

        function addRecordstoDb(data, callback) {

            var sqlstatement = "";

            // var myarray = [{ 'sql': 'DELETE FROM MODEL', 'data': [] }];
            var myarray = [];

            for (var cntx = 0; cntx < data.length ; cntx++) {
                myarray.push({
                    'sql': 'INSERT INTO AssetSitesDetails ( assdesc ,assettag ,asstype ,eqart ,eqktx ,equnr ,herst ,iwerk ,mapar ,ncdesc ,otdesc ,plgrp ,pltxt ,serge ,site ,status ,swerk ,syscode ,sysdesc ,tplnr ,zfl_nc ,zinbdt ) VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 'data': [
                    data[cntx].zassdesc,
               data[cntx].zassettag,
               data[cntx].zasstype,
               data[cntx].zeqart,
               data[cntx].zeqktx,
               data[cntx].zequnr,
               data[cntx].zherst,
               data[cntx].ziwerk,
               data[cntx].zmapar,
               data[cntx].zncdesc,
               data[cntx].zotdesc,
               data[cntx].zplgrp,
               data[cntx].zpltxt,
               data[cntx].zserge,
               data[cntx].zsite,
               data[cntx].zstatus,
               data[cntx].zswerk,
               data[cntx].zsyscode,
               data[cntx].zsysdesc,
               data[cntx].ztplnr,
               data[cntx].zzflnc,
                data[cntx].zinbdt]
                })
            }
            console.log(myarray[0]);
            opMessage("Success - Built asset array - " + myarray.length + " rows");
            html5sql.process(
                  myarray
                ,
                 function () {
                     opMessage("Success - Finished Loading Model");
                     console.log("Added record to db");
                     callback();
                 },
                 function (error, statement) {
                     opMessage("Error: " + error.message + " when processing " + statement);
                 }
            );
        }


        function getBiggestZequnr(callback) {
            var sqlstatement = 'SELECT  equnr as numRecords  FROM ASSETSITESDETAILS ORDER BY equnr desc limit 1';


            html5sql.process(sqlstatement,
                                 function (transaction, results, rowsArray) {
                                     callback(rowsArray[0].numRecords)
                                 },
                             function (error, statement) {
                                 opMessage("Error: " + error.message + " when processing " + statement);
                                 showErrorMessage("Delete", error.message)
                             }
                    );
        }        
        
/************************************************/
/* Orders Data Call back		    	        */
/************************************************/
function ZGW_GET_JOB_DETAILSCB(data) {
	
	opMessage("Loading"+data.tojobdet.results.length+" JobDets");
		if(data.tojobdet.results.length>0){
			if(syncReferenceDetsUpdated){
				localStorage.setItem('LastSyncTransactionalDetails',localStorage.getItem('LastSyncTransactionalDetails')+', JobDets:'+String(data.tojobdet.results.length));
			}else{
				localStorage.setItem('LastSyncTransactionalDetails',localStorage.getItem('LastSyncTransactionalDetails')+'Jobdets:'+String(data.tojobdet.results.length));
			}

			
			var tcdates=[];			

			var myarray = [{ 'sql': 'DELETE FROM MyJobDetsAddress', 'data': [] }];
			 myarray.push({ 'sql': 'DELETE FROM MyJobDets', 'data': [] })
			  myarray.push({ 'sql': 'DELETE FROM MyJobDetsNotifLongText', 'data': [] })
			  myarray.push({ 'sql': 'DELETE FROM MyJobDetsOrderOps', 'data': [] })
			  myarray.push({ 'sql': 'DELETE FROM MyJobDetsIconPriority', 'data': [] })
			  myarray.push({ 'sql': 'DELETE FROM MyJobDetsIconJob', 'data': [] })
			  myarray.push({ 'sql': 'DELETE FROM MyJobDetsMPcodes', 'data': [] })
			  myarray.push({ 'sql': 'DELETE FROM MyJobDetsMPoints', 'data': [] })
			  myarray.push({ 'sql': 'DELETE FROM MyJobDetsLoch', 'data': [] })
			  myarray.push({ 'sql': 'DELETE FROM MyJobDetsDraw', 'data': [] })
			  myarray.push({ 'sql': 'DELETE FROM MyJobsDetsEQ', 'data': [] })
			  myarray.push({ 'sql': 'DELETE FROM MyJobsDetsATTR', 'data': [] })
			  myarray.push({ 'sql': 'DELETE FROM MyJobDetsMeasCodes', 'data': [] })
			  myarray.push({ 'sql': 'DELETE FROM MyJobDetsComps', 'data': [] })
			  myarray.push({ 'sql': 'DELETE FROM MyJobDetsOrderLongText', 'data': [] })
			  opMessage("jobdets:"+data.tojobdet.results.length)
			for(var cntx=0; cntx < data.tojobdet.results.length ; cntx++)
			{	
				tcdates=[];
				if (data.tojobdet.results[cntx].acptDate.length>6){

					tcdates.push(data.tojobdet.results[cntx].acptDate+"|"+data.tojobdet.results[cntx].acptTime);
				}
				if (data.tojobdet.results[cntx].onsiteDate.length>6){

					tcdates.push(data.tojobdet.results[cntx].onsiteDate+"|"+data.tojobdet.results[cntx].onsiteTime);
				}
				if (data.tojobdet.results[cntx].parkDate.length>6){

					tcdates.push(data.tojobdet.results[cntx].parkDate+"|"+data.tojobdet.results[cntx].parkTime);
				}

				tcdates.sort()

				if(tcdates.length>0){
					x=tcdates[tcdates.length-1].split("|");
					tconfd=x[0]
					tconft=x[1]
				}else{
					tconfd=""
						tconft=""
				}	
				myarray.push({
					'sql': 'INSERT INTO MyJobDets ('+
					
					"orderid,ordnoOp,watercare,textMess,reduration, startTime,startDate,pmacttypeText, pmacttype, "+
					" workTypeCdx,workTypeCd,workTypeCgpx,workTypeCgp,ordType,shortText,priorityx,priority, " +
					" statusCrtim,statusCrdat,statusDescL,statusDescS ,status,plant,myalmScenario,workCntrOper, "+
					" workCntrUser,empName,empNo,user,custAppt,jobPartRef,locHistRef,address, "+
					" custFeed,equipment,equipmentDesc,funcLoc,funcLocDesc,flcLonLat,siteShcode,acptDate,acptTime, " +
					" onsiteDate,onsiteTime,tconf_date,tconf_time,assocOpRef,opActtype,opActtypex,name1,telNumber,eqpLonLat,notificationNo, "+
					" notifCatProf,enddateLconf,endtimeLconf,custNo,parkDate,parkTime,custCmmt,form1,form2,mandForm, "+
					" documents,tma,contractAssist,specialEq,materials,measurements,callAppt,acNo,acStatus,retention, " +
					" ntTelNo,skillType,assettag,ordWorkCntr,ordPlant,userMobile,notifCrdat,notifCrtim,ohdrShortText, " +
					" zzretc,zzretn,zzrettn,zzemai,zzgisx,zzgisy,zzmogisx,zzmogisy) values ("+
					" ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?," +
					" ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?," +
					" ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?," +
					" ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?," +
					" ?,?,?,?,?,?,?,?,?,?)", 'data': 
					
					
						[data.tojobdet.results[cntx].orderid,data.tojobdet.results[cntx].ordnoOp,data.tojobdet.results[cntx].watercare,
						 data.tojobdet.results[cntx].textMess,data.tojobdet.results[cntx].reduration,data.tojobdet.results[cntx].startTime,
						 data.tojobdet.results[cntx].startDate,data.tojobdet.results[cntx].pmacttypeText,data.tojobdet.results[cntx].pmacttype,
						 data.tojobdet.results[cntx].workTypeCdx,data.tojobdet.results[cntx].workTypeCd,data.tojobdet.results[cntx].workTypeCgpx,
						 data.tojobdet.results[cntx].workTypeCgp,data.tojobdet.results[cntx].ordType,data.tojobdet.results[cntx].shortText,
						 data.tojobdet.results[cntx].priorityx,data.tojobdet.results[cntx].priority,data.tojobdet.results[cntx].statusCrtim,
						 data.tojobdet.results[cntx].statusCrdat,data.tojobdet.results[cntx].statusDescL,data.tojobdet.results[cntx].statusDescS ,
						 data.tojobdet.results[cntx].status,data.tojobdet.results[cntx].plant,data.tojobdet.results[cntx].myalmScenario,
						 data.tojobdet.results[cntx].workCntrOper,data.tojobdet.results[cntx].workCntrUser,data.tojobdet.results[cntx].empName,
						 data.tojobdet.results[cntx].empNo,data.tojobdet.results[cntx].user,data.tojobdet.results[cntx].custAppt,
						 data.tojobdet.results[cntx].jobPartRef,data.tojobdet.results[cntx].locHistRef,data.tojobdet.results[cntx].address,
						 data.tojobdet.results[cntx].custFeed,data.tojobdet.results[cntx].equipment,data.tojobdet.results[cntx].equipmentDesc,
						 data.tojobdet.results[cntx].funcLoc,data.tojobdet.results[cntx].funcLocDesc,data.tojobdet.results[cntx].flcLonLat,
						 data.tojobdet.results[cntx].siteShcode,data.tojobdet.results[cntx].acptDate,data.tojobdet.results[cntx].acptTime,
						
						 data.tojobdet.results[cntx].onsiteDate,data.tojobdet.results[cntx].onsiteTime,tconfd,tconft,data.tojobdet.results[cntx].assocOpRef,
						 data.tojobdet.results[cntx].opActtype,data.tojobdet.results[cntx].opActtypex,data.tojobdet.results[cntx].name1,
						 data.tojobdet.results[cntx].telNumber,data.tojobdet.results[cntx].eqpLonLat,data.tojobdet.results[cntx].notificationNo,
						 data.tojobdet.results[cntx].notifCatProf,data.tojobdet.results[cntx].enddateLconf,data.tojobdet.results[cntx].endtimeLconf,
						 data.tojobdet.results[cntx].custNo,data.tojobdet.results[cntx].parkDate,data.tojobdet.results[cntx].parkTime,data.tojobdet.results[cntx].custCmmt,
						 data.tojobdet.results[cntx].form1,data.tojobdet.results[cntx].form2,data.tojobdet.results[cntx].mandForm,
						 data.tojobdet.results[cntx].documents,data.tojobdet.results[cntx].tma,data.tojobdet.results[cntx].contractAssist,
						 data.tojobdet.results[cntx].specialEq,data.tojobdet.results[cntx].materials,data.tojobdet.results[cntx].measurements,
						 data.tojobdet.results[cntx].callAppt,data.tojobdet.results[cntx].acNo,data.tojobdet.results[cntx].acStatus,data.tojobdet.results[cntx].retention,
						 data.tojobdet.results[cntx].ntTelNo,data.tojobdet.results[cntx].skillType,data.tojobdet.results[cntx].assettag,data.tojobdet.results[cntx].ordWorkCntr,
						 data.tojobdet.results[cntx].ordPlant,data.tojobdet.results[cntx].userMobile,data.tojobdet.results[cntx].notifCrdat,data.tojobdet.results[cntx].notifCrtim,
						 data.tojobdet.results[cntx].ohdrShortText,data.tojobdet.results[cntx].zzretc,data.tojobdet.results[cntx].zzretn,data.tojobdet.results[cntx].zzrettn,
						 data.tojobdet.results[cntx].zzemai,data.tojobdet.results[cntx].zzgisx,data.tojobdet.results[cntx].zzgisy,data.tojobdet.results[cntx].zzmogisx,data.tojobdet.results[cntx].zzmogisy]

				})
				

			}
			  opMessage("tomeascodes:"+data.tomeascodes.results.length)
			  for(var cntx=0; cntx < data.tomeascodes.results.length ; cntx++)
				{	

					myarray.push({
						'sql': 'INSERT INTO MyJobDetsMPcodes (  code_gp , code , code_text ) VALUES  (?,?,?)', 'data':
							[data.tomeascodes.results[cntx].codeGp , data.tomeascodes.results[cntx].code , data.tomeascodes.results[cntx].codeText]
					})
				}	
			  opMessage("tomeaspoints:"+data.tomeaspoints.results.length)
			  for(var cntx=0; cntx < data.tomeaspoints.results.length ; cntx++)
				{	

					myarray.push({
						'sql': 'INSERT INTO MyJobDetsMPoints (  meas_point , object_id ,object_desc , psort ,pttxt , format ,no_char , no_deci ,code_gp , code , unit_meas ,read_from ) VALUES  (?,?,?,?,?,?,?,?,?,?,?,?)', 'data':
							[data.tomeaspoints.results[cntx].measPoint , data.tomeaspoints.results[cntx].objectId ,data.tomeaspoints.results[cntx].objectDesc , data.tomeaspoints.results[cntx].psort ,
							 data.tomeaspoints.results[cntx].pttxt , data.tomeaspoints.results[cntx].format ,data.tomeaspoints.results[cntx].noChar , data.tomeaspoints.results[cntx].noDeci ,
							 data.tomeaspoints.results[cntx].codeGp , data.tomeaspoints.results[cntx].code , data.tomeaspoints.results[cntx].unitMeas ,data.tomeaspoints.results[cntx].readFrom ]
					})
				}
			  opMessage("tojobloch:"+data.tojobloch.results.length)
			  for(var cntx=0; cntx < data.tojobloch.results.length ; cntx++)
				{	

					myarray.push({
						'sql': 'INSERT INTO MyJobDetsLoch ( orderno,notification_no,not_type,not_date,not_time,not_shtxt,not_order,meter_no,meter_rdg,work_type,order_type,op_txt, order_date,order_status ) VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 'data':
							[ data.tojobloch.results[cntx].order,data.tojobloch.results[cntx].notificationNo,data.tojobloch.results[cntx].notType,data.tojobloch.results[cntx].notDate,
							  data.tojobloch.results[cntx].notTime,data.tojobloch.results[cntx].notShtxt,data.tojobloch.results[cntx].notOrder,data.tojobloch.results[cntx].meterNo,
							  data.tojobloch.results[cntx].meterRdg,data.tojobloch.results[cntx].workType,data.tojobloch.results[cntx].orderType,data.tojobloch.results[cntx].opTxt, 
							  data.tojobloch.results[cntx].orderDate,data.tojobloch.results[cntx].orderStatus  ]
					})
				}	
			  opMessage("todraw_operation:"+data.todraw_operation.results.length)
			  for(var cntx=0; cntx < data.todraw_operation.results.length ; cntx++)
				{	

					myarray.push({
						'sql': 'INSERT INTO MyJobDetsDraw (orderno,zact,zite,zmandatoryfield,zurl,nodeid,fname,mime  ) VALUES  (?,?,?,?,?,?,?,?)', 'data':
							[data.todraw_operation.results[cntx].Orderid,data.todraw_operation.results[cntx].Zactivity,data.todraw_operation.results[cntx].Zitem,
							 data.todraw_operation.results[cntx].Zmandatoryfield,data.todraw_operation.results[cntx].Zurl,data.todraw_operation.results[cntx].Nodeid,
							 data.todraw_operation.results[cntx].Fname,data.todraw_operation.results[cntx].Mime ]
					})
				}
			  opMessage("toequipment:"+data.toequipment.results.length)
			  for(var cntx=0; cntx < data.toequipment.results.length ; cntx++)
				{	

					myarray.push({
						'sql': 'INSERT INTO MyJobsDetsEQ ( equnr,obj_type,obj_type_desc,start_date,manfacture,manparno,manserno,user_status_code,swerk,swerk_desc,profile,device,device_info,install_date, install_loc_desc ) VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 'data':
							[ data.toequipment.results[cntx].equnr,data.toequipment.results[cntx].objType,data.toequipment.results[cntx].objTypeDesc,data.toequipment.results[cntx].startDate,
							  data.toequipment.results[cntx].manfacture,data.toequipment.results[cntx].manparno,data.toequipment.results[cntx].manserno,data.toequipment.results[cntx].userStatusCode,
							  data.toequipment.results[cntx].swerk,data.toequipment.results[cntx].swerkDesc,data.toequipment.results[cntx].profile,data.toequipment.results[cntx].device,
							  data.toequipment.results[cntx].deviceInfo,data.toequipment.results[cntx].installDate,data.toequipment.results[cntx].installLocDesc]
					})
				}
			  opMessage("toattributes:"+data.toattributes.results.length)
			  for(var cntx=0; cntx < data.toattributes.results.length ; cntx++)
				{	

					myarray.push({
						'sql': 'INSERT INTO MyJobsDetsATTR (  equnr,classnum,klassentext,charact,charact_desc,value ) VALUES  (?,?,?,?,?,?)', 'data':
							[ data.toattributes.results[cntx].equnr,data.toattributes.results[cntx].classnum,data.toattributes.results[cntx].klassentext,
							  data.toattributes.results[cntx].charact,data.toattributes.results[cntx].charactDescr,data.toattributes.results[cntx].value ]
					})
				}
			  opMessage("tomeascodes:"+data.tomeascodes.results.length)
			  for(var cntx=0; cntx < data.tomeascodes.results.length ; cntx++)
				{	

					myarray.push({
						'sql': 'INSERT INTO MyJobDetsMeasCodes ( code_gp,code,code_text ) VALUES  (?,?,?)', 'data':
							[ data.tomeascodes.results[cntx].codeGp,data.tomeascodes.results[cntx].code,data.tomeascodes.results[cntx].codeText]
					})
				}
			  opMessage("tocomps:"+data.tocomps.results.length)
			  for(var cntx=0; cntx < data.tocomps.results.length ; cntx++)
				{	

					myarray.push({
						'sql': 'INSERT INTO MyJobDetsComps ( orderno,opno,material,description,ent_qty,com_qty,with_qty,upm,plant, stloc, batch_no,req_date, res_item ) VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?)', 'data':
							[data.tocomps.results[cntx].orderno,data.tocomps.results[cntx].opno,data.tocomps.results[cntx].material,data.tocomps.results[cntx].description,
							 data.tocomps.results[cntx].entQty,data.tocomps.results[cntx].comQty,data.tocomps.results[cntx].withQty,data.tocomps.results[cntx].upm,
							 data.tocomps.results[cntx].plant,data.tocomps.results[cntx]. stloc,data.tocomps.results[cntx]. batchNo,data.tocomps.results[cntx].reqDate,data.tocomps.results[cntx].resItem ]
					})
				}
			  opMessage("toorder_long_text:"+data.toorder_long_text.results.length)
			  for(var cntx=0; cntx < data.toorder_long_text.results.length ; cntx++)
				{	

					myarray.push({
						'sql': 'INSERT INTO MyJobDetsOrderLongText (objtype,objkey,orderno,line_number,format_col,text_line   ) VALUES  (?,?,?,?,?,?)', 'data':
							[ data.toorder_long_text.results[cntx].objtype,data.toorder_long_text.results[cntx].objkey,data.toorder_long_text.results[cntx].order,
							  data.toorder_long_text.results[cntx].lineNumber,data.toorder_long_text.results[cntx].formatCol,data.toorder_long_text.results[cntx].textLine]
					
					})
				}
			  opMessage("toaddress:"+data.toaddress.results.length)
			  for(var cntx=0; cntx < data.toaddress.results.length ; cntx++)
				{	

					myarray.push({
						'sql': 'INSERT INTO MyJobDetsAddress (   orderno,opno,address01,address02,address03,address04,address05,address06,address07,address08,address09,address10,address11,address12,caption01,caption02,caption03,caption04,caption05,caption06,caption07,caption08,caption09,caption10,caption11,caption12) VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 'data':
							[ data.toaddress.results[cntx].orderno,data.toaddress.results[cntx].opno,data.toaddress.results[cntx].address01,data.toaddress.results[cntx].address02,
							  data.toaddress.results[cntx].address03,data.toaddress.results[cntx].address04,data.toaddress.results[cntx].address05,data.toaddress.results[cntx].address06,
							  data.toaddress.results[cntx].address07,data.toaddress.results[cntx].address08,data.toaddress.results[cntx].address09,data.toaddress.results[cntx].address10,
							  data.toaddress.results[cntx].address11,data.toaddress.results[cntx].address12,data.toaddress.results[cntx].caption01,data.toaddress.results[cntx].caption02,
							  data.toaddress.results[cntx].caption03,data.toaddress.results[cntx].caption04,data.toaddress.results[cntx].caption05,data.toaddress.results[cntx].caption06,
							  data.toaddress.results[cntx].caption07,data.toaddress.results[cntx].caption08,data.toaddress.results[cntx].caption09,data.toaddress.results[cntx].caption10,
							  data.toaddress.results[cntx].caption11,data.toaddress.results[cntx].caption12 ]
					})
				}
			  opMessage("tonotification:"+data.tonotification.results.length)
			  for(var cntx=0; cntx < data.tonotification.results.length ; cntx++)
				{	

					myarray.push({
						'sql': 'INSERT INTO MyJobDetsNotifLongText ( objtype,objkey,orderno,line_number,format_col,text_line ) VALUES  (?,?,?,?,?,?)', 'data':
							[data.tonotification.results[cntx].objtype,data.tonotification.results[cntx].objkey,data.tonotification.results[cntx].order,
							 data.tonotification.results[cntx].lineNumber,data.tonotification.results[cntx].formatCol,data.tonotification.results[cntx].textLine ]
					})
				}	
			  opMessage("tojob_order_ops:"+data.tojob_order_ops.results.length)
			  for(var cntx=0; cntx < data.tojob_order_ops.results.length ; cntx++)
				{	

					myarray.push({
						'sql': 'INSERT INTO MyJobDetsOrderOps (orderno,operation,comp_date_time,description,status,name   ) VALUES  (?,?,?,?,?,?)', 'data':
							[ data.tojob_order_ops.results[cntx].orderno,data.tojob_order_ops.results[cntx].operation,data.tojob_order_ops.results[cntx].compDateTime,
							  data.tojob_order_ops.results[cntx].description,data.tojob_order_ops.results[cntx].status,data.tojob_order_ops.results[cntx].name ]
					})
				}
			  opMessage("toicon_priority:"+data.toicon_priority.results.length)
			  for(var cntx=0; cntx < data.toicon_priority.results.length ; cntx++)
				{	

					myarray.push({
						'sql': 'INSERT INTO MyJobDetsIconPriority ( orderno,opno,icon_filename,tooltip,tooltip_desc,command ) VALUES  (?,?,?,?,?,?)', 'data':
							[data.toicon_priority.results[cntx].orderid,data.toicon_priority.results[cntx].opno,data.toicon_priority.results[cntx].iconFilename,
							 data.toicon_priority.results[cntx].tooltip,data.toicon_priority.results[cntx].tooltipDesc,data.toicon_priority.results[cntx].command ]
					})
				}	
			  opMessage("toicon_job:"+data.toicon_job.results.length)
			  for(var cntx=0; cntx < data.toicon_job.results.length ; cntx++)
				{	

					myarray.push({
						'sql': 'INSERT INTO MyJobDetsIconJob ( orderno,opno,icon_type,icon_position,icon_filename,icon_txt,tooltip,tooltip_desc,command,grid,grid_vals ) VALUES  (?,?,?,?,?,?,?,?,?,?,?)', 'data':
							[data.toicon_job.results[cntx].orderid,data.toicon_job.results[cntx].opno,data.toicon_job.results[cntx].iconType,data.toicon_job.results[cntx].iconPosition,
							 data.toicon_job.results[cntx].iconFilename,data.toicon_job.results[cntx].iconTxt,data.toicon_job.results[cntx].tooltip,
							 data.toicon_job.results[cntx].tooltipDesc,data.toicon_job.results[cntx].command,data.toicon_job.results[cntx].grid,data.toicon_job.results[cntx].gridVals ]
					})
				}	
			  opMessage("toordtimeconf:"+data.toordtimeconf.results.length)
			  for(var cntx=0; cntx < data.toordtimeconf.results.length ; cntx++)
				{	

					myarray.push({
						'sql': 'INSERT INTO MyTimeConfs (orderno , opno,type, confno , description , date , time , enddate, endtime, duration, empid, final,user) VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?)', 'data':
							[data.toordtimeconf.results[cntx].orderNo,  data.toordtimeconf.results[cntx].activity,
							 data.toordtimeconf.results[cntx].actType,  data.toordtimeconf.results[cntx].confNo,
							 data.toordtimeconf.results[cntx].confText, data.toordtimeconf.results[cntx].startDate,
							 data.toordtimeconf.results[cntx].startTime,data.toordtimeconf.results[cntx].endDate,
							 data.toordtimeconf.results[cntx].endTime,  data.toordtimeconf.results[cntx].actualDur,
							 data.toordtimeconf.results[cntx].persNo,   data.toordtimeconf.results[cntx].complete,
							 data.toordtimeconf.results[cntx].user]
					})
				}	
			  
			  
			  
			  
				html5sql.process(
						myarray
						,
						function(){
							 opMessage("Jobdetails dobne")
						},
						function(error, statement){
							opMessage("Error: " + error.message + " when inserting MyJobDetails" + statement);
						}        
				);

			


		}
}


function syncUploadAzure(id,type){
// ToDo FileRequest,FileDownload,EOD,JobClose	
//Notif Create needs ......obHeader["Assignment"] needs the selected User from the Create Screen	
	
	

	var c040="NA"	
		var d040=""		
			var c060="NA"	
				var d060=""	
					var c100="NA"	
						var d100=""
							var 	formalsampletaken = ""	
								var 	upstreamsenttolab= ""
									var 	ptofdiscsenttolab= ""
										var 	downstream1senttolab= ""
											var 	downstream2senttolab= ""
												var 	downstream3senttolab= ""

//AZURE need to fix the following													
//													if(checkConnection()=='No network connection'){
//														return
//													}

	user=localStorage.getItem("MobileUser")
	empid=localStorage.getItem("EmployeeID")
	var newDets="";
	var currentUser="";
	syncDetsSet=false;
	var codeval
	SAPServerPrefix=$.trim(localStorage.getItem('ServerName'));
	sapCalls = 0;
	if (!CheckSyncInterval('UPLOAD')){
		console.log("upload interval not met")
		return; }
	if (localStorage.getItem("SAPCalling")=="true"){
		console.log("SAP is being Called")
		return
	}
	//opMessage("Synchronizing Upload Data");
	console.log(id+"-----"+type)	
	var syncDetails = false	;
	html5sql.process(
			"SELECT * from MyUserDets",
			function(transaction, results, rowsArray){
				if( rowsArray.length > 0) {
					curremtUser="&username="+rowsArray[0].user;
					SAPServerSuffix="?jsonCallback=?&MYJOBSSYSTEM="+localStorage.getItem('SAPSystem')+"&sap-client="+localStorage.getItem('SAPClient')+"&sap-user="+rowsArray[0].user+"&sap-password="+rowsArray[0].password;
// Need data set up
					if(type=="VehicleCheck")// Process Vehicle Defects
					{
						html5sql.process("SELECT * from MyVehicleCheck where id = '"+id+"'",
								function(transaction, results, rowsArray){
							if( rowsArray.length > 0) {
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", VehicleCheck:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"VehicleCheck:"+String(rowsArray.length));
								}
								if(!syncDetsSet){
									syncDetsSet=true;
									SetLastSyncDetails("LASTSYNC_UPLOAD");

								}
								item = rowsArray[0];
								if(item['desc'].length<1){
									codeval='Y'
								}else{
									codeval='N'	
								}

								newVehicleCheck='&MEAS_POINT='+item['mpoint']+'&MEAS_EQUIP='+item['equipment']+'&MEAS_DATE='+item['mdate']+'&MEAS_TIME='+item['mtime']+
								'&MEAS_TEXT='+item['desc']+'&MEAS_LONG_TEXT='+item['longtext']+'&RECNO='+item['id']+
								'&MEAS_READ_BY='+item['mreadby']+'&USER='+item['user']+'&MEAS_READING='+item['mileage']+'&MEAS_VAL_CODE='+codeval;
								var myjson = {};

								myjson["NotifNo"]= "";
								myjson["MeasDoc"]= "";
								myjson["ErrType"]= "";
								myjson["NotifType"]= "ZV";
								myjson["CheckType"]= "";
								myjson["User"]= item['user'];
								myjson["MeasCodeGrp"]= "";
								myjson["MeasReadBy"]= item['mreadby'];
								myjson["MeasLongText"]= item['longtext'];
								myjson["MeasText"]= item['desc'];
								myjson["MeasValCode"]= codeval;								
								myjson["MeasTime"]= item['mtime'];
								myjson["MeasDate"]= item['mdate'];
								myjson["MeasEquip"]= item['equipment'];
								myjson["MeasPoint"]= item['mpoint'];
								myjson["MeasPointCat"]= "M";
								
								
								

								sapCalls+=1;

								html5sql.process("UPDATE MyVehicleCheck SET state = 'SENDING' WHERE id='"+item['id']+"'",
										function(){
									if(item['reg'].length<1){
										myjson["MeasReading"]=""
										postAzureData("ZGW_MAM30_VEHICLE_SRV_VehicleChkUpd", myjson,"UPDATE MyVehicleCheck SET state = 'NEW' WHERE id='"+item['id']+"'",item['id']);
										
									}else{
										myjson["MeasReading"]=item['mileage']
										postAzureData("ZGW_MAM30_VEHICLE_SRV_VehicleChkUpd", myjson,"UPDATE MyVehicleCheck SET state = 'NEW' WHERE id='"+item['id']+"'",item['id']);
										
									}



								},
								function(error, statement){

									opMessage("Error: " + error.message + " when processing " + statement);
								}        
								);

							}
						},
						function(error, statement){

							opMessage("Error: " + error.message + " when processing " + statement);
						});
					}
//done in azure
					if(type=="NotificationsZ7")// Process New Notifications	EOD		
					{					

						html5sql.process("SELECT * from MyNotifications where id = '"+id+"'",
								function(transaction, results, rowsArray){
							if( rowsArray.length > 0) {
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", EOD:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"EOD:"+String(rowsArray.length));
								}
								if(!syncDetsSet){
									syncDetsSet=true;
									SetLastSyncDetails("LASTSYNC_UPLOAD");

								}

								item = rowsArray[0];
								
								
								opMessage("New EOD Notifications Details");
								var myjson = {};
							    var header = {};
							    header["BreakDown"] = "";
							    header["EquipStatus"] = "";
							    header["UserId"] = localStorage.getItem('MobileUser');
							    header["AssigToMe"] = "";
							    header["SpecReqt"] = "";
							    header["Assignment"] = "";
							    header["ReportedBy"] = localStorage.getItem('EmployeeID');
							    header["Priority"] = "";
							    header["PriorityType"] = "";
							    header["ActiivityText"] = "";
							    header["ActivityCode"] = "";
							    header["ActivityCodeGrp"] = "";
							    header["ActCatType"] = "";
							    header["EndTime"] = "";
							    header["EndDate"] = "";
							    header["FuncLoc"] = "";
							    header["Equipment"] = "";
							    header["CodeGroup"] = "";
							    header["StartTime"] = "";
							    header["Coding"] = "";
							    header["ShortText"] = item['shorttext'];
							    header["LongText"] = "";
							    header["StartDate"] = ""

							    myjson["Header"] = header;

							    //myjson["Abcindic"] = "";
							    //myjson["FunclocCreate"] = "";
							    //myjson["FunclocDesc"] = "";
							    //myjson["FunclocDisp"] = "";
							    //myjson["FunctLoc"] = "";
							    //myjson["Notiftmez"] = "";
							    //myjson["SalesGrp"] = "";
							    //myjson["SalesOffice"] = "";
							    //myjson["Devicedata"] = "";
							    //myjson["DeleteFlag"] = "";
							    //myjson["Serialno"] = "";
							    //myjson["PmWkctr"] = "";
							    //myjson["CatType"] = "";
							    //myjson["AddrNumber"] = "";
							    //myjson["DistrChan"] = "";
							    //myjson["SalesOrg"] = "";
							    //myjson["Division"] = "";
							    //myjson["PurchDate"] = "";
							    //myjson["PurchNoC"] = "";
							    //myjson["SalesOrd"] = "";
							    //myjson["Reftime"] = "";
							    //myjson["Refdate"] = "";
							    //myjson["Longtxtexist"] = "";
							    //myjson["NotifNo"] = "";
							    //myjson["Prilang"] = "";
							    //myjson["Planplant"] = "";
							    //myjson["LocAcc"] = "";
							    //myjson["EquipmentDesc"] = "";
							    //myjson["Catprofile"] = "";
							    //myjson["EquipmentCreate"] = "";
							    //myjson["Assembly"] = "";
							    //myjson["AssemblyDesc"] = "";
							    //myjson["Comptime"] = "";
							    //myjson["Breakdown"] = "";
							    //myjson["Strmlfndate"] = "";
							    //myjson["Endmlfndate"] = "";
							    //myjson["Compdate"] = "";
							    //myjson["Strmlfntime"] = "";
							    //myjson["Endmlfntime"] = "";
							    //myjson["Downtime"] = "";
							    //myjson["ObjectNo"] = "";
							    //myjson["Unit"] = "";
							    //myjson["IsocodeUnit"] = "";
							    //myjson["Plangroup"] = "";
							    //myjson["CustNo"] = "";
							    //myjson["Mntplan"] = "";
							    //myjson["MntcallNo"] = "";
							    //myjson["Maintitem"] = "";
							    //myjson["MatlDesc"] = "";
							    myjson["ShortText"] = item['shorttext'];
							    //myjson["Priotype"] = "";
							    //myjson["Priority"] = "";
							    //myjson["Material"] = "";
							    //myjson["Notiftime"] = "";
							    //myjson["NotifDate"] = "";
							    myjson["Reportedby"] = localStorage.getItem('EmployeeID');
							    //myjson["Orderid"] = "";
							    //myjson["Desstdate"] = "";
							    //myjson["Dessttime"] = "";
							    //myjson["Desenddate"] = "";
							    //myjson["Desendtm"] = "";
							    //myjson["Sortfield"] = "";
							    //myjson["Maintplant"] = "";
							    //myjson["Maintloc"] = "";
							    //myjson["Maintroom"] = "";
							    //myjson["Plsectn"] = "";
							    //myjson["PpWkctr"] = "";
							    //myjson["BusArea"] = "";
							    //myjson["CoArea"] = "";
							    //myjson["Costcenter"] = "";
							    //myjson["WbsElement"] = "";
							    //myjson["AssetNo"] = "";
							    //myjson["SubNumber"] = "";
							    //myjson["Stdgord"] = "";
							    //myjson["Stlmtorder"] = "";
							    //myjson["CompCode"] = "";
							    //myjson["SalesOrgLocAcc"] = "";
							    //myjson["DivisionLocAcc"] = "";
							    //myjson["DistChanLocAcc"] = "";
							    //myjson["AddrNoLocAcc"] = "";
							    //myjson["DocNumber"] = "";
							    //myjson["ItmNumber"] = "";
							    //myjson["Scenario"] = "";
							    //myjson["Refobjecttype"] = "";
							    //myjson["Refobjectkey"] = "";
							    //myjson["Refreltype"] = "";
							    //myjson["XaStatProf"] = "";
							    //myjson["MnWkCtr"] = "";
							    //myjson["Plant"] = "";
							    //myjson["EnhancementFlag"] = "";
							    //myjson["EquipmentDisplay"] = "";
							    //myjson["FunclocDisplay"] = "";
							    //myjson["NotifSortno"] = "";
							    //myjson["NotifPushed"] = "";
							    //myjson["NotifNoDisplay"] = "";
							    //myjson["OrderidDisplay"] = "";
							    myjson["ActCatTyp"] = "A";
							    myjson["ActCodegrp"] = "DENDTRVL";
							    myjson["ActCode"] = "DE01";
							    //myjson["ActText"] = "";
							    //myjson["MessageType"] = "";
							    //myjson["Message"] = "";
							    myjson["NotifType"] = item['type'];
							    myjson["ActStartDate"] = item['startdate'];
							    myjson["ActStartTime"] = item['starttime'];
							    myjson["ActEndDate"] = item['enddate'];
							    myjson["ActEndTime"] = item['endtime'];
							    myjson["User"] =localStorage.getItem('MobileUser');
							    //myjson["Equip"] = "";
							    //myjson["Descript"] = "";
							    //myjson["Dcattyp"] = "";
							    //myjson["DcodeGrp"] = "";
							    //myjson["Dcode"] = "";
							    //myjson["DLCatTyp"] = "";
							    //myjson["DLCodeGrp"] = "";
							    //myjson["DLCode"] = "";
							    //myjson["CauseText"] = "";
							    //myjson["CauseCatTyp"] = "";
							    //myjson["CauseCodeGrp"] = "";
							    //myjson["CauseCode"] = ""


							    //postAzureData("ZGW_MAM30_NOTIFICATION_NotifHeader", myjson)

								sapCalls+=1;
								n=rowsArray.length
								html5sql.process("UPDATE MyNotifications SET notifno = 'SENDING' WHERE id='"+item['id']+"'",
										function(){
									postAzureData("ZGW_MAM30_NOTIFICATION_NotifHeaderCreate", myjson,"UPDATE MyNotifications SET notifno = 'NEW' WHERE id='"+item['id']+"'",item['id']);

								},
								function(error, statement){

									opMessage("Error: " + error.message + " when processing " + statement);
								}        
								);
							}

						},
						function(error, statement){

							opMessage("Error: " + error.message + " when processing " + statement);
						});
					}
//done in Azure
					if(type=="Notifications")// Process New Notifications		
					{	
//obHeader["Assignment"] needs the selected User from the Create Screen
						html5sql.process("SELECT * from MyNotifications where id = '"+id+"'",
								function(transaction, results, rowsArray){
							if( rowsArray.length > 0) {
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", Notifications:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"Notifications:"+String(rowsArray.length));
								}
								if(!syncDetsSet){
									syncDetsSet=true;
									SetLastSyncDetails("LASTSYNC_UPLOAD");

								}

								item = rowsArray[0];
								
								+'&ID='+item['id'];
								
								
								var myjson = {};
								var jobHeader = {};
								jobHeader["BreakDown"] = "";
								jobHeader["EquipStatus"] = "";
								jobHeader["UserId"] = localStorage.getItem('MobileUser');
								jobHeader["AssigToMe"] = item['assigntome'];
								jobHeader["SpecReqt"] = "";
								jobHeader["Assignment"] = "";
								jobHeader["ReportedBy"] = localStorage.getItem('EmployeeID');
								jobHeader["Priority"] = "";
								jobHeader["PriorityType"] = "";
								jobHeader["ActiivityText"] = "";
								jobHeader["ActivityCode"] = "";
								jobHeader["ActivityCodeGrp"] = "";
								jobHeader["ActCatType"] = "";
								jobHeader["EndTime"] = item['starttime'];
								jobHeader["EndDate"] = item['startdate'];
								jobHeader["FuncLoc"] = item['funcloc'];
								jobHeader["Equipment"] = item['equipment'];
								jobHeader["CodeGroup"] = item['pgroup'];
								jobHeader["StartTime"] = item['starttime'];
								jobHeader["Coding"] = item['pcode'];
								jobHeader["ShortText"] = item['shorttext'];
								jobHeader["LongText"] = item['longtext'];
								jobHeader["StartDate"] = item['startdate']
								myjson["JobHeader"] = jobHeader;
								myjson["Message"] = "";
								myjson["Qmart"] = item['type'];
								myjson["Messagetype"] = ""


								
								sapCalls+=1;
								n=rowsArray.length
								html5sql.process("UPDATE MyNotifications SET notifno = 'SENDING' WHERE id='"+item['id']+"'",
										function(){
									postAzureData("ZGW_MAM30_NOTIFICATION_CreateNewJob", myjson,"UPDATE MyNotifications SET notifno = 'NEW' WHERE id='"+item['id']+"'",item['id']);

								},
								function(error, statement){

									opMessage("Error: " + error.message + " when processing " + statement);
								}        
								);
							}

						},
						function(error, statement){

							opMessage("Error: " + error.message + " when processing " + statement);
						});
					}
//Done in Azure
					if(type=="StatusUpdate")// Process Status Updates			
					{														
						html5sql.process("SELECT * from MyStatus where id = '"+id+"'",
								function(transaction, results, rowsArray){
							if( rowsArray.length > 0) {
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", Status:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"Status:"+String(rowsArray.length));
								}
								if(!syncDetsSet){
									syncDetsSet=true;
									SetLastSyncDetails("LASTSYNC_UPLOAD");

								}
								
								
								
								
								item = rowsArray[0];
								var myjson = {};
								myjson["Message"] = "";
								
								myjson["UserId"] = localStorage.getItem('MobileUser');
								myjson["ActTime"] = item['acttime'];
								myjson["ActDate"] = item['actdate'].substring(8,10)+"."+item['actdate'].substring(5,7)+"."+item['actdate'].substring(0,4);
								myjson["InactiveStat"] = "";
								myjson["OpNo"] = item['opno'];
								myjson["OrderNo"] = item['orderno'];
								myjson["Status"] = item['status'];
								myjson["Stsma"] = "";
								
								sapCalls+=1;							
								n = rowsArray.length
								html5sql.process("UPDATE MyStatus SET state = 'SENDING' where id='"+item['id']+"'",
										function(){
									postAzureData("ZGW_MAM30_SET_OP_STATUS_ORDER", myjson,"UPDATE MyStatus SET state = 'NEW' where id='"+item['id']+"'",item['id'])		
									

								},
								function(error, statement){

									opMessage("Error: " + error.message + " when processing " + statement);
								}        
								);
							}

						},
						function(error, statement){

							opMessage("Error: " + error.message + " when processing " + statement);
						});
					}
					if(type=="FileRequest")// Process Status Updates			
					{		

						html5sql.process("SELECT * from MyJobDetsDraw where id = '"+id+"'",
								function(transaction, results, rowsArray){
							if( rowsArray.length > 0) {
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", FileRequest:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"FileRequest:"+String(rowsArray.length));
								}
								if(!syncDetsSet){
									syncDetsSet=true;
									SetLastSyncDetails("LASTSYNC_UPLOAD");

								}

								item = rowsArray[0];
								if(item['zact'].length<4){
									opno="0010"
								}else{
									opno=item['opno']
								}
								params='?reqname='+localStorage.getItem('MobileUser')+item['orderno']+opno+item['id']+".xml"+"&id="+item['id']+
								'&orderno='+parseInt(item['orderno'], 10)+'&opno='+opno+'&user='+localStorage.getItem('MobileUser')+'&scenario=Y008'+'&scenariodesc=Y008Desc'+'&mname='+localStorage.getItem('MobileUser')+'&nodeid='+trim(item['nodeid'])
								opMessage("File Request="+params);

								sapCalls+=1;							
								n = rowsArray.length
								html5sql.process("UPDATE MyJobDetsDraw SET zurl = 'WaitingLiveLink' where id='"+item['id']+"'",
										function(){
									
									buildJobDocsTable();
									requestAzureData("DocumentService", myjson,'MYJOBSFileRequest.php'+params,"UPDATE MyJobDetsDraw SET zurl = 'RequestLiveLink' where id='"+item['id']+"'",item['id'])	
								},
								function(error, statement){

									opMessage("Error: " + error.message + " when processing " + statement);
								}        
								);
							}

						},
						function(error, statement){

							opMessage("Error: " + error.message + " when processing " + statement);
						});
					}
					if(type=="FileDownload")// Process LLDownloads			
					{			

						html5sql.process("SELECT * from MyJobDetsDraw where id = '"+id+"'",
								function(transaction, results, rowsArray){

							if( rowsArray.length > 0) {
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", FileDownload:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"FileDownload:"+String(rowsArray.length));
								}

								if(!syncDetsSet){
									syncDetsSet=true;
									SetLastSyncDetails("LASTSYNC_UPLOAD");

								}

								dir="MyJobs/User/"+localStorage.getItem('MobileUser')+"/"+parseInt(rowsArray[0]['orderno'],10).toString()+"-0010"
								fname=rowsArray[0]['fname']


								sapCalls+=1;							
								n = rowsArray.length
								html5sql.process("UPDATE MyJobDetsDraw SET zurl = 'DownloadingLiveLink' where id='"+rowsArray[0]['id']+"'",
										function(){
									buildJobDocsTable();
									downlodRequestedFile(dir,fname,rowsArray[0]['id'])
								},
								function(error, statement){

									opMessage("Error: " + error.message + " when processing " + statement);
								}        
								);
							}

						},
						function(error, statement){

							opMessage("Error: " + error.message + " when processing " + statement);
						});
					}
//
					if(type=="JobClose")// Process Close Jobs			
					{														

						html5sql.process("SELECT * from MyJobClose where id = '"+id+"'",	
								function(transaction, results, rowsArray){
							if( rowsArray.length > 0) {
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", Close:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"Close:"+String(rowsArray.length));
								}
								if(!syncDetsSet){
									syncDetsSet=true;
									SetLastSyncDetails("LASTSYNC_UPLOAD");

								}

								item = rowsArray[0];

								
								
								

								var myjson = {};
							    var header = {};
							   
							    header["BreakDown"] = "";
							    header["EquipStatus"] = "";
							    header["UserId"] = localStorage.getItem('MobileUser');
							    header["AssigToMe"] = "";
							    header["SpecReqt"] = "";
							    header["Assignment"] = "";
							    header["ReportedBy"] = "";
							    header["Priority"] = "";
							    header["PriorityType"] = "";
							    header["ActiivityText"] = "";
							    header["ActivityCode"] = "";
							    header["ActivityCodeGrp"] = "";
							    header["ActCatType"] = "";
							    header["EndTime"] = "";
							    header["EndDate"] = "";
							    header["FuncLoc"] = item['funcloc'];
							    header["Equipment"] = item['equipment'];
							    header["CodeGroup"] = "";
							    header["StartTime"] = "";
							    header["Coding"] = "";
							    header["ShortText"] = "";
							    header["LongText"] = item['details'];
							    header["StartDate"] = ""

							    myjson["Header"] = header;

							    //myjson["Abcindic"] = "";
							    //myjson["FunclocCreate"] = "";
							    //myjson["FunclocDesc"] = "";
							    //myjson["FunclocDisp"] = "";
							    //myjson["FunctLoc"] = "";
							    //myjson["Notiftmez"] = "";
							    //myjson["SalesGrp"] = "";
							    //myjson["SalesOffice"] = "";
							    //myjson["Devicedata"] = "";
							    //myjson["DeleteFlag"] = "";
							    //myjson["Serialno"] = "";
							    //myjson["PmWkctr"] = "";
							    //myjson["CatType"] = "";
							    //myjson["AddrNumber"] = "";
							    //myjson["DistrChan"] = "";
							    //myjson["SalesOrg"] = "";
							    //myjson["Division"] = "";
							    //myjson["PurchDate"] = "";
							    //myjson["PurchNoC"] = "";
							    //myjson["SalesOrd"] = "";
							    //myjson["Reftime"] = "";
							    //myjson["Refdate"] = "";
							    //myjson["Longtxtexist"] = "";
							    
							    myjson["NotifNo"] = item['notifno'];
							    //myjson["Prilang"] = "";
							    //myjson["Planplant"] = "";
							    //myjson["LocAcc"] = "";
							    //myjson["EquipmentDesc"] = "";
							    //myjson["Catprofile"] = "";
							    //myjson["EquipmentCreate"] = "";
							    //myjson["Assembly"] = "";
							    //myjson["AssemblyDesc"] = "";
							    //myjson["Comptime"] = "";
							    //myjson["Breakdown"] = "";
							    //myjson["Strmlfndate"] = "";
							    //myjson["Endmlfndate"] = "";
							    //myjson["Compdate"] = "";
							    //myjson["Strmlfntime"] = "";
							    //myjson["Endmlfntime"] = "";
							    //myjson["Downtime"] = "";
							    //myjson["ObjectNo"] = "";
							    //myjson["Unit"] = "";
							    //myjson["IsocodeUnit"] = "";
							    //myjson["Plangroup"] = "";
							    //myjson["CustNo"] = "";
							    //myjson["Mntplan"] = "";
							    //myjson["MntcallNo"] = "";
							    //myjson["Maintitem"] = "";
							    //myjson["MatlDesc"] = "";
							    //myjson["ShortText"] = "";
							    //myjson["Priotype"] = "";
							    //myjson["Priority"] = "";
							    //myjson["Material"] = "";
							    //myjson["Notiftime"] = "";
							    //myjson["NotifDate"] = "";
							    //myjson["Reportedby"] = "";
							    //myjson["Orderid"] = "";
							    //myjson["Desstdate"] = "";
							    //myjson["Dessttime"] = "";
							    //myjson["Desenddate"] = "";
							    //myjson["Desendtm"] = "";
							    //myjson["Sortfield"] = "";
							    //myjson["Maintplant"] = "";
							    //myjson["Maintloc"] = "";
							    //myjson["Maintroom"] = "";
							    //myjson["Plsectn"] = "";
							    //myjson["PpWkctr"] = "";
							    //myjson["BusArea"] = "";
							    //myjson["CoArea"] = "";
							    //myjson["Costcenter"] = "";
							    //myjson["WbsElement"] = "";
							    //myjson["AssetNo"] = "";
							    //myjson["SubNumber"] = "";
							    //myjson["Stdgord"] = "";
							    //myjson["Stlmtorder"] = "";
							    //myjson["CompCode"] = "";
							    //myjson["SalesOrgLocAcc"] = "";
							    //myjson["DivisionLocAcc"] = "";
							    //myjson["DistChanLocAcc"] = "";
							    //myjson["AddrNoLocAcc"] = "";
							    //myjson["DocNumber"] = "";
							    //myjson["ItmNumber"] = "";
							    //myjson["Scenario"] = "";
							    //myjson["Refobjecttype"] = "";
							    //myjson["Refobjectkey"] = "";
							    //myjson["Refreltype"] = "";
							    //myjson["XaStatProf"] = "";
							    //myjson["MnWkCtr"] = "";
							    //myjson["Plant"] = "";
							    //myjson["EnhancementFlag"] = "";
							    //myjson["EquipmentDisplay"] = "";
							    //myjson["FunclocDisplay"] = "";
							    //myjson["NotifSortno"] = "";
							    //myjson["NotifPushed"] = "";
							    //myjson["NotifNoDisplay"] = "";
							    //myjson["OrderidDisplay"] = "";
							    //myjson["ActCatTyp"] = "A";
							    //myjson["ActCodegrp"] = "DENDTRVL";
							    //myjson["ActCode"] = "DE01";
							    //myjson["ActText"] = "";
							    //myjson["MessageType"] = "";
							    //myjson["Message"] = "";
							    //myjson["NotifType"] = item['type'];
							    //myjson["ActStartDate"] = item['startdate'];
							    //myjson["ActStartTime"] = item['starttime'];
							    //myjson["ActEndDate"] = item['enddate'];
							    //myjson["ActEndTime"] = item['endtime'];
							    //myjson["User"] = "";
							    //myjson["Equip"] = "";
							    //myjson["Descript"] = "";
							    myjson["Dcattyp"] = "R";
							    myjson["DcodeGrp"] = item['agrp'];
							    myjson["Dcode"] = item['acode'];
							    myjson["DLCatTyp"] = "P";
							    myjson["DLCodeGrp"] = item['pgrp'];
							    myjson["DLCode"] = item['pcode'];
							    myjson["CauseText"] = "";
							    myjson["CauseCatTyp"] ="S";
							    myjson["CauseCodeGrp"] = item['igrp'];
							    myjson["CauseCode"] = item['icode'];





								opMessage("Close Notif Update Details");


								sapCalls+=1;		

								html5sql.process("UPDATE MyJobClose SET state = 'SENDING' WHERE id='"+item['id']+"'",
										function(){

									if (item['notifno'].length>5){

										postAzureData("ZGW_MAM30_NOTIFICATION_NotifHeaderUpdate", myjson,"UPDATE MyJobClose SET state = 'NEW' WHERE id='"+item['id']+"'",item['id']);

									}

								},
								function(error, statement){
									// alert("Error: " + error.message + " when processing " + statement);
									opMessage("Error: " + error.message + " when processing " + statement);
								}        
								);
							}

						},
						function(error, statement){

							opMessage("Error: " + error.message + " when processing " + statement);
						});
					}
					if(type=="Flooding")// Flooding Form			
					{		


						sqlstatement="SELECT * from myformsresponses where  id = '"+id+"'",	

						html5sql.process(sqlstatement,
								function(transaction, results, rowsArray){

							if(rowsArray.length>0){

								jsonstr=$.parseJSON(unescape(rowsArray[0].contents))
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", Flooding:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"Flooding:"+String(rowsArray.length));
								}
								if(!syncDetsSet){
									syncDetsSet=true;
									SetLastSyncDetails("LASTSYNC_UPLOAD");

								}




								item = rowsArray[0];


								 
								 myjson["I_LONG_TEXT"] = "",
								 myjson["I_NOTIF_NO"] = rowsArray[0].notifno,
								 myjson["I_TYPE"] = "D",
								 myjson["I_OPTION"] = "C",
								 myjson["I_SETORDER_DG5"] = "X",
								 myjson["I_USERID"] = "POSTRIDGE2",
								 myjson["toText"] = []
								var pdepth="";
								var pitem="";


							  var ToTlineItem = [];
								var tlineItem = {};
									

								


								locsArray = [""]

								for(var cnt=0; cnt < jsonstr[0].location.length ; cnt++)
								{
									if(cnt>0){
										pitem+=","
									}
									row=cnt+1;	
									litenno = row *10;
									litem = ("0000" + litenno).slice(-4)
									type=jsonstr[0].location[cnt]["loctype-"+row].split(":")
									subtype=jsonstr[0].location[cnt]["locsubtype-"+row].split(":")
									severity=jsonstr[0].location[cnt]["locseverity-"+row].split(":")
									floc=jsonstr[0].location[cnt]["locfloc-"+row].split(":")
									comments=jsonstr[0].location[cnt]["loccomments-"+row].split(":")
									tlineItem["Depth"] = "1.00",
								    tlineItem["Severity"] = severity[0],
								    tlineItem["Zaselect"] = "",
								    tlineItem["Zacomm"] = comments[0],
								    tlineItem["Zagrdrf"] = "",
								    tlineItem["City1"] = "",
								    tlineItem["Zaposcd"] = "",
								    tlineItem["Zapltxt"] = "",
								    tlineItem["Zaparish"] = "",
								    tlineItem["StrSuppl2"] = "",
								    tlineItem["City2"] = "",
								    tlineItem["Zahouse"] = "",
								    tlineItem["Zastreet"] = "",
								    tlineItem["Zadlindl"] = "",
								    tlineItem["Zapymdn"] = "",
								    tlineItem["Zapyrdat"] = "",
								    tlineItem["Zapymrq"] = "",
								    tlineItem["Zapymd"] = "",
								    tlineItem["Zaincident"] = "",
								    tlineItem["Zatplnr"] = floc[0],
								    tlineItem["Zafsty"] = subtype[0],
								    tlineItem["Zaftyp"] = type[0],
								    tlineItem["Zaitem"] = litem,
								    tlineItem["Aufnr"] = rowsArray[0].orderno
								    ToTlineItem.push(tlineItem);									
									locsArray.push(floc[0])
									//alert("Loc:"+orderno+','+litem+","+type[0]+","+subtype[0]+","+floc[0])
								}
								myjson["toTlineItem"] = ToTlineItem;
								roomsArray=[]
								for(var cnt=0; cnt < jsonstr[0].room.length ; cnt++)
								{
									row=cnt+1;	
									loc=jsonstr[0].room[cnt]["roomloc-"+row].split(":")
									room=jsonstr[0].room[cnt]["roomroom-"+row].split(":")
									depth=jsonstr[0].room[cnt]["roomdepth-"+row].split(":")
									comments=jsonstr[0].room[cnt]["roomcomments"+row].split(":")

									roomsArray.push(loc[0]+"|"+room[0]+"|"+depth[0]+"|"+comments[0])


								}
								roomsArray.sort();
								var pdepth="";
								var wasitem=0;
								dno=1;
							    var ToTimeDepth = [];
								var timeDepth = {};
								for(var cnt=0; cnt < roomsArray.length ; cnt++)
								{
									if(cnt>0){
										pdepth+=","
									}
									theroom = roomsArray[cnt].split("|");
									row=cnt+1;	
									loc=theroom[0]
									litemno = row *10;
									f1=locsArray.indexOf(loc);
									if (f1!=wasitem){
										wasitem = f1;
										dno=1;
									}else{
										dno++;
									}
									litem=("0000" + f1*10).slice(-4)
									ditem=("0000" + dno*10).slice(-4)

									room=theroom[1]
									depth=theroom[2]
									comments=theroom[3]

									
									timeDepth["Zaselect"] = "",
									 timeDepth["Comments"] = comments,
									 timeDepth["Zdpridcdx"] = "",
									 timeDepth["Zdepthcd"] = depth,
									 timeDepth["Zdprircdx"] = "",
									 timeDepth["Zroomcd"] = room,
									 timeDepth["Zaditem"] = ditem,
									 timeDepth["Zaitem"] = litem,
									 timeDepth["Aufnr"] = rowsArray[0].orderno
									 ToTimeDepth.push(timeDepth);



								}	
								 
								 

								 myjson["toTimeDepth"] = ToTimeDepth;
								 
								//need to populate the PHDR
								//sort date & time formats
								gridref=jsonstr[0].gridref.split(",");
								if(gridref.length>1){
									ENRef=gridref[0].substring(0,9)+":"+gridref[1].substring(0,9)
								}else{
									ENRef=gridref
								}
								jsonstr[0].floodtime=jsonstr[0].floodtime+":00"
								jsonstr[0].attendancetime=jsonstr[0].attendancetime+":00"
								flooddate=jsonstr[0].flooddate.substring(6,10)+jsonstr[0].flooddate.substring(3,5)+jsonstr[0].flooddate.substring(0,2)
								floodtime=jsonstr[0].floodtime.substring(0,2)+jsonstr[0].floodtime.substring(3,5)+jsonstr[0].floodtime.substring(6,8)
								attenddate=jsonstr[0].attendancedate.substring(6,10)+jsonstr[0].attendancedate.substring(3,5)+jsonstr[0].attendancedate.substring(0,2)
								attendtime=jsonstr[0].attendancetime.substring(0,2)+jsonstr[0].attendancetime.substring(3,5)+jsonstr[0].attendancetime.substring(6,8)

								var i_HDR = {};
								i_HDR["Zarootca"] = jsonstr[0].rootcause,
								i_HDR["Zaflsrc"] = jsonstr[0].floodingsource,
								i_HDR["Zaipflcd"] = jsonstr[0].previousflooding,
								i_HDR["Zaatwea"] = jsonstr[0].attendanceweather,
								i_HDR["Zaattim"] = attendtime,
								i_HDR["Zaatdat"] = attenddate,
								i_HDR["Zaspill"] = jsonstr[0].spillsize,
								i_HDR["Zacomm"] = "",
								i_HDR["Aenam"] = "",
								i_HDR["Aedat"] = "",
								i_HDR["Ernam"] = user,
								i_HDR["Erdat"] = getShortSAPDate(),
								i_HDR["Zacomp"] = empid,
								i_HDR["Zaintim"] = floodtime,
								i_HDR["Zaindat"] = flooddate,
								i_HDR["Zadlindh"] = "",
								i_HDR["Zaefgr"] = ENRef,
								i_HDR["Zacacd"] = jsonstr[0].causeofflood,
								i_HDR["Zapsas"] = jsonstr[0].psshortcode,
								i_HDR["Zaaref"] = jsonstr[0].assetref.trim(),
								i_HDR["Aufnr"] = rowsArray[0].orderno
								myjson["I_HDR"] = i_HDR;

								







								sapCalls+=1;		

								html5sql.process("UPDATE myformsresponses SET lastupdated = 'SENDING' WHERE id='"+item['id']+"'",
										function(){

									postAzureData("ZGW_MAM30_DG5_PIA_UPDATE", myjson,"UPDATE MyFormsResponses SET lastupdated = 'COMPLETE' WHERE id='"+rowsArray[0].id+"'",item['id']);
								},
								function(error, statement){
									// alert("Error: " + error.message + " when processing " + statement);
									opMessage("Error: " + error.message + " when processing " + statement);
								}        
								);
							}

						},
						function(error, statement){

							opMessage("Error: " + error.message + " when processing " + statement);
						});
					}
					if(type=="Pollution")// Pollution Form			
					{														

						sqlstatement="SELECT * from myformsresponses where  id = '"+id+"'",	

						html5sql.process(sqlstatement,
								function(transaction, results, rowsArray){

							if(rowsArray.length>0){

								jsonstr=$.parseJSON(unescape(rowsArray[0].contents))
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", Pollution:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"Pollution:"+String(rowsArray.length));
								}
								if(!syncDetsSet){
									syncDetsSet=true;
									SetLastSyncDetails("LASTSYNC_UPLOAD");

								}




								item = rowsArray[0];

								if(jsonstr[0].formalsampletakenV=="YES"){	formalsampletaken="X"	}
								if(jsonstr[0].upstreamsenttolabV=="YES"){	upstreamsenttolab="X"	}
								if(jsonstr[0].ptofdiscsenttolabV=="YES"){	ptofdiscsenttolab="X"	}
								if(jsonstr[0].downstream1senttolabV=="YES"){	downstream1senttolab="X"	}
								if(jsonstr[0].downstream2senttolabV=="YES"){	downstream2senttolab="X"	}
								if(jsonstr[0].downstream3senttolabV=="YES"){	downstream3senttolab="X"	}



													
							     var myjson = {};
								    var i_PIA = {};
								    i_PIA["Zsampsentlabd3"] = downstream3senttolab.trim(),
								    i_PIA["Zsampsentlabd2"] = downstream2senttolab.trim(),
								    i_PIA["Zsampsentlabd1"] = downstream1senttolab.trim(),
								   i_PIA["Zsampsentlabpt"] = ptofdiscsenttolab.trim(),
								   i_PIA["Zsampsentlabup"] = upstreamsenttolab.trim(),
								   i_PIA["Zonsitenh3d3"] = jsonstr[0].downstream3onsitenh3.trim(),
								   i_PIA["Zonsitenh3d2"] = jsonstr[0].downstream2onsitenh3.trim(),
								   i_PIA["Zonsitenh3d1"] = jsonstr[0].downstream1onsitenh3.trim(),
								  i_PIA[  "Zonsitenh3pt"] = jsonstr[0].ptofdisconsitenh3.trim(),
								  i_PIA["Zonsitenh3up"] = jsonstr[0].upstreamonsitenh3.trim(),
								  i_PIA[  "Zdistfrptdisd3"] = jsonstr[0].downstream3distance.trim(),
								   i_PIA["Zdistfrptdisd2"] = jsonstr[0].downstream2distance.trim(),
								   i_PIA["Zdistfrptdisd1"] = jsonstr[0].downstream1distance.trim(),
								   i_PIA["Zdistfrptdispt"] = jsonstr[0].ptofdiscdistance.trim(),
								  i_PIA[  "Zdistfrptdisup"] = jsonstr[0].upstreamdistance.trim(),
								  i_PIA[  "Zaeicdx"] = "",
								   i_PIA["Zaeicd"] = jsonstr[0].aestheticimpact.trim(),
								   i_PIA["Zamicdx"] = "",
								   i_PIA["Zamicd"] = jsonstr[0].amenitiesimpact.trim(),
								   i_PIA["Zsqm"] = jsonstr[0].sizeofimpact.trim(),
								   i_PIA["Zsmptkn"] = formalsampletaken.trim(),
								   i_PIA["Zwcwcdx"] = "",
								   i_PIA["Zwcwcd"] = jsonstr[0].watercoursewidth.trim(),
								   i_PIA["Zwctcdx"] = "",
								   i_PIA["Zwctcd"] = jsonstr[0].watercoursetype.trim(),
								   i_PIA["Zdiscdx"] = "",
								   i_PIA["Zdiscd"] = jsonstr[0].dischargetype.trim(),
								   i_PIA["Zpsiteval"] = jsonstr[0].pollutionsite.trim(),
								   i_PIA["Zpsitecdx"] = "",
								   i_PIA["Zpsitecd"] =jsonstr[0].pollutionsitetype.trim(),
								  i_PIA[  "Aufnr"] = rowsArray[0].orderno
								    myjson["I_PIA"] = i_PIA;
								   

								    myjson["I_HDR"] = [];
									
								    myjson["I_AUFNR"] = rowsArray[0].orderno,
								    myjson["I_ZASTYP"] = "",
								    myjson["I_ZAWEAT"] = "",
								    myjson["I_ZAESSTA"] = "",
								    myjson["I_LONG_TEXT"] = "PIA Create",
								    myjson["I_NOTIF_NO"] = rowsArray[0].notifno,
								    myjson["I_TYPE"] = "P",
								    myjson["I_OPTION"] = "C",
								    myjson["I_SETORDER_DG5"] = "",
								    myjson["I_USERID"] = user,
								    myjson["toText"] = []
								    
									  myjson["toTimeDepth"] =[];
								      myjson["toTlineItem"] = [];
								      myjson["toRetTab"] =  []
								    
								      





								sapCalls+=1;		

								html5sql.process("UPDATE myformsresponses SET lastupdated = 'SENDING' WHERE id='"+item['id']+"'",
										function(){
									postAzureData("ZGW_MAM30_DG5_PIA_UPDATE", myjson,"UPDATE MyFormsResponses SET lastupdated = 'COMPLETE' WHERE id='"+rowsArray[0].id+"'",item['id']);		
								},
								function(error, statement){
									// alert("Error: " + error.message + " when processing " + statement);
									opMessage("Error: " + error.message + " when processing " + statement);
								}        
								);
							}

						},
						function(error, statement){

							opMessage("Error: " + error.message + " when processing " + statement);
						});
					}


					if(type=="CustomerFeedback")// Pollution Form			
					{	

						sqlstatement="SELECT * from myformsresponses where  id = '"+id+"'",	

						html5sql.process(sqlstatement,
								function(transaction, results, rowsArray){

							if(rowsArray.length>0){

								jsonstr=$.parseJSON(unescape(rowsArray[0].contents))
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", Pollution:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"Pollution:"+String(rowsArray.length));
								}
								if(!syncDetsSet){
									syncDetsSet=true;
									SetLastSyncDetails("LASTSYNC_UPLOAD");

								}




								item = rowsArray[0];
								if(jsonstr[0].reason.length>0){
									c040="LT"	
										d040=jsonstr[0].reason
								}
								if(jsonstr[0].cause.length>0){
									c060="LT"	
										d060=jsonstr[0].cause
								}
								if(jsonstr[0].ppmdetails.length>0){
									c100="LT"	
										d100=jsonstr[0].ppmdetails
								}

						

								var myjson = {};

								var notfld = {};
								notfld["ActTextl11"] = "";
								notfld["ActText11"] = "";
								notfld["ActCode11"] = "";
								notfld["ActCodegrp11"] = "";
								notfld["ActTextl10"] = ActTextl10;
								notfld["ActText10"] = d100;
								notfld["ActCode10"] = c100;
								notfld["ActCodegrp10"] = "CUST100";
								notfld["ActTextl9"] = ActTextl9;
								notfld["ActText9"] = jsonstr[0].ppmV;
								notfld["ActCode9"] = jsonstr[0].ppmV.substring(0,1);
								notfld["ActCodegrp9"] = "CUST090";
								notfld["ActTextl8"] = ActTextl8;
								notfld["ActText8"] = jsonstr[0].additionalworkV;
								notfld["ActCode8"] = jsonstr[0].additionalworkV.substring(0,1);
								notfld["ActCodegrp8"] = "CUST080";
								notfld["ActTextl7"] = ActTextl7;
								notfld["ActText7"] = jsonstr[0].furtherworkV;
								notfld["ActCode7"] = jsonstr[0].furtherworkV.substring(0,1);
								notfld["ActCodegrp7"] = "CUST070";
								notfld["ActTextl6"] = ActTextl6;
								notfld["ActText6"] = d060;
								notfld["ActCode6"] = c060;
								notfld["ActCodegrp6"] = "CUST060";
								notfld["ActTextl5"] = ActTextl5;
								notfld["ActText5"] = sonstr[0].resolvedV;
								notfld["ActCode5"] = jsonstr[0].resolvedV.substring(0,1);
								notfld["ActCodegrp5"] = "CUST050";
								notfld["ActTextl4"] = ActTextl4;
								notfld["ActText4"] = d040;
								notfld["ActCode4"] = c040;
								notfld["ActCodegrp4"] = "CUST040";
								notfld["ActTextl3"] = ActTextl3;
								notfld["ActText3"] = jsonstr[0].custsatifaction;
								notfld["ActCode3"] = jsonstr[0].custsatifaction;
								notfld["ActCodegrp3"] = "CUST030"
								notfld["ActTextl2"] = ActTextl2;
								notfld["ActText2"] = jsonstr[0].contactcardV;
								notfld["ActCode2"] = jsonstr[0].contactcardV.substring(0,1);
								notfld["ActCodegrp2"] = "CUST020";
								notfld["ActTextl1"] = ActTextl1;
								notfld["ActText1"] = jsonstr[0].spokentoV;
								notfld["ActCode1"] = sonstr[0].spokentoV.substring(0,1);
								notfld["ActCodegrp1"] = "CUST010";

								notfld["UserStatusH"] = rowsArray[0].opno;
								notfld["Plant"] = rowsArray[0].plant;
								notfld["MainWorkCtr"] = rowsArray[0].wc;
								notfld["OrderId"] = rowsArray[0].orderno;
								notfld["ReportedBy"] = ReportedBy;
								notfld["ShortText"] = ShortText;


								myjson["Notflds"] = notfld;
								myjson["Message"] = "";
								myjson["UserId"] = user;
								myjson["NotifType"] = "ZC";
								myjson["MessageType"] = "";
								myjson["NotifNo"] = rowsArray[0].notifno;

								

								sapCalls+=1;		

								html5sql.process("UPDATE myformsresponses SET lastupdated = 'SENDING' WHERE id='"+item['id']+"'",
										function(){
									postAzureData("ZGW_MAM30_011_CREATE_CFEED", myjson,"UPDATE MyFormsResponses SET lastupdated = 'COMPLETE' WHERE id='"+rowsArray[0].id+"'",item['id']);

								},
								function(error, statement){
									// alert("Error: " + error.message + " when processing " + statement);
									opMessage("Error: " + error.message + " when processing " + statement);
								}        
								);
							}

						},
						function(error, statement){

							opMessage("Error: " + error.message + " when processing " + statement);
						});
					}
// done in azure
					if(type=="TimeConf")// Process Time Confirmations		
					{														

						html5sql.process("SELECT * from MyTimeConfs where id = '"+id+"'",

								function(transaction, results, rowsArray){
							if( rowsArray.length > 0) {
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", TimeConfs:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"TimeConfs:"+String(rowsArray.length));
								}

								item = rowsArray[0];
								if(item['final']=="Yes"){
									fconf="X";
								}else{
									fconf="";
								}									
								if(item['duration']==null){
									duration="";
								}else{
									duration=item['duration'];
								}				
								var myjson = {};
								myjson["Messagetype"] = "";
								myjson["Message"] = "";
								myjson["ConfirmCounter"] = "";
								myjson["ConfirmNo"] = "";
								myjson["RemWork"] = item['rem_work'];
								myjson["LonText"] = item['longtext'];
								myjson["FinalConfFlag"] = item['final'];
								myjson["Reason"] = item['reason'];
								myjson["PersNo"] = item['empid'];
								myjson["workCntr"] = item['work_cntr'];
								myjson["ActType"] = item['type'];
								myjson["ExecFinTime"] = item['endtime'];
								myjson["ExecFinDate"] = item['enddate'].substring(8,10)+"."+item['enddate'].substring(5,7)+"."+item['enddate'].substring(0,4);
								myjson["ExecStartTime"] = item['time'];
								myjson["ExecStartdate"] = item['date'].substring(8,10)+"."+item['date'].substring(5,7)+"."+item['date'].substring(0,4);
								myjson["ActWork"] = duration;
								myjson["ConfText"] = item['description'];
								myjson["Activity"] = item['opno'];
								myjson["OrderNo"] = item['orderno'];
								myjson["User"] = item['user'];
								myjson["toCeConfirmation"] = [];
								myjson["toWsapExtension"] = [];


								

								sapCalls+=1;
								n = rowsArray.length
								html5sql.process("UPDATE MyTimeConfs SET confno = 'SENDING' WHERE id='"+item['id']+"'",
										function(){
									postAzureData("ZGW_MAM30_005_CREATE_TIME_CNF", myjson,"UPDATE MyTimeConfs SET confno = 'NEW' WHERE id='"+item['id']+"'",item['id']);

								},
								function(error, statement){

									opMessage("Error: " + error.message + " when processing " + statement);
								}        
								);
							}

						},
						function(error, statement){

							opMessage("Error: " + error.message + " when processing " + statement);
						});
					}

					

					

					if(type=="MPointDoc")// Seding Measurement Docs
					{														

						html5sql.process("SELECT * from MyMpointDocs where id = '"+id+"'",
								function(transaction, results, rowsArray){

							console.log("found MP"+rowsArray.length)
							if( rowsArray.length > 0) {
								if (syncDetails){
									localStorage.setItem('LastSyncUploadDetails',localStorage.getItem('LastSyncUploadDetails')+", MPDocs:"+String(rowsArray.length));
								}else{
									syncDetails=true;
									localStorage.setItem('LastSyncUploadDetails',"MPDocs:"+String(rowsArray.length));
								}
								if(!syncDetsSet){
									syncDetsSet=true;
									SetLastSyncDetails("LASTSYNC_UPLOAD");
									sapCalls+=1;
								}

								item = rowsArray[0];
								var mpcode=""
									if(item['code']!="-1"){
										mpcode=item['code'];
									}
								mptime = "PT"+item['time'].substring(0,2)+"H"+item['time'].substring(2,4)+"M"+item['time'].substring(4,7)+"S"

								var myjson = {};

								myjson["ShortText"] = item['shorttext'];
								myjson["ReadingTime"] = mptime;
								myjson["ReadingDate"] = item['date'];
								myjson["MeasPoint"] = item['meas_point'],
								myjson["Equipment"] = item['equipment'];
								myjson["FuncLoc"] = item['funcloc'];
								myjson["Userid"] = localStorage.getItem('MobileUser');
								myjson["Reader"] = localStorage.getItem('MobileUser');
								myjson["RecordedValue"] = item['value'];
								myjson["ValuationCode"] = mpcode;
								myjson["Meas_doc"] = "",
								myjson["Message"] = "",
								myjson["Message_type"] = ""
								

								html5sql.process("UPDATE MyMpointDocs SET state = 'SENDING' WHERE id='"+item['id']+"'",
										function(){
									postAzureData("ZGW_MAM30_040_CREATE", myjson,"UPDATE MyMpointDocs SET state = 'NEW' WHERE id='"+item['id']+"'",item['id']);

								},
								function(error, statement){

									opMessage("Error: " + error.message + " when processing " + statement);
								}        
								);
							}

						},
						function(error, statement){

							opMessage("Error: " + error.message + " when processing " + statement);
						});
					}
				}
			},
			function(error, statement){

				opMessage("Error: " + error.message + " when processing " + statement);
			});







}


/************************************************/
/* Post Set Order Status		    -done	        */
/************************************************/
function postZGW_MAM30_SET_OP_STATUS_ORDER(User,OrderNo,OpNo,sDate,sTime,Status,sql)	{
	var myjson = {};
	myjson["Message"] = "";
	myjson["UserId"] = User;
	myjson["ActTime"] = sTime;
	myjson["ActDate"] = sDate;
	myjson["InactiveStat"] = "";
	myjson["OpNo"] = OpNo;
	myjson["OrderNo"] = OrderNo;
	myjson["Status"] = Status;
	myjson["Stsma"] = "";
	postAzureData("ZGW_MAM30_SET_OP_STATUS_ORDER", myjson,sql)		
}

/************************************************/
/* Post Create Time Confirmation		        */
/************************************************/
function postZGW_MAM30_005_CREATE_TIME_CNF(User,OrderNo,OpNo,Description,Duration,sDate,sTime,eDate,eTime,reason,activityType,workCenter,employeeNo,longText,actWork,remWork,finalConf,sql)	{


var myjson = {};
myjson["Messagetype"] = "";
myjson["Message"] = "";
myjson["ConfirmCounter"] = "";
myjson["ConfirmNo"] = "";
myjson["RemWork"] = remWork;
myjson["LonText"] = longText;
myjson["FinalConfFlag"] = finalConf;
myjson["Reason"] = reason;
myjson["PersNo"] = employeeNo;
myjson["workCntr"] = workCenter;
myjson["ActType"] = activityType;
myjson["ExecFinTime"] = eTime;
myjson["ExecFinDate"] = eDate;
myjson["ExecStartTime"] = sTime;
myjson["ExecStartdate"] = sDate;
myjson["ActWork"] = actWork;
myjson["ConfText"] = Description;
myjson["Activity"] = OpNo;
myjson["OrderNo"] = OrderNo;
myjson["User"] = User;
myjson["toCeConfirmation"] = [];
myjson["toWsapExtension"] = [];


postAzureData("ZGW_MAM30_005_CREATE_TIME_CNF", myjson,sql) 		


}
/************************************************/
/* Post Create New Notification  		        */
/************************************************/
function postZGW_MAM30_NOTIFICATION_CreateNewJob(User,NotifType,sDate,sTime,eDate,eTime,Floc,Equip,codeGroup,Code,actCatType,actGroup,actCode,actText,prioType,prioCode,
												reportedBy,assignmentUser,assignToMe,specReqt,equipStatus,breaddown,shortText,longText,actWork,remWork,finalConf,sql)	{


var myjson = {};
var jobHeader = {};
jobHeader["BreakDown"] = breaddown;
jobHeader["EquipStatus"] = equipStatus;
jobHeader["UserId"] = User;
jobHeader["AssigToMe"] = assignToMe;
jobHeader["SpecReqt"] = specReqt;
jobHeader["Assignment"] = assignmentUser;
jobHeader["ReportedBy"] = reportedBy;
jobHeader["Priority"] = prioCode;
jobHeader["PriorityType"] = prioType;
jobHeader["ActiivityText"] = actText;
jobHeader["ActivityCode"] = actCode;
jobHeader["ActivityCodeGrp"] = actGroup;
jobHeader["ActCatType"] = actCatType;
jobHeader["EndTime"] = eTime;
jobHeader["EndDate"] = eDate;
jobHeader["FuncLoc"] = Floc;
jobHeader["Equipment"] = Equip;
jobHeader["CodeGroup"] = codeGroup;
jobHeader["StartTime"] = sTime;
jobHeader["Coding"] = Code;
jobHeader["ShortText"] = shortText;
jobHeader["LongText"] = longText;
jobHeader["StartDate"] = sDate
myjson["JobHeader"] = jobHeader;
myjson["Message"] = "";
myjson["Qmart"] = NotifType;
myjson["Messagetype"] = ""


postAzureData("ZGW_MAM30_NOTIFICATION_CreateNewJob", myjson,sql)	


}
/************************************************/
/* Post VehicleUpdate		        */
/************************************************/
function postZGW_MAM30_VEHICLE_SRV_VehicleChkUpd(User,notifType,notifNo,measDoc,checkType,errType,measCodeGrp,measReadBy,measLongText,measText,measValCode,measReading,measDate,measTime,equipment,mpointCat,mpointCode,sql)	{
	Duration

var myjson = {};

myjson["NotifNo"]= notifNo;
myjson["MeasDoc"]= measDoc;
myjson["ErrType"]= errType;
myjson["NotifType"]= notifType;
myjson["CheckType"]= checkType;
myjson["User"]= User;
myjson["MeasCodeGrp"]= measCodeGrp;
myjson["MeasReadBy"]= measReadBy;
myjson["MeasLongText"]= measLongText;
myjson["MeasText"]= measText;
myjson["MeasValCode"]= measValCode;
myjson["MeasReading"]= measReading;
myjson["MeasTime"]= measTime;
myjson["MeasDate"]= measDate;
myjson["MeasEquip"]= equipment;
myjson["MeasPointCat"]= mpointCat;
myjson["MeasPoint"]= mpointCode;

postAzureData("ZGW_MAM30_VEHICLE_SRV_VehicleChkUpd", myjson,sql)
}
/************************************************/
/* Post Customer Feedback       		        */
/************************************************/
function postZGW_MAM30_011_CREATE_CFEED(User,NotifNo,NotifType,OrderNo,UserStatusH,Plant,MainWorkCtr,ReportedBy,ShortText,
											ActTextl11,ActText11,ActCode11,ActCodegrp11,
											ActTextl10,ActText10,ActCode10,ActCodegrp10,		
											ActTextl9,ActText9,ActCode9,ActCodegrp9,		
											ActTextl8,ActText8,ActCode8,ActCodegrp8,		
											ActTextl7,ActText7,ActCode7,ActCodegrp7,		
											ActTextl6,ActText6,ActCode6,ActCodegrp6,		
											ActTextl5,ActText5,ActCode5,ActCodegrp5,		
											ActTextl4,ActText4,ActCode4,ActCodegrp4,		
											ActTextl3,ActText3,ActCode3,ActCodegrp3,		
											ActTextl2,ActText2,ActCode2,ActCodegrp2,		
											ActTextl1,ActText1,ActCode1,ActCodegrp1,sql)	{

var myjson = {};

var notfld = {};
notfld["ActTextl11"] = ActTextl11;
notfld["ActText11"] = ActText11;
notfld["ActCode11"] = ActCode11;
notfld["ActCodegrp11"] = ActCodegrp11;
notfld["ActTextl10"] = ActTextl10;
notfld["ActText10"] = ActText10;
notfld["ActCode10"] = ActCode10;
notfld["ActCodegrp10"] = ActCodegrp10;
notfld["ActTextl9"] = ActTextl9;
notfld["ActText9"] = ActText9;
notfld["ActCode9"] = ActCode9;
notfld["ActCodegrp9"] = ActCodegrp9;
notfld["ActTextl8"] = ActTextl8;
notfld["ActText8"] = ActText8;
notfld["ActCode8"] = ActCode8;
notfld["ActCodegrp8"] = ActCodegrp8;
notfld["ActTextl7"] = ActTextl7;
notfld["ActText7"] = ActText7;
notfld["ActCode7"] = ActCode7;
notfld["ActCodegrp7"] = ActCodegrp7;
notfld["ActTextl6"] = ActTextl6;
notfld["ActText6"] = ActText6;
notfld["ActCode6"] = ActCode6;
notfld["ActCodegrp6"] = ActCodegrp6;
notfld["ActTextl5"] = ActTextl5;
notfld["ActText5"] = ActText5;
notfld["ActCode5"] = ActCode5;
notfld["ActCodegrp5"] = ActCodegrp5;
notfld["ActTextl4"] = ActTextl4;
notfld["ActText4"] = ActText4;
notfld["ActCode4"] = ActCode4;
notfld["ActCodegrp4"] = ActCodegrp4;
notfld["ActTextl3"] = ActTextl3;
notfld["ActText3"] = ActText3;
notfld["ActCode3"] = ActCode3;
notfld["ActCodegrp3"] = ActCodegrp3;
notfld["ActTextl2"] = ActTextl2;
notfld["ActText2"] = ActText2;
notfld["ActCode2"] = ActCode2;
notfld["ActCodegrp2"] = ActCodegrp2;
notfld["ActTextl1"] = ActTextl1;
notfld["ActText1"] = ActText1;
notfld["ActCode1"] = ActCode1;
notfld["ActCodegrp1"] = ActCodegrp1;

notfld["UserStatusH"] = UserStatusH;
notfld["Plant"] = Plant;
notfld["MainWorkCtr"] = MainWorkCtr;
notfld["OrderId"] = OrderNo;
notfld["ReportedBy"] = ReportedBy;
notfld["ShortText"] = ShortText;


myjson["Notflds"] = notfld;
myjson["Message"] = "";
myjson["UserId"] = User;
myjson["NotifType"] = NotifType;
myjson["MessageType"] = "";
myjson["NotifNo"] = NotifNo;

postAzureData("ZGW_MAM30_011_CREATE_CFEED", myjson,sql)
}

/************************************************/
/* Post Measurement Doc       		        */
/************************************************/
function postZGW_MAM30_040_CREATE(User,MeasPoint,FuncLoc,Equipment,Reader,ReadingDate,ReadingTime,RecordedValue,ValuationCode,ShortText,sql)	{

var myjson = {};

myjson["ShortText"] = ShortText;
myjson["ReadingTime"] = ReadingTime;
myjson["ReadingDate"] = ReadingDate;
myjson["MeasPoint"] = MeasPoint,
myjson["Equipment"] = Equipment;
myjson["FuncLoc"] = FuncLoc;
myjson["Userid"] = User;
myjson["Reader"] = Reader;
myjson["RecordedValue"] = RecordedValue;
myjson["ValuationCode"] = ValuationCode;
myjson["Meas_doc"] = "",
myjson["Message"] = "",
myjson["Message_type"] = ""
postAzureData("ZGW_MAM30_040_CREATE", myjson,sql)
}
function postAzureCB(data,page,recno){

	var sqlstatement="";
	opMessage("Callback sapCB triggured");
	pos= (page.lastIndexOf("/")+1); 
	pageName=(page.substring(pos))






		opMessage("Processing Update Response: ");

		//Handle requestLL callback
		if (pageName=="requestll"){
			//alert(type+":"+recno+":"+sapmessage+":"+message+":"+notifno)
			opMessage("-->Type= "+type);
			opMessage("-->row= "+recno);
			opMessage("-->Message= "+message);
			opMessage("-->NotifNo= "+message_type);
			if(message_type=="E")
			{
				sqlstatement+="UPDATE MyJobDetsDraw SET zurl = '"+ message+"' where id = '"+ recno+"';";
			}else{
				sqlstatement+="UPDATE MyJobDetsDraw SET zurl = 'Waiting File Transfer' where id = '"+ recno+"';";
			}



		}
		//Handle NewJob Create Customer Feedback
		if (pageName=="createcfeed"){
			//alert(type+":"+recno+":"+sapmessage+":"+message+":"+notifno)
			opMessage("-->Type= "+type);
			opMessage("-->row= "+recno);
			opMessage("-->Message= "+sapmessage);
			opMessage("-->Message= "+message);
			opMessage("-->NotifNo= "+notifno);
			if(message_type=="E")
			{
				sqlstatement+="UPDATE MyFormsResponses SET LastUpdated = '"+ message+"' WHERE id='"+ recno+"';";
			}else{
				sqlstatement+="UPDATE MyFormsResponses SET LastUpdated = 'SAPRECEIVED' WHERE id='"+ recno+"';";
			}



		}
		//Handle NewJob Create PIA
		if (pageName=="createpia"){
			//alert(type+":"+recno+":"+sapmessage+":"+message+":"+notifno)
			opMessage("-->Type= "+type);
			opMessage("-->row= "+recno);
			opMessage("-->Message= "+sapmessage);
			opMessage("-->Message= "+message);
			opMessage("-->NotifNo= "+notifno);
			if(message_type=="E")
			{
				sqlstatement+="UPDATE MyFormsResponses SET LastUpdated = '"+ message+"' WHERE id='"+ recno+"';";
			}else{
				sqlstatement+="UPDATE MyFormsResponses SET LastUpdated = 'SAPRECEIVED' WHERE id='"+ recno+"';";
			}



		}
		//Handle NewJob Create DG5
		if (pageName=="createdg5"){
			//alert(type+":"+recno+":"+message+":"+message_type)
			opMessage("-->Type= "+type);
			opMessage("-->row= "+recno);				
			opMessage("-->Message= "+message);
			opMessage("-->NotifNo= "+message_type);
			if(message_type=="E")
			{
				sqlstatement+="UPDATE MyFormsResponses SET LastUpdated = '"+ message+"' WHERE id='"+ recno+"';";
			}else{
				sqlstatement+="UPDATE MyFormsResponses SET LastUpdated = 'SAPRECEIVED' WHERE id='"+ recno+"';";
			}



		}
//		Handle EOD Create Response
		if (pageName=="ZGW_MAM30_NOTIFICATION_NotifHeaderCreate"){
			msplit=data.Message.split(" ")
			notifno=""
				if(data.MessageType=="S"){
					notifno=msplit[1]
				}
			opMessage("-->Type= EOD");
			opMessage("-->row= "+recno);
			opMessage("-->Message= "+data.Message);
			opMessage("-->MessageType= "+data.MessageType);
			opMessage("-->NotifNo= "+notifno);
			if(data.MessageType=="S")
			{
				sqlstatement+="UPDATE MyNotifications SET notifno = '"+ notifno+"' WHERE id='"+ recno+"';";
			}else{
				sqlstatement+="UPDATE MyNotifications SET notifno = 'SENT"+recno+"' WHERE id='"+ recno+"';";	
			}





		}
//		Handle Close Create Response
		if (pageName=="ZGW_MAM30_NOTIFICATION_NotifHeaderUpdate"){
			
			opMessage("-->Type= Close Uppdate");
			opMessage("-->row= "+recno);
			
			opMessage("-->Message= "+message);
			opMessage("-->NotifNo= "+notifno);
			sqlstatement+="UPDATE MyJobClose SET state = 'SENT"+recno+"' WHERE id='"+ recno+"';";






		}
		
//		Handle Vehicle Defect Response
		if (pageName=="ZGW_MAM30_VEHICLE_SRV_VehicleChkUpd"){
		
		
			opMessage("-->NotifNo= "+data.NotifNo);
			opMessage("-->measdoc= "+data.MeasDoc);
			
			sqlstatement+="delete from MyVehicleCheck WHERE id='"+recno+"';";

			

		}	
//		Handle Time Confirmation Create Response			
		if (pageName=="ZGW_MAM30_005_CREATE_TIME_CNF"){
			
			opMessage("-->Type= "+data.Messagetype);
			opMessage("-->Message= "+data.Message);
			opMessage("-->confno= "+data.ConfirmNo);
			if(data.ConfirmNo!="0000000000"){



				sqlstatement+="UPDATE MyTimeConfs SET confno = '"+confno+"' WHERE id='"+recno+"';";


			}else{
				sqlstatement+="UPDATE MyTimeConfs SET confno = 'SENT"+recno+"' WHERE id='"+recno+"';";
			}

		}
//		Handle MPDoc Create Response			
		if (pageName=="ZGW_MAM30_040_CREATE"){
			
			opMessage("-->Type= Create MP Doc");
			opMessage("-->MPDoc= "+data.Meas_doc);
			if(data.Meas_doc!="0000000000"){



				sqlstatement+="UPDATE MyMpointdocs SET state = '"+data.Meas_doc+"' WHERE id='"+recno+"';";


			}else{
				sqlstatement+="UPDATE MyMpointdocs SET state = 'SENT"+recno+"' WHERE id='"+recno+"';";
			}

		}
//		Handle Status Update Response
		if (pageName=="ZGW_MAM30_SET_OP_STATUS_ORDER"){
			console.log("-->UpdateStatus"+data.OrderNo+":"+data.OpNo+":"+data.Message);
			opMessage("-->UpdateStatus");
			opMessage("-->Orderno= "+data.OrderNo);
			opMessage("-->Opno= "+data.OpNo);
			opMessage("-->Message= "+data.Message);
			if(data.Message=="Operation successfully updated"){


				sqlstatement+="delete from MyStatus WHERE id = '"+recno + "';";

			}else{
				sqlstatement+="UPDATE MyStatus SET state = 'SENT"+recno+"' WHERE id='"+ recno+"';";	
			}

		}	
//		Handle Create Notification Response
		if (pageName=="ZGW_MAM30_NOTIFICATION_CreateNewJob"){
			msplit=data.Message.split(" ")
			notifno=""
			if(data.Messagetype=="S"){
				notifno=msplit[1]
			}
			opMessage("-->Create Notification");
			opMessage("-->NotifNo= "+notifno);
			opMessage("-->Message= "+data.Message);
			opMessage("-->MessageType= "+data.Messagetype);
			if(data.Messagetype=="S"){

				sqlstatement+="UPDATE MyNotifications SET notifno = '"+notifno+"' WHERE id='"+recno+"';";



			}

		}			
		
		
		html5sql.process(sqlstatement,
				function(){
			console.log("Success handling SAPCB"+sqlstatement);
			SetConfigParam('LASTSYNC_UPLOAD', "20120101010101");

		},
		function(error, statement){
			console.log("Error: " + error.message + " when processing " + statement);
			opMessage("Error: " + error.message + " when processing " + statement);
		}        
		);	

}