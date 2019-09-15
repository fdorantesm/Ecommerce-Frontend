<template>
  <div :style="`background-image: url(${src})`" class="picture"></div>
</template>

<script>
export default {
  props: ['src']
}
</script>

<style lang="css">
  .picture {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 100%;
  }
</style>
