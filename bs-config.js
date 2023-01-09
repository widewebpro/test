require('dotenv').config();
var url = (process.env.PRIMARY_SITE_URL || 'locahost').replace(/(^\w+:|^)\/\//, '');
module.exports = {
  'proxy': url,
  'host': url,
  'ui': { 'port': 3001 },
  'open': false,
  'files': [{
    match: [
      './web/_compiled/**/*.{css,js}',
      './templates/**/*.{twig,html}'
    ]
  }],
  'watchEvents': [ 'change' ],
  'watch': false,
  'ignore': [],
  'single': false,
  'watchOptions': {
    'ignoreInitial': true
  },
  'server': false,
  'port': 3000,
  'middleware': false,
  'serveStatic': [],
  'ghostMode': {
    'clicks': true,
    'scroll': true,
    'location': true,
    'forms': {
      'submit': true,
      'inputs': true,
      'toggles': true
    }
  },
  'logLevel': 'info',
  'logPrefix': 'Browsersync',
  'logConnections': false,
  'logFileChanges': true,
  'logSnippet': true,
  'rewriteRules': [],
  'browser': 'default',
  'cors': false,
  'xip': false,
  'hostnameSuffix': false,
  'reloadOnRestart': false,
  'notify': true,
  'scrollProportionally': true,
  'scrollThrottle': 0,
  'scrollRestoreTechnique': 'window.name',
  'scrollElements': [],
  'scrollElementMapping': [],
  'reloadDelay': 0,
  'reloadDebounce': 500,
  'reloadThrottle': 0,
  'plugins': [],
  'injectChanges': true,
  'startPath': null,
  'minify': true,
  'localOnly': false,
  'codeSync': true,
  'timestamps': true,
  'clientEvents': [
    'scroll',
    'scroll:element',
    'input:text',
    'input:toggles',
    'form:submit',
    'form:reset',
    'click'
  ],
  'socket': {
    'socketIoOptions': {
      'log': false
    },
    'socketIoClientConfig': {
      'reconnectionAttempts': 50
    },
    'path': '/browser-sync/socket.io',
    'clientPath': '/browser-sync',
    'namespace': '/browser-sync',
    'clients': {
      'heartbeatTimeout': 5000
    }
  },
  'tagNames': {
    'less': 'link',
    'scss': 'link',
    'css': 'link',
    'jpg': 'img',
    'jpeg': 'img',
    'png': 'img',
    'svg': 'img',
    'gif': 'img',
    'js': 'script'
  },
  'injectNotification': false
};
