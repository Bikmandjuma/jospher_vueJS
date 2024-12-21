<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
         <!-- Hero Section -->
        <section class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div class="container mx-auto px-4 py-20 text-center">
            <!-- <h1 class="text-4xl md:text-5xl font-bold mb-4">Welcome to Your Future</h1>
            <p class="text-lg md:text-xl mb-6">
            Discover the tools, resources, and opportunities you need to thrive in today's digital world. -->
            <!-- </p> -->
            <h1 class="text-4xl md:text-5xl font-bold mb-4">Discover a World of Opportunities</h1>
            <p class="text-lg md:text-xl mb-6">JobSphere consolidates job listings from various platforms, providing you with a comprehensive view of available positions tailored to your skills.</p>
            <div class="flex justify-center space-x-4">
            <a href="/jobs" class="bg-white text-blue-500 px-6 py-2 rounded-lg shadow hover:bg-gray-100">Search Jobs</a>
            <!-- <a href="/jobs" class="bg-transparent border border-white px-6 py-2 rounded-lg hover:bg-white hover:text-blue-500 text-white">Jobs</a> -->
            </div>
        </div>
        </section>

        <br>

        <div class="about">
            <div class="container">
              <br>
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        
                        <div class="section-header text-center" style="margin-top: -50px;">
                            <p id="ad_title">About Us</p>
                        </div>

                        <div class="about-img">
                            <img src="../../assets/Homepage_images/carousel5.jpg" alt="Image">
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
                                When new job postings appear on any of sourced platforms, you’ll receive a personalized email notification that matches your unique skills and chosen job categories. Whether you're a software developer, accountant, technician, secretary, or lawyer, we’ll make sure you’re alerted about roles relevant to your field, such as openings in Java development, accounting, technical support, and more.
                                </p>
                                <p>
                                Our real-time alert system keeps you in the loop with the latest job opportunities without the need for constant searching, so you’ll always be among the first to know and apply. If you're looking for a smart, time-saving solution to streamline your job search, <strong>job sphere rwanda</strong> is here to help. Let us do the work of finding new opportunities while you focus on landing your ideal position.
                            </p>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- About End -->

        <!-- Facts Start -->
        <div class="facts" data-parallax="scroll" data-image-src="{{ url_for('static', filename='style/homePage/img/facts.jpg') }}">
            <div class="container">
                <div class="row">

                    <div class="col-lg-4 col-md-6 d-flex justify-content-center align-items-center text-center">
                        <div class="facts-item">
                            <div class="facts-text">
                                <h3 data-toggle="counter-up">1.2</h3><h3>k</h3>
                                <p>Visits</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-6 d-flex justify-content-center align-items-center text-center">
                        <div class="facts-item">
                            <div class="facts-text">
                                <h3 data-toggle="counter-up">0</h3>
                                <p>Job categories</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-6 d-flex justify-content-center align-items-center text-center">
                        <div class="facts-item">
                            <div class="facts-text">
                                <h3 data-toggle="counter-up">0</h3>
                                <p>Job positions</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- Facts End -->


        <!-- Price Start -->
        <div class="price">
            <div class="container">
                <div class="section-header text-center">
                    <p id="ad_title">Job Seekers' Payment</p>
                    <h2>Choose Your Plan</h2>
                    <br>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="price-item">
                            <div class="price-header">
                                <h3>1 Month</h3>
                                <h2><span></span><strong>5,000</strong><span>Frw</span></h2>
                            </div>
                            <div class="price-body">
                                <ul>
                                    <li><i class="far fa-check-circle"></i>Access on job categories</li>
                                    <li><i class="far fa-check-circle"></i>Access on job positions</li>
                                    <li><i class="far fa-check-circle"></i>New opportunity notification</li>
                                    <li><i class="far fa-check-circle"></i> Actively for 30 days</li>
                                </ul>
                            </div>
                            <div class="price-footer">
                                <!-- <a  id="openModal" href="#"></a> -->
                                <button class="btn btn-custom openModal" @click="openModal">Book Now</button>

                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="price-item featured-item">
                            <div class="price-header">
                                <h3>6 months</h3>
                                <h2><strong>20,000</strong><span>Frw</span></h2>
                            </div>
                            <div class="price-body">
                                <ul>
                                    <li><i class="far fa-check-circle"></i>Access on job categories</li>
                                    <li><i class="far fa-check-circle"></i>Access on job positions</li>
                                    <li><i class="far fa-check-circle"></i>New opportunity notification</li>
                                    <li><i class="far fa-check-circle"></i>Actively for 183 days</li>
                                </ul>
                            </div>
                            <div class="price-footer">
                                <!-- <a class="btn btn-custom" id="openModal" href="#">Book Now</a> -->
                                <button class="btn btn-custom openModal" @click="openModal">Book Now</button>

                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="price-item">
                            <div class="price-header">
                                <h3>Yearly</h3>
                                <h2><strong>35,000</strong><span>Frw</span></h2>
                            </div>
                            <div class="price-body">
                                <ul>
                                    <li><i class="far fa-check-circle"></i>Access on job categories</li>
                                    <li><i class="far fa-check-circle"></i>Access on job positions</li>
                                    <li><i class="far fa-check-circle"></i>New opportunity notification</li>
                                    <li><i class="far fa-check-circle"></i>Actively for 365 days </li>
                                </ul>
                            </div>
                            <div class="price-footer">
                                <!-- <a class="btn btn-custom" id="openModal" href="#">Book Now</a> -->
                                <button class="btn btn-custom openModal" @click="openModal">Book Now</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Price End -->

        <div ref="modal" class="modal">
          <div class="modal-content text-center">
            <span ref="closeModal" class="close text-right text-danger">&times;</span>
            
            <h2>Create an account</h2>
            <br>
            <p>
              To proceed with the subscription, you need to create an account. By creating an account, you'll gain access to your subscription details and manage your plans with ease.
            </p>
            <br>
            <div class="modal-actions text-center">
              <button class="btn btn-primary" style="padding-bottom:5px;" id="createAccountButton" onclick="window.location.href='/register'" >Sign up</button>
            </div>

          </div>
        </div>

        <!-- Location Start -->
        <div class="location">
            <div class="container">
                <div class="row">
                    <div class="col-lg-7">
                        <div class="section-header text-left">
                            <p id="ad_title">Advertise with us</p>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="location-item">
                                    <i class="fa fa-ad" style="color: #E81C2E;"></i>
                                    <div class="location-text">
                                        <h3>Access to a Wide and Relevant Audience</h3>
                                        <p>Advertise your job postings or services to thousands of active job seekers from diverse fields, ranging from software development to accounting, ensuring your ads reach the right candidates.</p>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="location-item">
                                    <i class="fa fa-bullhorn" style="color: #E81C2E;"></i>
                                    <div class="location-text">
                                        <h3>Enhanced Visibility Through Real-Time Alerts</h3>
                                        <p>Your advertisements will be part of our real-time notifications, directly sent to users based on their selected job categories, providing maximum exposure to a targeted audience</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="location-item">
                                    <i class="fa fa-newspaper" style="color: #E81C2E;"></i>
                                    <div class="location-text">
                                        <h3>Focused Advertising for Specific Professions</h3>
                                        <p>With 0 job categories and personalized email notifications, your ads will reach professionals most relevant to your industry, making your campaigns highly effective and ensuring a strong ROI</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="location-item">
                                    <i class="fa fa-ad" style="color: #E81C2E;"></i>
                                    <div class="location-text">
                                        <h3>Cost-Effective Advertising with Measurable Results</h3>
                                        <p>Showcase your brand or job postings on a platform designed for engagement, where users actively seek opportunities, ensuring higher click-through rates and conversions for your ads.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="location-form">
                            <h3>Request for Advertisement Placement</h3>
                            <form>
                                <div class="control-group">
                                    <input type="text" class="form-control" placeholder="Name" required/>
                                </div>
                                <div class="control-group">
                                    <input type="email" class="form-control" placeholder="Email" required />
                                </div>
                                <div class="control-group">
                                    <textarea class="form-control" placeholder="Description" required></textarea>
                                </div>
                                <br>
                                <div>
                                    <button class="btn btn-custom" type="submit"><i class="fa fa-paper-plane"></i> Send Request</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Location End -->



     <!-- Features Section -->
    <!-- <section class="py-12 bg-gray-100">
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
    </section> -->
    
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  methods: {
    openModal() {
      const modal = this.$refs.modal; // Reference to the modal <div>
      const closeModalButton = this.$refs.closeModal; // Reference to the close button <span>

      // Check if references are valid
      if (modal && closeModalButton) {
        // Open the modal by setting the display style to 'flex'
        // @ts-ignore
        modal.style.display = 'flex';

        // Close modal when clicking 'X'
        // @ts-ignore
        closeModalButton.addEventListener('click', () => {
          // @ts-ignore
          modal.style.display = 'none';
        });

        // Close modal when clicking outside the modal content
        window.addEventListener('click', (event) => {
          if (event.target === modal) {
            // @ts-ignore
            modal.style.display = 'none';
          }
        });
      }
    },
  },
};
</script>

