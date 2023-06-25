const nameList = require('../utils/nameList');

const replaceName = (req, res, next) => {
    const originalSend = res.send;

    res.send = function (data) {
        if (typeof data === "string") {
            nameList.forEach(name => {
                const regex = new RegExp(`\\b${name}\\b`, 'gi');
                data = data.replace(regex, "Consejero LC");
            });
        }
        originalSend.call(this, data);
    };
    next();
};

module.exports = replaceName;