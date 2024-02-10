<template>
    <div class="message success-msg" v-if="success !== null">
      {{ success }}
    </div>
  </template>
  
  <script>
  import { mapState } from "vuex";
  
  export default {
    name: "SuccessMessage",
    computed: {
      ...mapState(["success"]),
    },
  };
  </script>
  
  <style scoped>
  .success-msg {
    color: var(--color-black);
    background-color: var(--color-success);
    box-shadow: var(--box-shadow-success);
  }
  </style>
  