<template>
  <div>
    <!-- Content -->
    <div class="mt-2">
      <!-- State cards -->
      <div class="grid grid-cols-1 gap-8 p-4 lg:grid-cols-2 xl:grid-cols-4">
        <!-- Value card -->
        <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
          <div>
            <h6 class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
              All users
            </h6>
            <span class="text-xl font-semibold">{{ Counts_all_users }}</span>
          </div>
          <div>
            <span class="fa fa-users w-11 h-11 text-gray-300 dark:text-primary-dark"></span>
          </div>
        </div>

        <!-- Users card -->
        <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
          <div>
            <h6 class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
              Paid users
            </h6>
            <span class="text-xl font-semibold">0</span>
          </div>
          <div>
            <span class="fa fa-users w-11 h-11 text-gray-300 dark:text-primary-dark"></span>
          </div>
        </div>

        <!-- Orders card -->
        <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
          <div>
            <h6 class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
              User joined today
            </h6>
            <span class="text-xl font-semibold">{{ UsersJoinedToday }}</span>
          </div>
          <div>
            <span class="fa fa-users w-11 h-11 text-gray-300 dark:text-primary-dark"></span>
          </div>
        </div>

        <!-- Tickets card -->
        <div class="flex items-center justify-between p-4 bg-white rounded-md dark:bg-darker">
          <div>
            <h6 class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase dark:text-primary-light">
              Online users
            </h6>
            <span class="text-xl font-semibold">{{ onlineUsers }}</span>
          </div>
          <div>
            <span class="fa fa-user w-11 h-11 text-gray-300 dark:text-primary-dark"></span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {laravelApiUrl} from '../../api';

export default {
  name: 'AdminDashboard',
  data(){
    return{
      onlineUsers: 0,
      UsersJoinedToday: 0,
      Counts_all_users:0,
    }
  },

  mounted() {
    this.fetchOnlineUsers();
    this.fetchUserJoinedToday();
    this.CountAllUsers();

    // Auto-refresh every 5 seconds
    setInterval(this.fetchOnlineUsers, 2000);
    setInterval(this.fetchUserJoinedToday, 2000);
    setInterval(this.CountAllUsers, 2000);
  },

  methods: {
  
    async CountAllUsers(){
      try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
          console.error('No auth token found');
          return;
        }

        const response = await axios.get(`${laravelApiUrl}/admin/count_seekers`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }

        });

        console.log('Counts all users :', response.data);
        this.Counts_all_users = response.data.seeker_counts;
      } catch (error) {
        console.error('Error fetching online users:', error.response ? error.response.data : error.message);
      }
    },
    async fetchUserJoinedToday(){
      try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
          console.error('No auth token found');
          return;
        }

        const response = await axios.get(`${laravelApiUrl}/admin/count_seekers_today`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }

        });

        console.log('Users joined today:', response.data);
        this.UsersJoinedToday = response.data.seeker_counts_today;
      } catch (error) {
        console.error('Error fetching online users:', error.response ? error.response.data : error.message);
      }
    },
    async fetchOnlineUsers() {
      try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
          console.error('No auth token found');
          return;
        }

        const response = await axios.get(`${laravelApiUrl}/admin/count_online_users`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }

        });

        console.log('Online Users:', response.data);
        this.onlineUsers = response.data.online_users;
      } catch (error) {
        console.error('Error fetching online users:', error.response ? error.response.data : error.message);
      }
    }


  },
};
</script>

<style scoped>

</style>
