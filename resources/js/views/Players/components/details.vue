<template>
    <div class="col-lg-6">
        <h3>
            {{ edit ? 'Edit' : 'Create' }} Player
        </h3>
        <validation-observer
                ref="observer"
                v-slot="{ handleSubmit }"
        >
            <b-form @submit.stop.prevent="handleSubmit(submit)">
                <validation-provider
                    v-slot="validationContext"
                    name="first_name"
                    :rules="{ required: true}"
                >
                    <b-form-group
                        id="input-group-name"
                        label="First Name"
                        label-for="first-name"
                        label-class="control-label"
                        class="required"
                    >
                        <b-form-input
                            id="first-name"
                            v-model="first_name"
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

                <validation-provider
                    v-slot="validationContext"
                    name="last_name"
                    :rules="{ required: true}"
                >
                    <b-form-group
                        id="input-group-name"
                        label="Last Name"
                        label-for="last-name"
                        label-class="control-label"
                        class="required"
                    >
                        <b-form-input
                            id="last-name"
                            v-model="last_name"
                            type="text"
                            :state="getValidationState(validationContext)"
                            aria-describedby="last-name-validation"
                        />
                        <b-form-invalid-feedback
                            id="last-name-validation"
                        >
                            {{ validationContext.errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </validation-provider>
                <b-button
                    type="submit"
                    variant="outline-info"
                >
                    {{ edit ? 'Edit' : "Create" }}
                </b-button>
                <router-link
                    :to="{path:'/players'}"
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
        first_name: {
            get() {
                return this.$store.getters['players/getProperty']('first_name');
            },
            set(value) {
                this.$store.commit('players/setProperty', { first_name: value });
            },
        },
        last_name: {
            get() {
                return this.$store.getters['players/getProperty']('last_name');
            },
            set(value) {
                this.$store.commit('players/setProperty', { last_name: value });
            },
        },

    },
    created() {
        this.fetchData();
        this.$store.commit('players/clear');
    },
    destroyed() {
        this.$store.commit('players/clear');
    },
    methods: {
        async fetchData() {
            try {
                if (this.edit) {
                    this.$store.dispatch('players/get', this.$route.params.id);
                }
            } catch (error) {
              console.log(error);
            }
        },
        async submit() {
            try {
                let player = null;
                if (this.edit) {
                    player = await this.$store.dispatch('players/save', this.$route.params.id);
                } else {
                    player = await this.$store.dispatch('players/create');
                }

                if (player) {
                    this.$emit('submit', player);
                }

            } catch (error) {
                console.log(error);
            }
        }
    },
};
</script>
