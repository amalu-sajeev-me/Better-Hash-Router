# Better-Hash-Router
#### A better routing using hashed anchor tags on your html pages.

### Usage

include the script from CDN link on your HTML file's <head> tag

```html
<script src="https://unpkg.com/better-hash-router@latest" async></script>
```
or if you're using npm

```javascript
// ES6
import { Hash } from "better-hash-router";

// CommonJS
const { Hash } = require("better-hash-router");
```
 Note: The ``<body> </body>`` must be empty. all the content on each route will be parsed from your html template files or you can write it in your javascript file as well.

### How TO

1. First you have to initialize the library, else it'll remind you to doing so by throwing an error. 

```javascript
Hash.initialize();
```
2. Now you have to create a new Router instance.
```javascript
/* Legacy way
 * This returns a new router instance. 
 */
 
const myRouter = new Hash("router-name");

/* preferred way
 * This returns a Proxy to the router instance. 
 * (using the proxy may reduce the chances of errors.
 */ 
 
const myRouter = Hash.router("name");
```
3. Now you can add new Routes to your Router instance.

   route() method accepts 2 parameters. 
  * ``path``: a String representing the hashed path without the #. 
     eg. if path is "#about" then remove the #. which is "about"
  * ``data``: String | HTMLElement | Object
     data can be passed in as multiple formats. see the examples below.
  * ``route()`` method returns the router instance. therefore the method is chainable.
     
   _Both Arguments are Mandatory._
 
 > "/" path determines the root path. so the contents assigned to the "/" route will be displayed when you open your page.
 
 
- Here, data is Passed as a String

```javascript
// http://localhost/
myRouter.route("/", "this will be displayed on your root");
```

- Here, data will be passed as an HTMLElement

```javascript
const aboutDiv = document.createElement("div");
aboutDiv.innerHTML = "Hey this is about me";

// http://localhost/#about
myRouter.route("about", aboutDiv);
```

- Here data will be passed as an Object.
  * { **template**: "absolute path to file", **selector**: "css selector" }
 
 > assuming that you have an html file on ``/pages/contact.html`` and there is an element with id ``contact-form``
 
 _NOTE: Here the selector is optional._
 _if selector is not provided, then all the contents of the ``contact.html``'s body will be copied to the route._

```javascript
// http://localhost/#contact
myRouter.route("contact", { 
 template: "/pages/contact.html", 
 selector: "#contact-form" 
});
```
****

#### Chaining ``route()`` methods
``instance.route()`` can be chained since it returns the instance itself.

```javascript
const myRouter = Hash.router("navigation");
myRouter
.route("/", "this page shows info about me")
.route("contact", "my contact info")
.route("any_other_route", "some interesting stuff"); 

// goto yourdomain:port/#any_other_route to see the content
```
#### Manually open a page
 
``instance.open()`` can be used to open a path manually.
- accepts an argument ``Path`` as a String

```javascript
const button = document.getElementById("contact-button");
button.addEventListener("click", event => {
myRouter.open("contact");
});
```
****
#### Events

1. ``open`` - fires when you open a page using instance.open(path).
2. ``doneparsing`` - fires when a intance.route(path, data) parse a template.

#### Event Handlers

1. addEventListener - ``instance.addEventListener("event", callback)``.
2. onPageLoad - ``instance.onPageLoad("path", callback)``.

#### Instance Methods

```javascript
1. route(path, data)
2. open(path)
3. fetchTemplate({template, selector})
4. onPageLoad(path, callback)
5. addEventListener(event, callback)
```

#### Instance Properties

```javascript
1. availableRoutes (getter)
```
#### Static Methods

```javascript
1. initialize()
2. isRouteDefined(path)
3. close()
4. router(name)
```
#### Static Properties

```javascript
1. availableRouters
2. isInitialized
3. availableTemplates
```

****
 
 ### Examples

1. using a function as the ``data`` argument.
 > function must have a return statement of a ``String`` or an ``HTMLElement``
 
```javascript
Hash.initialize();

const navigationRouter = new Hash("navigation");

navigationRouter.route("/", () => {
  const tiles = ["skills", "projects", "about", "resume", "contact"];
  const wrapper = document.createElement("div");

  tiles.forEach(tile => {
    const link = document.createElement("a");
    a.innerHTML = tile;
    wrapper.append(link)
  });

  return wrapper;
});
```
2. using templates from a single html file.
 > _assuming that you have a ``template.html`` file in your root directory. and they have elements with appropriate id_
 
```javascript
Hash.initialize();
 
const myRouter = Hash.router("my router");

myRouter
 .route("/", {template: "/template.html", selector: "#home"})
 .route("about", {template: "/template.html", selector: "#about"})
 .route("contact", {template: "/template.html", selector: "#contact"});
```
 
### DOM Manipulation
> If you want to manipulate the content of your routes, please note that they don't exist at the ``window.onload`` event. because the routes and their contents are fetched and rendered after the ``onload`` event of window. so, instead of using ``window.onload``, you should use the ``onPageLoad`` eventListener on your router instance.
 
_assuming that you already have a ``contact`` route defined on your router_
 
 ```javascript
 myRouter.onPageLoad("contact", (event) => {
  console.log("contact page has loaded");
  // now you can Manipulate your DOM elements her...
 });
 ```
 
 
 
## CONTRIBUTOR
[Amalu Sajeev](https://www.amalusajeev.me)

> Feel free to reach out to me..
