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
				pathFinder(that.board, x, y);
				//that.board.setMovementCost(boardPosition.x, boardPosition.y, that.board.getMovementCost(boardPosition.x, boardPosition.y) === 1 ? 0 : 1);
				//renderer.render(that.board);
			});
			
			this.board = boardFactory.create();
			this.board.clear();
			
			renderer.render(this.board);
		}
	};
});