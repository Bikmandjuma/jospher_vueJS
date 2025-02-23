<template>
  <div>
    <nav class="bg-white shadow-md p-4">
      <div class="max-w-7xl mx-auto flex justify-center items-center text-center">
        <img src="../../assets/Homepage_images/logo_title.png" alt="cool">
      </div>
    </nav>

    <div class="flex justify-center items-center flex-1 mt-4" id="container">
      <form @submit.prevent="submitForm" class="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 class="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">Fill Missed Info</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label class="block text-sm mb-4">
            <span class="text-gray-700 dark:text-gray-400">First Name</span>
            <input type="text" v-model="form.firstname" class="block w-full mt-1 p-2 text-sm border-2 border-gray-300 rounded-md focus:border-blue-500" placeholder="Enter firstname" />
            <span v-if="errors.firstname" class="text-red-500 text-sm">{{ errors.firstname[0] }}</span>
          </label>

          <label class="block text-sm mb-4">
            <span class="text-gray-700 dark:text-gray-400">Last Name</span>
            <input type="text" v-model="form.lastname" class="block w-full mt-1 p-2 text-sm border-2 border-gray-300 rounded-md focus:border-blue-500" placeholder="Enter lastname" />
            <span v-if="errors.lastname" class="text-red-500 text-sm">{{ errors.lastname[0] }}</span>
          </label>

          <label class="block text-sm mb-4">
            <span class="text-gray-600">Gender</span>
            <select v-model="form.gender" class="block w-full mt-1 p-2 text-sm border-2 border-gray-300 rounded-md focus:border-blue-500">
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <span v-if="errors.gender" class="text-red-500 text-sm">{{ errors.gender[0] }}</span>
          </label>

          <label class="block text-sm mb-4">
            <span class="text-gray-700 dark:text-gray-400">Birthdate</span>
            <input type="date" v-model="form.birthdate" class="block w-full mt-1 p-2 text-sm border-2 border-gray-300 rounded-md focus:border-blue-500" />
            <span v-if="errors.birthdate" class="text-red-500 text-sm">{{ errors.birthdate[0] }}</span>
          </label>

          <!-- Password Field -->
          <label class="block text-sm mb-4 relative">
            <span class="text-gray-700 dark:text-gray-400">Password</span>
            <input :type="passwordFieldType" v-model="form.password" class="block w-full mt-1 p-2 text-sm border-2 border-gray-300 rounded-md focus:border-blue-500 pr-10" placeholder="Enter password" />
            <span @click="switchVisibility" class="absolute right-3 top-9 cursor-pointer text-gray-600">
              <i :class="isPasswordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
            </span>
            <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password[0] }}</span>
          </label>

          <!-- Confirm Password Field -->
          <label class="block text-sm mb-4 relative">
            <span class="text-gray-700 dark:text-gray-400">Confirm Password</span>
            <input :type="passwordFieldType_x" v-model="form.password_confirmation" class="block w-full mt-1 p-2 text-sm border-2 border-gray-300 rounded-md focus:border-blue-500 pr-10" placeholder="Confirm password" />
            <span @click="switchVisibility_x" class="absolute right-3 top-9 cursor-pointer text-gray-600">
              <i :class="isPasswordVisible_x ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
            </span>
            <span v-if="errors.password_confirmation" class="text-red-500 text-sm">{{ errors.password_confirmation[0] }}</span>
          </label>
        </div>

        <div class="flex justify-center mt-6">
          <button type="submit" :disabled="loading" class="block w-full text-white mx-4 pt-2 pb-2 bg-gradient-to-r from-blue-600 to-sky-200 hover:bg-gradient-to-l hover:from-blue-600 hover:to-sky-200 font-bold">
            <span v-if="loading">
              <i class="fa fa-spinner fa-spin"></i>&nbsp;Creating...
            </span>
            <span v-else>Register</span>
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
        password_confirmation: ''
      },
      passwordFieldType: 'password',
      isPasswordVisible: false,
      passwordFieldType_x: 'password',
      isPasswordVisible_x: false,
      loading: false,
      errors: {}
    };
  },
  beforeMount() {
    const email = localStorage.getItem('seeker_email');
    if (!email) {
      this.$router.push({ name: 'Login' });
    }
  },
  methods: {
    switchVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
      this.passwordFieldType = this.isPasswordVisible ? 'text' : 'password';
    },
    switchVisibility_x() {
      this.isPasswordVisible_x = !this.isPasswordVisible_x;
      this.passwordFieldType_x = this.isPasswordVisible_x ? 'text' : 'password';
    },
    async submitForm() {
      this.loading = true;
      const email = localStorage.getItem('seeker_email');
      try {
        const response = await axios.post(`${laravelApiUrl}/user/fill_missed_info/${email}`, this.form);
        localStorage.setItem('auth_token', response.data.authorisation.token);
        localStorage.removeItem('seeker_email');
        setTimeout(() => {
          this.loading = false;
          this.$router.push({ name: 'SeekerDashboard' });
        }, 2000);
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errors = error.response.data.errors;
        } else {
          alert('An error occurred. Please try again.');
        }
      } finally {
        this.loading = false;
      }
    }
  }
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
