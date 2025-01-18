<template>
    <div>
      <!-- Profile Section -->
      <section class="section profile">
        <div class="flex flex-wrap m-2">
          <!-- User Info Edit Form -->
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
                    <h5 class="font-semibold text-lg mt-4">{{ userData.user_code || '...' }} , {{ userData.user_name || '...' }}</h5>

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
            
          <div class="card border rounded-lg shadow-md">
            <div class="card-body pt-3">
                
                <div
                    v-if="msg_update_info"
                    class="p-2 mb-4 text-sm text-white bg-blue-500 rounded-lg text-center justify-center items-center"
                    role="alert"
                >
                    <i class="fa fa-exclamation-circle"></i>&nbsp;{{ msg_update_info }}
                </div>

                <form @submit.prevent="updateUserInfo">
                    <!-- Flex container to split left and right -->
                    <div class="flex flex-wrap">
                        <!-- Left Column -->
                        <div class="w-full xl:w-2/4 px-4">
                            <div class="space-y-4">
                                <div>
                                <label class="block font-medium" for="user_name">User Name</label>
                                <input
                                    v-model="editForm.user_name"
                                    id="user_name"
                                    type="text"
                                    class="w-full border rounded p-2"
                                    placeholder="Enter user name"
                                />
                                </div>
                                <div>
                                <label class="block font-medium" for="firstname">First Name</label>
                                <input
                                    v-model="editForm.firstname"
                                    id="firstname"
                                    type="text"
                                    class="w-full border rounded p-2"
                                    placeholder="Enter first name"
                                />
                                </div>
                                <div>
                                <label class="block font-medium" for="lastname">Last Name</label>
                                <input
                                    v-model="editForm.lastname"
                                    id="lastname"
                                    type="text"
                                    class="w-full border rounded p-2"
                                    placeholder="Enter last name"
                                />
                                </div>
                                <div>
                                <label class="block font-medium" for="gender">Gender</label>
                                <select
                                    v-model="editForm.gender"
                                    id="gender"
                                    class="w-full border rounded p-2"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                </div>
                            </div>
                        </div>
                        <!-- Right Column -->
                        <div class="w-full xl:w-2/4 px-4">
                            <div class="space-y-4">
                                <div>
                                <label class="block font-medium" for="phone">Phone</label>
                                <input
                                    v-model="editForm.phone"
                                    id="phone"
                                    type="text"
                                    class="w-full border rounded p-2"
                                    placeholder="Enter phone number"
                                />
                                </div>
                                <div>
                                <label class="block font-medium" for="email">Email</label>
                                <input
                                    v-model="editForm.email"
                                    id="email"
                                    type="email"
                                    class="w-full border rounded p-2"
                                    placeholder="Enter email"
                                />
                                </div>
                                <div>
                                <label class="block font-medium" for="birthdate">Birthdate</label>
                                <input
                                    v-model="editForm.birthdate"
                                    id="birthdate"
                                    type="date"
                                    class="w-full border rounded p-2"
                                />
                                </div>

                                <div class="mt-4">
                                    <button
                                    type="submit"
                                    class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                                    >
                                    Save Info
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    
                </form>
            </div>
          </div>
            
        </div>
      </section>
    </div>
  </template>
  
  <script>
import axios from 'axios';
import { laravelApiUrl } from '../../api';

export default {
  name: 'SeekerPassword',
  data() {
    return {
      noCategoriesMessage: 'loading...',
      jobDataCategories: 'loading...',
      isExpanded: false,
      userData: {
        user_code: '',
        user_name: '',
        image: '',
      },
      editForm: {
        user_name: '',
        firstname: '',
        lastname: '',
        gender: '',
        phone: '',
        email: '',
        birthdate: '',
      },
      msg_update_info:'',
    };
  },
  methods: {
    fetchUserCategory(token) {
      axios
        .get(`${laravelApiUrl}/user/fetch_user_job_categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data && response.data.category_names?.length > 0) {
            this.jobDataCategories = response.data.category_names.map((category) => category.skills).join(' | ');
            this.noCategoriesMessage = '';
          } else {
            this.jobDataCategories = '';
            this.noCategoriesMessage = 'Add category';
          }
        })
        .catch((error) => {
          console.error('Error fetching job categories:', error);
          this.noCategoriesMessage = 'Error fetching job categories. Please try again.';
        });
    },

    fetchUserData(token) {
      axios
        .get(`${laravelApiUrl}/user/view_info`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data?.user_info) {
            this.editForm = { ...response.data.user_info };
            this.userData = response.data.user_info;
          } else {
            console.error('User data not found');
          }
        })
        .catch((error) => console.error('Error fetching user data:', error));
    },

    updateUserInfo() {
      const token = localStorage.getItem('auth_token');
      axios
        .post(`${laravelApiUrl}/user/update_info`, this.editForm, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data.status === 'success') {
            localStorage.setItem('info_updated','Info updated successfully')
            window.location.reload();
          } else {
            alert('Failed to update info');
          }
        })
        .catch((error) => {
          console.error('Error updating user info:', error);
          if (error.response?.data?.errors) {
            alert(JSON.stringify(error.response.data.errors));
          } else {
            alert('An unexpected error occurred.');
          }
        });
    },

    toggleExpand() {
      this.isExpanded = !this.isExpanded; // Toggle between showing full or truncated text
    },
  },
  mounted() {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.$router.push({ name: 'Login' });
    } else {
      this.fetchUserData(token);
      this.fetchUserCategory(token);
    }

    this.msg_update_info = localStorage.getItem('info_updated') || '';

    if (this.msg_update_info) {
        setTimeout(() => {
            this.msg_update_info = '';
            localStorage.removeItem('info_updated');
            this.$router.push({ name: 'SeekerInformation' });
        }, 5000);
    }
  },
};
</script>