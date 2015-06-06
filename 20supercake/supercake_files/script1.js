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
            $(".ui_mask,.ui_popup").hide();
            // $("body").css("overflow","auto");
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
             window.onscroll = float();
    };
})(jQuery);

 
 //自定义信息提示
function CommenMsg(msg) {
    $(".ui_popup").hide();
    $("#coupon_turemsg").popupFn();
    $("#commenmsg").html(msg);
}


<!--两个banner图轮播效果-->
//window.onload=function (){
//	var index=0;//默认第0张图片
//	var figure=document.getElementById("figure");
//	var autoId=0;
//	var animateId=0;
//	function autoChange(){
//			index++;
//			if(index>3){index=0;}else if(index<0){index=4;}
//			change();	
//		}			
//	function change(){
//		clearTimeout(autoId);
//		clearInterval(animateId);
//		if(index==0){
//			figure.scrollLeft=0+"px";
//			}		
//		animateId=setInterval(animate,10);			
//	}
//	function animate(){			
//		var left=parseInt(figure.scrollLeft);		
//		innerHTML=left+"---"+index;		
//		var topos=index*800;		
//		var dis=topos-left;
//		figure.scrollLeft=left+2+Math.floor(dis/100);			
//		if(left>=topos&&left!=0){
//			figure.scrollLeft=topos;
//			if(autoId!=null){
//			autoId=setTimeout(autoChange,2000);
//			}
//			clearInterval(animateId);
//			}	
//		}
////	figure.onmouseover=function(){clearTimeout(autoId);autoId=null; }
////	figure.onmouseout=function(){autoId=setTimeout(autoChange,2000);}
//	}




//点击喇叭弹出消息栏
function gg_click() {
    art.dialog({
        content: '欢迎您来到INCAKE，英式蛋糕专家，先预订 后生产 新鲜美味 直送到家！'
    });
}

//背景灰色效果
function float() {
    var citycode = $("#hid_citycode").val();
    var isdisplay = $("#hid_display").val();
    var img = $("#hid_img").val();
    if (img == "0") {
        if (isdisplay == "1") {
            if (citycode == "021") {
                document.getElementById("floting_banners").style.pixelTop = document.documentElement.scrollTop;
                document.getElementById("right").style.pixelTop = document.documentElement.scrollTop;
            }
            else {
                document.getElementById("floting_bannerf").style.pixelTop = document.documentElement.scrollTop;
                document.getElementById("right").style.pixelTop = document.documentElement.scrollTop;
            }
        }
    }
}
function closePosters() {
    document.getElementById("floting_banners").style.display = "none";
    document.getElementById("right").style.display = "none";
    document.getElementById("closers").style.display = "none";
}
function closePosterf() {
    document.getElementById("floting_bannerf").style.display = "none";
    document.getElementById("right").style.display = "none";
    document.getElementById("closerf").style.display = "none";
}
$(function () {
    var citycode = $("#hid_citycode").val();
    var isdisplay = $("#hid_display").val();
    var img = $("#hid_img").val();
    if (img == "0") {
        if (isdisplay == "1") {
            if (citycode == "021") {
                var div = $("<div class='body'>");
                div.appendTo($(".i_body"));
                $("#closers").click(function () {
                    $(".body").remove();
                })
            }
            else {
                var div = $("<div class='body'>");
                div.appendTo($(".i_body"));
                $("#closerf").click(function () {
                    $(".body").remove();
                })
            }
        }
    }
})

//闪电购 配件蜡烛 加
var shagoodsNum = function () {
    $(".goods_num_box .add").click(function () {
        var $num = $(this).parents(".goods_num_box").find(".a_num").val();
        var $num = parseInt($num);
        if ($num < 100) {
            var $num = $num + 1;
            var $num = $(this).parents(".goods_num_box").find(".a_num").val($num);

            //加入购物车
            var $price = $(this).parents(".goods_num_box").find(".cut").attr("price");
            var $price1 = $("#Price").val();
            var $allprice = parseFloat($price1) + parseFloat($price);
            $("#Price").val($allprice);
        };

    });

    //闪电购 配件蜡烛 减
    $(".goods_num_box .cut").click(function () {
        var $num = $(this).parents(".goods_num_box").find(".a_num").val();
        var $num = parseInt($num);
        if ($num > 0) {
            var $num = $num - 1;
            var $num = $(this).parents(".goods_num_box").find(".a_num").val($num);
            //减去 购物车
            var $price = $(this).parents(".goods_num_box").find(".cut").attr("price");
            var $price1 = $("#Price").val();
            var $allprice = parseFloat($price1) - parseFloat($price);
            $("#Price").val($allprice);
        }

    });

}


