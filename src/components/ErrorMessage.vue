<template>
  <div class="message error-msg" v-if="error !== null">
    {{ error }}
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ErrorMessage",
  computed: {
    ...mapState(["error"]),
  },
};
</script>

<style scoped>
.error-msg {
  color: var(--color-white);
  background-color: var(--color-danger);
  box-shadow: var(--box-shadow-danger);
}
</style>
