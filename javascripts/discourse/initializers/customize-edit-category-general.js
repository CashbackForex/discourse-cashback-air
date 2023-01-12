import { withPluginApi } from "discourse/lib/plugin-api";
import { cancel } from "@ember/runloop";

export default {
  name: "customize-edit-category-general",

  initialize() {
    withPluginApi("0.8.14", (api) => {
      const org_path = window.location.hostname;
      console.log("Start getting org_path!");
      if(!org_path) return;
      console.log("Org_Path:", org_path);
      api.modifyClass("component:edit-category-general", {
        pluginId: "discourse-air",

        didInsertElement() {
          this._super(...arguments);
          document.body.classList.add("edit-category");
          this._focusCategoryName();
        },

        willDestroyElement() {
          this._super(...arguments);
          document.body.classList.remove("edit-category");
          this._laterFocus && cancel(this._laterFocus);
        },
      });
    });
  },
};
