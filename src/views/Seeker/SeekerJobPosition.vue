<template>
  <div>
    <section class="section profile">
      <div class="flex flex-wrap xl:flex-nowrap m-2">
        <!-- Left Column -->
        <div class="w-full xl:w-1/4 mb-4">
          <div class="card border rounded-lg shadow-md">
            <div class="card-body p-1">
              <div style="max-height: 400px; overflow: auto;">
                <h4 class="text-center items-center justify-center">
                  Job Categories&nbsp;
                  <span class="badge bg-primary" style="border-radius: 50%;">{{ categories.length }}</span>
                </h4>

                <ul id="category_id">
                  <li
                    v-for="(category, index) in categories"
                    :key="index"
                    @click="fetchJobs(category)"
                    class="category p-1"
                  >
                    <i class="fa fa-arrow-right"></i>&nbsp;&nbsp;{{ category }}
                    <span
                      class="float-right text-sm text-gray-900"
                      style="width: auto; white-space: nowrap;"
                    >
                      ({{ getCategoryCount(category) }})
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="w-full xl:w-3/4 mb-4">
          <div class="card border rounded-lg shadow-md" style="max-height: 400px; overflow: auto;">
            <div class="card-body p-1">
              <div class="space-y-4">
                <h4
                  v-if="selectedCategory"
                  class="sticky top-0 z-10 bg-white p-2 text-center justify-center items-center"
                >
                  Jobs for <span class="text-primary">{{ selectedCategory }}</span> {{ jobPositions.length }}
                </h4>
                <ul v-if="jobPositions.length > 0" class="pb-3 p-2">
                  <li v-for="(job, index) in jobPositions" :key="index" class="mt-2">
                    <a
                      :href="getJobUrl(job)"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-blue-600 hover:text-black"
                    >
                      <i class="fa fa-briefcase"></i>&nbsp;{{ job.title }}
                    </a><hr>
                  </li>
                  
                </ul>

                <p v-else class="text-center justify-center items-center">No jobs found for this category.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { flaskApiUrl, laravelApiUrl } from '../../api';

export default {
  data() {
    return {
      categories: [],
      flaskData: {},
      selectedCategory: null,
      jobPositions: [],
    };
  },

  methods: {
    async fetchData() {
      try {
        const token = localStorage.getItem('auth_token');

        // Fetch categories from Laravel API
        const laravelResponse = await fetch(`${laravelApiUrl}/user/fetch_user_job_categories`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const laravelData = await laravelResponse.json();
        this.categories = laravelData.category_names.map((skills) => skills.skills);

        // Fetch job positions from Flask API
        const flaskResponse = await fetch(`${flaskApiUrl}/fetch_job_position`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const flaskData = await flaskResponse.json();
        this.flaskData = flaskData.categorized_jobs;

        // Store total job count in localStorage
        this.storeTotalJobCount();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    fetchJobs(category) {
      this.selectedCategory = category;
      this.jobPositions = this.flaskData[category] || [];

      // Store job count for the selected category
      // @ts-ignore
      localStorage.setItem('count_job_position', this.jobPositions.length);
    },

    getCategoryCount(category) {
      return this.flaskData[category]?.length || 0;
    },

    storeTotalJobCount() {
      let totalJobs = 0;

      // Calculate total job positions across all categories
      this.categories.forEach((category) => {
        totalJobs += this.getCategoryCount(category);
      });

      // Store the total job count in localStorage
      // @ts-ignore
      localStorage.setItem('total_job_positions', totalJobs);
    },

      getJobUrl(job) {
        
        if (job.origin === "https://www.rwandajob.com/job-vacancies-search-rwanda") {
          const truncatedTitle = job.title.substring(0, 100);

          const sanitizedTitle = encodeURIComponent(truncatedTitle)
          
            .replace(/%20/g, '-')
            .replace(/%2F/g, '/');

          return `${job.origin}/${sanitizedTitle}`;
        
        }else if (job.origin === "https://www.jobinrwanda.com/") {

          const truncatedTitle = job.title.substring(0, 100);

          const sanitizedTitle = encodeURIComponent(truncatedTitle)
            .replace(/%20/g, '+');
          
          const url_origin = 'https://www.jobinrwanda.com/jobs/search-result?filter_titles_field';

          return `${url_origin}=${sanitizedTitle}`;
        
        }else if (job.origin === "https://jobportal.kora.rw/service/service-job") {

          const truncatedTitle = job.title.substring(0, 100);
          const sanitizedTitle = encodeURIComponent(truncatedTitle)
            .replace(/%20/g, '+');
          
          const url_origin ='https://jobportal.kora.rw/service/service-job?title';

          return `${url_origin}=${sanitizedTitle}`;

        }

        return job.origin;
      
      }


  },

  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.category {
  cursor: pointer;
  color: blue;
  font-family: Arial, Helvetica, sans-serif;
}
.category:hover {
  color: darkblue;
}
.category span {
  float: right;
  font-size: 0.9rem;
  color: gray;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}
</style>
