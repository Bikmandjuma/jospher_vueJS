<!-- <template>
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
  </script> -->


  <template>
  <div class="flex justify-center items-center mt-4">
    <!-- Profile Card -->
    <div class="bg-white p-6 rounded-lg shadow-lg w-80">
      <div class="text-center">
        <!-- Profile Image -->
        <img
          class="rounded-full w-32 h-32 mx-auto"
          :src="userData.image ? require(`../../assets/seeker_style/images/${userData.image}`) : require('../../assets/seeker_style/images/user.png')"
          alt="User Image"
        />
        <h5 class="font-semibold text-lg mt-4">{{ userData.firstname || 'User Name' }}</h5>
        <p class="text-gray-600 mt-2">{{ userData.user_name || 'N/A' }}</p>
        <button @click="openModal" class="text-blue-500 mt-4 text-sm">Edit Profile</button>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 class="text-xl font-semibold text-center mb-4">Edit Profile</h2>

        <!-- Edit Profile Form -->
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              v-model="editData.firstname"
              class="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div class="mb-4">
            <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastName"
              v-model="editData.lastname"
              class="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div class="flex justify-between items-center">
            <button type="button" @click="closeModal" class="bg-gray-300 text-white px-4 py-2 rounded-md">Cancel</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        image: 'user.png',
        firstname: 'John',
        user_name: 'john_doe',
        lastname: 'Doe',
      },
      editData: {
        firstname: 'John',
        lastname: 'Doe',
      },
      isModalOpen: false,
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    submitForm() {
      // Handle the form submission logic
      this.userData.firstname = this.editData.firstname;
      this.userData.lastname = this.editData.lastname;
      this.closeModal();
    },
  },
};
</script>

<style scoped>
/* Optional: Styling for the modal backdrop */
.modal-backdrop {
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}
</style>
