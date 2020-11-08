<template>
    <div>
        <h1>Players</h1>
        <h3 class="text-dark">
            <router-link
                :to="{path:'/players/create'}"
                class="btn btn-outline-success btn-sm mb-2 float-right"
            >
                <b-icon icon="plus" aria-hidden="true"></b-icon>
                Create Team
            </router-link>
        </h3>
        <div class="table-responsive">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Created at</th>
                        <th>Updated At</th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                <tr
                    v-for="(player,index) in players"
                    :key="index"
                >
                    <td>{{ player.first_name }}</td>
                    <td>{{ player.last_name }}</td>
                    <td>{{ formatDate(player.created_at) }}</td>
                    <td>{{ formatDate(player.updated_at) }}</td>
                    <td>
                       <edit-button
                           route-name="PlayersEdit"
                           :params="{id: player.id}"
                       >
                       </edit-button>
                       <delete-button @click="deletePlayer(player.id)" />
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import EditButton from '../../components/buttons/EditButton';
import DeleteButton from '../../components/buttons/DeleteButton';
export default {
    components: {
      EditButton,
      DeleteButton,
    },
    computed: {
        ...mapGetters({
            players: 'players/getItems',
        }),
    },
    mounted() {
       this.getItems();
    },
    methods: {
        ...mapActions({
            loadItems: 'players/list',
            deleteItem: 'players/delete',
        }),

        ...mapMutations({
            clearItems: 'players/clearItems',
        }),

        async getItems() {
            try {
                await this.loadItems();
            } catch (error) {
                console.log(error)
            }
        },

        deletePlayer(itemId) {
            if (!confirm('Are you sure you want to delete this item?')) {
                return;
            }

            this.deleteItem(itemId);
        },

        formatDate(date){
            return  this.$moment(date).format('dddd, MMMM Do YYYY')
        }
    },
}
</script>
<style>
    .short-string {
        max-width: 300px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
