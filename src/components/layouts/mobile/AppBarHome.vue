<template>
  <f-app-bar
    app
    custom-content
    flat
    :extension-height="appbar.extensionHeight"
    :show="appbar.show"
    :class="{ 'appbar--shadow': appbar.extension }"
  >
    <v-layout justify-center align-center class="appbar--home">
      <div class="account">
        <account-entry />
      </div>

      <pando-products current-id="wave" z-index="111" />
    </v-layout>

    <template v-slot:extension v-if="appbar.extension">
      <f-render :nodes="appbar.extension" />
    </template>
  </f-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AccountEntry from "../partial/AccountEntry.vue";

@Component({
  components: {
    AccountEntry,
  },
})
class AppBarHome extends Vue {
  get appbar() {
    const appbar = this.$store.state.app.appbar;

    return {
      show: appbar.show,
      ...appbar,
    };
  }
}
export default AppBarHome;
</script>

<style lang="scss" scoped>
.appbar--home {
  position: relative;

  .account {
    position: absolute;
    left: 0;
  }
}

.appbar--shadow {
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.06) !important;
}

.theme--dark {
  .appbar--shadow {
    box-shadow: 0px 0px 24px rgba(255, 255, 255, 0.12) !important;
  }
}
</style>
