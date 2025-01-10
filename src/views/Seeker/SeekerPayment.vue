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
                  <span class="font-semibold">Amount:</span> {{ pay_amount }} Frw
                </li>
                <li>
                  <span class="font-semibold">Duration:</span> 
                  {{ pay_duration == 12 ? 'Yearly' : pay_duration + ' Months' }}
                </li>
                <li>
                  <span class="font-semibold">Days:</span> {{ pay_days }} days actively
                </li>
              </ul>
            </div>
  
            <!-- Payment Form Section -->
            <div class="bg-gray-50 p-6 rounded-lg shadow-md">
              <form method="POST" action="">
                
                <!-- Phone Number Input -->
                <div class="mb-4">
                  <label for="phone" class="block text-sm font-medium text-gray-600">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    class="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="e.g., 0781234567"
                    required
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
  
                <!-- Submit Button -->
                <button
                  type="submit"
                  class="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
                >
                  Pay with MTN MoMo
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "SeekerPayment",
    data() {
      return {
        pay_amount: "",
        pay_duration: "",
        pay_days: "",
      };
    },
    mounted() {
      this.pay_amount = localStorage.getItem("pay_amount");
      this.pay_duration = localStorage.getItem("pay_duration");
      this.pay_days = localStorage.getItem("pay_days");
    },
  };
  </script>
  