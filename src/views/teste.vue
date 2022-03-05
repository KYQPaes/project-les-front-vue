<template>
  <div>
    <div>
      <label>Name</label>
      <input type="text" v-model="form.name" />
    </div>

    <div>
      <label>Email</label>
      <input type="text" v-model="form.email" />
    </div>

    <div>
      <label>Password</label>
      <input type="password" v-model="form.password" />

      <div>
        <span
          v-bind:class="{
            red: passwordStrength.score <= 1,
            orange: passwordStrength.score == 2,
            yellow: passwordStrength.score == 3,
            green: passwordStrength.score == 4,
          }"
        ></span>
        <span
          v-bind:class="{
            grey: passwordStrength.score <= 1,
            orange: passwordStrength.score == 2,
            yellow: passwordStrength.score == 3,
            green: passwordStrength.score == 4,
          }"
        ></span>
        <span
          v-bind:class="{
            grey: passwordStrength.score <= 2,
            yellow: passwordStrength.score == 3,
            green: passwordStrength.score == 4,
          }"
        ></span>
        <span
          v-bind:class="{
            grey: passwordStrength.score <= 3,
            green: passwordStrength.score == 4,
          }"
        ></span>
      </div>
    </div>
    <div>
      <label>Confirm Password</label>
      <input type="password" v-model="form.confirm_password" />
    </div>

    <a v-on:click="register()">Register</a>
  </div>
</template>

<script>
const zxcvbn = require("zxcvbn");

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        confirm_password: "",
      },
    };
  },

  methods: {
    register() {
      // Implement your registration code.
    },
  },

  computed: {
    passwordStrength() {
      return zxcvbn(this.form.password);
    },
  },
};
</script>

<style></style>
