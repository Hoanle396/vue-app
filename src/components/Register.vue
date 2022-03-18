<template>
   <div class="containers pt-5 pb-5">
    <div class="login">
      <h1>Đăng Kí</h1>
       <h6 class="text-warning" v-if="message">{{ message }}</h6>
      <form @submit.prevent='register()'>
          <div class="form-group">
          <input
            class="rounded-pill form-control"
            placeholder="Full Name"
            v-model='user.name'
             :class="{ 'is-invalid': error.name}"
          />
           <div v-if="error.name" class="invalid-feedback center">
            {{ error.name[0]}}
          </div>
        </div>
        <div class="form-group">
          <input
            class="rounded-pill form-control"
            placeholder="Email"
            v-model='user.email'
             :class="{ 'is-invalid': error.email }"
          />
           <div v-if="error.email" class="invalid-feedback center">
            {{ error.email[0]}}
          </div>
        </div>
        
        <div class="form-group">
          <input
            type="password"
            class="rounded-pill form-control"
            placeholder="Password"
            v-model='user.password'
             :class="{ 'is-invalid': error.password }"
          />
          <div v-if="error.password" class="invalid-feedback center">
            {{ error.password[0]}}
          </div>
        </div>
        <div class="form-group">
          <input
            type="password"
            class="rounded-pill form-control"
            placeholder="Comfrim Password"
            v-model='user.password2'
             :class="{ 'is-invalid': error.password2 }"
          />
          <div v-if="error.password2" class="invalid-feedback center">
            {{ error.password2[0]}}
          </div>
        </div>
        <input type="submit" class="btn btn-primary btn-block" value="Register" />
      </form>
      <div>
       have account ?
        <router-link to="/Login">Login</router-link>
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
        name: '',
        email: '',
        password: '',
        password2: '',
      },
      error : [],
      message:null,
    }
  },
  methods: {
     register: function () {
        this.error=[];
       this.message =null;
       if(this.user.password == this.user.password2){
         BaseRequest.post('register',this.user).then(()=>{
           this.message="đăng kí thành công";
         }).catch(error=>{
           this.message=error.response.data.message;
           this.error=error.response.data.errors;
           console.log(error)
         })
       }
       else{
         this.error.password2='Mật Khẩu Không Khớp';
       }
     }
  }
}
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