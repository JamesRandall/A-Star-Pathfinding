define(function() {
	var Cell = function(x, y, parentCell, movementCost, hCost) {		
		this.x = x;
		this.y = y;
		this.parentCell = parentCell;
		this.gCost = parentCell !== null ? parentCell.gCost + movementCost : movementCost;
		this.hCost = hCost;
		this.fCost = function() {
			return this.gCost + this.hCost;
		};
	};
	
	return function(x, y, parentCell, movementCost, hCost) { return new Cell(x, y, parentCell, movementCost, hCost); }
});