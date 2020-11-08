<template>
    <div>
        <h1>Teams</h1>
        <h3 class="text-dark">
            <router-link
                :to="{path:'/teams/create'}"
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
                        <th>Team</th>
                        <th>Players</th>
                        <th>Created at</th>
                        <th>Updated At</th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                <tr
                    v-for="(team,index) in teams"
                    :key="index"
                >
                    <td>{{ team.name }}</td>
                    <td>
                        <div class="short-string">
                            {{ team.players.map(e => e.full_name).join(", ") }}
                        </div>
                    </td>
                    <td>{{ formatDate(team.created_at) }}</td>
                    <td>{{ formatDate(team.updated_at) }}</td>
                    <td>
                       <edit-button
                           route-name="TeamsEdit"
                           :params="{id: team.id}"
                       >
                       </edit-button>
                       <delete-button @click="deleteTeam(team.id)" />
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
            teams: 'teams/getItems',
        }),
    },
    mounted() {
       this.getItems();
    },
    methods: {
        ...mapActions({
            loadItems: 'teams/list',
            deleteItem: 'teams/delete',
        }),

        ...mapMutations({
            clearItems: 'teams/clearItems',
        }),

        async getItems() {
            try {
                await this.loadItems();
            } catch (error) {
                console.log(error)
            }
        },

        deleteTeam(itemId) {
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
