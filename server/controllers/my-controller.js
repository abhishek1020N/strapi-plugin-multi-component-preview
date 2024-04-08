'use strict';

module.exports = ({ strapi }) => ({

  index(ctx) {
    ctx.body = strapi
      .plugin('multicomponentpreview')
      .service('myService')
      .getWelcomeMessage();
  },
});
