<template>
    <nav class="bg-white shadow-md p-4">
      <div class="max-w-7xl mx-auto flex justify-center items-center text-center">
        <img src="../../assets/Homepage_images/logo_title.png" alt="cool">
      </div>
    </nav>
  
    <div class="container mt-5">
      <!-- Alert for general messages -->
      <div v-if="message" class="p-2 mb-2 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ message }}
      </div>

      <div v-if="message_success" class="p-2 mb-4 text-sm text-blue-700 bg-red-100 rounded-lg" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ message_success }}
      </div> 

      <div v-if="valid_code_msg" class="p-2 mb-4 text-sm text-blue-700 bg-red-100 rounded-lg" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ valid_code_msg }}
      </div> 
  
      <!-- Form for resetting password -->
      <form @submit.prevent="submitPasswordReset">
        <fieldset>
          <legend>Reset Password</legend>
  
          <div class="inputs-container">
            <input v-model="password" type="password" required placeholder="New Password">
          </div>
  
          <div class="inputs-container">
            <input v-model="password_confirmation" type="password" required placeholder="Confirm New Password">
          </div>
        </fieldset>
  
        <button type="submit" v-if="loading" disabled>
          <i class="fa fa-spinner fa-spin"></i>&nbsp;Submitting...
        </button>
        <button type="submit" v-else>
          <i class="fa fa-check"></i>&nbsp;Submit
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { laravelApiUrl } from '../../api';
  
  export default {
    data() {
      return {
        password: '',
        password_confirmation: '',
        message: '',
        message_success: '',
        loading: false,
        valid_code_msg:'',
      };
    },
  
    beforeMount() {
      const email = localStorage.getItem('pswd_resettor_mail');
      const code = localStorage.getItem('pswd_resettor_code');
  
      if (!email || !code) {
        this.$router.push({ name: 'ForgotPassword' });
      }
    },
  
    methods: {
      async submitPasswordReset() {
        this.loading = true;
        const email = localStorage.getItem('pswd_resettor_mail');
        const code = localStorage.getItem('pswd_resettor_code');
  
        if (!email || !code) {
          this.message = 'Email or reset code not found in localStorage.';
          this.loading = false;
          return;
        }
  
        // Send the reset password request to the API
        try {
          const response = await axios.post(`${laravelApiUrl}/reset/password/${email}/${code}`, {
            password: this.password,
            password_confirmation: this.password_confirmation,
          });
  
          if (response.data.status === 'success') {
            this.message_success = response.data.message;
            
            localStorage.removeItem('pswd_resettor_mail');
            localStorage.removeItem('pswd_resettor_code');

            setTimeout(() => {
              this.$router.push({ name: 'Login' });
            }, 3000);

          } else {
            this.message = response.data.message;
            setTimeout(() => {
              this.message = '';
            }, 5000);
          }
        } catch (error) {
          console.error('Error:', error);
          if (error.response && error.response.data) {
            this.message = error.response.data.error.password[0] || 'An error occurred while processing your request.';
            setTimeout(() => {
              this.message = '';
            }, 5000);
        } else {
            this.message = 'An error occurred. Please try again later.';
            setTimeout(() => {
              this.message = '';
            }, 5000);
          }
        } finally {
          this.loading = false;
        }
      },
    },
    mounted(){
        this.valid_code_msg = localStorage.getItem('code_valid_msg');

        if (this.valid_code_msg) {
            setTimeout( () =>{
                this.valid_code_msg='';
                localStorage.removeItem('code_valid_msg');
            },5000);
        }
    },
  };
  </script>
  
  <style scoped>
  .container {
    width: 100%;
    max-width: 500px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    padding: 30px;
    box-sizing: border-box;
    text-align: center;
  }
  
  .inputs-container {
    margin: 10px 0;
  }
  
  input[type="password"] {
    width: 100%;
    height: 40px;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    outline: none;
    transition: border 0.3s ease;
  }
  
  input[type="password"]:focus {
    border-color: #007BFF;
  }
  
  button {
    background-color: #007BFF;
    color: white;
    padding: 12px 30px;
    border: none;
    border-radius: 6px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 20px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  