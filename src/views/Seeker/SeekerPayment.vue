<template>
  <section class="py-8 px-4 bg-gray-100 min-h-screen">
    <div class="max-w-4xl mx-auto">
      <!-- Page Title -->
      <h1 class="text-2xl font-bold text-gray-800 text-center mb-6">MTN MoMo Payment</h1>

      <div class="bg-white shadow-lg rounded-lg p-6">
        <!-- Payment Details -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Payment Info Section -->
          <div>
            <h3 class="flex pb-4">Pay by using MoMo-code :&nbsp;<img src="https://images.africanfinancials.com/f41c3ca9-rw-mtn-logo.png" width="30" height="30" style="border-radius: 50%;"></h3>
            <ul class="space-y-4 text-gray-700">
              <li>
                <span class="font-semibold">Amount:</span>
                {{ pay_amount == '5000' ? '5,000' : pay_amount == '12000' ? '12,000' : pay_amount == '20000' ? '20,000' : pay_amount }} Frw
              </li>
              <li>
                <span class="font-semibold">Duration:</span>
                {{ formattedDuration }}
              </li>
              <li>
                <span class="font-semibold">Days:</span> {{ pay_days }} days actively
              </li>
            </ul>
            <ul class="space-y-4 text-gray-700">
              <li class="mt-2">
                <p>Payment code is : <span class="py-1 px-2 bg-info rounded-lg text-white"><b>116363</b></span></p>
              </li>
             
            </ul>

            <ul>
              <a
                  style="text-decoration: none;"
                  class="w-full mt-2 text-white text-center justify-center items-center px-2 py-2 ml-4 mr-4 rounded-xl bg-blue-400  focus:outline-none font-semibold transition"
                >
                *182*8*1*116363*{{ (pay_amount === '5000' ? '5000' : (pay_amount === '12000' ? '12000' : (pay_amount === '20000' ? '20000' : pay_amount)) ) + '#' }}
                </a>
            </ul>
            
          </div>
          

          <!-- Payment Form Section -->
          <div class="bg-gray-50 p-6 rounded-lg shadow-md">

              <div class="mb-4 ">
                <h2 for="phone" class="block text-sm font-medium text-gray-600">Send us , payment proof on whatsapp&nbsp;<i class="fab fa-whatsapp"></i> </h2>
                <label class="mt-2">Send us these three items</label>
                <ul style="list-style-type: numeric;margin-top:2px;">
                  <li>Reg-code , ex:25JSR00001</li>
                  <li>Names : fname , lname</li>
                  <li>proof of payment</li>
                  ex:
                  <div class="bg-white text-sm">
                    <p class="p-2">
                      Txld:18700555168. Your payment of {{ (pay_amount === '5000' ? '5000' : (pay_amount === '12000' ? '12000' : (pay_amount === '20000' ? '20000' : pay_amount)) ) }} RWF
                      to  TECLA GROUPE Ltd 116363  has been completed at {{ formattedTime }} Your new balance:100 RWF . Fee was 0 RWF.
                    </p>
                  </div>
                </ul>
                <p class="sm:text-base md:text-md">You need to send all three required items (reg-code,your-names,payment-proof) to gain full access to {{ formattedDuration }} ({{pay_days}} days) of job positions for applying. Our WhatsApp number is <b><a href="https://wa.me/0795760041" target="_blank" style="text-decoration: none;">0795760041</a></b></p>
                <!-- <p class="sm:text-sm">we are here to help you to get a dream job ,contact us anytime , we are available 24/7/365</p> -->
                <p class="sm:text-base md:text-md">
                  We are here to help you get your dream job. Contact us anytime; we are available 24/7/365.
                </p>

              </div>

              <!-- Submit Button -->
              <div class="flex justify-center">
                
              </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { laravelApiUrl } from '../../api';

export default {
  name: "SeekerPayment",
  data() {
    return {
      phone: '',
      pay_amount: "",
      pay_duration: "",
      pay_days: "",
      loading: false,
      message: '',
      message_error: '',
      formattedTime: '',
    };
  },
  mounted() {
    this.updateTime();
    this.pay_amount = localStorage.getItem("pay_amount");
    this.pay_duration = localStorage.getItem("pay_duration");
    this.pay_days = localStorage.getItem("pay_days");
  },
  computed: {
    formattedDuration() {
      if (this.pay_duration === "15") {
        return 'Yearly + 3 Months';
      } else if (this.pay_duration === "3" || this.pay_duration === "8") {
        return `${this.pay_duration} Month${this.pay_duration > 1 ? 's' : ''}`;
      } else {
        return `${this.pay_duration} Months`;
      }
    }
  },
  methods: {
    updateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so add 1
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      
      this.formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      
      // Optionally, you can update the time every second to keep it current
      setTimeout(this.updateTime, 5000); // Update every second
    },
    async submitPayment() {
      this.loading = true;
      try {
        const paymentData = {
          phone: this.phone,
          amount: this.pay_amount,
          duration: this.pay_duration,
        };

        const token = localStorage.getItem("auth_token");

        const response = await axios.post(`${laravelApiUrl}/user/initiate-payment`, paymentData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        // Handle the response from the API
        if (response.data.reference_id) {
          this.message = `Payment initiated successfully. Reference ID: ${response.data.reference_id}`;
          setTimeout(() => {
            this.message = '';
          }, 5000);
        } else {
          this.message_error = "Failed to initiate payment.";
          setTimeout(() => {
            this.message_error = '';
          }, 5000);
        }
      } catch (error) {
        console.error('Payment initiation failed:', error);

        // New error handling based on the Laravel error structure
        if (error.response && error.response.data) {
          if (error.response.data.status === 'error') {
            if (error.response.data.errors) {
              // If validation errors exist
              this.message_error = Object.values(error.response.data.errors).join(', ') || 'An unexpected error occurred.';
            } else {
              // If there is a general error message
              this.message_error = error.response.data.message || 'An unexpected error occurred.';
            }
            setTimeout(() => {
              this.message_error = '';
            }, 5000);
          } else {
            this.message_error = 'Failed to initiate payment. Please try again.';
            setTimeout(() => {
              this.message_error = '';
            }, 5000);
          }
        } else {
          this.message_error = 'Failed to initiate payment. Please try again.';
          setTimeout(() => {
            this.message_error = '';
          }, 5000);
        }
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
