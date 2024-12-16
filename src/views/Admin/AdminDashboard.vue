<template>
  <div>
    <h1>Admin Dashboard</h1>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  beforeMount() {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.$router.push({ name: 'Login' });
    }
  }
};
</script>
<style>

</style>