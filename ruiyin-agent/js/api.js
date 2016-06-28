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

//上传房产 type:0 房地产 1商业地产
RealtyApi.prototype.uploadRealty=function(data,scallBack,fcallBack){
	$.ajax({
		     type: 'POST',
		     contentType: "application/json",
		     url: this.host+this.language+"/apis/realty/realties/" ,
		     headers:{'Authorization':'Token '+this.token},
		     data:JSON.stringify(data),
		     success: function(data){
				 scallBack(data);
			 },
			 error:function(err){
			 	console.log(JSON.parse(err).msg);
				fcallBack();
			},
		    dataType: 'json'
		});
};


//我的发布列表 3 房屋 2 地产
RealtyApi.prototype.getMyRealtyList=function(callBack,url,type){
	data={};
	if(url===""){
		data.sort__commercial=type;
		url=this.host+this.language+"/apis/realty/realties/mine/";
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

//修改房产
RealtyApi.prototype.editRealty=function(url,data,scallBack,fcallBack){
	$.ajax({
		url:url,
		type:'PUT',
		contentType: "application/json",
		data:JSON.stringify(data),
		headers:{'Authorization':'Token '+this.token},
		success:function(data){
			scallBack(data);
		},
		error:function(){
			fcallBack();
		}
	});
};

//删除房产
RealtyApi.prototype.deleteRealty=function(url,callBack){
	$.ajax({
		url:url,
		type:'DELETE',
		headers:{'Authorization':'Token '+this.token},
		success:function(){
			callBack();
		},
		error:function(){
			mui.toast('删除失败');
			return;
		}
	});
};
