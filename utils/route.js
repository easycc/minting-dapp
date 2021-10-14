module.exports.addRouteQuery = function (params) {
	let router = this.$nuxt.$router;
	const { path } = router.currentRoute;
	const { query } = router.currentRoute;

	router.push({ path, query: { ...query, ...params } });
};
module.exports.deleteRouteQuery = function (params) {
	let router = this.$nuxt.$router;
	const { path } = router.currentRoute;
	const { query } = router.currentRoute;

	let newQuery = { ...query };

	for (let param of params) {
		delete newQuery[param];
	}

	router.push({ path, query: newQuery });
};