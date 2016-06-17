//打开设置页面
//document.getElementById('set').addEventListener('tap',function(){
//    		mui.openWindow({
//    			url:'set.html',
//    			id:'set'
//    		});
//    	});

//检查登录
function checkLogin(){
	if(plus.storage.getItem('token')===null){
		mui.toast('请登录后查看');
		return false;
	}else{
		return true;
	}
}
