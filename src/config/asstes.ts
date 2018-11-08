export const staticAssetsConfig = {
  root: `${process.cwd()}/src/public/static`,
};

/**
 * NestJS uses point-of-vew library
 * to set view engine configuration
 * when using FastifyAdapter.
 *
 * To see the list of avaliable options
 * for viewEngineConfig, see point-of-vew docs.
 * {@link https://github.com/fastify/point-of-view#readme}
 */
export const viewEngineConfig = {
  engine: {
    pug: require('pug'),
  },
  options: {
    basedir: `${process.cwd()}/src/public/views`,
  },
  includeViewExtension: true,
  templates: `${process.cwd()}/src/public/views`,
};