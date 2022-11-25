import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import router from '@/router'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
    movies: [],
    comments: [],
    genres: [],
    token: null,
    user: null,
    modalMessage: null,
  },
  getters: {
    isLogIn(state) {
      return state.token ? true : false
    }
  },
  mutations: {
    GET_MOVIES(state, movies) {
      state.movies = movies
    },
    GET_GENRES(state, genres) {
      state.genres = genres
    },
    // 회원가입 && 로그인
    SAVE_TOKEN(state, loginPayload) {
      state.token = loginPayload.key
      if (loginPayload.next) {
        router.push({ path: loginPayload.next })
      } else {
        router.push({ name: 'PopularView', page: 1 })
      }
    },
    GET_USER_DETAIL(state, user) {
      state.user = user
    },
    LOG_OUT(state) {
      state.token = null
      state.user = null
    },
    SET_MODAL_MESSAGE(state, modalMessage) {
      state.modalMessage = modalMessage
    },
    RESET_MODAL_MESSAGE(state) {
      state.modalMessage = null
    }
  },
  actions: {
    getMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/movies/`,
      })
        .then((res) => {
          context.commit('GET_MOVIES', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getGenres(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/movies/genres/`,
      })
        .then((res) => {
          context.commit('GET_GENRES', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    signUp(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username: payload.username,
          password1: payload.password1,
          password2: payload.password2,
          email: payload.email,
        }
      })
      .then((response)=>{
        const key = response.data.key
        const next = payload.next
        const loginPayload = { 
          key,
          next,
        }
        context.commit('SAVE_TOKEN', loginPayload)
        return key
      })
      .then((key)=> {
        context.dispatch('getUserDetail', key)
        alert('회원가입이 완료되었습니다.')
      })
      .catch((error)=>{
        const errorMessage = error.response.data
        console.log(errorMessage)
        var modalMessage
        if (errorMessage.username) {
          switch (errorMessage.username[0]) {
            case 'This field may not be null.': {
              modalMessage = 'ID를 입력해주세요'
              break
            }
            case 'A user with that username already exists.': {
              modalMessage = '이미 존재하는 ID입니다'
              break
            }
          }
        } else if (errorMessage.email){
          switch (errorMessage.email[0]) {
            case 'This field may not be null.': {
              modalMessage = '이메일을 입력해주세요'
              break
            }
            case 'Enter a valid email address.': {
              modalMessage = '잘못된 이메일 형식입니다'
              break
            }
            case 'A user is already registered with this e-mail address.': {
              modalMessage = '이미 등록된 이메일입니다'
              break
            }
          }
        } else if (errorMessage.password1) {
          switch (errorMessage.password1[0]) {
            case 'This field may not be null.': {
              modalMessage = '비밀번호를 입력해주세요'
              break
            }
            case 'This password is too short. It must contain at least 8 characters.': {
              modalMessage = '비밀번호는 8자 이상으로 작성해주세요'
              break
            }
            case 'This password is too common.': {
              modalMessage = '지나치게 쉬운 비밀번호입니다'
              break
            }
            case 'This password is entirely numeric.': {
              modalMessage = '비밀번호는 숫자만으로 설정 불가능합니다'
              break
            }
          }
        } else if (errorMessage.password2) {
          switch (errorMessage.password2[0]) {
            case 'This field may not be null.': {
              modalMessage = '비밀번호 확인을 입력해주세요'
              break
            }
          }
        } else if (errorMessage.non_field_errors) {
          switch (errorMessage.non_field_errors[0]) {
            case "The two password fields didn't match.": {
              modalMessage = '비밀번호 확인이 일치하지 않습니다'
              break
            }
          }
        } else {
          modalMessage = '회원가입 실패'
        }
        context.commit('SET_MODAL_MESSAGE', modalMessage)
      })
    },
    logIn(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username: payload.username,
          password: payload.password,
        }
      })
        .then((response)=>{
          const key = response.data.key
          const next = payload.next
          const loginPayload = { 
            key,
            next,
          }
          context.commit('SAVE_TOKEN', loginPayload)
          return key
        })
        .then((key)=> {
          context.dispatch('getUserDetail', key)
        })
        .catch((error)=>{
          const errorMessage = error.response.data
          console.log(errorMessage)
          var modalMessage
          if (errorMessage.non_field_errors) {
            switch (errorMessage.non_field_errors[0]) {
              case 'Must include "username" and "password".': {
                modalMessage = 'ID를 입력해주세요'
                break
              }
              case 'Unable to log in with provided credentials.': {
                modalMessage = '잘못된 정보가 입력되었습니다'
                break
              }
            }
          } else if (errorMessage.password) {
            switch (errorMessage.password[0]) {
              case "This field may not be blank.": {
                modalMessage = '비밀번호를 입력해주세요'
                break
              }
            }
          } else {
            modalMessage = '로그인 실패'
          }
          context.commit('SET_MODAL_MESSAGE', modalMessage)
        })
    },
    getUserDetail(context, key) {
      axios({
        method: 'post',
        url: `${API_URL}/api/accounts/`,
        data: {
          key: key,
        }
      })
        .then((response) => {
          context.commit('GET_USER_DETAIL', response.data)
        })
        .catch((error)=>{
          console.log(error)
        })
    }
  },
  modules: {
  }
})
