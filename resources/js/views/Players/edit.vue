<template>
    <player-details
        :edit="true"
        @submit="onSubmit"
    />
</template>

<script>
    import PlayerDetails from './components/details';

    export default {
        name: 'PlayerEdit',

        components: {
            PlayerDetails,
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
