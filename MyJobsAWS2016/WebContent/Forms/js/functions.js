function getDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month.toString().length == 1) {
        var month = '0' + month;
    }
    if (day.toString().length == 1) {
        var day = '0' + day;
    }
    if (hour.toString().length == 1) {
        var hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
        var minute = '0' + minute;
    }
    if (second.toString().length == 1) {
        var second = '0' + second;
    }
    var dateTime = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
    return dateTime;
}

function scrollfield()
{
currentPage=location.href.split("#")
alert(document.activeElement.tagName)
location.href=currentPage[0]+"#"+document.activeElement.id


}
/*
window.onload function () {
	pageName=document.location.toString()
	
	if( pageName.indexOf("formsindex")<1){
		if( pageName.indexOf("ProcessForm")<1){
			
			var div = document.createElement("div");	
			div.style.height = "1000px";
			div.innerHTML = " ";
			var lastChild = document.body.lastChild;
			document.body.insertBefore(div, lastChild.nextSibling);
		}
	}
}
*/