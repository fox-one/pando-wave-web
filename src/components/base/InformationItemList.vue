<template>
  <div>
    <template v-for="(item, index) in informations">
      <f-divider v-if="item === 'divider'" :key="index" opacity="0.1" class="my-3" />

      <base-information-item v-else :key="index" v-bind="item" />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class InformationItemList extends Vue {
  @Prop() informations;
}
export default InformationItemList;
</script>