<style scoped>
/* Style the Modal */

a{
    text-decoration: none;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 10px;
  border: 1px solid #888;
  width: 50%;
  height: 45%;
}

@media(max-width:600px){
    .modal {
        display: none;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);
    }

    .modal-content {
        background-color: #fefefe;
        margin: 0% auto;
        width: 90%;
        margin-top:30% ;
        height: 50%;
        margin-bottom:5% ;
        border: 1px solid #888;
    }   
}

.close {
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
/*******end of model price***/

/*******************************/
/********** Facts CSS **********/
/*******************************/
.facts {
    position: relative;
    width: 100%;
    min-height: 200px;
    margin: 45px 0;
    display: flex;
    align-items: center;
    background: #202C45;
}

.facts .facts-item {
    display: flex;
    flex-direction: row;
    margin: 25px 0;
}

.facts .facts-item i {
    margin-top: 15px;
    font-size: 45px;
    color: #E81C2E;
}

.facts .facts-text {
    padding-left: 20px;
}

.facts .facts-text h3 {
    position: relative;
    display: inline-block;
    color: #ffffff;
    font-size: 60px;
    font-weight: 700;
    align-items: center;
    text-align: center;
    align-content: center;
}

/*.facts .facts-text h3::after {
    position: absolute;
    content: "\f067";
    top: 0px;
    right: -25px;
    color: #ffffff;
    font-size: 25px;
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
}*/

.facts .facts-text p {
    color: #ffffff;
    font-size: 18px;
    font-weight: 500;
    margin: 0;
    align-items: center;
    text-align: center;
    align-content: center;
}

/*******************************/
/********* Pricing CSS *********/
/*******************************/
    .price {
        position: relative;
        width: 100%;
        padding: 5px 0 15px 0;
    }

    .price .row {
        padding: 0 15px;
    }

    .price .col-md-4 {
        padding: 0;
    }

    .price .price-item {
        position: relative;
        margin-bottom: 30px;
        background: #ffffff;
        border-radius: 5px;
        text-align: center;
    }

    .price .featured-item {
        box-shadow: 0 0 30px rgba(0, 0, 0, .2);
        z-index: 1;
    }

    .price .price-header {
        padding: 45px 0 30px 0;
    }

    .price .price-header h3 {
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
    }

    .price .price-header h2 {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        font-size: 60px;
        font-weight: 700;
        letter-spacing: 5px;
    }

    .price .price-header h2 span {
        font-size: 25px;
        line-height: 80px;
    }

    .price .price-item.featured-item h2,
    .price .price-item.featured-item h3 {
        color: #E81C2E;
    }

    .price .price-body {
        padding: 0 0 20px 0;
    }

    .price .price-body ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .price .price-body ul li {
        padding: 0 0 15px 0;
    }

    .price .price-body ul li i {
        margin-right: 10px;
    }

    .price .price-body ul li i.fa-check-circle {
        color: #39B972;
    }

    .price .price-body ul li i.fa-times-circle {
        color: #cccccc;
    }

    .price .price-item .price-footer {
        padding-bottom: 45px;
    }

    .price .price-item .price-footer .btn.btn-custom {
        color: #E81C2E;
        background: #202C45;
        box-shadow: inset 0 0 0 0 #E81C2E;
    }

    .price .price-item .price-footer .btn.btn-custom:hover {
        color: #ffffff;
        background: #E81C2E;
        box-shadow: inset 200px 0 0 0 #E81C2E;
    }

    .price .price-item.featured-item .price-footer .btn.btn-custom {
        color: #ffffff;
        background: #E81C2E;
        box-shadow: inset 0 0 0 0 #202C45;
    }

    .price .price-item.featured-item .price-footer .btn.btn-custom:hover {
        color: #E81C2E;
        background: #202C45;
        box-shadow: inset 200px 0 0 0 #202C45;
    }

/*******************************/
/******** Location CSS *********/
/*******************************/

#ad_title{
    color: #E81C2E;
    font-size:20px;
    font-weight: bold;
}

