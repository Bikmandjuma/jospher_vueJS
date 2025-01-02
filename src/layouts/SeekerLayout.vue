<template>
  <div :class="['flex h-screen antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light']">

    <!-- Sidebar -->
    <aside class="flex-shrink-0 hidden w-64 bg-white border-r dark:border-primary-darker dark:bg-darker md:block">
      <div class="flex flex-col h-full">
        <nav aria-label="Main" class="flex-1 px-2 py-4 space-y-2 overflow-y-hidden hover:overflow-y-auto">
          
          <!-- Dashboards links -->
          <div>
            <a class="flex items-center justify-center p-2 text-gray-500 transition-colors rounded-md dark:text-light hover:bg-primary-100 dark:hover:bg-primary" style="font-style: italic;font-weight: bold;font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
              {{ truncatedUserName }}
            </a>
            
            <router-link
              to="/seeker/dashboard"
              class="flex items-center p-2 text-gray-500 transition-colors rounded-md dark:text-light hover:bg-primary-100 dark:hover:bg-primary"
              aria-haspopup="true"
            >
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span class="ml-2 text-sm">Dashboard</span>
            </router-link>
          </div>

          <!-- jobs links -->
          <div>
            <router-link
              to="#"
              @click.prevent="toggleSubMenu('jobs')"
              class="flex items-center p-2 text-gray-500 transition-colors rounded-md dark:text-light hover:bg-primary-100 dark:hover:bg-primary"
              :class="{'bg-primary-100 dark:bg-primary': isActive.jobs || open.jobs}"
              aria-haspopup="true"
              :aria-expanded="(open.jobs || isActive.jobs) ? 'true' : 'false'"
            >
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span class="ml-2 text-sm">Jobs</span>
            </router-link>
            <div v-show="open.jobs" class="mt-2 space-y-2 px-7">
              <router-link to="/seeker/job_category" class="block p-2 text-sm text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-light">Categories</router-link>
              <router-link to="/seeker/job_position" class="block p-2 text-sm text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-light">Positions</router-link>
            </div>
          </div>

          <div>
            <router-link
              to="#"
              @click.prevent="toggleSubMenu('pricing')"
              class="flex items-center p-2 text-gray-500 transition-colors rounded-md dark:text-light hover:bg-primary-100 dark:hover:bg-primary"
              :class="{'bg-primary-100 dark:bg-primary': isActive.pricing || open.pricing}"
              aria-haspopup="true"
              :aria-expanded="(open.pricing || isActive.pricing) ? 'true' : 'false'"
            >
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span class="ml-2 text-sm">Pricing</span>
            </router-link>
            <div v-show="open.pricing" class="mt-2 space-y-2 px-7">
              <router-link to="#payment" class="block p-2 text-sm text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-light">Payment</router-link>
              <router-link to="#history" class="block p-2 text-sm text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-light">History</router-link>
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

          <router-link to="#" class="inline-block text-2xl font-bold tracking-wider uppercase text-primary-dark dark:text-light">Job_sphere</router-link>
          <!-- <div>
            <form action="#">
              <label :data-state="state" for="search">
                <input type="text" placeholder="Search job category ...." @click="state = 'opan'" @blur="state='close'"/>
                <i class="fa fa-search" aria-hidden="true"></i>
              </label>
            </form>
          </div> -->
          <!-- User Avatar and Dropdown -->
          <div class="relative">
            <button @click="toggleDropdown" class="transition-opacity duration-200 rounded-full focus:outline-none focus:ring dark:focus:opacity-100">
              <img 
                  style="border: 2px solid gray;"
                  class="rounded-full w-10 h-10 mx-auto"
                  :src="userData.image ? require(`../assets/seeker_style/images/${userData.image}`) : require('../assets/seeker_style/images/user.png')"
                  alt="User Image"
                />
            </button>

            <!-- Dropdown Menu -->
            <div v-show="dropdownOpen" class="absolute right-0 w-48 py-1 bg-white rounded-md shadow-lg top-12 ring-1 ring-black ring-opacity-5 dark:bg-dark">
              <router-link to="/seeker/information" class="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-primary"><i class="fa fa-list-alt"></i>&nbsp;Info</router-link>
              <router-link to="/seeker/profile" class="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-primary"><i class="fa fa-image"></i>&nbsp;Profile</router-link>
              <router-link to="#" class="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-primary openModal" @click="openModal"><i class="fa fa-lock"></i>&nbsp;Logout</router-link>
            </div>
          </div>
        </div>
      </header>

      <main class="flex-grow">
            <div class="flex items-center justify-between px-4 py-4 border-b lg:py-6 dark:border-primary-darker">
              <h1 class="text-2xl font-semibold">{{ pageTitle }}</h1>
              <router-link
                to="#notific"
                class="px-4 py-2 text-sm text-white rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-dark"
              >
                <i class="fa fa-bell"></i>&nbsp;Notification
              </router-link>
            </div>

        <slot></slot>
      </main>
    </div>

    <!-- Mobile Menu -->
    <nav v-show="isMobileMainMenuOpen" class="absolute top-16 inset-x-4 md:hidden z-50 flex flex-col items-center p-4 bg-white rounded-md shadow-lg dark:bg-darker">
      <div class="space-y-2">
        <!-- Dashboards Link -->
         <a class="flex items-center justify-center p-2 text-gray-700 transition-colors rounded-md dark:text-light hover:bg-primary-100 dark:hover:bg-primary"  style="font-weight: bold;font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
          {{ truncatedUserName }}
         </a>
         <router-link
          to="/seeker/dashboard"
          class="flex items-center p-2 text-gray-500 transition-colors rounded-md dark:text-light hover:bg-primary-100 dark:hover:bg-primary"
        >
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="ml-2 text-sm">Dashboard</span>
        </router-link>

        <!-- job Link -->
        <router-link
          to="#"
          @click.prevent="toggleSubMenu('jobs')"
          class="flex items-center p-2 text-gray-500 transition-colors rounded-md dark:text-light hover:bg-primary-100 dark:hover:bg-primary"
          :class="{'bg-primary-100 dark:bg-primary': isActive.jobs || open.jobs}"
        >
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span class="ml-2 text-sm">Jobs</span>
        </router-link>
        <div v-show="open.jobs" class="mt-2 space-y-2 px-7">
          <router-link to="/seeker/job_category" class="block p-2 text-sm text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-light">Categories</router-link>
          <router-link to="/seeker/job_position" class="block p-2 text-sm text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-light">Positions</router-link>
        </div>

        <!-- job Link -->
        <router-link
          to="#"
          @click.prevent="toggleSubMenu('pricing')"
          class="flex items-center p-2 text-gray-500 transition-colors rounded-md dark:text-light hover:bg-primary-100 dark:hover:bg-primary"
          :class="{'bg-primary-100 dark:bg-primary': isActive.pricing || open.pricing}"
        >
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span class="ml-2 text-sm">Pricing</span>
        </router-link>
        <div v-show="open.pricing" class="mt-2 space-y-2 px-7">
          <router-link to="#payment" class="block p-2 text-sm text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-light">Payment</router-link>
          <router-link to="#history" class="block p-2 text-sm text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-light">History</router-link>
        </div>
      </div>
    </nav>
  </div>

    <div ref="modal" class="modal">
      <div class="modal-content text-center">
        <h3><u>Confirm Logout</u></h3>
        <p class="mt-2">Are you sure you want to log out of the system?</p>
        <div class="modal-actions text-center">
          <button class="btn btn-primary" @click="logout"><i class="fa fa-check"></i>&nbsp;Yes</button>&nbsp;&nbsp;
          <button class="btn btn-danger text-right" ref="closeModal"><i class="fa fa-exclamation-circle"></i>&nbsp;Not now</button>
        </div>
      </div>
    </div>
        
