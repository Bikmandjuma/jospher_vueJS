<template>
    <section class="main_search_container">
      <div class="search-container">
        <input
          type="text"
          id="search-input"
          v-model="searchQuery"
          :placeholder="`Searching ... ${job_count} jobs found in system`"
        />
        <div id="search-icon" class="search-icon" @click="openModal">🔍</div>
        <div v-if="showSuggestions" id="suggestions" class="suggestions">
          <div v-for="(suggestion, index) in filteredSuggestions" :key="index" class="suggestion-item">
            {{ suggestion }}
          </div>
        </div>
      </div>
    </section>
  
    <!-- Modal -->
    <div v-if="isModalOpen" id="search-modal" class="modal">
      <div class="modal-content">
        <span id="close-modal" class="close" @click="closeModal">&times;</span>
        <p>
          You have to create an account first, &nbsp;
          <a href="/register" style="color:blue;">Sign up</a>
        </p>
      </div>
    </div>
  
    <!-- Testimonial Start -->
    <div class="price" style="margin-top:-2%;">
      <div class="container">
        <div class="section-header text-center" style="font-family: sans-serif; font-style: italic;">
          <!-- <p>Job Listings by Category</p> -->
           <br>
          <h5 style="text-decoration:underline; margin-top: 3px;">
            Jobs <i class="text-secondary">{{ job_count }}</i> and categories <i class="text-secondary">{{ filteredCategorizedJobs.length }}</i>
          </h5>
        </div>
      </div>
    </div>
  
    <div class="testimonial">
      <div class="container">
        <div class="owl-carousel testimonials-carousel">
          <div v-for="(category, index) in filteredCategorizedJobs" :key="index" class="testimonial-item-job">
            <div class="testimonial-text">
              <h3>{{ category.name }} (<i class="text-secondary">{{ category.jobs.length }}</i> jobs)</h3>
              <ul>
                <li v-for="(job, jobIndex) in category.jobs.slice(0, 5)" :key="jobIndex">
                  {{ job.length > 34 ? job.substring(0, 34) + '...' : job }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Testimonial End -->
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '', // Two-way binding for search input
        job_count: 100, // Example job count
        categorized_jobs: [
          { name: "Technology", jobs: ["Developer", "Designer", "Engineer"] },
          { name: "Marketing", jobs: ["SEO Specialist", "Content Writer"] },
          { name: "Design", jobs: [] }, // Empty category for testing
          // Add more categories as needed
        ],
        job_listings: [
          "Developer", "Designer", "Content Writer", "SEO Specialist", "Engineer", // Add jobs
        ],
        isModalOpen: false,
        showSuggestions: false,
      };
    },
    computed: {
      // Filtered categorized jobs (exclude empty categories)
      filteredCategorizedJobs() {
        return this.categorized_jobs.filter(category => category.jobs.length > 0);
      },
      // Filtered suggestions based on search query
      filteredSuggestions() {
        if (this.searchQuery === '') {
          return [];
        }
        return this.job_listings.filter(job => job.toLowerCase().includes(this.searchQuery.toLowerCase()));
      },
    },
    methods: {
      openModal() {
        if (this.searchQuery) {
          this.isModalOpen = true;
        }
      },
      closeModal() {
        this.isModalOpen = false;
      },
    },
  };
  </script>
  
  <style scoped>
  
  /* Add your custom styles here */
  
  /* Modal styles */
  /* .modal { */
    /* display: block; */
    /* Add styling for the modal */
  /* } */
  /* .modal-content {
    background-color: #fefefe;
    padding: 20px;
    border: 1px solid #888;
  }
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  
  .suggestions {
    border: 1px solid #ccc;
    background-color: white;
    max-height: 200px;
    overflow-y: auto;
  }
  
  .suggestion-item {
    padding: 8px;
    cursor: pointer;
  }
  
  .suggestion-item:hover {
    background-color: #f1f1f1;
  } */
  .main_search_container {
/*            background-color: #f3f4f6;*/
            display: flex;
            flex-direction: column; /* Stack children vertically */
            justify-content: center; /* Center vertically */
            align-items: center; /* Center horizontally */
/*            height: 100vh;*/
            margin-top:4%;
            margin-bottom:20px;
        }

        #top_nav_bar {
            display: flex;
            justify-content: space-between; /* Align items with space between */
            width: 100%; /* Full width */
            padding: 10px 20px; /* Add padding */
            background-color: #ffffff; /* Background color for visibility */
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add shadow for depth */
            position: absolute; /* Position absolutely to float above main content */
            top: 0; /* Align to top */
            z-index: 1000; /* Ensure it appears above other content */
        }

        #top_nav_bar h2 {
            text-align: center; /* Center the text */
            width: 100%; /* Make it full width */
            font-family: cursive;
            font-style: italic;
            margin: 0; /* Remove any default margins */
            padding: 5px 0px 5px 0px; /* Add some vertical padding for spacing */
        }

        #top_nav_bar h2 img {
            vertical-align: middle;
        }

        #top_nav_bar img{
            position: relative;
            margin-top: -5px;
        }


        /* Account button style */
        .account-button {
            background-color: #007bff; /* Button color */
            color: white; /* Text color */
            border: none; /* No border */
            border-radius: 5px; /* Rounded corners */
            padding: 5px 10px; /* Padding around the text */
            cursor: pointer; /* Pointer cursor on hover */
            display: inline-flex; /* Flexbox for alignment */
            align-items: center; /* Center icon and text vertically */
            margin-left: 10px; /* Space between title and button */
        }

        .account-button i {
            margin-right: 5px; /* Space between icon and text */
        }


        /* Search Container */
        .search-container {
            position: relative;
            width: 100%;
            max-width: 600px;
            display: flex;
            align-items: center;
        }

        #search-input {
            width: 100%;
            padding: 20px 50px 20px 20px; /* Padding for icon space */
            border: 2px solid #ddd;
            border-radius: 50px;
            font-size: 23px;
            outline: none;
            transition: all 0.3s ease;
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4);
        }

        #search-input:focus {
            border-color: #007bff;
            box-shadow: 0 0 10px rgba(0, 123, 255, 0.3);
        }

        /* Search Icon */
        .search-icon {
            position: absolute;
            right: 20px;
            font-size: 40px;
            color: #007bff;
            cursor: pointer; /* Change cursor to pointer */
        }

        /* Suggestions Container */
        .suggestions {
            position: absolute;
            top: 100%; /* Position below the input field */
            left: 0;
            right: 0;
            background-color: white;
            border: 1px solid #ddd;
            border-radius: 0 0 10px 10px;
            z-index: 10;
            max-height: 250px; /* Max height for the suggestions */
            overflow-y: auto; /* Scroll if necessary */
            display: none; /* Hide initially */

        }

        .suggestion-item {
            padding: 10px;
            cursor: pointer;
        }

        .suggestion-item:hover {
            background-color: #f0f0f0; /* Highlight on hover */
        }

        .highlight {
            color: blue; /* Highlight text color */
        }


        /* Responsive Design */
        @media (max-width: 768px) {
            #search-input {
                margin-top: 20px;
                font-size: 16px;
                padding: 20px 45px 25px 10px;
            }

            .section-header{
                margin-top: -30px;
            }

            .search-icon {
                font-size: 30px;
                margin-top:4%;
            }


            .suggestions{
                overflow-y: auto;
                max-height: 300px;
            }

            #top_nav_bar {
                display: flex; /* Ensure it is displayed on small screens */
            }
        }

        @media (max-width: 480px) {
            #search-input {
                font-size: 14px;
                padding: 16px 40px 16px 12px; /* Adjust padding for small screens */
            }


            .suggestions{
                overflow-y: auto;
                max-height: 300px;
            }

            .search-icon {
                font-size: 28px;
            }
        }

        .no-match-message {
            color: red; /* Change color as needed */
            padding: 10px;
            font-style: italic;
            text-align: center;
        }

        .testimonial-item-job{
            background-color:white;
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
            position: relative;
            width: 95%;
            margin-left: 5px;
            padding: 0 15px;
            display: flex;
        }


        .testimonial{
            position: relative;
            width: 100%;
            padding: 0 15px;
            display: flex;
        }

        /*.testimonial .testimonial-item-job i {
            width: 150px;
            height: 150px;
            border-radius: 80px;
            transform: scale(.8);
            transition: 2s;
        }*/

        .testimonial .owl-item.center .testimonial-item-job i {
            transform: scale(1);
        }

        .view_btn{
            margin: 0;
            padding: 0;
        }



        /* Modal Styles */
        .modal {
            display: none; /* Hidden by default */
            position: fixed; /* Fixed in place */
            z-index: 1000; /* Sit on top of other content */
            left: 0;
            top: 0;
            width: 100%; /* Full screen width */
            height: 100%; /* Full screen height */
            background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
        }

        .modal-content {
            background-color: white;
            margin: 15% auto;
            padding: 20px;
            border-radius: 5px;
            width: 80%; /* Or any size you prefer */
            max-width: 500px;
        }

        .modal-content p{
            text-align: center;
            justify-content: center;
            font-family: sans-serif;
            font-size:20px;
        }

        #close-modal{
            display: flex;
            position: relative;
            float: right;
            margin-right: 10px;
        }

        /* Close Button */
        .close {
            position: relative;
            float: right;
            margin-right: 5px;
            color: red;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }

        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
</style>
  