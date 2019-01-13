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
				output += '<div class="medium-post">';
				var tagIndex = item.description.indexOf('<img'); // Find where the img tag starts
				var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex; // Find where the src attribute starts
				var srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
				var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
				var src = item.description.substring(srcStart, srcEnd); // Extract just the URL
				var yourString = item.description.replace(/<img[^>]*>/g,""); //replace with your string.
				var maxLength = 1200 // maximum number of characters to extract
				//trim the string to the maximum length
				var trimmedString = yourString.substr(0, maxLength);
				//re-trim if we are in the middle of a word
				trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
				output += '<h2 href="'+ item.link +'">' + item.title + '</h2>';
				output += '<img class="img-responsive" src="' + src + '" alt="' + item.title + '" />';
				output += '<div class="post-details"><span class="post-date">' + item.pubDate + "</span>";
				output += '<span class="social-share"><a href="https://www.facebook.com/sharer/sharer.php?u='+ item.link +'" title="Partager sur Facebook" target="_blank" class="tag"><span class="term"><i class="fab fa-facebook-square"></i> Partager</span></a><a href="https://twitter.com/intent/tweet?text=' + item.title + ' par @stephanemanet '+ item.link +'" title="Partager sur Twitter" target="_blank" class="tag"><span class="term"><i class="fab fa-twitter-square"></i> Tweeter</span> </a><a href="https://www.linkedin.com/sharing/share-offsite/?url='+ item.link +'" title="Partager sur LinkedIn+" target="_blank" class="tag"><span class="term"><i class="fab fa-linkedin"></i> Partager</span> </a></span></div>';
				output += '<p>' + trimmedString + '...</p>';
				output += '<a href="'+ item.link +'" class="btn">Lire la suite</a></div>';
				return k < 3;
			});

			$content.html(output);
		}
	});
});
