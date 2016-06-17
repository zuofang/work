/**
 * 接口函数
 * token 身份认证
 * */
function RealtyApi(token){
	this.token=token||"";
}

//获取验证码
RealtyApi.prototype.getPinCode=function(country,phone,callBack){
	var data={
			"country":country,
			"phone":phone
		};
	$.post("http://139.196.232.30/apis/sms/pin/",data,function(data){
		callBack(data);		
	},'json');
};

//注册
RealtyApi.prototype.register=function(data,callBack){
	$.post("http://139.196.232.30/apis/rest-auth/registration/",data,function(data){
		callBack(data);		
		},'json');
};

//登录
RealtyApi.prototype.login=function(userName,password,callBack){
	$.ajax({
		     type: 'POST',
		     url: 'http://139.196.232.30/apis/rest-auth/login/',
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
RealtyApi.prototype.getRealtyTypeList=function(callBack,isCommercial){
	isCommercial=isCommercial||false;
	$.ajax({
			type:'GET',
			url:'http://139.196.232.30/apis/realty/realty-types/',
			headers:{'Authorization':'Token '+this.token},
			success:function(data){
				var categoryData=[];
				for(var i=0;i<data.length;i++){
					if(data[i].commercial==isCommercial){
						categoryData.push({
							value:data[i].id,
							text:data[i].name
						});
					}	
				}
				callBack(categoryData);
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
			url:'http://139.196.232.30/apis/realty/facility-types/',
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
			url:'http://139.196.232.30/apis/realty/regions/',
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

//上传房产 type:0 房地产 1商业地产
RealtyApi.prototype.uploadRealty=function(data,scallBack,fcallBack,type){
	type=type||0;
	var url=type>0?"http://139.196.232.30/apis/realty/commercial-realties/":"http://139.196.232.30/apis/realty/realties/";
	$.ajax({
		     type: 'POST',
		     contentType: "application/json",
		     url: url ,
		     headers:{'Authorization':'Token '+this.token},
		     data:JSON.stringify(data),
		     success: function(data){
				 scallBack(data);
			 },
			 error:function(){
				fcallBack();
			},
		    dataType: 'json'
		});
};

//上传图片
RealtyApi.prototype.uploadImg=function(url,files,callBack,index){	
			index=index||0;
			var task=plus.uploader.createUpload(url,{
			method:"POST"
			},function(t,status){
				if(status!==201){
					alert("上传失败");
				}
				if(index<files.length-1){
					this.uploadImg(url,files,callBack,++index);
				}else{
					callBack();
				}
			});
			task.setRequestHeader('Authorization','Token '+this.token);
			task.addFile(files[index],{key:"file"});
			task.start();
};

//我的发布列表 1 房屋 2 地产
RealtyApi.prototype.getMyRealtyList=function(callBack,url,type){
	data={};
	if(url===""){
		data.sort__commercial=type;
		url="http://139.196.232.30/apis/realty/realties/mine/";
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
RealtyApi.prototype.updateRealty=function(){
	
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
