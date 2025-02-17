<template>
  <section class="payment-section">
    <div class="container">
      <h1 class="page-title">MTN MoMo Payment</h1>

      <div class="payment-box">
        <div class="payment-grid">
          <div>
            <h3 class="payment-header">
              Pay by using MoMo-code:&nbsp;
              <img src="https://images.africanfinancials.com/f41c3ca9-rw-mtn-logo.png" class="momo-logo">
            </h3>
            <ul class="payment-details">
              <li>
                <span class="label">Amount:</span>
                {{ pay_amount == '5000' ? '5,000' : pay_amount == '12000' ? '12,000' : pay_amount == '20000' ? '20,000' : pay_amount }} Frw
              </li>
              <li><span class="label">Duration:</span> {{ formattedDuration }}</li>
              <li><span class="label">Days:</span> {{ pay_days }} days actively</li>
            </ul>

            <ul class="payment-code">
              <li>
                <p>Payment code is: <span class="code-box">116363</span></p>
              </li>
            </ul>

            <ul>
              <a class="payment-link">
                *182*8*1*116363*{{ pay_amount }}#
              </a>
            </ul>
          </div>

          <div class="whatsapp-section">
            <h4 class="pb-2">Send us payment proof on WhatsApp&nbsp;<i class="fab fa-whatsapp"></i>,to get access</h4>
            <label>Send us these three items</label>
            <ul class="list-items">
              <li>Reg-code : <b>{{ userData.user_code }}</b></li>
              <li>Names : <b>{{ userData.firstname }} {{ userData.lastname }}</b></li>
              <li>Proof-payment</li>
                  <p>Ex:</p>
                  <div class="payment-example">
                    <p>
                      Txld:18700555168. Your payment of {{ pay_amount }} RWF to TECLA GROUPE Ltd 116363 has been completed at {{ formattedTime }}. Your new balance: 100 RWF. Fee was 0 RWF.
                    </p>
                  </div>
            </ul>
            <hr>
            <!-- <p>Ex:</p>
            <div class="payment-example">
              <p>
                Txld:18700555168. Your payment of {{ pay_amount }} RWF to TECLA GROUPE Ltd 116363 has been completed at {{ formattedTime }}. Your new balance: 100 RWF. Fee was 0 RWF.
              </p>
            </div> -->
            <p class="whatsapp-instruction">
              You need to send all three required items (Reg-code, Names, payment-proof) to gain full access to {{ formattedDuration }} ({{ pay_days }} days) of job positions for applying. Our WhatsApp number is <b><a href="https://wa.me/+250795760041" target="_blank">0795760041</a></b>
            </p>
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
      userData: {
        user_code: '...',
        firstname: '...',
        lastname: '...',
      },
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

    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.$router.push({ name: 'Login' });
    } else {
      this.fetchUserData(token);
    }

  },
  computed: {
    formattedDuration() {
      if (this.pay_duration === "15") {
        return 'Yearly + 3 Months';
      } else if (this.pay_duration === "3" || this.pay_duration === "8") {
        // @ts-ignore
        return `${this.pay_duration} Month${this.pay_duration > 1 ? 's' : ''}`;
      } else {
        return `${this.pay_duration} Months`;
      }
    }
  },
  methods: {
    fetchUserData(token) {
      axios
        .get(`${laravelApiUrl}/user/view_info`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          if (response.data?.user_info) {
            this.userData = response.data.user_info;
          } else {
            console.error('User data not found');
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          if (error.response?.status === 401) {
            this.$router.push({ name: 'Login' });
          }
        });
    },
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

<style scoped>
.payment-section {
  padding: 2rem 1rem;
  background-color: #f3f4f6;
  min-height: 100vh;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
}

.payment-box {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.payment-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 1024px) {
  .payment-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.payment-header {
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
}

.momo-logo {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.payment-details {
  list-style: none;
  padding: 0;
}

.payment-details li {
  margin-bottom: 0.5rem;
  color: #4a4a4a;
}

.label {
  font-weight: 600;
}

.payment-code {
  margin-top: 1rem;
}

.code-box {
  padding: 0.25rem 0.5rem;
  background-color: #17a2b8;
  color: white;
  border-radius: 5px;
}

.payment-link {
  display: inline-block;
  margin-top: 1rem;
  background-color: #60a5fa;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
}

.whatsapp-section {
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.list-items {
  list-style-type: decimal;
  margin-top: 0.5rem;
}

.payment-example {
  background: white;
  font-size: 0.875rem;
  padding: 0.5rem;
  border-radius: 4px;
}

.whatsapp-instruction {
  font-size: 1rem;
  margin-top: 1rem;
}

.whatsapp-instruction a {
  text-decoration: none;
  color: #007bff;
}
</style>
