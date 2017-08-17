"use strict";

function bubbleSort(list) {
	for(var pass = 0; pass < list.length - 1; pass++) {
		for(var i = 0; i < list.length - pass - 1; i++) {
			if(list[i] > list[i+1]) {
				swap(list, i, i+1);
			}
		}
	}
}

function swap(list, i, j) {
	var temp = list[i];
	list[i] = list[i+1];
	list[i+1] = temp;
}
