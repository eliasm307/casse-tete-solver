
/** Converts arguments into a tuple */
function tuple<Args extends any[]>( ...args: Args ): Args {
	return args;
}
