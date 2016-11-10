$(function(){
	var oUl = document.getElementsByClassName("banner_pic")[0];
	var oBtn = document.getElementsByClassName("banner_btn")[0];
	
	var iNow = 0; // 记录当前被选中的按钮
	var timer = null;
	
	$.ajax({
		url:"../file/index_banner.json",
		type:"GET",
		dataType:"json",
		success:function(data){
			oUl.style.width = 730 * data.length + "px";
			var picsLength = data.length;
			createPics(data);
			
			// 定时器
    		var timer = null, index = 0;
    		$(".banner_pic").css("left", -730 * index);
    		timer = setInterval(function(){
	        			index++;
	        			index %= picsLength;
	        			$(".banner_btn li").eq(index).addClass("active").siblings().removeClass("active");
	        			$(".banner_pic").css("left", -730 * index);
	        		}, 3000);
 
			$(".page_indicator .banner_btn li").mouseover(function(){
				$(this).addClass("active").siblings().removeClass("active");
			}).click(function(){
				clearInterval(timer);
				$(this).addClass("active").siblings().removeClass("active");
				var currentIndex = $(this).index();
				$(".banner_pic").css("left",-730 * currentIndex);
			});
			
			$(".contentMiddle").hover(function(){
				clearInterval(timer);
				$(".btnL").add($(".btnR")).css("display", "inline-block");
			}, function(){
				clearInterval(timer);
				setInterval(function(){
        			index++;
        			index %= picsLength;
        			$(".banner_btn li").eq(index).addClass("active").siblings().removeClass("active");
        			$(".banner_pic").css("left", -730 * index);
        		}, 3000);
				$(".btnL").add($(".btnR")).css("display", "none");
			});

			// 上下页JS交互
			$(".btnL").click(function(){
				clearInterval(timer);
    			stepPageTuring(true, picsLength);
    		});
    		$(".btnR").click(function(){
    			clearInterval(timer);
    			stepPageTuring(false, picsLength);
    		});
			
			function stepPageTuring(isForward, btnNum){
				var currentIndex = $(".banner_btn li").filter(".active").index();
				if (isForward) {
					if (currentIndex == 0) {
        				currentIndex = btnNum - 1;
        			}else{
        				currentIndex--;
        			}
				}else{
					if (currentIndex == btnNum - 1){
        				currentIndex = 0;
        			}else{
        				currentIndex++;
        			}
				}
				$(".banner_pic").css("left", -730 * currentIndex);
    			var node = $(".banner_btn li").eq(currentIndex);
    			node.addClass("active").siblings().removeClass("active");
			};
	
			function createPics(data){
				for(var i = 0; i < data.length; i++){
					var oli = document.createElement("li");
					var a = document.createElement("a");
					var oImg = document.createElement("img");
					oImg.src = "../images/index/" + data[i]["imgName"];
					oImg.alt = data[i]["imgName"];
					a.href = data[i]["link"];
					a.appendChild(oImg);
					oli.appendChild(a);
					oUl.appendChild(oli);

					var oli2 = document.createElement("li");
					if (i == 0) {
						oli2.className = "active";
					};
					oBtn.appendChild(oli2);
					oBtn.style.width = 36 * data.length;
				}
			}
		}
	});
	
	var oNotice = document.getElementsByClassName("notice")[0];
 	var oLiveSer = document.getElementsByClassName("liveSer")[0];
 	var arr = [];
 	
 	$.ajax({
 		url:"../file/notice.json",
 		type:"get",
 		dataType:"json",
 		success:(function(data){
 			var noticeNum = data.length;
 			for(var i = 0; i < noticeNum; i++){
 				var oLi = document.createElement("li");
 				var a = document.createElement("a");
 				a.href = data[i]["link"];
 				a.innerHTML = data[i]["content"];
 				oLi.appendChild(a);
 				oNotice.appendChild(oLi);
 			}
 		})
 	});
 	
 	$.ajax({
 		url:"../file/liveSer.json",
 		type:"get",
 		dataType:"json",
 		success:(function(data){
 			var num = data.length;
 			for(var i = 0; i < num - 1; i++){
 				$(".liveSer li").eq(0).clone(true).appendTo($(".liveSer"));
 			}
 			for (var i = 0; i < num; i++) {
 				$(".borRi a").eq(i).attr("href",data[i]["link"]).find("img").attr("src", "../images/index/" + data[i]["imgName"]);
 				$(".borRi a span").eq(i).html(data[i]["title"]);
 				if(i == num -1){
 					$(".borRi").eq(i).css("border-right", 0);
 				}
 			}
 		})
 	})
 	
 	$.ajax({
 		type:"get",
 		url:"../file/content.json",
 		async:true,
 		dataType:"json",
 		success:function(data){
 			for (var i = 0; i <　data.length - 1; i++) {
 				$(".floor").eq(0).clone(true).appendTo($(".goodsShow"));
 				
 			}
 			for (var i = 0; i <　data.length; i++) {
 				$(".goodsItems").eq(i).attr("class","goodsItems goodsItems"+i);
 				var str = addLink(i, data[i]["floorTitle"]);
 				$(".floorTitle").eq(i).html(str).attr("id","goodsFloor"+i);
 				
 				if(i != 0){
 					var html = ($(".floorTitle").eq(i).text());
 					var name = $(".floorTitle").eq(i).html(str).attr("id");
 					var a = '<a class = "innerA" href = \"#' + name + '\" style = "right: -223px">' + html + '</a>';
 					var span = i!=1?'<span>' + i + 'F</span>':'<span class = "selected">' + i + 'F</span>';
 					var li = '<li class = "floorNum" data-foor =\"' + i + '\">' + span + a + '</li>';
 					$(".floorFixed").append(li);
 				}

 				var objArr = data[i]["child"];
 				for(var j = 0; j < objArr.length - 1; j++){
 					$(".goodsItems .item").eq(0).clone(true).appendTo($(".goodsItems").eq(i));
 				}
 				for(var k = 0; k < objArr.length; k++){
 					if(k%5 == 0){
 						$(".goodsItems" + i + " .item").eq(k).attr("class","item itemLeft item"+k);
 					}else{
 						$(".goodsItems" + i + " .item").eq(k).attr("class","item item"+k);
 					}
 					
 					var imgUrl = parseImgUrl(objArr[k]["id"], objArr[k]["imgName"]);
 					var goodsDetailUrl = "detail.html?postCode=" + objArr[k]["id"];
 					$(".goodsItems" + i + " .item" + k).find("img").attr("src",imgUrl);
					$(".goodsItems" + i + " .item" + k).find("i").html(objArr[k]["score"]);
					$(".goodsItems" + i + " .item" + k).find(".itemTitle").html(objArr[k]["title"]).add($(".goodsItems" + i + " .item" + k).find(".itemPic")).attr("href", goodsDetailUrl);
 				}
 			}
 			$(".last").appendTo($(".floorFixed"));
 			
    		for(var i = 1; i < $(".floorTitle").length; i++){
    			arr.push($(".floorTitle").eq(i).position().top);
    		}    
    		
    		$(".floorNum").hover(function(){
		    	var index = $(this).index() - 1;
		    	$(".innerA").eq(index).css("right", 0);
		    },function(){
		    	var index = $(this).index() - 1;
		    	$(".innerA").eq(index).css("right", -203);
		    });
 		}
 	});
 	
 	//绑定滚动条事件  
    $(window).bind("scroll", function () {  
        var sTop = $(window).scrollTop();  
        var sTop = parseInt(sTop);  
        if (sTop >= 800) { 
        	if(sTop >= arr[0] && sTop < arr[arr.length-1]){
	        	for(var i = 0 ; i < arr.length; i++){
	        		if(sTop >= arr[i] && sTop < arr[i+1]){
	        			$(".floorNum span").attr("class", "");
	        			$(".floorNum span").eq(i).attr("class", "selected");
	        			break;
	        		}
	        	}
	        }else if(sTop >= arr[arr.length-1]){
	        	$(".floorNum span").attr("class", "");
	        	$(".floorNum span").eq(arr.length-1).attr("class", "selected");
	        }
            if (!$(".floorFixed").is(":visible")) {  
                try {  
                    $(".floorFixed").slideDown();  
                } catch(e){
                	$(".floorFixed").show();
                }
            }
        }
        else{
        	if ($(".floorFixed").is(":visible")) {  
                try {  
                    $(".floorFixed").slideUp();  
                } catch (e) {  
                    $(".floorFixed").hide();  
                }                         
            }
        }
    });
});