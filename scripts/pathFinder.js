define(["cellList", "cell"], function(createCellList, createCell) {
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
						adjacentCell = createCell(adjacentX, adjacentY, cell, adjacentMovementCost, adjacentHCost);
						openList.add(adjacentCell);
					}
				}
			}
		}
	}
	
	return function(board, targetX, targetY) {
		var openList = createCellList();
		var closedList = createCellList();
		var targetCell = null;
		var cell;
		var result = [];
		
		// if the requested movement ends on an impassable square then just return now
		if (board.getMovementCost(targetX, targetY) === board.movementCosts.impassable) {
			return result;
		}
		
		openList.add(createCell(board.player.x, board.player.y, null, 0, 0));
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