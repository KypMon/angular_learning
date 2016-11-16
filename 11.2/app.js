angular.module("lottery", [])
    .controller('ctrl_lottery', ['$scope', '$timeout',
        function ($scope, $timeout) {
            //Intialize
            $scope.items = [
                {
                    id: 1,
                    name: "Europe Tour",
                    status: 0
                },
                {
                    id: 2,
                    name: "Macbook Pro",
                    status: 0
                },
                {
                    id: 3,
                    name: "IPhone7",
                    status: 0
                },
                {
                    id: 4,
                    name: "Surface Book",
                    status: 0
                },
                {
                    id: 5,
                    name: "Canon 5D IV",
                    status: 0
                },
                {
                    id: 6,
                    name: "Nikon D810",
                    status: 0
                },
            ];
            $scope.result = "Gift empty";
            $scope.$$ = function (id) {
                return document.getElementById(id);
            }
            //change the different view of this page
            $scope.showhide = function (pre, nex) {
                    pre = "step" + pre;
                    nex = "step" + nex;
                    $scope.$$(pre).style.display = "none";
                    $scope.$$(nex).style.display = "block";
                }
            //the function binding with the gifting start
            $scope.start = function () {
                    $scope.showhide(1, 2);
                //闪烁的圈数
                    var circle = 5;
                //中奖数值随机生成
                    var selkey = Math.floor(Math.random() * $scope.items.length);
                //根据传递的key值将对应奖品的status属性值设置为true
                    var next = function (key) {
                //设置闪烁属性 当前为true
                        $scope.items[key].status = true;
                // 然后前一个取消闪烁
                        if ((key - 1) >= 0)
                            $scope.items[key - 1].status = false;
                //如果是第一个奖品 则最后一个取消闪烁
                        if (key == 0)
                            $scope.items[$scope.items.length - 1].status = false;
                        var timer = $timeout(function () {
                            //闪烁结束
                            if (circle <= 0 && selkey == key) {
                                $scope.showhide(2, 3);
                                $scope.result = $scope.items[key].name;
                                return;
                            }
                            //结束一轮
                            if ($scope.items.length == key + 1) {
                                circle--;
                            }
                            //监测到本轮有下一个元素，则递归显示下一个
                            if ($scope.items[key + 1]) {
                                next(key + 1)
                            } 
                            //本轮没有下一个元素，从下轮头部开始
                            else {
                                next(0)
                            }
                            //0.1秒一轮
                        }, 100);
                    }
                    //开始的时候高亮显示第一个
                    next(0);
                }
            //The function binding with the show of gifts
            $scope.reset = function () {
                $scope.showhide(3, 1);
            }
            $scope.edit = function () {
                    $scope.showhide(3, 4);
                }
            //The function binding with the edit of gifts
            $scope.add = function () {
            //获取最后一个id
                var last_id = lastid();
                $scope.items.push({
                    id: last_id,
                    name: $scope.name,
                    status: 0
                })
            }
            $scope.del = function (id){
                angular.forEach($scope.items, function(value, key){
                    if(id == value.id){
                        $scope.items.splice(key, 1);
                    };
                })
            }
            $scope.return = function() {
                $scope.showhide(4, 3);
            }
            // internal function to get the last data's id
            function lastid() {
                var id = 0;
                angular.forEach($scope.items, function(value, key){
                    if(id < value.id)
                        id = value.id;
                })
                //返回下一个id。
                return ++id;
            }
        }]);