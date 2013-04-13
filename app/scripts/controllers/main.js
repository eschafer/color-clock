"use strict";

angular.module("colorClockApp").controller("MainCtrl", function ($scope, $timeout) {
	var now = new Date();
	var then = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);

	$scope.date = now;

	$scope.$watch("date", function() {
		$timeout(function() {
			var now = new Date();
			var colorNumber = Math.round(((now.getTime() - then.getTime()) / 1000) % 1536);
			var color = getColorString(colorNumber);
			console.log(color);

			$scope.date = now;
			$scope.color = color;
		}, 1000);
	});

	function getColorString(number) {
		var red;
		var green;
		var blue;

		switch(Math.floor(number / 256)) {
			case 0:
				// ff0000
				red = 256;
				green = 0;
				blue = 256 - (number % 256);
				break;
			case 1:
				// ffff00
				red = 256;
				green = (number % 256);
				blue = 0;
				break;
			case 2:
				// 00ff00
				red = 256 - (number % 256);
				green = 256;
				blue = 0;
				break;
			case 3:
				// 00ffff
				red = 0;
				green = 256;
				blue = number % 256;
				break;
			case 4:
				// 0000ff
				red = 0;
				green = 256 - (number % 256);
				blue = 256;
				break;
			case 5:
				// ff00ff
				red = number % 256;
				green = 0;
				blue = 256;
				break;
		}

		red = Math.floor(red * .8);
		green = Math.floor(green * .8);
		blue = Math.floor(blue * .8);

		return "rgb(" + red + ", " + green + ", " + blue + ")";
	}
});
