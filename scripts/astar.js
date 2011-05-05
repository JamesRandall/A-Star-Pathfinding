define(["jquery", "board", "renderer", "pathFinder"], function($,boardFactory,renderer, pathFinder) {	
	function reset(board, boardType) {
		board.reset(boardType);
		renderer.render(board);
	}
	
	return {
		board: null,
		begin: function() {
			var that = this;
			var canvas = $('#astarCanvas');
			
			$('#resetButton').click(function() {
				reset(that.board, $('#boardType').val());
			});
			
			canvas.click(function(e) {
				var canvasPos = canvas.position();
				var x = e.pageX - canvasPos.left;
				var y = e.pageY - canvasPos.top;
				var boardPosition = renderer.getBoardCoordinates(that.board, x, y);
				that.board.path = pathFinder(that.board, boardPosition.x, boardPosition.y);
				if (that.board.path.length > 0) {
					that.board.player.x = boardPosition.x;
					that.board.player.y = boardPosition.y;
				}
				renderer.render(that.board);
			});
			
			this.board = boardFactory.create();
			this.board.clear();
			
			renderer.render(this.board);
		}
	};
});