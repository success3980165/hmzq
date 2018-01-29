function request(url) {
    var deferred = $.Deferred();
    $.ajax({
        url: url,
        type: "POST",
        dataType: "JSONP",
        success: function(data, status, xhr) {
            deferred.notify("fetching");
            if (data) {
                deferred.resolve(data.post);
            } else {
                deferred.reject("nothing got");
            }
        },
        error: function(xhr, errorType, error) {
            console.log(error);
        }
    });
    return deferred;
}

$(function (){
	var article_id = window.location.hash.substr(1);
	console.log(article_id);

    $(".content_list div:eq(0)").attr("id",article_id);

	var url = 'http://games.hoolai.com/cms/?post_id=' + article_id + '&json=get_post&include=title,content,author,date,categories';
        console.log(url);

        var promise = request(url);
        promise.then(function(data) {
        	console.log(data);
            // 文章标题
            $(".article_title").html(data.title);
            // 时间
            $(".article_time").html(data.date);
            // 内容
            var arcContent = $(".article_content").html(data.content);

             
            var list = arcContent.find('img');
            // list.each(function(index, val){
            //   // $("<div />").append(val);
            //   val.wrap("<div></div>");
            //  }) 
            for (var i=0; i<list.length;i++ ) {
                // $("<div />").appendTo(list.eq(i).parent().parent());
                list.eq(i).wrap("<div></div>");
            }
             
           

            // var content_height_px = $(".second_bg").css("height");
            // var content_height = parseInt(content_height_px);
            // console.log(content_height);
            // $(".bg3").css("display","block");
            // $(".bg3").css("top",0);


            var cate = data.categories;
            if (!cate||cate.length==0) { return;}
            console.log(cate)
            var cat_id = cate[0].id;
            console.log(cat_id)
            if (cat_id == "413" || cat_id == "417" || cat_id == "418" || cat_id == "419" || cat_id == "420") {//新闻资讯
                $(".bg").css("background-image","url(../img/third/news.png)");
            }
            else if (cat_id == "415"){//游戏攻略
                $(".bg").css("background-image","url(../img/third/game_gonglue.png)");
            }
            else if (cat_id == "414"){//游戏资料
                $(".bg").css("background-image","url(../img/third/game_ziliao.png)");
            }
            else if (cat_id == "416"){//活动专区
                $(".bg").css("background-image","url(../img/third/game_active.png)");
            }

            
        })

})