//tabnav切换
; (function () {
    $.fn.tabnavFn = function () {
        this.each(function () {
            var _this = $(this);
            _this.addClass("on").siblings("[data-role='tab-li']").removeClass("on");
            var _index = _this.index();
            _this.parents("[data-role='tab-main']").find("[data-role='tab-con']").find("[data-role='tab-li']").eq(_index).show().siblings().hide()
        });
    };
})(jQuery);
$(function () {
    //tab切换
    $("[data-role='tab-nav']").find("[data-role='tab-li']").click(function () {
        $(this).tabnavFn();
    });

    //关闭公告
    $(".main_box .box_close").click(function () {
        $(this).parent(".main_box").hide();
    });

    //详细页 闪电购  按钮
    $(".sha_btngo").click(function () {
        $('input[name=sha]').each(function (index) {
            $(this).val("0");
        })
        $(this).SDguigeFngo();
        $(".ui_popup").hide();
        $("#peijian_pop").popupFn();
    });
    ; (function () {
        $.fn.SDguigeFngo = function () {
            //取值
            var prid = $("#key").val();
            var g = $("#hid_guigue").val();
            var price = parseFloat((this).parents(".goodsdetail_page").find(".on").attr("Price"));
            var num = parseInt((this).parents(".goodsdetail_page").find(".a_num").html());

            var cainfo = "[{id:\"" + prid + "-" + g + "\",n:\"" + num + "\",p:\"" + price + "\"}]";
            __msv_m("cart", cainfo); //监测

            var cake = prid + "-" + g + "-" + num;
            $("#cakelist").val(cake);
            $("#Price").val(price * num);
        };
    })(jQuery);

    //闪电购 登录用户 传送蛋糕数据
    $(function () {
        $("#SavaCake").click(function () {
            var xin = "";
            $('input[name=sha]').each(function (index) {
                var id = $(this).attr("id");
                var num = $(this).val();
                if (parseInt(num) > 0) {
                    xin = xin + id + "-1-" + num + ",";
                }
            })
            var cakelist = xin + $("#cakelist").val();

            $.ajax({
                url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
                data: { "type": "_shacar", "_cakelist": cakelist, "log": "0" },
                success: function (data) {
                    if (data.msg == "加入购物车成功") {
                        //                       if ($("#hid").val() == "1") {
                        //                           //location.href = "/manage/buycart.html";
                        //                        }
                        //                        else {
                        // location.href = "/ShaFirOrder.html";
                        location.href = "/login.html?url=buycart.html";
                        //}
                    } else { CommenMsg(data.msg); }
                },
                error: function () {
                    // CommenMsg("网络错误！");
                }
            });

        });
    })
    //闪电购  按钮
    $(".sha_btn").click(function () {
        $('input[name=sha]').each(function (index) {
            $(this).val("0");
        })
        $(this).SDguigeFn();
        $(".ui_popup").hide();
        $("#peijian_pop").popupFn();
    });
    ; (function () {
        $.fn.SDguigeFn = function () {
            //取值
            $g = $(this).parents(".goods_btn").find(".first_btn").attr("guige");
            $prid = $(this).parents(".goods_btn").find(".first_btn").attr("goodsid");
            $price = $(this).parents(".goods_btn").find(".first_btn").attr("price");

            var cainfo = "[{id:\"" + $prid + "-" + $g + "\",n:1,p:\"" + $price + "\"}]";
            __msv_m("cart", cainfo); //监测

            var cake = $prid + "-" + $g + "-1";
            $("#cakelist").val(cake);
            $("#Price").val($price);

        };
    })(jQuery);



    //闪电购 -->结算
    $(".shad_btn").click(function () {
        var xin = "";
        $('input[name=sha]').each(function (index) {
            var id = $(this).attr("id");
            var num = $(this).val();
            if (parseInt(num) > 0) {
                xin = xin + id + "-1-" + num + ",";
            }
        })
        var cakelist = xin + $("#cakelist").val();
        $.ajax({
            url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_shacar", "_cakelist": cakelist, "log": "1" },
            success: function (data) {
                if (data.msg == "加入购物车成功") {
                    //                       if ($("#hid").val() == "1") {
                    //                           //location.href = "/manage/buycart.html";
                    //                        }
                    //                        else {
                    location.href = "/ShaFirOrder.html";
                    //}
                } else { CommenMsg(data.msg); }
            },
            error: function () {
                // alert("网络错误！");
            }
        });


    });

    //双拼，点击蛋糕按钮
    $(".ping_content .box .a_select").click(function () {
        //添加thisbox标识
        $(this).parents(".box").addClass("this_box").siblings(".box").removeClass("this_box");
        $("#ping_info").show();
        $(".right_box_link").addClass("right_box_link_hover");
        $(this).parents(".box").siblings(".box").find(".but").hide();
    });

    $(".right_box_link_hover .g_link").live({
        mouseenter: function () {
            $(this).find(".hover").show(300);
        }, mouseleave: function () {
            $(this).find(".hover").hide(300);
        }
    });


    $(".ping_content .c1").click(function () {
        $("#ping_info .left_bg").show();
        $("#ping_info .right_bg").hide();
    });
    $(".ping_content .c2").click(function () {

        $("#ping_info .right_bg").show();
        $("#ping_info .left_bg").hide();
    });
    $("#ping_info").click(function () {
        $(".ui_mask").hide();
        $("#ping_info").hide();
    });

    //点击蛋糕动作
    $(".right_box_link  .g_link").click(function () {
        var $bg = $(this).attr("data-bg");
        var $name = $(this).attr("value");

        $(".ping_content .this_box").attr("data", $bg);
        $(".ping_content .this_box").attr("value", $name);

        var $c1 = $(".ping_content .c1").attr("data");
        var $c2 = $(".ping_content .c2").attr("data");

        if ($c1 == $c2) {

        } else {
            $(".ping_content .this_box").css("background", "url(img/ping/" + $bg + ".jpg) no-repeat");
            $(".ping_content .this_box").attr("data", $bg);
            //必须确定
            $(".this_box .a_select").hide();
            $(".this_box .a_ok").show();
        };
    });

    //确定
    $(".a_ok").click(function () {
        $(this).hide();
        $(this).parents(".box").siblings(".box").find(".but").show();
        $(this).parents(".box").removeClass("this_box");
        $(".right_box_link").removeClass("right_box_link_hover");
        var $val1 = $(".ping_content .c1").val();
        var $val2 = $(".ping_content .c2").val();
        $("#hidcake1").val($val1);
        $("#hidcake2").val($val2);
    });

    //重置
    $(".ping_txt .re").click(function () {
        $(".box").attr("style", "");
        $(".a_select").show();
        $(".a_ok").hide();
        $(".goods_page .page_info .ping_content .c1").val("");
        $(".goods_page .page_info .ping_content .c2").val("");
        $("#hidcake1").val("");
        $("#hidcake2").val("");
    });

    //切换on
    $(".order_module .box_module .num_box .num_a").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
        var $page = $(this).attr("data-page");
        $(".order_module .box_module .peijian img").attr("src", $page);
        // var $priceNum = $(this).attr("price");alert($priceNum);
    })
    //0-9 加入购物车
    $(".order_module .box_module .go_buy .fn_left").click(function () {
        var $dataid = $(".order_module .box_module .num_box .on").attr("data-id");
        var $price = $(".order_module .box_module .num_box .on").attr("price");
        var $num = $("#txt_num").val();
        if ($num == "") { $num = "1"; }
        $.ajax({
            url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_car", "_CommodityID": $dataid, "_GuiGe": "1", "_Num": $num },
            success: function (data) {
                if (data.msg == "加入购物车成功") {
                    if ($("#hid").val() == "0") {
                        var cainfo = "[{id:\"" + $dataid + "-1\",n:\"" + $num + "\",p:\"" + $price + "\"}]";
                        __msv_m("cart", cainfo); //监测
                    }
                    carNum();
                    $(".ui_popup").hide();
                    $("#coupon_ture").popupFn();
                } else { CommenMsg(data.msg); }
            },
            error: function () {
                CommenMsg("网络错误！");
            }
        });
    })
    //0-9 去结算
    $(".order_module .box_module .go_buy .fn_right").click(function () {
        var $dataid = $(".order_module .box_module .num_box .on").attr("data-id");
        var $num = $("#txt_num").val();
        var $price = $(".order_module .box_module .num_box .on").attr("price");
        if ($num == "") { $num = "1"; }
        $.ajax({
            url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_car", "_CommodityID": $dataid, "_GuiGe": "1", "_Num": $num },
            success: function (data) {
                if (data.msg == "加入购物车成功") {
                    if ($("#hid").val() == "0") {
                        var cainfo = "[{id:\"" + $dataid + "-1\",n:\"" + $num + "\",p:\"" + $price + "\"}]";
                        __msv_m("cart", cainfo); //监测
                        location.href = "/buycart.html";
                    } else { location.href = "/manage/buycart.html"; }

                    //                    carNum();
                    //                     $(".ui_popup").hide();
                    //                     $("#coupon_ture").popupFn();
                    //location.href = "/buycart.html";
                } else { CommenMsg(data.msg); }
            },
            error: function () {
                CommenMsg("网络错误！");
            }
        });
    })

    $(".goods_num_box .a_num").keypress(function (event) {
        var keyCode = event.which;
        //限定只能输入数字
        if (keyCode == 46 || (keyCode >= 48 && keyCode <= 57))
            return true;
        else
            return false;
    }).focus(function () {
        this.style.imeMode = 'disabled';
    }).blur(function () {
        //失去焦点时判断数字是否大于100
        $val = $(this).val();
        $val = parseInt($val);
        if ($val > 100) {
            $(this).val("100");
        }
    });
    $(".ui_input_text").keypress(function (event) {
        var keyCode = event.which;
        //限定只能输入数字
        if (keyCode == 46 || (keyCode >= 48 && keyCode <= 57))
            return true;
        else
            return false;
    }).focus(function () {
        this.style.imeMode = 'disabled';
    }).blur(function () {
        //失去焦点时判断数字是否大于100
        $val = $(this).val();
        $val = parseInt($val);
        if ($val > 100) {
            $(this).val("100");
        }
    });
    //改变数量 
    var changcake = function (goodid, num) {
        $.ajax({
            url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_change", "Commodity": goodid, "_Num": num },
            success: function (data) {
                if (data.msg == "设置成功") {//成功不做操作
                } else { CommenMsg(data.msg); }
            },
            error: function () {
                CommenMsg("网络错误！");
            }
        });
    }

    //input的改变数量的事件
    $('input[name=ui_input_text]').change(function () {
        var $priceNum = $(this).attr("v-id");
        var $num = $(this).parents(".order_car_num").find(".ui_input_text").val();
        if ($num == "") { $num = "1"; }
        $num = parseInt($num);
        if ($num < 100) {
            if ($num <= 1) { $num = 1; }
            if ($num >= 100) { $num = 100; }
            changcake($priceNum, $num);
            $(this).parents(".order_car_num").find(".ui_input_text").val($num);
        };
        totalPrice();
    })
    //input checkBox的是否切分事件
    $('input[name=ck]').change(function () {
        var $priceNum = $(this).attr("data-id");
        var $qiefen = "0";
        var obj = $(this);
        if (obj.attr('checked'))
        { $qiefen = "1"; }
        else { $qiefen = "0"; }
        $.ajax({
            url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_qiefen", "_CommodityID": $priceNum, "_qiefen": $qiefen },
            success: function (data) {
                if (data.msg == "设置成功") {
                } else { CommenMsg(data.msg); }
            },
            error: function () {
                CommenMsg("网络错误！");
            }
        });
    })


    //商品详细页 加与减
    $(".goodsdetail_page .page_info .buy_info .box1 .a_add").click(function () {
        var $num = $(this).parents(".page_info").find(".a_num").html();
        $num = parseInt($num);
        if ($num >= 2) {
            $num = $num - 1;
            $num = $(this).parents(".page_info").find(".a_num").html($num);
        };
    })
    $(".goodsdetail_page .page_info .buy_info .box1 .a_cut").click(function () {
        var $num = $(this).parents(".page_info").find(".a_num").html();
        $num = parseInt($num);
        if ($num < 100) {
            $num = $num + 1;
            $num = $(this).parents(".page_info").find(".a_num").html($num);
        };
    })
    //商品详细页 加与减
    $(".goods_page .page_info .buy_info .box1 .a_cut").click(function () {
        var $num = $(this).parents(".page_info").find(".a_num").html();
        $num = parseInt($num);
        if ($num >= 2) {
            $num = $num - 1;
            $num = $(this).parents(".page_info").find(".a_num").html($num);
        };
    })
    $(".goods_page .page_info .buy_info .box1 .a_add").click(function () {
        var $num = $(this).parents(".page_info").find(".a_num").html();
        $num = parseInt($num);
        if ($num < 100) {
            $num = $num + 1;
            $num = $(this).parents(".page_info").find(".a_num").html($num);
        };
    })

    $(".goodsdetail_page .page_info .buy_info .price .btn").click(function () {
        $(".goodsdetail_page .price .btn").removeClass("on");
        $(this).addClass("on");
        var $price = $(this).attr("price");
        var $guige = $(this).attr("guige");
        $("#hid_guigue").val($guige);
        $(this).parents(".goodsdetail_page").find(".red").html("￥" + $price);
    })
    //蛋糕购买按钮切换
    $(".goods_page .price .btn").click(function () {
        $(".goods_page .price .btn").removeClass("on");
        $(this).addClass("on");
        var $priceNum = $(this).attr("data-price");
        $(".goods_page .price .p_tit .red").text("￥" + $priceNum);
    });
    //DIY热恋双城
    /////蛋糕自动选拼 立即购买
    $(".doublecity .buy_info .go_buy .fn_left").click(function () {
        var $price = $(this).parents(".doublecity").find(".on").attr("price");
        var $Num = $(this).parents(".doublecity").find(".a_num").html();
        if (CheckCake()) {
            $.ajax({
                url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
                data: { "type": "_car", "_CommodityID": $("#key").val(), "_GuiGe": $("#hid_guigue").val(), "_Num": $(this).parents(".doublecity").find(".a_num").html(), "cake1": $("#hidcake1").val(), "cake2": $("#hidcake2").val() },
                success: function (data) {
                    if (data.msg == "加入购物车成功") {
                        var cainfo = "[{id:\"" + $("#key").val() + "-" + $("#hid_guigue").val() + "\",n:\"" + $Num + "\",p:\"" + $price + "\"}]";
                        __msv_m("cart", cainfo); //监测
                        location.href = "/buycart.html";
                        //                        carNum();
                        //                        $(".ui_popup").hide();
                        //                        $("#coupon_ture").popupFn();
                        // location.href = "/buycart.html";
                    } else { CommenMsg(data.msg); }
                },
                error: function () {
                    // CommenMsg("网络错误！");
                }
            });
        }
    })


    /////蛋糕自动选拼 加入购物车
    $(".doublecity .buy_info .go_buy .fn_right").click(function () {
        var $price = $(this).parents(".doublecity").find(".on").attr("price");
        var $Num = $(this).parents(".doublecity").find(".a_num").html();
        if (CheckCake()) {
            $.ajax({
                url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
                data: { "type": "_car", "_CommodityID": $("#key").val(), "_GuiGe": $("#hid_guigue").val(), "_Num": $(this).parents(".doublecity").find(".a_num").html(), "cake1": $("#hidcake1").val(), "cake2": $("#hidcake2").val() },
                success: function (data) {
                    if (data.msg == "加入购物车成功") {
                        var cainfo = "[{id:\"" + $("#key").val() + "-" + $("#hid_guigue").val() + "\",n:\"" + $Num + "\",p:\"" + $price + "\"}]";
                        __msv_m("cart", cainfo); //监测
                        carNum();
                        $(".ui_popup").hide();
                        $("#coupon_ture").popupFn();
                    } else { CommenMsg(data.msg); }
                },
                error: function () {
                    CommenMsg("网络错误！");
                }
            });
        }
    })
    function CheckCake() {
        if ($("#hidcake1").val() == "") {
            $("#p_error").html('请您选择所需的选拼蛋糕，确认再购买');
            $(".ui_popup").hide();
            $("#DiyCake").popupFn();
            return false;
        }
        if ($("#hidcake2").val() == "") {
            $("#p_error").html('请您选择所需的选拼蛋糕，确认再购买');
            $(".ui_popup").hide();
            $("#DiyCake").popupFn();
            return false;
        }
        return true;
    }
    //DIY热恋双城结束


    $(".goodsdetail_page .buy_info .go_buy .fn_left").click(function () {
        var $price = $(this).parents(".goodsdetail_page").find(".on").attr("price");
        var $Num = $(this).parents(".goodsdetail_page").find(".a_num").html();
        $.ajax({
            url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_car", "_CommodityID": $("#key").val(), "_GuiGe": $("#hid_guigue").val(), "_Num": $(this).parents(".goodsdetail_page").find(".a_num").html() },
            success: function (data) {
                if (data.msg == "加入购物车成功") {
                    var cainfo = "[{id:\"" + $("#key").val() + "-" + $("#hid_guigue").val() + "\",n:\"" + $Num + "\",p:\"" + $price + "\"}]";
                    __msv_m("cart", cainfo); //监测
                    location.href = "/buycart.html";
                    //                        carNum();
                    //                        $(".ui_popup").hide();
                    //                        $("#coupon_ture").popupFn();
                    // location.href = "/buycart.html";
                } else { CommenMsg(data.msg); }
            },
            error: function () {
                CommenMsg("网络错误！");
            }
        });
    })
    //详细页 立即购买
    $(".goodsdetail_page .buy_info .go_buy .fn_right").click(function () {
        var $price = $(this).parents(".goodsdetail_page").find(".on").attr("price");
        var $Num = $(this).parents(".goodsdetail_page").find(".a_num").html();
        $.ajax({
            url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_car", "_CommodityID": $("#key").val(), "_GuiGe": $("#hid_guigue").val(), "_Num": $(this).parents(".goodsdetail_page").find(".a_num").html() },
            success: function (data) {
                if (data.msg == "加入购物车成功") {
                    var cainfo = "[{id:\"" + $("#key").val() + "-" + $("#hid_guigue").val() + "\",n:\"" + $Num + "\",p:\"" + $price + "\"}]";
                    __msv_m("cart", cainfo); //监测
                    carNum();
                    $(".ui_popup").hide();
                    $("#coupon_ture").popupFn();
                } else { CommenMsg(data.msg); }
            },
            error: function () {
                CommenMsg("网络错误！");
            }
        });
    })
    //商品详细页 加与减
    $(".order_module .order_module_box .box_module .order_car_num .left").click(function () {
        var $PNum = $(this).attr("data-id");
        var $num = $(this).parents(".order_car_num").find(".ui_input_text").val();
        $num = parseInt($num);
        if ($num < 100) {
            if ($num <= 1) { $num = 1; }
            else { $num = $num - 1; }
            changcake($PNum, $num);
            $num = $(this).parents(".order_car_num").find(".ui_input_text").val($num);
        };
        totalPrice();
    })



    $(".order_module .order_module_box .box_module .order_car_num .right").click(function () {
        var $priceNum = $(this).attr("data-id");
        var $num = $(this).parents(".order_car_num").find(".ui_input_text").val();
        var $num = parseInt($num);
        if ($num < 100) {
            var $num = $num + 1;
            changcake($priceNum, $num);
            var $num = $(this).parents(".order_car_num").find(".ui_input_text").val($num);
        };
        totalPrice();
    })
    function totalPrice() {
        var total1 = 0.00;
        var total2 = 0.00;
        var list = $("#item-sec table tr[name='total']");
        for (var i = 0; i < list.length; i++) {
            var $dataid = list.eq(i).find(".order_car_num .ui_input_text").val();
            var $price = list.eq(i).find(".price .price1").text();
            list.eq(i).find(".aprice .aprice1").text(parseFloat($price * $dataid) + ".00"); //小计
            total1 = total1 + parseFloat($price * $dataid);
        }
        list = $("#item-sec2 table tr[name='total']");
        for (var i = 0; i < list.length; i++) {
            var $dataid = list.eq(i).find(".order_car_num .ui_input_text").val();
            var $price = list.eq(i).find(".price .price1").text();
            list.eq(i).find(".aprice .aprice1").text(parseFloat($price * $dataid) + ".00"); //小计
            total2 = total2 + parseFloat($price * $dataid);
        }
        $("#caketotal1").text("蛋糕金额：￥" + total1.toFixed(2));
        $("#caketotal2").text("配件金额：￥" + total2.toFixed(2));
        total1 = total1 + total2;
        $("#caketotal3").html("总计金额：<b>￥" + total1.toFixed(2) + "</b>");
    }

    $(".go_btn").click(function () {
        var list = $("#item-sec table tr[name='total']");
        if (list.length == 0) {
            CommenMsg("抱歉您的购物车蛋糕目前为空，请先添加商品！");
            return;
        }
        else {
            var info = '', info1 = '';
            var list = $("#item-sec table tr[name='total']");
            for (var i = 0; i < list.length; i++) {
                var $dataid = list.eq(i).find(".order_car_num .ui_input_text").val();
                var $pid = list.eq(i).find(".order_car_num .left").attr("data-id");
                var $price = list.eq(i).find(".price .price1").text();
                list.eq(i).find(".aprice .aprice1").text(parseFloat($price * $dataid) + ".00"); //小计
                if (i == list.length - 1) {
                    info += "{id:\"" + $pid + "\",n:" + $dataid + ",p:" + parseFloat($price * $dataid) + "}"
                }
                else { info += "{id:\"" + $pid + "\",n:" + $dataid + ",p:" + parseFloat($price * $dataid) + "}," }
            }
            list = $("#item-sec2 table tr[name='total']");
            for (var i = 0; i < list.length; i++) {
                var $dataid = list.eq(i).find(".order_car_num .ui_input_text").val();
                var $pid = list.eq(i).find(".order_car_num .left").attr("data-id");
                var $price = list.eq(i).find(".price .price1").text();
                list.eq(i).find(".aprice .aprice1").text(parseFloat($price * $dataid) + ".00"); //小计
                if (i == list.length - 1) {
                    info1 += "{id:\"" + $pid + "\",n:" + $dataid + ",p:" + parseFloat($price * $dataid) + "}"
                }
                else { info1 += "{id:\"" + $pid + "\",n:" + $dataid + ",p:" + parseFloat($price * $dataid) + "}," }
            }
            if (info1 != '') { info = info1 + ',' + info1; }
            // __msv_m("settle", "[" + info + "]");
            //  settle(info);
            if ($("#hid").val() == "0") { location.href = "/FirOrder.html"; }
            else { location.href = "/manage/FirOrder.html"; }
        }
    })
    var settle = function (info) {
        __msv_m("settle", "[" + info + "]");
    }
    //删除购物车商品蛋糕
    $("#item-sec .table_data .delete a").click(function () {
        var $priceNum = $(this).attr("data-id");
        if (confirm("确定删除此商品？")) {
            deleteCake($priceNum);
            $(this).parent().parent().remove(); totalPrice();
        }
    })
    //删除商品
    var deleteCake = function (num) {
        $.ajax({
            url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_delete", "Commodity": num },
            success: function (data) {
                if (data.msg == "设置成功") {//成功不做操作
                    carNum();
                } else { CommenMsg(data.msg); }
            },
            error: function () {
                CommenMsg("网络错误！");
            }
        });
    }
    //删除购物车商品附件
    $("#item-sec2 .table_data .delete a").click(function () {
        var $priceNum = $(this).attr("data-id");
        if (confirm("确定删除此商品？")) {
            deleteCake($priceNum);
            $(this).parent().parent().remove(); totalPrice();
        }
    })
    //附件加入购物车
    $(".blue_btn").click(function () {
        var $priceNum = $(this).attr("data-id");
        AddCartFuJian($priceNum);
    })
    var AddCartFuJian = function (goodid) {
        var $price = $(this).parents(".goodsdetail_page").find(".on").attr("price");
        var $Num = $(this).parents(".goodsdetail_page").find(".a_num").html();
        $.ajax({
            url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_car", "_CommodityID": goodid, "_GuiGe": "1", "_Num": "1" },
            success: function (data) {
                if (data.msg == "加入购物车成功") {
                    if ($("#hid").val() == "0") {
                        location.href = "/buycart.html";
                    }
                    else { location.href = "/manage/buycart.html"; }

                } else { CommenMsg(data.msg); }
            },
            error: function () {
                CommenMsg("网络错误！");
            }
        });
    }

    $(".header .nav .link").hover(function () {
        if (!$(this).is(":animated")) {
            $(this).addClass("on");
            $(this).find(".menu").stop(false,true).slideDown(300);
        }

    }, function () {
        if (!$(this).is(":animated")) {
            $(this).removeClass("on");
            $(this).find(".menu").stop(false,true).slideUp(300);
        }
    });

    //fixed页头
