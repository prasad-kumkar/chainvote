<template>
<div id="login">
    <PasswordReset v-if="showPasswordReset" @close="togglePasswordReset()"></PasswordReset>
      <validation-observer
        ref="observer"
        v-slot="{ invalid }"
        >

        <!-- Login Form -->
        <form style="background-color: white" v-if="!showLoginForm && !showPasswordReset" class="login-form" @submit.prevent="submit">
            <h1>Sign In</h1>
        <validation-provider
            v-slot="{ errors }"
            name="email"
            rules="required|email"
        >
            <v-text-field
            v-model.trim="loginForm.email"
            :error-messages="errors"
            label="E-mail"
            required
            ></v-text-field>
        </validation-provider>
        
        <validation-provider
            v-slot="{ errors }"
            name="password"
            rules="required"
        >
            <v-text-field
            v-model.trim="loginForm.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :error-messages="errors"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
            ></v-text-field>
        </validation-provider>
        
        <div class="error-message">
            <p>{{errorMessage}}</p>
        </div>
        <div class="buttons">
            <v-btn
                class="mr-4"
                color="primary"
                :disabled="invalid"
                @click="login()"
                style="margin: 10px"
                >
                Login
            </v-btn>
            <v-btn text @click="togglePasswordReset()" x-small color="red" style="margin: 20px">
                Forgot Password
            </v-btn>
            <v-btn @click="toggleForm()" style="margin: 10px">
                Create a new account
            </v-btn>
        </div>
        
        </form>


        <!-- Register Form -->
        <form style="background-color: white" v-if="showLoginForm && !showPasswordReset" class="register-form" @submit.prevent="submit">
            <h1>Create a new account</h1>
        <validation-provider
            v-slot="{ errors }"
            name="Name"
            rules="required|max:10"
        >
            <v-text-field
            v-model.trim="signupForm.name"
            :counter="10"
            :error-messages="errors"
            label="Name"
            required
            ></v-text-field>
        </validation-provider>
        <validation-provider
            v-slot="{ errors }"
            name="phoneNumber"
            :rules="{
            required: true,
            digits: 10,
            regex: '^(71|72|74|75|76|77|78|79|80|81|82|84|85|86|87|88|89)\\d{8}$'
            }"
        >
            <v-text-field
            v-model.trim="signupForm.phone"
            :counter="10"
            :error-messages="errors"
            label="Phone Number"
            required
            ></v-text-field>
        </validation-provider>
        <validation-provider
            v-slot="{ errors }"
            name="email"
            rules="required|email"
        >
            <v-text-field
            v-model.trim="signupForm.email"
            :error-messages="errors"
            label="E-mail"
            required
            ></v-text-field>
        </validation-provider>
        <validation-provider
            v-slot="{ errors }"
            name="password"
            rules="required"
        >
            <v-text-field
            v-model.trim="signupForm.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :error-messages="errors"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
            ></v-text-field>
        </validation-provider>
        <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="checkbox"
        >
            <v-checkbox
            v-model.trim="checkbox"
            :error-messages="errors"
            value="1"
            label="I agree to all terms and conditions."
            type="checkbox"
            required
            ></v-checkbox>
        </validation-provider>
        <div class="buttons">
            <v-btn
            class="mr-4"
            type="submit"
            color="primary"
            :disabled="invalid"
            @click="signup()"
            style="margin: 10px"
            >
                register
            </v-btn>
            <v-btn @click="toggleForm()" style="margin: 10px">
                Sign In Instead
            </v-btn>
        </div>
        </form>

    </validation-observer>
  </div>
</template>

<script>
  import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
  import PasswordReset from '../components/PasswordReset'

  setInteractionMode('eager')

  extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
  })

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}',
  })

  extend('email', {
    ...email,
    message: 'Email must be valid',
  })

  export default {
    components: {
        PasswordReset,
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
        show1: false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        },
        loginForm: {
            email: '',
            password: ''
        },
        signupForm: {
            name: '',
            phone: '',
            email: '',
            password: ''
        },
        showLoginForm: true,
        showPasswordReset: false,
        checkbox: null,
        errorMessage: ""
    }),

    methods: {
        toggleForm() {
            this.showLoginForm = !this.showLoginForm
        },
        togglePasswordReset() {
            this.showPasswordReset = !this.showPasswordReset
        },
        async login() {
            try{
                await this.$store.dispatch('login', {
            email: this.loginForm.email,
            password: this.loginForm.password
        })
        this.errorMessage = "Successful! Logging you in."
            }catch(err){
                this.errorMessage = err.message
            }
        },
        signup() {
            this.$store.dispatch('signup', {
            email: this.signupForm.email,
            password: this.signupForm.password,
            name: this.signupForm.name,
            phone: this.signupForm.phone
        })
        },
    },
  }
</script>

<style lang="sass" scoped>

#login 
    display: flex
    justify-content: center
    align-items: center
.buttons
    display: flex
    flex-wrap: wrap
    justify-content: center
.register-form, .login-form
    max-width: 500px
    margin-top: 100px
    padding: 50px
.error
</style>