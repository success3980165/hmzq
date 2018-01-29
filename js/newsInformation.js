$(function() {
    var tag = window.location.hash.substr(1);
    // $(".content_list div:eq(0)").attr("id",tag);//描点跳转
    $(".content_list div:eq(0)").attr("id", tag);
    var left_title = '';

    var newest_data = [];
    var news_data = [];
    var gonggao_data = [];
    var activity_data = [];
    // 要展示的数据
    var show_data = [];

    var index = 0; //当前页

    console.log(tag);


    // 获取所有分类数据
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
            if (tag == 422) {
                console.log("加载422");
                load_data(newest_data);
            }
        }
    })
    request(new_url, function(err, data) { //新闻
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            news_data = data;

            if (tag == 424) {
                console.log("加载424")
                load_data(data);
            }
        }
    })
    request(gonggao_url, function(err, data) { //公告
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            gonggao_data = data;

            if (tag == 423) {
                load_data(data);
            }
        }
    })
    request(activity_url, function(err, data) { //活动
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            activity_data = data;

            if (tag == 425) {
                load_data(data);
            }
        }
    })

    var defaultIndex = 0;

    if (tag == 422) {
        // left_title = '最新';
        defaultIndex = 0;
        $(".top_list li:eq(0)").addClass("line");
        $(".nav1 li:eq(1) a").addClass("line3");
    } else if (tag == 424) {
        // left_title = '新闻';
        defaultIndex = 1;
        $(".top_list li:eq(1)").addClass("line");
        $(".nav1 li:eq(2) a").addClass("line3");
    }



    // 类别的点击事件
    $(".top_list li").mouseenter(function() {
        defaultIndex = $(this).index();
        $(".s_box ul").empty();
        // $("#show_more").empty();

        var cat_string = '';
        var cat_tag = '';

        if (defaultIndex == 0) {
            show_data = newest_data;
            // cat_string = '【最新】';
            cat_tag = '422';

        } else if (defaultIndex == 1) {
            show_data = news_data;
            // cat_string = '【新闻】';
            cat_tag = '424';
        } else if (defaultIndex == 2) {
            show_data = gonggao_data;
            // cat_string = '【公告】';
            cat_tag = '423';
        } else if (defaultIndex == 3) {
            show_data = activity_data;
            // cat_string = '【活动】';
            cat_tag = '425';
        }
        console.log(show_data.posts);

        for (i = 0; i < show_data.posts.length; i++) {
            $(".s_box ul").append('<li class="s_line" style="margin-top:10px;margin-left: 16px;"><span class="left_classify fl" ></span><span style="margin-left:5px;width: 160px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">' + '<a style="font-size:16.94px;color:#55607a;" href="article.html#' + show_data.posts[i].id + '">' + show_data.posts[i].title + '</a>' + '</span><span class="fr" style="margin-right:10px;font-size:16.94px;color:#55607a;">' + show_data.posts[i].date.substring(0, 10) + '</span></li>');
            $(".s_line").addClass("line1")
        }
    })


    // 封装函数、加载选中的数据及分页处理
    function load_data(show_data) {
        console.log("zhanshishuju");
        console.log(show_data);
        // 先清掉原有html
        var cat_string = '';
        $(".s_box ul").empty();
        // $(".top_list li").addClass("line")
        // $(".page").empty();
        // 数据总长度
        // var len = data.posts[0].categories.length;
        var len = show_data.posts.length;
        // var len = data_mo.length;
        //不需要分页
        for (var i = 0; i < len; i++) {
            $(".s_box ul").append('<li class="s_line" style="margin-top:10px;margin-left: 16px;"><span class="left_classify fl" >' + cat_string + '</span><span style="margin-left:5px;width: 160px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" id="' + show_data.posts[i].id + '">' + '<a style="font-size:16.94px;color:#55607a;" href="article.html#' + show_data.posts[i].id + '">' + show_data.posts[i].title + '</a>' + '</span><span class="fr" style="margin-right:10px;font-size:16.94px;color:#55607a;">' + show_data.posts[i].date.substring(0, 10) + '</span></li>')
            $(".s_line").addClass("line1")
        }
    }

});