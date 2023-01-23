<template>
  <div class="CheckoutContainer">
    <div id="productPreview" class="productContainer">
      <div
        class="products"
        v-for="(product, index) in filterProduct"
        :key="index"
      >
        <div class="productImageContainer">
          <img :src="product.product_image" alt="image" class="productImage" />
        </div>
        <div class="product-info-container">
          <p class="product-name">{{ product.product_name }}</p>
          <span class="price-span"
            ><img
              src="../assets/rupee.png"
              alt="rupeeicon"
              class="rupee-icon"
            />
            <p class="product-price">{{ product.product_price }}</p></span
          >
        </div>
      </div>
    </div>
    <div id="checkoutForm" class="formContainer">
      <div class="card">
        <label for="user-name">Name</label>
        <input type="text" id="user-name" v-model="name" />
      </div>
      <div class="card">
        <label for="user-email">Email</label>
        <input type="text" id="user-email" v-model="email" />
      </div>
      <div class="card">
        <label for="address">Address</label>
        <input type="text" id="address" v-model="address" />
      </div>
      <div class="card">
        <label for="city">City</label>
        <input type="text" id="city" v-model="city" />
      </div>
      <div class="card">
        <label for="state">state</label>
        <input type="text" id="state" v-model="state" />
      </div>
      <div class="card">
        <label for="zip">Zip</label>
        <input type="text" id="zip" v-model="zip" />
      </div>
      <div class="card">
        <label for="card-holder-name">Holder Name</label>
        <input type="text" id="card-holder-name" v-model="holderName" />
      </div>
      <div class="card">
        <label for="card-details">Card Details</label>
        <div id="card-details" class="cardDetails"></div>
      </div>
      <div class="buttonContainer">
        <button id="btn-element" @click="submit">"pay"</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "checkoutPage",
  props: { filterProduct: Array },
  components: {},
  data() {
    return {
      stripe: null,
      elements: null,
      product: [],
      name: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      holderName: "",
    };
  },
  created() {},
  mounted() {
    this.stripe = Stripe(process.env.VUE_APP_PRIVATE_KEY);
    const style = {
      style: {
        base: {
          color: "black",
          fontFamily: "Helvetica",
          fontSmoothing: "antialiased",
          width: "1px",
          fontSize: "13px",
          "::placeholder": {
            color: "green",
            fontSize: "15px",
          },
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a",
        },
      },
    };

    this.elements = this.stripe.elements();
    const elements = this.elements.create("card", style);
    elements.mount("#card-details");
  },
  methods: {
    async submit() {
      const billingDetails = {
        name: this.name,
        email: this.email,
        address: {
          city: this.city,
          line1: this.address,
          state: this.state,
          postal_code: this.zip,
        },
      };
      const cardElement = this.elements.getElement("card");
      let post = {
        amount: this.filterProduct[0].product_price,
      };
      try {
        let response = await axios.post(
          "http://localhost:4000/api/stripePayment/create-payment-intent",
          post
        );
        let secret = response.data;
        let client_secret = secret.clientSecret;
        const paymentRequest = await this.stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: billingDetails,
        });
        const confirmPayment = await this.stripe.confirmCardPayment(
          client_secret,
          {
            payment_method: paymentRequest.paymentMethod.id,
          }
        );
        if (confirmPayment) {
          this.$router.push({ path: "/success" });
          return;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style scoped>
.CheckoutContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  width: 75%;
  height: 58%;
}

.productContainer {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid;
  width: 50%;
  height: 100%;
}
.products {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.productImageContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  width: 81%;
  height: 45%;
}
.productImage {
  width: 100%;
  height: 100%;
}
.product-name {
  padding: 0px;
  margin: 0px;
  font-size: 18px;
  font-family: helvetica;
}
.product-price {
  padding: 0px;
  margin: 0px;
  font-size: 18px;
  font-family: helvetica;
  margin-left: 1%;
}
.rupee-icon {
  width: 10%;
  height: 100%;
}
.price-span {
  display: flex;
  justify-content: center;
  align-items: center;
}
.formContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  /* border: 1px solid; */
  width: 50%;
  height: 95%;
}
.card {
  display: flex;
  flex-direction: column;
  border: none;
  width: 95%;
  height: 18%;
  margin-bottom: 2%;
  border-radius: 7px;
  box-shadow: 0px 2px 6px 0px #000000;
}
.cardDetails {
  height: 30%;
  margin: 0%;
  background: whitesmoke;
  overflow: hidden;
}
#user-name {
  height: 45%;
  margin: 0%;
  background: whitesmoke;
  border-radius: 7px;
  border: none;
}
#user-email {
  height: 45%;
  margin: 0%;
  background: whitesmoke;
  border-radius: 7px;
  border: none;
}
#address {
  height: 45%;
  margin: 0%;
  background: whitesmoke;
  border-radius: 7px;
  border: none;
}
#city {
  height: 45%;
  margin: 0%;
  background: whitesmoke;
  border-radius: 7px;
  border: none;
}
#zip {
  height: 45%;
  margin: 0%;
  background: whitesmoke;
  border-radius: 7px;
  border: none;
}
#card-holder-name {
  height: 45%;
  margin: 0%;
  background: whitesmoke;
  border-radius: 7px;
  border: none;
}
#card-details {
  height: 45%;
  margin: 0%;
  background: whitesmoke;
  border-radius: 7px;
  border: none;
}
.buttonContainer {
  border: 1px solid;
  width: 36%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  margin-bottom: 1%;
  background: blue;
}
#btn-element {
  font-size: 21px;
  font-family: helvetica;
  color: black;
}
.buttonContainer:active {
  background: white;
}
</style>