//    $(window).load(function () {
//       var $t = $(".header").offset().top;
//    });

    window.onscroll = function () {
        var $t = $(".header").offset().top;
        var $s = $(document).scrollTop();
        if ($s > $t) {
            $(".header").not(".index").addClass("header_fixed");
            $("body > .page").not(".index").css("padding-top", "128px");
        } 
//        else {
//            $(".header").not(".index").removeClass("header_fixed");
//            $("body > .page").not(".index").css("padding-top", "0");
//        };
    };


    //TAB切换
    $(".ui_tab_nav .tab_li").click(function () {
        $(this).addClass("on").siblings(".tab_li").removeClass("on");
    })

    //商品列表下拉
    $(".goods_list_page .goods_btn .btn").hover(function () {
        $(this).find(".btn_zu").slideDown(100);
    }, function () {
        $(this).find(".btn_zu").slideUp(100);
    });
    //20140731赋值方法
    $(".goods_list_page .goods_btn .btn .small_btn").click(function () {
        $guige = $(this).attr("guige");
        $price = $(this).attr("price");
        $c = $(this).html();
        $(this).parents(".div_btn").find(".first_btn").html($c);
        $(this).parents(".div_btn").find(".first_btn").attr("guige", $guige);
        $(this).parents(".div_btn").find(".first_btn").attr("price", $price);
    });





    $(".index_module  .tab_con .goods_list li").live({
        mouseenter: function () {
            $(this).find(".info").show();
        }, mouseleave: function () {
            $(this).find(".info").hide();
        }
    });

    $(".index_module .tab li").click(function () {
        $(this).addClass("on").siblings("li").removeClass("on");
    });

    //订单order_page_box
    $(".order_page_box .radio_x .hide").click(function () {
        $(this).parents(".order_page_box").find(".hide_box").slideUp(300);
    });
    $(".order_page_box .radio_x .show").click(function () {
        $(this).parents(".order_page_box").find(".hide_box").slideDown(300);
    });
    //使用新的收货地址
    $(".new_add").click(function () {
        $("#new_add").slideDown(300);
    });
    //使用新的发票信息
    $(".new_fp").click(function () {
        $("#new_fp").slideDown(300);
    });
    //选择网上银行支付
    $(".more_bank").click(function () {
        $("#more_bank").show();
    });


    //显示/隐藏地址
    $(".smore").toggle(function () {
        $(".more_add").slideDown(300);
        $(this).text("收起一些地址 ▲");
    }, function () {
        $(".more_add").slideUp(300);
        $(this).text("显示更多地址 ▼");
    })



    //幻灯片计数
    $(".header_banner #slides li").each(function () {
        $(".homeHead .num").append('<a href="javascript:void(0)"></a>');
        $(".homeHead .num a").eq(0).addClass("on");
    });
    $(".slide:first").show();

    //首页轮播
    var totWidth = 0;
    var positions = new Array();
    var pwidth = $(".homeShow").width();
    // $(".slide").width(pwidth);
    $('#slides .slide').each(function (i) {
        positions[i] = totWidth;
        var f = pwidth - 960;
        totWidth += (960 + f);
        if (!$(this).width()) {
            return false
        }
    });
    //窗口调整尺寸时
    $(window).resize(function () {
        totWidth = 0;
        positions = new Array();
        pwidth = $(".homeShow").width();
        // $(".slide").width(pwidth);
        $('#slides .slide').each(function (i) {
            positions[i] = totWidth;
            var f = pwidth - 960;
            totWidth += (960 + f);
            if (!$(this).width()) {
                return false
            }
        });
        // $('#slides').width(totWidth).stop().animate({
        // 	marginLeft: -positions[0] + 'px'
        // }, 0)
    });
    //城市切换
    $(".city,.city_list").hover(function () {
        $(".city").addClass("city_hover");
        $(".city_list").show();
    }, function () {
        $(".city").removeClass("city_hover");
        $(".city_list").hide();
    });
    // $('#slides').width(totWidth);
    indexImgPlay();
    hotCake();
    hotNew01();
    hotNew02();
    hotNew03();
    hotNew04();
    //发表评论
    $(".write_comment").toggle(function () {
        $(this).parents("tr").next("#write_comment").show(300);
        $("html,body").animate({
            scrollTop: "+=" + 200
        }, 500);
    }, function () {
        $(this).parents("tr").next("#write_comment").hide(300);
        $("html,body").animate({
            scrollTop: "-=" + 200
        }, 500);
    })

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
    }).click(function () {
        var $ind = $(this).index(); //获得排序
        $(this).parents(".ui_fen_box").find("li").removeClass("on");
        $(this).parents(".ui_fen_box").find("li:first").addClass("on");
        for (var i = 0; i < $ind; i++) {
            $(this).parents(".ui_fen_box").find("li").eq(i + 1).addClass("on");
        };
    });

    $(".goods_list_page .goods_btn .buy").click(function () {
        $(this).guigeFn();
    });

    $(".goods_list_page .goods_btn .car").click(function () {
        $(this).guigeBuy();
    });



    //商品数量控制
    goodsNum();
    shagoodsNum(); //闪电购
});

