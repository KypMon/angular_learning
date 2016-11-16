angular.module('angular.directives-load-progress', [])
    .directive('loadProgress', [function () {
        return {
            replace: true,
            compile: function (tplele, tplattr, transclude) {
                if (tplele.length === 1) {
                    var node = tplele[0];
                    
                    //创建canvas元素 并初始化相关值
                    var width = node.getAttribute('progress-width') || '200';
                    var height = node.getAttribute('progress-height') || '200';
                    var canvas = document.createElement('canvas');
                    canvas.setAttribute('width', width);
                    canvas.setAttribute('height', height);
                    canvas.setAttribute('progress-model',         node.getAttribute('progress-model'));
                    node.parentNode.replaceChild(canvas, node);
                    //设置绘制圆的各项配置属性值，包括半径，填充的边框色
                    var ocwidth = node.getAttribute('progress-outer-circle-width') || '20';
                    var icwidth = node.getAttribute('progress-inner-circle-width') || '5';
                    var ocbcolor = node.getAttribute('progress-outer-circle-background-color') || '#9a3838';
                    var ocfcolor = node.getAttribute('progress-outer-circle-foreground-color') || '#eee';
                    var iccolor = node.getAttribute('progress-inner-circle-color') || '#666';
                    var lblcolor = node.getAttribute('progress-label-color') || '#9a3838';
                    var ocradius = node.getAttribute('progress-outer-circle-radius') || '80';
                    var icradius = node.getAttribute('progress-inner-circle-radius') || '50';
                    var lblfont = node.getAttribute('progress-label-font') || '30pt Arial';

                    return {
                        pre: function preLink(scope, instanceElement, instanceAttributes, controller) {
                            var expression = canvas.getAttribute('progress-model');
                            scope.$watch(expression, function (newValue, oldValue) {
                                //根据属性值，在页面中进行绘制
                                var ctx = canvas.getContext('2d');
                                ctx.clearRect(0, 0, width, height);
                                var x = width / 2;
                                var y = height / 2;
                                ctx.beginPath();
                                ctx.arc(x, y, parseInt(ocradius), 0, Math.PI * 2, false);
                                ctx.lineWidth = parseInt(ocwidth);
                                ctx.strokeStyle = ocbcolor;
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.arc(x, y, parseInt(icradius), 0, Math.PI * 2, false);
                                ctx.lineWidth = parseInt(icwidth);
                                ctx.strokeStyle = iccolor;
                                ctx.stroke();
                                ctx.font = lblfont;
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillStyle = lblcolor;
                                ctx.fillText(newValue.label, x, y);
                                var startAngle = -(Math.PI / 2);
                                var endAngle = ((Math.PI * 2) * newValue.percentage) - (Math.PI / 2);
                                var anticlockwise = false;
                                ctx.beginPath();
                                ctx.arc(x, y, parseInt(icradius), startAngle, endAngle, anticlockwise);
                                ctx.lineWidth = parseInt(icwidth);
                                ctx.stroke();
                            }, true);
                        }
                    };
                }
            }
        };
    }]);

angular.module('progress', ['angular.directives-load-progress'])
    .controller('ctrl_progress', function ($scope, $interval) {
        $scope.ProgressValue = {
            label: 0,
            precentAge: 0.00
        };
        $scope.$watch('ProgressValue', function (newValue) {
            newValue.percentage = newValue.label / 100;
        }, true);
        $scope.start = function (t) {
            var i = 0;
            var n = $interval(function () {
                i++;
                $scope.ProgressValue.label = i;
                if (i == 100) {
                    $interval.cancel(n);
                }
            }, 500);
        }
    });