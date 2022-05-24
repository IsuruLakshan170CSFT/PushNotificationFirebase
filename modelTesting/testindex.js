const User = require('./testmodule');
const jim = new User('Jim', 37, 'jim@example.com');

console.log(jim.getUserStats());