<!-- EditTaskModal.vue -->
<template>
  <div class="edit-modal">
    <div class="edit-modal-content">
      <label for="editedTask">Edit Task:</label>
      <InputText v-model="editedTask.value" id="editedTask" />

      <div class="edit-modal-buttons">
        <button @click="saveEdit">Save</button>
        <button @click="cancelEdit">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import InputText from "@/components/InputText.vue";

export default {
  name: "EditTaskModal",
  components: {
    InputText,
  },
  props: {
    task: Object,
  },
  data() {
    return {
      editedTask: { ...this.task },
    };
  },
  methods: {
    saveEdit() {
      this.$emit("save", this.editedTask); // Emit the editedTask directly
    },
    cancelEdit() {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped>
/* Add/Edit Task Modal Styles */
.edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit-modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
}

.edit-modal label {
  font-size: 1rem;
  font-weight: 500;
}

.edit-modal-buttons {
  margin-top: 20px;
  text-align: right;
}

.edit-modal button {
  background-color: black;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 8px;
}

.edit-modal button:hover {
  background-color: grey;
}
</style>
