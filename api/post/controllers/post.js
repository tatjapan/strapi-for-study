"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      if (!data || !data.description) {
        ctx.throw(400, "Please add some content");
      }
      if (!files || !files.length) {
        ctx.throw(400, "Please add at least 1 file.");
      }
      entity = await strapi.services.post.create(
        { ...data, likes: 0 },
        { files }
      );
    } else {
      ctx.throw(400, "You must submit a multipart request.");
      //   entity = await strapi.services.post.create({
      //     ...ctx.request.body,
      //     likes: 0,
      //   });
    }
    return sanitizeEntity(entity, { model: strapi.models.post });
  },
};
