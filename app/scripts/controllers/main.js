"use strict";

angular.module("colorClockApp").controller("MainCtrl", function ($scope, $timeout) {
	$scope.date = new Date();

	$scope.$watch("date", function(){
		$timeout(function(){
			$scope.date = new Date();
		}, 1000);
	});
});
