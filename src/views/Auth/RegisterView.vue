<template>
  <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
    <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
      <div class="flex flex-col overflow-y-auto md:flex-row">
        <div class="h-32 md:h-auto md:w-1/2">
          <img
            aria-hidden="true"
            class="object-cover w-full h-full dark:hidden"
            src="../../assets/Homepage_images/create-account-office.jpeg"
            alt="Office"
          />
          <img
            aria-hidden="true"
            class="hidden object-cover w-full h-full dark:block"
            src="../../assets/Homepage_images/create-account-office-dark.jpeg"
            alt="Office"
          />
        </div>
        <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
          <div class="w-full">
            <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
              <i class="fa fa-list-alt"></i>&nbsp;Create account
            </h1>

            <!-- Alert Message -->
            <div v-if="alertMessage" :class="alertClass" class="p-1 mb-4 rounded-md text-center">
              <p class="text-sm mt-1">{{ alertMessage }}</p>
            </div>

            <!-- Username Field -->
            <label class="block text-sm">
              <span class="text-gray-700 dark:text-gray-400"> <i class="fa fa-user"></i>&nbsp;Username</span>
              <input
                v-model="formData.user_name"
                class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                placeholder="Enter username"
              />
              <p v-if="errors.user_name" class="text-sm text-red-500">{{ errors.user_name[0] }}</p>
            </label>

            <!-- Email Field -->
            <label class="block mt-4 text-sm">
              <span class="text-gray-700 dark:text-gray-400"> <i class="fa fa-envelope"></i>&nbsp;Email</span>
              <input
                v-model="formData.email"
                class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                placeholder="Enter email"
                type="email"
              />
              <!-- Display Email Error Message -->
              <p v-if="errors.email" class="text-sm text-red-500">{{ errors.email[0] }}</p>
            </label>

            <!-- Phone Field -->
            <label class="block mt-4 text-sm">
              <span class="text-gray-700 dark:text-gray-400">
                <i class="fa fa-phone"></i>&nbsp;Phone
              </span>
              <input
                v-model="formData.phone"
                class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                type="tel"
                placeholder="Enter tel: 0780000000 or 0720000000"
              />
              <!-- Display Phone Validation Error -->
              <p v-if="errors.phone" class="text-sm text-red-500">{{ errors.phone[0] }}</p>

            </label>


            <!-- Submit Button -->
            <!-- <a
              @click.prevent="submitForm"
              class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
              <i class="fa fa-save"></i>&nbsp;Create account
            </a> -->

            <a
              @click.prevent="submitForm"
              :disabled="loading"
              class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
              <span v-if="loading"><i class="fa fa-spinner fa-spin"></i>&nbsp;creating...</span>
              <span v-else><i class="fa fa-save"></i>&nbsp;Create account</span>
            </a>


            <hr class="my-8" />

            <div id="forgot_pswd">
              <p class="mt-4">
                <a
                  class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  href="/login"
                >
                  Already have an account? Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { laravelApiUrl } from '../../api';
export default {
  data() {
    return {
      formData: {
        user_name: '',
        email: '',
        phone: ''
      },
      alertMessage: '',
      alertClass: '',
      errors: {},
      loading: false,
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post(`${laravelApiUrl}/user/initial_registration`, this.formData);
        console.log('User created successfully', response.data);

        // Save the authentication token in localStorage
        localStorage.setItem('auth_token', response.data.authorisation.token);
        localStorage.setItem('seeker_email',this.formData.email)

        localStorage.setItem('verificationMessage', 'Check your email, we sent you a verification code');

        // this.$router.push({ name: 'CodeToRegister' });
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.$router.push({ name: 'CodeToRegister' });
        }, 5000);

      } catch (error) {
        console.error('Error creating user:', error);

        if (error.response && error.response.data.errors) {
          // Capture the validation errors from the API
          this.errors = error.response.data.errors;

        } else {

          // Handle other errors
          this.alertMessage = 'Error creating user. Please try again.';
          this.alertClass = 'bg-red-500 text-white'; // Red background for error

        }
      }
    }
  }
};
</script>

<style scoped>
    
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
