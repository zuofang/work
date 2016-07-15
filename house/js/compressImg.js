(function($){
	$.compressImg=function(path,maxWidth,maxHeight,quality,callBack){
		var img=new Image();
		img.src=path;
		img.onload=function(){
			var imgWidth,imgHeight;
			var canvas=document.createElement('canvas');
			if(img.width>img.height){
				imgWidth=maxWidth;
				imgHeight=maxHeight*(img.height/img.width);
			}else if(img.width<img.height){
				imgHeight=maxHeight;
				imgWidth=maxWidth*(img.width/img.height);
			}else{
				imgWidth=maxWidth;
				imgHeight=maxHeight;
			}
			canvas.height=imgHeight;
			canvas.width=imgWidth;
			var con=canvas.getContext('2d');
			con.clearRect(0,0,canvas.width,canvas.height);
			con.drawImage(img,0,0,imgWidth,imgHeight);
			var base64=canvas.toDataURL('image/jpeg',quality);
			callBack(base64);
		}
	};
	$.fn.extend({
		compressImgs:function(obj){
			for(var i in obj.images){
				(function(file,maxWidth,maxHeight,quality,obj){
					var img=new Image();
					img.src=file;
					img.onload=function(){
						var imgWidth,imgHeight;
						var canvas=document.createElement('canvas');
						if(img.width>img.height){
							imgWidth=maxWidth;
							imgHeight=maxHeight*(img.height/img.width);
						}else if(img.width<img.height){
							imgHeight=maxHeight;
							imgWidth=maxWidth*(img.width/img.height);
						}else{
							imgWidth=maxWidth;
							imgHeight=maxHeight;
						}
						canvas.height=imgHeight;
						canvas.width=imgWidth;
						var con=canvas.getContext('2d');
						con.clearRect(0,0,canvas.width,canvas.height);
						con.drawImage(img,0,0,imgWidth,imgHeight);
						var i=canvas.toDataURL('image/jpeg',quality);
						obj.append('<li class="photoItem">'+
			    		'<span class="mui-icon mui-icon-close"></span>'+
			    		'<img src="'+i+'" data-preview-src="" data-preview-group="1" alt="" />'+
			    		'</li>');
					}
				}(obj.images[i],obj.maxWidth,obj.maxHeight,obj.quality,$(this)))
			}
		}
	});
})(jQuery)
