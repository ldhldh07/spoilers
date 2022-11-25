<template>
  <div id="app">
    <b-navbar fixed="top" type="dark" id="bar" class="text-nowrap">

      <b-navbar-brand id="logo" to="/popular/1">Spoilers</b-navbar-brand>

      <b-navbar-nav>
        <b-nav-item to="/popular/1">인기</b-nav-item>
        <b-nav-item to="/new/1">최신</b-nav-item>
        <b-nav-item to="/genre" id="genre-text">장르</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ms-auto">
        <b-form-input placeholder="영화 이름을 입력하세요" @keyup.enter="search" v-model="searchWord"></b-form-input>
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" id="search" @click="search"/>  
      </b-navbar-nav>
      

      <b-navbar-nav v-if="!isLogIn" class="ms-3 me-0">
        <b-nav-item :to="{ name: 'LogInView', query: { next: fromPath } }" >로그인</b-nav-item>
        <b-nav-item :to="{ name: 'SignUpView', query: { next: fromPath } }" >회원가입</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav v-else class="ms-3 me-0">
        <b-nav-item :to="{ name: 'ProfileView', params: { username: this.user?.username, page:1 } }">
          <font-awesome-icon icon="fa-solid fa-user" />
          {{this.user?.username}}
        </b-nav-item>
        <b-nav-item href="#" @click="logOut">로그아웃</b-nav-item>
      </b-navbar-nav>

    </b-navbar>

    <b-modal ref="logout" hide-footer hide-header-close title="로그아웃">
      <p class="my-4">성공적으로 로그아웃 되었습니다.</p>
    </b-modal>

    <router-view id="content"/>

    <font-awesome-icon 
      id="up"
      icon="fa-solid fa-circle-chevron-up"
      @click="scrollinit"
       />

  </div>
</template>

<script>
export default {
  data() {
    return {
      searchWord: null
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    isLogIn() {
      return this.$store.getters.isLogIn
    },
    fromPath() {
      var fromPath
      if (this.$route.query.next) {
        fromPath = this.$route.query.next
      } else {
        fromPath = this.$route.path
      }
      return fromPath
    }
  },
  methods: {
    logOut() {
      this.$refs['logout'].show()
      this.$store.commit('LOG_OUT')
      setTimeout(() => {
        this.$refs['logout'].hide()
      },1000)
    },
    scrollinit() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },
    search() {
      if (this.searchWord?.trim()) {
        this.$router.push({name:'SearchView',params:{keyword:this.searchWord, page:1}})
        this.searchWord=null
      } else (
        alert('검색어를 입력해주세요')
      )
    }
  },
}
</script>


<style>
@font-face {
  font-family: 'SUIT-Medium';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Medium.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'PyeongChangPeace-Bold';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/PyeongChangPeace-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}

#logo {
  font-family: 'PyeongChangPeace-Bold';
  
}

#app {
  font-family: 'SUIT-Medium';
  text-align: left;
  padding-left: 13%;
  padding-right: 13%;
  color: #333d51;
}

#bar {
  background-color: #333d51;
  padding-left: 13%;
  padding-right: 13%;
}

.navbar-dark .navbar-nav .nav-link{
  color:#d3ac2b !important
}

.navbar-dark .navbar-nav a{
  text-decoration: none;
  color:#d3ac2b !important
}

.navbar-dark .navbar-nav .nav-link.router-link-active{
  color: #f4f3ea !important;
}

.navbar-dark .navbar-brand {
  color:#d3ac2b !important ;
}

.navbar-dark .navbar-nav #search{
  color:#d3ac2b !important;
  margin-left: 10px;
  align-self: center;
  cursor: pointer;
}


#content{
  padding-top: 120px;
}

#up{
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 30px;
  height: 30px;
  cursor: pointer;
}

#main{
  margin-bottom: 20px;
}

</style>
