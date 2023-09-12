export default class Board {
	board = [];
	constructor(size) {
		for (let i = 0; i < size; i++) {
			const curr = [];
			for (let j = 0; j < size; j++) {
				curr.push(new Tile(i, j));
			}
			this.board.push(curr);
		}
	}
	knightMoves(start, target) {
		console.log(start + " to " + target);
		start = [...start.split(",")];
		target = [...target.split(",")];

		this.board[target[0]][target[1]].distance = 0;

		this.printBoard();
	}

	printBoard(prop = "distance") {
		this.board.forEach((row) => {
			let rowStr = "";
			row.forEach((tile) => {
				rowStr += tile[prop] + " ";
			});
			console.log(rowStr);
		});
	}
}

class Tile {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.distance = null;
		this.predecessor = null;
	}
}

class Queue {
	_queue = [];

	enqueue(obj) {
		this._queue.push(obj);
	}

	dequeue() {
		const temp = this._queue[0];
		this._queue.shift();
		return temp;
	}

	isEmpty() {
		return this._queue.length === 0;
	}
}
