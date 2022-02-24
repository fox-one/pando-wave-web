<template>
  <v-app>
    <f-loading v-if="initing" :loading="initing" color="primary" fullscreen />
    <mobile-layout v-else />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Sync } from "vuex-pathify";
import MobileLayout from "@/components/layouts/mobile/Index.vue";

@Component({
  components: {
    MobileLayout,
  },
})
class DefaultLayout extends Vue {
  @Sync("app/initing") initing!: boolean;

  async mounted() {
    try {
      await this.$utils.app.init(this);
    } catch (error) {
      this.$utils.helper.errorHandler(this, error);
    }
  }
}
export default DefaultLayout;
</script>

<style lang="scss" scoped></style>
