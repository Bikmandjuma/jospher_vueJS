<!-- <template>
  <div>
    <h1>Job Listings</h1>
    <ul>
      <li v-for="job in jobListings" :key="job">{{ job }}</li>
    </ul>
    <div v-if="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="jobCount !== null">Total jobs: {{ jobCount }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      jobListings: [],  // Will store the job listings
      jobCount: null,   // Will store the job count
      loading: false,   // For loading state
      error: null       // For error state
    };
  },
  created() {
    // Fetch job listings when the component is created
    this.fetchJobListings();
  },
  methods: {
    async fetchJobListings() {
      this.loading = true;
      this.error = null;

      try {
        // Replace with the correct URL to your API endpoint
        const response = await axios.get('http://192.168.0.82:8000/api/expired');
        
        // Extract job listings and job count from the response
        this.jobListings = response.data.job_listings;
        this.jobCount = response.data.job_count;
      } catch (err) {
        // Handle any error that occurs during the API call
        this.error = 'Failed to load job listings. Please try again later.';
      } finally {
        // Set loading to false once the API call is finished
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
/* Optional styling */
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 5px 0;
  font-size: 18px;
}

.error {
  color: red;
  font-weight: bold;
}
</style> -->

<template>
  <!-- Page Header Start -->
  <div class="page-header" :style="{ backgroundImage: 'url(' + headerImageUrl + ')' }">
  </div>
  <!-- Page Header End -->
  <!-- About Start -->
  <div class="about mt-3" style="margin-top:-5%;">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="section-header text-left">
            <p>About Us</p>
          </div>

          <div class="about-img">
            <img :src="aboutImageUrl" alt="About Us Image">
          </div>
        </div>
        <div class="col-lg-6">
          <div class="about-content">
            <p>
              Welcome to <strong>{{ appName }}</strong>, your one-stop platform for streamlined job searching! We understand how time-consuming it can be to browse multiple job sites, so we bring together listings from a variety of platforms to help job seekers find opportunities faster and easier. Our mission is to make job hunting more accessible, giving you more time to focus on preparing for your dream job.
            </p>
            <p>
              At <strong>{{ appName }}</strong>, we proudly offer <strong>{{ categoryCounts }} job categories</strong> and <strong>{{ jobCount }} job positions</strong> for you to explore. We go the extra mile to ensure you never miss a career opportunity.
            </p>
            <p>
              When new job postings appear on any of our sourced platforms, you’ll receive a personalized email notification that matches your unique skills and chosen job categories. Whether you're a software developer, accountant, technician, secretary, or lawyer, we’ll make sure you’re alerted about roles relevant to your field, such as openings in Java development, accounting, technical support, and more.
            </p>
            <p>
              Our real-time alert system keeps you in the loop with the latest job opportunities without the need for constant searching, so you’ll always be among the first to know and apply. If you're looking for a smart, time-saving solution to streamline your job search, <strong>{{ appName }}</strong> is here to help. Let us do the work of finding new opportunities while you focus on landing your ideal position.
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

                    <!-- <div class="col-lg-4 col-md-6 d-flex justify-content-center align-items-center text-center">
                        <div class="facts-item">
                            <div class="facts-text">
                                <h3 data-toggle="counter-up">1.2</h3><h3>k</h3>
                                <p>Visits</p>
                            </div>
                        </div>
                    </div> -->

                    <div class="col-lg-6 col-md-6 d-flex justify-content-center align-items-center text-center">
                        <div class="facts-item">
                            <div class="facts-text">
                                <h3 data-toggle="counter-up" v-if="categoryCounts > 0">{{ categoryCounts }}</h3>
                                <h3 data-toggle="counter-up" v-else><i class="fas fa-spinner fa-spin"></i></h3>
                                <p>Job categories</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-6 d-flex justify-content-center align-items-center text-center">
                        <div class="facts-item">
                            <div class="facts-text">
                                <h3 data-toggle="counter-up" v-if="jobCount.length > 0">{{ jobCount }}</h3>
                                <h3 data-toggle="counter-up" v-else><i class="fas fa-spinner fa-spin"></i></h3>
                                <p>Job positions</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- Facts End -->

</template>

<script>
import axios from 'axios';
import { flaskApiUrl } from '../../api';

export default {
  data() {
    return {
      // @ts-ignore
      headerImageUrl: require('@/assets/Homepage_images/carousel5.jpg'), // Path to header image
      // @ts-ignore
      aboutImageUrl: require('@/assets/Homepage_images/carousel5.jpg'),  // Path to about image
      // @ts-ignore
      factsImageUrl: require('@/assets/Homepage_images/carousel6.png'), // Path to facts image

      appName: 'Job Sphere Rda',  // Example app name
      categoryCounts: 10,        // Example number of job categories
      jobCount: 150              // Example number of job positions
    };
  },

  methods:{
    fetchjob_Pos_Cat_Count(){
      axios
        .get(`${flaskApiUrl}/count_position_category`)
        .then((response) => {
          console.log("Api response counts :",response.data)
          this.jobCount = response.data.total_job_positions
          this.categoryCounts = response.data.total_job_categories
        })
        .catch((error)  => {
          console.log("error fetching data :",error)
        });
    },
  },
  mounted (){
    this.fetchjob_Pos_Cat_Count();
  }
};
</script>

<style scoped>
/* Add your custom styles here */


/*******************************/
/******* Page Header CSS *******/
/*******************************/
.page-header {
    position: relative;
    margin-bottom: 45px;
/*    padding: 90px 0;*/
    text-align: center;
    border-top: 1px dotted #ffffff;
    height: 200px
}

.page-header h2 {
    position: relative;
    color: #ffffff;
    font-size: 60px;
    font-weight: 700;
    margin-bottom: 20px;
    padding-bottom: 5px;
}

.page-header h2::after {
    position: absolute;
    content: "";
    width: 100px;
    height: 2px;
    left: calc(50% - 50px);
    bottom: 0;
    background: #ffffff;
}

.page-header a {
    position: relative;
    padding: 0 12px;
    font-size: 22px;
    color: #ffffff;
}

.page-header a:hover {
    color: #E81C2E;
}

.page-header a::after {
    position: absolute;
    content: "/";
    width: 8px;
    height: 8px;
    top: -2px;
    right: -7px;
    text-align: center;
    color: #ffffff;
}

.page-header a:last-child::after {
    display: none;
}

@media (max-width: 991.98px) {
    .page-header {
        padding: 60px 0;
    }
    
    .page-header h2 {
        font-size: 45px;
    }
    
    .page-header a {
        font-size: 20px;
    }
}

@media (max-width: 767.98px) {
    .page-header {
        padding: 45px 0;
    }
    
    .page-header h2 {
        font-size: 35px;
    }
    
    .page-header a {
        font-size: 18px;
    }

    
/*******************************/
/********** About CSS **********/
/*******************************/
.about {
    position: relative;
    width: 100%;
    padding: 45px 0 15px 0;
}

.about .section-header {
    margin-bottom: 30px;
    margin-left: 0;
}

.about .about-img img {
    width: 100%;
    border-radius: 5px;
    margin-bottom: 30px;
}

.about .about-content {
    margin-bottom: 30px;
}

.about .about-content ul {
    margin: 0;
    padding: 0;
    list-style: none;
    margin-bottom: 25px;
}

.about .about-content ul li {
    margin-bottom: 5px;
}

.about .about-content ul li i {
    margin-right: 8px;
    color: #E81C2E;
}

}


/*******************************/
/******* Section Header ********/
/*******************************/
.section-header {
    position: relative;
    width: 100%;
    max-width: 700px;
    margin: 0 auto 45px auto;
}

.section-header p {
    display: inline-block;
    margin-bottom: 10px;
    padding-bottom: 5px;
    position: relative;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #E81C2E;
}

.section-header p::after {
    position: absolute;
    content: "";
    width: 50%;
    height: 2px;
    left: 25%;
    bottom: 0;
    background: #E81C2E;
}

.section-header.text-left p::after {
    left: 0;
}

.section-header.text-right p::after {
    left: 50%;
}

.section-header h2 {
    margin: 0;
    font-size: 45px;
    font-weight: 700;
    text-transform: capitalize;
}

@media (max-width: 991.98px) {
    .section-header h2 {
        font-size: 45px;
    }
}

@media (max-width: 767.98px) {
    .section-header h2 {
        font-size: 40px;
    }
}

@media (max-width: 575.98px) {
    .section-header h2 {
        font-size: 35px;
    }
}


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

</style>
