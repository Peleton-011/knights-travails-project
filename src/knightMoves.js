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
		const sum = new Vector(1, 2) - new Vector(2, 5);
		console.log(sum);
		console.log(new Vector(sum));
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

	nextTiles(tile) {
		const x = tile.x;
		const y = tile.y;

		const results = [];

		const vec = new Vector();
		for (let i = 0; i < 8; i++) {
			console.log(vec);
			vec.switche();
		}
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

class Vector {
	constructor(x, y) {
		console.log(x, " ", y);
		if (typeof y == "undefined") {
			console.log("calcoleting");
			//if the b value is not passed in, assume a is the hash of a vector
			this.y = x % 67108864;
			this.x = (x - this.y) / 67108864;
		} else {
			//if b value is passed in, assume the x and the y coordinates are the constructors
			this.x = x;
			this.y = y;
		}
		this.hash;
	}

	valueOf() {
		this.pack();
		return this.hash;
	}

	pack() {
		this.hash =
			this.y * 67108864 + (this.x < 0 ? 33554432 | this.x : this.x);
	}

	unpack() {
		switch (((this.hash & 33554432) !== 0) * 1 + (this.hash < 0) * 2) {
			case 0:
				return [this.hash % 33554432, Math.trunc(this.hash / 67108864)];
				break;
			case 1:
				return [
					(this.hash % 33554432) - 33554432,
					Math.trunc(this.hash / 67108864) + 1,
				];
				break;
			case 2:
				return [
					(((this.hash + 33554432) % 33554432) + 33554432) % 33554432,
					Math.round(this.hash / 67108864),
				];
				break;
			case 3:
				return [this.hash % 33554432, Math.trunc(this.hash / 67108864)];
				break;
		}
	}

	switche() {
		const temp = this.y;
		this.y = this.x;
		this.x = temp;
	}
	toggle() {
		this.y = -this.y;
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
