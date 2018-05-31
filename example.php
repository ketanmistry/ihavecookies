<?php
session_start();
?><html>
<head>
    <meta charset="UTF-8">
    <title>I have &#x1F36A;s</title>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <script type="text/javascript" src="jquery.ihavecookies.js"></script>
    <script type="text/javascript">
    $(document).ready(function() {
        $('body').ihavecookies({
            forceDisplayPanel: true
        });
        if ($.fn.ihavecookies.preference('marketing') === true) {
            console.log('This should run because marketing is accepted.');
        }
        if ($.fn.ihavecookies.preference('analytics') === true) {
            console.log('This should run because analytics is accepted.');
        }
        $('.gdpr-cookie-preferences').on('click',function(){
            if( $('#gdpr-cookie-message').length == 0 ){
                $('body').ihavecookies({
                    forceDisplayPanel: true,
                    delay: 0
                });
            }
        });

    });
    </script>
    <link href="https://fonts.googleapis.com/css?family=Roboto+Slab|Quicksand:400,500" rel="stylesheet">
    <style type="text/css">
    :root {
        --purple: #3B3646;
        --red: #EE4B5A;
        --green: #2ECC40;
        --blue: #0074D9;
        --black: #000000;
        --orange: #FF851B;
    }
    #gdpr-cookie-message h1, #gdpr-cookie-message h2, #gdpr-cookie-message h3, #gdpr-cookie-message h4, #gdpr-cookie-message h5  {
        padding: 0;
        margin: 0;
        border: none;
    }

    /* Cookie Dialog */
    #gdpr-cookie-message {
        position: fixed;
        right: 30px;
        bottom: 30px;
        max-width: 375px;
        background-color: var(--purple);
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 6px 6px rgba(0,0,0,0.25);
        margin-left: 30px;
        font-family: system-ui;
    }
    #gdpr-cookie-message h4 {
        color: var(--orange);
        font-family: 'Quicksand', sans-serif;
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 10px;
    }
    #gdpr-cookie-message h5 {
        color: var(--orange);
        font-family: 'Quicksand', sans-serif;
        font-size: 15px;
        font-weight: 500;
        margin-bottom: 10px;
    }
    #gdpr-cookie-message p, #gdpr-cookie-message ul {
        color: white;
        font-size: 15px;
        line-height: 1.5em;
    }
    #gdpr-cookie-message p:last-child {
        margin-bottom: 0;
        text-align: right;
    }
    #gdpr-cookie-message li {
        width: 49%;
        display: inline-block;
    }
    #gdpr-cookie-message a {
        color: var(--orange);
        text-decoration: none;
        font-size: 15px;
        padding-bottom: 2px;
        border-bottom: 1px dotted rgba(255,255,255,0.75);
        transition: all 0.3s ease-in;
    }
    #gdpr-cookie-message a:hover {
        color: white;
        border-bottom-color: var(--orange);
        transition: all 0.3s ease-in;
    }
    #gdpr-cookie-message button {
        border: none;
        background: var(--red);
        color: white;
        font-family: 'Quicksand', sans-serif;
        font-size: 15px;
        padding: 7px;
        border-radius: 3px;
        margin-left: 15px;
        cursor: pointer;
        transition: all 0.3s ease-in;
    }
    #gdpr-cookie-message button:hover {
        background: white;
        color: var(--red);
        transition: all 0.3s ease-in;
    }
    button#gdpr-cookie-advanced {
        background: white;
        color: var(--red);
    }   
    #gdpr-cookie-message button:disabled {
        opacity: 0.3;
    }
    #gdpr-cookie-message input[type="checkbox"] {
        float: none;
        margin-top: 0;
        margin-right: 5px;
    }
    #gdpr-cookie-message button {
        background: var(--blue);
        color: white;
    }
    #gdpr-cookie-message button:hover {
        background: var(--green);
        color: var(--black);
        transition: all 0.3s ease-in;
    }
    button#gdpr-cookie-advanced {
        color: #fff;
        border-color: var(--blue);

        display: inline-block;
        outline: none;
        text-align: center;
        text-decoration: none;
        font-family: inherit;
        font-weight: 300;
        letter-spacing: 1px;
        vertical-align: middle;
        border: 1px solid;
        transition: all 0.2s ease;
        box-sizing: border-box;
        text-shadow: 0 1px 0 rgba(0,0,0,0.01);
    }
    button#gdpr-cookie-advanced:hover {
        background: var(--orange);
        color: #000;
        border-color: var(--orange);
    }
    button#gdpr-cookie-advanced {
        padding: 2px 7px 2px 7px;
        font-size: 0.75em;
        background:#3B3646;
        border: 1px solid rgba(255, 255, 255, .1);
    }



    </style>
</head>
<body>
    <div class="container">
        <h1>ihavecookies jQuery Plugin in action</h1>
        <p>When you load this page you will see an example of the cookie message popup in the bottom right corner.</p>
        <p>If you don't see it, clear your cookies or delete the cookie called <code>cookieControl</code>.</p>

        <h3>Checkboxes</h3>

        <p>With the recent EU regulations, visitors now must be able to opt-in to marketing, preferences, etc themselves. The plugin has an option that enables checkboxes to be unchecked automatically on page load.</p>

        <ul>
            <li><input type="checkbox" id="opt1" value="Y" checked> <label for="opt1">Checked by default &dash; remains checked</label>
            <li><input type="checkbox" id="opt2" value="Y"> <label for="opt2">Unchecked by default &dash; remains unchecked</label>
            <li><input type="checkbox" id="opt3" value="Y" class="ihavecookies" checked> <label for="opt3">Checked by default &dash; <em>ihavecookies</em> automatically unchecks this on page load because is has the class <code>ihavecookies</code> applied to it.</label>
        </ul>


        <button class="gdpr-cookie-preferences">Reopen settings</button>

    </div>



<?php

    echo '<div>';
    if(GDPR('analytics')){
        echo '<p>Analytics enabled</p>';
    }
    echo '</div>';


/**
 *  The three different cookie groups that can be used are:
 *  preferences, analytics, marketing
 */
function GDPR($type){

    // User has not yet given concent 
    if( !isset($_COOKIE['cookieControlPrefs']) )
        return true;

    // User has now given consent and we obey that
    $prefs = $_COOKIE['cookieControlPrefs'];
    if( strpos($prefs, $type) === false )
        return false;

    return true;
}

var_dump( $_COOKIE );

?>

</body>
</html>
