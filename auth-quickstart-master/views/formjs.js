
       
    var app = angular.module("myApp", []);
        
        
    app.controller("putcontroller", function ($scope, $http) {
    $scope.value2=0;
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
        
    $scope.SendData2 = function () {
           // use $.param jQuery function to serialize data from JSON 
           var ida= (<%= id %>).toString()  ;
            var data = {
               
                cargo: $scope.cargo,  
               
                form2: true
                
                
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
               
               tipoD: $scope.tipoD ,
               techelp: $scope.techelp ,
               registrado: $scope.registrado ,
               pension : $scope.pension ,
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
               
            ecolaridad: $scope.ecolaridad,
            ocupacion: $scope.ocupacion,
            omil: $scope.omil,
            experiencialab: $scope.experiencialab,
            form4: true
            };
                
                  
            $http.put('http://localhost:8080/users/'+ ida , data)
            .success(function (data, status, headers, config) {
                 window.location.href = "http://localhost:8080/dashboard";    
                
            })
            .error(function (data, status, header, config) {
                
            });
        }; 
        

    }); 