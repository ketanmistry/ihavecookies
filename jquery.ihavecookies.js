/*!
 * ihavecookies - jQuery plugin for displaying cookie/privacy message
 *
 * Copyright (c) 2018 Ketan Mistry (https://iamketan.com.au)
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Version: 1.0
 *
 */
(function($) {

    /*
    |--------------------------------------------------------------------------
    | Cookie Message
    |--------------------------------------------------------------------------
    |
    | Displays the cookie message on first visit or 30 days after their
    | last visit.
    |
    | Options:
    |  - title : Title for the popup
    |  - message : Message to display within the popup
    |  - link : Link to privacy page
    |  - delay : Time before the popup is displayed after page load
    |  - expires : Days for the cookie to expire
    |  - onAccept : Optional callback function when 'Accept' button is clicked
    |  - uncheckBoxes : Unchecks all checkboxes on page load that have class
    |                   .ihavecookies applied to them. Set to true to turn this
    |                   option on
    |
    */
    $.fn.ihavecookies = function(options) {

        var $element = $(this);

        // Set defaults
        var settings = $.extend({
            title: 'Cookies & Privacy',
            message: 'Cookies enable you to use shopping carts and to personalize your experience on our sites, tell us which parts of our websites people have visited, help us measure the effectiveness of ads and web searches, and give us insights into user behavior so we can improve our communications and products.',
            link: '/privacy-policy',
            delay: 2000,
            expires: 30,
            onAccept: function(){},
            uncheckBoxes: false
        }, options);

        var myCookie = getCookie('cookieControl');
        if (!myCookie) {
            // Display cookie message on page
            var cookieMessage = '<div id="gdpr-cookie-message"><h4>' + settings.title + '</h4><p>' + settings.message +'</p><p><a href="' + settings.link + '">More information</a> <button id="gdpr-cookie-accept" type="button">Accept</button></p></div>';
            setTimeout(function(){
                $($element).append(cookieMessage);
                $('#gdpr-cookie-message').hide().fadeIn('slow');
            }, settings.delay);

            // When accept button is clicked drop cookie
            $('body').on('click','#gdpr-cookie-accept', function(){
                dropCookie(settings.expires);
                settings.onAccept.call(this);
            });
        } else {
            dropCookie(settings.expires);
        }

        // Uncheck any checkboxes on page load
        if (settings.uncheckBoxes === true) {
            $('input[type="checkbox"].ihavecookies').prop('checked', false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Drop Cookie
    |--------------------------------------------------------------------------
    |
    | Function to drop the cookie with a boolean value of true.
    |
    */
    var dropCookie = function(expiryDays) {
        setCookie('cookieControl', true, expiryDays);
        $('#gdpr-cookie-message').fadeOut('fast', function() {
            $(this).remove();
        });
    };

    /*
    |--------------------------------------------------------------------------
    | Set Cookie
    |--------------------------------------------------------------------------
    |
    | Sets cookie with 'name' and value of 'value' for 'expiry_days'.
    |
    */
    var setCookie = function(name, value, expiry_days) {
        var d = new Date();
        d.setTime(d.getTime() + (expiry_days*24*60*60*1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
        return getCookie(name);
    };

    /*
    |--------------------------------------------------------------------------
    | Get Cookie
    |--------------------------------------------------------------------------
    |
    | Gets cookie called 'name'.
    |
    */
    var getCookie = function(name) {
        var cookie_name = name + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(cookie_name) === 0) {
                return c.substring(cookie_name.length, c.length);
            }
        }
        return false;
    };

}(jQuery));
