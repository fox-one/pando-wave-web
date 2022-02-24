<template>
  <v-container>
    sadfs
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import mixins from "@/mixins";

@Component
class IndexPage extends Mixins(mixins.Page) {
  get appbar() {
    return {
      back: false,
      style: "home" as const,
    };
  }
}
export default IndexPage;
</script>

<style lang="scss" scoped></style>
