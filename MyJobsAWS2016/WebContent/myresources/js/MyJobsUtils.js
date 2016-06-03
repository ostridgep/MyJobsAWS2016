
jQuery.sap.require("sap.m.MessageBox");
function DisplayErrorMessage(msgtitle,msgbody){
sap.m.MessageBox.show(
    msgbody, {
        icon: sap.m.MessageBox.Icon.ERROR,
        title: msgtitle,
        actions: [sap.m.MessageBox.Action.OK]
    }
  );   
}
function validateDecimal(value, decimals, length) { 
x=value.split(".")
nlen = length-decimals;

if(decimals<2){
	var rx = /^\d+(?:\.\d{1,1})?$/ 
}
if(decimals==2){
	var rx = /^\d+(?:\.\d{1,2})?$/ 
}
if(decimals==3){
	var rx = /^\d+(?:\.\d{1,3})?$/ 
}
if(decimals==4){
	var rx = /^\d+(?:\.\d{1,4})?$/ 
}
if(decimals==5){
	var rx = /^\d+(?:\.\d{1,5})?$/ 
}

    if(rx.test(value)) { 
       vlen=x[0].length;
       if (x.length>1){
    	   vlen+=x[1].length
       }
       if(vlen>length){
    	   //Number length is too Big
    	   return(false)
       }else{
    	   if((x.length>1)&&(decimals==0)){
    		   return false;
    	   }else{
    		   if(x[0].length>nlen){
        		   return false;
        	   }else{
        		   return true;   
        	   }   
    	   }
    	   
       }
       
       
    }
    else { 
       return false; 
    } 
}

function showMessage(msg){
	sap.m.MessageToast.show(msg, {
		type: Error,
		duration: Number(3000),
		width: "30em",
		my: "center center",
		at: "center center",		
		autoClose: true,

	});
}
function showFormValidationMessage(fname,title,msg){
	sap.m.MessageToast.show(msg, {
		type: Error,
		duration: Number(3000),
		width: "30em",
		my: "center center",
		at: "center center",		
		autoClose: true,

	});
	  sap.m.MessageBox.show(msg+"\nPress OK to return to form", {
		         icon: sap.m.MessageBox.Icon.ERROR ,
		         title: title,
		         actions: [sap.m.MessageBox.Action.IGNORE, sap.m.MessageBox.Action.OK],
	  			 onClose: function(oAction){
	  				
	  				 if(oAction=="IGNORE"){
	  					 saveFormData(fname,"SAVED")
	  				 }
	  			 }
		       }
		     );
}
function showAreYouSure(title,msg,form){

	  sap.m.MessageBox.show(msg, {
		         icon: sap.m.MessageBox.Icon.WARNING ,
		         title: title,
		         actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
	  			 onClose: function(oAction){
	  				
	  				 if(oAction=="YES"){
	  					 form.close()
	  				 }
	  			 }
		       }
		     );
}
function showErrorMessage(title,msg){
	sap.m.MessageToast.show(msg, {
		type: Error,
		duration: Number(3000),
		width: "30em",
		my: "center center",
		at: "center center",		
		autoClose: true,

	});
	  sap.m.MessageBox.show(msg, {
		         icon: sap.m.MessageBox.Icon.ERROR ,
		         title: title,
		         actions: [sap.m.MessageBox.Action.OK]
		       }
		     );
}
function diffInMinutes(StartDate, StartTime, EndDate, EndTime){
	
	var diff = Math.abs(new Date(StartDate+" "+StartTime) - new Date(EndDate+" "+EndTime));
	var minutes = Math.floor((diff/1000)/60);
	return minutes
}
function diffInTime(StartDate, StartTime, EndDate, EndTime){
	
	if(("x"+StartDate).length<8){
		StartDate=EndDate
		StartTime = EndTime
	}


	StartTime=StartTime.substring(0, 6)+"00";
	var sd=new Date(EndDate.substring(0,4),EndDate.substring(5,7),EndDate.substring(8,10),EndTime.substring(0,2),EndTime.substring(3,5),EndTime.substring(6,8))
	var ed=new Date(StartDate.substring(0,4),StartDate.substring(5,7),StartDate.substring(8,10),StartTime.substring(0,2),StartTime.substring(3,5),StartTime.substring(6,8))
	var diff=0;
	
	diff =    Math.abs( sd-ed)
	
	var minutes =diff/1000;
	minutes = (diff/1000) 
	minutes -= (minutes%60) 
	minutes = minutes /60
	
	var m = minutes % 60;
	var h = (minutes-m)/60
	
	return h.toString()+":"+m.toString()
}
function convertToMinutes(time){
x=time.split(":")
minutes=((parseInt(x[0])*60)+parseInt(x[1]))
//alert(time+"-"+minutes.toString())
return minutes.toString()
}
function getDate()	{			
				var currentdate = new Date(); 
	return zeroFill1(currentdate.getFullYear().toString()) + zeroFill1((currentdate.getMonth()+1).toString() ) + zeroFill1(currentdate.getDate().toString());

}
function getFormattedDate()	{			
	var currentdate = new Date(); 
return zeroFill1(currentdate.getFullYear().toString()) +"/"+ zeroFill1((currentdate.getMonth()+1).toString() ) + "/"+zeroFill1(currentdate.getDate().toString());

}
function getFormattedDMY()	{			
	var currentdate = new Date(); 
return zeroFill1(currentdate.getDate().toString()) +"/"+ zeroFill1((currentdate.getMonth()+1).toString() ) + "/"+zeroFill1(currentdate.getFullYear().toString());

}
function formatDate(currentdate)	{			

return zeroFill1(currentdate.getFullYear().toString()) +"/"+ zeroFill1((currentdate.getMonth()+1).toString() ) + "/"+zeroFill1(currentdate.getDate().toString());

}
function getTime()	{			
				var currentdate = new Date(); 
    x1=zeroFill1( currentdate.getHours()).toString();
          x2=zeroFill1(currentdate.getMinutes()).toString();
    x3=zeroFill1( currentdate.getSeconds()).toString();
	return x1+x2+x3;

}




