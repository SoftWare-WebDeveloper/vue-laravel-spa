<template>
    <ul
        id="sidebar"
        class="sidebar navbar-nav app-background-color min-vh-100"
    >
        <li class="b-sidebar-header mt-3 mb-3 mr-2 ml-2 pb-2 bottom-border">
            <h2 class="text-center"> < <b style="color:white;">test-task</b> /></h2>
        </li>
        <li v-for="(tab,index) in tabs"
            :key="index"
        >
            <router-link
                :to="{path: tab.url}"
                class="nav-link"
            >
                <b-icon :icon="tab.icon" aria-hidden="true"></b-icon>
                <span class="ml-3">{{ tab.name }}</span>
            </router-link>
        </li>
        <li class="logout">
            <b-button @click.prevent="logout()" variant="outline-info" class="mb-2">
                <b-icon icon="power" aria-hidden="true"></b-icon> Logout
            </b-button>
        </li>
    </ul>
</template>
<script>
import nav from '../../_nav'
export default {
    name: 'Sidebar',
    computed: {
        tabs() {
            return nav.tabs;
        }
    },
    methods: {
      async logout() {
          await this.$store.dispatch('user/logout');
          this.$router.push('/sign-in');
      }
    }
}
</script>
