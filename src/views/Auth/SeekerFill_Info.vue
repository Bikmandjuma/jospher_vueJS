<template>
  <!-- Top Navbar -->
  <nav class="bg-white shadow-md p-4">
    <div class="max-w-7xl mx-auto flex justify-center items-center text-center">
      <img src="../../assets/Homepage_images/logo_title.png" alt="cool">
    </div>
  </nav>

  <!-- Registration Form -->
  <div class="flex justify-center items-center flex-1 mt-4" id="container">
    <form class="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-4xl">
      <h2 class="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">Fill missed info</h2>

      <!-- Form Fields -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- First Name -->
        <label class="block text-sm mb-4">
          <span class="text-gray-700 dark:text-gray-400">First Name</span>
          <div class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <i class="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              class="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
              placeholder="Enter firstname"
              v-model="firstName"
              autofocus
              pattern="[A-Za-z]+"
              title="Firstname should only contain letters (A-Z, a-z)."
              required
            />
          </div>
        </label>

        <!-- Last Name -->
        <label class="block text-sm mb-4">
          <span class="text-gray-700 dark:text-gray-400">Last Name</span>
          <div class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <i class="fas fa-user-tie absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              class="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
              placeholder="Enter lastname"
              v-model="lastName"
              pattern="[A-Za-z]+"
              title="Lastname should only contain letters (A-Z, a-z)."
              required
            />
          </div>
        </label>

        <!-- Gender -->
        <label class="block text-sm mb-4">
          <span class="text-gray-700 dark:text-gray-400">Gender</span>
          <div class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <i class="fas fa-venus-mars absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <select
              class="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
              v-model="gender"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </label>

        <!-- Birthdate -->
        <label class="block text-sm mb-4">
          <span class="text-gray-700 dark:text-gray-400">Birthdate</span>
          <div class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <i class="fas fa-calendar-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="date"
              class="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
              v-model="birthDate"
              required
            />
          </div>
        </label>

        <!-- Password -->
        <label class="block text-sm mb-4">
          <span class="text-gray-700 dark:text-gray-400">Password</span>
          <div class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              :type="passwordVisible ? 'text' : 'password'"
              class="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
              placeholder="Enter password"
              v-model="password"
              required
            />
            <i
              @click="togglePasswordVisibility"
              :class="passwordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            ></i>
          </div>
        </label>

        <!-- Confirm Password -->
        <label class="block text-sm mb-4">
          <span class="text-gray-700 dark:text-gray-400">Confirm Password</span>
          <div class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              :type="confirmPasswordVisible ? 'text' : 'password'"
              class="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
              placeholder="Confirm password"
              v-model="confirmPassword"
              required
            />
            <i
              @click="toggleConfirmPasswordVisibility"
              :class="confirmPasswordVisible ? 'fa fa-eye' : 'fa fa-eye-slash'"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            ></i>
          </div>
        </label>

      </div>

      <!-- Submit Button -->
      <div class="flex justify-center mt-6">
        <button
          type="submit"
          class="px-6 py-2 text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-lg"
        >
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<!-- <script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      gender: '',
      birthDate: '',
      password: '',
      confirmPassword: '',
      passwordVisible: false, // Track password visibility
      confirmPasswordVisible: false, // Track confirm password visibility
    };
  },
  methods: {
    // Toggle password visibility
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    // Toggle confirm password visibility
    toggleConfirmPasswordVisibility() {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    },
  },
};
</script> -->

<script>
import axios from 'axios';
import { laravelApiUrl } from '../../api';
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      gender: '',
      birthDate: '',
      password: '',
      confirmPassword: '',
      passwordVisible: false,
      confirmPasswordVisible: false,
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    // Toggle password visibility
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },
    // Toggle confirm password visibility
    toggleConfirmPasswordVisibility() {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    },
    // Handle form submission
    async handleSubmit() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        return;
      }

      const formData = {
        firstname: this.firstName,
        lastname: this.lastName,
        gender: this.gender,
        birthdate: this.birthDate,
        password: this.password,
        password_confirmation: this.confirmPassword,
      };

      try {
        const response = await axios.post(`${laravelApiUrl}/register`, formData);
        this.successMessage = response.data.message;
        // Optionally, reset form fields
        this.firstName = '';
        this.lastName = '';
        this.gender = '';
        this.birthDate = '';
        this.password = '';
        this.confirmPassword = '';
      } catch (error) {
        this.errorMessage = error.response.data.message || 'Something went wrong. Please try again.';
      }
    }
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

  /* Icon positioning */
  .fa-user, .fa-user-tie, .fa-venus-mars, .fa-calendar-alt, .fa-lock {
    font-size: 18px;
  }

  .fa-eye, .fa-eye-slash {
    font-size: 18px;
    cursor: pointer;
  }
</style>
