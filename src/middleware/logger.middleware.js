const morgan = require('morgan');

const serverLogger = morgan((tokens, req, res) => {

    const referrer = tokens.referrer(req, res);

    const domain = referrer ? new URL(referrer).hostname : 'unknown';

    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        'from:', domain // Log the domain
    ].join(' ');
});

module.exports = serverLogger;

