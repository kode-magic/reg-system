<template>
  <div class="min-h-screen bg-login">
    <div class="">
      <div class="container h-screen mx-auto md:px-24 pt-10">
        <div class="items-center justify-center flex md:pr-12">
          <div class="md:w-2/5 bg-white px-5 py-10 shadow-lg rounded-lg">
            <div class="justify-center text-center">
              <div class="flex justify-center">
                <img src="/logo.png" class="px-10 bg-white h-32" />
              </div>
              <h2
                className="mt-6 text-center text-2xl leading-9 font-extrabold text-gray-900"
              >
                Sign in to your account
              </h2>
            </div>
            <div class="mt-10 px-5">
              <form @submit.prevent="login">
                <div class="mb-3">
                  <p class="mb-1 text-xs">Username / Email</p>
                  <el-input
                    v-model.trim="$v.usernameOrEmail.$model"
                    @keyup="eError = ''"
                    :error="
                      ($v.usernameOrEmail.$error &&
                        !$v.usernameOrEmail.required) ||
                      eError
                        ? !eError
                          ? 'Please enter email'
                          : eError
                        : ''
                    "
                  />
                </div>
                <div class="mb-3">
                  <p class="mb-1 text-xs">Password</p>
                  <el-input
                    type="password"
                    @keyup="pError = ''"
                    v-model="password"
                    :error="
                      ($v.password.$error && !$v.password.required) || pError
                        ? !pError
                          ? 'Please enter password'
                          : pError
                        : ''
                    "
                  />
                </div>
                <div class="mb-5">
                  <el-button @click="login">
                    <loader-vue v-if="isLoading" />
                    <p v-else>LOGIN</p>
                  </el-button>
                </div>
                <div class="flex justify-between items-center mb-8">
                  <div class="flex items-center">
                    <input type="checkbox" />
                    <p class="font-semibold ml-2 text-gray-800 text-xs">
                      Remember me
                    </p>
                  </div>
                  <p class="font-semibold text-indigo-600 text-right text-xs">
                    Forget password?
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import Cookie from 'js-cookie'

export default {
  data() {
    return {
      usernameOrEmail: '',
      password: '',
      eError: '',
      pError: '',
      isLoading: false,
      checkError: ''
    }
  },
  validations: {
    usernameOrEmail: {
      required
    },
    password: {
      required
    }
  },
  methods: {
    async login() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.isLoading = true
        const details = {
          usernameOrEmail: this.usernameOrEmail,
          password: this.password
        }
        this.$store
          .dispatch('login', details)
          .then(() => {
            window.location = '/'
          })
          .catch(e => {
             this.$router.push("/")
            this.isLoading = false
            this.checkError = e.message
            this.$message.error(this.checkError)
          })
      }
    }
  },
}
</script>
