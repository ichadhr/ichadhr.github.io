(function ($) {
	'use strict';

	$.fn.grid = function() {
		var $grid = this;
		var $projects = this.find('.project');
		var open = false;
		var currentRow = 0;
		var projectsPerRow = 0;

		this.setGridWidth = function(n) {
			$grid.width(n * 300);
		}

		this.countProjectsPerRow = function() {
			var width = $grid.width();
			projectsPerRow = Math.floor(width / 300);
		}

		this.openPreview = function() {
			$grid.$name = $('<h2 class="project-name"></h2>');
			$grid.$description = $('<p class="project-description"></p>');
			$grid.$link = $('<p class="project-link"><a href="#">Visit website &rarr;</a></p>');
			$grid.$close = $('<div id="close">&times;</div>');
			$grid.$arrow = $('<div id="arrow"></div>');
			$grid.$preview = $('<div id="preview"></div>').append($grid.$name, $grid.$description, $grid.$link, $grid.$close);
			$grid.append($grid.$arrow);
			$grid.$close.click( function() {
				$grid.$preview.animate({
					height: 0
				}, 250, 'easeOutExpo', function() {
					$grid.closePreview();
				});
				return false;
			});
		}

		this.positionPreview = function(index, row) {
			if (index == 9) {
				$grid.append($grid.$preview);
			} else {
				$projects.eq(row  * projectsPerRow - 1).after($grid.$preview);
			}
		}

		this.slideDownPreview = function(row, column) {
			var currentHeight = $grid.$preview.height();
			var autoHeight = $grid.$preview.css('height', 'auto').height();
			$grid.$preview.height(currentHeight).animate({
				height: autoHeight
			}, 250, 'easeOutExpo');
			$grid.$arrow.show().css('top', row * 300 - 40).css('left', column * 300 - 170);
		}

		this.scrollToPreview = function() {
			$('html, body').animate({
				scrollTop: $grid.$preview.offset().top - 300
			}, 250, 'easeOutExpo');
		}

		this.updatePreview = function(index, row, column, url, name, description, background, color1, color2) {
			var rgba = 'rgba(' + parseInt(color2.toString().slice(-6, -4), 16) + ', ' + parseInt(color2.toString().slice(-4, -2), 16) + ', ' + parseInt(color2.toString().slice(-2), 16) +', 0.29)';
			console.log(rgba);
			$grid.$preview.css('background', '#' + background);
			$grid.$preview.css('color', '#' + color1);
			$grid.$name.text(name);
			$grid.$description.css('color', '#' + color2).text(description);
			$grid.$link.find('a').css('border-color', rgba).css('color', '#' + color1).attr('href', url);
			$grid.$arrow.css('border-bottom-color', '#' + background);
			if (!open) {
				$grid.positionPreview(index, row);
				$grid.slideDownPreview(row, column);
				$grid.scrollToPreview();
				open = true;
			} else if (currentRow != row){
				$grid.$arrow.hide();
				$grid.$preview.animate({
					height: 0
				}, 250, 'easeOutExpo', function() {
					$grid.positionPreview(index, row);
					$grid.slideDownPreview(row, column);
					$grid.scrollToPreview();
				});
			} else {
				$grid.slideDownPreview(row, column);
			}
			$grid.$link.find('a').hover( function() {
				$(this).css('border-color', '#' + color2);
			}, function() {
				$(this).css('border-color', rgba);
			});
			currentRow = row;
		}

		this.closePreview = function() {
			$grid.$preview.remove();
			$grid.$arrow.remove();
			open = false;
			currentRow = 0;
		}

		this.countProjectsPerRow();
		this.setGridWidth(projectsPerRow);

		$projects.click( function() {
			var index = $projects.index(this);
			var row = Math.floor(index / projectsPerRow) + 1;
			var column = Math.ceil(index % projectsPerRow) + 1;
			var url = $(this).attr('href');
			var name = $(this).data('name');
			var description = $(this).data('description');
			var background = $(this).data('background');
			var color1 = $(this).data('color1');
			var color2 = $(this).data('color2');
			if (!open) {
				$grid.openPreview(row);
			}
			$grid.updatePreview(index, row, column, url, name, description, background, color1, color2);
			return false;
		});

		return this;
	};
})(jQuery);