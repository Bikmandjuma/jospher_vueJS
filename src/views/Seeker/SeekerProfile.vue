<template>
    <div>
      <h1>Seeker profile</h1>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SeekerProfile',
    beforeMount() {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        this.$router.push({ name: 'Login' });
      }
    }
  };
  </script>
