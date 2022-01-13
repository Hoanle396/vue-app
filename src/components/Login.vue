<template>
  <div class="containers pt-5 pb-5">
    <div class="login">
      <h1>Đăng Nhập</h1>
       <h6 class="text-warning" v-if="message">{{ message }}</h6>
      <form @submit.prevent="login()">
        <div class="form-group">
          <input
            v-model="user.email"
            class="rounded-pill form-control"
            :class="{ 'is-invalid': error.email }"
            placeholder="Email"
          />
          <div v-if="error.email" class="invalid-feedback center">
            {{ error.email[0]}}
          </div>
        </div>
        <div class="form-group">
          <input
            v-model="user.password"
            type="password"
            class="rounded-pill form-control"
            :class="{ 'is-invalid': error.password }"
            placeholder="Password"
          />
          <div v-if="error.password" class="invalid-feedback center">
            {{ error.password[0] }}
          </div>
        </div>
        <input type="submit" class="btn btn-primary btn-block" value="Đăng nhập" />
      </form>
      <p>khôi phục mật khẩu?</p>
      <div>
        chưa có tài khoản ?
       <router-link to="/Register">Đăng kí</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import BaseRequest from "../core/BaseRequest"
export default {
  data() {
    return {
      user: {
        email:null,
        password: null,
      },
      error: {},
      message :null,
    };
  },
  methods: {
    login: function () {
       this.error=[];
       this.message =null;
        BaseRequest.post("login", this.user)
        .then((response) => {
          window.localStorage.setItem("token", response.data.token);
          this.$router.push({ name: "home" });
        })
        .catch((error) => {
          this.message = error.response.data.message;
          if(error.response.data.errors){
            this.error = error.response.data.errors;
          }
          
        });
    },
  },
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
}
 body {
  font-family: "Roboto", sans-serif;
  /* background: linear-gradient(45deg, rgb(116, 176, 255), rgb(255, 126, 223)); */
  /* height: 150vh; */
  align-items: center;
  justify-content: center;
  background-size: cover;
  animation: bg 2s linear infinite alternate;
}
@keyframes bg {
  from {
    background-position: left;
  }
  to {
    background-position: right;
  }
}
.containers {
  width: 100%;
  height: 100%;
  background-image: url("../assets/Background3.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login {
  width: 350px;
  box-shadow: -10px -10px 15px rgba(0, 0, 0, 0.3),
    10px 10px 15px rgba(0, 0, 0, 0.3);
  border: 10px solid #fff !important;
  padding: 5px !important;
  background-image: url("../assets/Background4.png");
  background-size: cover !important;
  border-radius: 50px !important;
  background-attachment: fixed !important;
  display: flex !important;
  align-items: center !important;
  flex-direction: column !important;
  background-color: #fff !important;
}
h1 {
  color: #fff;
  padding: 50px 0px 35px 0px;
}
form {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  flex-direction: column !important;
}

.rounded-pill {
  margin-top: 20px;
  width: 300px !important;
  height: 40px !important;
  border: none !important;
  outline: none !important;
  margin-left: 5px !important;
  font-size: 18px !important;
  padding: 0px 10px !important;
  border: 1px solid #111 !important;
}
input[type="submit"] {
  margin-top: 35px !important;
  width: 230px !important;
  height: 35px !important;
  border-radius: 20px !important;
  font-size: 20px !important;
  font-weight: 100px !important;
  color: #111 !important;
  background-color: #5959fd !important;
  box-shadow: -10px -10px 15px rgba(0, 0, 0, 0.1),
    10px 10px 15px rgba(0, 0, 0, 0.1);
}
p {
  color: #111;
  padding: 15px 0px;
  letter-spacing: 1px;
}
span {
  padding: 18px 0px 0px 0px;
  color: rgb(7, 7, 7);
  font-size: 20px;
}
</style>
