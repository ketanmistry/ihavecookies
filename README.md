# jQuery Cookie Consent Plugin (WIP)

A lightweight jQuery plugin that displays a cookie &#x1F36A; consent message as required by EU regulation. The plugin displays a message on the user's first visit to your website and, by default, again 30 days after their last visit.

The visitor __must__ click the accept button within the popup for the cookie to be set thus granting their consent (GDPR).

## Usage

Download the latest version and include it within your page along with jQuery (1.7.4 or later).

```
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.x.x/jquery.min.js"></script>
<script type="text/javascript" src="jquery.ihavecookies.min.js"></script>
```

Then initialise the plugin using:

```
$('body').ihavecookies();
```

This will append the cookie popup to the `<body>` tag with the default settings and message.

### Settings

There are a number of options available to help with customisation:

```
$('body').ihavecookies({
    // A custom title for the popup
    title: "Cookies & Privacy",

    // Add your own cookie message here, if you prefer not to use the
    // default one. HTML can be included within this message.
    message: "Cookies enable you to use shopping carts and to personalize
              your experience on our sites, tell us which parts of our
              websites people have visited, help us measure the effectiveness
              of ads and web searches, and give us insights into user
              behavior so we can improve our communications and products.",

    // Link to your privacy policy for more information
    link: "/privacy-policy",

    // Time before the popup is displayed after page load (in milliseconds)
    delay: 2000,

    // Days for the cookie to expire
    expires: 30,

    // Optional callback function when 'Accept' button is clicked
    onAccept: function() {
        // Do whatever you need to here...
    },

    // Unchecks all checkboxes on page load that have class .ihavecookies
    // applied to them. Set to true to turn this option on
    uncheckBoxes: false,

    // Set labels for links and buttons
    moreInfoLabel: 'More information',
    acceptBtnLabel: 'Accept'

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

The plugin doesn't include any CSS so it can be styled to fit in with your websites look and feel. The cookie message has an ID of `#gdpr-cookie-message`.

### Cookie

When the visitor accepts the message, the cookie `cookieControl` with value `true` is set, or `false` if it's rejected. This will enable you to perform additional checks where necessary within your application (with regard to GDPR regulations).

## Example

An example of the cookie consent message can be viewed at https://iamketan.com.au.

## Author
[Ketan Mistry](https://iamketan.com.au) ([@ketanumistry](https://twitter.com/ketanumistry))

## License

This plugin is available under the MIT license.
