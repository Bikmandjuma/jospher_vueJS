<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
         <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <div class="container mx-auto px-4 py-20 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Welcome to Your Future</h1>
        <p class="text-lg md:text-xl mb-6">
          Discover the tools, resources, and opportunities you need to thrive in today's digital world.
        </p>
        <div class="flex justify-center space-x-4">
          <a href="#" class="bg-white text-blue-500 px-6 py-2 rounded-lg shadow hover:bg-gray-100">Get Started</a>
          <a href="#" class="bg-transparent border border-white px-6 py-2 rounded-lg hover:bg-white hover:text-blue-500">Learn More</a>
        </div>
      </div>
    </section>

     <!-- Features Section -->
    <section class="py-12 bg-gray-100">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-8">Our Features</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white shadow-lg p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-blue-500 mb-2">Feature One</h3>
            <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.</p>
          </div>
          <div class="bg-white shadow-lg p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-blue-500 mb-2">Feature Two</h3>
            <p class="text-gray-600">Suspendisse potenti. Morbi fringilla convallis sapien, id pulvinar odio volutpat.</p>
          </div>
          <div class="bg-white shadow-lg p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-blue-500 mb-2">Feature Three</h3>
            <p class="text-gray-600">Donec mattis, nisi id euismod ullamcorper, odio ligula ultricies risus, eu scelerisque urna justo id magna.</p>
          </div>
        </div>
      </div>
    </section>
    
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    // HelloWorld
  }
}
</script>
