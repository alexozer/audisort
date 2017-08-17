function Graph(canvas, length, defaultColor, width, height) {
	this.canvas = canvas !== undefined ? canvas : document.getElementById("canvas");
	this.context = canvas.getContext("2d");

	this.defaultColor = defaultColor !== undefined ? defaultColor : "black";
	this.highlightColor = "red";
	this.width = width !== undefined ? width : window.innerWidth;
	this.height = height !== undefined ? height : window.innerHeight;
	this.applySettings();

	var max = 100000;
	this.list = this.genList(0, max, length);

	this.mark = -1;

	this.iters = 40;
}

Graph.prototype = {
	constructor: Graph,

	applySettings: function() {
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.context.strokeStyle = this.defaultColor;
	},

	draw: function() {
		this.context.clearRect(0, 0, canvas.width, canvas.height);
		this.context.beginPath();

		var width = this.canvas.width / this.list.length;
		this.context.lineWidth = width;

		var scale = this.canvas.height / this.listMax().value;

		for(var i = 0; i < this.list.length; i++) {
			var x = i * width + width / 2;
			var y = this.list[i] * scale;

			if(i === this.mark) {
				this._highlightBar(x, this.canvas.height, this.canvas.height - y);
				continue;
			}

			this.context.moveTo(x, this.canvas.height - y);
			this.context.lineTo(x, this.canvas.height);
		}

		this.context.closePath();
		this.context.stroke();
	},

	_highlightBar: function(x, startY, endY) {
		var context = this.context;

		context.closePath();
		context.stroke();

		var origColor = context.strokeColor;
		context.strokeStyle = this.highlightColor;

		context.beginPath();
		context.moveTo(x, startY);
		context.lineTo(x, endY);
		context.closePath();
		context.stroke();

		context.strokeStyle = this.defaultColor;
		context.beginPath();
	},

	genList: function(min, max, length) {
		var list = [];
		var range = max - min;

		for(var i = 0; i < length; i++) {
			list.push(Math.floor(Math.random() * range) + min);
		}

		return list;
	},

	listMax: function() {
		var max = {
			index: 0,
			value: -Infinity
		};

		for(var i = 0; i < this.list.length; i++) {
			if(this.list[i] > max.value) {
				max.index = i;
				max.value = this.list[i];
			}
		}

		return max;
	},
	
	sort: function(sortFunc, state) {
		if(state === undefined) state = {};

		var doneSorting = false;
		for(var i = 0; i < this.iters; i++) {
			if(!sortFunc(this, state)) {
				doneSorting = true;
				break;
			}
		}

		this.draw();

		if(doneSorting) return;
		requestAnimationFrame(function() {
			this.sort(sortFunc, state);
		}.bind(this));
	}
};

module.exports = Graph;
