import WithNativeValidation from '../WithNativeValidation';

export default function (Component) {
	return {
		name: `${Component.name}${WithNativeValidation.name}`,
		functional: true,
		render (createElement, context) {
			return createElement(WithNativeValidation, context.data, [
				createElement(Component, {}, context.children)
			]);
		}
	};
}