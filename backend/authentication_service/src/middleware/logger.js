const info = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params);
    }
};

const logger = (request, response, next) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log('Method:', request.method);
        console.log('Path:', request.path);
        console.log('Body:', request.body);
        console.log('---');
    }
    next();
};

module.exports = logger;
