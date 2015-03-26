var c="ht"
function getUrlHost(u){
	var str = u.split('/',3);
	var data=["com","cn","org","net","edu","gov","hk"];
	var param=str[2].split('.');
	var length = param.length-1;
	var count = 0;
	for(var i=length;i>=0;i--){
		for(var j=0;j<data.length;j++){
			if(param[i]==data[j]){
				var host=param[i-1];count++;
			}
		}
	}
	if(count>=1){
		var n = host;
	} else {
		var n = 'unknow';
	}
	return n;
}
function __msv_m(action,data,aid){
	if(action=='arrive'){
		var r=document.referrer;
		if(r) var m=getUrlHost(r);
	}
	var m = (m || 'unknow');
	var aid = aid || 606;
	var re1 =new RegExp("\\?[a-z]+=1\\.2\\.3\\.6");
	var re2 =new RegExp("\\?[a-z]+=1\\.2\\.3\\.7");
	var re3 =new RegExp("\\?[a-z]+=1\\.2\\.4\\.7");
	var re4 =new RegExp("\\?[a-z]+=1\\.2\\.5\\.0");
	var re5 =new RegExp("\\?[a-z]+=1\\.2\\.6\\.0");
	var re6 =new RegExp("\\?[a-z]+=1\\.2\\.6\\.3");
	var re7 =new RegExp("\\?[a-z]+=1\\.2\\.6\\.7");
	var u = re1.test(window.location.href) ? 6 : re2.test(window.location.href)? 7 : re3.test(window.location.href)? 8 : re4.test(window.location.href)? 9 : re5.test(window.location.href)? 10 : re6.test(window.location.href)? 11 : re7.test(window.location.href)? 12 : 0;
	var img = new Image();
	img.src="http://track.massvidi.com/"+action+"?aid="+aid+"&m="+m+"&c="+c+"&data="+data+"&u="+u;
}
