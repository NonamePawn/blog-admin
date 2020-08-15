<template>
  <let-it-snow
          v-bind="snowConf"
          :show="show"
  ></let-it-snow>
</template>

<script>
  export default {
    name: "Snow",
    props: {
      scene: {
        type: String,
        default() {
          return 'admin'
        }
      }
    },
    data () {
      return {
        snowConf: {
          windPower : 1,
          speed : 3,
          count : 13,
          size : 13,
          opacity : 0.8,
          images: this.images
        },
        show: false,
        images: []
      }
    },
    created() {
      if (this.scene === 'home') {
        this.snowConf.images =  [
          'http://cdn.nonamepawn.cn/home/img/snow.png',
          'http://cdn.nonamepawn.cn/home/img/snow.png'
        ]
      }else {
        this.snowConf.images =  [
          'http://cdn.nonamepawn.cn/admin/img/fire.png',
          'http://cdn.nonamepawn.cn/admin/img/fire.png'
        ]
      }
    },
    mounted () {
      this.show = true

      //   setTimeout( () => {
      //       this.show = false
      //   }, 5000)

      //   setTimeout( () => {
      //       this.show = true
      //   }, 10000)
    }
  }
</script>

<style scoped>

</style>