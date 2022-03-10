<template>
  <div class="flex items-center justify-between">
    <h3 class="text-lg font-bold">
      {{ index + 1 }}. {{ model.question }}
    </h3>
    <div class="flex items-center">
      <button type="button" @click="addQuestion()" class="flex items-center
        text-xs py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add
      </button>
      <button type="button" @click="deleteQuestion(survey)"
              class="flex items-center justify-center rounded-sm
            border border-transparent text-xs text-red-500 hover:border-red-600">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -mt-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Delete
      </button>
    </div>
  </div>
  <div class="grid gap-3 grid-cols-12">
    <div class="mt-3 col-span-9">
      <label
        :for="'question_text_' + model.data"
        class="block text-sm font-medium text-gray-700"
      >Question Text</label
      >
      <input
        type="text"
        :name="'question_text_' + model.data"
        v-model="model.question"
        @change="dataChange"
        :id="'question_text_' + model.data"
        class="
          mt-1
          focus:ring-indigo-500 focus:border-indigo-500
          block
          w-full
          shadow-sm
          sm:text-sm
          border-gray-300
          rounded-md
        "
      />
    </div>
    <div class="mt-3 col-span-3">
      <label for="question_type" class="block text-sm font-medium text-gray-700"
      >Select Question Type</label
      >
      <select
        id="question_type"
        name="question_type"
        v-model="model.type"
        @change="typeChange"
        class="mt-1 block w-full  py-2  px-3 border border-gray-300
          bg-white
          rounded-md
          shadow-sm
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
          sm:text-sm
        "
      >
        <option v-for="type in questionTypes" :key="type" :value="type">
          {{ upperCaseFirst(type) }}
        </option>
      </select>
    </div>
  </div>

  <!-- Data -->
  <div>
    <div v-if="shouldHaveOptions()" class="mt-2">
      <h4 class="text-sm font-semibold mb-1 flex justify-between items-center">
        Options

        <!-- Add new option -->
        <button
          type="button"
          @click="addOption()"
          class="
            flex
            items-center
            text-xs
            py-1
            px-2
            rounded-sm
            text-white
            bg-gray-600
            hover:bg-gray-700
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          Add Option
        </button>
        <!--/ Add new option -->
      </h4>

      <div
        v-if="!model.data.options.length"
        class="text-xs text-gray-600 text-center py-3"
      >
        You don't have any options defined
      </div>
      <!-- Option list -->
      <div
        v-for="(option, index) in model.data.options"
        :key="option.uuid"
        class="flex items-center mb-1"
      >
        <span class="w-6 text-sm"> {{ index + 1 }}. </span>
        <input
          type="text"
          tabindex="1"
          v-model="option.text"
          @change="dataChange"
          class="
            w-full
            rounded-sm
            py-1
            px-2
            text-xs
            border border-gray-300
            focus:border-indigo-500
          "
        />
        <!-- Delete Option -->
        <button
          type="button"
          @click="removeOption(option)"
          class="h-6 w-6 rounded-full flex items-center justify-center border border-transparent transition-colors hover:border-red-100
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <!--/ Delete Option -->
      </div>
      <!--/ Option list -->
    </div>
  </div>
  <!--/ Data -->

  <hr class="my-4" />
</template>

<script setup>
import {ref,computed} from "vue";
import store from "../../store";
import {v4 as uuidv4 } from "uuid";

const props = defineProps({
  question: Object,
  index: Number
});
const emit = defineEmits(["change", "addQuestion", "deleteQuestion"]);

const model = ref(JSON.parse(JSON.stringify(props.question)));
const questionTypes = computed(() => store.state.questionTypes);
const upperCaseFirst = str => str && str[0].toUpperCase() + str.slice(1)

function shouldHaveOptions() {
  return ["select","radio","checkbox"].includes(model.value.type);
}

function getOptions() {
  return model.value.data.options;
}
function setOptions(options) {
  model.value.data.options = options;
}

function addOption() {
  setOptions([
    ...getOptions(),
    { uuid: uuidv4(), text: "" },
  ]);
  dataChange();
}

function removeOption(op) {
  setOptions(getOptions().filter((opt) => opt !== op));
  dataChange();
}
function typeChange() {
  if (shouldHaveOptions()) {
    setOptions(getOptions() || []);
  }
  dataChange();
}

// Emit the data change
function dataChange() {
  const data = JSON.parse(JSON.stringify(model.value));
  if (!shouldHaveOptions()) {
    delete data.data.options;
  }
  emit("change", data);
}
function addQuestion() {
  emit("addQuestion", props.index + 1);
}
function deleteQuestion() {
  emit("deleteQuestion", props.question);
}
</script>

<style scoped>

</style>
