<template>
    <div class="col-lg-6">
        <h3>
            {{ edit ? 'Edit' : 'Create' }} Teams
        </h3>
        <validation-observer
                ref="observer"
                v-slot="{ handleSubmit }"
        >
            <b-form @submit.stop.prevent="handleSubmit(submit)">
                <validation-provider
                    v-slot="validationContext"
                    name="Name"
                    :rules="{ required: true}"
                >
                    <b-form-group
                        id="input-group-name"
                        label="Team Name"
                        label-for="name"
                        label-class="control-label"
                        class="required"
                    >
                        <b-form-input
                            id="name"
                            v-model="name"
                            type="text"
                            :state="getValidationState(validationContext)"
                            aria-describedby="first-name-validation"
                        />
                        <b-form-invalid-feedback
                            id="first-name-validation"
                        >
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>
                <b-form-group
                    id="input-group-players"
                    label="Players"
                    label-class="control-label"
                >
                    <vSelect
                        id="players"
                        v-model="players"
                        :options="playersOptions"
                        :clearable="true"
                        :reduce="employee => employee.id"
                        :append-to-body="true"
                        :multiple="true"
                    />
                </b-form-group>
                <b-button
                    type="submit"
                    variant="outline-info"
                >
                    {{ edit ? 'Edit' : "Create" }}
                </b-button>
                <router-link
                    :to="{path:'/teams'}"
                    class="btn btn-outline-secondary"
                >
                    Back
                </router-link>
            </b-form>
        </validation-observer>
    </div>
</template>

<script>
import vSelect from "vue-select";
import Validate from '../../../mixins/Validate';
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
    components: {
        vSelect,
    },
    mixins: [Validate],
    props: {
        edit: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        playersOptions() {
            return Array.isArray(this.playersAll) ? this.playersAll.map((item) => ({
                id: item.id,
                label: item.full_name,
            })) : [];
        },
        name: {
            get() {
                return this.$store.getters['teams/getProperty']('name');
            },
            set(value) {
                this.$store.commit('teams/setProperty', { name: value });
            },
        },
        players: {
            get() {
                return this.$store.getters['teams/getProperty']('players');
            },
            set(value) {
                this.$store.commit('teams/setProperty', { players: value });
            },
        },
        ...mapGetters({
            playersAll: 'players/getItems',
        }),

    },
    created() {
        this.fetchData();
        this.$store.commit('teams/clear');
    },
    destroyed() {
        this.$store.commit('teams/clear');
    },
    methods: {
        async fetchData() {
            try {
                await this.$store.dispatch('players/list');

                if (this.edit) {
                    this.$store.dispatch('teams/get', this.$route.params.id);
                }
            } catch (error) {
              console.log(error);
            }
        },
        async submit() {
            try {
                let team = null;
                if (this.edit) {
                    team = await this.$store.dispatch('teams/save', this.$route.params.id);
                } else {
                    team = await this.$store.dispatch('teams/create');
                }

                if (team) {
                    this.$emit('submit', team);
                }

            } catch (error) {
                console.log(error);
            }
        }
    },
};
</script>
