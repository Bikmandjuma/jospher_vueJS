<template>
  <div>
    <h1>Items</h1>
    <ul v-if="items.length">
      <li v-for="item in items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
    <p v-else>Loading items...</p>
  </div>
</template>

<script>
import axios from 'axios';
import { flaskApiUrl } from '../api';

export default {
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.fetchItems();
  },
  methods: {
    async fetchItems() {
      try {
        // Send a GET request to the Flask API
        const response = await axios.get(`${flaskApiUrl}/api/items`);
        
        // Set the items data to the response
        this.items = response.data;

        // Save the item data to localStorage (example storing only the first item for demo)
        if (this.items.length > 0) {
          const itemData = {
            id: this.items[0].id,
            item: this.items[0].name,
          };
          localStorage.setItem('itemData', JSON.stringify(itemData));
        }
      } catch (error) {
        console.error("There was an error fetching the data:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Your CSS styles here */
</style>
