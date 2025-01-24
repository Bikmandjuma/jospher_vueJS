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
  
      <!-- Alert for localStorage messages -->
      <div v-if="message_localSto" class="p-4 mb-4 text-sm text-blue-700 bg-red-100 rounded-lg" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ message_localSto }}
      </div>
  
      <!-- Form for verification code -->
      <form class="otc" @submit.prevent="verifyCode">
        <fieldset>
          <legend>Email Verification Code</legend>
          <div class="inputs-container">
            <input v-model="code" type="text" maxlength="7" required @input="onInput" autofocus>
          </div>
        </fieldset>
        <button type="submit">Verify</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { laravelApiUrl } from '../../api';
  
  export default {
    data() {
      return {
        code: '',
        message: '',
        message_localSto: '',
      };
    },
  
    methods: {
      async verifyCode() {
        const code = this.code.replace(/-/g, ''); // Format code properly
        const email = localStorage.getItem('seeker_email');
  
        if (!email) {
          this.message = 'Email not found in localStorage.';
          return;
        }
  
        try {
          // Send request to Laravel API
          const response = await axios.post(`${laravelApiUrl}/user/verify/code_to_register/${email}`, { code });
  
          // Handle response messages
          if (response.data.info) {
            this.message = response.data.message;
            // this.$router.push({ name: 'SeekerFill_Info' });
            alert(response.data.message);

          } else if (response.data.error) {
            this.message = response.data.error;
          }
        } catch (error) {
          // Handle API or network errors
          if (error.response && error.response.data) {
            this.message = error.response.data.error || 'An unexpected error occurred.';
          } else {
            this.message = 'An error occurred while processing your request.';
          }
        }
      },
  
      onInput() {
        let formattedCode = this.code.replace(/\D/g, '').slice(0, 6); // Only allow digits
  
        if (formattedCode.length > 3) {
          formattedCode = formattedCode.slice(0, 3) + '-' + formattedCode.slice(3); // Add hyphen
        }
  
        this.code = formattedCode;
      },
    },
  
    mounted() {
      this.message_localSto = localStorage.getItem('reset_pswd_success_msg') || '';
  
      // Clear localStorage message after 5 seconds
      if (this.message_localSto) {
        setTimeout(() => {
          this.message_localSto = '';
          localStorage.removeItem('reset_pswd_success_msg');
        }, 5000);
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
  
  .otc {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  input[type="text"] {
    width: 150px;
    height: 40px;
    margin: 5px;
    font-size: 24px;
    text-align: center;
    border: 2px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    outline: none;
    transition: border 0.3s ease;
  }
  
  input[type="text"]:focus {
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