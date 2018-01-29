$(function() {
  // 轮播
  var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    paginationClickable: true,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: 2500,
    autoplayDisableOnInteraction: false
  });

  //百叶窗
  $(".dtp1-1").click(function() {
    $(this).animate({
      "width": "400px"
    }, 400);
    $(".dtp1-2").animate({
      "width": "80px"
    }, 400);
    $(".dtp1-3").animate({
      "width": "80px"
    }, 400);
  })
  $(".dtp1-2").click(function() {
    $(this).animate({
      "width": "400px"
    }, 400);
    $(".dtp1-1").animate({
      "width": "80px"
    }, 400);
    $(".dtp1-3").animate({
      "width": "80px"
    }, 400);
  })
  $(".dtp1-3").click(function() {
    $(this).animate({
      "width": "400px"
    }, 400);
    $(".dtp1-1").animate({
      "width": "80px"
    }, 400);
    $(".dtp1-2").animate({
      "width": "80px"
    }, 400);
  })

  // 游戏截图
  $("#picList").cycle({
    before: function() {
      var index = $(this).index();
      $("#numList li").eq(index).addClass("active").siblings().removeClass("active");
    }
  });

  $("#prev").click(function() {
    $("#picList").cycle("prev");
  });
  $("#next").click(function() {
    $("#picList").cycle("next");
  });


})
