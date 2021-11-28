<template>
  <section class="page-section mt-5 mb-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="myaccount-page-wrapper">
            <!-- My Account Tab Menu Start -->
            <div class="row">
              <div class="col-lg-3 col-md-4" style="height: 400px">
                <div class="myaccount-tab-menu nav" role="tablist">
                  <a href="#dashboad" class="active" data-toggle="tab"
                    ><i class="fa fa-home"></i> Trang chủ</a
                  >
                  <a href="#orders" data-toggle="tab" class=""
                    ><i class="fa fa-cart-arrow-down"></i> Giỏ Hàng</a
                  >
                  <a href="#account-info" data-toggle="tab" class=""
                    ><i class="fa fa-user"></i> Tài Khoản
                  </a>
                  <a href="#account-change" data-toggle="tab" class=""
                    ><i class="fa fa-lock"></i> Đổi Mật Khẩu</a
                  >
                  <a href="Logout"
                    ><i class="fa fa-sign-out-alt" aria-hidden="true"></i> Đăng
                    xuất</a
                  >
                </div>
              </div>
              <!-- My Account Tab Menu End -->
              <!-- My Account Tab Content Start -->
              <div class="col-lg-9 col-md-8">
                <div class="tab-content" id="myaccountContent">
                  <div
                    class="tab-pane fade active show"
                    id="dashboad"
                    role="tabpanel"
                  >
                    <div class="myaccount-content">
                      <h3>Dashboard</h3>
                      <div class="welcome">
                        <p>
                          Xin Chào, <strong>{{ user.name }}</strong> (nếu không
                          phải <strong>{{ user.name }}</strong
                          ><a href="Logout" class="logout"> Đăng xuất</a>)
                        </p>
                      </div>

                      <p class="mb-0">
                        Từ trang tổng quan tài khoản của bạn. bạn có thể dễ dàng
                        kiểm tra và xem các đơn đặt hàng gần đây, quản lý địa
                        chỉ giao hàng và thanh toán cũng như chỉnh sửa mật khẩu
                        và chi tiết tài khoản của mình.
                      </p>
                    </div>
                  </div>
                  <!-- Single Tab Content End -->
                  <!-- Single Tab Content Start -->
                  <div class="tab-pane fade" id="orders" role="tabpanel">
                    <div class="myaccount-content">
                      <h3>Giỏ Hàng</h3>
                      <div class="myaccount-table table-responsive text-center">
                        <table class="table table-bordered" v-if="products">
                          <thead class="thead-light">
                            <tr>
                              <th>Sản Phẩm</th>
                              <th>Giá</th>
                              <th>Số Lượng</th>
                              <th>Thành Tiền</th>
                              <th>Thao Tác</th>
                            </tr>
                          </thead>
                          
                          <tbody>
                            <tr
                              v-for="product in products"
                              :key="product.product_id"
                            >
                              <td>{{ product.product_name }}</td>
                              <td>{{ product.product_price }}</td>
                              <td>{{ product.quantity }}</td>
                              <td>{{ product.quantity*product.product_price}}</td>
                              <td><button @click="remove(product)">delete</button></td>
                            </tr>
                            <tr> <center><router-link class="btn btn-success" to="/Checkout">Thanh Toán</router-link></center></tr>
                          </tbody>
                        </table>
                       
                        <div v-if="!products">
                          <p>Giỏ Hàng Trống</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Single Tab Content End -->

                  <div class="tab-pane fade" id="account-info" role="tabpanel">
                    <div class="myaccount-content">
                      <h3>Chi Tiết Tài Khoản</h3>
                      <div class="account-details-form">
                        <form @submit.prevent="change()">
                          <div class="row">
                            <div class="col-lg-4">
                              <div class="single-input-item">
                                <label for="first-name" class="required"
                                  >Họ Tên</label
                                >
                                <input
                                  type="text"
                                  v-model="user.name"
                                  name="name"
                                  required="true"
                                />
                              </div>
                            </div>
                            <div class="col-lg-4">
                              <div class="single-input-item">
                                <label for="first-name" class="required"
                                  >Địa chỉ chi tiết</label
                                >
                                <input
                                  type="text"
                                  v-model="user.address"
                                  name="name"
                                  required="true"
                                />
                              </div>
                            </div>
                            <div class="col-lg-4">
                              <div class="single-input-item">
                                <label for="email" class="required"
                                  >Số Điện Thoại</label
                                >
                                <input
                                  type="text"
                                  v-model="user.phonenumber"
                                  name="phonenumber"
                                  required="true"
                                />
                              </div>
                            </div>
                          </div>

                          <div class="single-input-item">
                            <button
                              class="check-btn sqr-btn"
                              type="submit"
                              name="changedetail"
                              value="Lưu thay đổi"
                            >
                              Lưu thay đổi
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <!-- Single Tab Content End -->
                  <div
                    class="tab-pane fade"
                    id="account-change"
                    role="tabpanel"
                  >
                    <div class="myaccount-content">
                      <h3>Đổi Mật Khẩu</h3>
                      <div class="account-details-form">
                        <form @submit.prevent="password()" validation>
                          <div class="row">
                            <div class="col-lg-4">
                              <div class="single-input-item">
                                <label for="current-pwd" class="required"
                                  >Mật khẩu cũ</label
                                >
                                <input
                                  type="password"
                                  required="true"
                                  v-model="pwd.currentpwd"
                                />
                              </div>
                            </div>
                            <div class="col-lg-4">
                              <div class="single-input-item">
                                <label for="new-pwd" class="required"
                                  >Mật khẩu mới</label
                                >
                                <input
                                  type="password"
                                  required="true"
                                  v-model="pwd.newpwd"
                                />
                              </div>
                            </div>
                            <div class="col-lg-4">
                              <div class="single-input-item">
                                <label for="confirm-pwd" class="required"
                                  >Nhập lại mật khẩu mới</label
                                >
                                <input
                                  type="password"
                                  required="true"
                                   v-model="pwd.confirmpwd"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="single-input-item">
                            <button
                              class="check-btn sqr-btn"
                              type="submit"
                              name="changepass"
                              value="Lưu thay đổi"
                            >
                              Lưu thay đổi
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import BaseRequest from "../core/BaseRequest";
export default {
  data() {
    return {
      user: {},
      products: {},
      pwd : {
        email:'',
        currentpwd:'',
        newpwd:'',
        confirmpwd:'',
      },
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
          console.log(this.user);
        })
        .catch(() => {
          this.$router.push({ name: "login" });
        });
    },
    change: function (){
      BaseRequest.post('change',this.user)
      .then(() => {
          alert('Đã Cập Nhật Thay Đổi!')
      }).catch((error) => {
        console.log(error)
      })
    },
    password:function () {
      this.pwd.email=this.user.email;
      console.log(this.pwd)
      BaseRequest.post('password',this.pwd).then((response) => {
        alert(response.data.message)
       
      }).catch((error) => {
        alert(error.response.data.message)
      })
    }
  },
};
</script>
<style>
.myaccount-page-wrapper {
  position: static;
}
.myaccount-tab-menu {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}

