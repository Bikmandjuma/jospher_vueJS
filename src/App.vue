<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script>
import { defineComponent } from 'vue';
import DefaultLayout from './layouts/DefaultLayout.vue';

export default defineComponent({
  computed: {
    layout() {
      const layout = this.$route.meta.layout || DefaultLayout;
      return layout;
    }
  }
});
</script>
<!-- 
<template> -->
  <!-- <component :is="layout">
    <router-view></router-view>
  </component> -->
  <!-- <div class="maintenance">
    <h2>🔧 Job Sphere Rwanda - System Maintenance</h2>
    <p>Our system is currently undergoing scheduled maintenance.</p>
    <p>We are working hard to bring it back online as soon as possible.</p>
    <br />
    <p>⏳ Please check back later.</p>
    <p>Thank you for your patience and understanding.</p>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import DefaultLayout from './layouts/DefaultLayout.vue';

export default defineComponent({
  computed: {
    layout() {
      const layout = this.$route.meta.layout || DefaultLayout;
      return layout;
    }
  }
});
</script>

<style scoped>
.maintenance {
  text-align: center;
  margin-top: 100px;
  font-family: Arial, sans-serif;
}
.maintenance h2 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #2c3e50;
}
.maintenance p {
  font-size: 16px;
  margin: 5px 0;
}
</style> -->
