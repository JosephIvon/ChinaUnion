$(function(){
	autoLogin();
	
	// 右侧菜单导航
	$(".rightNav").children("li").hover(function(){
		var $_this = $(this);
		$_this.find("dl").css({
			backgroundColor: "white",
			border: "1px solid #ccc"
		});
		$_this.find("dd").show();
		var isDownload = $_this.hasClass("download");
		if(isDownload){
            $_this.find("dl").css({
                "border-bottom":"none"
            });
        }
	}, function(){
		var $_this = $(this);
		$_this.find("dl").css({
			backgroundColor: "transparent",
			border: "1px solid transparent",
		});
		$_this.find("dd").hide();
	});
	
	// 购物车
	initGoodsCar();
	
	// 购物车显示隐藏
	$(".goodsCar").add(".moreGoods").hover(function(){
		$(".goodsCarDiv").css({
            "background-color":"white"
        });
        $(".moreGoods").show();
	}, function(){
		$(".moreGoods").hide();
	});
	
	$(".goodsCar").click(function () {
        $(this).children(".goodsCarDiv").css({
            "background-color":"white"
        });
        $(".moreGoods").show();
    });
	
	function initGoodsCar(){
		var count = $(".goodsList").find("li").length;
		if(count > 5){
			$(".goodsList").css("height",350 + "px");
		}
	}
	
	//商品列表
    $(".item").mouseover(function () {
        $(this).children(".itemP").css({
            "border-right":"2px solid white",
            "background-color":"white"
        });
        $(this).children(".borderTop").show();
        $(this).children(".borderBottom").show();
        $(this).children(".itemPDetail").show();
        $(this).find(".spanR").hide();

    });
    $(".item").mouseout(function () {
        $(this).children(".itemP").css({
            "border-right":"2px solid #ffa32a"
        });
        $(this).children(".borderTop").hide();
        $(this).children(".borderBottom").hide();
        $(this).children(".itemPDetail").hide();
        $(this).find(".spanR").show();
    });
    
});

function autoLogin(){
	console.log("设置自动登录");
}

  