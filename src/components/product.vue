<template>
  <div class="product-container">
    <div class="products" v-for="(product, index) in products" :key="index">
      <div class="product-image">
        <img :src="product.product_image" alt="image" class="image" />
      </div>
      <div class="product-info">
        <p class="product-name">{{ product.product_name }}</p>
        <p class="product-price">{{ product.product_price }}</p>
      </div>
      <div class="btn-container">
        <button class="buy-btn" @click="checkout(product._id)">buy</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "product",
  props: {
    products: Array,
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    checkout(id) {
      this.$emit("status", { ischeckout: true, product_id: id });
    },
  },
};
</script>
<style scoped>
.product-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid;
  width: 74%;
  height: 71%;
  border-radius: 9px;
}
.products {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  width: 39%;
  height: 41%;
  border-radius: 11px;
  box-shadow: 0px 9px 41px 0px black;
  border: none;
}
.product-image {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  width: 82%;
  height: 51%;
  border-radius: 6px;
}
.image {
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
}
.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  width: 42%;
  height: 11%;
  overflow: hidden;
  border-radius: 4px;
  margin-top: 5%;
}
.buy-btn {
  width: 100%;
  height: 100%;
  font-size: 18px;
  font-family: helvetica;
}
.buy-btn:active {
  background: rgb(82, 82, 228);
}
</style>
