 // 初始化一个API 对象. 参数: 1:活动id, 2:是否调试, true则输出请求的参数和响应的日志
 var hoolaiActivityAPI = new hoolaiActivityAPI(22, true);
 // 1,跟新图形验证码
 // $(function(){
 //   $("#photo").attr("src", hoolaiActivityAPI.getVerifyImgNumber()).click(function(){
 //     $(this).attr("src", hoolaiActivityAPI.getVerifyImgNumber());
 //   });  
 // })

 var countdown = 60;

 function setTime(obj) {
   if (countdown == 0) {
     obj.removeAttribute("disabled");
     obj.value = "获取验证码";
     countdown = 60;
     return;
   } else {
     obj.setAttribute("disabled", true);
     obj.value = "重新发送(" + countdown + ")";
     countdown--;
   }
   setTimeout(function() {
     setTime(obj)
   }, 1000)
 }

 function sendSms(val) {
   var countdown = 60;
   var mobile = $("#mobile").val();
   var data = {};
   data.mobile = mobile;
   console.log(data);
   hoolaiActivityAPI.sendMobileCode(data, function(result) {
     if (result.ret != 1) {
       console.log(result)
       if (result.code == 19) {
         // alert("nihao")
         $(".overlay, .overlay .phone").css("display", "block");
         $(".overlay .alert,.overlay .receive1").css("display", "none");
         $(".overlay .phone").click(function() {
           $(".overlay").css("display", "none")
         })
       } else if (result.code == 4) {
         $(".overlay ,.overlay .receive1").css("display", "block");
         $(".overlay .alert,.overlay .phone").css("display", "none");
         $(".overlay .receive1").click(function() {
             $(".overlay").css("display", "none")
           })
           // $(".libao").css("display","block"); 礼包码的逻辑
           // $(".mengceng").hide();
       }
     } else {
       setTime(val);
     }
   })
 }

 function saveRecord() {
   var mobile = $("#mobile").val();
   var imgcode = $("#imgcode").val();
   var data = {};
   data.mobile = mobile;
   data.verifyCode = imgcode;
   hoolaiActivityAPI.saveRecord(data, function(result) {
     if (result.code == 19) {
       // alert("nihao")
       $(".overlay, .overlay .phone").css("display", "block");
       $(".overlay .alert,.overlay .receive1").css("display", "none");
       $(".overlay .phone").click(function() {
         $(".overlay").css("display", "none")
       })
     } else if (result.code == 35) {
       $(".overlay ,.overlay .alert").css("display", "block");
       $(".overlay .phone, .overlay .receive1").css("display", "none");
       $(".overlay .alert").click(function() {
         $(".overlay").css("display", "none")
       })
     } else if (result.code == 4) {
       // alert("lingu")
       $(".overlay ,.overlay .alert").css("display", "block");
       $(".overlay .receive1,.overlay .phone").css("display", "none");
       $(".overlay .alert").click(function() {
           $(".overlay").css("display", "none")
         })
         // $(".libao").css("display","block");  礼包码的逻辑
         // $(".mengceng").hide();
     } else if (result.code == 7) {
       $(".overlay ,.overlay .alert").css("display", "block");
       $(".overlay .phone, .overlay .receive1").css("display", "none");
       $(".overlay .alert").click(function() {
         $(".overlay").css("display", "none")
       })
     } else if (result.code == 6) {
       $(".overlay ,.overlay .alert").css("display", "block");
       $(".overlay .receive1,.overlay .phone").css("display", "none");
       $(".overlay .alert").click(function() {
         $(".overlay").css("display", "none")
       })
     } else {
       var libaoma = result.gifts
       $(".libao_two").val(libaoma)
       $(".libao").css("display", "block");
       $(".mengceng").hide();
     }
     // console.log(result);
     // if (result.ret != 1) {

     //   alert(result.msg);
     // } else {
     //   alert("活动预约成功!");
     //   // getTotal();
     // }
   })
 }

 // function getTotal () {
 //   var url=apiUrl+"/v5/api/activity/7/total";
 //   $.getJSON(url, function(result) {
 //       console.log(result);
 //       if(result.ret!=1){
 //         alert(result.msg);
 //       }else{
 //         $(".yuyue_people").text(result.total+'人');
 //       }
 //   });
 // }

 // getTotal();