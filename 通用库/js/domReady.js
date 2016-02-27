//domReady方法
function domReady(fn){
	//对于现代浏览器，对DOMContentLoaded的事件处理采用标准的事件绑定方式
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',fn,false);
	}else {
		IEContentLoaded(fn);
	}
	//IE模拟DOMContentLoaded
	function IEContentLoaded (fn) {
		var d=window.document;
		var done=false;
		 // 只执行一次用户回调函数
		 var init=function () {
		 	 if(!done){
		 	 	done=true;
		 	 	fn();
		 	 }  
		 };
		 //监听document缓存状态
		 d.onreadystatechange=function(){
		 	//如果用户是在domReady之后绑定的函数就立马执行
		 	if(d.readyState=='complete'){
		 		d.onreadystatechange=null;
		 		init();
		 	}
		 	(function(){
		 		try {
		 			// dom树未创建之前调用doScroll会报错
		 			d.documentElement.doScroll('left');
		 		} catch(e) {
		 			//延迟再试一次
		 			setTimeout(arguments.callee, 50);
		 			return;
		 		}
		 		//没有错误表示dom树创建完毕，执行函数
		 		init();
		 	})();
		 };
	}
}