//20140731商品列表取规格 立即购买
; (function () {
    $.fn.guigeFn = function () {
        //取值
        $g = $(this).parents(".goods_btn").find(".first_btn").attr("guige");
        $prid = $(this).parents(".goods_btn").find(".first_btn").attr("goodsid");
        $price = $(this).parents(".goods_btn").find(".first_btn").attr("price");
        if ($("#hid").val() == "0") {
            var cainfo = "[{id:\"" + $prid + "-" + $g + "\",n:1,p:\"" + $price + "\"}]";
            __msv_m("cart", cainfo); //监测
        }
        $.ajax({
            url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_car", "_CommodityID": $prid, "_GuiGe": $g, "_Num": "1" },
            success: function (data) {
                if (data.msg == "加入购物车成功") {
                    if ($("#hid").val() == "1")
                    { location.href = "/manage/buycart.html"; }
                    else { location.href = "/buycart.html"; }
                    //  location.href = "/buycart.html";
                } else { CommenMsg(data.msg); }
            },
            error: function () {
                CommenMsg("网络错误！");
            }
        });
    };
})(jQuery);
//加入购物车
; (function () {
    $.fn.guigeBuy = function () {
        //取值
        $g = $(this).parents(".goods_btn").find(".first_btn").attr("guige");
        $prid = $(this).parents(".goods_btn").find(".first_btn").attr("goodsid");
        $price = $(this).parents(".goods_btn").find(".first_btn").attr("price");
        $.ajax({
            url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_car", "_CommodityID": $prid, "_GuiGe": $g, "_Num": "1" },
            success: function (data) {
                if (data.msg == "加入购物车成功") {
                    carNum();
                    if ($("#hid").val() == "0") {
                        var cainfo = "[{id:\"" + $prid + "-" + $g + "\",n:1,p:\"" + $price + "\"}]";
                        __msv_m("cart", cainfo); //监测
                    }
                    $(".ui_popup").hide();
                    $("#coupon_ture").popupFn();
                } else { CommenMsg(data.msg); }
            },
            error: function () {
                CommenMsg("网络错误！");
            }
        });
    };
})(jQuery);

