<template>
  <div class="error-404">
    <b-container>
      <div class="error-404__text">
        <div class="error-404__code">{{error.statusCode}}</div>
        <div class="error-404__message">{{error.message}}</div>
      </div>
      <div class="text-center p20">
        <b-btn to="/" variant="outline-success">Go to Home</b-btn>
        <b-btn @click="$router.go(-1)" variant="outline-danger">Go back</b-btn>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  layout: 'external',
  props: ['error']
}
</script>
