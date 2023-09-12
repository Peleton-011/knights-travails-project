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
		this.nextTiles(this.board[start[0]][start[1]]);
		console.log(V(67108863));
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
		const tileVec = V(tile.x, tile.y);

		console.log(tileVec);
		const results = [];

		const vec = V(1, 2);
		for (let i = 0; i < 4; i++) {
			console.log(vec);
			results.push(V(vec + tileVec));
			vec.switche();
			console.log(vec);
			results.push(V(vec + tileVec));
			vec.toggle();
		}

		console.log(results);
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

function V(x, y) {
	return new Vector(x, y);
}

class Vector {
	constructor(x, y) {
		if (typeof y == "undefined") {
			//if the b value is not passed in, assume a is the hash of a vector
			this.hash = x;
			this.unpack();
		} else {
			//if b value is passed in, assume the x and the y coordinates are the constructors
			this.x = x;
			this.y = y;
			this.pack();
		}
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
		let newVec;
		switch (((this.hash & 33554432) !== 0) * 1 + (this.hash < 0) * 2) {
			case 0:
				newVec = [
					this.hash % 33554432,
					Math.trunc(this.hash / 67108864),
				];
				break;
			case 1:
				newVec = [
					(this.hash % 33554432) - 33554432,
					Math.trunc(this.hash / 67108864) + 1,
				];
				break;
			case 2:
				newVec = [
					(((this.hash + 33554432) % 33554432) + 33554432) % 33554432,
					Math.round(this.hash / 67108864),
				];
				break;
			case 3:
				newVec = [
					this.hash % 33554432,
					Math.trunc(this.hash / 67108864),
				];
				break;
			default:
				break;
		}
		this.x = newVec[0];
		this.y = newVec[1];
		return newVec;
	}

	switche() {
        this.unpack()
		const temp = this.y;
		this.y = this.x;
		this.x = temp;
	}
	toggle() {
        this.unpack()
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
