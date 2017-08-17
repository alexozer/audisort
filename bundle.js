(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/alex/code/js/audisort/graph.js":[function(require,module,exports){
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

},{}],"/home/alex/code/js/audisort/main.js":[function(require,module,exports){
"use strict";

var Graph = require("./graph");
var graph = new Graph(document.getElementById("canvas"), 300, "lightblue");

function resizeGraphCallback() {
	graph.width = window.innerWidth;
	graph.height = window.innerHeight;
	graph.applySettings();
	graph.draw();
}
window.addEventListener("resize", resizeGraphCallback);

graph.draw();

var sorts = require("./sorts");

graph.sort(sorts.bubble);
graph.genList();
graph.draw();

},{"./graph":"/home/alex/code/js/audisort/graph.js","./sorts":"/home/alex/code/js/audisort/sorts.js"}],"/home/alex/code/js/audisort/sorts.js":[function(require,module,exports){
module.exports.bubble = function(graph, state) {
	state.pass = state.pass !== undefined ? state.pass : 0;
	state.i = state.i !== undefined ? state.i : 0;

	graph.mark = state.i;

	if(graph.list[state.i] > graph.list[state.i+1]) {
		var temp = graph.list[state.i];
		graph.list[state.i] = graph.list[state.i+1];
		graph.list[state.i+1] = temp;
	}

	state.i++;
	if(state.i >= graph.list.length - state.pass) {
		state.i = 0;

		state.pass++;
		if(state.pass >= graph.list.length - 1) {
			return false;
		}
	}

	return true;
};

},{}]},{},["/home/alex/code/js/audisort/main.js"]);
