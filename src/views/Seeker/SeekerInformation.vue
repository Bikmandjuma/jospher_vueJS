<template>
  <div>
    <SeekerLayout pageTitle="Seeker Information">
      <h1>Seeker information</h1>
    </SeekerLayout>
  </div>
  </template>
  
  <script>

  export default {
    name: 'SeekerInformation',
    beforeMount() {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        this.$router.push({ name: 'Login' });
      }
    }
  };
  </script>
  