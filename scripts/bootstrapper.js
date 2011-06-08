require(["jquery",
        "metrics",
		"jsExtensions",
		"astar"], function($, metrics, jsExtensions, astar) {
	
	jsExtensions();

    $(document).ready(function() {	
		if (Modernizr.canvastext)
		{
			$("#astar").append(
				$('<canvas id="astarCanvas" width="' + $("#astar").width() + '" height="' + $("#astar").height() + '">')
			);
			astar.begin();
		}
		else
		{
			$("#browserNotSupported").show();
			$("#astar").hide();
		}
    });
});
