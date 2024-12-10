<template>
    <div>
      <header>
        <!-- Seeker-specific header with navigation -->
        <nav>
          <router-link to="/seeker/dashboard">Dashboard</router-link>
          <router-link to="/seeker/jobs">Jobs</router-link>
        </nav>
      </header>
  
      <main>
        <slot></slot>  <!-- This will inject content from child components -->
      </main>
  
      <footer>
        <!-- Seeker footer -->
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SeekerLayout'
  }
  </script>
  
  <style scoped>
  /* Add styles specific to the seeker layout */
  </style>
  