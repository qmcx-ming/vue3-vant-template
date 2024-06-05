<script setup name="Home">
import { ref } from 'vue';
import Logo from "@/assets/logo.png";

const value = ref('');
</script>

<template>
  <div class="home">
    <van-image class="logo" width="100" height="100" :src="Logo" fit="cover" />
    <van-field
      border
      v-model="value"
      label="测试"
      placeholder="测试keepalive是否生效"
      clearable
    />
  </div>
</template>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;

  .logo {
    margin-top: 30px;
  }
}
</style>
