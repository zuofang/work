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
	//获取房产类型
	getRealtyTypeList:function(callBack){
		mui.ajax('http://139.196.232.30/apis/realty/realty-types/',{
			dataType:'json',
			timeout:10000,
			headers:{'Authorization':'Token d61cb799e4114300c21aabd4ba346dd2ee98649c'},
			success:function(data){
				callBack(data);
			},
			error:function(){
				mui.toast('服务器繁忙');	
			}
		});
	},
	
	//获取周边类型
	getFacilityTypeList:function(callBack){
		mui.ajax('http://139.196.232.30/apis/realty/facility-types/',{
			dataType:'json',
			timeout:10000,
			headers:{'Authorization':'Token d61cb799e4114300c21aabd4ba346dd2ee98649c'},
			success:function(data){
				callBack(data);
			},
			error:function(){
				mui.toast('服务器繁忙');	
			}
		});
	},
	
	//上传房产
	postRealty:function(data,callBack){
		$.ajax({
		     type: 'POST',
		    contentType: "application/json",
		     url: 'http://139.196.232.30/apis/realty/realties/' ,
		     headers:{'Authorization':'Token d61cb799e4114300c21aabd4ba346dd2ee98649c'},
		     data:JSON.stringify(data),
		     success: function(data){
				 callBack(data);
			 },
			 error:function(){
				mui.toast('服务器繁忙');	
			},
		    dataType: 'json'
		});
	},
	
	//上传图片
	uploadImg:function(url,file,callBack){
		$.ajax({
		     type: 'POST',
		     contentType: "application/json",
		     url: url,
		     headers:{'Authorization':'Token d61cb799e4114300c21aabd4ba346dd2ee98649c'},
		     data:{
		     	"file":file
		     },
		     success: function(data){
				 callBack(data);
			 },
			 error: function(XMLHttpRequest, textStatus, errorThrown) {
				 alert(XMLHttpRequest.status);
				 alert(XMLHttpRequest.readyState);
				 alert(textStatus);
   			 },
		    dataType: 'json'
		});
	}
};
