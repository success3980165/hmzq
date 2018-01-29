$(function() {
  // 复制礼包码
  $(".copy").click(function() {
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

  $("#video-btn").click(function() {
    $(".video-show").css("display", "block");
    $("#cover").css("display", "block");
    var media = document.getElementById("media");
    media.play();
  });
  $(".close_video").click(function() {
    $(".video-show").css("display", "none");
    $("#cover").css("display", "none");
    var media = document.getElementById("media");
    media.pause();
  })

  $(".classify-list li").click(function() {
    var index = $(this).index();
    if (index == 4) {
      return;
    }
    for (var i = 0; i < 4; i++) {
      $(".classify-list li").eq(i).removeClass("borderLine");
    }
    $(this).addClass("borderLine")
  })
})
