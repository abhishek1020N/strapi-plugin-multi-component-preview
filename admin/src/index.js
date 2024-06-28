import { prefixPluginTranslations } from "@strapi/helper-plugin";
import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import getTrad from "./utils/getTrad";

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });

    app.customFields.register({
      name: "preview",
      pluginId: "multicomponentpreview", // the custom field name
      type: "json", // the field type
      intlLabel: {
        id: getTrad("multicomponentpreview.preview.label"),
        defaultMessage: "Component Preview",
      },
      intlDescription: {
        id: getTrad("multicomponentpreview.preview.description"),
        defaultMessage: "Enter Field Name",
      },
      components: {
        Input: async () => import("./components/preview"),
      },
      options: {
        // declare options here
        base: [
          {
            sectionTitle: null,
            items: [
              {
                name: "options.data", //name of an related field
                type: "json", //input type
                intlLabel: {
                  id: getTrad("url.text"),
                  defaultMessage: "Enter Block Details", //label for the info field
                },
                /**
                 * [{ 'id':1, 'url': 'uploads/testimonails_510808c87b.jpg','type': 'type_1','description':'Preview Image Block'}]
                 */
                description: {
                  id: getTrad("url.description"),
                  defaultMessage: "Add number of fields with data.", //description for field
                },
                placeholder: {
                  id: getTrad("url.placeholder"),
                  defaultMessage:
                    "[{ 'id':1, 'url': 'uploads/testimonails_510808c87b.jpg','type': 'type_1','description':'Preview Image Block'}]",
                },
              },
            ],
          },
        ],
      },
    });
  },

  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
