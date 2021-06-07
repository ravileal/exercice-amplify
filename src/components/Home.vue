<template>
  <div>
    <div>Hello, {{ user.username }}</div>
    <amplify-sign-out></amplify-sign-out>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {
    user: Object,
  },
};
</script>

<style></style>
