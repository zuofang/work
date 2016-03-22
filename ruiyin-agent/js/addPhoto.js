
      	mui.previewImage();//图片预览
      	// 扩展API加载完毕后调用onPlusReady回调函数 
		document.addEventListener( "plusready", onPlusReady, false );
		// 扩展API加载完毕，现在可以正常调用扩展API 
		function onPlusReady() {
		}	   
      	document.getElementById("add").addEventListener("tap",function(){
      		plus.gallery.pick(function(e){
      			alert("选择成功");
      		},function(e){
      		},{filter:"image"});
      	});