<template>
  <v-container class="pa-4">
    <pando-social-links />
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import mixins from "@/mixins";

@Component
class Contacts extends Mixins(mixins.Page) {
  get title() {
    return this.$t("contact.us") as string;
  }
}
export default Contacts;
</script>
