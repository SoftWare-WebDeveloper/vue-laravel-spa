<template>
    <div class="app min-vh-100">
        <div id="wrapper" class="d-flex">
            <sidebar />
            <div id="content" class="w-100">
                <b-container fluid>
                    <b-row class="justify-content-center">
                        <b-col>
                            <b-card class=" min-vh-100">
                                <router-view />
                            </b-card>
                        </b-col>
                    </b-row>
                </b-container>
            </div>
        </div>
    </div>
</template>
<script>
import sidebar from '../components/naw/sidebar'
export default {
    components: {
        sidebar,
    }
};
</script>
<style scoped>
    .app {
        background-color: #f5f6fa;
    }
</style>
