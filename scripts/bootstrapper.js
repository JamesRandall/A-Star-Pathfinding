require(["jquery",
        "metrics",
		"jsExtensions",
		"astar"], function($, metrics, jsExtensions, astar) {
	if (Modernizr.canvastext)
	{
		jsExtensions();
	
	    $(document).ready(function() {	
			$("#astar").append(
				$('<canvas id="astarCanvas" width="' + $("#astar").width() + '" height="' + $("#astar").height() + '">')
			);
			astar.begin();
	    });
	}
	else
	{
		$("#browserNotSupported").show();
		$("#astar").hide();
	}
});
