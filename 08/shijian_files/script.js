//iScoll方法
var $scroll_index = $(".play_banner ul.con li.on").index() + 1; 		//拿序
var $mov; 		//自动滚动
// console.log("现在顺序", $scroll_index);
var Scroll_left = function () {			//左边
    var $li_length = $(".play_banner ul.con li").length;
    $scroll_index = $scroll_index + 1;

    if ($scroll_index < $li_length) {
        //给on
        $(".play_banner .pagination li").eq($scroll_index).addClass("on").siblings("li").removeClass("on");

        $("#sl_img_play ul.con").css({
            "transform": "translate(-" + $scroll_index * $newW + "px,0)"
        });
        $(".play_banner ul.con li").eq($scroll_index).addClass("on").siblings("li").removeClass("on");

        // console.log("现在顺序", $scroll_index);
    } else {
        $scroll_index = 0;

        $("#sl_img_play ul.con").css({
            "transform": "translate(0,0)"
        });
        $(".play_banner .pagination li").eq(0).addClass("on").siblings("li").removeClass("on");

        // console.log("现在顺序", $scroll_index);
    }
};

var Scroll_right = function () {			//右边
    var $li_length = $(".play_banner ul.con li").length;
    $scroll_index = $scroll_index - 1;

    //给on
    $(".play_banner .pagination li").eq($scroll_index).addClass("on").siblings("li").removeClass("on");

    $("#sl_img_play ul.con").css({
        "transform": "translate(-" + $scroll_index * $newW + "px,0)"
    });
    $(".play_banner ul.con li").eq($scroll_index).addClass("on").siblings("li").removeClass("on");
};

var loaded = function() {
        imgPlay = new iScroll("sl_img_play", {
            vScroll: false,
            //不允许垂直滚动  
            // snap: true,
            momentum: false,
            hScrollbar: false,
            onScrollStart: function(){
                $startX = this.x;
            },
            onScrollMove : function(){
                clearInterval($mov);
            },
            onScrollEnd: function() {
                $endX = this.x;
                $newW = $(".play_banner ul.con li").width();

                if ( $startX > $endX ) {
                    //左边动作
                    Scroll_left();

                } if ( $startX < $endX ) {
                    // console.log($scroll_index)
                    if ($scroll_index > 0) {
                        //右边动作
                        Scroll_right();
                    }
                }

                $mov = setInterval(function() {
                    $newW = $(".play_banner ul.con li").width();
                    Scroll_left();
                }, 5000);
            }
        });
    };

    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(loaded, 200);
    }, false);
//iScroll方法 end

var focusImgPlay = function() {
    //重置#sl_img_play元素内滚动区域宽度的方法
    //避免滚动的图片不足4张而出现的留白
    $w = $("#sl_img_play ul.con li").width();
    $x = $("#sl_img_play ul.con li").length;
    $("#sl_img_play ul.con").css({
        "width": $w * $x + "px"
    });
    $("#sl_img_play ul.con li").each(function() {
        $("#sl_img_play .pagination").append("<li></li>");
    });

    $(".play_banner ul.con li:first").addClass("on");
};

