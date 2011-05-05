define(function() {
	var adjacentCellOffsets = [
	    // horizontal and vertical - examining these first leads to more natural paths
		{ x: -1, y: 0 },
		{ x: 0, y: -1 },
		{ x: 1, y: 0 },
		{ x: 0, y: 1 },
		// diagonals
		{ x: -1, y: -1 },
		{ x: 1, y: -1 },
		{ x: 1, y: 1 },
		{ x: -1, y: 1}
	];
		
	// Used to calculare the hCost (sometimes known as the heuristic cost as its a guess) between two co-ordinates
	function manhattanCost(fromX, fromY, toX, toY) {
		return Math.abs(toX - fromX) + Math.abs(toY - fromY);
	}
	
	function processAdjacentCells(board, cell, openList, closedList, targetX, targetY) {
		var offset;
		var adjacentX;
		var adjacentY;
		var adjacentHCost;
		var adjacentCell;
		var newAdjacentGCost;
		var index;
		
		for (index=0; index < adjacentCellOffsets.length; index++) {
			offset = adjacentCellOffsets[index];
			adjacentX = cell.x + offset.x;
			adjacentY = cell.y + offset.y;
			
			if (adjacentX >= 0 && adjacentY >= 0 && adjacentX < board.width && adjacentY < board.height) {
				adjacentMovementCost = board.getMovementCost(adjacentX, adjacentY);
				if (adjacentMovementCost !== board.movementCosts.impassable && !closedList.containsCell(adjacentX, adjacentY)) {
					adjacentCell = openList.getCell(adjacentX, adjacentY);
					if (adjacentCell !== null) {
						newAdjacentGCost = cell.gCost + adjacentMovementCost;
						if (newAdjacentGCost < adjacentCell.gCost) {
							adjacentCell.gCost = newAdjacentGCost;
							adjacentCell.parentCell = cell;
						}
					}
					else {
						adjacentHCost = manhattanCost(board.player.x, board.player.y, targetX, targetY);
						adjacentCell = new Cell(adjacentX, adjacentY, cell, adjacentMovementCost, adjacentHCost);
						openList.add(adjacentCell);
					}
				}
			}
		}
	}
	
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
	
	return function(board, targetX, targetY) {
		var openList = new CellList();
		var closedList = new CellList();
		var targetCell = null;
		var cell;
		var result = [];
		
		// if the requested movement ends on an impassable square then just return now
		if (board.getMovementCost(targetX, targetY) === board.movementCosts.impassable) {
			return result;
		}
		
		openList.add(new Cell(board.player.x, board.player.y, null, 0, 0));
		while(openList.length() > 0 && targetCell === null)
		{
			cell = openList.lowestCost();
			openList.remove(cell);
			closedList.add(cell);
			
			if (cell.x === targetX && cell.y === targetY) {
				targetCell = cell;
			}
			else {
				processAdjacentCells(board, cell, openList, closedList, targetX, targetY);
			}
		}
		
		if (targetCell !== null) {
			cell = targetCell;
			while (cell !== null) {
				result.push(cell);
				cell = cell.parentCell;
			}
		}
		
		return result;
	};
});