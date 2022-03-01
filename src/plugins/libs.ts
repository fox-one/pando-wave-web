import Vue from "vue";
import UIKit from "@foxone/uikit";
import PandoUI from "@foxone/pando-ui";

import "@foxone/uikit/build/index.min.css";
import "@foxone/pando-ui/build/index.css";
import "@/components";

const plugin = ({ app }) => {
  Vue.use(UIKit);
  Vue.use(UIKit.Toast, app.vuetify, {
    top: false,
    centered: true,
  });
  Vue.use(UIKit.Dialog, app.vuetify, { flat: true });
  Vue.use(PandoUI, app.vuetify);
};

export default plugin;
