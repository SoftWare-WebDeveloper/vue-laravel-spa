<template>
    <teams-details
        :edit="true"
        @submit="onSubmit"
    />
</template>

<script>
    import TeamsDetails from './components/details';

    export default {
        name: 'TeamsEdit',

        components: {
            TeamsDetails,
        },

        methods: {
            onSubmit() {
                this.$router.push({ path: '/teams' });
            },
        },
    };
</script>

<style scoped>

</style>
