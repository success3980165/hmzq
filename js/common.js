function getDataList(cat, posts) {
        var posts_len = posts.length;
        var dataList = [];
        if (posts_len == 0) {
            return null;
        }
        for (var j = 0; j < posts_len; j++) {
            var cat_len = posts[j].categories.length;
            for (var i = cat_len - 1; i >= 0; i--) {
                if (posts[j].categories[i].id == cat) {
                    dataList.push(posts[j]);
                }
            }
        }
        return dataList;
    }

function request(url, cal) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "jsonp",
        success: function(resp) {
            cal(false, resp);
        },
        error: function(resp) {
            cal(resp)
        }
    });
}


// var index = 0;//当前页

// $(function(){
//     // 安卓下载
//     var second_url = '';
//     var left_title = '';
// 	// 点击顶部导航栏
// 	$(".nav1 li").click(function(){
// 		var index = $(this).index();
// 		var tag = 0;
// 		// var bg_img = $(".second_bg");
// 	    if (index == 1) {
// 	    	tag = 417;
// 	        left_title = '最新活动';
//             // $(".s_box div:eq(0)").attr("id",tag);
// 	    }
// 	    if (index == 3) {
// 	    	tag = 418;
// 	        left_title = '游戏攻略';
//             // $(".s_box div:eq(0)").attr("id",tag);
// 	    }

// 	    $(".list_message").empty();
// 	    second_url = "http://games.hoolai.com/cms/?cat="+tag+"&json=get_category_posts&include=title,categories,date&count=500";
//         request(second_url, function(err, data){
// 	        if (err) {
// 	            console.log(err);
// 	        } else {
// 	            console.log(data);
//                 var len = data.posts.length;
//                 for (var i = 0; i < len; i++) {
//                     $(".list_message").append('<li><span class="left_classify fl">'+left_title+'</span><span style="margin-left:50px;width: 350px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" class="article cursor_p" id="'+data.posts[i].id+'">'+'<a href="article.html#'+data.posts[i].id+'">'+data.posts[i].title+'</a>'+'</span><span class="fr">'+data.posts[i].date.substring(0,10)+'</span></li>');
//                 }
// 	        }
//         })

// 	});

// })