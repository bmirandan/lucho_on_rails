
    
  angular
    .module('myApp')
    .directive('searchBar', searchBar);

  function searchBar () {
    return {
      restrict: 'E',
      scope: {
        busqueda: '='
      },
          template: '<div class="form-group">'
                + '<input type="text" '
                +        'class="form-control"'
                +        'placeholder="Introduce tu texto a buscar"'
                +        'value= {{busqueda}} '
                +' </div> '
    }
  };



