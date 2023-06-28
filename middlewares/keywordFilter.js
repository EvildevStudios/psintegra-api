const unorm = require('unorm');
const keywordList = require('../utils/keywordList');

const keywordFilter = (req, res, next) => {
    const messages = req.body.messages;
    for (const message of messages) {
        const userInput = unorm.nfd(message.content.toLowerCase()).replace(/[\u0300-\u036f]/g, '');
        const normalizedKeywords = keywordList.map(keyword => unorm.nfd(keyword.toLowerCase()).replace(/[\u0300-\u036f]/g, ''));
        const keyword = normalizedKeywords.find(keyword => userInput.includes(keyword));

        if (!keyword) {
            return res.status(400).json({
                message: "Lo siento, como Consejero LC necesito que me proporciones mas detalles sobre tu problema."
            });
        }
    }
    next();
};

module.exports = keywordFilter;