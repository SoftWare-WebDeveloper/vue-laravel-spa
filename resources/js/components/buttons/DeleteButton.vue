<template>
    <button
            class="btn btn-sm btn-outline-danger"
            @click="$emit('click')"
    >
        <b-icon icon="trash" aria-hidden="true"></b-icon>
        Delete
    </button>
</template>
