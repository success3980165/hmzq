//百叶窗
$(".dtp1-1").mouseenter(function() {
	$(this).animate({"width":"300px"},700);
	$(".dtp1-2").animate({"width":"63px"},700);
	$(".dtp1-3").animate({"width":"63px"},700);
})
$(".dtp1-2").mouseenter(function() {
	$(this).animate({"width":"300px"},700);
	$(".dtp1-1").animate({"width":"63px"},700);
	$(".dtp1-3").animate({"width":"63px"},700);
})
$(".dtp1-3").mouseenter(function() {
	$(this).animate({"width":"300px"},700);
	$(".dtp1-1").animate({"width":"63px"},700);
	$(".dtp1-2").animate({"width":"63px"},700);
})
//选项卡
$(".list li").mouseenter(function(){
	var index = $(this).index()
	$(".box li").eq(index).css("display","block").siblings().css("display","none");
	// $(this).css("text-decoration","underline").siblings().css("text-decoration","none");
	$(this).addClass("line").siblings().removeClass("line")
})
//新闻
$(".top_list li").mouseenter(function(){
	var index = $(this).index()
	$(this).addClass("line").siblings().removeClass("line")	
})

// //二级页
// $(".top_list li").mouseenter(function(){
//  var index = $(this).index()
//  $(".s_box li").eq(index).css("display","block").siblings().css("display","none");
//  // $(this).addClass("line").siblings().removeClass("line")
// })

//轮播
    $(".picList").cycle({
        before:function(){
          var index = $(this).index();
          $(".numList li").eq(index).addClass("active").siblings().removeClass("active");
        }
      });
      // $("#picList").cycle();
	$(".numList li").click(function(){
	    var index = $(this).index();
	  $(".picList").cycle(index);
	  $(this).addClass("active").siblings().removeClass("active");
	})
	$(".prev").click(function(){
	      $(".picList").cycle("prev");
	});
	$(".next").click(function(){
	      $(".picList").cycle("next");
	});

//导航
//下拉菜单，解决vue的bug
// $(".commit, .player").mouseenter(function(event){
//     event.preventDefault();
//     $(".commit").css("display","block"); 
// });
// $(".sever, .player1").mouseenter(function(event){
//     event.preventDefault();
//     $(".sever").css("display","block") 
// });
// $(".commit, .player").mouseout(function(){
// 	$(".commit").css("display","none");
// })
// $(".player1, .sever").mouseout(function(){
// 	$(".sever").css("display","none");
// })


$(".commit, .player").hover(function(){  
    $(".commit").show();  
},function(){  
    $(".commit").hide();  
});

$(".sever, .self-help").hover(function(){  
    $(".sever").show();  
},function(){  
    $(".sever").hide();  
});   

//蒙层
$(".new_receive img").click(function() {
	$(".newPerson").css("display","none");
	$(".mengceng").css("display","block");
})
//浮动窗口
$(".top").click(function() {
	$("html,body").animate({scrollTop:0}, 500);
})
//领取礼包复制功能
function copytxt(){
    var d = $(".libao_two");
    d.select(); 
	document.execCommand("Copy");
    alert("已复制到剪贴板"); 
}
//视频刷新bug
$(".radio img").click(function(){
  $(".videoblock").css("display","block")
})