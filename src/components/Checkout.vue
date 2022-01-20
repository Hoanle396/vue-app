<template>
  <div class="container mb-5 pb-5">
    <div class="py-5 text-center">
      <img
        class="d-block mx-auto mb-4"
        src="https://th.bing.com/th/id/R.5af24602a83e415e98309bff8d92fd26?rik=22uXkdA5egAnCw&riu=http%3a%2f%2fesys.viethanit.edu.vn%2fstudent%2fThemes%2fLogin%2fimages%2fLogo-ko-nen.png&ehk=%2fSUwp0V%2bsAHPK5G%2f8SsS9orguoludHNfyNIkh5YjtWw%3d&risl=&pid=ImgRaw&r=0"
        alt="LOGO"
        width="72"
      />
      <h2>Thanh Toán</h2>
      <p class="lead">
        {{message}}
      </p>
    </div>
    <div class="row">
      <div class="col-md-4 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Giỏ Hàng</span>
        </h4>
        <ul class="list-group mb-3">
          <li
            v-for="product in products"
            :key="product.product_id"
            class="list-group-item d-flex justify-content-between lh-condensed"
          >
            <div>
              <h6 class="my-0">{{ product.product_name }}</h6>
              <small class="text-muted">số lượng: {{ product.quantity }}</small>
            </div>
            <span class="text-muted"
              >$ {{ product.product_price * product.quantity }}</span
            >
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Tổng</span>
            <strong>$ {{ total }}</strong>
          </li>
        </ul>
      </div>
      <div class="col-md-8 order-md-1">
        <h4 class="mb-3">Thanh Toán</h4>
        <form class="needs-validation" @submit.prevent="">
          <div class="mb-3">
            <label for="username">Họ Và Tên</label>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                size="40"
                v-model="user.name"
                placeholder="Họ Và tên"
                required
              />
              <div class="invalid-feedback" style="width: 100%">
                Bạn Cần Nhập Họ Tên Của Bạn.
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="email">Email </label>
            <input
              type="email"
              class="form-control"
              size="40"
              v-model="user.email"
              placeholder="you@example.com"
              required
            />
            <div class="invalid-feedback">Bạn Cần Nhập Email Của Bạn.</div>
          </div>

          <div class="mb-3">
            <label for="address">Địa Chỉ</label>
            <input
              type="text"
              class="form-control"
              size="40"
              v-model="user.address"
              placeholder="1234 Main St"
              required
            />
            <div class="invalid-feedback">
              Bạn Cần Nhập Địa Chỉ Nhập Hàng Của Bạn.
            </div>
          </div>
          <div class="mb-3">
            <label for="address"> Số Điện Thoại</label>
            <input
              type="text"
              class="form-control"
              size="40"
              v-model="user.phonenumber"
              placeholder="+84"
              required
            />
            <div class="invalid-feedback">
              Bạn Cần Nhập Số Điện Thoại Của Bạn.
            </div>
          </div>
          <hr class="mb-4" />
          <div class="row">
            <center>
              <div class="col-12">
                <button
                  class="btn btn-primary btn-md btn-block"
                  style="width: 380px"
                  @click="checkout('offline')"
                >
                  Thanh Toán Khi Nhận Hàng
                </button>
              </div>
              <hr class="mb-1" />
              <div class="col-12">
                <button
                  class="btn btn-primary btn-md btn-block"
                  style="width: 380px"
                  @click="checkout('online')"
                >
                  Thanh Toán Trực Tuyến
                </button>
              </div>
            </center>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import BaseRequest from "../core/BaseRequest";
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      user: {},
      products: {},
      total: 0,
      message: "Vui lòng điền các thông tin bên dưới để tiếp tục thanh toán.",
    };
  },
  mounted() {
    this.checklogin();
  },
  methods: {
    checklogin: function () {
      BaseRequest.get("user")
        .then((response) => {
          this.user = response.data;
          this.products = JSON.parse(window.localStorage.getItem("cart"));
          this.products.forEach((i) => {
            this.total += i.quantity * i.product_price;
          });
        })
        .catch(() => {
          this.$router.push({ name: "login" });
        });
    },
    checkout: function (pay) {
      let data = {
        user: this.user,
        products: this.products,
        pay: pay,
        total: this.total,
      };
      if(data.user.phonenumber==null || data.user.email==null || data.user.address==null || data.user.name==null){
       this.message="thông tin nhận hàng không được bỏ trống";
      }
      else{
      BaseRequest.post("checkout", data)
        .then((response) => {
          this.message=response.data.message;
          window.localStorage.setItem("code", response.data.code);
          window.localStorage.setItem("total", this.total);
          if (response.data.redirect) {
            this.$router.push({ name: "bank" });
          } else {
            Swal.fire(
             'Hoàn Thành',
             'Cảm ơn Bạn Đã Mua Hàng Chúng Tôi Sẽ Sớm Liên Hệ Về Đơn Hàng Của Bạn',
             'success'
         )
            window.localStorage.removeItem("cart");
          }
        })
        .catch((error) => {
          Swal.fire(
             'Thất bại',
             'Đã Xảy Ra Lỗi Khi Thanh Toán Đơn Hàng Của Bạn',
             'error'
         )
          this.message = error.response.data.message;
        });
      } 
    },
  },
};
</script>