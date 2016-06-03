$('[name="nice-select"]').click(function(e) {
				$('[name="nice-select"]').find('ul').hide();
				$(this).find('ul').show();
				e.stopPropagation();
			});
			$('[name="nice-select"] li').hover(function(e) {
				$(this).toggleClass('on');
				e.stopPropagation();
			});
			$('[name="nice-select"] li').click(function(e) {
				var val = $(this).text();
				$(this).parents('[name="nice-select"]').find('input').val(val);
				$('[name="nice-select"] ul').hide();
				e.stopPropagation();
			});
			$(document).click(function() {
				$('[name="nice-select"] ul').hide();
			});
			
			 mui('.mui-table-view').on('tap', 'a', function() {
				var id = this.getAttribute("href");		
				var href = this.href;
				mui.openWindow({
						id: id,
						url: href
					});
					});