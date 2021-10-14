<script>
import { Fragment } from 'vue-fragment';

export default {
	name: 'Fragment',
	functional: true,
	render (createElement, context) {
		let { children } = context;
		let containsSingleChildren = children.length === 1;

		return containsSingleChildren ?
			children[0] :
			createElement(Fragment, {}, children);
	}
};
</script>