function convertEODDate(dt)
{
	
	x=dt.split(" ")
	d=x[0].split("-")
	t=x[1].split(":")
	
	
	xdate=d[2]+"."+d[1]+"."+d[0];
	
	
	t[0]=t[0].replace(' ','')
	
	hours=(parseInt(t[0])).toString()

		
	xtime=zeroFill1(t[0])+":"+zeroFill1(t[1])+":00"
	
	return xdate+" "+xtime
	}
function getFormattedTime()	{			
	var currentdate = new Date(); 
x1=zeroFill1( currentdate.getHours()).toString();
x2=zeroFill1(currentdate.getMinutes()).toString();
x3=zeroFill1( currentdate.getSeconds()).toString();
return x1+":"+x2+":"+x3;

}
function formatTime(currentdate)	{			
	
x1=zeroFill1( currentdate.getHours()).toString();
x2=zeroFill1(currentdate.getMinutes()).toString();
x3=zeroFill1( currentdate.getSeconds()).toString();
return x1+":"+x2+":"+x3;

}
function getSAPDate()	{			
				var currentdate = new Date(); 
	return zeroFill1(currentdate.getDate().toString()) + "."+zeroFill1((currentdate.getMonth()+1).toString() )  + "."+ zeroFill1(currentdate.getFullYear().toString());

}
function getShortSAPDate()	{			
	var currentdate = new Date(); 
return zeroFill1(currentdate.getDate().toString()) +zeroFill1((currentdate.getMonth()+1).toString() )  + zeroFill1(currentdate.getFullYear().toString());

}
function getSAPTime()	{			
				var currentdate = new Date(); 
    x1=zeroFill1( currentdate.getHours()).toString();
          x2=zeroFill1(currentdate.getMinutes()).toString();
    x3=zeroFill1( currentdate.getSeconds()).toString();
	return x1 + ":"+x2 + ":"+x3;

}
function formatDate(dt){

	var formatteddt="";
	formatteddt=dt.substring(6,8)+"/"+dt.substring(4,6)+"/"+dt.substring(0,4)
	return formatteddt;
	}
function formatTimeString(dt){

	var formattedt="";
	formattedt=dt.substring(0,2)+":"+dt.substring(2,4)+":"+dt.substring(4,6)
	return formattedt;
	}
function getDateStamp(){
nowd=getDate();
nowt=getTime();
dtstamp=nowd+nowt;
return dtstamp;
}
function formatDateTime(dt){
if(dt=="undefined"){
	return
}
	
var formatteddt="";
formatteddt=dt.substring(6,8)+"-"+dt.substring(4,6)+"-"+dt.substring(0,4)+" "+dt.substring(8,10)+":"+dt.substring(10,12)+":"+dt.substring(12,14);
return formatteddt;
}
function formatDateTime1(dt){

	var formatteddt="";
	formatteddt=dt.substring(6,8)+"-"+dt.substring(4,6)+"-"+dt.substring(0,4)+" "+dt.substring(9,11)+":"+dt.substring(11,13)+":"+dt.substring(13,15);
	return formatteddt;
	}
function convertDateTimePicker(dt)
{
	var sd =dt.split(",")
	var x=sd[0].split("/")
	var st=sd[1].split(":")
	var ndate= new Date(Number(x[2])+2000,x[0],x[1])
	

	var formattedDate=zeroFill1(ndate.getFullYear().toString()) + zeroFill1((ndate.getMonth()).toString() ) +  zeroFill1(ndate.getDate().toString())+"|"+zeroFill1(st[0].substring(1,st[0].length))+st[1].substring(0,2)+"00"
return formattedDate
	}
function zeroFill1(x){
    return (x < 10) ? ("0" + x) : x;   
}
function isEven(value) {
return (value%2 == 0);
} 
function parseDate(input){
input=input+"          ";
//alert (input.substr(0,4)+"/"+input.substr(4,2)+"/"+input.substr(6,2)+" "+input.substr(8,2)+":"+input.substr(10,2));
 return new Date(input.substr(0,4), input.substr(4,2)-1, input.substr(6,2), // months are 0-based
                 input.substr(8,2), input.substr(10,2));

}
function getURLParameters(paramName) 
{
        var sURL = window.document.URL.toString();  
    if (sURL.indexOf("?") > 0)
    {
       var arrParams = sURL.split("?");         
       var arrURLParams = arrParams[1].split("&");      
       var arrParamNames = new Array(arrURLParams.length);
       var arrParamValues = new Array(arrURLParams.length);     
       var i = 0;
       for (i=0;i<arrURLParams.length;i++)
       {
        var sParam =  arrURLParams[i].split("=");
        arrParamNames[i] = sParam[0];
        if (sParam[1] != "")
            arrParamValues[i] = unescape(sParam[1]);
        else
            arrParamValues[i] = "No Value";
       }

       for (i=0;i<arrURLParams.length;i++)
       {
                if(arrParamNames[i] == paramName){
            //alert("Param:"+arrParamValues[i]);
                return arrParamValues[i];
             }
       }
       return "No Parameters Found";
    }

}