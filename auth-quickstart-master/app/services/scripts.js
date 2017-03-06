var app = angular.module("myApp", ['ngResource']);

    //CSV
    app.directive('exportToCsv',function(){
  	return {
    	restrict: 'A',
    	link: function (scope, element, attrs) {
    		var el = element[0];
	        element.bind('click', function(e){
	        	var table = e.target.nextElementSibling;
	        	var csvString = '';
	        	for(var i=0; i<table.rows.length;i++){
	        		var rowData = table.rows[i].cells;
	        		for(var j=0; j<rowData.length;j++){
	        			csvString = csvString + rowData[j].innerHTML + ",";
	        		}
	        		csvString = csvString.substring(0,csvString.length - 1);
	        		csvString = csvString + "\n";
			    }
	         	csvString = csvString.substring(0, csvString.length - 1);
	         	var a = $('<a/>', {
		            style:'display:none',
		            href:'data:application/octet-stream;base64,'+btoa(csvString),
		            download:'UsersDataLifeware.csv'
		        }).appendTo('body')
		        a[0].click()
		        a.remove();
	        });
    	}
  	}
	});

	app.controller('sampleController',function($scope){
		$scope.message = "";
	});     
                    
        // controladores de botones mainpage
    app.controller("putcontroller", function ($scope, $http, $resource) {
        
    var Geonames = $resource(
                'http://localhost:8080/'+'users/', {}, 
                {
                    query: { method: 'GET', isArray: true }
                }
    );
        
    $scope.data1 = Geonames.query();
        
    $scope.value2=0;
    $scope.notifytitle=" Tus datos están incompletos";
    $scope.notifymessage="  Debes rellenar la forma para que";
    $scope.notifymessage1="tengamos tus datos. Si  no lo haces";
    $scope.notifymessage2= "te llamaremos en unos días. ";
    

        
    var form1 = <%= form1 %>;
    var form2 = <%= form2 %>;
    var form3 = <%= form3 %>;
    var form4 = <%= form4 %>;
    
    if(form1){
        
        $scope.value2=1;
    }
    if(form1 && form2 ){
        
        $scope.value2=2;
    }
    if(form1 && form2 && form3){
        
        $scope.value2=3;
    }
    if(form1 && form2 && form3 && form4){
        $scope.notifytitle="Tus datos están completos";
        $scope.notifymessage=" Atento los proximos días,";
        $scope.notifymessage1="puede que te llamemos pronto";
        $scope.notifymessage2="";
        
    
        $scope.value2=4;
    }
    $scope.SendData = function () {
           // use $.param jQuery function to serialize data from JSON 
         
           var ida= (<%= id %>).toString()  ;
            var data = {
               
                firstName: $scope.firstName,  
                lastName: $scope.lastName,
                birthDate:$scope.birthDate,
                address:$scope.address,
                state:$scope.state,
                form1: true
                
                
            };
      
            $http.put('http://localhost:8080/users/'+ ida , data)
            .success(function (data, status, headers, config) {
                
            window.location.href = "http://localhost:8080/dashboard";    
            })
            .error(function (data, status, header, config) {
                
            });
        }; 
        
    $scope.SendData3 = function () {
           // use $.param jQuery function to serialize data from JSON 
           var ida= (<%= id %>).toString()  ;
            var data = {
               
                cargo: $scope.cargo,  
               
                form3: true
                
                
            };
                
                  
            $http.put('http://localhost:8080/users/'+ ida , data)
            .success(function (data, status, headers, config) {
                 window.location.href = "http://localhost:8080/dashboard";    
                
            })
            .error(function (data, status, header, config) {
                
            });
        };   
        
 
    $scope.SendData4 = function () {
           // use $.param jQuery function to serialize data from JSON 
           var ida= (<%= id %>).toString()  ;
            var data = {
               
               tipoD: $scope.tipoD ,
               techelp: $scope.techelp ,
               registrado: $scope.registrado ,
               pension : $scope.pension ,
               form4: true
           
            };
                
                  
            $http.put('http://localhost:8080/users/'+ ida , data)
            .success(function (data, status, headers, config) {
                 window.location.href = "http://localhost:8080/dashboard";    
                
            })
            .error(function (data, status, header, config) {
                
            });
        }; 
    $scope.SendData2 = function () {
           // use $.param jQuery function to serialize data from JSON 
           var ida= (<%= id %>).toString()  ;
            var data = {
               
            ecolaridad: $scope.ecolaridad,
            ocupacion: $scope.ocupacion,
            omil: $scope.omil,
            experiencialab: $scope.experiencialab,
            form2: true
            };
                
                  
            $http.put('http://localhost:8080/users/'+ ida , data)
            .success(function (data, status, headers, config) {
                 window.location.href = "http://localhost:8080/dashboard";    
                
            })
            .error(function (data, status, header, config) {
                
            });
        };  
        
        
        $scope.SendEmail = function () {
            
            
            
            
           // use $.param jQuery function to serialize data from JSON 
             var ida= (<%= id %>).toString()  ;
    
            $http.get('http://localhost:8080/halp/'+ida);
          
        }; 
        
       
  
               $scope.ShowData = function () {
           // use $.param jQuery function to serialize data from JSON 
           var ida= (<%= id %>).toString()  ;
        
                  
            $http.get('http://localhost:8080/lista/');
           
        };  
        

    });