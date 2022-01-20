<template>
  <div class="container mb-5 mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-7">
        <div class="card shadow-lg border-0 rounded-lg mt-5">
          <div class="card-header">
            <h3 class="text-center font-bold-light my-4">
              Hoàn Tất Thanh Toán
            </h3>
          </div>
          <div class="card-body">
            <div class="row mb-2">
              <div class="col-12 text-center"></div>
            </div>
            <div class="row">
              <div class="mb-3 col-12">
                <label>Ngân hàng</label>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    v-model="bank.bankname"
                    disabled
                  />
                </div>
              </div>
              <div class="mb-3 col-12">
                <label>Chủ tài Khoản</label>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    v-model="bank.bankauth"
                    disabled
                  />
                </div>
              </div>
              <div class="mb-3 col-12">
                <label>Số tài khoản</label>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    v-model="bank.banknumber"
                    disabled
                  />
                </div>
              </div>
              <div class="mb-3 col-12">
                <label>Số tiền</label>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    v-model="bank.total"
                    disabled
                  />
                </div>
              </div>
              <div class="mb-3 col-12">
                <label>Nội dung chuyển khoản (bắt buộc)</label>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control text-uppercase"
                    v-model="bank.code"
                    disabled
                  />
                </div>
              </div>
              <div class="mb-3 col-12">
                <div class="input-group">
                  <button @click="done()" class="btn btn-primary form-control">
                    Xác Nhận Đã Chuyển Khoản
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <div class="card shadow-lg border-0 rounded-lg mt-5">
          <div class="card-header">
            <h3 class="text-center font-bold-light my-4">QR Pay</h3>
          </div>
          <div class="card-body">
            <img :src="bank.qrcode" width="100%" alt="" />
          </div>
        </div>
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
      bank: {
        banknumber: "",
        bankauth: "",
        bankname: "",
        qrcode: "",
        total: "",
        code: "",
      },
    };
  },
  mounted() {
    this.getBank();
  },
  methods: {
    getBank: function () {
      BaseRequest.get("getbank")
        .then((response) => {
          this.bank = response.data;
          this.bank.code = window.localStorage.getItem("code");
          this.bank.total = window.localStorage.getItem("total");
        })
        .catch((error) => {
          console.log(error);
          this.$router.push({ name: "404" });
        });
    },
    done: function () {
      BaseRequest.post("done", this.bank)
        .then(() => {
           Swal.fire(
             'Hoàn Thành',
             'Cảm ơn Bạn Đã Mua Hàng Chúng Tôi Sẽ Sớm Liên Hệ Về Đơn Hàng Của Bạn',
             'success'
         )
          window.localStorage.removeItem("code");
          window.localStorage.removeItem("total");
          window.localStorage.removeItem("cart");
          this.$router.push({ name: "home" });
        })
        .catch(() => {
           Swal.fire(
             'Thất bại',
             'Đã Xảy Ra Lỗi Khi Thanh Toán Đơn Hàng Của Bạn',
             'error'
         )
        });
    },
  },
};
</script>
<style>
</style>