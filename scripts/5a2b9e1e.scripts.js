"use strict";angular.module("colorClockApp",[]).config(["$routeProvider",function(e){e.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("colorClockApp").controller("MainCtrl",["$scope","$timeout",function(e,t){function r(e){var t=new Date(e.getFullYear(),e.getMonth(),e.getDate(),0,0,0),r=(e.getTime()-t.getTime())/1e3,o=21600;return Math.round((r+o)%n)}function o(e){var t,r,o,c=n/a,l=e/c%256;switch(Math.floor(e/c/256)){case 0:t=256,r=l,o=0;break;case 1:t=256-l,r=256,o=0;break;case 2:t=0,r=256,o=l;break;case 3:t=0,r=256-l,o=256;break;case 4:t=l,r=0,o=256;break;case 5:t=256,r=0,o=256-l}return t=Math.floor(.8*t),r=Math.floor(.8*r),o=Math.floor(.8*o),"rgb("+t+", "+r+", "+o+")"}var a=1536,n=43200;e.$watch("date",function(){t(function(){var t=new Date,a=r(t),n=o(a);e.date=t,e.color=n},1e3)})}]);