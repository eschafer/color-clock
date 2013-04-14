"use strict";

angular.module("colorClockApp").controller("MainCtrl", function ($scope, $timeout) {
	var COLORS_PER_CYCLE = 1536;
	var SECONDS_PER_CYCLE = 43200;
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
		return Math.round((secondsSinceMidnight + 21600) % SECONDS_PER_CYCLE);
	}

	function getColorString(colorNumber) {
		var secondsPerColor = SECONDS_PER_CYCLE / COLORS_PER_CYCLE;
		var remainder = (colorNumber / secondsPerColor) % 256;
		var red;
		var green;
		var blue;

		switch(Math.floor((colorNumber / secondsPerColor) / 256)) {
			case 0:
				// red to yellow
				red = 256;
				green = remainder;
				blue = 0;
				break;
			case 1:
				// yellow to green
				red = 256 - remainder;
				green = 256;
				blue = 0;
				break;
			case 2:
				// green to teal
				red = 0;
				green = 256;
				blue = remainder;
				break;
			case 3:
				// teal to blue
				red = 0;
				green = 256 - remainder;
				blue = 256;
				break;
			case 4:
				// blue to violet
				red = remainder;
				green = 0;
				blue = 256;
				break;
			case 5:
				// violet to red
				red = 256;
				green = 0;
				blue = 256 - remainder;
				break;
		}

		red = Math.floor(red * 0.8);
		green = Math.floor(green * 0.8);
		blue = Math.floor(blue * 0.8);

		return "rgb(" + red + ", " + green + ", " + blue + ")";
	}
});
