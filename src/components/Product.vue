<template>
  <section class="py-5">
    <div class="container px-4 px-lg-5 mt-5">
      <div 
        class="
          row
          gx-4 gx-lg-5
          row-cols-2 row-cols-md-3 row-cols-xl-4
          justify-content-center
        "
      >
        <div
          v-for="item in product.data"
          :key="item.product_id"
          class="col-md-3 mb-5"
        >
          <div class="card h-100">
            <!-- Product image-->
            <img class="card-img-top" :src="item.product_image" alt="..." />
            <!-- Product details-->
            <div class="card-body p-4">
              <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">{{ item.product_name }}</h5>
                <!-- Product price-->
                {{ item.product_price }}
              </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div class="text-center">
                <router-link class="btn btn-outline-dark mt-auto" :to="/product/+item.product_id">Xem chi tiết</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
       <Pagination align="center" :data="product" @pagination-change-page="products"></Pagination>
    </div>
  </section>
</template>
<script>
 import Pagination from 'laravel-vue-pagination';
import BaseRequest from "../core/BaseRequest";
export default {
  data() {
    return {
      product: {},
      message: "",
    };
  },
  mounted() {
    this.products();
  },
  components:{
    Pagination,
  },
  methods: {
    products: function (page=1) {
      BaseRequest.get("product?page="+page)
        .then((response) => {
          this.product = response.data;   
          console.log(this.product)
        })
        .catch(() => {
          this.message='Đã Có Lỗi Ở Đây!';
        });
    },
  },
};
</script>
<style>
.page-link {
  height :40px;
  width :40px;
}
</style>