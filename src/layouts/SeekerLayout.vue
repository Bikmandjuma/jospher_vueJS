<template>
  <div :class="['flex h-screen antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light', { dark: isDark }]">
    
    <!-- Loading Screen -->
    <div v-show="loading" class="fixed inset-0 z-50 flex items-center justify-center text-2xl font-semibold text-white bg-primary-darker">
      Loading.....
    </div>

    <!-- Sidebar -->
    <aside class="flex-shrink-0 hidden w-64 bg-white border-r dark:border-primary-darker dark:bg-darker md:block">
      <div class="flex flex-col h-full">
        <nav aria-label="Main" class="flex-1 px-2 py-4 space-y-2 overflow-y-hidden hover:overflow-y-auto">
          
          <!-- Dashboards links -->
          <div>
            <a
              href="#"
              @click.prevent="toggleSubMenu('dashboard')"
              class="flex items-center p-2 text-gray-500 transition-colors rounded-md dark:text-light hover:bg-primary-100 dark:hover:bg-primary"
              :class="{'bg-primary-100 dark:bg-primary': isActive.dashboard || open.dashboard}"
              aria-haspopup="true"
              :aria-expanded="(open.dashboard || isActive.dashboard) ? 'true' : 'false'"
            >
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span class="ml-2 text-sm">Dashboards</span>
            </a>
          </div>

          <!-- Components links -->
          <div>
            <a
              href="#"
              @click.prevent="toggleSubMenu('components')"
              class="flex items-center p-2 text-gray-500 transition-colors rounded-md dark:text-light hover:bg-primary-100 dark:hover:bg-primary"
              :class="{'bg-primary-100 dark:bg-primary': isActive.components || open.components}"
              aria-haspopup="true"
              :aria-expanded="(open.components || isActive.components) ? 'true' : 'false'"
            >
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span class="ml-2 text-sm">Components</span>
            </a>
            <div v-show="open.components" class="mt-2 space-y-2 px-7">
              <a href="#" class="block p-2 text-sm text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-light">Alerts (soon)</a>
            </div>
          </div>
        </nav>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 h-full overflow-x-hidden overflow-y-auto">
      <header class="relative bg-white dark:bg-darker">
        <div class="flex items-center justify-between p-2 border-b dark:border-primary-darker">
          <button @click="toggleMobileMenu" class="p-1 transition-colors duration-200 rounded-md text-primary-lighter bg-primary-50 hover:text-primary hover:bg-primary-100 dark:hover:text-light dark:hover:bg-primary-dark dark:bg-dark md:hidden focus:outline-none focus:ring">
            <span class="sr-only">Open main menu</span>
            <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <a href="#" class="inline-block text-2xl font-bold tracking-wider uppercase text-primary-dark dark:text-light">Jospher</a>

          <!-- User Avatar and Dropdown -->
          <div class="relative">
            <button @click="toggleDropdown" class="transition-opacity duration-200 rounded-full focus:outline-none focus:ring dark:focus:opacity-100">
              <img class="w-10 h-10 rounded-full" src="build/images/avatar.jpg" alt="Ahmed Kamel" />
            </button>

            <!-- Dropdown Menu -->
            <div v-show="dropdownOpen" class="absolute right-0 w-48 py-1 bg-white rounded-md shadow-lg top-12 ring-1 ring-black ring-opacity-5 dark:bg-dark">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-primary">Info</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-primary">Profile</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-primary">Logout</a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <!-- Content header -->
        <div class="flex items-center justify-between px-4 py-4 border-b lg:py-6 dark:border-primary-darker">
          <h1 class="text-2xl font-semibold">Dashboard</h1>
        </div>
      </main>
    </div>

    <!-- Mobile Menu -->
    <nav v-show="isMobileMainMenuOpen" class="absolute top-16 inset-x-4 md:hidden z-50 flex flex-col items-center p-4 bg-white rounded-md shadow-lg dark:bg-darker">
      <div class="space-y-2">
        <!-- Dashboards Link -->
        <a
          href="#"
          @click.prevent="toggleSubMenu('dashboard')"
          class="flex items-center p-2 text-gray-500 transition-colors rounded-md dark:text-light hover:bg-primary-100 dark:hover:bg-primary"
          :class="{'bg-primary-100 dark:bg-primary': isActive.dashboard || open.dashboard}"
        >
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="ml-2 text-sm">Dashboards</span>
        </a>

        <!-- Components Link -->
        <a
          href="#"
          @click.prevent="toggleSubMenu('components')"
          class="flex items-center p-2 text-gray-500 transition-colors rounded-md dark:text-light hover:bg-primary-100 dark:hover:bg-primary"
          :class="{'bg-primary-100 dark:bg-primary': isActive.components || open.components}"
        >
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span class="ml-2 text-sm">Components</span>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      isDark: false,
      dropdownOpen: false,
      isMobileMainMenuOpen: false,
      open: {
        dashboard: false,
        components: false,
      },
      isActive: {
        dashboard: false,
        components: false,
      }
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    toggleMobileMenu() {
      this.isMobileMainMenuOpen = !this.isMobileMainMenuOpen;
    },
    toggleSubMenu(menu) {
      this.open[menu] = !this.open[menu];
      this.isActive[menu] = this.open[menu];
    },
  },
  mounted() {
    this.loading = false;
  }
};
</script>

<style scoped>
/* Scoped styles if needed */
</style>
