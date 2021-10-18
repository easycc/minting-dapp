<template>
	<section v-if="collections.length">
		<LinkCard
			v-for="(collection, collectionIndex) in collections"
			:key="collection.contractAddress + collectionIndex"
			class="collection-card"
			:title="collection.id"
			:link="localePath(`/admin/collection?collectionId=${collection.id}`)"
			:showArrow="true"
		/>

		<Button
			class="add-collection"
			:link="localePath('/admin/create-collection')"
			kind="complimentary"
			title="Add collection"
		/>
	</section>
</template>

<script>
import { LinkCard } from '~/components/cards';
import { Button } from '~/components/buttons';

export default {
	components: {
		LinkCard,
		Button
	},

	data () {
		return {
			collections: []
		};
	},

	mounted () {
		this.getCollections();
	},

	methods: {
		async getCollections () {
			let collectionsSnap = await this.$fire.firestore
				.collection('collections')
				.get();

			let collections = collectionsSnap.docs.map(collection => ({ ...collection.data(), id: collection.id }));

			this.collections = collections;
		}
	}
};
</script>


<style scoped>
.collection-card {
	position: relative;
	width: auto;
	padding: 1.5em 2.5em 1.5em 1em;
	margin-right: 1em;
	margin-bottom: 1em;
	font-size: 1.2em;
	border-radius: 0.75em;
	display: inline-block;
	vertical-align: baseline;
}
</style>