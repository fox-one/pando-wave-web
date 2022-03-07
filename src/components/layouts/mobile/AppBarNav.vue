<template>
  <f-app-bar
    v-if="appbar.show"
    app
    flat
    center
    :title="appbar.title"
    :back="appbar.back"
    :class="{ 'appbar--shadow': appbar.extension }"
    :extensionHeight="appbar.extensionHight"
    @back="handleBack"
  >
    <template v-slot:extension v-if="appbar.extension">
      <f-render :nodes="appbar.extension" />
    </template>
  </f-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
class AppBarNav extends Vue {
  get appbar() {
    const state = this.$store.state;
    const appbar = state.app.appbar;

    return {
      ...appbar,
    };
  }

  handleBack() {
    if (window.history.length <= 2) {
      this.$router.options;
      this.$router.replace({ name: "index" });
    } else {
      this.$router.back();
    }
  }
}
export default AppBarNav;
</script>

<style lang="scss" scoped>
.appbar--shadow {
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.06) !important;
}

.theme--dark {
  .appbar--shadow {
    box-shadow: 0px 0px 24px rgba(255, 255, 255, 0.12) !important;
  }
}

::v-deep {
  .f-app-bar__title {
    font-weight: 600 !important;
  }
}
</style>
