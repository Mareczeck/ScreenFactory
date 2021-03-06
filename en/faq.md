# FAQ

**Q:How to print?**  
A: There is no support for preparing prints on the client. Common way
how to do it is to prepare the print on the server and then just display
link to it on the client. In theory it is as well possible to just use
the printing of html through css and media queries but that is not
suitable for all scenarios and it may be quite time-consuming to create
such css and adapt the page for both usages.

**Q: Why doesn't my application communicate with the server?**  
A: Check the browser developer console for errors and possibly check the
network tab to see more details. If there is an error mentioning server
not accepting requests from certain origin or from origin null, the
problem is probably CORS. It is a protection built in modern browsers
that do not allow requests for server in different domain unless server
explicitly supports it.

**Q: Is it possible to server the application over HTTPS?**  
A: Yes and it is even a recommended approach. But if application access
resources over both HTTP and HTTPS at the same time, some browsers may
block it.

**Q: How do I change a colour in component X?**  
A: At the moment this documentation does not cover how to write CSS for
our components. You may want to try to check existing CSS through the
browser tools and that way find out how to tweak the CSS your way.

**Q: Is it possible to debug the application step by step?**  
A: We are trying to generate the javascript as readable as possible and
that way to debug the javascript in the borwser. How to debug javascript
in given browser should be part of its documentation. In case of Chrome
you may use the extension for debugging knockout.js. But in general,
because of the declarative principle of the binding, the application
does not have simple and clear "beginning and the end".

**Q: How to colour a data row based on its state?**  
A: Use CSS class property and set it to as many states as there are
options. Bind the condition for each class to a computed property that
compares the state of the row with the row of given state. After that,
create appropriate css classes in some css resource you add to your
project.

**Q: How do I deploy the application to IIS with NTML security?**  
A: Application is built as static html/javascript/css files and as such
it may be deployed on any web server. NTML authentication happens on the
server. For the client to have access to it it has to ask the server
through some request (ideally in the same domain as the client). This
request will be authenticated and the server may return some login
information, user settings and whatever else makes sense in given
scenario. Be mindful that Internet Explorer authenticates with NTLM only
to Intranet zone or if the address does not contain any dots. Otherwise
it may be necessary to add it to that zone manually.

**Q: How to set the cache of files on the serer**  
A: It is important to set the files caching right otherwise it may
happen that the browser will not load the latest version if you update
it. If you build the application in RELEASE mode, there is a
filesToCache.txt file that lists all the files that may be cached
indefinitely as they have unique string in their name that will change
if the content changes. Files that are not on this list should not be
cached at all. The filesToCache.txt file itself should not be deployed
at all.

**Q: How to set the user rights?**  
A: ScreenFactory does not have a support for user rights in any way. You
may set it up on the application level. After authentication you can ask
the server for the roles of the user for example and based on that
change the behaviour of the application. In either case, do not depend
on these user rights too much, proper security check have to always be
on the server. After all, the client application is only html and
javascript and with a little knowledge it is possible to "hack" it in
the browser through developer console.

**Q: What is the relation between my data and JSON format?**  
A: JSON is a format in which the data is usually sent between the server
and the client and occasionally even stored on the client. There are
methods on data elements how to create the JSON from its value as well
as how to set its value from some JSON string.

**Q: Where do I find component X?**  
A: Some components are available internally and you find them in the
toolbox. If they are not there, check the [sffw](sffw.md) project that has
more than 50 more. If you don't find what are you looking for, you may
contact ScreenFactory developers to either recommend some substitution,
workaround or even get the new component created.

[HOME](1index.md)
