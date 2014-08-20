
(function() {
  var app = angular.module('app', []);

  app.controller('Table', Table);
  app.factory('LASI', LASI);

  function Table($scope, LASI) {
    $scope.orderByField = 'percent';
    $scope.reverseSort = true;

    LASI.loadIndex().then(
    function(data) {
      $scope.data = data;
    });
  }

  

  function LASI($http){
    var url   = "assets/csv/local_authority_spend_index.csv";

    return {
      loadIndex: loadIndex
    }

    function loadIndex() {
      return $http.get(url).then(function(response){
        return parseCSV(response.data);
      });
    }
    

    /**
     * Take a CSV string and parse and convert to Javascript array
     */
    function parseCSV(csv){
      var lines=csv.split("\n"),
          result = [],
          headers=lines[0].split(",");
     
      for(var i=1;i<lines.length;i++){
        var obj = {},
            currentline=lines[i].split(",");
     
        for(var j=0;j<headers.length;j++){
          obj[headers[j]] = (isNaN(currentline[j])) ? ucFirstAllWords(currentline[j]) : parseFloat(currentline[j]);

        }

        result.push(obj);
      }
      //console.log(result);
      return result;
    }

    function ucFirstAllWords( str )
    {
        str = str.toLowerCase();
        var pieces = str.split(" ");
        for ( var i = 0; i < pieces.length; i++ )
        {
            var j = pieces[i].charAt(0).toUpperCase();
            pieces[i] = j + pieces[i].substr(1);
        }
        return pieces.join(" ");
    }
  }

  

})();
