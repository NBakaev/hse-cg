'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', ['$scope', function ($scope) {
        $scope.radius = 80;

        // $scope.animateCurveTime = 0.1;
        $scope.animateCurveTime = 0;
        $scope.drawRightCircle = true;
        // $scope.rightCircleColor = "#00A430";
        $scope.rightCircleColor = "#ffffff";

        $scope.firstPoints = [];
        $scope.secondPoints = [];

        // $scope.SetPixel = function(canvas, x, y) {
        //     canvas.beginPath();
        //     canvas.moveTo(x, y);
        //     canvas.lineTo(x + 0.4, y + 0.4);
        //     canvas.stroke();
        // };

        // $scope.SetPixel = function (ctx, x, y) {
        //     ctx.beginPath();
        //     ctx.fillStyle = $scope.rightCircleColor;
        //     ctx.strokeStyle = $scope.rightCircleColor;
        //     ctx.arc(x, y, 10, 0, 2 * Math.PI, true);
        //     ctx.fill();
        //     ctx.stroke();
        //     ctx.closePath();
        // };

        $scope.SetPixel = function (ctx, x, y) {
            var pointSize = 3; // Change according to the size of the point.

            ctx.fillStyle = "#ff2626"; // Red color

            ctx.beginPath(); //Start path
            ctx.arc(x, y, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
            ctx.fill(); // Close the path and fill.
            ctx.closePath();
        };

        $scope.drawRightCircleFunction = function (ctx) {
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
                    $scope.SetPixel(ctx, arr[i][0], arr[i][1]);
                }
                $scope.firstPoints = arr;

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
                    $scope.SetPixel(ctx, arr[i][0], arr[i][1]);
                }
                $scope.secondPoints = arr;

                ctx.beginPath();
                flow = getBezierCurve([arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]], 0.01);
                drawLines(ctx, flow, $scope.animateCurveTime);
                ctx.closePath();
            }
        };
        $scope.draw5();


    }]);

