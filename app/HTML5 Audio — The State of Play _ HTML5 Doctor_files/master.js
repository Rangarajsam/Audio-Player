$(document).ready(function() {
    if ($.browser.msie) {
    	$('pre').each(function () {
    	    if (this.scrollWidth > this.offsetWidth) {
    		    $(this).css({ 'overflow-y' : 'hidden', 'padding-bottom' : '20px' });
    	    }
    	});
    }
    googleSearchHighlight();
		
	var links = $("#glossary li a");
	links.each(function() {
		var linkWidth = $(this).outerWidth();

		var canvas = $("<canvas></canvas>");
		canvas.attr({width: linkWidth, height: 21});
		var context = canvas.get(0).getContext("2d");
		
		// Set up the rounded corners
		context.lineWidth = 6;
		context.lineJoin = "round";
		context.fillStyle = "#0090D2";
		context.strokeStyle = "#0090D2";
		
		// Draw the HTML5 Doctor logo
		context.beginPath();
		context.moveTo(4, 10);
		context.lineTo(8, 4);
		context.lineTo(linkWidth-9, 3);
		context.lineTo(linkWidth-3, 10);
		context.lineTo(linkWidth-10, 18);
		context.lineTo(7, 16);
		context.closePath();
		context.stroke();
		context.fill();
		
		var image = canvas.get(0).toDataURL("image/png");
		$(this).hover(function() {
			$(this).css({background: "url('"+image+"') no-repeat"});
		}, function() {
			$(this).css({background: ""});
		});
	});
	
	/*.mouseover(function() {
		$(this).find("canvas").eq(0).show();
	}).mouseout(function() {
		$(this).find("canvas").eq(0).hide();
	});*/
	
	//tabs
	var tabContainers = $('nav.ui-tabs > div');
	$('nav.ui-tabs ul.ui-tabs-nav a').click(function () {
		tabContainers.hide().filter(this.hash).show();
		$('nav.ui-tabs ul.ui-tabs-nav a').removeClass('selected');
		$(this).addClass('selected');
		return false;
	}).filter(':first').click();	
	
	if ( $("#glossary-list").length ) {
		$(".code").fancybox({
			'padding'			: '20',
			'titlePosition'		: 'inside',
			'transitionIn'		: 'none',
			'transitionOut'		: 'none'
		});
	};

	function linkify(text){
		if (text) {
			text = text.replace(
				/((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi,
				function(url){
					var full_url = url;
					if (!full_url.match('^https?:\/\/')) {
						full_url = 'http://' + full_url;
					}
					return '<a href="' + full_url + '">' + url + '</a>';
				}
			);
		}
		return text;
	}
	
	$('#hashtag p').remove();
	$('#hashtag article').append('<ul></ul>');
	$.ajax({
		dataType: 'json',
		url: 'http://search.twitter.com/search.json?callback=?&q=%23html5&rpp=5',
		success: function (data) {
			$.each(data.results, function(i,tweet){
				var newText = linkify(tweet.text);
				$('#hashtag article ul').append('<li>' + tweet.from_user + ': ' + newText + '</li>');
			});
		}
	});


});