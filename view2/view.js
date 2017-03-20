'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view.html',
            controller: 'View2Ctrl'
        });
    }])


    .controller('View2Ctrl', ['$scope', 'drawService', function ($scope, drawService) {
        $scope.radius = 80;

        // $scope.animateCurveTime = 0.1;
        $scope.animateCurveTime = 0;
        $scope.drawRightCircle = false;
        $scope.rightCircleColor = "#00A430";

        $scope.firstPoints = [];
        $scope.secondPoints = [];

        $scope.drawRightCircleFunction = function (ctx) {
            ctx.beginPath();
            ctx.fillStyle = $scope.rightCircleColor;
            ctx.strokeStyle = $scope.rightCircleColor;
            ctx.arc(0, 0, $scope.radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        };

        $scope.draw4 = function () {
            var drawC = document.getElementById('bezier2-1');
            if (drawC && drawC.getContext) {
                var ctx = drawC.getContext('2d');
                ctx.lineWidth = 0.1;

                // clear canvas
                drawC.width = drawC.width;

                ctx.beginPath();

                // центр canvas - не верхний левый угол, а центр canvas
                var transX = drawC.width * 0.5,
                    transY = drawC.height * 0.5;
                ctx.translate(transX, transY);

                if ($scope.drawRightCircle) {
                    $scope.drawRightCircleFunction(ctx);
                }
                ctx.closePath();

                var flow; // Массив точек
                var arr = [];

                arr[0] = [$scope.radius, 0];
                arr[1] = [$scope.radius, 2.564 * $scope.radius];
                arr[2] = [-13 / 3 * $scope.radius, 0];
                arr[3] = [$scope.radius, -2.564 * $scope.radius];
                arr[4] = [$scope.radius, 0];

                for (var i = 0; i < arr.length; i++) {
                    drawService.drawPoint(ctx, arr[i][0], arr[i][1]);
                }
                $scope.firstPoints = arr;

                drawService.drawCoordinateSystem(drawC, ctx);
                ctx.beginPath();
                flow = getBezierCurve([arr[0], arr[1], arr[2], arr[3], arr[4]], 0.01);
                drawLines(ctx, flow, $scope.animateCurveTime);
                ctx.closePath();
            }
        };
        $scope.draw4();


        $scope.draw5 = function () {
            var drawC = document.getElementById('bezier2-2');
            if (drawC && drawC.getContext) {
                var ctx = drawC.getContext('2d');
                ctx.lineWidth = 0.1;

                // clear canvas
                drawC.width = drawC.width;

                // ctx.beginPath();

                // центр canvas - не верхний левый угол, а центр canvas
                var transX = drawC.width * 0.5,
                    transY = drawC.height * 0.5;
                ctx.translate(transX, transY);

                if ($scope.drawRightCircle) {
                    $scope.drawRightCircleFunction(ctx);
                }

                var flow; // Массив точек
                var arr = [];

                arr[0] = [$scope.radius, 0];
                arr[1] = [$scope.radius, 1.64 * $scope.radius];
                arr[2] = [-11 / 5 * $scope.radius, 2.08 * $scope.radius];
                arr[3] = [-11 / 5 * $scope.radius, -2.08 * $scope.radius];
                arr[4] = [$scope.radius, -1.64 * $scope.radius];
                arr[5] = [$scope.radius, 0];

                for (var i = 0; i < arr.length; i++) {
                    drawService.drawPoint(ctx, arr[i][0], arr[i][1]);
                }
                $scope.secondPoints = arr;

                drawService.drawCoordinateSystem(drawC, ctx);
                ctx.beginPath();
                flow = getBezierCurve([arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]], 0.01);
                drawLines(ctx, flow, $scope.animateCurveTime);
                ctx.closePath();
            }
        };
        $scope.draw5();


        ////////////// COUNT
        var allDistances = [];
        $scope.minDistanceInCoordinates;

        var pogreshnMin = 3000;

        // for (var randY = 0.001; randY < 3; randY += 0.001) {
        for (var randY = 1; randY < 3; randY += 0.001) {
            var arr = [];
            allDistances = [];

            arr[0] = [$scope.radius, 0];
            arr[1] = [$scope.radius, randY * $scope.radius];
            arr[2] = [-13 / 3 * $scope.radius, 0];
            arr[3] = [$scope.radius, -randY * $scope.radius];
            arr[4] = [$scope.radius, 0];
            var flow = getBezierCurve([arr[0], arr[1], arr[2], arr[3], arr[4]], 0.1);

            var distanceToStart;
            for (var j = 0; j < flow.length; j++) {
                distanceToStart = Math.abs(Math.hypot(flow[j][0] - 0, flow[j][1] - 0) - $scope.radius) ;
                allDistances.push(distanceToStart);
            }

            // по возрастанию
            var allDistances = allDistances.sort();
            var dist = Math.abs( allDistances[allDistances.length - 1] - $scope.radius ) ;

            if (pogreshnMin > dist){
                $scope.minDistanceInCoordinates = randY;
                pogreshnMin = dist;
            }
        }
        console.log(pogreshnMin, $scope.minDistanceInCoordinates);
        $scope.$applyAsync();

    }])
    .controller('View3Ctrl', ['$scope', 'drawService', function ($scope, drawService) {
        var goodParam = 3000;
        var allDistances = [];
        $scope.minDistanceInCoordinates = null;

        for (var randY = 0.001; randY < 3; randY += 0.001) {
            var arr = [];

            arr[0] = [$scope.radius, 0];
            arr[1] = [$scope.radius, randY * $scope.radius];
            arr[2] = [-13 / 3 * $scope.radius, 0];
            arr[3] = [$scope.radius, -randY * $scope.radius];
            arr[4] = [$scope.radius, 0];
            var flow = getBezierCurve([arr[0], arr[1], arr[2], arr[3], arr[4]], 0.01);

            for (var j = 0; j < flow.length; j++) {
                var distanceToStart = Math.hypot(1 - 0, randY - 0);
                allDistances.push(distanceToStart);
            }

            // по возрастанию
            var allDistances = flow.sort();
            if (allDistances[allDistances.length -1] < minDistanceInCoordinates){
                $scope.minDistanceInCoordinates = randY;
            }
        }

    }])
;