var carNum = function () {
    $.ajax({
        url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
        data: { "type": "_getcarnum", "page": "1" },
        success: function (data) {
            $num = $(".page .header .fn_right .car").html(data.msg);
        },
        error: function () {
            CommenMsg("网络错误！");
        }
    });
}

var goodsNum = function () {
    $(".goods_num_box .a_add").click(function () {
        var $num = $(this).parents(".goods_num_box").find(".a_num").val();
        var $num = parseInt($num);
        if ($num < 100) {
            var $num = $num + 1;
            var $num = $(this).parents(".goods_num_box").find(".a_num").val($num);
        };
    });
    $(".goods_num_box .a_cut").click(function () {
        var $num = $(this).parents(".goods_num_box").find(".a_num").val();
        var $num = parseInt($num);
        if ($num > 1) {
            var $num = $num - 1;
            var $num = $(this).parents(".goods_num_box").find(".a_num").val($num);
        }
    });

}
var indexImgPlay = function () {
    //变量
    $box = $(".x-imgbox");
    $ul = $box.find(".big-img");
    $li = $ul.find("li");
    $left = $box.find("a.left");
    $right = $box.find("a.right");
    $i = $li.length;
    $cur = 1;
    $num = $box.find(".num").find("a");

    //动画时间
    $time = 1000;

    //计时器时间
    $movTime = 8000;

    $li.eq(0).css("z-index", "9");
    //定义自动滚动
    var $mov;

    //右
    $right.click(function () {
        if (!$li.is(":animated")) {
            if ($cur < $i) {
                $li.eq($cur).fadeIn($time, function () {
                    $cur++;
                    $num.eq($cur - 1).addClass("on").siblings().removeClass("on");
                }).siblings().fadeOut($time);
            } if ($cur == $i) {
                $li.eq(0).fadeIn($time, function () {
                    $cur = 1;
                    $num.eq($cur - 1).addClass("on").siblings().removeClass("on");
                }).siblings().fadeOut($time);
            };
        };
    });
    //左
    $left.click(function () {
        if (!$li.is(":animated")) {
            if ($cur > 1) {
                $li.eq($cur - 2).fadeIn($time, function () {
                    $cur--;
                    $num.eq($cur - 1).addClass("on").siblings().removeClass("on");
                }).siblings().fadeOut($time);
            } if ($cur == 1) {
                $li.eq($i - 1).fadeIn($time, function () {
                    $cur = $i;
                    $num.eq($cur - 1).addClass("on").siblings().removeClass("on");
                }).siblings().fadeOut($time);
            };
        };
    });

    //点击num图标
    $num.click(function () {
        $ind = $(this).index();
        $li.eq($ind).fadeIn($time, function () {
            $cur = $ind + 1;
        }).siblings().fadeOut($time);
        $(this).addClass("on").siblings().removeClass("on");
    });

    $box.live("mouseenter", function () {
        //移入时清除计时器
        clearInterval($mov);
    }).live("mouseleave", function () {
        //计时器
        $mov = setInterval(function () {
            $right.trigger("click");
        }, $movTime);
    }).trigger('mouseleave');
};

