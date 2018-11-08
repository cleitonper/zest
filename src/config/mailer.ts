const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_NAME,
  EMAIL_ADDR,
} = process.env;

const transport = {
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
};

const templateDir = './src/public/views';

const defaults = {
  from: `${EMAIL_NAME} <${EMAIL_ADDR}>`,
};

const templateOptions = {
  engine: 'pug',
  engineConfig: {
    basedir: `${process.cwd()}/src/public/views`,
  },
  inlineCSS: {
    enabled: true,
    options: {
      webResources: {
        svgs: false,
        relativeTo: `${process.cwd()}/src/public/static`,
      },
    },
  },
};

export default  {
  transport,
  templateDir,
  templateOptions,
  defaults,
};