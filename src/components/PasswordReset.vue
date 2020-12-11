<template>
  <div class="modal">
      <br/><br/><br/><br/>
    <div class="modal-content" style="margin:20%; padding:20px; background-color: white">
      <h3>Reset Password</h3>
      <div v-if="!showSuccess">
        <p>Enter your email to reset your password</p>
        <form @submit.prevent>
          <v-text-field v-model.trim="email" type="email" label="E-mail"></v-text-field>
        </form>
        <p v-if="errorMsg !== ''" class="error">{{ errorMsg }}</p>
        <v-btn @click="resetPassword()" class="button" style="margin:20px">Reset</v-btn>
        
      </div>
      <p v-else>Success! Check your email for a reset link.</p>
      <v-btn text @click="$emit('close')" class="close" style="margin-left:20px">Back</v-btn>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase'
export default {
  data() {
    return {
      email: '',
      showSuccess: false,
      errorMsg: ''
    }
  },
  methods: {
    async resetPassword() {
      this.errorMsg = ''
      try {
        await auth.sendPasswordResetEmail(this.email)
        this.showSuccess = true
      } catch (err) {
        this.errorMsg = err.message
      }
    }
  }
}
</script>
