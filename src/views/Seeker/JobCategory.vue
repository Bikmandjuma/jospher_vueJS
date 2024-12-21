<!-- <template>
    <div>
      <h1>Job category</h1>
    </div>
  </template>
  
  <script>
  export default {
    name: 'JobCategory',
    beforeMount() {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        this.$router.push({ name: 'Login' });
      }
    }
  };
  </script> -->
  
  <template>
    <div>
      <!-- Search Input -->
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search items..."
        class="search-input"
      />
  
      <!-- Display Filtered Items -->
      <ul>
        <template v-if="searchQuery">
          <li v-for="item in filteredItems" :key="item.id">
            {{ item.name }}
          </li>
        </template>
      </ul>
  
      <!-- Show a Message if No Items Match -->
      <p v-if="searchQuery && filteredItems.length === 0">
        No items match your search.
      </p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: "", // Search input value
        items: [
          { id: 1, name: "Apple" },
          { id: 2, name: "Banana" },
          { id: 3, name: "Orange" },
          { id: 4, name: "Mango" },
          { id: 5, name: "Pineapple" },
        ],
      };
    },
    computed: {
      filteredItems() {
        return this.items.filter((item) =>
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
  };
  </script>
  
  <style>
  .search-input {
    padding: 8px;
    width: 100%;
    margin-bottom: 10px;
  }
  </style>
  