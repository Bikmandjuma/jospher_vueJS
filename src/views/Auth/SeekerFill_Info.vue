<template>
  <div>
    <nav class="bg-white shadow-md p-4">
      <div class="max-w-7xl mx-auto flex justify-center items-center text-center">
        <img src="../../assets/Homepage_images/logo_title.png" alt="cool">
      </div>
    </nav>

    <div class="flex justify-center items-center flex-1 mt-4" id="container">
      <form @submit.prevent="submitForm" class="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 class="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">Fill missed info</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- First Name -->
          <label class="block text-sm mb-4">
            <span class="text-gray-700 dark:text-gray-400">First Name</span>
            <input
              type="text"
              v-model="form.firstname"
              class="block w-full mt-1 text-sm form-input"
              placeholder="Enter firstname"
            />
            <span v-if="errors.firstname" class="text-red-500 text-sm">{{ errors.firstname[0] }}</span>
          </label>

          <!-- Last Name -->
          <label class="block text-sm mb-4">
            <span class="text-gray-700 dark:text-gray-400">Last Name</span>
            <input
              type="text"
              v-model="form.lastname"
              class="block w-full mt-1 text-sm form-input"
              placeholder="Enter lastname"
            />
            <span v-if="errors.lastname" class="text-red-500 text-sm">{{ errors.lastname[0] }}</span>
          </label>

          <!-- Gender -->
          <label class="block text-sm mb-4">
            <span class="text-gray-700 dark:text-gray-400">Gender</span>
            <select v-model="form.gender" class="block w-full mt-1 text-sm form-input">
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <span v-if="errors.gender" class="text-red-500 text-sm">{{ errors.gender[0] }}</span>
          </label>

          <!-- Birthdate -->
          <label class="block text-sm mb-4">
            <span class="text-gray-700 dark:text-gray-400">Birthdate</span>
            <input
              type="date"
              v-model="form.birthdate"
              class="block w-full mt-1 text-sm form-input"
            />
            <span v-if="errors.birthdate" class="text-red-500 text-sm">{{ errors.birthdate[0] }}</span>
          </label>

          <!-- Password -->
          <label class="block text-sm mb-4">
            <span class="text-gray-700 dark:text-gray-400">Password</span>
            <input
              type="password"
              v-model="form.password"
              class="block w-full mt-1 text-sm form-input"
              placeholder="Enter password"
            />
            <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password[0] }}</span>
          </label>

          <!-- Password Confirmation -->
          <label class="block text-sm mb-4">
            <span class="text-gray-700 dark:text-gray-400">Confirm Password</span>
            <input
              type="password"
              v-model="form.password_confirmation"
              class="block w-full mt-1 text-sm form-input"
              placeholder="Confirm password"
            />
            <span v-if="errors.password_confirmation" class="text-red-500 text-sm">{{ errors.password_confirmation[0] }}</span>
          </label>
        </div>
        <div class="flex justify-center mt-6">

        <button
            type="submit"
            @click.prevent="submitForm"
            :disabled="loading"
            class="block w-full px-6 py-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50"
        >
            <span v-if="loading">
              <i class="fa fa-spinner fa-spin"></i>&nbsp;Creating...
            </span>
            <span v-else>
              Register
            </span>
          </button>
        </div>

        
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { laravelApiUrl } from '../../api';

export default {
  data() {
    return {
      form: {
        firstname: '',
        lastname: '',
        gender: '',
        birthdate: '',
        password: '',
        password_confirmation: '',
      },
      loading: false,
      errors: {},
    };
  },
  beforeMount() {
    // Check for seeker_email in localStorage
    const email = localStorage.getItem('seeker_email');
    if (!email) {
      // Redirect to the 'register' route if email is not found
      this.$router.push({ name: 'Login' });
    }
  },
  methods: {
    async submitForm() {

      this.loading = true; // Start loading
      const email = localStorage.getItem('seeker_email');
      
      try {
        const response = await axios.post(`${laravelApiUrl}/user/fill_missed_info/${email}`, this.form);
        
        // Store the token in localStorage
        const token = response.data.authorisation.token;
        localStorage.setItem('auth_token', token);
        localStorage.removeItem('seeker_email');

        setTimeout(() => {
          this.loading = false;
          this.$router.push({name: 'SeekerDashboard'});
        }, 2000);


      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errors = error.response.data.errors; // Assign validation errors
        } else {
          alert('An error occurred. Please try again.');
        }
      }finally {
        this.loading = false; // Stop loading
      }

    },
  },
};
</script>

<style scoped>
  @media (max-width: 600px) {
    #container {
      margin-left: 20px;
      margin-right: 20px;
    }
  }
</style>