.myaccount-tab-menu a {
  border: 1px solid #ccc;
  border-bottom: none;
  font-weight: 600;
  font-size: 13px;
  display: block;
  padding: 10px 15px;
  text-transform: uppercase;
}

.myaccount-tab-menu a:last-child {
  border-bottom: 1px solid #ccc;
}

.myaccount-tab-menu a:hover,
.myaccount-tab-menu a.active {
  background-color: #ff6e21;
  border-color: #ff6e21;
  color: #ffffff;
}

.myaccount-tab-menu a i.fa {
  font-size: 14px;
  text-align: center;
  width: 25px;
}

@media only screen and (max-width: 767px) {
  #myaccountContent {
    margin-top: 30px;
  }
}

.myaccount-content {
  border: 2px solid rgb(197, 197, 197);
  padding: 30px;
}

@media only screen and (max-width: 767px) {
  .myaccount-content {
    padding: 20px 15px;
  }
}

.myaccount-content form {
  margin-top: -20px;
}

.myaccount-content h3 {
  font-size: 20px;
  border-bottom: 1px dashed #ccc;
  padding-bottom: 10px;
  margin-bottom: 25px;
  font-weight: 600;
}

.myaccount-content .welcome a:hover {
  color: #ccc;
}

.myaccount-content .welcome strong {
  font-weight: 600;
  color: #ff6e21;
}

.myaccount-content fieldset {
  margin-top: 20px;
}

.myaccount-content fieldset legend {
  font-size: 16px;
  margin-bottom: 20px;
  font-weight: 600;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

.myaccount-content .account-details-form {
  margin-top: 50px;
}

.myaccount-content .account-details-form .single-input-item {
  margin-bottom: 20px;
}

.myaccount-content .account-details-form .single-input-item label {
  font-size: 14px;
  text-transform: capitalize;
  display: block;
  margin: 0 0 5px;
}

.myaccount-content .account-details-form .single-input-item input {
  border: 1px solid #e8e8e8;
  height: 50px;
  background-color: transparent;
  padding: 2px 20px;
  color: #1f2226;
  font-size: 13px;
}

.myaccount-content .account-details-form .single-input-item input:focus {
  border: 1px solid #343538;
}

.myaccount-content .account-details-form .single-input-item button {
  border: none;
  background-color: #ff6e21;
  text-transform: uppercase;
  font-weight: 600;
  padding: 9px 25px;
  color: #fff;
  font-size: 13px;
}

.myaccount-content .account-details-form .single-input-item button:hover {
  background-color: #1f2226;
}

.myaccount-table {
  white-space: nowrap;
  font-size: 14px;
}

.myaccount-table table th,
.myaccount-table .table th {
  padding: 10px;
  font-weight: 600;
  background-color: #f8f8f8;
  border-color: #ccc;
  border-bottom: 0;
  color: #1f2226;
}

.myaccount-table table td,
.myaccount-table .table td {
  padding: 10px;
  vertical-align: middle;
  border-color: #ccc;
}

.saved-message {
  background-color: #fff;
  border-top: 3px solid #ff6e21;
  font-size: 14px;
  padding: 20px 0;
  color: #333;
}
</style>