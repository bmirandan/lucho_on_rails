app.controller('OffersCtrl', function($scope, Offer, ngProgress, toaster) {
    
    $scope.offer = new Offer();

    var refresh = function() {
      $scope.offers = Offer.query(); 
      $scope.offer ="";
    }
    refresh();

    $scope.add = function(offer) {
      Offer.save(offer,function(offer){
        refresh();
      });
      location.href = 'okpost.html';
    };

    $scope.update = function(offer) {
      offer.$update(function(){
        refresh();
      });
    };

    $scope.remove = function(offer) {
      offer.$delete(function(){
        refresh();
      });
    };

    $scope.edit = function(id) {
      $scope.offer = Offer.get({ id: id });
    };  

    $scope.deselect = function() {
      $scope.offer = "";
    }

}
)