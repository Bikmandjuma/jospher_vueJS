<template>

    <nav class="bg-white shadow-md p-4">
        <div class="max-w-7xl mx-auto flex justify-center items-center text-center">
        <img src="../../assets/Homepage_images/logo_title.png" alt="cool">
        <!-- <h1 class="text-gray-800 text-2xl font-semibold" style="font-family: Times New Roman;margin-top:10px;">
            <b><span class="text-red-700">Job</span> <span class="text-purple-900">Sphere</span> <span>Rda</span></b>
        </h1> -->
        </div>
    </nav>

    <div class="container">
       
        
        <form class="otc" method="POST" action="">
            <!-- @csrf -->
            <fieldset>
                <legend>Email verification Code</legend>
                <div>
                    <input type="number" name="code[]" id="otc-1" required maxlength="1" autofocus>
                    <input type="number" name="code[]" required maxlength="1">
                    <input type="number" name="code[]" required maxlength="1">
                    <input type="number" name="code[]" required maxlength="1">
                    <input type="number" name="code[]" required maxlength="1">
                    <input type="number" name="code[]" required maxlength="1">
                </div>
            </fieldset>
            <button type="submit">Verify</button>
        </form>
    </div>
</template>

<script>
export default {
    mounted() {
        let in1 = document.getElementById('otc-1'),
            ins = document.querySelectorAll('input[type="number"]'),
            splitNumber = function(e) {
                let data = e.data || e.target.value;
                if (!data) return;

                // If there's more than one digit entered, split them into the inputs
                if (data.length > 1) {
                    popuNext(e.target, data);
                }
            },
            popuNext = function(el, data) {
                // Set value of current input
                el.value = data[0];
                data = data.substring(1);
                // Move to the next input if there is still data to fill
                if (el.nextElementSibling && data.length) {
                    popuNext(el.nextElementSibling, data);
                }
            };

        // Add event listeners to each input
        ins.forEach(function(input) {
            input.addEventListener('keyup', function(e) {
                // Ignore certain keys (Shift, Tab, Command, etc.)
                // @ts-ignore
                if (e.keyCode === 16 || e.keyCode == 9 || e.keyCode == 224 || e.keyCode == 18 || e.keyCode == 17) {
                    return;
                }

                // If backspace or left arrow is pressed, focus on the previous input
                // @ts-ignore
                if ((e.keyCode === 8 || e.keyCode === 37) && this.previousElementSibling && this.previousElementSibling.tagName === "INPUT") {
                    this.previousElementSibling.focus();
                } 
                // Move focus to the next input if it exists
                // @ts-ignore
                else if (e.keyCode !== 8 && this.nextElementSibling) {
                    this.nextElementSibling.focus();
                }

                // If input value exceeds 1 character, split the number into subsequent inputs
                // @ts-ignore
                if (e.target.value.length > 1) {
                    splitNumber(e);
                }
            });

            // Handle focus behavior on inputs
            input.addEventListener('focus', function() {
                // Focus first input if it's empty
                // @ts-ignore
                if (this === in1 && in1.value == '') {
                    in1.focus();
                }

                // If the previous input is empty, move focus there
                if (this.previousElementSibling && this.previousElementSibling.value == '') {
                    this.previousElementSibling.focus();
                }
            });
        });

        // Handle the input event for the first input to split values when typed
        in1.addEventListener('input', splitNumber);
    }
}
</script>


<style scoped>
        
        body, html {
            height: 100%;
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            display: flex;
            align-items: center;
            max-height: 100;
            justify-content: center;
            color: #333;
        }

        #title{
            display: flex;
            text-align: center;
            align-items: center;
            text-align: justify;
            justify-content: center;
            margin-bottom: 20px;
        }

        #title span{
            font-size: 20px;
            font-weight: bold;
            font-style: italic;
        }

        .container {
            width: 100%;
            max-width: 500px;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            padding: 30px;
            box-sizing: border-box;
            text-align: center;
            margin-top: 10%;
        }

        h3 {
            color: #333;
            font-size: 24px;
            margin-bottom: 20px;
            font-weight: 600;
        }

        .otc {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .otc fieldset {
            border: none;
            padding: 0;
            margin: 0;
        }

        .otc legend {
            color: #333;
            font-size: 25px;
            margin-bottom: 20px;
        }

        /* Style for input fields */
        input[type="number"] {
            width: 30px;
            height: 30px;
            margin: 5px;
            font-size: 24px;
            text-align: center;
            border: 2px solid #ccc;
            border-radius: 8px;
            background-color: #f9f9f9;
            outline: none;
            transition: border 0.3s ease;
        }

        input[type="number"]:focus {
            border-color: #007BFF;
        }

        .error-message {
            color: red;
            font-size: 14px;
            margin-top: 10px;
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

        /* Animation for inputs */
        input[type="number"] {
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }

        /* Media query for small devices */
        @media (max-width: 600px) {
            .otc div {
                display: flex;
                justify-content: space-between; /* Align inputs horizontally */
                flex-wrap: wrap; /* Allow inputs to wrap to next line on very small screens */
                gap:3px; /* Add some space between inputs */
            }

            input[type="number"] {
                width: 30px; /* Slightly smaller width for small devices */
                height: 30px;
            }

            button {
                width: 100%; /* Make the button full-width on small devices */
            }
        }

</style>