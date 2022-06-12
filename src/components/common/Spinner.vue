<template>
  <div v-if="isSpinnerLoading" class="spinner-border spinner-border-sm" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
</template>

<script>

export default {
	name: 'Spinner',
	props: {
		isSpinnerLoading: {
			type: Boolean,
			required: true
		}
	},
	created() {
	}

};
</script>
