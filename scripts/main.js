$(function() {
    var jumping = false;

	$('nav a:not([data-bypass])').on('click', function(e) {
		e.preventDefault();

		currentPost = $(this).closest('li').index();
		highlightPost( currentPost );

		var targetPos = $('a[name=' + $(this).attr('href').substring(1) + ']').closest('section').offset().top - 60;
		jumping = true;
		$('body, html').animate({
			scrollTop: targetPos
		}, function() {
			jumping = false;
		});

		return false;
	});

	// Scroll post highlighting
	if ( window.location.hash ) {
		currentPost = $('a[name=' + window.location.hash.substring(1) + ']').closest('section').index() - 1;
	} else {
		currentPost = 0;
	}
	highlightPost( currentPost );

	$(window).scroll( function() {
        var scrollDist = $(window).scrollTop();
		if ( !jumping ) {
			if ( currentPost < $('section').length - 1) {
				if ( scrollDist - $('section').eq(currentPost + 1).offset().top > -100) {
					currentPost++;
				}
			}
			if ( scrollDist - $('section').eq(currentPost).offset().top < -100 && currentPost > 0 ) {
				currentPost--;
			}
			highlightPost( currentPost );
		}
	});
});

function highlightPost( postIndex ) {
	$('nav li').removeClass('selected');
	$('nav li').eq( postIndex ).addClass('selected');
}
