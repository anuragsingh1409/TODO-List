<template>
    <div class="message msg-warning">
      {{ message }}
    </div>
  </template>
  
  <script>
  export default {
    name: "WarningMessage",
    props: {
      message: {
        type: String,
        default: "Warning message",
        require: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .msg-warning {
    width: auto;
    color: var(--color-white);
    background-color: var(--color-warning);
    box-shadow: var(--box-shadow-warning);
    position: relative;
    bottom: initial;
    left: initial;
    transform: initial;
    animation: none;
  }
  </style>
  