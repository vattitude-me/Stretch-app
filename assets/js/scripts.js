/*!
 * Stretch App - V1.0 (Developed by https://www.vattitude.me)
 * Copyright 2021 Stretch App - Vattitude
 * Licensed under MIT (https://github.com/vatsakrish/Stretch-app/blob/main/LICENSE)
 */
//
// Scripts
// 


// Global variables
var defaultimer = 3;
var defaulNotif = "Stand-up and shake a bit";
var nIntervId;

$(document).ready(function() {

    //Start the clock and keep incrementing
    clockUpdate();
    setInterval(clockUpdate, 999);

    //Default values
    $("#timerupdate").val(defaultimer);
    $("#Notiftext").val(defaulNotif);

    //Check notification feature
    checkNotify();

    //Test Notification
    $('#testNotif').click(function() {
        defaulNotif = $('#Notiftext').val();
        notifyMe();
    });

    //Start the main notification
    startNotif()

    //Update the Feq 
    $('#savefreq').click(function() {
        defaultimer = $('#timerupdate').val();
        $("#nextrem").text(defaultimer);
        startNotif();
    });

    $('#togglereminder').click(function() {
        tglRem = $("#togglereminder").text();
        if (tglRem == "Stop Reminder") {
            stopNotif();
        } else {
            startNotif();
        }

    });

});

//Main notification
function startNotif() {
    $(".running").show();
    $(".stopped").hide();
    $("#togglereminder").text("Stop Reminder");

    intervalLoop = defaultimer * 60 * 1000
    $("#nextrem").text(defaultimer);
    clearInterval(nIntervId);
    nIntervId = setInterval(beginStrEvent, intervalLoop);
}

function stopNotif() {
    clearInterval(nIntervId);
    $(".running").hide();
    $(".stopped").show();
    $("#togglereminder").text("Start Reminder");
}

function beginStrEvent() {
    console.log("Event beginStrEvent triggered")
    notifyMe();
}

function notifyMe() {
    if (Notification.permission === "granted") {
        var notification = new Notification(defaulNotif, {
            icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
            body: 'Hey there! You\'ve been notified!',
        });
        $.playSound('../assets/audio/positive-1.wav');
    }
    setTimeout(function() {
        notification.close()
    }, 4000);
}


function checkNotify() {


    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check if the user is okay to get some notification
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification("Sample Pop-up - Stand-up and shake a bit");
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function(permission) {

            // Whatever the user answers, we make sure we store the information
            if (!('permission' in Notification)) {
                Notification.permission = permission;
            }

            // If the user is okay, let's create a notification
            if (permission === "granted") {
                var notification = new Notification("Sample Pop-up - Stand-up and shake a bit");
            }
        });
    } else {
        alert(`Permission to notify is ${Notification.permission}`);
    }

}


//Function to play audio notification
(function($) {
    $.extend({
        playSound: function() {
            return $(
                '<audio class="sound-player" autoplay="autoplay" style="display:none;">' +
                '<source src="' + arguments[0] + '" />' +
                '<embed src="' + arguments[0] + '" hidden="true" autostart="true" loop="false"/>' +
                '</audio>'
            ).appendTo('body');
        },
        stopSound: function() {
            $(".sound-player").remove();
        }
    });
})(jQuery);


/*!
 * Start Bootstrap - Creative v7.0.4 (https://startbootstrap.com/theme/creative)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
 */
window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function() {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function(responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });


});



function clockUpdate() {
    var date = new Date();


    function addZero(x) {
        if (x < 10) {
            return x = '0' + x;
        } else {
            return x;
        }
    }

    function twelveHour(x) {
        if (x > 12) {
            return x = x - 12;
        } else if (x == 0) {
            return x = 12;
        } else {
            return x;
        }
    }

    var h = addZero(twelveHour(date.getHours()));
    var m = addZero(date.getMinutes());
    var s = addZero(date.getSeconds());

    $('.digital-clock').text(h + ':' + m + ':' + s)
}