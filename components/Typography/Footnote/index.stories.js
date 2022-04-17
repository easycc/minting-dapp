import Footnote from './Footnote';
import FootnotesContainer from './FootnotesContainer';
import Footnotes from './Footnotes';

export default {
	title: 'Footnote',
	Component: Footnote
};

export const BaseFootnote = () => ({
	components: {
		Footnote,
		Footnotes,
		FootnotesContainer
	},
	template: `
		<FootnotesContainer>
			Сноска<Footnote>Сноска на 1</Footnote>
			Сноска<Footnote>Сноска на 2</Footnote>

			Сноска<Footnote>Одинковая сноска</Footnote>
			Сноска<Footnote>Одинковая сноска</Footnote>

			<Footnotes/>
		</FootnotesContainer>`
});