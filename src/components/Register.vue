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

</style>