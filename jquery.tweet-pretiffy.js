/**
 * jQuery lightweight plugin to parse & prettify twitter tweets
 *
 * Original author: Craig Phillips (Twitter handle: @56yards)
 * Licensed under the MIT license
 *
 * @param  object $ jQuery denpendency
 * @return self element/object
 */


(function($){

	$.fn.tweetPrettify = function(options) {

		var self = this;

		var defaults = {
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
		};

		var settings = $.extend( {}, defaults, options );
		
		return this.each(function(){

            var $text = $(this).text();            
                $(this).html($text.parseURL(settings.urlTemplate).parseHashtag(settings.hashtagTemplate).parseUsername(settings.usernameTemplate));
            });
	};

	/**
	 * Prototyping String to create a parseURL method
	 *
	 * Method will create links in url strings
	 *
	 * @param none
	 */
	String.prototype.parseURL = function(options) {
		return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/g, function(url) {
			return url.hyperlink(url, options);
		});
	};

	/**
	 * Prototyping String to create a parseUsername method
	 *
	 * Method will create links in @username strings
	 *
	 * @param none
	 */
	String.prototype.parseUsername = function(options) {
		return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(username) {
			return username.hyperlink(username.replace("@",""), options);
		});
	};

	
	/**
	 * String to create a parseHashtag method
	 *
	 * Method will create links in #hashtags strings
	 *
	 * @param none
	 */
	String.prototype.parseHashtag = function(options) {
		return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
			return t.hyperlink(t.replace("#", "%23"), options);
		});
	};


	/**
	 *  String to create hyperlink method
	 *  
	 *  Method will build a hyperlink
	 *
	 * @param string val A [hashtag, username, url]
	 * @param object options Option param
	 */
	String.prototype.hyperlink = function(val,options) {

		var attrs = "";

		$.each(options, function(k, v) {
			attrs += " " + k + "='" + v + "'"
		});

		attrs = attrs.replace("#{tag}", val).replace("#{username}", val);

		if (! options.href)
			attrs += "href='" + val + "'"

		return "<a " + attrs + ">" + this + "</a>"
	};

}(jQuery));
