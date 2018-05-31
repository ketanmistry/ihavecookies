/*!
 * ihavecookies - jQuery plugin for displaying cookie/privacy message
 * v0.3.2
 *
 * Copyright (c) 2018 Ketan Mistry (https://iamketan.com.au)
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * - Updated so that the settings reflects the already set preferences.
 * - Added button to reopen the cookie preferences
 *   Kim Steinhaug / kim@steinhaug.com 
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
    | - moreInfoLabel : Label for the link to privacy policy
    | - acceptBtnLabel : Label for the accept cookies button
    | - cookieTypes : Array of cookie types to list with checkboxes
    |
    */
    $.fn.ihavecookies = function(options) {

        var $element = $(this);

        // Set defaults
        var settings = $.extend({
            forceDisplayPanel: false,
            fixedCookieTypeLabel:'Nødvendige',
            fixedCookieTypeDesc: 'Informasjonskapslene er nødvendig for å kunne logge deg inn i butikken og at funksjonalitet som handlekurven i det hele tatt fungerer.',
            cookieTypes: [
                {
                    type: 'Innstillinger',
                    value: 'preferences',
                    description: 'Informasjonskapsler kan fortelle oss hvilket språk du foretrekker, i tillegg til kommunikasjonsinnstillingene dine. De kan også gjøre det enklere å fylle ut skjemaer.'
                },
                {
                    type: 'Statistikk',
                    value: 'analytics',
                    description: 'Informasjonskapsler gjør at vi kan finne ut hvor godt nettstedet og plugins fungerer på ulike steder. I tillegg bruker vi informasjonskapsler til å bedre forstå, forbedre, og utforske produkter, funksjoner og tjenester.'
                },
                {
                    type: 'Markedsføring',
                    value: 'marketing',
                    description: 'Vi kan bruke informasjonskapsler til å vise deg relevante annonser. Vi kan også bruke en informasjonskapsel til å finne ut hvorvidt noen som så en annonse på en av våre samarbeidspartneres nettsider, kom tilbake senere og utførte en handling (f.eks. gjennomførte et kjøp).'
                }
            ],
            title: '&#x1F36A; Litt om cookies / informasjonkapsler',
            message: 'Våre nettsider benytter og har lagret informasjonskapsler, men du kan skru dem av om du ønsker. Du kan lese mer om våres bruk av cookies i våres ',
            link: '/legal/cookie-policy.php',
            moreInfoLabel: 'cookie policy',
            delay: 600,
            expires: 30,
            acceptBtnLabel: 'Godta og lagre',
            advancedBtnLabel: 'Innstillinger',
            cookieTypesTitle: 'Informasjonskapsler du samtykker til:',
            uncheckBoxes: false,
            onAccept: function(){
                if ($.fn.ihavecookies.preference('analytics') === false) {
                    // analytics cookie removal task goes here
                }
            }
        }, options);

        var myCookie = getCookie('cookieControl');
        var myCookiePrefs = getCookie('cookieControlPrefs');
        if (!myCookie || !myCookiePrefs || settings.forceDisplayPanel) {
            var myCookie = getCookie('cookieControl');

            // Set the 'necessary' cookie type checkbox which can not be unchecked
            var cookieTypes = '<li><input type="checkbox" name="gdpr[]" value="necessary" checked="checked" disabled="disabled"> <label title="' + settings.fixedCookieTypeDesc + '">' + settings.fixedCookieTypeLabel + '</label></li>';

            // Generate list of cookie type checkboxes
            $.each(settings.cookieTypes, function(index, field) {
                if (field.type !== '' && field.value !== '') {
                    var cookieTypeDescription = '';
                    if (field.description !== false) {
                        cookieTypeDescription = ' title="' + field.description + '"';
                    }
                    cookieTypes += '<li><input type="checkbox" id="gdpr-cookietype-' + field.value + '" name="gdpr[]" value="' + field.value + '" data-auto="on"> <label for="gdpr-cookietype-' + field.value + '"' + cookieTypeDescription + '>' + field.type + '</label></li>';
                }
            });

            // Display cookie message on page
            var cookieMessage = '<div id="gdpr-cookie-message"><h4>' + 
            settings.title + '</h4><p>' + settings.message + ' <a href="' + settings.link + '">' + settings.moreInfoLabel + 
            '</a><div id="gdpr-cookie-types" style="display:none;"><h5>' + settings.cookieTypesTitle + '</h5><ul>' + cookieTypes + 
            '</ul></div><p>' + 
            '<button id="gdpr-cookie-advanced" type="button">' + settings.advancedBtnLabel + '</button>' + 
            '<button id="gdpr-cookie-accept" type="button">' + settings.acceptBtnLabel + '</button>' + 
            '</p></div>';
            
            setTimeout(function(){
                $($element).append(cookieMessage);
                $('#gdpr-cookie-message').hide().fadeIn('slow');
            }, settings.delay);

            // When accept button is clicked drop cookie
            $('body').on('click','#gdpr-cookie-accept', function(){
                // Set cookie
                dropCookie(true, settings.expires);

                if(!myCookiePrefs){
                    // If 'data-auto' is set to ON, tick all checkboxes because
                    // the user hasn't clicked the customise cookies button
                    $('input[name="gdpr[]"][data-auto="on"]').prop('checked', true);
                } else {
                    $('input[name="gdpr[]"][data-auto="on"]').prop('checked', false);

                if( $('#gdpr-cookietype-marketing').data('auto') == 'on' ){
                    if ($.fn.ihavecookies.preference('marketing') === true) {
                        $('#gdpr-cookietype-marketing').prop('checked', true);
                    }
                }
                if( $('#gdpr-cookietype-preferences').data('auto') == 'on' ){
                    if ($.fn.ihavecookies.preference('preferences') === true) {
                        $('#gdpr-cookietype-preferences').prop('checked', true);
                    }
                }
                if( $('#gdpr-cookietype-analytics').data('auto') == 'on' ){
                    if ($.fn.ihavecookies.preference('analytics') === true) {
                        $('#gdpr-cookietype-analytics').prop('checked', true);
                    }
                }
                }

                // Save users cookie preferences (in a cookie!)
                var prefs = [];
                $.each($('input[name="gdpr[]"]').serializeArray(), function(i, field){
                    prefs.push(field.value);
                });
                setCookie('cookieControlPrefs', JSON.stringify(prefs), 365);

                // Run callback function
                settings.onAccept.call(this);
            });

            // Toggle advanced cookie options
            $('body').on('click', '#gdpr-cookie-advanced', function(){
                // Uncheck all checkboxes except for the disabled 'necessary'
                // one and set 'data-auto' to OFF for all. The user can now
                // select the cookies they want to accept.
                $('input[name="gdpr[]"]:not(:disabled)').attr('data-auto', 'off').prop('checked', false);

                if ($.fn.ihavecookies.preference('marketing') === true) {
                    $('#gdpr-cookietype-marketing').prop('checked', true);
                }
                if ($.fn.ihavecookies.preference('preferences') === true) {
                    $('#gdpr-cookietype-preferences').prop('checked', true);
                }
                if ($.fn.ihavecookies.preference('analytics') === true) {
                    $('#gdpr-cookietype-analytics').prop('checked', true);
                }

                $('#gdpr-cookie-types').slideDown('fast', function(){
                    $('#gdpr-cookie-advanced').prop('disabled', true);
                });
            });

        } else {
            var cookieVal = true;
            if (myCookie == 'false') {
                cookieVal = false;
            }
            dropCookie(cookieVal, settings.expires);
        }

        // Uncheck any checkboxes on page load
        if (settings.uncheckBoxes === true) {
            $('input[type="checkbox"].ihavecookies').prop('checked', false);
        }

    };

    // Method to get cookie value
    $.fn.ihavecookies.cookie = function() {
        var preferences = getCookie('cookieControlPrefs');
        return JSON.parse(preferences);
    };

    // Method to check if user cookie preference exists
    $.fn.ihavecookies.preference = function(cookieTypeValue) {
        var control = getCookie('cookieControl');
        var preferences = getCookie('cookieControlPrefs');
        preferences = JSON.parse(preferences);
        if (control === false) {
            return false;
        }
        if (preferences === false || preferences.indexOf(cookieTypeValue) === -1) {
            return false;
        }
        return true;
    };

    /*
    |--------------------------------------------------------------------------
    | Drop Cookie
    |--------------------------------------------------------------------------
    |
    | Function to drop the cookie with a boolean value of true.
    |
    */
    var dropCookie = function(value, expiryDays) {
        setCookie('cookieControl', value, expiryDays);
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
