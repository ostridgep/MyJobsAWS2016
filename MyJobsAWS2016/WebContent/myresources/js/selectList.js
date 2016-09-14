


var formSelectList = new sap.m.Dialog({
    title:"Please Select",
    modal: true,
    contentWidth:"1em",
    buttons: [
                                new sap.m.Button( {
                                    text: "Save",
                                    type: 	sap.m.ButtonType.Accept,
                                    tap: [ function(oEvt) { 
                                    	
                                    	
                                    	formSelectList.close()
                                              
                                                } ]
                                   
                                }),   
                                new sap.m.Button( {
                                    text: "Cancel",
                                    type: 	sap.m.ButtonType.Reject,
                                    tap: [ function(oEvt) {         
                                               
                                    	formSelectList.close()} ]   
                                })
                                ],                                
    content:[
			new sap.m.TileContainer("selectTC",{
				tiles:
					[
			
					]
					
			})
            ],
            beforeOpen:function(){
            	
                
            },
           contentWidth:"30%",
        	contentHeight: "30%",
     })
function showSelectTileCointainer(selectListID){
	sap.ui.getCore().getElementById('selectTC').sestroyTiles();
	sl=document.getElementById(selectListID).options
	for(var cntx=0; cntx < sl.length ; cntx++)
	{	
		sap.ui.getCore().getElementById('selectTC').tileAdd(new sap.m.StandardTile({title:sl[0].text,press:[ function(){alert(sl.options[cntx].key)}]}))
		
		
	}
	
	formSelectList.open()	
}
