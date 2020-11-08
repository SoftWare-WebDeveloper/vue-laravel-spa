<template>
    <teams-details
        @submit="onSubmit"
    />
</template>

<script>
    import TeamsDetails from './components/details';

    export default {
        name: 'TeamsCreate',

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
