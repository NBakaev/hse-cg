////////////// COUNT

/**
 *
 * @param i номер вершины
 * @param n количество вершин
 * @param t положение кривой (от 0 до 1)
 * @returns {number}
 */
function getBezierBasis(i, n, t) {
    // Факториал
    function f(n) {
        return (n <= 1) ? 1 : n * f(n - 1);
    }

    // считаем i-й элемент полинома Берштейна
    return (f(n) / (f(i) * f(n - i))) * Math.pow(t, i) * Math.pow(1 - t, n - i);
}

/**
 *
 * @param arr массив опорных точек. Точка - двухэлементный массив, (x = arr[0], y = arr[1])
 * @param step шаг при расчете кривой (0 < step < 1), по умолчанию 0.01. Чем больше шаг - тем грубее кривая
 * @returns {Array}
 */
function getBezierCurve(arr, step) {
    if (step === undefined) {
        step = 0.01;
    }

    var res = [];
    step = step / arr.length;

    for (var t = 0.0; t < 1 + step; t += step) {
        if (t > 1) {
            t = 1;
        }

        var ind = res.length;
        res[ind] = [0, 0];

        for (var i = 0; i < arr.length; i++) {
            var b = getBezierBasis(i, arr.length - 1, t);

            res[ind][0] += arr[i][0] * b;
            res[ind][1] += arr[i][1] * b;
        }
    }

    return res;
}

/**
 *
 * @param ctx rendering context холста
 * @param arr массив точек по которым строим кривую
 * @param delay задержка перед отрисовкой следующей точки
 * @param pause пауза перед началом  рисования
 */
function drawLines(ctx, arr, delay, pause) {
    if (delay === undefined) {
        delay = 20;
    }

    if (pause === undefined) {
        pause = delay;
    }
    var i = 0;

    function delayDraw() {
        if (i >= arr.length - 1) {
            return;
        }

        ctx.moveTo(arr[i][0], arr[i][1]);
        ctx.lineTo(arr[i + 1][0], arr[i + 1][1]);
        ctx.strokeStyle = '#000000';
        ctx.stroke();

        ++i;

        if (delay > 0) {
            setTimeout(delayDraw, delay);
        }
        else {
            delayDraw();
        }
    }

    if (pause > 0) {
        setTimeout(delayDraw, pause);
    }
    else {
        delayDraw();
    }
}


















$scope = {};
$scope.radius = 1;
$scope.minDistanceInCoordinates;

var minApprox = 3000;

// for (var randY = 0.001; randY < 3; randY += 0.001) {
for (var randY = 1; randY < 3; randY += 0.001) {
    var arr = [];

    arr[0] = [$scope.radius, 0];
    arr[1] = [$scope.radius, randY * $scope.radius];
    arr[2] = [-13 / 3 * $scope.radius, 0];
    arr[3] = [$scope.radius, -randY * $scope.radius];
    arr[4] = [$scope.radius, 0];
    var flow = getBezierCurve([arr[0], arr[1], arr[2], arr[3], arr[4]], 0.001);

    var distanceToStart = 0;
    for (var j = 0; j < flow.length; j++) {
        distanceToStartPoint = Math.abs(Math.hypot(flow[j][0] - 0, flow[j][1] - 0) - $scope.radius) ;
        distanceToStart+=distanceToStartPoint;
    }

    if (distanceToStart < minApprox){
        $scope.minDistanceInCoordinates = randY;
        minApprox = distanceToStart;
    }
}
console.log($scope.minDistanceInCoordinates);
console.log(minApprox);