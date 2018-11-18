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
				/*output += '<div class="col-sm-6 col-md-4' + visibleSm + '">';
				output += '<div class="blog-post"><header>'; */
				output += '<div class="medium-post ' + visibleSm + '">';
				/*output += '<p class="date">' + $.format.date(item.pubDate, "dd<br>MMM") + "</p>"; */
				var tagIndex = item.description.indexOf('<img'); // Find where the img tag starts
				var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex; // Find where the src attribute starts
				var srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
				var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
				var src = item.description.substring(srcStart, srcEnd); // Extract just the URL
				output += '<div class="post-image"><a href="'+ item.link + '"><img class="img-responsive" src="' + src + '" width="360px" height="240px" /></a></div>';
				output += '<div class="post-content"><h3><a href="'+ item.link + '">' + item.title + '</a></h3>';
/*				output += '<div class="post-meta"><span>By ' + item.author + '</span></div>'; */
				var yourString = item.description.replace(/<img[^>]*>/g,""); //replace with your string.
				var maxLength = 240 // maximum number of characters to extract
				//trim the string to the maximum length
				var trimmedString = yourString.substr(0, maxLength);
				//re-trim if we are in the middle of a word
				trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
				output += '<p>' + trimmedString + '...</p>';
				output += '<a class="btn readmore" href="'+ item.link + '" class="btn">Lire la suite</a>';
				output += '</div></div><div><!-- COMING SOON <span class="social-share">';
		    output += '<a href="https://www.facebook.com/sharer/sharer.php?u=' + item.link + '" title="Partager sur Facebook" class="tag"><span class="term"><i class="fa fa-facebook-square"></i> Partager</span></a>';
		    output += '<a href="https://twitter.com/intent/tweet?text=' + item.link + '" title="Partager sur Twitter" class="tag"><span class="term"><i class="fa fa-twitter-square"></i> Tweet</span></a>';
		    output += '<a href="https://plus.google.com/share?url=' + item.link + '" title="Partager sur Google+" class="tag"><span class="term"><i class="fa fa-google-plus-square"></i> +1</span></a>';
		    output += '</span>--></div>';
				output += '</div><div style="clear:both"></div>';
				return k < 3;
			});
			$content.html(output);
		}
	});
});