var hotCake = function () {
    $cur = 0;

    //首页 TAB 切换
    $(".index_module .tab li").click(function () {
        $ind = $(this).index();
        $cur = 0;
        $(".index_module .tab_con .goods_list").each(function () {
            $(this).find(".max_width").css("left", "0")
        });
        $(".index_module .tab_con").eq($ind).show().siblings(".tab_con").hide();
    });

    //热门蛋糕轮转
    $cakeBox = $(".index_module .tab_con .goods_list .max_width");  //滚动列表
    $cakeLength = $cakeBox.find("li").length;   //蛋糕数量

    //当小图大于5张的时候执行左右轮播
    $cakeWidth = $cakeBox.find(".index_module .tab_con .goods_list").width();

    $page = Math.ceil($cakeLength / 5);
    $box = $cakeBox;
    $goLeft = $(".index_module .tab_con .arrows .left");
    $goRight = $(".index_module .tab_con .arrows .right");
    $goRight.click(function () {
        $goBox = $(this).parents(".tab_con");
        $page = $goBox.find("li").length;   //蛋糕数量
        $page = $page - 5;
        $indPage = $goBox.index();

        $box = $(this).parents(".tab_con").find(".max_width");

        if (!$box.is(":animated")) {
            $box.animate({
                left: "-=" + 158
            }, 300, function () {
                $firstBox = $goBox.find("li").first().html();   //获得第一个元素
                $goBox.find("li").last().after("<li>" + $firstBox + "</li>");  //加到最后
                $goBox.find("li").first().remove();             //移去第一个

                $box.css("left", "0");
                // console.log($cur,$page)
            });
        };
    });
    $goLeft.click(function () {
        $goBox = $(this).parents(".tab_con");

        $box = $(this).parents(".tab_con").find(".max_width");
        if (!$box.is(":animated")) {

            $lastBox = $goBox.find("li").last().html(); //获得最后一个元素
            $goBox.find("li").first().before("<li>" + $lastBox + "</li>"); //加到最前
            $goBox.find("li").last().remove();              //移去最后一个
            $box.css("left", "-158px").animate({
                left: "+=" + 158
            }, 300, function () {
                $box.css("left", "0");
            });
        };
    });
};
var hotNew01 = function () {
    //计时器时间
    $movTime01 = 5419;
    var $mov01;
    //热门蛋糕轮转

    $cakeBox01 = $(".index_module .tab_con .goods_list .max_width");    //滚动列表
    $cakeLength = $cakeBox01.find("li").length; //蛋糕数量

    //当小图大于5张的时候执行左右轮播
    $cakeWidth = $cakeBox01.find(".index_module .tab_con .goods_list").width();
    $cur01 = 0;
    $page01 = $(".img01").find("li").length - 1;    //数量;
    $box01 = $cakeBox01;
    $goLeft = $(".img01  .arrows .left");
    $goRight = $(".img01  .arrows .right");
    $goRight.click(function () {
        if ($page01 > $cur01) {
            $box01 = $(this).parents(".box_con").find(".max_width");

            if (!$box01.is(":animated")) {
                $box01.animate({
                    left: "-=" + 330
                }, 1132, function () {
                    $cur01++;
                });
            };
        } else {
            $box01.animate({
                left: 0
            }, 1132, function () {
                $cur01 = 0;
            });
        };
    });
    $goLeft.click(function () {
        $box01 = $(this).parents(".box_con").find(".max_width");
        if ($box01.css("left") == "0px") {

        } else {
            if ($cur01 !== 0) {
                if (!$box01.is(":animated")) {
                    $box01.animate({
                        left: "+=" + 330
                    }, 1132, function () {
                        $cur01--;
                    });
                };
            };
        };
    });

    $box01.live("mouseenter", function () {
        //移入时清除计时器
        clearInterval($mov01);
    }).live("mouseleave", function () {
        //计时器
        $mov01 = setInterval(function () {
            $(".img01  .arrows .right").trigger("click");
        }, $movTime01);
    }).trigger('mouseleave');
};

