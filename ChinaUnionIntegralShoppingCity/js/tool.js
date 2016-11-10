// 判断字符串是否为空
function isNoEmpty(str){
	if(str != "" && str != null && str != undefined){
		return true;
	}else{
		return false;
	}
}

// 设置欢迎语
var getWelcomeString = function () {
    var welcomeStr = new String();
    var hour = (new Date()).getHours();
    if (hour >= 5 && hour < 10) {
        welcomeStr = "早上好";
    } else if (hour >= 10 && hour < 12) {
        welcomeStr = "上午好";
    } else if (hour >= 12 && hour < 19) {
        welcomeStr = "下午好";
    } else {
        welcomeStr = "晚上好";
    }
    return welcomeStr;
};

//给字符串包装一个a标签, n表示索引
function addLink(n, arr){
	var str = String();
	if(n != 0){
		str += n + "F "; 
	}
	for(var key in arr){
		var postCode = arr[key]["postCode"];
		if(isNoEmpty(postCode)){
			var url = "production.html?postCode=" + postCode;
			var content = arr[key]["name"];  
			str += "<a href = \'" + url + "\' target = '_blank'>" + content + "</a> ";
		}else{
			str += arr[key]["name"] + " ";
		}
	}
	return str;
}

// 创建标签
function buildHTML(tag, html, attrs){
	if(typeof(html) != 'string'){
		attrs = html;
		html = null;
	}
	var h = '<' +　tag;
	for(var attr in attrs){
		if (attrs[attr] === false) {
			continue;
		};
		h += " " + attr + "='" + attrs[attr] + "'";
	}
	return h += html ? ">" + html + "</" + tag + ">" : "/>" + "</" + tag + ">";
}

function parseImgUrl(id, imgName){
	var str = id.toString(), arr = [];
	for(var i = 0; i < str.length; i += 2){
		var subStr = str.substring(i, i + 2);
		arr.push(subStr);
	}
	
	var url = "../images/goodsList/";
	
	switch (arr[0]){
		case '01':
			url += "communicationGift/";
			switch (arr[1]){
				case '01':
					url += "card/";
					break;
				case '02':
					url += "cost/";
					break;
				default:
					break;
			}
			break;
		case '02':
			url += "homeDailyNecessities/";
			switch (arr[1]){
				case '01':
					url += "kitchenDepartment/";
					break;
				case '02':
					url += "homeImprovement/";
					break;
				case '03':
					url += "dailyUse/";
					break;
				default:
					break;
			}
			break;
		case '03':
			url += "householdAppliances/";
			switch (arr[1]){
				case '01':
					url += "lifeElectric/";
					break;
				case '02':
					url += "personHealth/";
					break;
				case '03':
					url += "kitchenElectric/";
					break;
				default:
					break;
			}	
			break;
		case '04':
			url += "phoneAccessories/";
			switch (arr[1]){
				case '01':
					url += "phoneAccessories/";
					break;
			}	
			break;
		case '05':
			url += "digitalProducts/";
			switch (arr[1]){
				case '01':
					url += "mediaEntertainment/";
					break;
				case '02':
					url += "digitalAccessories/";
					break;
				default:
					break;
			}	
			break;
		case '06':
			url += "computerPeripherals/";
			switch (arr[1]){
				case '01':
					url += "stationeryAndOA/";
					break;
				case '02':
					url += "peripheralProducts/";
					break;
				case '03':
					url += "networkingProducts/";
					break;
				default:
					break;
			}
			break;
		case '07':
			url += "automotiveSurrounding/";
			switch (arr[1]){
				case '01':
					url += "carDecoration/";
					break;
				case '02':
					url += "autoCareAndMaintenance/";
					break;
				case '03':
					url += "onvehicleElectric/";
					break;
				default:
					break;
			}
			break;
		case '08':
			url += "luggageAccessories/";
			switch (arr[1]){
				case '01':
					url += "creativeGifts/";
					break;
			}
			break;
		case '09':
			url += "personCosmetics/";
			switch (arr[1]){
				case '01':
					url += "facialCare/";
					break;
				case '02':
					url += "bodyCare/";
					break;
				case '03':
					url += "beautyCareTools/";
				break;
				default:
					break;
			}
			break;
		case '10':
			url += "maternalAndChildSupplies/";
			switch (arr[1]){
				case '01':
					url += "bathAndClean/";
					break;
			}
			break;
		case '11':
			url += "foodHealthCare/";
			switch (arr[1]){
				case '01':
					url += "drinks/";
					break;
				case '02':
					url += "northAndSouthSolidStuff/";
					break;
				case '03':
					url += "grainOilAndFlour/";
				break;
				case '04':
					url += "prepared/";
					break;
				case '05':
					url += "snackFood/";
					break;
				default:
					break;
			}
			break;
		case '12':
			url += "businessTravelServices/";
			switch (arr[1]){
				case '01':
					url += "hotels/";
					break;
				case '02':
					url += "airTickets/";
					break;
				default:
					break;
			}
			break;
		case '13':
			url += "lifeGames/";
			switch (arr[1]){
				case '01':
					url += "catering/";
					break;
				case '02':
					url += "games/";
					break;
				case '03':
					url += "recreation/";
				break;
				case '04':
					url += "services/";
					break;
				case '05':
					url += "attractionsTickets/";
					break;
				default:
					break;
			}
			break;
		default:
			break;
	}
	return url += imgName;
}

// 绑定事件的兼容性写法
function addEvent(obj, type, func){
	if(obj.addEventListener){
		obj.addEventListener(type, func, false);
	}else if(obj.attachEvent){
		obj.attachEvent("on" + type, func);
	}
}

function removeEvent(obj, type, func){
	if(obj.removeEventListener){
		obj.removeEventListener(type, func);
	}else if(obj.detachEvent){
		obj.detachEvent("on" + type, func);
	}
}

// 随机生成4位数的验证码
function autoMakeRandomFourCode(n){
	var arr = [];
	for(var i = 0; i < n; i++){
		var num  = parseInt(Math.random() * 100);
		if(num >= 0 && num <= 9){
			arr.push(num);
		}else if(num >= 10 && num <= 35){
			arr.push(String.fromCharCode(num + 87));
		}else if(num >= 65 && num <= 90){
			arr.push(String.fromCharCode(num));
		}else{
			i--;
			continue;
		}
	}
	return arr.join("");
}
//判断cookie是否为空
var isEmpty = function (cookieValue) {
    return typeof cookieValue === 'undefined' || cookieValue === 'undefined|undefined' || cookieValue === null
        || cookieValue === '' || cookieValue === '|';
};

// 设置cookie
function setCookie(name, value, expires, path, domain, isSecure){
	var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value); //进行cookie的拼接
	if(expires){
		cookieText += ";expires=" + expires;
	}
	if(path){
		cookieText += ";path=" + path;
	}
	if(domain){
		cookieText += ";domain=" + domain;
	}
	if(isSecure){
		cookieText += ";secure";
	}
	document.cookie = cookieText;
}

// 获取cookie
function getCookie(name){
	var cookieText = decodeURIComponent(document.cookie);
	var start = cookieText.indexOf(name + "=");
	if(start == -1){
		return;
	}else{
		var end = cookieText.indexOf(";", start);
		if(end == -1){
			end = cookieText.length;
		}
		var value = cookieText.substring(start, end);
		var arr = value.split("=");
		return arr[1];
	}	
}

// 移除cookie
function removeCookie(name){
	document.cookie = encodeURIComponent(name) + "= ;expires=" + new Date(0);
}

function getDate(n){
	var date = new Date();
	var day = date.getDate();
	date.setDate(day + n);
	return date;
}