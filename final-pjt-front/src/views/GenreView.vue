<template>
  <div class="genre">
    <h1 id="main">{{ genre }} 영화</h1>
    <GenreMovieList
      :genre-code="genreCode"
    />
  </div>
</template>

<script>
import GenreMovieList from '@/components/GenreMovieList'

export default {
  name: 'GenreView',
  components: {
    GenreMovieList,
  },
  created() {
    this.getMovies()    
  },
  data: function() {
    return {
      genre: this.$route.params.genre,
      genreCode: this.$route.params.code
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
#main {
  font-weight: bold;
}
</style>