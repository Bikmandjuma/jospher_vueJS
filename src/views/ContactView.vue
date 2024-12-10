<template>
  <div>
    <!-- Page Header Start -->
    <section class="relative bg-cover bg-center text-white" style="z-index:100 ; background-image: url('../assets/Homepage_images/carousel6.png');">
      <!-- Overlay to darken the background -->
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <!-- <img src="'../assets/Homepage_images/carousel6.png" alt="image"/> -->
      <!-- Content Container -->
      <div class="container mx-auto px-4 py-20 text-center relative z-10">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Contact us</h1>
       
      </div>
    </section>


    <!-- Page Header End -->

    <!-- Contact Start -->
    <div class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <p class="text-gray-600 text-lg font-semibold">Get In Touch</p>
          <h2 class="text-3xl font-bold text-gray-800">Contact for any query</h2>
        </div>
        <div class="flex flex-wrap -mx-4">
          <!-- Contact Info -->
          <div class="md:w-1/3 px-4 mb-8">
            <div class="bg-white p-8 shadow-lg rounded-lg">
              <h2 class="text-xl font-semibold text-gray-800 mb-6">Quick Contact Info</h2>

              <!-- Opening Hour -->
              <div class="flex items-center mb-6">
                <div class="text-3xl text-blue-500 mr-4">
                  <i class="far fa-clock"></i>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">Opening Hour</h3>
                  <p class="text-gray-600">Mon - Fri, 8:00 - 9:00</p>
                </div>
              </div>

              <!-- Call Us -->
              <div class="flex items-center mb-6">
                <div class="text-3xl text-blue-500 mr-4">
                  <i class="fa fa-phone-alt"></i>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">Call Us</h3>
                  <p class="text-gray-600">+012 345 6789</p>
                </div>
              </div>

              <!-- Email Us -->
              <div class="flex items-center">
                <div class="text-3xl text-blue-500 mr-4">
                  <i class="far fa-envelope"></i>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">Email Us</h3>
                  <p class="text-gray-600">info@example.com</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="md:w-2/3 px-4">
            <div class="bg-white p-8 shadow-lg rounded-lg">
              <form name="sentMessage" id="contactForm" novalidate>
                <!-- Name -->
                <div class="mb-6">
                  <input type="text" class="w-full p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" id="name" placeholder="Your Name" required />
                </div>

                <!-- Email -->
                <div class="mb-6">
                  <input type="email" class="w-full p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" id="email" placeholder="Your Email" required />
                </div>

                <!-- Subject -->
                <div class="mb-6">
                  <input type="text" class="w-full p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" id="subject" placeholder="Subject" required />
                </div>

                <!-- Message -->
                <div class="mb-6">
                  <textarea class="w-full p-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" id="message" placeholder="Message" required></textarea>
                </div>

                <!-- Submit Button -->
                <div>
                  <button type="submit" class="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Map -->
        <div class="mt-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7972.710140041467!2d30.061215372991505!3d-1.9444632945796813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca7c49cb64b0b%3A0x68b67692a6883f6!2sGasabo%20District%2C%20Kigali%2C%20Rwanda!5e0!3m2!1sen!2srw!4v1698678866543!5m2!1sen!2srw"
            width="100%" height="450" style="border:0;" allowfullscreen loading="lazy"></iframe>
        </div>
      </div>
    </div>
    <!-- Contact End -->
  </div>
</template>

<script>
export default {
  name: 'ContactView',
};
</script>
