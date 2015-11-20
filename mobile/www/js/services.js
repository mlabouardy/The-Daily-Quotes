angular.module('starter.services', [])

.factory('Quotes',function($http){
	var baseUrl="http://51.254.132.239:3000/quotes/";
	return{
		getQuotes:function(category){
			return $http.get(baseUrl+category);
		}
	}
});