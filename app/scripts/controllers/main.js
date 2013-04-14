"use strict";

angular.module("colorClockApp").controller("MainCtrl", function ($scope, $timeout) {

	// 256 * 6
	var COLORS_PER_CYCLE = 1536;

	// 12 hours
	var SECONDS_PER_CYCLE = 43200;

	function update() {
		var currentDate = new Date();
		var colorNumber = getColorNumber(currentDate);
		var color = getColorString(colorNumber);

		$scope.date = currentDate;
		$scope.color = color;
	}

	// Returns an integer that will be used to determine the background color,
	// based on the current time.
	function getColorNumber(currentDate) {
		var startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
		var secondsSinceMidnight = (currentDate.getTime() - startDate.getTime()) / 1000;

		// The offset is used to change the start color.
		var offset = 21600;

		return Math.round((secondsSinceMidnight + offset) % SECONDS_PER_CYCLE);
	}

	// Returns an rgb() string that will be used in an inline style.
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

	update();

	// Runs the timeout function the first time, and then runs it again
	// each time `date` is updated.
	$scope.$watch("date", function() {
		$timeout(function() {
			update();
		}, 1000);
	});
});
