import { createContext } from '~/components/CreateContext/CreateContext';

let FootnotesContext = createContext({
	footnoteContext: {
		index: 0,
		duplicate: false
	}
});

export default FootnotesContext;