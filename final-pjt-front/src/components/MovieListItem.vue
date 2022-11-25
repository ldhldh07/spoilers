<template>
  <div class="figure col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2">
    <router-link :to="{ name: 'MovieDetailView', params: { id: movie.id } }" class="text-decoration-none">
      <div id="poster-box">
        <img :src="poster" alt="movie-poster" class="rounded thumbnail">
      </div>
      <figcaption class="caption text-nowrap"> {{movie.movie_title}} </figcaption>
    </router-link>
  </div>
</template>
  
<script>
export default {
  name: 'MovieListItem',
  props: {
    movie: Object,
  },
  data: function() {
    return {
      poster: "https://image.tmdb.org/t/p/original" + this.movie.poster_path
    }
  }
}
</script>

<style>

.figure {
  margin-bottom: 55px;
  padding-right: 1.5rem;
}

.thumbnail:hover {
  transform: scale(1.1);
  transition: 0.3s;
}

.thumbnail{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.caption {
  overflow: hidden;
  text-overflow: ellipsis;
  color: #333d51;
  font-size: large;
  font-weight: 400;
}

#poster-box {
  width: 100%;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  border-radius: 10px;
}
</style>
