const getNextWave = async function (participators, offset, limit) {
	let total = participators.length;
	let last = total - offset <= limit;
	let newOffset;
	let newWave = participators;

	if (last) {
		newWave = participators.slice(offset, total);

		return {
			newOffset: total,
			newWave,
			isLastWave: true
		};
	}

	newWave = participators.slice(offset, offset + limit);

	newOffset = offset + limit;

	return {
		newOffset,
		newWave,
		isLastWave: false
	};
};

module.exports = {
	getNextWave
};