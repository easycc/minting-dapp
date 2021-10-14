import noop from '~/utils/noop';
import { createContext } from '~/components/CreateContext/CreateContext';

let StatusContext = createContext({
	onSubmit: noop
});

export default StatusContext;