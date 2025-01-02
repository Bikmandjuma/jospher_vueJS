<template>
  <div>
    <!-- Profile Section -->
    <section class="section profile">
      <div class="flex flex-wrap m-2">
        <!-- Left Section (User Name and Image) -->
        <div class="w-full xl:w-1/4 mb-4">
          <div class="card border rounded-lg shadow-md">
            <div class="card-body p-4">
              <div class="text-center">
                <img 
                  style="border: 1px solid gray;"
                  class="rounded-full w-32 h-32 mx-auto"
                  :src="userData.image ? require(`../../assets/seeker_style/images/${userData.image}`) : require('../../assets/seeker_style/images/user.png')"
                  alt="User Image"
                />
                <router-link to="/seeker/profile"> 
                  <i class="fa fa-pencil editImage text-primary"></i>
                </router-link>
                <h5 class="font-semibold text-lg mt-4">{{ userData.user_name || 'User name' }}</h5>

                <router-link
                  v-if="noCategoriesMessage"
                  to="/seeker/job_category"
                  class="px-4 py-2 text-sm text-primary rounded-md focus:outline-none focus:ring focus:ring-primary"
                >
                  {{ noCategoriesMessage }}
                </router-link>

                <!-- Job Data Categories with More/Less Toggle -->
                <p v-else style="max-height: 160px;overflow: auto;">
                  <span v-if="jobDataCategories.length > 80">
                    {{ isExpanded ? jobDataCategories : jobDataCategories.slice(0, 80) }}...
                    <button 
                      @click="toggleExpand" 
                      class="text-primary font-semibold"
                    >
                      {{ isExpanded ? 'Less' : 'More' }}
                    </button>
                  </span>
                  <span v-else>
                    {{ jobDataCategories }}
                  </span>
                </p>

              </div>
            </div>
          </div>
        </div>

        <!-- Right Section (User Details) -->
        <div class="w-full xl:w-3/4 mb-4">
          <div class="card border rounded-lg shadow-md">
            <div class="card-body pt-3">
              <div class="space-y-4">
                <div class="flex justify-between">
                  <span class="font-medium">First Name</span>
                  <span>{{ userData.firstname || 'loading...' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">Last Name</span>
                  <span>{{ userData.lastname || 'loading...' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">Gender</span>
                  <span>{{ userData.gender || 'loading...' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">Email</span>
                  <span>{{ userData.email || 'loading...' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">Phone</span>
                  <span>{{ userData.phone || 'loading...' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">Birthdate</span>
                  <span>{{ formatDate(userData.birthdate) || 'loading...' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">Joined</span>
                  <span>{{ getDaysAgo(userData.created_at) || 'loading...' }}</span>
                </div>
                <div class="my-4 border-t border-gray-300"></div>
                <div class="flex items-center justify-between px-2 py-2 border-b lg:py-6 dark:border-primary-darker">
                  <!-- <h1 class="text-2xl font-semibold"></h1> -->
                  <router-link
                    to="#password"
                    class="px-4 py-2 text-sm text-white rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-dark"
                  >
                    <i class="fa fa-key"></i>&nbsp;Password
                  </router-link>
                  <router-link
                    to="#notific"
                    class="px-4 py-2 text-sm text-white rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-dark"
                  >
                    <i class="fa fa-pen"></i>&nbsp;Edit Info
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { laravelApiUrl } from '../../api';
import axios from 'axios';
import dayjs from 'dayjs'; // Import dayjs
import relativeTime from 'dayjs/plugin/relativeTime'; // Import relative time plugin

dayjs.extend(relativeTime); // Extend dayjs with the relative time plugin

export default {
  name: 'SeekerInformation',
  data() {
    return {
      noCategoriesMessage: 'loading...',
      jobDataCategories: 'loading...',
      isExpanded: false,  // This tracks whether the text is expanded or truncated
      userData: {
        user_code: '',
        user_name: '',
        firstname: '',
        lastname: '',
        gender: '',
        email: '',
        phone: '',
        birthdate: '',
        created_at: '',
        image: ''
      }
    };
  },
  mounted() {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.$router.push({ name: 'Login' });
    } else {
      this.fetchUserData(token);
      this.fetchUserCategory(token);
    }
  },
  methods: {
    fetchUserCategory(token) {
      axios
        .get(`${laravelApiUrl}/user/fetch_user_job_categories`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          console.log("API job categories", response.data);
          if (response.data && response.data.categories && response.data.categories.length > 0) {
            this.jobDataCategories = response.data.categories.join(' | ');
            this.noCategoriesMessage = '';
          } else {
            this.jobDataCategories = '';
            this.noCategoriesMessage = 'Add category';
          }
        })
        .catch((error) => {
          console.error("Error fetching job categories:", error);
          this.noCategoriesMessage = 'Error fetching job categories. Please try again.';
        });
    },
    fetchUserData(token) {
      axios
        .get(`${laravelApiUrl}/user/view_info`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          console.log(response.data);
          if (response.data && response.data.user_info) {
            this.userData = response.data.user_info;
          } else {
            console.error('User data not found');
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          if (error.response && error.response.status === 401) {
            this.$router.push({ name: 'Login' });
          }
        });
    },
    formatDate(dateString) {
      if (!dateString) return 'loading...';
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
    getDaysAgo(date) {
      if (!dayjs(date).isValid()) return 'loading...';
      return dayjs(date).fromNow(); // Display days ago since the user joined
    },
    toggleExpand() {
      this.isExpanded = !this.isExpanded;  // Toggle between showing full or truncated text
    }
  }
};
</script>

<style scoped>
/* Additional styling for buttons or components can go here */
a{
  text-decoration: none;
}
</style>
