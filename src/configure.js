export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-configuration', config => {
      config.setEnvironments({
        development: ['localhost', 'backstagetest.impulsedetroit.net'],
        production:  ['backstage.impulsedetroit.net']
      });
    });

  aurelia.start().then(() => aurelia.setRoot());
}
