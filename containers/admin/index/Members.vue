<template>
	<section class="members-section">
		<!-- TODO -->
		<!-- <ButtonCard
			v-for="member in members"
			:key="member.uid"
			class="quiz-card"
			:showArrow="true"
			@click="handleMember(admin.uid)"
			>
			<h3 class="member-title">
			{{ member.fullName }}
			</h3>
			</ButtonCard> -->

		<FormSubmit successMessage="Member was added!">
			<BaseForm class="add-member-form" @submit="addMember">
				<Select
					v-model="newMemberRole"
					name="newMemberRole"
					labelText="Add member by email"
				>
					<Option
						v-for="role in roles"
						:key="role"
						:value="role"
						:title="role"
					/>
				</Select>

				<Input
					v-model.trim="newMemeberEmail"
					:maxLength="40"
					type="email"
					placeholder="example@gmail.com"
					name="newMemeberEmail"
					required
				/>

				<SubmitButton title="Add member" />
			</BaseForm>
		</FormSubmit>
	</section>
</template>

<script>
import {
	FormSubmit,
	BaseForm,
	Input,
	Select, Option,
	SubmitButton
} from '~/components/BaseForm';
import USER_ROLE from '~/constants/user-role';

export default {
	components: {
		Select,
		Option,
		FormSubmit,
		BaseForm,
		Input,
		SubmitButton
	},

	data () {
		return {
			admins: [],
			newMemeberEmail: '',
			newMemberRole: 'admin',
			USER_ROLE
		};
	},

	computed: {
		roles () {
			return Object.values(this.USER_ROLE);
		}
	},

	mounted () {
		this.getMembers();
	},

	methods: {
		getMembers () {
			// TODO
		},

		handleMember (quizId) {
			// TODO
		},

		addMember () {
			let addMember = this.$fire.functions.httpsCallable('addMember');

			return addMember({
				email: this.newMemeberEmail,
				role: this.newMemberRole
			})
				.then(result => {
					if (result.data.code === 'auth/user-not-found') {
						throw result.data;
					}
					return result.data;
				});
		}
	}
};
</script>


<style scoped>
.members-section {
	max-width: 20rem;
}
</style>