var hotNew02 = function () {
    //计时器时间
    $movTime02 = 7320;
    var $mov02;
    
    //热门蛋糕轮转
    $cakeBox02 = $(".index_module .tab_con .goods_list .max_width");    //滚动列表
    $cakeLength02 = $cakeBox02.find("li").length;   //蛋糕数量
    
    //当小图大于5张的时候执行左右轮播
    $cakeWidth02 = $cakeBox02.find(".index_module .tab_con .goods_list").width();
    $cur02 = 0;
    $page02 = $(".img02").find("li").length - 1;    //数量;
    $box02 = $cakeBox02;
    $goLeft02 = $(".img02  .arrows .left");
    $goRight02 = $(".img02  .arrows .right");
    $goRight02.click(function () {
        if ($page02 > $cur02) {
            $box02 = $(this).parents(".box_con").find(".max_width");

            if (!$box02.is(":animated")) {
                $box02.animate({
                    left: "-=" + 330
                }, 1234, function () {
                    $cur02++;
                });
            };
        } else {
            $box02.animate({
                left: 0
            }, 1234, function () {
                $cur02 = 0;
            });
        };
    });
    $goLeft02.click(function () {
        $box02 = $(this).parents(".box_con").find(".max_width");
        if ($box02.css("left") == "0px") {

        } else {
            if ($cur02 !== 0) {
                if (!$box02.is(":animated")) {
                    $box02.animate({
                        left: "+=" + 330
                    }, 1234, function () {
                        $cur02--;
                    });
                };
            };
        };
    });

    $box02.live("mouseenter", function () {
        //移入时清除计时器
        clearInterval($mov02);
    }).live("mouseleave", function () {
        //计时器
        $mov02 = setInterval(function () {
            $goRight02.trigger("click");
        }, $movTime02);
    }).trigger('mouseleave');
};
        //上海首页右下侧滚动图片
        var hotNew03 = function () {
            //计时器时间
            $movTime02 = 7320;
            var $mov02;
            //热门蛋糕轮转
            $cakeBox02 = $(".chali");    //滚动列表
            $cakeLength02 = $cakeBox02.find("li").length;   //蛋糕数量

            //当小图大于5张的时候执行左右轮播
            $cakeWidth02 = $cakeBox02.find(".chalists").width();
            $cur02 = 0;
            $page02 = $(".img03").find("li").length - 1;    //数量;
            $box02 = $cakeBox02;
            $goLeft02 = $(".img03  .arrows .left");
            $goRight02 = $(".img03  .arrows .right");
            $goRight02.click(function () {
                if ($page02 > $cur02) {
                    $box02 = $(this).parents(".box_con").find(".max_width");

                    if (!$box02.is(":animated")) {
                        $box02.animate({
                            left: "-=" + 330
                        }, 1234, function () {
                            $cur02++;
                        });
                    };
                } else {
                    $box02.animate({
                        left: 0
                    }, 1234, function () {
                        $cur02 = 0;
                    });
                };
            });
            $goLeft02.click(function () {
                $box02 = $(this).parents(".box_con").find(".max_width");
                if ($box02.css("left") == "0px") {

                } else {
                    if ($cur02 !== 0) {
                        if (!$box02.is(":animated")) {
                            $box02.animate({
                                left: "+=" + 330
                            }, 1234, function () {
                                $cur02--;
                            });
                        };
                    };
                };
            });

            $box02.live("mouseenter", function () {
                //移入时清除计时器
                clearInterval($mov02);
            }).live("mouseleave", function () {
                //计时器
                $mov02 = setInterval(function () {
                    $goRight02.trigger("click");
                }, $movTime02);
            }).trigger('mouseleave');
        };

        //下午茶滚动图片
         var hotNew04 = function () {
            //计时器时间
            $movTime04 = 5419;
            var $mov04;
            //热门蛋糕轮转
            $cakeBox04 = $(".chaimgli");    //滚动列表
            $cakeLength04 = $cakeBox04.find("li").length;   //蛋糕数量

            //当小图大于5张的时候执行左右轮播
            $cakeWidth02 = $cakeBox04.find(".chatupianlist").width();
            $cur04 = 0;
            $page04 = $(".img04").find("li").length - 1;    //数量;
            $box04 = $cakeBox02;
            $goLeft04 = $(".img04  .arrows .left");
            $goRight04 = $(".img04  .arrows .right");
            $goRight04.click(function () {
                if ($page04 > $cur04) {
                    $box04 = $(this).parents(".img04").find(".max_width");

                    if (!$box04.is(":animated")) {
                        $box04.animate({
                            left: "-=" + 800
                        }, 1234, function () {
                            $cur04++;
                        });
                    };
                } else {
                    $box04.animate({
                        left: 0
                    }, 1234, function () {
                        $cur04 = 0;
                    });
                };
            });
            $goLeft04.click(function () {
                $box04 = $(this).parents(".img04").find(".max_width");
                if ($box04.css("left") == "0px") {

                } else {
                    if ($cur04 !== 0) {
                        if (!$box04.is(":animated")) {
                            $box04.animate({
                                left: "+=" + 800
                            }, 1234, function () {
                                $cur04--;
                            });
                        };
                    };
                };
            });

            $box04.live("mouseenter", function () {
                //移入时清除计时器
                clearInterval($mov04);
            }).live("mouseleave", function () {
                //计时器
                $mov04 = setInterval(function () {
                    $goRight04.trigger("click");
                }, $movTime04);
            }).trigger('mouseleave');
        };
         