#ad_title {
  position: relative;
  display: inline-block;  /* Ensures the underline is centered relative to the text */
}

#ad_title::after {
  content: '';  /* This creates an empty element */
  position: absolute;
  bottom: 0;  /* Aligns the underline at the bottom of the text */
  left: 50%;  /* Centers the underline */
  transform: translateX(-50%);  /* Adjusts the positioning to truly center the underline */
  width: 50%;  /* The width of the underline (adjust as needed) */
  height: 2px;  /* The thickness of the underline */
  background-color: black;  /* Color of the underline */
}

@media(max-width:600px){
    .location{
        margin-top: -80px;
    }
}

.location {
    position: relative;
    width: 100%;
    padding: 45px 0;
}

.location .location-item {
    display: flex;
    margin-bottom: 30px;
}

.location .location-item i {
    padding-top: 3px;
    font-size: 30px;
    color: #E81C2E;
}

.location .location-text {
    padding-left: 15px;
}

.location .location-text h3 {
    font-size: 18px;
    font-weight: 700;
}

.location .location-text p {
    margin-bottom: 5px;
}

.location .location-text p strong {
    margin-right: 5px;
    font-weight: 600;
}

.location .location-form {
    padding: 45px 30px;
    background: #E81C2E;
    border-radius: 5px;
}

.location-item i{
    color: #E81C2E;
}

.location .location-form h3 {
    color: #ffffff;
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 25px;
}

.location .location-form .control-group {
    margin-bottom: 15px;
}

.location .location-form .form-control {
    height: 45px;
    color: #ffffff;
    padding: 0 15px;
    border-radius: 5px;
    border: 1px solid #ffffff;
    background: transparent;
}

.location .location-form textarea.form-control {
    height: 120px;
    padding: 15px;
}

.location .location-form .form-control::placeholder {
    color: #ffffff;
    opacity: 1;
}

.location .location-form .form-control:-ms-input-placeholder,
.location .location-form .form-control::-ms-input-placeholder {
    color: #ffffff;
}

.location .location-form .btn.btn-custom {
    width: 100%;
    color: #E81C2E;
    background: #ffffff;
    box-shadow: inset 0 0 0 0 #202C45;
}

.location .location-form .btn.btn-custom:hover {
    color: #ffffff;
    background: #E81C2E;
    box-shadow: inset 400px 0 0 0 #202C45;
}

@media(min-width: 576px) and (max-width: 991.89px) {
    .location .location-form .btn.btn-custom:hover {
        box-shadow: inset 650px 0 0 0 #202C45;
    }
}

</style>
