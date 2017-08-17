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