</template>

<script>
import { laravelApiUrl } from '../api';
import axios from 'axios';

export default {
  data() {
    return {
      state: "close",
      dropdownOpen: false,
      isMobileMainMenuOpen: false,
      open: {
        dashboard: false,
        jobs: false,
        pricing: false,
      },
      isActive: {
        dashboard: false,
        jobs: false,
        pricing: false,
      },
      userData: {
        user_name: '',
        image: ''
      }
    };
  },
  computed:{
    pageTitle(){
      return this.$route.meta.pageTitle || "defult pageTitle"
    },
    truncatedUserName() {
      if (!this.userData.user_name) return '.....';
      return this.userData.user_name.length > 20 
        ? this.userData.user_name.substring(0, 20) + '...' 
        : this.userData.user_name;
    }
  },
  mounted(){
    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.$router.push({name:'/login'});
    }else{
      this.fetchUserData(token);
    }

  },
  methods: {
    fetchUserData(token) {
      axios
        .get(`${laravelApiUrl}/user/view_info`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          console.log(response.data); // Log the response data
          if (response.data && response.data.user_info) {
            this.userData = response.data.user_info;
          } else {
            console.error('User data not found in response');
          }
        })
        .catch((error) => {
          console.error("There was an error fetching the user data:", error);
          if (error.response && error.response.status === 401) {
            this.$router.push({ name: 'Login' });
          }
        });
    },
    formatDate(dateString) {
      // Format date if it's provided, else return N/A
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleDateString(); // You can modify this to a custom format
    },
    logout() {
      
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_email');
      localStorage.removeItem('user_id');
      
      console.log('User logged out.');

      // @ts-ignore
      window.location.href = '/login';
    },
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
    openModal() {
      const modal = this.$refs.modal;
      const closeModalButton = this.$refs.closeModal;

      if (modal && closeModalButton) {
        // @ts-ignore
        modal.style.display = 'flex';

        // @ts-ignore
        closeModalButton.addEventListener('click', () => {
          // @ts-ignore
          modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
          if (event.target === modal) {
            // @ts-ignore
            modal.style.display = 'none';
          }
        });
      }
    },
  },
  
};
</script>


