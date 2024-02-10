<template>
  <header class="header">
    <h1 class="title mb-40">TODO</h1>

    <ul class="list-options">
      <li
        @click="handleOption"
        class="item-option"
        :class="{ 'item-option--active': optionTasks === 'All' }"
        data-option="All"
      >
        Todos
      </li>
      <li
        @click="handleOption"
        class="item-option"
        :class="{ 'item-option--active': optionTasks === 'Active' }"
        data-option="Active"
      >
        Active
      </li>
      <li
        @click="handleOption"
        class="item-option"
        :class="{ 'item-option--active': optionTasks === 'Completed' }"
        data-option="Completed"
      >
        Complete
      </li>
    </ul>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "HeaderApp",
  computed: {
    ...mapState(["optionTasks"]),
  },
  methods: {
    handleOption(event) {
      const { option } = event.currentTarget.dataset;

      this.$store.dispatch("filterTasks", option);
    },
  },
  watch: {
    optionTasks() {
      this.$store.dispatch("fetchAPI");
    },
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  max-width: 600px;
}

.title {
  font-family: "Raleway", sans-serif;
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--color-base-4);
}

.list-options {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-content: center;
  padding: 0 38px;
  border-bottom: 1px solid var(--color-base-1);
}

.item-option {
  widows: 100%;
  padding: 20px 40px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-base-4);
}

.item-option--active {
  border-bottom: 2px solid var(--color-primary-02);
}

@media (max-width: 768px) {
  .list-options {
    flex-direction: column;
    justify-content: center;
    padding: 0;
  }

  .item-option--active {
    background-color: #f0f0f0;
  }
}
</style>
