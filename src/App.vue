<template>
  <div class="container">
    <HeaderApp />
    <main class="app">
      <router-view />
    </main>
    <SuccessMessage />
    <ErrorMessage />
  </div>
</template>

<script>
import HeaderApp from "@/components/HeaderApp.vue";
import SuccessMessage from "@/components/SuccessMessage.vue";
import ErrorMessage from "./components/ErrorMessage.vue";

export default {
  components: {
    HeaderApp,
    ErrorMessage,
    SuccessMessage,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

:root {
  --color-white: #ffffff;
  --color-black: #000000;
  --color-base-1: #bdbdbd;
  --color-base-2: #a9a9a9;
  --color-base-3: #828282;
  --color-base-4: #333333;
  --color-primary-01: #4b97fa;
  --color-primary-02: #2f80ed;
  --color-success: #9aeb57;
  --color-danger: #eb5757;
  --color-warning: #e9b442;

  --box-shadow-01: 0px 2px 6px rgba(127, 177, 243, 0.4);
  --box-shadow-success: 0px 2px 6px rgba(154, 243, 127, 0.4);
  --box-shadow-danger: 0px 2px 6px rgba(243, 127, 127, 0.4);
  --box-shadow-warning: 0px 2px 6px rgba(243, 216, 127, 0.4);
}

*::-webkit-scrollbar {
  width: 6px;
}

*::-webkit-scrollbar-track {
  background-color: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: var(--color-base-4);
  border-radius: 12px;
}

body {
  overflow: hidden;
  background-color: #F9EFDB;
}

ul {
  list-style: none;
}

button,
input[type="submit"] {
  background: transparent;
  border: 0;
  cursor: pointer;
}

textarea {
  resize: none;
}

fieldset {
  border: 0;
}

.app {
  width: 100%;
  max-width: 600px;
  height: 60%;
}

/* Default Styles */
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  gap: 60px;
  position: relative;
}

.mt-40 {
  margin-top: 40px;
}

.mb-40 {
  margin-bottom: 40px;
}

.message {
  font-size: 0.875rem;
  font-weight: 600;
  padding: 20px 40px;
  border-radius: 12px;
  animation: show-message 0.6s forwards;
  position: absolute;
  bottom: -80px;
  left: 50%;
  transform: translateX(-50%);
}

@keyframes show-message {
  to {
    bottom: 80px;
  }
}

@media (max-width: 768px) {
  .container {
    max-width: 100%;
    text-align: center;
  }
}
</style>
