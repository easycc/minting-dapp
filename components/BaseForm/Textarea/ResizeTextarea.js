export default {
	methods: {
		resizeTextarea (event) {
			event.target.style.height = 'initial';
			event.target.style.height = `${event.target.scrollHeight}px`;
		}
	},
	data: () => ({
		interval: null
	}),
	async mounted () {
		await this.$nextTick();
		if (this.$el) this.$el.setAttribute('style', `height:${this.$el.scrollHeight}px; overflow: hidden; `);

		this.$el.addEventListener('input', this.resizeTextarea);

		this.interval = setInterval(() => {
			this.$el.setAttribute('style', `height:${this.$el.scrollHeight}px; overflow: hidden;`);
		}, 300);
	},

	beforeDestroy () {
		this.$el.removeEventListener('input', this.resizeTextarea);
		clearInterval(this.interval);
	},
	render () {
		return this.$slots ? this.$slots.default[0] : '';
	}
};