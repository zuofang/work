$(function() {
	//已选图片地址
	var imgUrls = [];
	/*产品类型交互*/
	$(".product-style li ").click(function() {
		$(this).addClass("red-bg");
		$(this).siblings().removeClass("red-bg");
	});
	/*推广类型交互*/
	var $imageArray = $(".tt li img");
	$imageArray.each(function(i) {
		$(this).click(function() {
			$imageArray.each(function(i, el) {
				$(el).attr("src", "img/add_product/base-product" + i + ".png");
			});
			$(this).attr("src", "img/add_product/red" + i + ".png");

		});
	});
	//富文本框
	var pdContainer = UE.getEditor('product-detail-container', {
		autoHeightEnabled: false,
		initialFrameHeight: 100
	});
	var psContainer = UE.getEditor('product-sale-container', {
		autoHeightEnabled: false,
		initialFrameHeight: 100
	});
	//  		获取编辑器html内容
	//  		ue.ready(function() {
	//			    var html = ue.getContent();
	//			});
	//			获取保留格式的文本内容
	//  		ue.getPlainTxt();

	//选择图片
	$('.pm-photo-item').on('click', function() {
		var $selected = $(this).children('.pm-photo-item-selected');
		var imgUrl = $(this).children('img').attr('src');
		if ($selected.is(':hidden')) {
			$selected.show();
		} else {
			$selected.hide();
		}
	});
	//取消选择图片
	$('.pm-modal-cancel').on('click',checkSelected);
	$("#pm-selectPhoto-modal").on('hide',checkSelected);
	//检查图片是否被选中
	function checkSelected(){
		$('.pm-photo-item-selected:visible').each(function(){
			var selectedImg = $(this).prev().attr('src');
			if(!($.inArray(selectedImg,imgUrls)>=0)){
				$(this).hide();
			}
		});
	}
	//确认选中图片
	$('.pm-modal-sure').on('click', function() {
		imgUrls=[];
		$('.pm-photo-item-selected:visible').each(function(){
			var selectedImg = $(this).prev().attr('src');
			imgUrls.push(selectedImg);
		})
		$('.pm-photo-container li:gt(0)').remove();
		for (var i = 0; i < imgUrls.length; i++) {
			$('.pm-photo-container').append(
				'<li><img src="' + imgUrls[i] + '" /><span class="pm-photo-close"><i class="Hui-iconfont">&#xe6a6;</i></span></li>');
		}
		$('#pm-selectPhoto-modal').modal('hide');
	});
	//删除选择图片
	$('.pm-photo-container').on('click', '.pm-photo-close', function() {
		var imgUrl = $(this).prev().attr('src');
		imgUrls.splice($.inArray(imgUrl, imgUrls), 1);
		$('.pm-photo-item>img[src="' + imgUrl + '"]').next().hide();
		$(this).parent().remove();
	});
	//修改模态框标题
	$('#pm-selectPhoto-modal').on('shown', function() {
		var totalCount = $('.pm-photo-item').length;
		var selectCount = imgUrls.length;
		$('#pm-modal-summary').html('（已选择' + selectCount + '张，总共' + totalCount + '张）');
	});
});