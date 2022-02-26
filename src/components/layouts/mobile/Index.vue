<template>
  <div>
    <app-bar-home v-if="isHome" />
    <app-bar-nav v-else />

    <v-main>
      <nuxt />
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

  get isHome() {
    return this.style === "home";
  }
}
export default MobileLayout;
</script>
