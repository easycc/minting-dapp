function percentage (partialValue, totalValue) {
	const FULL_PERCENTAGE = 100;

	return parseInt(((FULL_PERCENTAGE * partialValue) / totalValue).toFixed(), 10);
}

export default percentage;