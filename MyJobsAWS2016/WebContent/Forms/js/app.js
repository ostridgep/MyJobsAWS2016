
function getCanvas(){
	html2canvas(document.body, {
		  onrendered: function(canvas) {
			canvas.id="FormImage"
			//canvas.style.display="none";
		    document.body.appendChild(canvas);
		    xx=document.getElementById("FormImage")
		    alert(xx.tagName)
		    document.getElementById("FormImage").remove();
		     var img = xx.toDataURL("image/jpeg")
		  
		    console.log(img)
		    		   
		  }
		});
}
