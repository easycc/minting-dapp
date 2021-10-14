function objectDeepCopy (o) {
	let out, v, key;

	out = Array.isArray(o) ? [] : {};
	for (key in o) {
		v = o[key];
		out[key] = typeof v === 'object' && v !== null ? objectDeepCopy(v) : v;
	}
	return out;
}

export default objectDeepCopy;