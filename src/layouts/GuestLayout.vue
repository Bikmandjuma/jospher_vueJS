<template>
    <div>
  
      <main>
        <slot></slot>  <!-- This will inject content from child components -->
      </main>
  
    </div>
</template>
  
  <script>
  export default {
    name: 'GuestLayout'
  }
  </script>
  
  <style scoped>
  /* Add styles specific to the seeker layout */
  </style>
  