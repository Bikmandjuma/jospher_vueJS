<template>
  <!-- Page Header Start -->
  <div class="page-header" :style="{ backgroundImage: 'url(' + headerImageUrl + ')' }"></div>
  <!-- Page Header End -->
  
  <!-- Service Start -->
  <div class="service">
    <div class="container">
      <div class="section-header text-center">
        <p>Services</p>
        <h2>Our Services</h2>
      </div>

      <div class="row">
        <div v-for="(service, index) in services" :key="index" class="col-lg-3 col-md-6">
          <div class="service-item">
            <h3>
              <i class="fa fa-briefcase" style="width:20px;height:20px;color: #E81C2E;"></i>&nbsp;{{ service.title }}
            </h3>
            <p>{{ service.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Service End -->
</template>

<script>
export default {
  data() {
    return {
      // @ts-ignore
      headerImageUrl: require('@/assets/Homepage_images/carousel5.jpg'),

      job_count: 0,
      category_counts: 0,

      services: [
        { title: 'Centralized Job Listings', description: '' },
        { title: 'Personalized Job Alerts', description: '' },
        { title: 'Career Insights and Updates', description: '' },
        { title: 'Employer Advertising Options', description: '' },
        { title: 'Mobile-Friendly Experience', description: '' },
        { title: 'Dedicated Support', description: '' }
      ]
    };
  },

  methods: {
    updateServiceDescriptions() {
      this.services[0].description = `Say goodbye to browsing multiple job portals. Job Sphere Rda aggregates job listings from various platforms into a single, user-friendly interface. Explore opportunities across ${this.category_counts} job categories and ${this.job_count} job positions, all in one place.`;
      this.services[1].description = `Never miss a job opportunity with our real-time alert system. Get personalized email notifications tailored to your skills and interests. From software development to accounting, we keep you informed about the latest openings relevant to your profession.`;
      this.services[2].description = `Stay informed with career insights, industry updates, and tips to ace your job applications. Our platform is designed to support you throughout your job-hunting journey.`;
      this.services[3].description = `Employers can advertise job vacancies on our platform to reach a wider audience of skilled professionals. Showcase your company and attract top talent with our customizable ad packages.`;
      this.services[4].description = `Access Job Sphere Rda anytime, anywhere. Our mobile-friendly design ensures you can browse job opportunities and receive alerts on the go.`;
      this.services[5].description = `Have questions or need help? Our dedicated support team is always ready to assist you with any inquiries about our services or platform.`;
    }
  },

  mounted() {
    const job_category = localStorage.getItem("job_Category_count");
    const job_position = localStorage.getItem("job_Position_count");

    // Ensure that the values are integers
    this.job_count = parseInt(job_category, 10) || 0;
    this.category_counts = parseInt(job_position, 10) || 0;

    // Update service descriptions
    this.updateServiceDescriptions();
  }
};
</script>

 
  <style scoped>
  /* Add your styles here */
  
/*******************************/
/********* Service CSS *********/
/*******************************/
.service {
    position: relative;
    width: 100%;
    padding: 45px 0 0 0;
}

.service .service-item {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 45px;
}


.service .service-item [class^="flaticon-"]::before {
    margin: 0;
    font-size: 60px;
    line-height: 60px;
    background-image: linear-gradient(#E81C2E, #202C45);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: .5s;
}

.service .service-item h3 {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 1px;
}

.service .service-item p {
    margin: 0;
}


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

  </style>
  