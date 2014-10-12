tweet-prettify
==============

A lightweight jQuery plugin to parse and prettify hashtags, usernames and urls in tweets.

Usage
-----

````javascript
	// jQuery collections of tweets
	$('.tweets').tweetPrettify();
````

Options
-----

````javascript
	{
	  hashtagTemplate: {
        rel: "nofollow",
        target: "_blank",
        href: "http://twitter.com/search?q=#{tag}"
		},
	  usernameTemplate: {
        rel: "nofollow",
        target: "_blank",
        href: "https://twitter.com/#{username}"
		},
      urlTemplate: {
        rel: "nofollow",
        target: "_blank"
		}
	}
````
