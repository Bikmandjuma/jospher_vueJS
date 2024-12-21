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
                <i class="fa fa-pencil editImage text-primary"></i>
                <h5 class="font-semibold text-lg mt-4">{{ userData.user_name || 'User name' }}</h5>
                <p>Software developer | Technician | Teacher | Machine learning</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Section (User Details) -->
        <div class="w-full xl:w-3/4 mb-4">
          <div class="card border rounded-lg shadow-md">
            <div class="card-body pt-3">
              <div class="space-y-4">
                <!-- User Details Rows -->
                <!-- <div class="flex justify-between">
                  <span class="font-medium">User Code</span>
                  <span>{{ userData.user_code || 'N/A' }}</span>
                </div> -->
                <!-- <div class="flex justify-between">
                  <span class="font-medium">User Name</span>
                  <span>{{ userData.user_name || 'N/A' }}</span>
                </div> -->
                <div class="flex justify-between">
                  <span class="font-medium">First Name</span>
                  <span>{{ userData.firstname || 'N/A' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">Last Name</span>
                  <span>{{ userData.lastname || 'N/A' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">Gender</span>
                  <span>{{ userData.gender || 'N/A' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">Email</span>
                  <span>{{ userData.email || 'N/A' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">Phone</span>
                  <span>{{ userData.phone || 'N/A' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">Birthdate</span>
                  <span>{{ formatDate(userData.birthdate) || 'N/A' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">Joined</span>
                  <!-- Display days ago since the user joined -->
                  <span>{{ getDaysAgo(userData.created_at) || 'N/A' }}</span>
                </div>
                <!-- Add a horizontal line -->
                <div class="my-4 border-t border-gray-300"></div>
                <div class="flex items-center justify-between px-2 py-2 border-b lg:py-6 dark:border-primary-darker">
                  <h1 class="text-2xl font-semibold"></h1>
                  <a
                    href="#notific"
                    class="px-4 py-2 text-sm text-white rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-dark"
                  >
                    <i class="fa fa-pen"></i>&nbsp;Edit Info
                  </a>
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
      editImage:'',
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
    getDaysAgo(date) {
      // If date is not valid, return 'N/A'
      if (!dayjs(date).isValid()) {
        return 'N/A';
      }
      // Otherwise, return the difference in a human-readable format
      // @ts-ignore
      return dayjs(date).fromNow(); // This will return the difference in a human-readable format
    }
  }
};
</script>

<style scoped>
/* Styling for the 'Edit Info' button */
.edit-btn {
  background-color: #4CAF50;
  color: white;
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* Floating 'Edit Info' button to the right */
.edit-btn {
  float: right;
}

/* Style for the horizontal line separating sections */
.border-t {
  border-top-width: 2px;
  border-top-color: #E2E8F0; /* Light gray */
}

/* Optional: Styling for the card body content */
.card-body {
  padding: 1.5rem;
}

a {
  text-decoration: none;
}

.card-body .editImage {
  position: relative;
  padding: 4px;
  background-color: white;
  border: 2px solid white;
  margin-top: -20px;
  border-radius: 50%;
}

.editImage {
  position: relative !important;
  padding: 4px !important;
  background-color: white !important;
  border: 4px solid #eee !important;
  margin-top: -20px !important;
  border-radius: 50% !important;
}

.editImage:hover {
  cursor: pointer;
}

</style>
