<template>
  <div class="main">
    <product :products="products" @status="getStatus" v-if="isProduct" />
    <checkoutPage :filterProduct="filteredProduct" v-if="isChekout" />
  </div>
</template>
<script>
import axios from "axios";
import product from "./product.vue";
import checkoutPage from "./checkoutPage.vue";
export default {
  name: "home",
  components: { checkoutPage, product },
  data() {
    return {
      products: [],
      filteredProduct: [],
      isProduct: true,
      isChekout: false,
      product_id: null,
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      let response = await axios.get(
        "http://localhost:4000/api/products/product"
      );
      this.products = response.data;
      console.log("printing products", this.products);
    },
    getStatus({ ischeckout, product_id }) {
      console.log("printing emitting event", ischeckout, product_id);
      this.isProduct = false;
      this.product_id = product_id;
      this.searchProductById();
      this.isChekout = ischeckout;
    },
    searchProductById() {
      for (let i = 0; i < this.products.length; i++) {
        if (this.product_id === this.products[i]._id) {
          let filtered = [];
          filtered.push(this.products[i]);
          this.filteredProduct = filtered;
          console.log("matched product info", this.filteredProduct);
        }
      }
    },
  },
};
</script>
<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  width: 100%;
  height: 100vh;
}
</style>
