<template>
  <div>
    <!-- Navbar -->
    <nav class="bg-white shadow-xl dark:bg-gray-800 sticky top-0 z-50">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="/" class="text-2xl font-bold text-blue-500" style="display: flex;">
          <img
            aria-hidden="true"
            class="object-cover dark:hidden"
            src="../assets/Homepage_images/logo_title.png"
          />
          <!-- <div id="title_name">
            <span class="text-red-400">Job</span>&nbsp;<span class="text-purple-900">Sphere</span>&nbsp;<span style="color: black;">Rwanda</span>
          </div> -->
        </a>
        <div class="hidden md:flex space-x-6">
          <router-link
            to="/"
            :class="{'active-link': $route.path === '/'}"
            class="text-gray-600 hover:text-blue-500"
          >
            <i class="fa fa-home mr-2"></i>Home
          </router-link>
          <!-- <route-link
            to="/about"
            :class="{'active-link': $route.path === '/about'}"
            class="text-gray-600 hover:text-blue-500"
          >
            <i class="fa fa-list-alt mr-2"></i>About us
          </route-link> -->
          <router-link
            to="/about"
            :class="{'active-link': $route.path === '/about'}"
            class="text-gray-600 hover:text-blue-500"
          >
          <i class="fas fa-list-alt mr-2"></i>About
          </router-link>

          <router-link
            to="/services"
            :class="{'active-link': $route.path === '/services'}"
            class="text-gray-600 hover:text-blue-500"
          >
            <i class="fas fa-cogs mr-2"></i>Services
          </router-link>
          
          <router-link
            v-if = " job_position_count.length > 0 "
            to="/jobs"
            :class="{'active-link': $route.path === '/jobs'}"
            class="text-gray-600 hover:text-blue-500"
          >
            <i class="fa fa-briefcase mr-2"></i>Jobs&nbsp;<span class="badge" style="background-color: purple;">{{  job_position_count }}</span>
          </router-link>

          <router-link
            v-else
            to="/jobs"
            :class="{'active-link': $route.path === '/jobs'}"
            class="text-gray-600 hover:text-blue-500"
          >
            <i class="fa fa-briefcase mr-2"></i>Jobs&nbsp;<i class="fas fa-spinner fa-spin"></i>
          </router-link>

          <router-link
            to="/pricing"
            :class="{'active-link': $route.path === '/pricing'}"
            class="text-gray-600 hover:text-blue-500"
          >
            <i class="fa fa-dollar mr-2"></i>Pricing
          </router-link>
          <router-link
            to="/contact"
            :class="{'active-link': $route.path === '/contact'}"
            class="text-gray-600 hover:text-blue-500"
          >
            <i class="fa fa-phone mr-2"></i>Contact
          </router-link>
          <router-link
            to="/login"
            :class="{
              'active-link': $route.path === '/login' || $route.path === '/register' || $route.path === '/forgot_password',
            }"
            class="text-gray-600 hover:text-blue-500"
          >
            <i class="fa fa-user mr-2"></i>Login
          </router-link>
         
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
        <router-link
          to="/"
          :class="{'active-link': $route.path === '/'}"
          class="block text-gray-600 px-4 py-2 hover:bg-blue-100"
        >
          <i class="fa fa-home mr-2"></i>Home
        </router-link>
        <router-link
          to="/about"
          :class="{'active-link': $route.path === '/about'}"
          class="block text-gray-600 px-4 py-2 hover:bg-blue-100"
        >
          <i class="fa fa-list-alt mr-2"></i>About us
        </router-link>
        <router-link
          to="/services"
          :class="{'active-link': $route.path === '/services'}"
          class="block text-gray-600 px-4 py-2 hover:bg-blue-100"
        >
          <i class="fa fa-cogs mr-2"></i>Services
        </router-link>
        <router-link
          to="/jobs"
          :class="{'active-link': $route.path === '/jobs'}"
          class="block text-gray-600 px-4 py-2 hover:bg-blue-100"
        >
          <i class="fa fa-briefcase mr-2"></i>Jobs&nbsp;<span class="badge" style="background-color: purple;">{{  job_position_count }}</span>
        </router-link>
        <router-link
          to="/pricing"
          :class="{'active-link': $route.path === '/pricing'}"
          class="block text-gray-600 px-4 py-2 hover:bg-blue-100"
        >
          <i class="fa fa-dollar mr-2"></i>Pricing
        </router-link>
        <router-link
          to="/contact"
          :class="{'active-link': $route.path === '/contact'}"
          class="block text-gray-600 px-4 py-2 hover:bg-blue-100"
        >
          <i class="fa fa-phone mr-2"></i>Contact
        </router-link>
        
        <router-link
          to="/login"
          :class="{
            'active-link': $route.path === '/login' || $route.path === '/register' || $route.path === '/forgot_password',
          }"
          class="block text-gray-600 px-4 py-2 hover:bg-blue-100"
        >
          <i class="fa fa-user mr-2"></i>Login
        </router-link>

      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow">
      <slot></slot>
    </main>

    <!-- Footer Start -->
    <div class="footer" v-if="!hide_footer_authPages">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-md-6">
                        <div class="footer-contact">
                            <h2>Welcome</h2>
                            <p>
                              <strong>Job Sphere Rwanda</strong>, your one-stop platform for job searching! We gather listings from multiple platforms to help you find opportunities faster. Receive personalized job alerts and never miss an opportunity. Let us help you streamline your job search and focus on landing your dream job.
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="footer-link">
                            <h2>Popular Links</h2>
                            <a href="">About Us</a>
                            <a href="">Contact Us</a>
                            <a href="">Our Service</a>
                            <a href="">Jobs</a>
                            <a href="">Pricing Plan</a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="footer-link">
                            <h2>Useful Links</h2>
                            <a href="">Terms of use</a>
                            <a href="">Privacy policy</a>
                            <a href="">Cookies</a>
                            <a href="">Help</a>
                            <a href="">FQAs</a>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        
                        <div class="footer-contact">
                            <h2>Get In Touch</h2>
                            <p><i class="fa fa-map-marker-alt"></i>&nbsp;KG 576 St , ave 25</p>
                            <!-- <p><i class="fa fa-phone-alt"></i>&nbsp;+250780000000</p> -->
                            <p><i class="fa fa-envelope"></i>&nbsp;jobsphererwanda@gmail.com</p>
                            <div class="footer-social">
                                <a class="btn" href=""><i class="fab fa-twitter"></i></a>
                                <a class="btn" href=""><i class="fab fa-facebook-f"></i></a>
                                <a class="btn" href=""><i class="fab fa-tiktok"></i></a>
                                <a class="btn" href=""><i class="fab fa-instagram"></i></a>
                                <a class="btn" href=""><i class="fab fa-linkedin-in"></i></a>
                                <a class="btn" href=""><i class="fab fa-whatsapp"></i></a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="container copyright">
              <p>Copyright &copy; 2023 - {{ currentYear }} <a href="#">JOB SPHERE RWANDA</a>, All Rights Reserved. <!-- Designed By <a href="#">Savvy coder</a> --></p>
            </div>
        </div>
        <!-- Footer End -->
  </div>
