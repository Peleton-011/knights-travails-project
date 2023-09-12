export default class Tree {
	get root() {
		return this._root;
	}

	curateArr(arr) {
		if (typeof arr === "string") arr = arr.split(",");
		arr = arr.map((x) => Number(x));
		return arr
			.sort((a, b) => a - b)
			.filter((el, index) => index == arr.indexOf(el));
	}

	buildTree(arr, start, end) {
		if (start > end) return null;

		// console.log(arr, ", ", start, ", ", end);

		const middle = Math.round((start + end) / 2);
		// console.log(middle, ", ", arr[middle]);
		return new Node(
			arr[middle],
			this.buildTree(arr, start, middle - 1),
			this.buildTree(arr, middle + 1, end)
		);
	}

	prettyPrint = (node, prefix = "", isLeft = true) => {
		if (node === null) {
			return;
		}
		if (node.right !== null) {
			this.prettyPrint(
				node.right,
				`${prefix}${isLeft ? "│   " : "    "}`,
				false
			);
		}
		console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
		if (node.left !== null) {
			this.prettyPrint(
				node.left,
				`${prefix}${isLeft ? "    " : "│   "}`,
				true
			);
		}
	};

	insert(value, curr = this._root) {
		let next;
		while (next !== null) {
			if (value > curr.value) next = "right";
			if (value < curr.value) next = "left";
			if (Number(value) === curr.value) return;

			if (curr[next] === null) {
				curr[next] = new Node(Number(value));
				return;
			}
			curr = curr[next];
		}
	}

	delete(value) {
		value = Number(value);
		const curr = this.find(value);
		const parent = this._findParent(value);
		const relation = value > parent.value ? "right" : "left";
		const children = [curr.left, curr.right];

		function getLeftmost(node) {
			let currLeftmost = node;
			while (currLeftmost.left) {
				currLeftmost = currLeftmost.left;
			}
			return currLeftmost;
		}

		// console.log(curr);
		// console.log(children);
		// console.log(children.every((child) => child !== null));

		if (children.every((child) => child !== null)) {
			// console.log(getLeftmost(curr.right));
			const next = getLeftmost(curr.right);
			const newVal = next.value;
			this.delete(newVal);
			curr.value = newVal;

			return;
		}
		//For when the node to be deleted has less than 2 children
		parent[relation] = curr.left === null ? curr.right : curr.left;

		// console.log(parent);
	}

	find(value, curr = this._root) {
		value = Number(value);

		let next;
		while (true) {
			const currVal = Number(curr.value);
			if (value > currVal) next = "right";
			if (value < currVal) next = "left";
			if (value === currVal || curr[next] === null) {
				break;
			}
			curr = curr[next];
		}
		if (Number(value) === Number(curr.value)) return curr;
		// console.log(value, " ", typeof value);
		// console.log(curr.value, " ", typeof curr.value);
		return "not in the tree";
	}

	_findParent(value, curr = this._root) {
		value = Number(value);

		let next;
		while (curr[next] !== null) {
			if (value > curr.value) next = "right";
			if (value < curr.value) next = "left";
			if (Number(value) === curr[next].value) return curr;

			curr = curr[next];
		}
		return "not in the tree";
	}

	//Todo improve queue implementation
	levelOrder(callBack) {
		const queue = [this._root];
		const result = [];

		while (queue.length) {
			const curr = queue[0];
			result.push(curr.value);

			if (curr.left) queue.push(curr.left);
			if (curr.right) queue.push(curr.right);

			queue.shift();
		}

		if (callBack) return result.map(callBack);

		return result;
	}

	recursiveLevelOrder(callBack) {
		const result = [];

		function addToResults(node, level) {
			if (!result[level]) result.push([]);
			result[level].push(node.value);
			if (node.left) addToResults(node.left, level + 1);
			if (node.right) addToResults(node.right, level + 1);
		}

		addToResults(this._root, 0);

		const final = result.flat();

		if (callBack) return final.map(callBack);

		return final;
	}

	inorder(callBack = (a) => a, parent = this._root) {
		function getNodes(node) {
			const res = [];

			if (node.left) res.push(...getNodes(node.left));
			res.push(node);
			if (node.right) res.push(...getNodes(node.right));
			return res;
		}
		const result = getNodes(parent).map((e) => e.value);

		if (callBack) return result.map(callBack);

		return result;
	}

	preorder(callBack = (a) => a, parent = this._root) {
		function getNodes(node) {
			const res = [];

			res.push(node);
			if (node.left) res.push(...getNodes(node.left));
			if (node.right) res.push(...getNodes(node.right));
			return res;
		}
		const result = getNodes(parent).map((e) => e.value);

		if (callBack) return result.map(callBack);

		return result;
	}

	postorder(callBack = (a) => a, parent = this._root) {
		function getNodes(node) {
			const res = [];

			if (node.left) res.push(...getNodes(node.left));
			if (node.right) res.push(...getNodes(node.right));
			res.push(node);
			return res;
		}
		const result = getNodes(parent).map((e) => e.value);

		if (callBack) return result.map(callBack);

		return result;
	}

	height(value) {
		const target = value ? this.find(Number(value)) : this._root;

		function getHeight(node) {
			// console.log(node)
			if (node.left === null && node.right === null) return 0;
			const leftHeight = node.left === null ? 0 : getHeight(node.left);
			const rightHeight = node.right === null ? 0 : getHeight(node.right);

			return Math.max(leftHeight, rightHeight) + 1;
		}

		// console.log(target);

		return getHeight(target);
	}

	isBalanced(parent = this._root) {
		const nodeList = this.inorder(parent).map((val) => this.find(val));
		// console.log(nodeList);

		return nodeList.every((node) => {
			// console.log(node);
			const leftHeight =
				node.left === null ? 0 : this.height(node.left.value);
			const rightHeight =
				node.right === null ? 0 : this.height(node.right.value);
			return Math.abs(leftHeight - rightHeight) < 2;
		});
	}

	rebalance() {
		const dataArr = this.inorder();
		// console.log(dataArr);
		this._root = this.buildTree(dataArr, 0, dataArr.length - 1);
		this.prettyPrint(this._root);
	}

	depth(value, curr = this._root) {
		value = Number(value);

		let depth = 0;

		let next;
		while (curr[next] !== null) {
			if (value > curr.value) next = "right";
			if (value < curr.value) next = "left";
			if (Number(value) === Number(curr.value)) break;
			curr = curr[next];
			depth += 1;
		}
		if (Number(value) === Number(curr.value)) return depth;
		return "not in the tree";
	}

	constructor(dataArr) {
		dataArr = this.curateArr(dataArr);
		this._root = this.buildTree(dataArr, 0, dataArr.length - 1);
		// this.prettyPrint(this._root)
	}
}

class Node {
	/**
	 * @param {any} val
	 */
	set value(val) {
		this._value = val;
	}
	get value() {
		return this._value;
	}

	constructor(val, left, right) {
		this._value = val || null;
		this._right = right || null;
		this._left = left || null;
	}

	/**
	 * @param {Node} right
	 */
	set right(right) {
		this._right = right;
	}
	get right() {
		return this._right;
	}

	/**
	 * @param {Node} left
	 */
	set left(left) {
		this._left = left;
	}
	get left() {
		return this._left;
	}
}
