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
            <label class="block text-sm">
              <span class="text-gray-700 dark:text-gray-400"> <i class="fa fa-user"></i>&nbsp;Username</span>
              <input
                v-model="formData.user_name"
                class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                placeholder="Enter username"
              />
            </label>
            <label class="block mt-4 text-sm">
              <span class="text-gray-700 dark:text-gray-400"> <i class="fa fa-envelope"></i>&nbsp;Email</span>
              <input
                v-model="formData.email"
                class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                placeholder="Enter email"
                type="email"
              />
            </label>
            <label class="block mt-4 text-sm">
              <span class="text-gray-700 dark:text-gray-400">
                  <i class="fa fa-phone"></i>&nbsp;Phone
              </span>
              <input
                v-model="formData.phone"
                class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                placeholder="Enter phone"
                type="tel"
              />
            </label>

            <a
              @click.prevent="submitForm"
              class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
              <i class="fa fa-save"></i>&nbsp;Create account
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

export default {
  data() {
    return {
      formData: {
        user_name: '',
        email: '',
        phone: ''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        // Send the form data to the Laravel backend API endpoint
        const response = await axios.post('http://127.0.0.1:8000/api/user/initial_registration', this.formData);

        // Handle the successful response, e.g., save token and redirect
        console.log('User created successfully', response.data);

        // Save the authentication token in localStorage
        localStorage.setItem('auth_token', response.data.authorisation.token);

        // Redirect to the seeker dashboard or any other route
        this.$router.push({ name: 'SeekerDashboard' });

      } catch (error) {
        // Handle errors (e.g., validation or server errors)
        console.error('Error creating user:', error);
        alert('Error creating user. Please try again.');
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
