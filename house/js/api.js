/**
 * 接口函数
 * token 身份认证
 * */
function RealtyApi(token){
	this.token=token||"";
	this.host="http://139.196.232.30";
	this.language="/zh";
}

//获取验证码
RealtyApi.prototype.getPinCode=function(country,phone,callBack){
	var data={
			"country":country,
			"phone":phone
		};
	$.post(this.host+this.language+"/apis/sms/pin/",data,function(data){
		callBack(data);		
	},'json');
};

//注册
RealtyApi.prototype.register=function(data,callBack){
	$.post(this.host+this.language+"/apis/rest-auth/registration/",data,function(data){
		callBack(data);		
		},'json');
};

//登录
RealtyApi.prototype.login=function(userName,password,callBack){
	$.ajax({
		     type: 'POST',
		     url: this.host+this.language+'/apis/rest-auth/login/',
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
};

//获取房产类型
RealtyApi.prototype.getRealtyTypeList=function(callBack){
	$.ajax({
			type:'GET',
			url:this.host+this.language+'/apis/realty/realty-types/',
			headers:{'Authorization':'Token '+this.token},
			success:function(data){
				callBack(data);
			},
			error:function(){
				mui.toast('服务器繁忙');	
			},
			dataType: 'json'
		});
};

//获取周边类型
RealtyApi.prototype.getFacilityTypeList=function(callBack){
	$.ajax({
			type:'GET',
			url:this.host+this.language+'/apis/realty/surrounding-sorts/',
			headers:{'Authorization':'Token '+this.token},
			success:function(data){
				var facilityData=[];
				for(var i=0;i<data.length;i++){
					facilityData.push({
						value:data[i].id,
						text:data[i].name
					});
				}
				callBack(facilityData);
			},
			error:function(){
				mui.toast('服务器繁忙');	
			},
			dataType: 'json'
	});
};

//获取地域类型
RealtyApi.prototype.getRegionList=function(callBack){
	$.ajax({
			type:'GET',
			url:this.host+this.language+'/apis/realty/regions/',
			headers:{'Authorization':'Token '+this.token},
			success:function(data){
				var regionData=[];
				for(var i=0;i<data.length;i++){
					regionData.push({
						value:data[i].id,
						text:data[i].name
					});
				}
				callBack(regionData);
			},
			error:function(){
				mui.toast('服务器繁忙');	
			},
			dataType: 'json'
	});
};




//房产列表
RealtyApi.prototype.getRealtyList=function(callBack,url,data){
	url=url||this.host+this.language+"/apis/realty/realties/";
	data=data||{};
	var options={
		url:url,
		type:'GET',
		data:data,
		success:function(data){
			callBack(data);
		}
	};
	if(this.token!=""){
		options.headers={'Authorization':'Token '+this.token};
	}
	$.ajax(options);
};


//收藏
RealtyApi.prototype.collectRealty=function(url,callBack){
	$.ajax({
		url:url,
		type:'POST',
		headers:{'Authorization':'Token '+this.token},
		success:function(data){
			callBack(data);
		},
		error:function(){
			mui.toast('收藏失败');
		}
	});
};

//取消收藏
RealtyApi.prototype.cancelCollectRealty=function(url,callBack){
	$.ajax({
		url:url,
		type:'DELETE',
		headers:{'Authorization':'Token '+this.token},
		success:function(){
			callBack();
		},
		error:function(){
			mui.toast('取消失败');
		}
	});
};

//收藏列表 3为房屋 2为地产
RealtyApi.prototype.getRealtyCollection=function(callBack,url,type){
	data={};
	if(url===""){
		data.sort__commercial=type;
		url=this.host+this.language+"/apis/realty/realties/liked/";
	}
	$.ajax({
		url:url,
		type:'GET',
		data:data,
		headers:{'Authorization':'Token '+this.token},
		success:function(data){
			callBack(data);
		}
	});
};
//发送消息
RealtyApi.prototype.sendMessage=function(url,data,sCallBack,fCallBack){
		$.ajax({
			type:"POST",
			url:url,
			async:true,
			data:data,
			headers:{'Authorization':'Token '+this.token},
			success:function(data){
				sCallBack(data);
			},
			error:function(){
				fCallBack();
			}
		});
};
//消息列表
RealtyApi.prototype.getMsgList=function(sCallBack,fCallBack,url){
	url=url||this.host+this.language+"/apis/message/conversations/";
	$.ajax({
			type:"GET",
			url:url,
			async:true,
			headers:{'Authorization':'Token '+this.token},
			success:function(data){
				sCallBack(data);
			},
			error:function(){
				fCallBack();
			}
		});
}
//获取聊天记录
RealtyApi.prototype.getChatList=function(url,sCallBack,fCallBack){
	$.ajax({
			type:"GET",
			url:url,
			async:true,
			headers:{'Authorization':'Token '+this.token},
			success:function(data){
				sCallBack(data);
			},
			error:function(){
				fCallBack();
			}
		});
}

