angular.module("ezstuff", [])
.directive("ezNamecardEditor", function(){
	return{
		restrict : "E",
		template : "<ul class='nceditor'></ul>",
		replace : true,
		link : function(scope, element, attrs){
			var model = attrs.data;

			element.append("<li>name: <input type='text' field='name'></li>")
					.append("<li>gender: <input type='text' field='gender'></li>")
					.append("<li>age: <input type='text' field='age'></li>");

			element.find("input").on("keyup", function(ev){
				var field = ev.target.getAttribute('field');
				scope[model][field] = ev.target.value;
				scope.$apply("");   //通知更改
			});
		}
	};
})
.directive("ezLogger", function(){
	return{
		restrict : "A",
		link : function(scope, element, attrs){
			var model = attrs.data;

			scope.$watch(model, function(nv){
				var cnt = JSON.stringify(nv, null, "   ");   //必需， 一个有效的 JSON 字符串。
				element.html("<pre>"+cnt+"</pre>");
			}, true);//object
		}

	};
});