$(function () {
	var $content = $('#jsonContent');
	var data = {
		rss_url: 'https://www.medium.com/feed/@stephanemanet'
	};
	$.get('https://api.rss2json.com/v1/api.json', data, function (response) {
		if (response.status == 'ok') {
			var output = '';
			$.each(response.items, function (k, item) {
				var visibleSm;
				if(k < 3){
					visibleSm = '';
				 } else {
					 visibleSm = ' visible-sm';
				 }
				output += '<div class="medium-post ' + visibleSm + '"><a class="post-box" href="'+ item.link + '">';
				var tagIndex = item.description.indexOf('<img'); // Find where the img tag starts
				var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex; // Find where the src attribute starts
				var srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
				var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
				var src = item.description.substring(srcStart, srcEnd); // Extract just the URL
				output += '<div class="post-image"><img class="img-responsive" src="' + src + '" width="360px" height="240px" /></div>';
				output += '<div class="post-caption"><div class="post-content"><h3 class="post-h3">' + item.title + '</h3>';
				var yourString = item.description.replace(/<img[^>]*>/g,""); //replace with your string.
		    output += '</div></div>';
				output += '</div>';
				return k < 3;
			});

			$content.html(output);
		}
	});
});
