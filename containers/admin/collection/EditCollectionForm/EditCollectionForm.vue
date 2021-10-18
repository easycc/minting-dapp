<template>
	<section class="edit-collection-section">
		<FormSubmit successMessage="Colelction was saved!">
			<BaseForm @submit="formSubmit">
				<Input
					v-if="createNewCollection"
					v-model.trim="newCollectionId"
					:maxLength="50"
					labelText="ID"
					smallLabelText="(will be shown in the collection link)"
					placeholder="Example: new-collection-id"
					name="collectionId"
					required
				/>

				<Input
					v-model.trim="editedCollection.contractAddress"
					:maxLength="100"
					labelText="Contract id"
					placeholder="0x9f847D31564FA90020d78eC8C554124beBC73927"
					name="contractAddress"
					required
				/>

				<Textarea
					v-model.trim="editedCollection.abi"
					:maxLength="100000"
					labelText="Abi"
					placeholder="abi"
					name="abi"
					required
				/>

				<SubmitButton title="Save collection" />
			</BaseForm>
		</FormSubmit>
	</section>
</template>

<script>
import {
	FormSubmit,
	BaseForm,
	Input,
	Textarea,
	SubmitButton
} from '~/components/BaseForm';

export default {
	components: {
		FormSubmit,
		Textarea,
		BaseForm,

		SubmitButton,
		Input
	},

	props: {
		collection: {
			type: Object,
			default: () => {}
		},

		createNewCollection: {
			type: Boolean,
			default: false
		},

		collectionId: {
			type: String,
			default: ''
		}
	},

	computed: {
		editedCollection: {
			get () {
				return this.collection;
			},

			set (value) {
				this.$emit('update:collection', value);
			}
		}
	},

	methods: {
		async formSubmit () {
			let isConfirmed = window.confirm('Are you sure you want to save collection?');

			if (!isConfirmed) return Promise.reject();

			const { createNewCollection } = this;

			if (createNewCollection) {
				return this.submitNewCollection();
			}

			return this.updateCurrentCollection();
		},

		async submitNewQuiz () {
			// const { quiz } = this;
			// const NEW_QUIZ_VERSION = '0';

			// const { newQuizId } = this;
			// let newQuiz = this.$fire.firestore
			// 	.collection('quizzes')
			// 	.doc(newQuizId);

			// newQuiz.set({ createdAt: new Date() });

			// let quizRef = newQuiz;

			// return quizRef.collection('versions')
			// 	.doc(NEW_QUIZ_VERSION)
			// 	.set({ ...quiz, active: true, createdAt: new Date() })
			// 	.then(() => this.$router.push(this.localePath({ path: '/admin/collection', query: { collectionId: newQuizId } })));
		},

		async updateCurrentCollection () {
			const {
				collectionId, collection
			} = this;

			return this.$fire.firestore
				.collection('collections')
				.doc(collectionId)
				.set({ ...collection, updatedAt: new Date() })
				.then(() => this.$emit('reload-quiz-data'))
				.catch(error => {
					console.log(error);
				});
		}
	}
};
</script>