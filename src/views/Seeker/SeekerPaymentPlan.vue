<template>   

<!-- Price Start -->
        <div class="price">
            <div class="container">
                <div class="section-header text-center">
                    <p id="ad_title">Job Seekers' Payment</p>
                    <h2>Choose Your Plan</h2>
                    <br>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="price-item">
                            <div class="price-header">
                                <h3>2 Months</h3>
                                <h2><span></span><strong>5,000</strong><span>Frw</span></h2>
                            </div>
                            <div class="price-body">
                                <ul>
                                    <li><i class="far fa-check-circle"></i>Access on job categories</li>
                                    <li><i class="far fa-check-circle"></i>Access on job positions</li>
                                    <li><i class="far fa-check-circle"></i>New opportunity notification</li>
                                    <li><i class="far fa-check-circle"></i> Actively for 60 days</li>
                                </ul>
                            </div>
                            <div class="price-footer">
                                <!-- <a  id="openModal" href="#"></a> -->
                                <button class="btn btn-custom openModal" @click="openModal">Book Now</button>

                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="price-item featured-item">
                            <div class="price-header">
                                <h3>6 months</h3>
                                <h2><strong>12,000</strong><span>Frw</span></h2>
                            </div>
                            <div class="price-body">
                                <ul>
                                    <li><i class="far fa-check-circle"></i>Access on job categories</li>
                                    <li><i class="far fa-check-circle"></i>Access on job positions</li>
                                    <li><i class="far fa-check-circle"></i>New opportunity notification</li>
                                    <li><i class="far fa-check-circle"></i>Actively for 183 days</li>
                                </ul>
                            </div>
                            <div class="price-footer">
                                <!-- <a class="btn btn-custom" id="openModal" href="#">Book Now</a> -->
                                <button class="btn btn-custom openModal" @click="openModal">Book Now</button>

                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="price-item">
                            <div class="price-header">
                                <h3>Yearly</h3>
                                <h2><strong>20,000</strong><span>Frw</span></h2>
                            </div>
                            <div class="price-body">
                                <ul>
                                    <li><i class="far fa-check-circle"></i>Access on job categories</li>
                                    <li><i class="far fa-check-circle"></i>Access on job positions</li>
                                    <li><i class="far fa-check-circle"></i>New opportunity notification</li>
                                    <li><i class="far fa-check-circle"></i>Actively for 365 days </li>
                                </ul>
                            </div>
                            <div class="price-footer">
                                <!-- <a class="btn btn-custom" id="openModal" href="#">Book Now</a> -->
                                <button class="btn btn-custom openModal" @click="openModal">Book Now</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Price End -->

</template>
  
  <script>
  export default {
    name: 'PricingView',
    data() {
      return {
     
        
      };
    },
    methods: {
        openModal() {
            const modal = this.$refs.modal;
            const closeModalButton = this.$refs.closeModal;

            if (modal && closeModalButton) {

                // @ts-ignore
                modal.style.display = 'flex';

                // @ts-ignore
                closeModalButton.addEventListener('click', () => {
                // @ts-ignore
                modal.style.display = 'none';
                });

                window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    // @ts-ignore
                    modal.style.display = 'none';
                }
                });
            }
        },


    }
  };
  </script>
  
    <style scoped>
        .modal {
        display: none;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);
        }

        .modal-content {
        background-color: #fefefe;
        margin: 15% auto;
        padding: 10px;
        border: 1px solid #888;
        width: 50%;
        height: 45%;
        }

        @media(max-width:600px){
            .modal {
                display: none;
                position: fixed;
                z-index: 1;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgb(0, 0, 0);
                background-color: rgba(0, 0, 0, 0.4);
            }

            .modal-content {
                background-color: #fefefe;
                margin: 0% auto;
                width: 90%;
                margin-top:30% ;
                height: 50%;
                margin-bottom:5% ;
                border: 1px solid #888;
            }   
        }

        .close {
        color: #aaa;
        font-size: 28px;
        font-weight: bold;
        }

        .close:hover,
        .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
        }
        /*******end of model price***/

        
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


        
        /*******************************/
        /********* Pricing CSS *********/
        /*******************************/
        .price {
                position: relative;
                width: 100%;
                padding: 5px 0 15px 0;
            }

            .price .row {
                padding: 0 15px;
            }

            .price .col-md-4 {
                padding: 0;
            }

            .price .price-item {
                position: relative;
                margin-bottom: 30px;
                background: #ffffff;
                border-radius: 5px;
                text-align: center;
            }

            .price .featured-item {
                box-shadow: 0 0 30px rgba(0, 0, 0, .2);
                z-index: 1;
            }

            .price .price-header {
                padding: 45px 0 30px 0;
            }

            .price .price-header h3 {
                font-size: 20px;
                font-weight: 700;
                letter-spacing: 2px;
                text-transform: uppercase;
            }

            .price .price-header h2 {
                display: flex;
                align-items: flex-start;
                justify-content: center;
                font-size: 60px;
                font-weight: 700;
                letter-spacing: 5px;
            }

            .price .price-header h2 span {
                font-size: 25px;
                line-height: 80px;
            }

            .price .price-item.featured-item h2,
            .price .price-item.featured-item h3 {
                color: #E81C2E;
            }

            .price .price-body {
                padding: 0 0 20px 0;
            }

            .price .price-body ul {
                margin: 0;
                padding: 0;
                list-style: none;
            }

            .price .price-body ul li {
                padding: 0 0 15px 0;
            }

            .price .price-body ul li i {
                margin-right: 10px;
            }

            .price .price-body ul li i.fa-check-circle {
                color: #39B972;
            }

            .price .price-body ul li i.fa-times-circle {
                color: #cccccc;
            }

            .price .price-item .price-footer {
                padding-bottom: 45px;
            }

            .price .price-item .price-footer .btn.btn-custom {
                color: #E81C2E;
                background: #202C45;
                box-shadow: inset 0 0 0 0 #E81C2E;
            }

            .price .price-item .price-footer .btn.btn-custom:hover {
                color: #ffffff;
                background: #E81C2E;
                box-shadow: inset 200px 0 0 0 #E81C2E;
            }

            .price .price-item.featured-item .price-footer .btn.btn-custom {
                color: #ffffff;
                background: #E81C2E;
                box-shadow: inset 0 0 0 0 #202C45;
            }

            .price .price-item.featured-item .price-footer .btn.btn-custom:hover {
                color: #E81C2E;
                background: #202C45;
                box-shadow: inset 200px 0 0 0 #202C45;
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

</style>
  