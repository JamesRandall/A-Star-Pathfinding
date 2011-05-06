define(function() {
	var CellList = function() {
		this.contents = [];
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
			var currentCell;
			var index;
			var result = false;
			for(index = 0; index < this.contents.length; index++) {
				currentCell = this.contents[index];
				if (currentCell.x === x && currentCell.y === y) {
					result = true;
					break;
				}
			}
			return result;
		};
		this.getCell = function(x, y) {
			var currentCell;
			var index;
			var result;
			
			result = null;
			
			for(index = 0; index < this.contents.length; index++) {
				currentCell = this.contents[index];
				if (currentCell.x === x && currentCell.y === y) {
					result = currentCell;
					break;
				}
			}
			return result;
		};
		this.add = function(cell) {
			this.contents.push(cell);
		};
		this.remove = function(cell) {
			var index = this.contents.indexOf(cell);
			this.contents.remove(index);
		};
		this.length = function() { return this.contents.length; };
	};
	
	return function() { return new CellList(); };
});