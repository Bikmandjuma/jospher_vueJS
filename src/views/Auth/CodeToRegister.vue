<template>

    <nav class="bg-white shadow-md p-4">
        <div class="max-w-7xl mx-auto flex justify-center items-center text-center">
        <img src="../../assets/Homepage_images/logo_title.png" alt="cool">
        <!-- <h1 class="text-gray-800 text-2xl font-semibold" style="font-family: Times New Roman;margin-top:10px;">
            <b><span class="text-red-700">Job</span> <span class="text-purple-900">Sphere</span> <span>Rda</span></b>
        </h1> -->
        </div>
    </nav>

    <div class="container mt-5">
        <!-- <img src="{{ URL::to('/') }}/mainHomePage/img/new_logo.png" alt="cool" style="width:200px;height: 50px;margin-bottom: 20px;"> -->
        
        <div v-if="message" class="alert_msg_code_ver">
            {{ message }}
        </div>

        <div v-if="message_localSto" class="alert_msg_local">
            {{ message_localSto }}
        </div>


        <form class="otc" @submit.prevent="verifyCode">
            <fieldset>
                <legend>Email Verification Code</legend>
                <div class="inputs-container">
                    <!-- Single input to capture the code with dashes -->
                    <input v-model="codeString" type="text" maxlength="7" required @input="onInput" autofocus>
                </div>
            </fieldset>
            <button type="submit">Verify</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { laravelApiUrl } from '../../api';
export default {
    data() {
        return {
            // Holds the code as a string with dashes
            codeString: '',
            message: '', // Message to display
            message_localSto:'',
        };
    },

    methods: {
        // Function to handle code verification
        async verifyCode() {
            // Remove dashes and send the plain code
            const code = this.codeString.replace(/-/g, ''); 

            // Get the email from localStorage
            const email = localStorage.getItem('seeker_email');

            if (!email) {
                this.message = 'Email not found in localStorage.';
                return;
            }

            // if (!email) {
            //     this.$router.push({name: 'Register'});
            //     return;
            // }

            // API request to verify the code
            try {
                const response = await axios.post(`${laravelApiUrl}/user/verify/code_to_register/${email}`, { 
                    code 
                });

                // Check if the response contains 'info' or 'error' and display the message
                if (response.data.info) {
                    this.message = response.data.info; // For success response
                    this.$router.push({name: 'SeekerFill_Info'}); // Redirect to the next step
                } else if (response.data.error) {
                    this.message = response.data.error; // For error response (invalid/expired code)
                }
            } catch (error) {
                // Handle errors (e.g., network issues or API errors)
                if (error.response && error.response.data) {
                    this.message = error.response.data.error || 'An unexpected error occurred.';
                }
            }
        },

        // Function to handle the input and format it
        onInput() {
            // Remove any non-numeric characters and split it into a 6-character code
            let formattedCode = this.codeString.replace(/\D/g, '').slice(0, 6);

            // Add dashes after every 3 digits
            if (formattedCode.length > 3) {
                formattedCode = formattedCode.slice(0, 3) + '-' + formattedCode.slice(3);
            }

            // Update the model with the formatted code
            this.codeString = formattedCode;
        }
    },
    mounted(){

        this.message_localSto = localStorage.getItem('verificationMessage') || '';

        if (this.message_localSto) {
            setTimeout(() => {
                this.message_localSto = '';
                localStorage.removeItem('verificationMessage');
            }, 5000);
        }
    }
};
</script>

<style scoped>

.alert_msg_local{
    background-color:#007BFF; /* Green background */
    color: white;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
}
.container {
    width: 100%;
    max-width: 500px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    padding: 30px;
    box-sizing: border-box;
    text-align: center;
}

.otc {
    display: flex;
    flex-direction: column;
    align-items: center;
}

input[type="text"] {
    width: 150px;
    height: 40px;
    margin: 5px;
    font-size: 24px;
    text-align: center;
    border: 2px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    outline: none;
    transition: border 0.3s ease;
}

input[type="text"]:focus {
    border-color: #007BFF;
}

button {
    background-color: #007BFF;
    color: white;
    padding: 12px 30px;
    border: none;
    border-radius: 6px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 20px;
}

button:hover {
    background-color: #0056b3;
}

.alert_msg_code_ver {
    color: red;
    font-size: 14px;
    margin-top: 10px;
}
</style>
