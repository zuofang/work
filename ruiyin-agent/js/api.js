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
		$.ajax({
		     type: 'POST',
		     url: 'http://139.196.232.30/apis/rest-auth/login/' ,
		     data:{
				"username":userName,
				"password":password
			},
		     success: function(data){
				 callBack(data);
			 },
			 error:function(){
				mui.toast('用户名或密码错误');
			},
		    dataType: 'json'
		});
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
	
	//获取地域
	getRegionList:function(callBack){
		mui.ajax('http://139.196.232.30/apis/realty/regions/',{
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
	
	//上传房产 type:0 房地产 1商业地产
	postRealty:function(data,scallBack,fcallBack,type){
		type=type||1;
		var url="";
		switch(type){
			case 0:
			url="http://139.196.232.30/apis/realty/realties/";
			break;
			case 1:
			url="http://139.196.232.30/apis/realty/commercial-realties/";
			break;
		}
		$.ajax({
		     type: 'POST',
		     contentType: "application/json",
		     url: url ,
		     headers:{'Authorization':'Token d61cb799e4114300c21aabd4ba346dd2ee98649c'},
		     data:JSON.stringify(data),
		     success: function(data){
				 scallBack(data);
			 },
			 error:function(){
				fcallBack();
			},
		    dataType: 'json'
		});
	},
	
	//上传图片
	uploadImg:function(url,files,callBack,index){	
			index=index||0;
			var task=plus.uploader.createUpload(url,{
			method:"POST"
			},function(t,status){
				if(status!==201){
					alert("上传失败");
				}
				if(index<files.length-1){
					realtyApi.uploadImg(url,files,callBack,++index);
				}else{
					callBack();
				}
			});
			task.setRequestHeader('Authorization','Token d61cb799e4114300c21aabd4ba346dd2ee98649c');
			task.addFile(files[index],{key:"file"});
			task.start();
	}
};
