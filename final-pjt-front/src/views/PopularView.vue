<template>
  <div class="popular">
    <h1 id="main">지금 인기 있는 영화</h1>
    <MovieList
      :isNew="isNew"
    />
  </div>
</template>

<script>
import MovieList from '@/components/MovieList'

export default {
  name: 'PopularView',
  components: {
    MovieList,
  },
  created() {
    this.getMovies()
  },
  data: function() {
    return{
      isNew: 'POPULAR'
    }
  },
  methods: {
    getMovies() {
      this.$store.dispatch('getMovies')
    }
  }

}
</script>

<style>
#main{
  font-weight: bold;
}
</style>