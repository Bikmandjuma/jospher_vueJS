<template>
    <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900" id="login_container">
      <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div class="flex flex-col overflow-y-auto md:flex-row">
          <div class="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              class="object-cover w-full h-full dark:hidden"
              src="../../assets/Homepage_images/forgot-password-office.jpeg"
              alt="Office"
            />
            <img
              aria-hidden="true"
              class="hidden object-cover w-full h-full dark:block"
              src="../../assets/Homepage_images/forgot-password-office-dark.jpeg"
              alt="Office"
            />
          </div>
          <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div class="w-full">
              <h1
                class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200 text-center justify-center items-center"
              >
                Forgot password
              </h1>
              <label class="block text-sm">
                <span class="text-gray-700 dark:text-gray-400">
                  <i class="fa fa-envelope"></i>&nbsp;Email
                </span>
                <input
                  v-model="email"
                  type="email"
                  class="block w-full mt-3 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                  placeholder="Enter email"
                />
              </label>
              <p v-if="error" class="text-red-600 text-sm mt-2">{{ error }}</p>
              <p v-if="success" class="text-green-600 text-sm mt-2">{{ success }}</p>
  
              <button
                type="submit"
                class="w-full px-4 mt-4 py-2 text-white rounded-lg bg-gradient-to-r from-purple-600 to-sky-200 hover:bg-gradient-to-l hover:from-purple-600 hover:to-sky-200 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                @click="recoverPassword"
                v-if="loading"
              >
                <i class="fa fa-spinner fa-spin"></i>&nbsp;Recovering...
              </button>

              <button
                type="submit"
                class="w-full px-4 mt-4 py-2 text-white bg-gradient-to-r from-purple-600 to-sky-200 hover:bg-gradient-to-l hover:from-purple-600 hover:to-sky-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                @click="recoverPassword"
                v-else
              >
                <i class="fa fa-key"></i>&nbsp;Recover password
              </button>
  
              <hr class="my-8" />
  
              <div id="forgot_pswd">
                <p class="mt-4">
                  <router-link
                    class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                    to="/login"
                  >
                    <i class="fa fa-arrow-left"></i>&nbsp;Back to login
                  </router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { laravelApiUrl } from "../../api";

  export default {
    data() {
      return {
        email: "",
        error: null,
        success: null,
        loading:false,
      };
    },
    methods: {
      async recoverPassword() {
        this.error = null;
        this.success = null;
        this.loading = true;
        
        try {
            const response = await axios.post(`${laravelApiUrl}/user/forgot-password`, {
                email: this.email,
            });

            // Handle success response
            if (response.data.status === "success") {
                this.success = response.data.message;
                localStorage.setItem('pswd_resettor_mail', this.email);
                localStorage.setItem('reset_pswd_success_msg', response.data.message);
                setTimeout( ()=>{
                  this.loading = false;
                  this.$router.push({name: "ResetCodePassword"});
                });
            }
        } catch (err) {
            console.log(err);  // Log the error to check the response structure
            if (err.response && err.response.data && err.response.data.errors) {
                this.error = err.response.data.errors.email 
                ? err.response.data.errors.email[0]
                : "An error occurred. Please try again.";  // Fallback message if no email error exists
                setTimeout(() => {
                this.error = "";
                }, 5000);
            } else {
                this.error = err.response.data ? err.response.data.message : "Unable to connect to the server. Please try later.";
            }
        
        }finally{
          this.loading=false;
        }
        
      },
    },
    mounted(){
        // setTimeout(() =>{
        //     this.error = "";
        // },5000);
    
        
    },

  };
  </script>
  
  <style scoped>
  
  /* Optional styling */
  #login_container{
    margin-top: -40px;
  }

  @media (max-width: 600px) {
    #login_container{
      margin-top: -70px;
    }
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin: 5px 0;
    font-size: 18px;
  }
  
  .error {
    color: red;
    font-weight: bold;
  }
  
  a {
    text-decoration: none;
  }
  
  #forgot_pswd a:hover {
    text-decoration: none;
    color: black;
  }
  
  #forgot_pswd {
    align-items: center;
    text-align: center;
  }
  </style>
  