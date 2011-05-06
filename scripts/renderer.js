define(["jquery"], function($) {	
	function getCanvas() { return $("#astarCanvas")[0]; }
	
	function getContext() { return getCanvas().getContext("2d"); }
	
	function boardMetrics(board) {
		var canvas = getCanvas();
		return {
			width: canvas.width,
			height: canvas.height,
			cellWidth: canvas.width / board.width,
			cellHeight: canvas.height / board.height,
			cellRadius: canvas.width < canvas.height ? canvas.width/board.width/2 : canvas.height/board.height/2,
			boardWidth: board.width,
			boardHeight: board.height
		};
	}
	
	function drawGrid(context, boardMetrics) {
		var columnIndex;
		var rowIndex;
		
		context.strokeStyle="rgba(228,228,228,1.0)";
		for (rowIndex = 1; rowIndex < boardMetrics.boardHeight; rowIndex++) {
			context.moveTo(0, rowIndex * boardMetrics.cellHeight + 0.5);
			context.lineTo(boardMetrics.width, rowIndex * boardMetrics.cellHeight + 0.5);
		}
		
		for (columnIndex = 1; columnIndex < boardMetrics.boardWidth; columnIndex++) {
			context.moveTo(columnIndex * boardMetrics.cellWidth + 0.5, 0);
			context.lineTo(columnIndex * boardMetrics.cellWidth + 0.5, boardMetrics.height);
		}
		context.stroke();
	}
	
	function drawCell(context, columnIndex, rowIndex, boardMetrics) {
		var left;
		var top;
		
		left = columnIndex * boardMetrics.cellWidth + 0.5;
		top = rowIndex * boardMetrics.cellHeight + 0.5;
		
		context.fillRect(left, top, boardMetrics.cellWidth, boardMetrics.cellHeight);
	}
	
	function drawPlayer(context, columnIndex, rowIndex, boardMetrics) {
		var centerX;
		var centerY;
		
		centerX = columnIndex * boardMetrics.cellWidth + 0.5 + boardMetrics.cellWidth/2;
		centerY = rowIndex * boardMetrics.cellHeight + 0.5 + boardMetrics.cellHeight/2;
		
		context.beginPath();
		context.arc(
			centerX,
			centerY,
			boardMetrics.cellRadius,
			0,
			2 * Math.PI,
			true);
		context.fill();
	}
	
	return {
		getBoardCoordinates: function(board, canvasX, canvasY) {
			var metrics;
			
			metrics = boardMetrics(board);
			return {
				x: Math.floor(canvasX/metrics.cellWidth),
				y: Math.floor(canvasY/metrics.cellHeight)
			};
		},
		
		render: function(board) {
			var context;
			var columnIndex;
			var rowIndex;
			var metrics;
			var movementCost;
			var pathIndex;
			var pathCell;
			
			metrics = boardMetrics(board);
			context = getContext();
			
			context.clearRect(0, 0, metrics.width, metrics.height);
			
			context.fillStyle = "rgba(38,104,209,1.0)";
			for (rowIndex = 0; rowIndex < board.height; rowIndex++) {
				for (columnIndex = 0; columnIndex < board.width; columnIndex++) {
					movementCost = board.getMovementCost(columnIndex, rowIndex);
					if (movementCost !== board.movementCosts.empty) {
						drawCell(context, columnIndex, rowIndex, metrics);
					}
				}
			}
			
			context.fillStyle = "rgba(0,192,0,1.0)";
			for(pathIndex = 0; pathIndex < board.path.length; pathIndex++) {
				pathCell = board.path[pathIndex];
				drawCell(context, pathCell.x, pathCell.y, metrics);
			}
			
			context.fillStyle = "rgba(219,44,38,1.0)";
			drawPlayer(context, board.player.x, board.player.y, metrics);
			drawGrid(context, metrics);
		}
	};	
});