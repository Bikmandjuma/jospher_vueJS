<template>
  <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900" id="login_container">
    <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
      <div class="flex flex-col overflow-y-auto md:flex-row">
        <div class="h-32 md:h-auto md:w-1/2">
          <img aria-hidden="true" class="object-cover w-full h-full dark:hidden" src="../../assets/Homepage_images/login-office.jpeg" alt="Office" />
          <img aria-hidden="true" class="hidden object-cover w-full h-full dark:block" src="../../assets/Homepage_images/login-office-dark.jpeg" alt="Office" />
        </div>
        <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
          <div class="w-full">
            <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>

            <!-- Error Message -->
            <div v-if="errorMessage" class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
              <i class="fa fa-exclamation-circle"></i> {{ errorMessage }}
            </div>

            <form @submit.prevent="handleLogin">
              <div class="mb-4">
                <label for="emailOrPhone" class="block text-sm font-medium text-gray-700">Email or Phone</label>
                <input v-model="emailOrPhone" id="emailOrPhone" type="text" placeholder="Enter your email or phone"
                  class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" />
              </div>
              <div class="mb-6">
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <input v-model="password" id="password" type="password" placeholder="Enter your password"
                  class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input" />
              </div>

              <!-- Loading Button or Login Button -->
              <button v-if="loading" type="submit" class="w-full px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none">
                Logging......
              </button>

              <button v-else type="submit" class="w-full px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:outline-none">
                Login
              </button>
            </form>

            <hr class="my-8" />
            <div id="forgot_pswd">
              <p class="mt-4">
                <router-link class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline" to="/forgot_password">
                  <i class="fa fa-key"></i>&nbsp;Forgot your password?
                </router-link>
              </p>
              <p class="mt-1">
                <router-link class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline" to="/register">
                  Don't have an account? Sign up
                </router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { laravelApiUrl } from '../../api';

export default {
  data() {
    return {
      emailOrPhone: "",
      password: "",
      errorMessage: null,
      loading: false,
    };
  },

  methods: {
    async handleLogin() {
      this.loading = true;
      this.errorMessage = null;  // Clear previous error message

      if (!this.emailOrPhone || !this.password) {
        this.errorMessage = "Email/Phone and Password are required.";
        setTimeout(() => {
          this.errorMessage = null;
        }, 3000);
        this.loading = false;
        return;
      }

      try {
        const loginData = {
          username: this.emailOrPhone,
          password: this.password,
        };

        const response = await fetch(`${laravelApiUrl}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
          localStorage.setItem("auth_token", data.authorisation.token);

          if (data.role === "admin") {
            console.log("Redirecting to AdminDashboard");
            setTimeout(() => {
              this.loading = false;
              this.$router.push({ name: "AdminDashboard" });
            }, 2000);
          } else if (data.role === "user") {
            console.log("Redirecting to SeekerDashboard");
            setTimeout(() => {
              this.loading = false;
              this.$router.push({ name: "SeekerDashboard" });
            }, 2000);
          } else {
            console.error("Unknown role:", data.role);
            this.errorMessage = "Unknown role. Contact support.";
            setTimeout(() => {
              this.loading = false;
              this.errorMessage = null; // Clear error message after 3 seconds
            }, 3000);
          }

        } else {
          console.error("Login failed:", data);
          this.errorMessage = data.message || "Login failed. Please try again.";
          setTimeout(() => {
            this.loading = false;
            this.errorMessage = null; // Clear error message after 3 seconds
          }, 3000);
        }

      } catch (error) {
        console.error("Login error:", error);
        this.errorMessage = "An unexpected error occurred. Please try again later.";
        setTimeout(() => {
          this.loading = false;
          this.errorMessage = null; // Clear error message after 3 seconds
        }, 3000);
      }
    },
  },
};
</script>

<style scoped>
#login_container{
  margin-top: -40px;
}
#forgot_pswd {
  text-align: center;
}

a {
  text-decoration: none;
}

#forgot_pswd a:hover {
  text-decoration: none;
  color: black;
}

#forgot_pswd {
  align-items: center;
  text-align: center;
}

@media (max-width: 600px) {
  #login_container{
    margin-top: -50px;
  }
}
</style>