//20140707订单提交页折叠
//$(".order_prime .my .myquan").click(function () {
//    alert("");
//    $(this).parents(".my").find(".quan").slideDown(300);
//    $(this).parents(".my").siblings(".my").find(".quan").slideUp(300);
//});
//城市弹出窗口
$(function () {
    //城市弹出窗口
    $(".header .city_list .city_link").click(function () {
        var $page = $(this).attr("dataid");
        var $datanow = $(this).attr("datanow");
        $(".ui_popup .ui_popup_content .fn_clear .coupon_ok").attr("data", $page);
        var $s1 = $(".ui_popup .ui_popup_content .fn_clear .coupon_ok").attr("data");
        if ($page != $datanow) {
            $(".ui_popup").hide();
            $("#coupon_city").popupFn();
        }
    });
});
$(function () {
    //确定切换
    $(".ui_popup .ui_popup_content .fn_clear .coupon_ok").click(function () {
        var $city = $(this).attr("data");
        $.ajax({
            url: "../WebPage/SaveInfo.aspx", dataType: "json", type: "post", timeout: "10000",
            data: { "type": "_city", "_city": $city },
            success: function (data) {
                //                if (data.msg == "1") {
                location.href = "http://www.incake.net";
                //                } else { alert(data.msg); }
            },
            error: function () {
                CommenMsg("网络错误！");
            }
        });
    });
});



