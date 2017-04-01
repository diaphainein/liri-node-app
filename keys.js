// the directions say to put this here, so here it is
console.log('this is loaded');

//twitter require
var Twitter = require('twitter');

// var to hold keys from oauth from twitter
var twitterKeys =  new Twitter({
	consumer_key: 'WmD33V5UJrnc9hUDRNlSSXx2E',
	consumer_secret: '811SIshFWRszE4MTSxGqUz30pEVHkEE4KL4FJdsMH1FPqsG7IM',
	access_token_key: '	123360506-mur6cqbMMORIE2EgsrqjgNEw9ecPObjYrax6nasy',
	access_token_secret: 'RU86EL37ANtmsLZIhJS2lv4MUAdtVyifZrVhkpGHyO0UX',
})

// some node magic to make the twitterKeys var available to liri.js
module.exports = twitterKeys;