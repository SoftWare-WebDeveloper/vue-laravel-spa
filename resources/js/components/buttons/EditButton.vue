<template>
    <router-link
            :to="{name: routeName, params}"
            class="btn btn-sm btn-outline-primary"
            tag="button"
            :disabled="disabled"
    >
        <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
        Edit
    </router-link>
</template>
<script>
    export default {
        props: {
            routeName: {
                required: true,
                type: String,
            },
            params: {
                required: true,
                type: Object,
            },
            disabled: {
                required: false,
                type: Boolean,
            },
        },
    };
</script>

<style scoped>
    .cursor-blocked {
        cursor: not-allowed;
    }
</style>
