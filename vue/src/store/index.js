import {createStore} from "vuex";
import axiosClient from '../axios.js';

const tmpSurveys = [
  {
    id: 100,
    title: 'Some Survey to test',
    slug: 'some-survey-to-test',
    status: 'draft',
    image: 'https://via.placeholder.com/400.png/09f/fffC/O',
    description: 'Some Survey description to prove that everything works fine and we can continue implementing other things.',
    created_at: "2021-12-31 18:00:00",
    update_at: "2022-1-31 18:00:00",
    expire_date: "2022-12-31 18:00:00",
    questions: [
      {
        id: 1,
        type: "select",
        question: "Where are you from? (Country)",
        description: null,
        data: {
          options: [
            {uuid: "f52d-j24k-6k3j-3k6l", text: "USA"},
            {uuid: "s52d-j24k-6k3j-3k6l", text: "Russia"},
            {uuid: "152d-j24k-6k3j-3k6l", text: "India"},
            {uuid: "g52d-j24k-6k3j-3k6l", text: "France"},
            {uuid: "l52d-j24k-6k3j-3k6l", text: "Spanish"},
          ],
        },
      },
      {
        id: 2,
        type: "checkbox",
        question: "Which language can you use?",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, expedita, vel.",
        data: {
          options: [
            {uuid: "f52d-j24k-5la1-3k6l", text: "JS"},
            {uuid: "s52d-j24k-5laz-3k6l", text: "PHP"},
            {uuid: "152d-j24k-5aaz-3k6l", text: "Java"},
            {uuid: "g52d-j24k-5lsz-3k6l", text: "C++"},
            {uuid: "l52d-j24k-5laz-3k6l", text: "Python"},
          ],
        },
      },
      {
        id: 3,
        type: "checkbox",
        question: "Which language do you speak?",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, expedita, vel.",
        data: {
          options: [
            {uuid: "f52d-o04k-5la1-3k6l", text: "English"},
            {uuid: "s52d-q2gh-5laz-3k6l", text: "Russian"},
            {uuid: "152d-jl4k-5aaz-3k6l", text: "Spanish"},
            {uuid: "g52d-3e4k-5lsz-3k6l", text: "French"},
            {uuid: "l52d-v0ak-5laz-3k6l", text: "German"},
          ],
        },
      },
      {
        id: 4,
        type: "radio",
        question: "Which version of Laravel framework do you prefer?",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, expedita, vel.",
        data: {
          options: [
            {uuid: "f52d-j24k-5la1-3k6l", text: "Laravel 5.7"},
            {uuid: "s52d-j24k-5laz-3k6l", text: "Laravel 6"},
            {uuid: "152d-j24k-5aaz-3k6l", text: "Laravel 7"},
            {uuid: "g52d-j24k-5lsz-3k6l", text: "Laravel 8"},
            {uuid: "l52d-j24k-5laz-3k6l", text: "Laravel 9"},
          ],
        },
      },
      {
        id: 5,
        type: "checkbox",
        question: "What role are you good at?",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, expedita, vel.",
        data: {
          options: [
            {uuid: "f52d-j24k-8ia1-3k6l", text: "Frontend"},
            {uuid: "s52d-j24k-5ls2-3k6l", text: "Backend"},
            {uuid: "1555-j24k-5aaz-3k6l", text: "Fullstack"},
            {uuid: "g52d-j24k-511z-3k6l", text: "Analytic"},
            {uuid: "l52d-j24k-5asz-3k6l", text: "Product owner"},
          ],
        },
      },
      {
        id: 6,
        type: "text",
        question: "Which web technology would you like to research next?",
        description: null,
        data: {},
      },
      {
        id: 7,
        type: "textarea",
        question: "Which technology was your last one and why?",
        description: "Please describe honestly, poll is anonymous",
        data: {},
      }
    ],
  },
  {
    id: 200,
    title: 'Laravel-8',
    slug: 'laravel-8',
    status: 'active',
    image: 'https://via.placeholder.com/1200.png/09f/fffC/O',
    description: 'Some Survey description to prove that everything works fine and we can continue implementing other things.',
    created_at: "2022-01-02 18:00:00",
    update_at: "2022-1-15 18:00:00",
    expire_date: "2022-12-31 18:00:00",
    questions: []
  },
  {
    id: 300,
    title: 'Vue-3',
    slug: 'vue-3',
    status: 'active',
    image: 'https://via.placeholder.com/1200.png/09f/fffC/O',
    description: 'Some Survey description to prove that everything works fine and we can continue implementing other things.',
    created_at: "2022-01-02 18:00:00",
    update_at: "2022-1-15 18:00:00",
    expire_date: "2022-12-31 18:00:00",
    questions: []
  },
  {
    id: 400,
    title: 'Tailwind-3',
    slug: 'tailwind-8',
    status: 'active',
    image: 'https://via.placeholder.com/1200.png/09f/fffC/O',
    description: 'Some Survey description to prove that everything works fine and we can continue implementing other things.',
    created_at: "2022-01-02 18:00:00",
    update_at: "2022-1-15 18:00:00",
    expire_date: "2022-12-31 18:00:00",
    questions: []
  },
];

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN'),
    },
    surveys: [...tmpSurveys],
    questionTypes: ["text","select","radio","checkbox","textarea"],
  },
  getters: {},
  actions: {
    register({ commit }, user) {
      return axiosClient.post('/register', user)
        .then(({data})=>{
          commit('setUser', data);
          return data;
        })
    },
    login({ commit }, user) {
      return axiosClient.post('/login', user)
        .then(({data})=>{
          commit('setUser', data);
          return data;
        })
    },
    logout({ commit }) {
      return axiosClient.post('/logout').then(response => {
        commit('logout');
        return response;
      })
    }
  },
  mutations: {
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem('TOKEN');
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.data;
      sessionStorage.setItem('TOKEN', userData.token);
    }
  },
  modules: {}
})

export default store;
