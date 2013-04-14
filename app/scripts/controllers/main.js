"use strict";

angular.module("colorClockApp").controller("MainCtrl", function ($scope, $timeout) {
	var now = new Date();
	var then = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);

	$scope.date = now;
	$scope.color = getColorString(getColorNumber(now, then));

	$scope.$watch("date", function() {
		$timeout(function() {
			var now = new Date();
			var colorNumber = getColorNumber(now, then);
			var color = getColorString(colorNumber);

			$scope.date = now;
			$scope.color = color;
		}, 1000);
	});

	function getColorNumber(now, then) {
		var secondsSinceMidnight = (now.getTime() - then.getTime()) / 1000;
		return Math.round(secondsSinceMidnight % 1536)
	}

	function getColorString(number) {
		var red;
		var green;
		var blue;

		switch(Math.floor(number / 256)) {
			case 0:
				// f00 (red)
				red = 256;
				green = 0;
				blue = 256 - (number % 256);
				break;
			case 1:
				// ff0 (yellow)
				red = 256;
				green = (number % 256);
				blue = 0;
				break;
			case 2:
				// 0f0 (green)
				red = 256 - (number % 256);
				green = 256;
				blue = 0;
				break;
			case 3:
				// 0ff (teal)
				red = 0;
				green = 256;
				blue = number % 256;
				break;
			case 4:
				// 00f (blue)
				red = 0;
				green = 256 - (number % 256);
				blue = 256;
				break;
			case 5:
				// f0f (violet)
				red = number % 256;
				green = 0;
				blue = 256;
				break;
		}

		red = Math.floor(red * 0.75);
		green = Math.floor(green * 0.75);
		blue = Math.floor(blue * 0.75);

		return "rgb(" + red + ", " + green + ", " + blue + ")";
	}
});
