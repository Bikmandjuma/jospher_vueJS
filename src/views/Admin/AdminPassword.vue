<template>
    <div>
      <!-- Profile Section -->
      <section class="section profile">
        <div class="flex flex-wrap m-2">
          <!-- User Info Edit Form -->
          <div class="w-full xl:w-1/4 mb-4">
            
          </div>
  
          <!-- Password Update Form -->
          <div class="w-full xl:w-2/4 mb-4">
            <div class="card border rounded-lg shadow-md">
              <div class="card-body pt-3">
                <div class="space-y-4">
                  <!-- Success Message -->
                  <div
                    v-if="msg_password"
                    class="p-2 mb-4 text-sm text-white bg-blue-500 rounded-lg text-center"
                    role="alert"
                  >
                    <i class="fa fa-exclamation-circle"></i>&nbsp;{{ msg_password }}
                  </div>
  
                  <!-- Error Messages -->
                  <div v-if="errorMessages.length" class="error-container">
                    <ul class="p-2 mb-4 text-sm text-white bg-red-500 rounded-lg text-center">
                      <li v-for="(message, index) in errorMessages" :key="index">
                        <i class="fa fa-exclamation-circle"></i>&nbsp;{{ message }}
                      </li>
                    </ul>
                  </div>
  
                  <!-- Password Form -->
                  <form @submit.prevent="passwordModification">
                    <div class="space-y-4">
                      <div>
                        <label class="block font-medium" for="current_password">Current Password</label>
                        <input
                          v-model="passwordForm.current_password"
                          id="current_password"
                          type="password"
                          class="w-full border rounded p-2"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div>
                        <label class="block font-medium" for="new_password">New Password</label>
                        <input
                          v-model="passwordForm.new_password"
                          id="new_password"
                          type="password"
                          class="w-full border rounded p-2"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label class="block font-medium" for="confirm_new_password">Confirm New Password</label>
                        <input
                          v-model="passwordForm.confirm_new_password"
                          id="confirm_new_password"
                          type="password"
                          class="w-full border rounded p-2"
                          placeholder="Re-enter new password"
                        />
                      </div>
                      <div class="mt-4 text-center">
                        <button
                          type="submit"
                          class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                        >
                          Submit Data <i class="fa fa-save"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { laravelApiUrl } from "../../api";
  
  export default {
    name: "AdminPassword",
    data() {
      return {

        passwordForm: {
          current_password: "",
          new_password: "",
          confirm_new_password: "",
        },
        msg_password: "",
        errorMessages: [],
      };
    },
    methods: {
      passwordModification() {
        const token = localStorage.getItem("auth_token");
        axios
          .post(`${laravelApiUrl}/admin/update_password`, this.passwordForm, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            if (response.data.status === "success") {
              localStorage.setItem("password_changed", "Password modified successfully.");
              window.location.reload();
            }
          })
   
        .catch((error) => {
            console.error('Error updating user info:', error);
            console.log('Full Error Response:', error.response);

            if (error.response?.data?.errors) {
                const errorMessages = Object.values(error.response.data.errors).flat();
                this.errorMessages = errorMessages;

                if (this.errorMessages) {
                    setTimeout(() => {
                        this.errorMessages = [];
                    }, 5000);
                }
            } else if (error.response?.data?.message) {
                this.errorMessages = [error.response.data.message];
                setTimeout(() => {
                    this.errorMessages = [];
                }, 5000);
            } else {
                this.errorMessages = ['An unexpected error occurred. Please try again.'];
            }
        });

      },

    },
    mounted() {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        this.$router.push({ name: "Login" });
      } 
        
      this.msg_password = localStorage.getItem("password_changed") || "";
      if (this.msg_password) {
        setTimeout(() => {
          this.msg_password = "";
          localStorage.removeItem("password_changed");
        //   this.$router.push({ name: "SeekerInformation" });
        }, 5000);
      }
    },
  };
  </script>  