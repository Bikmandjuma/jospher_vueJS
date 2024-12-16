<template>
    <div>
      <h1>Seeker Dashboard</h1>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SeekerDashboard',
    beforeMount() {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        this.$router.push({ name: 'Login' });
      }
    }
  };
  </script>
  