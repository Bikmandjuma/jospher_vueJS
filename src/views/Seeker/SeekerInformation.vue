<template>
  <div>
    <SeekerLayout>
        <!-- Profile Section -->
        <section class="section profile">
          <div class="flex flex-wrap m-2">
            <!-- Left Section (School Name and Image) -->
            <div class="w-full xl:w-1/4 mb-4">
              <div class="card border rounded-lg shadow-md">
                <div class="card-body p-4">
                  <div class="text-center">
                    <!-- Default values for school_name and school_image if not provided -->
                    <img class="rounded-full w-32 h-32 mx-auto" src="../../assets/seeker_style/images/user1.jpg" alt="School Image">
                    <h5 class="font-semibold text-lg mt-4">Default School Name</h5>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Section (School Details) -->
            <div class="w-full xl:w-3/4 mb-4">
              <div class="card border rounded-lg shadow-md">
                <div class="card-body pt-3">
                  
                  <div class="space-y-4">
                    <!-- School Details Rows -->
                    <div class="flex justify-between">
                      <span class="font-medium">User_code</span>
                      <span>Default School Name</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="font-medium">User_name</span>
                      <span>023232</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="font-medium">Firstname</span>
                      <span>default@example.com</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="font-medium">Lastname</span>
                      <span>+123456789</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="font-medium">Gender</span>
                      <span>Country Name</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="font-medium">Email</span>
                      <span>defaultuser</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="font-medium">Phone</span>
                      <span>defaultuser</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="font-medium">Birthdate</span>
                      <span>defaultuser</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="font-medium">Email</span>
                      <span>defaultuser</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="font-medium">Joined</span>
                      <span>2 years ago</span>
                    </div>
                    <!-- Add a horizontal line -->
                    <div class="my-4 border-t border-gray-300"></div>
                    <div class="flex items-center justify-between px-2 py-2 border-b lg:py-6 dark:border-primary-darker">
                    <h1 class="text-2xl font-semibold"></h1>
                    <a
                      href="#notific"
                      class="px-4 py-2 text-sm text-white rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-dark"
                    >
                    <i class="fa fa-pen"></i>&nbsp;Edit info
                    </a>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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

<style scoped>
/* Styling for the 'Edit info' button */
/* Optional: Styling for the card body content */
.card-body {
  padding: 1.5rem;
}

a{
  text-decoration: none;
}
</style>
