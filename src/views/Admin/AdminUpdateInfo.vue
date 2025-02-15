<template>
    <div>
      <!-- Profile Section -->
      <section class="section profile">
        <div class="flex flex-wrap m-2">
          <!-- User Info Edit Form -->
          <div class="w-full xl:w-1/4 mb-4">
            
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

                <!-- <div
                    v-if="errorMessages"
                    class="p-2 mb-4 text-sm text-white bg-red-500 rounded-lg text-center justify-center items-center"
                    role="alert"
                >

                    <i class="fa fa-exclamation-circle"></i>&nbsp;{{ errorMessages }}

                </div> -->
                <div v-if="errorMessages.length" class="error-container">
                    <ul class="p-2 mb-4 text-sm text-white bg-red-500 rounded-lg text-center justify-center items-center">
                        <li v-for="(message, index) in errorMessages" :key="index"><i class="fa fa-exclamation-circle"></i>&nbsp;{{ message }}</li>
                    </ul>
                </div>

                <form @submit.prevent="updateUserInfo">
                    <!-- Flex container to split left and right -->
                    <div class="flex flex-wrap">
                        <!-- Left Column -->
                        <div class="w-full xl:w-2/4 px-4">
                            <div class="space-y-4">
                                <!-- <div>
                                <label class="block font-medium" for="user_name">User Name</label>
                                <input
                                    v-model="editForm.user_name"
                                    id="user_name"
                                    type="text"
                                    class="w-full border rounded p-2"
                                    placeholder="Enter user name"
                                />
                                </div> -->
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
                                    v-model="editForm.dob"
                                    id="birthdate"
                                    type="date"
                                    class="w-full border rounded p-2"
                                />
                                </div>

                                <div class="mt-4 pt-3 text-center justify-center items-center">
                                    <label class="block font-medium"></label>

                                    <button
                                    type="submit"
                                    class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                                    >
                                    Save Info <i class="fa fa-save"></i>
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
  name: 'AdminUpdateInfo',
  data() {
    return {
      
      editForm: {
        firstname: '',
        lastname: '',
        gender: '',
        phone: '',
        email: '',
        dob: '',
      },
      msg_update_info:'',
      errorMessages:[]
    };
  },
  methods: {

    fetchUserData(token) {
      axios
        .get(`${laravelApiUrl}/admin/view_info`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data?.user_info) {
            const userInfo = response.data.user_info;

            // Ensure the birthdate is formatted correctly
            if (userInfo.dob) {
              const date = new Date(userInfo.dob);
              userInfo.dob= date.toISOString().split('T')[0]; // Format to 'YYYY-MM-DD'
            }

            this.editForm = { ...userInfo };
          } else {
            console.error('User data not found');
          }
        })
        .catch((error) => console.error('Error fetching user data:', error));
    },


    updateUserInfo() {
      const token = localStorage.getItem('auth_token');
      axios
        .post(`${laravelApiUrl}/admin/update_info`, this.editForm, {
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

                const errorMessages = Object.values(error.response.data.errors).flat();
                
                this.errorMessages = errorMessages;

                if (this.errorMessages) {
                    setTimeout(() => {
                        this.errorMessages =[];
                    }, 5000);
                }

            } else {
                alert('An unexpected error occurred.try again');
            }
        });
    },

  },
  mounted() {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.$router.push({ name: 'Login' });
    } else {
      this.fetchUserData(token);
    }

    this.msg_update_info = localStorage.getItem('info_updated') || '';

    if (this.msg_update_info) {
        setTimeout(() => {
            this.msg_update_info = '';
            localStorage.removeItem('info_updated');
            this.$router.push({ name: 'AdminInformation' });
        }, 5000);
    }

  },
};
</script>