/**
 * Created by ya on 12/13/2016.
 */
angular.module('myApp.drawServices', [])

    .service('drawService', [function () {

        var self = this;

        /**
         * рисовать стрелочку
         *
         * @param context
         * @param fromx
         * @param fromy
         * @param tox
         * @param toy
         */
        self.canvasArrow = function(context, fromx, fromy, tox, toy){
            var headlen = 10;   // length of head in pixels
            var angle = Math.atan2(toy-fromy,tox-fromx);
            context.moveTo(fromx, fromy);
            context.lineTo(tox, toy);
            context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
            context.moveTo(tox, toy);
            context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
        };

        /**
         * рисовать точку
         *
         * @param ctx
         * @param x
         * @param y
         */
        self.drawPoint = function (ctx, x, y) {
            var pointSize = 3; // Change according to the size of the point.

            ctx.fillStyle = "#ff2626"; // Red color

            ctx.beginPath(); //Start path
            ctx.arc(x, y, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
            ctx.fill(); // Close the path and fill.
            ctx.closePath();
        };

        /**
         * рисовать кооридатную плоскость
         *
         * @param drawC
         * @param context
         */
        self.drawCoordinateSystem = function (drawC, context) {
            context.lineWidth=1;
            context.strokeStyle = "#4b4b4b";

            context.beginPath(); //Start path
            for (var x = -drawC.width / 2; x <= drawC.width; x += 10) {
                context.moveTo(x, 0);
                context.lineTo(x, -drawC.height);
            }

            for (var y = -drawC.height / 2; y <= drawC.height; y += 10) {
                context.moveTo(0, y);
                context.lineTo(-drawC.width, y);
            }

            for (var x = -drawC.width / 2; x <= drawC.width; x += 10) {
                context.moveTo(x, 0);
                context.lineTo(x, drawC.height);
            }

            for (var y = -drawC.height / 2; y <= drawC.height; y += 10) {
                context.moveTo(0, y);
                context.lineTo(drawC.width, y);
            }
            context.strokeStyle = "#eee";
            context.closePath();
            context.stroke();

            context.lineWidth=2;
            context.strokeStyle = "#838383";

            context.beginPath(); //Start path
            self.canvasArrow(context,0,0,drawC.width/2-3,0);
            self.canvasArrow(context,0,0,0, -drawC.height/2+3);
            context.stroke();
            context.closePath();

            context.beginPath(); //Start path
            context.moveTo(0, 0);
            context.lineTo(drawC.width/2,0);
            context.stroke();
            context.closePath();

            context.beginPath(); //Start path
            context.moveTo(0, 0);
            context.lineTo(-drawC.width/2,0);
            context.stroke();
            context.closePath();

            context.beginPath(); //Start path
            context.moveTo(0, 0);
            context.lineTo(0,-drawC.height/2);
            context.stroke();
            context.closePath();

            context.beginPath(); //Start path
            context.moveTo(0, 0);
            context.lineTo(0,drawC.height/2);
            context.stroke();
            context.closePath();

        };

    }])