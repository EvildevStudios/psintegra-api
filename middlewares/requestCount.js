let totalRequests = 0;

const getRequestCount = () => {
    return totalRequests;
};

const incrementRequestCount = () => {
    totalRequests++;
};

const incrementRequestMiddleware = (req, res, next) => {
    incrementRequestCount();
    next();
};

module.exports = { getRequestCount, incrementRequestMiddleware };
