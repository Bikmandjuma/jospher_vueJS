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

        <div class="about">
            <div class="container">
              <br>
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <!-- <div class="section-header text-left">
                            <p>About Us</p>
                        </div> -->

                        <div class="about-img">
                            <img src="../assets/Homepage_images/carousel5.jpg" alt="Image">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <!-- <div class="section-header text-left">
                            <h2>{{ app_name }}</h2>
                        </div> -->
                        <div class="about-content">
                            <p>
                                Welcome to <strong>Job sphere Rwanda</strong>, your one-stop platform for streamlined job searching! We understand how time-consuming it can be to browse multiple job sites, so we bring together listings from a variety of platforms to help job seekers find opportunities faster and easier. Our mission is to make job hunting more accessible, giving you more time to focus on preparing for your dream job.
                                </p>
                                <p>
                                At <strong>Job sphere Rwanda</strong>, we proudly offer <strong>0 job categories</strong> and <strong>0 job positions</strong> for you to explore. We go the extra mile to ensure you never miss a career opportunity.
                                </p>
                                <p>
                                When new job postings appear on any of our sourced platforms, you’ll receive a personalized email notification that matches your unique skills and chosen job categories. Whether you're a software developer, accountant, technician, secretary, or lawyer, we’ll make sure you’re alerted about roles relevant to your field, such as openings in Java development, accounting, technical support, and more.
                                </p>
                                <p>
                                Our real-time alert system keeps you in the loop with the latest job opportunities without the need for constant searching, so you’ll always be among the first to know and apply. If you're looking for a smart, time-saving solution to streamline your job search, <strong>{{ app_name }}</strong> is here to help. Let us do the work of finding new opportunities while you focus on landing your ideal position.
                            </p>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- About End -->

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
