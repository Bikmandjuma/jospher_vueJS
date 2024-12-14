<template>
  <div>
    <!-- Page Header Start -->
    <div class="page-header" :style="{ backgroundImage: `url(${carouselImageUrl})` }">
    </div>
    <!-- Page Header End -->
    
    <!-- Contact Start -->
    <div class="contact">
      <div class="container">
        <div class="section-header text-center">
          <p>Get In Touch</p>
          <h2>Contact for any query</h2>
        </div>
        <div class="row">
          <!-- Quick Contact Info Section -->
          <div class="col-md-4">
            <div class="contact-info">
              <h2>Quick Contact Info</h2>
              <div class="contact-info-item" v-for="item in contactInfo" :key="item.id">
                <div class="contact-info-icon">
                  <i :class="item.icon"></i>
                </div>
                <div class="contact-info-text">
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.detail }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form Section -->
          <div class="col-md-7">
            <div class="contact-form">
              <div id="success"></div>
              <form @submit.prevent="handleSubmit" name="sentMessage" id="contactForm" novalidate="novalidate">
                <div class="control-group">
                  <input v-model="form.name" type="text" class="form-control" id="name" placeholder="Your Name" required />
                </div>
                <br />
                <div class="control-group">
                  <input v-model="form.email" type="email" class="form-control" id="email" placeholder="Your Email" required />
                </div>
                <br />
                <div class="control-group">
                  <input v-model="form.subject" type="text" class="form-control" id="subject" placeholder="Subject" required />
                </div>
                <br />
                <div class="control-group">
                  <textarea v-model="form.message" class="form-control" id="message" placeholder="Message" required></textarea>
                </div>
                <br />
                <div>
                  <button class="btn btn-info" type="submit" id="sendMessageButton">Send Message</button>
                </div>
              </form>
            </div>
          </div>

          <!-- Google Maps Embed Section -->
          <div class="col-md-12">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7972.710140041467!2d30.061215372991505!3d-1.9444632945796813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca7c49cb64b0b%3A0x68b67692a6883f6!2sGasabo%20District%2C%20Kigali%2C%20Rwanda!5e0!3m2!1sen!2srw!4v1698678866543!5m2!1sen!2srw"
              width="600" 
              height="450" 
              style="border:0;" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </div>
    <!-- Contact End -->
  </div>
</template>

<script>
export default {
  name: "ContactPage",
  data() {
    return {
      // Data for dynamic styling and contact information
      // @ts-ignore
      carouselImageUrl: require('../../assets/Homepage_images/carousel5.jpg'), // Adjust path as needed
      contactInfo: [
        { id: 1, title: 'Opening Hour', detail: 'Mon - Fri, 8:00 - 9:00', icon: 'far fa-clock' },
        { id: 2, title: 'Call Us', detail: '+012 345 6789', icon: 'fa fa-phone-alt' },
        { id: 3, title: 'Email Us', detail: 'info@example.com', icon: 'far fa-envelope' }
      ],
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    };
  },
  methods: {
    handleSubmit() {
      // Handle the form submission, e.g., send the data via an API
      console.log("Form submitted", this.form);
      // Reset form
      this.form.name = '';
      this.form.email = '';
      this.form.subject = '';
      this.form.message = '';
      alert('Message sent successfully!');
    }
  }
};
</script>

<style scoped>
/* Your scoped styles here */

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
/********* Contact CSS *********/
/*******************************/
.contact {
    position: relative;
    width: 100%;
    padding: 45px 0;
}

.contact .contact-info {
    width: 100%;
    margin-bottom: 45px;
    padding: 35px 30px 10px 30px;
    border-radius: 5px;
    background: #202C45;
    
}

.contact .contact-info h2 {
    color: #ffffff;
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 30px;
}

.contact .contact-info-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 30px;
}

.contact .contact-info-icon {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    border-radius: 50px;
}

.contact .contact-info-icon i {
    margin: 0;
    color: #202C45;
    font-size: 16px;
}

.contact .contact-info-text {
    padding-left: 20px;
}

.contact .contact-info-text h3 {
    margin: 0 0 5px 0;
    color: #ffffff;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 1px;
}

.contact .contact-info-text p {
    margin: 0;
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
}

.contact .contact-form {
    position: relative;
    width: 100%;
    margin-bottom: 45px;
}

.contact .contact-form input {
    padding: 15px;
    border-radius: 5px;
    border: 1px solid #202C45;
}

.contact .contact-form textarea {
    height: 125px;
    padding: 8px 15px;
    border-radius: 5px;
    border: 1px solid #202C45;
}

.contact .help-block ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
}

.contact iframe {
    width: 100%;
    height: 400px;
    border-radius: 5px;
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
