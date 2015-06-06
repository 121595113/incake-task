var myScroll,
	pullDownEl, pullDownOffset;
/**
 * 下拉刷新 （自定义实现此方法）
 * myScroll.refresh();		// 数据加载完成后，调用界面更新方法
 */
function pullDownAction(c, d) {
	setTimeout(function() { // <-- Simulate network congestion, remove setTimeout from production!
		var el, dt, dd, i;
		el = document.getElementById(c);
		for (i = 0; i < 3; i++) {
			dt = document.createElement('dt');
			dd = document.createElement('dd');
			dt.innerHTML = '<div class=\"left\"><label>订单号</label><div>我是订单号</div></div><div class=\"right\"><a href=\"javascript\:\;\" class=\"blue_btn ui-link\">配送完成</a></div>';
			dd.innerHTML = '<div><p><label>收货人：</label><span>INCAKE</span></p><p><label>手机/电话：</label><span>13584625963</span></p></div><p><label>收货时间：</label><span>2015.03.04 09:30~10:30</span></p><p><label>商品信息：</label><span>女王芝士 1.5磅&chi;1<br />女王芝士 1.5磅&chi;1</span></p>';
			el.insertBefore(dd, el.childNodes[0]);
			el.insertBefore(dt, el.childNodes[0]);
		}
		//						_refresh();
		d.refresh(); //数据加载完成后，调用界面更新方法   Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 1000); // <-- Simulate network congestion, remove setTimeout from production!
}

/**
 * 滚动翻页 （自定义实现此方法）
 * myScroll.refresh();		// 数据加载完成后，调用界面更新方法
 */

function pullUpAction(d) {
		setTimeout(function() { // <-- Simulate network congestion, remove setTimeout from production!
			d.refresh(); // 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
		}, 100); // <-- Simulate network congestion, remove setTimeout from production!
	}
	/**
	 * 初始化iScroll控件
	 */

function loaded(a, b, c, d) {
		var pullDownEl = document.getElementById(b);
		var pullDownOffset = pullDownEl.offsetHeight;
		if (d == 'scroller_1') {
			var pullUpEl = document.getElementById('pullUp_1');
		} else if(d == 'scroller_2'){
			var pullUpEl = document.getElementById('pullUp_2');
		} else{
			var pullUpEl = document.getElementById('pullUp_3');
		}
//		var pullUpEl = d == 'scroller_1' ? document.getElementById('pullUp_1') : document.getElementById('pullUp_2');
		var pullUpOffset = pullUpEl.offsetHeight;
		d = new iScroll(a, {
			scrollbarClass: 'myScrollbar',
			/* 重要样式 */
			useTransition: false,
			/* 此属性不知用意，本人从true改为false */
			topOffset: pullDownOffset,
			onRefresh: function() {
				if (pullDownEl.className.match('loading')) {
					pullDownEl.className = 'pullDown';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
				}
			},
			onScrollMove: function() {
				if (this.y > 5 && !pullDownEl.className.match('flip')) {
					pullDownEl.className = 'flip pullDown';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
					this.minScrollY = 0;
				} else if (this.y < 5 && pullDownEl.className.match('flip')) {
					pullDownEl.className = 'pullDown';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
					this.minScrollY = -pullDownOffset;
				} else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
					pullUpEl.className = 'flip';
					this.maxScrollY = this.maxScrollY;
				} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
					pullUpEl.className = '';
					this.maxScrollY = pullUpOffset;
				}
			},
			onScrollEnd: function() {
				if (pullDownEl.className.match('flip')) {
					pullDownEl.className = 'loading pullDown';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
					pullDownAction(c, d); // Execute custom function (ajax call?)
				} else if (pullUpEl.className.match('flip')) {
					pullUpEl.className = 'loading';
					pullUpAction(d); // Execute custom function (ajax call?)
				}
			}
		});
		setTimeout(function() {
			document.getElementById(a).style.left = '0';
		}, 800);
	}
	//初始化绑定iScroll控件 
document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);
document.addEventListener('DOMContentLoaded', loaded('wrapper_2', 'pullDown_2', 'thelist_2', 'scroller_2'), false);
document.addEventListener('DOMContentLoaded', loaded('wrapper_1', 'pullDown_1', 'thelist_1', 'scroller_1'), false);
document.addEventListener('DOMContentLoaded', loaded('wrapper_3', 'pullDown_3', 'thelist_3', 'scroller_3'), false);