$(document).live("pageinit", function () {

    //滚动计时
    $mov = setInterval(function() {
        $newW = $(".play_banner ul.con li").width();
        Scroll_left();
    }, 5000);


    focusImgPlay();

    $(window).bind('orientationchange', function (e) {
        if (e.orientation == "portrait") {
            // window.alert("正常")
            $("body").attr("data-role", "")
        }
        if (e.orientation == "landscape") {
            // window.alert("方向错")
            $("body").attr("data-role", "no-content");
        };
    });

    //tabnav切换
    ;
    (function () {
        $.fn.tabnavFn = function () {
            this.each(function () {
                var _this = $(this);

                if (_this.attr("ys") == "ys") {
                    if (_this.attr("selected") == undefined && parseFloat($("#hdcardyouhui").val()) > 0) {
                        alert("你已使用" + _this.parent().find("li[selected='selected'] div").text() + ",如需更换，请先删除" + _this.parent().find("li[selected='selected'] div").text() + "。");
                        return;
                    }
                    //$("#spantext").text(_this.find("div").text()+"金额：");
                }
                _this.addClass("on").siblings("[data-role='tab-li']").removeClass("on");
                var _index = _this.index();
                _this.parents("[data-role='tab-main']").find("[data-role='tab-con']").find("[data-role='tab-li']").eq(_index).show().siblings().hide()
            });
        };
    })(jQuery);



    //tab切换
    $("[data-role='tab-nav']").find("[data-role='tab-li']").bind("vmousedown", function (even) {
        $(this).tabnavFn();
    });

    //切换城市
    $(".select_city").bind("vmousedown", function (even) {
        $("#select_city").slideToggle(300);
        $("header,#select_city").toggleClass("z9");
        $(".ui_mask").fadeToggle(300);
    });

    //微信扫码
    $(".select_weixin").click(function () {
        $("#showerweima").css("display", "");
        $(".ui_mask").fadeToggle(300);
    });
    //微信扫码关闭
    $("#showerweima .gb").click(function () {
        $("#showerweima").css("display", "none");
        $(".ui_mask").fadeToggle(300);
    });
    //点开菜单
    $("menu .menu_btn").bind("click", function () {
        $("menu .menu_btn").hide();
        $("menu .menu_content").show();
    });
    //收起菜单
    $("menu .menu_content .arrow").bind("click", function () {
        $("menu .menu_btn").show();
        $("menu .menu_content").hide();
    });

    //折叠积分
    $(".slide_box h3").bind("vmousedown", function (even) {
        $(this).next(".table_data").slideToggle(300);
    });

    //亮色菜单，蛋糕馆
    $(".site_nav .cake").toggle(function () {
        $(".menu_ul").hide();
        $(".site_nav .cake_ul").slideDown(300);
    }, function () {
        $(".menu_ul").hide();
        $(".site_nav .cake_ul").hide();
    });

    //亮色菜单，用户中心
    $(".site_nav .user").toggle(function () {
        $(".menu_ul").hide();
        $(".site_nav .user_ul").slideDown(300);
    }, function () {
        $(".menu_ul").hide();
        $(".site_nav .user_ul").hide();
    });

    //暗色菜单，蛋糕馆
    $("menu .menu_content .btn .cake").toggle(function () {
        $(".menu_ul").hide();
        $("menu .cake_ul").slideDown(300);
    }, function () {
        $(".menu_ul").hide();
        $("menu .cake_ul").hide();
    });

    //自定义留言
    $(".indent_piao_box input").not(".ka_comment").bind("click", function (even) {
        $("#ka_comment").hide();
    });
    $(".indent_piao_box .ka_comment").bind("click", function (even) {
        $("#ka_comment").slideDown(300);
    });

    //暗色菜单，用户中心
    $("menu .menu_content .btn .user").toggle(function () {
        $(".menu_ul").hide();
        $("menu .user_ul").slideDown(300);
    }, function () {
        $(".menu_ul").hide();
        $("menu .user_ul").hide();
    });

    //ui-radio
    $(".ui-radio-ios").bind("click", function (even) {
        $(this).toggleClass("ui-radio-on");
    });

    //返回顶部
    $(".go_top").bind("click", function (even) {
        $("html,body").animate({
            scrollTop: 0
        }, 800);
    });

    //	//选择磅数
    //	$(".left_goods .bang").bind("click", function(even) {
    //		$(".bang_select").hide();
    //		$(this).parents(".goods_list_page").find(".left_goods_select").slideToggle(300);
    //	});
    //	$(".right_goods .bang").bind("click", function(even) {
    //		$(".bang_select").hide();
    //		$(this).parents(".goods_list_page").find(".right_goods_select").slideToggle(300);
    //	});
    //	//传递磅数数值
    //	$(".left_goods_select .link").bind("click", function(even) {
    //		$t = $(this).html();
    //		$(this).parents(".goods_list_page").find(".left_goods").find(".bang_con").html($t);
    //	});
    //	$(".right_goods_select .link").bind("click", function(even) {
    //		$t = $(this).html();
    //		$(this).parents(".goods_list_page").find(".right_goods").find(".bang_con").html($t);
    //	});
    //详情页选择磅数
    $(".goods_page .goods_btn .price").bind("click", function (even) {
        $(this).parents(".goods_btn").find(".price").removeClass("price_on");
        $(this).addClass("price_on");
    });

    //购物车删除商品
    //	$(".shop_car .shop_con .del_goods").bind("click", function(even) {
    //		if (confirm("确定删除这件商品吗？")) {  
    //            $(this).parents(".shop_con").slideUp(300,function(){
    //            	$(this).remove();
    //            });
    //        }  
    //        else {  
    //            // alert("点击了取消");  
    //        }
    //	});



    //select  模拟点击
    $(".ui-select .ui-icon-arrow-d").bind("click", function (even) {

        $(this).parents(".ui-select").find("select").click();

    });

    //评论
    $(".write_comment").bind("click", function (even) {
        $(this).parents("tr").next("#write_comment").find(".comment_content").slideToggle(300);
    });

    //评论星星打分
    $(".ui_fen_box li").hover(function () {
        var $ind = $(this).index(); //获得排序

        //循环赋值，当i小于当前数时
        for (var i = 0; i < $ind; i++) {
            $(this).parents(".ui_fen_box").find("li").eq(i + 1).addClass("hover");
        };
    }, function () {
        var $ind = $(this).index(); //获得排序

        //循环赋值，当i小于当前数时
        for (var i = 0; i < $ind; i++) {
            $(this).parents(".ui_fen_box").find("li").eq(i + 1).removeClass("hover");
        };
    }).bind("vmousedown", function (even) {
        var $ind = $(this).index(); //获得排序
        $(this).parents(".ui_fen_box").find("li").removeClass("on");
        $(this).parents(".ui_fen_box").find("li:first").addClass("on");
        for (var i = 0; i < $ind; i++) {
            $(this).parents(".ui_fen_box").find("li").eq(i + 1).addClass("on");
        };
    });

    //popup浮层
    ; (function ($) {
        $.fn.popupFn = function () {
            //获取滚动条高度 for ie6
            var $docWidth = document.documentElement.clientWidth / 2;
            var $scrTop = document.documentElement.scrollTop || document.body.scrollTop
            var $docHeight = (document.documentElement.clientHeight / 2) + $scrTop;
            var $scrHeight = document.body.scrollHeight;

            //获得窗口高度和对象高度，除以2居中，40微调
            var $winHeight = $(window).height();
            // $h = $winHeight - this.height();
            // $h = $h / 2 + 100;
            $h = $docHeight - (this.height() / 2);

            //获得窗口宽度和对象宽度，除以2居中
            var $winWidth = $(window).width();
            $w = $winWidth - this.width();
            $w = $w / 2;

            //-----结构
            $(".ui_mask").show().height($scrHeight);
            this.animate({
                "top": $h + "px",
                "left": $w + "px"
            }).fadeIn(300);

            // 隐藏Div的方法
            $hideDiv = function () {
                $(".ui_mask,.ui_popup").fadeOut(300);
                $("body").css("overflow", "auto");
                $(".ui_popup").find(".add_tool_list").remove();
            };

            //关闭
            $(".ui_close_popup").click(function () {
                $hideDiv();
            });
            //绑定Esc键移除Div
            $("body").bind("keydown", function () {
                if (event.keyCode == 27) {
                    $hideDiv();
                };
            });
        };
    })(jQuery);



    //切换on
    $(".main_img .tab li,.goods_page .goods_info .option .size dd").bind("vmousedown", function(even) {
        $(this).addClass("on").siblings().removeClass("on");
    });

    $("#sl_img_play .pagination li:last").addClass("li_last");
    $("#sl_img_play .pagination li:first").addClass("on li_first");
    

    //单品页查看商品图时
    //窗口调整尺寸时
    $s_x = $(".play_banner ul.con li").length;
    var resizeWidth = function () {
        totWidth = 0;
        positions = new Array();
        pwidth = $("body").width();
        $(".play_banner, .play_banner ul.con li,.play_banner ul.con li img").css({
            "height": pwidth / 2, //347368421
            "width": pwidth
        });
        $(".play_banner ul.con").css({
            "width": pwidth * $s_x + "px"
        })
    };
    resizeWidth();
    $(window).resize(function () {
        resizeWidth();
    });

    //自动滚动
//    $(".play_banner .pagination li").live("click", function () {
//        $newW = $(".play_banner ul.con li").width();
//        $v = $(this).index();

//        $("#sl_img_play ul.con").animate({
//            "left": "-" + $v * $newW + "px"
//        },300, function () {
//            $(this).css({
//                "transform": "translate(-" + $v * $newW + "px,0)",
//                "left": "0"
//            })
//        });

//        $(this).addClass("on").siblings("li").removeClass("on");

//    });


//    //滚动
//    setInterval(function () {
//        if ($(".play_banner .pagination li.on").hasClass("li_last")) {
//            $("#sl_img_play ul.con").animate({
//                "left": "0px"
//            }, 1000, function () {
//                $(this).css({
//                    "transform": "translate(0,0)"
//                });
//                $(".play_banner .pagination li:first").addClass("on").siblings("li").removeClass("on")
//            });
//        } else {
//            $(".play_banner .pagination li.on").next("li").trigger("click").addClass("on").siblings("li").removeClass("on");
//        };
//    }, 5000);

});