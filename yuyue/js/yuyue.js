var hoolaiActivityAPI = new hoolaiActivity2API(7, true);
// 更新图形验证码
$("#img").click(function () {
  $(this).attr("src", hoolaiActivityAPI.getVerifyImgNumber());
}).attr("src", hoolaiActivityAPI.getVerifyImgNumber());

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

var channelId = getUrlParam('channel');
var channelData = {};
channelData.channelName = '';
function loadData() {
  if (channelId) {
    $.getJSON('./channel.json', function(list) {
  list.forEach(function(item) { 
    if ((item.channelId+"") === channelId) {
      channelData = item;
    }
  })
})
  }
}

loadData();

function saveRecord () {
  var mobile=$("#mobile").val();
  var mobilecode=$("#smscode").val();
  var data = {};
  data.mobile = mobile;
  data.verifyCode = mobilecode;
  data.channel = channelData.channelName; // 渠道
  console.log(data);
  
  hoolaiActivityAPI.saveRecord(data, function(result) {
    console.log(result)
    if(result.ret!=1){
      // 错误的手机号
      if(result.code == 19){
        $(".tishi").css("background-image","url(./img/errorP.png)");
        $(".tishi").css("display","block");
        $("#cover").css("display","block");
        return;
      }
      // 错误的图形验证码
      if(result.code==35 || result.code==34){
        $(".tishi").css("background-image","url(./img/errorS.png)");
        $(".tishi").css("display","block");
        $("#cover").css("display","block");
        return;
      }
      // 已经预约
      if(result.code == 5){
        $(".tishi").css("background-image","url(./img/already.png)");
        $(".tishi").css("display","block");
        $("#cover").css("display","block");
        return;
      }
    }else{
      $(".tishi").css("background-image","url(./img/success_xg.png)");
      $(".tishi").css("display","block");
      $("#cover").css("display","block");
      getTotal();
    }
  })
   
}

function getTotal () {
  hoolaiActivityAPI.getTotal(function(result) {
    if(result.ret!=1){
        alert(result.msg);
    }else{
      $("#total").text(result.total);
    }
  })
}

getTotal();


// 关闭信息提示
$(".close_tishi").click(function(){
  $(".tishi").css("display","none");
  $("#cover").css("display","none");
})

// 鼠标获得焦点
$("#mobile").focus(function(){
  $("#yz").css("display","block");
});
$("#smscode").blur(function(){
  $("#yz").css("display","none");
})
// $("body").click(function(){
//   $("#yz").css("display","none");
// })


// 视频播放
$("#video").click(function(){
  $(".video-show").css("display","block");
  $("#cover").css("display","block");
  var media = document.getElementById("media");
  media.play();
})
$(".close_video").click(function(){
  $(".video-show").css("display","none");
  $("#cover").css("display","none");
  var media = document.getElementById("media");
  media.pause();
})





