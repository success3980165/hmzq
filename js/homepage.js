$(function() {



    var newest_data = [];
    var news_data = [];
    var gonggao_data = [];
    var activity_data = [];
    // 要展示的数据
    var show_data = [];
    var i = 0;

    var defaultIndex = 0;


    //分类信息，鼠标点击
    $(".new ul li").mouseenter(function() {
        defaultIndex = $(this).index();

        // 清除原html内容，重新加载
        $(".top_box ul").empty();
        $("#show_more").empty();

        var cat_string = '';
        var cat_tag = '';

        if (defaultIndex == 0) {
            show_data = newest_data;
            cat_string = '【最新】';
            cat_tag = '422';
        } else if (defaultIndex == 1) {
            show_data = news_data;
            cat_string = '【攻略】';
            cat_tag = '424';
        } else if (defaultIndex == 2) {
            show_data = gonggao_data;
            cat_string = '【活动】';
            cat_tag = '423';
        } else if (defaultIndex == 3) {
            show_data = activity_data;
            cat_string = '【公告】';
            cat_tag = '425';
        }
        console.log(show_data.posts);
        for (i = 0; i < 6; i++) {
            if (i < show_data.posts.length) {
                $(".top_box ul").append('<li style="margin-top:10px;margin-left:16px;"><span class="left_classify fl" >' + cat_string + '</span><span style="margin-left:5px;width: 160px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" id="' + show_data.posts[i].id + '">' + '<a style="font-size:14.94px;color:#55607a;" href="article.html#' + show_data.posts[i].id + '">' + show_data.posts[i].title + '</a>' + '</span><span class="fr">' + show_data.posts[i].date.substring(0, 10) + '</span></li>');
                $(".top_box ul li").addClass("line2")
                    // $(".bottom_right_bottom ul").append('<li style="margin-top:10px;"><span class="left_classify fl" >'+cat_string+'</span><span style="margin-left:5px;width: 160px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" id="'+show_data.posts[i].id+'">'+'<a style="font-size:14.94px;color:#55607a;" href="article.html#'+show_data.posts[i].id+'">'+show_data.posts[i].title+'</a>'+'</span><span class="fr" style="margin-right:10px">'+show_data.posts[i].date.substring(0,10)+'</span></li>')
            }
        }
        // 查看更多
        // $("#show_more").append('<a href="newsInformation.html#'+cat_tag+'"> 查看更多> </a>');

    });

    // var news_url = "http://games.hoolai.com/cms/?cat=413&json=get_category_posts&include=title,categories,date&count=500";

    var lastest_url = "http://games.hoolai.com/cms/?cat=422&json=get_category_posts&include=title,categories,date&count=500";
    var new_url = "http://games.hoolai.com/cms/?cat=424&json=get_category_posts&include=title,categories,date&count=500";
    var gonggao_url = "http://games.hoolai.com/cms/?cat=423&json=get_category_posts&include=title,categories,date&count=500";
    var activity_url = "http://games.hoolai.com/cms/?cat=425&json=get_category_posts&include=title,categories,date&count=500";

    request(lastest_url, function(err, data) { //最新
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            newest_data = data;
            // 默认加载最新类别的list            
            for (i = 0; i < 6; i++) {
                if (i < newest_data.posts.length) {
                    $(".top_box ul").append('<li style="margin-top:10px;margin-left:16px;"><span class="left_classify fl">【最新】</span><span style="margin-left:5px;width: 160px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" id="' + newest_data.posts[i].id + '">' + '<a style="font-size:14.94px;color:#55607a;" href="article.html#' + newest_data.posts[i].id + '">' + newest_data.posts[i].title + '</a>' + '</span><span class="fr" style="color: #55607a">' + newest_data.posts[i].date.substring(0, 10) + '</span></li>');
                    // $(".bottom_right_bottom ul").append('<li style="margin-top:10px;"><span class="left_classify fl">【最新】</span><span style="margin-left:5px;width: 160px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" id="'+newest_data.posts[i].id+'">'+'<a style="font-size:14.94px;color:#55607a;" href="article.html#'+newest_data.posts[i].id+'">'+newest_data.posts[i].title+'</a>'+'</span><span class="fr" style="color: #55607a">'+newest_data.posts[i].date.substring(0,10)+'</span></li>');
                    $(".top_box ul li").addClass("line2");
                    // $(".bottom_right_bottom ul li").addClass("line2");
                }
            }
        }
    })
    request(new_url, function(err, data) { //新闻
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            news_data = data;
            for (i = 0; i < 6; i++) {
                $(".bottom_right_bottom ul").append('<li style="margin-top:10px;"><span class="left_classify fl">【攻略】</span><span style="margin-left:5px;width: 160px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" id="' + data.posts[i].id + '">' + '<a style="font-size:14.94px;color:#55607a;" href="article.html#' + data.posts[i].id + '">' + data.posts[i].title + '</a>' + '</span><span class="fr" style="color: #55607a">' + data.posts[i].date.substring(0, 10) + '</span></li>');
                $(".bottom_right_bottom ul li").addClass("line2");
            }
        }
    })
    request(gonggao_url, function(err, data) { //公告
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            gonggao_data = data;
        }
    })
    request(activity_url, function(err, data) { //活动
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            activity_data = data;
        }
    })
})