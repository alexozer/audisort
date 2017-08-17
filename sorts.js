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
