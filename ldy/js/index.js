$(function() {
	// 关闭
	$(".close_dialog").click(function(){
		$("#cover").css("display", "none");
		$(".libaozhanshi").css("display", "none");
		$(".lingqusuccess").css("display","none");
	})
	// index领取按钮点击，显示弹框
	$(".lingqu").click(function() {
		$("#cover").css("display", "block");
		$(".libaozhanshi").css("display", "block");
	})
	// 立即领取，显示礼包码
	$(".lijilingqu").click(function(){
		$(".libaozhanshi").css("display", "none");
		$(".lingqusuccess").css("display","block");
		// 检测当前浏览器有无领取过
		var storage = window.localStorage;
		// storage.removeItem("gifts");
		// console.log(storage);
		var libaocode = storage.gifts;
		console.log(libaocode);
		if(!libaocode){
			console.log("从未领取过,发送请求");
			$.get("http://activity.api.hulai.com/api/activity2/21/getGifts",function(data){
				console.log(data);
				storage.gifts = data.gifts;
				libaocode = data.gifts;
				$(".libaoma").val(data.gifts);
			})
		}else{
			console.log("已经领取过，显示已领取的礼包码");
			$(".libaoma").val(libaocode);
		}
	})
	// 复制礼包码
	$(".copy").click(function(){
    	var p = $(".libaoma");
  		var selected = select(p[0]);
  		console.log('首先选中的内容:' + selected);
  		var succeeded = false;
 		try {
    		// copy cut
    		succeeded = document.execCommand('copy');
    	} catch (err) {
        succeeded = false;
    	console.log('复制失败!');
  		}
  		if (succeeded) {
    		console.log('复制成功!');
    		alert("已成功复制至剪贴板");
 		}
	})

})
