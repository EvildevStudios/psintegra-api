const disorders = require('./keywords/disorders');
const gratitude = require('./keywords/gratitude');
const problems = require('./keywords/problems');
const selfHelp = require('./keywords/selfHelp');
const therapy = require('./keywords/therapy');
const greetings = require('./keywords/greetings');
const psychologistTopics = require('./keywords/psychologistTopics');
const hobbies = require('./keywords/hobbies');
const relationships = require('./keywords/relationships');
const personalDevelopment = require('./keywords/personalDevelopment');
const workLife = require('./keywords/workLife');
const otherTopics = require('./keywords/otherTopics');

const keywords = [
    ...disorders,
    ...gratitude,
    ...problems,
    ...selfHelp,
    ...therapy,
    ...greetings,
    ...psychologistTopics,
    ...hobbies,
    ...relationships,
    ...personalDevelopment,
    ...workLife,
    ...otherTopics
];

module.exports = keywords;