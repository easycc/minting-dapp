const objectMerge = (obj1, obj2) => {
	// Variables
	let target = {};
	let deep = false;

	deep = true;

	// Merge the object into the target object
	let merger = obj => {
		for (let prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
					// If we're doing a deep merge and the property is an object
					target[prop] = objectMerge(target[prop], obj[prop]);
				}
				else {
					// Otherwise, do a regular merge
					target[prop] = obj[prop];
				}
			}
		}
	};

	merger(obj1);
	merger(obj2);

	return target;
};

export default objectMerge;