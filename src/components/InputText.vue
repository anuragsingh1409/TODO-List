<template>
  <input
    class="input"
    type="text"
    :name="name"
    :id="id"
    :placeholder="placeholder"
    v-model="todo"
    required
  />
</template>

<script>
export default {
  name: "InputText",
  data() {
    return {
      todo: "",
    };
  },
  props: {
    name: {
      type: String,
      default: "handleValue",
    },
    id: {
      type: String,
      default: "handleValue",
    },
    placeholder: {
      type: String,
      default: "add details",
    },
  },
};
</script>

<style scoped>
.input {
  width: 100%;
  max-width: 400px;
  height: 60px;
  display: inline-block;
  border-radius: 12px;
  border: 1px solid var(--color-base-1);
  padding-left: 12px;
  outline-color: var(--color-primary-02);
}
</style>
