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
            <h3 class="flex pb-4">Pay by using momo :&nbsp;<img src="https://images.africanfinancials.com/f41c3ca9-rw-mtn-logo.png" width="30" height="30" style="border-radius: 50%;"></h3>
            <ul class="space-y-4 text-gray-700">
              <li>
                <span class="font-semibold">Amount:</span>
                {{ pay_amount == '5000' ? '5,000' : pay_amount == '12000' ? '12,000' : pay_amount == '20000' ? '20,000' : pay_amount }} Frw
              </li>
              <li>
                <span class="font-semibold">Duration:</span>
                {{ pay_duration == 15 ? 'Yearly + 3 Months' : pay_duration + ' Months' }}
              </li>
              <li>
                <span class="font-semibold">Days:</span> {{ pay_days }} days actively
              </li>
            </ul>
          </div>

          <!-- Payment Form Section -->
          <div class="bg-gray-50 p-6 rounded-lg shadow-md">
            <!-- Success Message -->
            <div v-if="message" class="p-2 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg text-center justify-center items-center" role="alert">
              <i class="fa fa-exclamation-circle"></i> {{ message }}
            </div>

            <!-- Error Message -->
            <div v-if="message_error" class="p-2 mb-4 text-sm text-red-700 bg-red-100 rounded-lg text-center justify-center items-center" role="alert">
              <i class="fa fa-exclamation-circle"></i> {{ message_error }}
            </div>

            <!-- Payment Form -->
            <form @submit.prevent="submitPayment">
              <!-- Phone Number Input -->
              <div class="mb-4">
                <label for="phone" class="block text-sm font-medium text-gray-600">Phone Number</label>
                <input
                  v-model="phone"
                  type="tel"
                  id="phone"
                  name="phone"
                  class="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="e.g., 0781234567"
                />
              </div>

              <!-- Amount Input (Read-Only) -->
              <div class="mb-4">
                <label for="amount" class="block text-sm font-medium text-gray-600">Amount (Frw)</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  class="w-full mt-2 p-3 border rounded-lg bg-gray-100 text-gray-600"
                  :value="pay_amount"
                  readonly
                />
              </div>

              <!-- Hidden Duration Input -->
              <div class="mb-4">
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  class="w-full mt-2 p-3 border rounded-lg bg-gray-100 text-gray-600"
                  :value="pay_duration"
                  style="display: none;"
                />
              </div>

              <!-- Submit Button -->
              <div class="flex justify-center">
                <button
                  type="submit"
                  class="w-full text-white px-2 py-2 ml-4 mr-4 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-200 hover:bg-gradient-to-l hover:from-blue-600 hover:to-sky-200 focus:outline-none font-semibold transition"
                  v-if="loading"
                >
                  <i class="fa fa-spinner fa-spin"></i>&nbsp;Paying...
                </button>
                <button
                  type="submit"
                  class="w-full text-white px-2 py-2 ml-4 mr-4 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-200 hover:bg-gradient-to-l hover:from-blue-600 hover:to-sky-200 focus:outline-none font-semibold transition"
                  v-else
                >
                  Pay with MTN MoMo
                </button>
              </div>
            </form>
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
    };
  },
  mounted() {
    this.pay_amount = localStorage.getItem("pay_amount");
    this.pay_duration = localStorage.getItem("pay_duration");
    this.pay_days = localStorage.getItem("pay_days");
  },
  methods: {
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
