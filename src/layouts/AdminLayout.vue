<template>
    <div>
      <header>
        <!-- Admin header with navigation -->
        <nav>
          <router-link to="/admin/dashboard">Dashboard</router-link>
          <router-link to="/admin/settings">Settings</router-link>
        </nav>
      </header>
  
      <main>
        <slot></slot>  <!-- This will inject content from child components -->
      </main>
  
      <footer>
        <!-- Admin footer -->
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdminLayout'
  }
  </script>
  
  <style scoped>
  /* Add styles specific to the admin layout */
  </style>
  