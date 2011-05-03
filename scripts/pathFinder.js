define(function() {
	// Used to calculare the hCost (sometimes known as the heuristic cost as its a guess) between two co-ordinates
	function manhattanCost(fromX, fromY, toX, toY) {
		return Math.abs(toX - fromX) + Math.abs(toY - fromY);
	}
	
	var Cell = function(x, y, gCost, hCost) {
		this.x = x;
		this.y = y;
		this.gCost = gCost;
		this.hCost = hCost;
	};
	
	return function(board, targetX, targetY) {
		var openList = [];
		openList.push(new Cell(player.x, player.y, 0, 0));
	};
})