<template>
  <div class="profile">
    <h1 id="main">{{ username }}님의 프로필</h1>
    <WishList
      :user = user
    />
    <ProfileCommentList
      :comments= comments
      :user = user
      @update-comment-list="getProfileUserDetail"
    />
  </div>
</template>

<script>
import WishList from '@/components/WishList'
import ProfileCommentList from '@/components/ProfileCommentList.vue'

import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'PopularView',
  components: {
    WishList,
    ProfileCommentList,
  },
  data () {
    return {
      username : this.$route.params.username,
      user : null,
    }
  },
  computed: {
    comments() {
      return this.user?.comment_set
    },
  },
  methods: {
    getProfileUserDetail() {
      axios({
        method: 'post',
        url: `${API_URL}/api/accounts/`,
        data: {
          username: this.username,
        }
      })
        .then((response) => {
          this.user = response.data
        })
        .catch((error)=>{
          console.log(error)
        })
    }
  },
  created() {
    this.getProfileUserDetail()
  },
  beforeRouteUpdate(to, from, next) {
    this.username = to.params.username
    this.getProfileUserDetail()
    next()
  }
}
</script>

<style>
#main{
  font-weight: bold;
}
</style>
