$(function(){
 	$.ajax({
 		type:"get",
 		url:"../file/help.json",
 		dataTtype:"json",
 		success:function(data){
 			var arr = data["child"];
 			for(var i = 0; i < arr.length - 1; i++){
 				$(".subDetail").eq(0).clone(true).appendTo($(".serDetail"));
 			}
 			for(var i = 0; i < arr.length; i++ ){
 				$(".serItems .serTitle").eq(i).html('<h2>' + arr[i]["title"] + '</h2>');
 				var subArr = arr[i]["classify"];
 				var type = arr[i]["content"];
 				for (var j = 0; j < subArr.length - 1; j++) {
 					$(".serItems .serItem").eq(0).clone(true).appendTo($(".subDetail").eq(i).find(".serItems"));
 				}
 				for (var k = 0; k < subArr.length; k++) {
 					if(type == 'text'){
 						($(".serItems").eq(i).find(".serItem")).eq(k).html('<a href = "help.html？help = "' + ' target = "_blank">' + subArr[k]["name"] + '</a>');
 					}
 					else if(type == 'image'){
 						($(".serItems").eq(i).find(".serItem")).eq(k).html('<a href = "javascript:void(0)" target = "_blank"><img src = \"' + subArr[k]["name"] + '\"\></a>');
 					}
 				}
 			}
 		}
 	});
 });