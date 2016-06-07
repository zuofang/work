window.realtyApi={
	//获取验证码
	getPinCode:function(country,phone,callBack){
		var data={
			"country":country,
			"phone":phone
		};
		mui.post("http://139.196.232.30/apis/sms/pin/",data,function(data){
			callBack(data);		
		},'json');
	},
	
	//注册
	//type:1:agent 2:client
	register:function(data,callBack){			
		mui.post("http://139.196.232.30/apis/rest-auth/registration/",data,function(data){
				callBack(data);		
		},'json');
	},
	
	//登录
	login:function(userName,password,callBack){
		var data={
			"username":userName,
			"password":password
		};
		mui.post("http://139.196.232.30/apis/rest-auth/login/",data,function(data){
			callBack(data);
		})
	},
	
	//获取房产列表
	//status 0 出租 1 出售
	getRealtyList:function(callBack){
		mui.get("http://139.196.232.30/apis/realty/realties/",{},function(data){
			callBack(data);
		});
	},
	
	//获取商业房产列表
	getCommercialRealtyList:function(callBack){
		mui.get("http://139.196.232.30/apis/realty/commercial-realties/",{},function(data){
			callBack(data);
		});
	}
	
};
