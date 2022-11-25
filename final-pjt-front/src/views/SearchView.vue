<template>
  <div class="popular">
    <h1 id="main">"{{ searchWord }}"의 검색 결과</h1>
    <MovieList
      :isNew="searchWord"
    />
  </div>
</template>

<script>
import MovieList from '@/components/MovieList'

export default {
  beforeRouteUpdate(to,from,next) {
		this.searchWord= to.params.keyword
		next()
  },

  name: 'PopularView',
  components: {
    MovieList,
  },
  data: function() {
    return{
      searchWord : this.$route.params.keyword,
    }
  },
}
</script>

<style>
#main{
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
