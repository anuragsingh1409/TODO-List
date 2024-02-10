<template>
    <div class="wrapper">
      <div class="container-task" v-for="task in tasks" :key="task.id">
        <fieldset class="fieldset">
          <input
            class="check"
            type="checkbox"
            :name="'task' + task.id"
            :id="task.id"
            :value="task.value"
            :checked="task.completed"
            @change="checkTask"
          />
          <label
            class="label"
            :class="{ 'task--completed': task.completed }"
            :for="task.id"
          >
            {{ task.value }} - {{ formatDate() }}
          </label>
        </fieldset>
  
        <abbr title="Excluir tarefa">
          <button
            @click="deleteItem"
            class="trash-btn"
            v-if="optionTasks === 'Completed'"
            :data-id="task.id"
          >
            <img
              class="img-trash"
              src="@/assets/trash.svg"
              alt="Trash icon"
            />
          </button>
        </abbr>
  
        <span @click="openEditModal(task)" class="edit-btn" v-if="!task.completed">
          <img
              class="img-edit"
              src="@/assets/edit.svg"
              alt="Edit icon"
            />
        </span>
      </div>
  
      <button
        @click="deleteAll"
        class="delete-all-btn"
        v-if="optionTasks === 'Completed' && tasks.length !== 0"
      >
        Delete All
      </button>
  
      <!-- EditTaskModal -->
      <EditTaskModal
        v-if="editingTask"
        :task="editingTask"
        @save="saveEditedTask"
        @cancel="cancelEdit"
      />
    </div>
  </template>
  
  <script>
  import { mapState, mapMutations, mapActions } from "vuex";
  import { api } from "@/helpers/api";
  import EditTaskModal from "@/components/EditTaskModal.vue";
  
  export default {
    name: "TaskList",
    components: {
      EditTaskModal,
    },
    computed: {
      ...mapState(["optionTasks", "tasks"]),
    },
    data() {
      return {
        editingTask: null,
      };
    },
    methods: {
      ...mapMutations(["UPDATE_TASKS"]),
      ...mapActions(["setError", "setSuccess", "updateTasks"]),
      async checkTask(event) {
        const { id, checked } = event.target;
        const convertId = Number(id);
        const [objTask] = this.tasks.filter((task) => task.id === convertId);
        const otherTasks = this.tasks.filter((task) => task.id !== convertId);
  
        try {
          const { data } = await api.put(id, {
            ...objTask,
            completed: checked,
          });
  
          this.UPDATE_TASKS([...otherTasks, data]);
          if (this.$store.state.optionTasks !== "All")
            this.$store.dispatch("removeOldTasks", otherTasks);
        } catch (error) {
          this.setError(
            "SERVER ERROR Unable to change task state"
          );
          console.error(error.message);
  
          setTimeout(() => {
            this.setError(null);
          }, 3000);
        }
      },
      async deleteItem(event) {
        const { id } = event.currentTarget.dataset;
        try {
          const { status } = await api.delete(id);
          const convertId = Number(id);
          const tasksFiltered = this.tasks.filter(
            (task) => task.id !== convertId
          );
  
          if (status === 200) {
            this.setSuccess("Task deleted successfully!");
  
            setTimeout(() => {
              this.setSuccess(null);
            }, 3000);
          }
          this.updateTasks(tasksFiltered);
        } catch (error) {
          this.setError("There was some server error while deleting the task.");
          console.error(error.message);
  
          setTimeout(() => {
            this.setError(null);
          }, 3000);
        }
      },
      async deleteAll() {
        const confirmDelete = confirm(
          "Are you sure you want to delete all tasks?"
        );
  
        if (confirmDelete)
          try {
            const ids = this.tasks.map((task) => task.id);
            ids.forEach(async (id) => await api.delete(`${id}`));
  
            this.setSuccess("Tasks deleted successfully!");
  
            setTimeout(() => {
              this.setSuccess(null);
            }, 3000);
            this.updateTasks([]);
          } catch (error) {
            this.setError("There was some server error while deleting the tasks.");
            console.error(error.message);
  
            setTimeout(() => {
              this.setError(null);
            }, 3000);
          }
      },
      openEditModal(task) {
        this.editingTask = { ...task }; // Make a copy of the task to avoid directly modifying the state
      },
      saveEditedTask(editedTask) {
        // Update the task in the backend
        api.put(editedTask.id, editedTask)
          .then(({ data }) => {
            // Update the task in the state
            const updatedTasks = this.tasks.map(task => (task.id === data.id ? data : task));
            this.UPDATE_TASKS(updatedTasks);
  
            // Close the edit modal
            this.editingTask = null;
  
            // Show success message
            this.setSuccess("Task updated successfully!");
  
            setTimeout(() => {
              this.setSuccess(null);
            }, 3000);
          })
          .catch(error => {
            // this.setError("Error updating task");
            console.error(error.message);
          });
      },
      cancelEdit() {
        // Close the edit modal without saving changes
        this.editingTask = null;
      },
      formatDate() {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString(undefined, options);
  }
    },
  };
  </script>
  
  <style scoped>
  .wrapper {
    text-align: right;
  }
  
  .container-task {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .trash-btn {
    width: 32px;
    height: 32px;
    margin-bottom: 25px;
  }
  
  .edit-btn {
    cursor: pointer;
    color: var(--color-primary);
    margin-left: 10px;
  }
  
  .fieldset {
    display: flex;
    gap: 8px;
    align-items: center;
    margin: 30px 0;
  }
  
  .fieldset:first-child {
    margin: 0 0 30px 0;
  }
  
  .fieldset:last-child {
    margin: 30px 0 0 0;
  }
  
  .check {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  
  .label {
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-black);
  }
  
  .task--completed {
    text-decoration: line-through;
  }
  
  .delete-all-btn {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-white);
    padding: 20px 40px;
    border-radius: 12px;
    background-color: var(--color-danger);
    box-shadow: var(--box-shadow-danger);
    transition: 0.3s;
    margin-top: 40px;
  }
  
  .delete-all-btn:hover {
    transform: translateY(-2px);
  }
  .img-edit{
    margin-bottom: 30px;
  }
  
  @media (max-width: 768px) {
    .wrapper {
      text-align: center;
    }
  }
  </style>
  