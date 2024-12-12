<template>
    <!-- Top Navbar -->
  <!-- <nav class="bg-white shadow-md p-4">
    <div class="max-w-7xl mx-auto text-center">
      <img src="../../assets/Homepage_images/logo.png" alt="cool" style="width:50px;height: 50px;">
      <h1 class="text-gray-800 text-2xl font-semibold" style="font-family: Times New Roman;"><b><span class="text-red-700">Job</span> <span class="text-purple-900">Sphere</span> <span>Rda</span></b></h1>
    </div>
  </nav> -->

  <nav class="bg-white shadow-md p-4">
    <div class="max-w-7xl mx-auto flex justify-center items-center text-center">
      <img src="../../assets/Homepage_images/logo_title.png" alt="cool">
      <!-- <h1 class="text-gray-800 text-2xl font-semibold" style="font-family: Times New Roman;margin-top:10px;">
        <b><span class="text-red-700">Job</span> <span class="text-purple-900">Sphere</span> <span>Rda</span></b>
      </h1> -->
    </div>
  </nav>

  <!-- Registration Form -->
  <div class="flex justify-center items-center flex-1 mt-4" id="container">
    <form class="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">Fill missed info</h2>

      <!-- First Name -->
      <label class="block text-sm mb-4">
        <span class="text-gray-700 dark:text-gray-400">Email</span>
        <div class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
          <input
            type="email"
            class="block w-full pl-10 mt-1  text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
            v-model="userEmail"
            disabled
          />
          <!-- <div class="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
            <svg class="w-5 h-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 12c2.667 0 4-1.333 4-4s-1.333-4-4-4-4 1.333-4 4 1.333 4 4 4zM12 14c-3.333 0-10 1.667-10 5v2h20v-2c0-3.333-6.667-5-10-5z"></path>
            </svg>
          </div> -->
          <div class="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
            <svg class="w-5 h-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M2 3h20a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM2 7l10 6 10-6" />
            </svg>
          </div>

        </div>
      </label>

      <!-- First Name -->
      <label class="block text-sm mb-4">
        <span class="text-gray-700 dark:text-gray-400">First Name</span>
        <div class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
          <input
            type="text"
            class="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
            placeholder="Enter firstname"
            autofocus
            pattern="[A-Za-z]+"
            title="Firstname should only contain letters (A-Z, a-z)."
            required
          />
          <div class="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
            <svg class="w-5 h-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 12c2.667 0 4-1.333 4-4s-1.333-4-4-4-4 1.333-4 4 1.333 4 4 4zM12 14c-3.333 0-10 1.667-10 5v2h20v-2c0-3.333-6.667-5-10-5z"></path>
            </svg>
          </div>
        </div>
      </label>

      <!-- First Name -->
      <label class="block text-sm mb-4">
        <span class="text-gray-700 dark:text-gray-400">Lastname</span>
        <div class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
          <input
            type="text"
            class="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
            placeholder="Enter lastname"
            pattern="[A-Za-z]+"
            title="Lastname should only contain letters (A-Z, a-z)."
            required
          />
          <div class="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
            <svg class="w-5 h-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 12c2.667 0 4-1.333 4-4s-1.333-4-4-4-4 1.333-4 4 1.333 4 4 4zM12 14c-3.333 0-10 1.667-10 5v2h20v-2c0-3.333-6.667-5-10-5z"></path>
            </svg>
          </div>
        </div>
      </label>

      <!-- Gender -->
      <label class="block text-sm mb-4">
        <span class="text-gray-700 dark:text-gray-400">Gender</span>
        <div class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
          <select
            class="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <div class="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
            <svg class="w-5 h-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </div>
        </div>
      </label>

      <!-- Birthdate -->
      <label class="block text-sm mb-6">
        <span class="text-gray-700 dark:text-gray-400">Birthdate</span>
        <div class="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
          <input
            type="date"
            class="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
            required
          />
          <div class="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
            <svg class="w-5 h-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M5 4h14M7 9h10M7 14h10m-5 5h5"></path>
            </svg>
          </div>
        </div>
      </label>

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

<script>
// import axios from 'axios';

export default{

  data(){
    return{
      userEmail:''
    }
  },
  mounted(){
    const storedEmail=localStorage.getItem('seeker_email');
    if(storedEmail){
      return this.userEmail=storedEmail;
    }
  }
}
</script>

<style scoped>
  @media(max-width:600px){
    #container{
      margin-left:20px;
      margin-right:20px;
    }
  }
</style>