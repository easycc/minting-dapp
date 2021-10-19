import { createContext } from '~/components/CreateContext/CreateContext';
import noop from '~/utils/noop';

let CollectionContext = createContext({
	registrationConfirmed: null,
	setRegistrationConfirmed: noop,
	collectionId: null
});

export default CollectionContext;