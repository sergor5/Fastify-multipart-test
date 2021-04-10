const fastify = require("fastify")();
const fs = require("fs");
const util = require("util");
const path = require("path");
const { pipeline } = require("stream");
const pump = util.promisify(pipeline);

fastify.register(require("fastify-multipart"));

fastify.post("/", async (request, reply) => {
  const data = await request.file();
  data.file; // stream
  data.fields; // other parsed parts
  data.fieldname;
  data.filename;
  data.encoding;
  data.mimetype;

  await pump(data.file, fs.createWriteStream(data.filename));

  reply.send();
});

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
