<template>
  <div class="phonenumber">
    <span>{{ phonenumber }}</span>
    <button @click="remove()">remove</button>
  </div>
</template>

<script>
export default {
  name: 'PhonenumberEntry',
  props: {
    phonenumber: String
  },
  methods: {
    remove: function () {
      this.$emit('remove')
    }
  }
}
</script>

<style scoped>
.phonenumber {
  display: flex;
}

.phonenumber span {
  width: 10rem;
  padding: 0.25rem;
  margin: 0.25rem;
}

.phonenumber button {
  width: 5rem;
}
</style>
