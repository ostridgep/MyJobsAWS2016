var oSwitchFlooding = new sap.m.Switch({
				state: false,
				customTextOn:"Yes",
				customTextOff:"No",
				change: function(evt){
					
					setCloseswitch()

			    }
			});



			var oSwitchPollution = new sap.m.Switch({
				state: false,
				customTextOn:"Yes",
				customTextOff:"No",
					change: function(evt){
						
						setCloseswitch()

				    }
			});

			
var oLayout1 = new sap.ui.layout.form.GridLayout();
var oLayout1a = new sap.ui.layout.form.GridLayout();
              var oLayout2 = new sap.ui.layout.form.ResponsiveLayout();
              var oLayout3 = new sap.ui.layout.form.ResponsiveGridLayout();

              var oForm1 = new sap.ui.layout.form.Form("DG51F1",{
                     
                     editable: true,
                     layout: oLayout1a,
                     formContainers: [

                           new sap.ui.layout.form.FormContainer("DG51F1C1",{
                                  
                                  formElements: [
                                         new sap.ui.layout.form.FormElement({
                                                label: "Functional Location",
                                                fields: [new sap.m.Input("Close_FunctionalLocation",{type: sap.m.InputType.Input, enabled: true})
                                                ]
                                         }),
                                         new sap.ui.layout.form.FormElement({
                                                label: "Equipment ID",
                                                fields: [new sap.m.Input("Close_Equipment",{type: sap.m.InputType.Input, enabled: true})
                                                ]
                                         }),
                                         new sap.ui.layout.form.FormElement({
                                                label: "",
                                                fields: [                         new sap.m.Button( {
                                                    text: "Select Asset",
                                                    type:     sap.m.ButtonType.Success,
                                                    tap: [ function(oEvt) {  
                                                    	SearchMode="CLOSE"
                                                    		
                                                    	formSearchAsset.open() 
                                                    
                                                    	
                                                                } ]
                                                })
                                                ]
                                         }),
                                         new sap.ui.layout.form.FormElement({
                                             label: "In Shift Time",
                                             fields: [new sap.m.DateTimeInput("Close_InShiftTime",{
                        							placeholder : "Time Picker",
                           							type : "Time",
                           							valueFormat : "HH:mm",
                           							value : "0:0",
                           							displayFormat : "H'h' m'm'",
                           							
                           						})
                              
                                             ]
                                      }),
                                        
                                         
                                      new sap.ui.layout.form.FormElement({
                                          label: "Out Of Shift Time",
                                          fields: [new sap.m.DateTimeInput("Close_OutOfShiftTime",{
                  							placeholder : "Time Picker",
                   							type : "Time",
                   							valueFormat : "HH:mm",
                   							value : "0:0",
                   							displayFormat : "H'h' m'm'",
                   							
                   						})
                                          ]
                                      }),
                   					 
                                      new sap.ui.layout.form.FormElement({
                                          label: "Escape of sewage?",
                                          fields: [oSwitchFlooding]
                                       }),
                    					 new sap.ui.layout.form.FormElement({
                                             label: "Pollution Incident?",
                                             fields: [oSwitchPollution]
                    					 })  
                                         ],
                                  layoutData: new sap.ui.core.VariantLayoutData({
                                                multipleLayoutData: [new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, minWidth: 400}),
                                                                         new sap.ui.layout.form.GridContainerData({halfGrid: true}),
                                                                         new sap.ui.layout.GridData({linebreakL: true})]
                                                })
                           }),
                           new sap.ui.layout.form.FormContainer("DG51F1C2",{
                               
                               formElements: [
                                              new sap.ui.layout.form.FormElement({
                                                  label: "Problem Group",
                                                  fields: [new sap.m.Select('Close_ProblemGroup',{
                                                         
                                                         items: [
                                                                
                                                         ],

                                                         change: function(oControlEvent) {
                                                                setCloseButtons(oControlEvent.getParameter("selectedItem").getKey())
                                                                BuildCloseProblemCodes(oControlEvent.getParameter("selectedItem").getKey());
                                                         }
                                                  }),
                                                  ]
                                           }) ,                                    
                                      new sap.ui.layout.form.FormElement({
                                             label: "Problem Code",
                                             fields: [new sap.m.Select('Close_ProblemCode',{
                                                    
                                                    items: [
                                                           
                                                    ],

                                                    change: function(oControlEvent) {
                                                           
                                                           //BuildPriorities(oControlEvent.getParameter("selectedItem").getKey());
                                                    }
                                             }),
                                             ]
                                      }),
                                      new sap.ui.layout.form.FormElement({
                                          label: "Action Group",
                                          fields: [new sap.m.Select('Close_ActionGroup',{
                                                 
                                                 items: [
                                                        
                                                 ],

                                                 change: function(oControlEvent) {
                                                        
                                                	 BuildCloseActionCodes(oControlEvent.getParameter("selectedItem").getKey());
                                                 }
                                          }),
                                          ]
                                   }),
                                      new sap.ui.layout.form.FormElement({
                                             label: "Action Code",
                                             fields: [new sap.m.Select('Close_ActionCode',{
                                                    
                                                    items: [
                                                           
                                                    ],

                                                    change: function(oControlEvent) {
                                                           
                                                           //BuildPriorities(oControlEvent.getParameter("selectedItem").getKey());
                                                    }
                                             }),
                                             ]
                                      }),
                                      new sap.ui.layout.form.FormElement({
                                          label: "Impact Group",
                                          fields: [new sap.m.Select('Close_ImpactGroup',{
                                                 
                                                 items: [
                                                        
                                                 ],

                                                 change: function(oControlEvent) {
                                                        
                                                	 BuildCloseImpactCodes(oControlEvent.getParameter("selectedItem").getKey());
                                                 }
                                          }),
                                          ]
                                   }),
                                      new sap.ui.layout.form.FormElement({
                                             label: "Impact Code",
                                             fields: [new sap.m.Select('Close_ImpactCode',{
                                                    
                                                    items: [
                                                           
                                                    ],

                                                    change: function(oControlEvent) {
                                                           
                                                           
                                                    }
                                             }),
                                             ]
                                      }),
                                      new sap.ui.layout.form.FormElement({
                                    	  label: " ",
                                          fields: [new sap.m.Button('btnDG5', {
                                        	  
                  				    				text: 	"Flooding/DG5 Feedback",
                  				    				icon:"sap-icon://form",
               				    	
                  				    				tap: 	[ function(oEvt) {
                  				    							formToOpen="Forms/flooding.html"
                  				    								formMode="Close"
                  				    									closeFormName="Flooding"
                        				    							formForms.open()
                  				    							} 
                  				    							
               				   			 					]   
               										})
                                                 
                                          		]
                                      	}),
                                        new sap.ui.layout.form.FormElement({
                                      	  label: " ",
                                            fields: [new sap.m.Button('btnPollution', {
                                          	  
                    				    				text: 	"Polution",
                    				    				icon:"sap-icon://form",
                 				    	
                    				    				tap: 	[ function(oEvt) {
                    				    							formToOpen="Forms/pollution.html"
                    				    								formMode="Close"
                    				    									closeFormName="Pollution"
                            				    							formForms.open()
                    				    							} 
                    				    							
                 				   			 					]   
                 										})
                                                   
                                            		]
                                        	}),
                                            new sap.ui.layout.form.FormElement({
                                          	  label: " ",
                                                fields: [new sap.m.Button('btnFeedback', {
                                              	  
                        				    				text: 	"Customer Feedback",
                        				    				icon:"sap-icon://form",
                     				    	
                        				    				tap: 	[ function(oEvt) {
                        				    							formToOpen="Forms/CustomerFeedback.html"
                        				    							formMode="Close"
                        				    								closeFormName="CustomerFeedback"
                        				    							formForms.open()
                        				    							} 
                        				    							
                     				   			 					]   
                     										})
                                                       
                                                		]
                                            	})
              						
                                      ],
                               layoutData: new sap.ui.core.VariantLayoutData({
                                             multipleLayoutData: [new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, minWidth: 400}),
                                                                      new sap.ui.layout.form.GridContainerData({halfGrid: true}),
                                                                      new sap.ui.layout.GridData({linebreakL: true})]
                                             })
                        }),
                        new sap.ui.layout.form.FormContainer("DG51F1C3",{
                            
                            formElements: [
                                 
                                  
                                   new sap.ui.layout.form.FormElement("FEClose_LongText",{
                                  	 label: "Long Text",
                                          fields: [new sap.m.TextArea("Close_LongText",{ rows: 5})
                                          ]
                                   })
                     
                                   ],
                            layoutData: new sap.ui.core.VariantLayoutData({
                                          multipleLayoutData: [new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, minWidth: 400}),
                                                                   new sap.ui.layout.form.GridContainerData({halfGrid: true}),
                                                                   new sap.ui.layout.GridData({linebreakL: true})]
                                          })
                     })
                           ]

              });

                           var oForm2 = new sap.ui.layout.form.Form("DG52F1",{
                               
                               editable: true,
                               layout: oLayout1,
                               formContainers: [

                           new sap.ui.layout.form.FormContainer("DG52F1C1",{
                                  
                                  
                                  formElements: [

                                         new sap.ui.layout.form.FormElement({
                                                label: "Additional Work Required",
                                                fields: [ new sap.m.Switch("Close_Work",{
                                                state:false,
                                                change:[function(evt){
                                                       
                                                    	   sap.ui.getCore().getElementById("FEClose_Variance").setVisible(this.getState())   
                                                    	   sap.ui.getCore().getElementById("FEClose_Reason").setVisible(this.getState())   
                                                       
                                                       
                                                }],
                                                type: sap.m.SwitchType.AcceptReject
                                         })
                                                ]
                                         }),
                                         new sap.ui.layout.form.FormElement("FEClose_Variance",{
                                                label: "Variance",
                                                fields: [new sap.m.Select('Close_Variance',{
                                                       
                                                       items: [
                                                              
                                                       ],

                                                       change: function(oControlEvent) {
                                                              
                                                              //BuildPriorities(oControlEvent.getParameter("selectedItem").getKey());
                                                       }
                                                }),
                                                ]
                                         }),
                                         new sap.ui.layout.form.FormElement("FEClose_Reason",{
                                                label: "Reason",
                                                fields: [new sap.m.Input("Close_Reason",{type: sap.m.InputType.Input, enabled: true})
                                                ]
                                         }),

                                  ],
                                  layoutData: new sap.ui.core.VariantLayoutData({
                                         multipleLayoutData: [new sap.ui.layout.form.GridContainerData({halfGrid: true}),
                                                                    new sap.ui.layout.ResponsiveFlowLayoutData({minWidth: 150}),
                                                                                                                                  new sap.ui.layout.GridData({linebreakL: false})]
                                         })
                           })

                     ]
              });

              

