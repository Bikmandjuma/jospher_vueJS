<template>
  <div v-if="!isLoading">
    <!-- Navbar -->
    <nav class="bg-white shadow-xl dark:bg-gray-800 sticky top-0 z-50">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="/" class="text-2xl font-bold text-blue-500" style="display: flex;">
          <img
            aria-hidden="true"
            class="object-cover dark:hidden"
            src="../assets/Homepage_images/logo.png"
            alt="Office" style="height: 60px;width:60px;"
          />
          <div id="title_name">
            <span class="text-red-400">Job</span>&nbsp;<span class="text-purple-900">Sphere</span>&nbsp;<span style="color: black;">Rwanda</span>
          </div>
        </a>
        <div class="hidden md:flex space-x-6">
          <a
            href="/"
            :class="{'active-link': $route.path === '/'}"
            class="text-gray-600 hover:text-blue-500"
          >
            <i class="fa fa-home mr-2"></i>Home
          </a>
          <a
            href="/about"
            :class="{'active-link': $route.path === '/about'}"
            class="text-gray-600 hover:text-blue-500"
          >
            <i class="fa fa-list-alt mr-2"></i>About us
          </a>
          <a
            href="/services"
            :class="{'active-link': $route.path === '/services'}"
            class="text-gray-600 hover:text-blue-500"
          >
            <i class="fas fa-cogs mr-2"></i>Services
          </a>
          <a
            href="/jobs"
            :class="{'active-link': $route.path === '/jobs'}"
            class="text-gray-600 hover:text-blue-500"
          >
            <i class="fa fa-wrench mr-2"></i>Jobs
          </a>
          <a
            href="/pricing"
            :class="{'active-link': $route.path === '/pricing'}"
            class="text-gray-600 hover:text-blue-500"
          >
            <i class="fa fa-dollar mr-2"></i>Pricing
          </a>
          <a
            href="/contact"
            :class="{'active-link': $route.path === '/contact'}"
            class="text-gray-600 hover:text-blue-500"
          >
            <i class="fa fa-phone mr-2"></i>Contact
          </a>
          <a
            href="/login"
            :class="{
              'active-link': $route.path === '/login' || $route.path === '/register' || $route.path === '/forgot_password',
            }"
            class="text-gray-600 hover:text-blue-500"
          >
            <i class="fa fa-user mr-2"></i>Login
          </a>
         
        </div>
        <button
          @click="toggleMenu"
          class="md:hidden text-gray-600 hover:text-blue-500 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-show="isMenuOpen" class="bg-gray-50 md:hidden">
        <a
          href="/"
          :class="{'active-link': $route.path === '/'}"
          class="block text-gray-600 px-4 py-2 hover:bg-blue-100"
        >
          <i class="fa fa-home mr-2"></i>Home
        </a>
        <a
          href="/about"
          :class="{'active-link': $route.path === '/about'}"
          class="block text-gray-600 px-4 py-2 hover:bg-blue-100"
        >
          <i class="fa fa-list-alt mr-2"></i>About us
        </a>
        <a
          href="/services"
          :class="{'active-link': $route.path === '/services'}"
          class="block text-gray-600 px-4 py-2 hover:bg-blue-100"
        >
          <i class="fa fa-cogs mr-2"></i>Services
        </a>
        <a
          href="/jobs"
          :class="{'active-link': $route.path === '/jobs'}"
          class="block text-gray-600 px-4 py-2 hover:bg-blue-100"
        >
          <i class="fa fa-wrench mr-2"></i>Jobs
        </a>
        <a
          href="/pricing"
          :class="{'active-link': $route.path === '/pricing'}"
          class="block text-gray-600 px-4 py-2 hover:bg-blue-100"
        >
          <i class="fa fa-dollar mr-2"></i>Pricing
        </a>
        <a
          href="/contact"
          :class="{'active-link': $route.path === '/contact'}"
          class="block text-gray-600 px-4 py-2 hover:bg-blue-100"
        >
          <i class="fa fa-phone mr-2"></i>Contact
        </a>
        
        <a
          href="/login"
          :class="{
            'active-link': $route.path === '/login' || $route.path === '/register' || $route.path === '/forgot_password',
          }"
          class="block text-gray-600 px-4 py-2 hover:bg-blue-100"
        >
          <i class="fa fa-user mr-2"></i>Login
        </a>

      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow">
      <slot></slot>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-6">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; 2024 Job-sphere-rwanda. All rights reserved.</p>
        <div class="mt-4 space-x-4">
          <a href="#" class="text-blue-400 hover:underline">Privacy Policy</a>
          <a href="#" class="text-blue-400 hover:underline">Terms of Service</a>
          <a href="#" class="text-blue-400 hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  </div>

   <!-- Loading Screen -->
  <div v-else class="flex items-center justify-center h-screen bg-gray-100">
    <!-- <p class="text-lg font-semibold text-gray-500">Loading...</p> -->
    <img src="../assets/Homepage_images/logo.png" style="width: 160px;height: 200px;">
  </div>

</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      isMenuOpen: false, // Tracks mobile menu state
      isLoading: true, // Tracks loading state

    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen; // Toggle menu visibility
    },
  },

  mounted() {
    // Simulate a delay of 3 seconds
    setTimeout(() => {
      // @ts-ignore
      this.isLoading = false; // Stop loading after 3 seconds
    },1000);
  },
  
};
</script>

<style scoped>
#title_name {
  position: absolute;
  margin-left: 50px;
  margin-top: 15px;
  
}

a {
  text-decoration: none;
}

.active-link {
  font-weight: bold;
  color: blueviolet !important;
  border-top: 2px solid purple;
  border-bottom: 2px solid blueviolet;
}
</style>
