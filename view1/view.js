'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', function ($scope) {

        $scope.polygon = [];
        $scope.animateCurveTime = 0;
        $scope.rightCircleColor = "#00A430";

        $scope.drawPoly = function (points) {
            var drawC = document.getElementById('arpoly-1');
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

                drawLines(ctx, points, $scope.animateCurveTime);
                ctx.closePath();
            }
        };

        /**
         * Тест пересечения отрезков на 2D плоскости
         *
         * @param _a точка [] начала 1 отрезка
         * @param _b точка [] конца 1 отрезка
         * @param _c точка [] начала 2 отрезка
         * @param _d точка [] конца 2 отрезка
         * @returns {boolean} true если отрезки пересекаются, false - не пересекаются
         */
        $scope.segm_test = function (_a, _b, _c, _d) {
            var a = _a[0];
            var b = _a[1];

            var c = _b[0];
            var d = _b[1];

            var p = _c[0];
            var q = _c[1];

            var r = _d[0];
            var s = _d[1];

            var det, gamma, lambda;
            det = (c - a) * (s - q) - (r - p) * (d - b);
            if (det === 0) {
                return false;
            } else {
                lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
                gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
                return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
            }
        };

        $scope.generateRandomPoint = function (allPoints, pointIndex, stepA, stepB) {
            var q = [];
            var fi = rnd(2 * Math.PI);
            var d = stepA + rnd(stepB - stepA);

            q[0] = allPoints[pointIndex][0] + d * (Math.cos(fi));
            q[1] = allPoints[pointIndex][1] + d * (Math.sin(fi));
            return q;
        };

        $scope.finalCheck = function (allPoints) {
            for (var m = 0; m < allPoints.length - 1; m++) {
                for (var j = 0; j < allPoints.length - 1; j++) {
                    if (m == j) {
                        continue;
                    }
                    if ($scope.segm_test(allPoints[m], allPoints[m + 1], allPoints[j], allPoints[j + 1])) {
                        return true;
                    }
                }
            }
        };
        /**
         *
         * @param startPoint начало первой точки, например [10, 10]
         * @param stepA определяет диапазон изменения длины шага d  (a, b)
         * @param stepB определяет диапазон изменения длины шага d  (a, b)
         * @param minPoints m ≥ 3 задает  минимальный номер вершины pm, с которой начинается проверка возможности замыкания полилинии ребром pmp
         * @param maxPoints пятый аргумент M ≥ m ограничивает максимальное число шагов хаотического блуждания для предотвращения его зацикливания в случае невозможности замыкания полилинии из глубин построенного лабиринта
         *
         * @returns {Array} - массив точек, который нужно последовательно соеденить для построения полигона
         */
        $scope.arpoly = function (startPoint, stepA, stepB, minPoints, maxPoints) {
            var allPoints = [];
            allPoints.push(startPoint);

            for (var i = 0; i < maxPoints; i++) {
                var currentElement = [];
                currentElement = $scope.generateRandomPoint(allPoints, i, stepA, stepB);

                // если у нас меньше точек, чем минимум необходимо - просто добавить
                // точки не пересекаются, проверок не надо
                if ((i < 3) || i < minPoints) {
                    allPoints.push(currentElement);
                    continue;
                }

                for (var p = 0; p < allPoints.length - 1; p++) {
                    var s2 = $scope.segm_test(allPoints[allPoints.length - 1], currentElement, allPoints[p], allPoints[p + 1]);
                    if (s2 == false) {
                    }
                    if (s2 == true) {
                        return null;
                    }
                }
                allPoints.push(currentElement);

                // если меньше максимальных точек но больше или равно минимум точек - проверить, можно ли провести от конца к началу линию
                if (i >= minPoints) {
                    // соеденить первую точку и последннюю и не пересекались чтобы
                    for (var p2 = 1; p2 < allPoints.length - 1; p2++) {
                        var s22 = $scope.segm_test(allPoints[0], allPoints[allPoints.length - 1], allPoints[p2], allPoints[p2 + 1]);
                        if (s22 == false) {
                        }
                        if (s22 == true) {
                            return null;
                        }
                    }
                    allPoints.push(allPoints[0]);
                    if ($scope.finalCheck(allPoints)) {
                        return null;
                    }

                    return allPoints;
                }
            }
            return null;
        };

        $scope.arpolyHelper = function (startPoint, stepA, stepB, minPoints, maxPoints) {
            // пробуем 1000 раз построить полигон
            for (var i = 0; i < 90000; i++) {
                var result = $scope.arpoly(startPoint, stepA, stepB, minPoints, maxPoints);
                if (result != null) {
                    return result;
                }
            }
            console.error("failed arpoly");
            return null;
        };

        $scope.a = 10;
        $scope.b = 60;
        $scope.m = 4;
        $scope.MM = 8;

        $scope.randomPoly = function () {
            $scope.polygon = $scope.arpolyHelper([0, 0], $scope.a, $scope.b, $scope.m, $scope.MM);
            console.log($scope.polygon);
        };

        $scope.draw4 = function () {
            try {
                if ($scope.polygon == null) {
                    $scope.randomPoly();
                }

                $scope.randomPoly();
                $scope.drawPoly($scope.polygon);
            } catch (e) {
                if ($scope.polygon == null) {
                    $scope.randomPoly();
                }

                $scope.randomPoly();
                $scope.drawPoly($scope.polygon);
            }
        };
        $scope.draw4();

        $scope.redraw = function () {
            $scope.drawPoly($scope.polygon);
        }

    }]);