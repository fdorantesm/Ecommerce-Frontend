<template>
  <div class="external-page">
    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
import Header from '~/components/layout/Header'
import Footer from '~/components/layout/Footer'
export default {
  components: {
    Header,
    Footer
  }
}
</script>
