<script setup name="SvgIcon">
import { computed } from "vue";

const props = defineProps({
  /**
   * svg图标名称
   * @type String
   * @requires true
   */
  name: {
    type: String,
    required: true,
  },
  /**
   * svg图标颜色
   * @type String
   * @default #333
   */
  color: {
    type: String,
    default: "#000000",
  },
  /**
   * svg图标大小
   * @type String
   * @default 1em
   */
  size: {
    type: String,
    default: "1em"
  }
});

const iconName = computed(() => `#icon-${props.name}`);
</script>
<template>
  <!-- vite-plugin-svg-icons 使用 -->
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName" :fill="color" :width="size" :height="size" />
  </svg>
</template>
<style lang="scss" scoped>
.svg-icon {
  width: v-bind(size);
  height: v-bind(size);
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
}
</style>