<style scoped>
  /* Scoped styles if needed */
  a{
    text-decoration: none;
  }


  .modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 10px;
    border: 1px solid #888;
    width: 30%;
    height: 30%;
  }

  @media(max-width:600px){
      .modal {
          display: none;
          position: fixed;
          z-index: 1;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgb(0, 0, 0);
          background-color: rgba(0, 0, 0, 0.4);
      }

      .modal-content {
          background-color: #fefefe;
          margin: 0% auto;
          width: 90%;
          margin-top:30% ;
          height: 28%;
          margin-bottom:5% ;
          border: 1px solid #888;
      }   
  }

  .close {
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  /*=======================
  Search form css
  =========================*/

  /* @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"); */
/* body{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #F0AD4E;
} */
label{
  position: relative;
  display: inline-block;
  background-color: #fff;
  padding: 5px 12px;
  transition: all 1s ease;
  border-radius: 0;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.5);
  &::after{
    content: '';
    display: block;
    height: 2px;
    width: 80%;
    background-color: #F0AD4E;
    transition: all 1s ease 0.5s;
  }
  input{
    transition: width 1s ease, opacity 0.5s ease 0.5s;
    opacity: 1;
    width: 250px;
    height: 25px;
    border: 0;
    outline: none;
    color: darken(#F0AD4E, 25)
  }
  i{
    position: absolute;
    top: 11px;
    right: 11px;
    color: #333;
    cursor: pointer;
  }
  &[data-state="close"]{
    border-radius: 30px;
    padding: 5px 5px;
     transition: all 1s ease;
    &::after{
      width: 0%;
      transition: all 0.3s ease;
    }
    i{
      pointer-events: none;
    }
    input{
      width: 28px;
      height: 25px;
      opacity:0;
      cursor: pointer;
      transition: opacity 0.5s ease, width 1s ease;
      -webkit-appearance:none
    } 
  }
}

</style>
