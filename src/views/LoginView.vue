<template>
    <div>
      <!-- <h1>Login Us</h1>
      <p>Login details go here.</p> -->
        <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
          <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
              <div class="flex flex-col overflow-y-auto md:flex-row">
                  <div class="h-32 md:h-auto md:w-1/2">
                      <img aria-hidden="true" class="object-cover w-full h-full dark:hidden"
                          src="../assets/Homepage_images/login-office.jpeg" alt="Office" />
                      <img aria-hidden="true" class="hidden object-cover w-full h-full dark:block"
                          src="../assets/Homepage_images/login-office-dark.jpeg" alt="Office" />
                  </div>
                  <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                      <div class="w-full">
                          <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
                          <form id="loginForm">
                              <label class="block text-sm">
                                  <span class="text-gray-700 dark:text-gray-400">Email</span>
                                  <input id="email" name="email"
                                      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                      placeholder="Enter email" required />
                              </label>
                              <label class="block mt-4 text-sm">
                                  <span class="text-gray-700 dark:text-gray-400">Password</span>
                                  <input id="password" name="password"
                                      class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                      placeholder="Enter password" type="password" required />
                              </label>
                              <button type="submit" id="loginButton"
                                  class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                                  Log in
                              </button>
                          </form>

                          <hr class="my-8" />
                          <div style="align-items: center; text-align: center;">
                              <div class="footer-social">
                                  <a class="btn" href=""><i class="fab fa-twitter mr-3"></i></a>
                                  <a class="btn" href=""><i class="fab fa-facebook-f mr-3"></i></a>
                                  <a class="btn" href="#" id="google-login-btn"><i class="fab fa-google mr-3"></i></a>
                                  <a class="btn" href=""><i class="fab fa-linkedin-in mr-3"></i></a>
                                  <a class="btn" href=""><i class="fab fa-github mr-3"></i></a>
                              </div>
                              <p class="mt-4">
                                  <a class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                                      href="/forgot_password">
                                      Forgot your password?
                                  </a>
                              </p>
                              <p class="mt-1">
                                  <a class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                                      href="/register">
                                      Don't have an account? Sign up
                                  </a>
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginView',
  };
  </script>
  