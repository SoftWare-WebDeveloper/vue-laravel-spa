<template>
    <players-details
        @submit="onSubmit"
    />
</template>

<script>
    import PlayersDetails from './components/details';

    export default {
        name: 'TeamsCreate',

        components: {
            PlayersDetails,
        },

        methods: {
            onSubmit() {
                this.$router.push({ path: '/players' });
            },
        },
    };
</script>

<style scoped>

</style>
