# jQuery Cookie Consent Plugin

A lightweight jQuery plugin that displays a cookie &#x1F36A; consent message as required by EU regulation. The plugin displays a message on the user's first visit to your website and, by default, again 30 days after their last visit.

The visitor __must__ click the accept button within the popup for the cookie to be set thus granting their consent (GDPR).

## Usage

Download the latest version and include it within your page along with jQuery (1.7.4 or later).

```html
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.x.x/jquery.min.js"></script>
<script type="text/javascript" src="jquery.ihavecookies.min.js"></script>
```

Then initialise the plugin using:

```javascript
// With the default options
$('body').ihavecookies();

// Or with customised options
var options = {
    title: ...
}
$('body').ihavecookies(options);
```

This will append the cookie popup to the `<body>` tag with the default settings and message.

### Options

There are a number of options available to help with customisation:

Option | Default Value | Description
------ | ------------- | -----------
title | "Cookies & Privacy" | A custom title for the popup
message | "Cookies enable you to use shopping carts and to personalize your experience on our sites, tell us which parts of our websites people have visited, help us measure the effectiveness of ads and web searches, and give us insights into user behavior so we can improve our communications and products." | Add your own cookie message here, if you prefer not to use the default one. HTML can be included within this message.
link | "/privacy-policy" | Link to your privacy policy for more information
delay | 2000 | Time before the popup is displayed after page load (in milliseconds)
expires | 30 | Days for the cookie to expire
onAccept | function(){} | Optional callback function when 'Accept' button is clicked
uncheckBoxes | false | Unchecks all checkboxes on page load that have class .ihavecookies applied to them. Set to true to turn this option on
moreInfoLabel | 'More information' | Label for link to privacy policy
acceptBtnLabel | 'Accept All Cookies' | Label for accept cookies button
advancedBtnLabel | 'Customise Cookies' | Label for customise cookies button
cookieTypesTitle | 'Select cookies to accept' | Title for customise cookies section
fixedCookieTypeLabel | 'Necessary' | Label for the "necessary" cookie type
fixedCookieTypeDesc | 'These are cookies that are essential for the website to work correctly.' | Description for the "necessary" cookie type
cookieTypes | Array | Array of cookie types for which to show checkboxes for - See code example below.

### Events

#### Reopening the message

Use `reinit` to reopen ihavecookies when clicking on an element. This opens the message with the previously selected checkboxes ticked.

```javascript
$('button').click(function(){
    $('body').ihavecookies(options, 'reinit');
});
```

### Example Code

The code below shows an example of the cookie types options.

```javascript
$('body').ihavecookies({
    // Optional callback function when 'Accept' button is clicked
    onAccept: function() {
        // Do whatever you need to here...
    },

    // Array of cookie types for which to show checkboxes.
    // - type: Type of cookie. This is also the label that is displayed.
    // - value: Value of the checkbox so it can be easily identified in
    //          your application.
    // - description: Description for this cookie type. Displayed in
    //                title attribute.
    cookieTypes: [
        {
            type: 'Site Preferences',
            value: 'preferences',
            description: 'These are cookies that are related to your site preferences, e.g. remembering your username, site colours, etc.'
        },
        {
            type: 'Analytics',
            value: 'analytics',
            description: 'Cookies related to site visits, browser types, etc.'
        },
        {
            type: 'Marketing',
            value: 'marketing',
            description: 'Cookies related to marketing, e.g. newsletters, social media, etc'
        }
    ],
});
```

### Methods

`$.fn.ihavecookies.cookie()` returns the value of the `cookieControlPrefs` cookie.

`$.fn.ihavecookies.preference(cookieTypeValue)` returns `true` if the the cookie type has been accepted, otherwise `false`.

### Styling

The plugin doesn't include any CSS so it can be styled to fit in with your websites look and feel. The cookie message has an ID of `#gdpr-cookie-message`. Sample CSS can be viewed in the accompanying `example.css` file.

### Cookie

When the visitor accepts the message, the cookie `cookieControl` with value `true` is set along with cookie `cookieControlPrefs` which contains an array of accepted cookie types e.g. `["preferences","analytics"]`. This will enable you to perform additional checks where necessary within your application (with regard to GDPR regulations).

## Example

An example of the cookie consent message can be viewed at https://iamketan.design or in the accompanying `example.html` file.

## Author
[Ketan Mistry](https://iamketan.design)

## License

This plugin is available under the MIT license.
