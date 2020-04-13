<template>
  <div id="app">
    
    <router-view/>


  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    const api = `${process.env.VUE_APP_APIPATH}/api/${
      process.env.VUE_APP_CUSTOMPATH
    }/products`;
    console.log(
      "PATH",
      process.env.VUE_APP_APIPATH,
      process.env.VUE_APP_CUSTOMPATH
    );
    this.$http.get(api).then(response => {
      console.log("API", response.data);
    });
  }
};
</script>

<style lang="scss">
@import "./assets/all";
</style>
