<template>
  <div class="text-nowrap">
    <!-- <div id="warning-banner">
      <p id="warning-words" class="fs-4">NING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING</p>
      <div id="warning-block" class="d-flex flex-column justify-content-center align-items-center">
        <h1 id="warning-title">스포일러 주의</h1>
        <h2 id="warning-content">이 사이트는 특정 스토리나 설정에 대한 스포일러를 포함하고 있습니다</h2>
      </div>
      <p id="warning-words" class="text-nowrap fs-4">RNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING</p>
    </div> -->
    <div id="intro" class="text-center">
      <p class="fs-1" id="logo">SPOILERS</p>
      <p class="fs-1" id="title">직접 보지 않고도 영화를 알다</p>
      <p class="fs-4">영화 트레일러와 리뷰를 한 눈에</p>
      <br>
      <font-awesome-icon icon="fa-solid fa-triangle-exclamation" id="warnicon"/>
      <p style="color:#d42a24">SPOILER WARNING</p>
      <p class="fs-5">이 사이트는 스토리나 설정에 대한 스포일러들로 이루어져 있습니다.</p>
    </div>
    <div id="blur"></div>
  </div> 
</template>
  
<script>

</script>

<style>
#warning-banner{
  position: absolute;
  width: 100vw;
  left: 0px;
  top: 25vh
}

#warning-block {
  color: white;
  background-color: rgb(255, 44, 44);
  height: auto;
  padding: 3rem;
}

#warning-words{
  color: rgb(229, 44, 44);
  overflow: hidden;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

#warning-title{
  font-size: 4vw;
  margin-bottom: 3vw;
}
#warning-content{
  font-size: 2vw;
}

#intro {
  position: absolute;
  width: 100vw;
  left: 0px;
  top: 20vh;
}

#warnicon {
  width: 5vw;
  height: auto;
  color: #d42a24;
}

#title {
  font-weight: bold;
}

#blur {
  z-index: -1;
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 0px;
  background-image: url("https://wallpapercave.com/wp/wp1945898.jpg");
  opacity: 25%;
  filter: blur(5px);
}

</style>
  