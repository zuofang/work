window.realtyApi={
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
		mui.ajax('http://139.196.232.30/apis/realty/realties/',{
			data:data,
			dataType:'json',
			type:'POST',
			timeout:10000,
			headers:{'Authorization':'Token d61cb799e4114300c21aabd4ba346dd2ee98649c'},
			success:function(data){
				callBack(data);
			},
			error:function(){
				mui.toast('服务器繁忙');	
			}
		});
	}
};
