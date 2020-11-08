<template>
    <b-container class="global-container centered-container">
        <b-card class="login-card">
            <b-card-body>
                <b-card-title class="text-center">
                    Log In
                </b-card-title>
                <b-card-text>
                    <validation-observer
                        ref="observer"
                        v-slot="{ handleSubmit }"
                    >
                        <b-form @submit.stop.prevent="handleSubmit(submit)">
                            <validation-provider
                                v-slot="validationContext"
                                name="Email Address"
                                :rules="{ required: true, email}"
                            >
                                <b-form-group
                                    id="input-group-name"
                                    label="Email Address"
                                    label-for="email"
                                    label-class="control-label"
                                    class="required"
                                >
                                    <b-form-input
                                        id="email"
                                        v-model.trim="email"
                                        type="text"
                                        :state="getValidationState(validationContext)"
                                        aria-describedby="email-validation"
                                    />
                                    <b-form-invalid-feedback
                                        id="email-validation"
                                    >
                                        {{ validationContext.errors[0] }}
                                    </b-form-invalid-feedback>
                                </b-form-group>
                            </validation-provider>

                            <validation-provider
                                v-slot="validationContext"
                                name="Password"
                                :rules="{ required: true}"
                            >
                                <b-form-group
                                    id="input-group-name"
                                    label="Password"
                                    label-for="password"
                                    label-class="control-label"
                                    class="required"
                                >
                                    <b-form-input
                                        id="password"
                                        v-model.trim="password"
                                        type="password"
                                        :state="getValidationState(validationContext)"
                                        aria-describedby="password-validation"
                                    />
                                    <b-form-invalid-feedback
                                        id="password-validation"
                                    >
                                        {{ validationContext.errors[0] }}
                                    </b-form-invalid-feedback>
                                </b-form-group>
                            </validation-provider>
                            <b-alert
                                 variant="danger"
                                 dismissible
                                 fade
                                 :show="showAlert"
                                 @dismissed="showAlert=false"
                            >
                                {{ errors }}
                            </b-alert>
                            <b-button type="submit" variant="primary" class="btn-block">Sign in</b-button>
                        </b-form>
                    </validation-observer>
                </b-card-text>
            </b-card-body>
        </b-card>
    </b-container>
</template>

<script>
import Validate from '../../mixins/Validate';
import LastPath from '../../services/LastPath';
export default {
    mixins: [Validate],
    data() {
        return {
            email: '',
            password: '',
            errors: '',
            showAlert: false,
        };
    },
    methods: {
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
        async submit() {
            try {
                await axios.get('/sanctum/csrf-cookie');

                await axios.post('/login', {
                    email: this.email,
                    password: this.password,
                });

                await this.saveUserAndRedirect();
            } catch (error) {
                this.showAlert = true;
                this.errors = error.response.data.message;
            }
        },

        async saveUserAndRedirect() {
            await this.$store.dispatch('user/fetch').then(() => {
                const path = LastPath.get();
                this.$router.push(path);
            });
        },
    },
};
</script>

<style>
    body {
        background-color: #3b5192;
    }
    .centered-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
    }

    .login-card {
        min-width: 400px;
    }
</style>
