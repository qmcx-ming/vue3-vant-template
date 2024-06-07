<script setup>
import NotFound from '@/assets/images/404.svg';
</script>
<template>
  <div class="not-fount">
    <van-image :src="NotFound" width="200" />
    <p class="not-found-text">哎呀迷路了...</p>
    <div class="not-found-reason">
      <p>可能的原因：</p>
      <ul>
        <li>原来的页面不存在了</li>
        <li>我们的服务器过热，攻城狮正在修复中...</li>
      </ul>
    </div>
    <van-space style="padding: 20px">
      <van-button type="primary" to="/" size="small">返回首页</van-button>
      <van-button type="default" to="/" size="small" @click="$router.back()"
        >返回上页</van-button
      >
    </van-space>
  </div>
</template>
<style lang="scss" scoped>
.not-fount {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;

  .not-found-text {
    width: 100%;
    font-size: 16px;
    border-bottom: 1px solid #f6f6f6;
    padding: 10px 0;
    margin: 0;
    text-align: center;
    letter-spacing: 1px;
  }

  .not-found-reason {
    color: #9ca4ac;
    font-size: 13px;
    ul {
      list-style: disc;

      li {
        margin-left: 36px;
        margin-top: 10px;
      }
    }
  }
}
</style>
