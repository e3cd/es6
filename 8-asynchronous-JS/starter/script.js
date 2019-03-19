//setTimeout is in the web api which includes HTTP requests for AJAX GEOLOCATION LOCALSTORAGE ETC, it is in the javascript run time but not in the javascript engine.

//The timer will keep running for 2s asynchronously so that our code ca neep running without being blocked. When setimeout is called the timer is created together with the callback function. Web apis environment is where the timer will keep running and sits until it finsished asyncrounously. The callback function stays attached to the timer until settimeout pops off the execution stack.

// once 2s has elapsed the execution context of the callback function form setTimeout is passed onto the message que and waits to be executed. The event loop keeps track of any emtpy global execution contexts. if it is empty then the event loop moves the callback function onto the stack

////////////////////////////AJAX AND APIS///////////////////

/*
Asynchronous javascript and xml -- allows us to ascnhronously connect with remote servers.

api - a piece of software that allow applications to talk to each other 

-your own api, for data coming form your own servr
-3rd party apis
*/