</template>

<script>
import { flaskApiUrl } from "../api";
import axios from "axios";

export default {
  name: "DefaultLayout",
  data() {
    return {
      job_position_count : 0,
      job_category_count : 0,
      isMenuOpen: false,
      hide_footer_authPages:false,
      currentYear: new Date().getFullYear(),
    };
  },
  methods: {
    fetchjob_Pos_Cat_Count(){
      axios
        .get(`${flaskApiUrl}/count_position_category`)
        .then((response) => {
          console.log("Api response counts :",response.data)
          this.job_position_count = response.data.total_job_positions
          this.job_category_count = response.data.total_job_categories

          localStorage.setItem('job_Position_count', response.data.total_job_positions);
          localStorage.setItem('job_Category_count', response.data.total_job_categories);
        })
        .catch((error)  => {
          console.log("error fetching data :",error)
        });
    },

    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    chechFooterVisibility() {
      const authPages = ['/login', '/register', '/forgot_password'];
      this.hide_footer_authPages = authPages.includes(this.$route.path);
    }
  },

  mounted() {
    this.fetchjob_Pos_Cat_Count();
  },

  created(){
    this.chechFooterVisibility();
  },
  watch:{
    '$route' : 'chechFooterVisibility',
  }
  
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

/*******************************/
/********* Footer CSS **********/
/*******************************/
.footer {
    position: relative;
    margin-top: 45px;
    padding-top: 90px;
    background: #202C45;
}

.footer .footer-contact,
.footer .footer-link,
.footer .footer-newsletter {
    position: relative;
    margin-bottom: 45px;
    color: #ffffff;
}

.footer .footer-newsletter input[placeholder='email']{
  color: white;
}

.footer .footer-contact h2,
.footer .footer-link h2,
.footer .footer-newsletter h2 {
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 2px;
    color: #E81C2E;
}

.footer .footer-link a {
    display: block;
    margin-bottom: 10px;
    color: #ffffff;
    transition: .3s;
}

.footer .footer-link a::before {
    position: relative;
    content: "\f105";
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    margin-right: 10px;
}

.footer .footer-link a:hover {
    color: #E81C2E;
    letter-spacing: 1px;
}

.footer .footer-contact p i {
    width: 25px;
}

.footer .footer-social {
    position: relative;
    margin-top: 20px;
    display: flex;
}

.footer .footer-social a {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #202C45;
    background: #ffffff;
    border-radius: 40px;
    margin-right: 5px;
    transition: .5s;
}

.footer .footer-social a:last-child {
    margin: 0;
}

.footer .footer-social a:hover {
    color: #ffffff;
    background: #E81C2E;
}

.footer .footer-newsletter form {
    position: relative;
    width: 100%;
}

.footer .footer-newsletter input {
    margin-bottom: 15px;
    height: 45px;
    background: transparent;
    border: 1px solid #ffffff;
    border-radius: 5px;
}

.footer .footer-newsletter label {
    margin-top: 5px;
    color: #777777;
    font-size: 14px;
    letter-spacing: 1px;
}

.footer .footer-newsletter .btn.btn-custom {
    width: 100%;
    color: #202C45;
    background: #ffffff;
    box-shadow: inset 0 0 0 0 #E81C2E;
}

.footer .footer-newsletter .btn:hover {
    color: #ffffff;
    background: #E81C2E;
    box-shadow: inset 200px 0 0 0 #E81C2E;
}

.footer .copyright {
    text-align: center;
    padding-top: 15px;
    padding-bottom: 45px;
}

.footer .copyright p {
    margin: 0;
    color: #ffffff;
}

.footer .copyright p a {
    color: #E81C2E;
    font-weight: 700;
    letter-spacing: 1px;
}

.footer .copyright p a:hover {
    color: #ffffff;
}

</style>