function buildDG5Tabs(){
	
	
	
       var tabBar  = new sap.m.IconTabBar('DG5tabBar',
                     {
                           expanded:'{device>/isNoPhone}',

                           select:[function(oEvt) {   
                                  currentPage=window.location.href

                                         
                                    if(oEvt.getParameters().key=="DG51"){}
                                    if(oEvt.getParameters().key=="DG52"){}

                                  
                                  }
                           ],
                           
                           items: [
                                         new sap.m.IconTabFilter( {
                                             key:'DG51',
                                             tooltip: 'Close Job Details',
                                             text: "Close",
                                             content:[oForm1
                                                      ]
                                         }),
                                         new sap.m.IconTabFilter( {
                                                    key:'DG52',
                                                    tooltip: 'Follow On Work',
                                                    text: "Follow On Work",
                                                    content:[oForm2
                                                                           
                                                             ]
                                                })
                                  ]
                     })
       return tabBar;

       }
function setCloseButtons(key){
	initCloseButtons()
	if (key=="GEN-LE"){
		oSwitchFlooding.setState(true);
		oSwitchFlooding.setEnabled(false);
		sap.ui.getCore().getElementById('btnDG5').setEnabled(true);
		//if(sap.ui.getCore().getElementById('btnDG5').getText()=="Not Required"){
		//	sap.ui.getCore().getElementById('btnDG5').setText("Create");
			
		//}
	
	}else{
		sap.ui.getCore().getElementById('btnDG5').setEnabled(false);
		if(!oSwitchFlooding.getEnabled()){
			oSwitchFlooding.setState(false);
			oSwitchFlooding.setEnabled(true);
		}
	}

	if (key=="GEN-OP"){
		oSwitchPollution.setState(true);
		oSwitchPollution.setEnabled(false);
		sap.ui.getCore().getElementById('btnPollution').setEnabled(true);
		//if(sap.ui.getCore().getElementById('btnPollution').getText()=="Not Required"){
		//	sap.ui.getCore().getElementById('btnPollution').setText("Create");
			
		//}
		
	}else{
		sap.ui.getCore().getElementById('btnPollution').setEnabled(false);
		if(!oSwitchPollution.getEnabled()){
			oSwitchPollution.setState(false);
			oSwitchPollution.setEnabled(true);
		}
	}
}
function setCloseswitch(){
	initCloseButtons()
	if (oSwitchFlooding.getState()){
		sap.ui.getCore().getElementById('btnDG5').setEnabled(true);
		//if(sap.ui.getCore().getElementById('btnDG5').getText()=="Not Required"){
		//	sap.ui.getCore().getElementById('btnDG5').setText("Create");
			
		//}
	
	}else{
		sap.ui.getCore().getElementById('btnDG5').setEnabled(false);
		if (!oSwitchPollution.getEnabled()){
			oSwitchPollution.setState(false);
			oSwitchPollution.setEnabled(true);
		
		}
	}
	
	if (oSwitchPollution.getState()){
		sap.ui.getCore().getElementById('btnPollution').setEnabled(true);
		//if(sap.ui.getCore().getElementById('btnPollution').getText()=="Not Required"){
		//	sap.ui.getCore().getElementById('btnPollution').setText("Create");
			
		//}
		
	}else{
		sap.ui.getCore().getElementById('btnPollution').setEnabled(false);
		
	}
}
function initCloseButtons(){
	sap.ui.getCore().getElementById('btnFeedback').setEnabled(true);
	//sap.ui.getCore().getElementById('btnFeedback').setText("Create");
	sap.ui.getCore().getElementById('btnFeedback').setType(sap.m.ButtonType.Accept);
	sap.ui.getCore().getElementById('btnDG5').setEnabled(false);
	//sap.ui.getCore().getElementById('btnDG5').setText("Not Required");
	sap.ui.getCore().getElementById('btnDG5').setType(sap.m.ButtonType.Accept);
	sap.ui.getCore().getElementById('btnPollution').setEnabled(false);
	//sap.ui.getCore().getElementById('btnPollution').setText("Not Required");
	sap.ui.getCore().getElementById('btnPollution').setType(sap.m.ButtonType.Accept);
	sqlstatement="SELECT * from myformsresponses where orderno = '"+CurrentOrderNo+"' and opno ='"+CurrentOpNo+"'"
	
	html5sql.process(sqlstatement,
			function(transaction, results, rowsArray){
		
				if( rowsArray.length > 0) {
					for (var n = 0; n < rowsArray.length; n++) {
						
						if(rowsArray[n].formname=='Flooding'){
							
						
							//sap.ui.getCore().getElementById('btnDG5').setText("Change");
							sap.ui.getCore().getElementById('btnDG5').setType(sap.m.ButtonType.Emphasized);
						}
						if(rowsArray[n].formname=='Pollution'){
							
							
							//sap.ui.getCore().getElementById('btnPollution').setText("Change");
							sap.ui.getCore().getElementById('btnPollution').setType(sap.m.ButtonType.Emphasized);
						}
						if(rowsArray[n].formname=='Feedback'){
							
							sap.ui.getCore().getElementById('btnFeedback').setEnabled(true);
							//sap.ui.getCore().getElementById('btnFeedback').setText("Change");
							sap.ui.getCore().getElementById('btnFeedback').setType(sap.m.ButtonType.Emphasized);
						}

						
					}
									
		
				}

			},
			 function(error, statement){
				 window.console&&console.log("Error: " + error.message + " when processing " + statement);
			 }   
		);	

}
