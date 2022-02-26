<template>
  <div class="py-3 info-item">
    <v-layout>
      <div class="info-item__label">
        <span>{{ label }}</span>

        <v-icon v-if="switchValue" size="12" @click="handleSwitch">$IconSwitcher</v-icon>

        <f-hint :hint="hint" />
      </div>
      <v-flex class="info-item__content">
        <div class="info-item__value" @click="handleFill">
          <f-render :nodes="switched ? switchValue : value" />

          <v-icon v-if="fillFn" class="ml-1" size="12">$fill</v-icon>
        </div>
        <div v-if="prediction" class="infor-item__prediction">
          <f-render :nodes="prediction" />
        </div>
      </v-flex>
    </v-layout>

    <div v-if="alert" class="mt-2">
      <f-render :nodes="alert" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class InformationItem extends Vue {
  @Prop() label!: string;

  @Prop() hint;

  @Prop() value;

  @Prop() alert;

  @Prop() prediction;

  @Prop() switchValue;

  @Prop() fillFn;

  @Prop() switchFn;

  switched = false;

  handleSwitch() {
    this.switched = !this.switched;

    if (typeof this.switchFn === "function") {
      this.switchFn(this.switched);
    }
  }

  handleFill() {
    if (typeof this.fillFn === "function") {
      this.fillFn();
    }
  }
}
export default InformationItem;
</script>

<style lang="scss" scoped>
.info-item {
  position: relative;
}

.info-item__content {
  text-align: right;
  font-size: 13px;
  font-weight: 500;
}

.info-item__label {
  font-size: 13px;
  font-weight: 500;
  color: var(--v-greyscale_3-base);
}

.info-item__value {
  font-size: 13px;
  font-weight: 500;
  display: flex;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.infor-item__prediction {
  margin-top: 8px;
}

.warning--text {
  font-size: 12px;
}

::v-deep {
  .warning--emphasize {
    font-size: 14px;
    font-weight: bold;
    color: var(--v-risk_emphasize-base);
  }
}
</style>
