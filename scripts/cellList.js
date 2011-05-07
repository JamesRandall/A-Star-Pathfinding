define(["metrics"], function(metrics) {
	var CellList = function() {
		var x;
		var y;
		var contentsBoard = [];
		var row;
		
		for (y=0; y < metrics.boardHeight; y++) {
			row = [];
			for (x=0; x < metrics.boardWidth; x++) {
				row.push(null);
			}
			contentsBoard.push(row);
		}
		
		this.contents = [];
		this.contentsBoard = contentsBoard;
		
		this.lowestCost = function() { 
			var lowestCostCell = null;
			var currentCell;
			var index;
			for(index = 0; index < this.contents.length; index++) {
				currentCell = this.contents[index];
				if (lowestCostCell === null || currentCell.fCost() < lowestCostCell.fCost()) {
					lowestCostCell = currentCell;
				}
			}
			return lowestCostCell;
		};
		this.containsCell = function(x, y) {
			return contentsBoard[y][x] !== null;
		};
		this.getCell = function(x, y) {
			return contentsBoard[y][x];
		};
		this.add = function(cell) {
			this.contents.push(cell);
			contentsBoard[cell.y][cell.x] = cell;
		};
		this.remove = function(cell) {
			var index = this.contents.indexOf(cell);
			contentsBoard[cell.y][cell.x] = null;
			this.contents.remove(index);
		};
		this.length = function() { return this.contents.length; };
	};
	
	return function() { return new CellList(); };
});