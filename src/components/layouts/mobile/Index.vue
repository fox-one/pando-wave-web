<template>
  <div>
    <app-bar-home v-if="isHome" />
    <app-bar-nav v-else />

    <v-main>
      <div v-if="stop" class="pa-4">
        <f-tip type="warning" class="text-center narrow-container">
          <h2 class="mb-2">Announcement</h2>
          <div class="mb-2">
            Pando Wave intends to upgrade the system in the future, and all operations have been halted since October
            19, 2022, at 8:00 a.m. UTC.
          </div>
          <div>
            Since October 19, 2022, all Pando Wave projects have been liquidated, and your funds and interest from
            participating in the project have been returned to your Mixin wallet.
          </div>
        </f-tip>
      </div>
      <nuxt v-else />
    </v-main>

    <modals a="1212" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppBarHome from "./AppBarHome.vue";
import AppBarNav from "./AppBarNav.vue";
import Modals from "../modals/Index.vue";
import { Get } from "vuex-pathify";

@Component({
  name: "mobile-layout",
  components: {
    Modals,
    AppBarHome,
    AppBarNav,
  },
})
class MobileLayout extends Vue {
  @Get("app/appbar@style") style!: "home" | "nav";

  get stop() {
    return true;
  }

  get isHome() {
    return this.style === "home";
  }
}
export default MobileLayout;
</script>
