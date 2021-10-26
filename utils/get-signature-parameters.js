import Web3 from '../services/Web3';

function getSignatureParameters (signature) {
	if (!Web3.utils.isHexStrict(signature)) {
		throw new Error(
			'Given value "'.concat(signature, '" is not a valid hex string.')
		);
	}
	let r = signature.slice(0, 66);
	let s = '0x'.concat(signature.slice(66, 130));
	let v = '0x'.concat(signature.slice(130, 132));

	v = Web3.utils.hexToNumber(v);
	if (![27, 28].includes(v)) v += 27;
	return {
		r,
		s,
		v
	};
}

export default getSignatureParameters;