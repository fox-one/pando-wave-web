<template>
  <div class="f-bottom-action-sheet">
    <f-divider />
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class BottomActionSheet extends Vue {}
export default BottomActionSheet;
</script>

<style lang="scss" scoped>
.f-bottom-action-sheet {
  z-index: 11;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  padding-bottom: constant(safe-area-inset-bottom) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;
  background-color: var(--v-greyscale_7-base);
}
</style>
