# Better-Hash-Router
### A better routing using hashed anchor tags on your html pages.

#### Usage

include the script from CDN [https://unpkg.com/better-hash-router@latest](https://unpkg.com/better-hash-router@latest)

**index.html**
```html
<script src="./script.js" type="module"></script>
```
**script.js**
```javascript
import { Hash } from "https://unpkg.com/better-hash-router@latest";
```
> see HTML example on Github [here](https://github.com/amalu-sajeev-me/Better-Hash-Router/tree/main/examples)

or if you're using npm

**Install** ``npm i better-hash-router``
```javascript
// ES6
import { Hash } from "better-hash-router";

// CommonJS
const { Hash } = require("better-hash-router");
```
> Note: The ``<body> </body>`` must be empty. all the content on each route will be parsed and injected to the ``<body></body>`` at runtime.

### How TO

1. First you have to initialize the library, else it'll remind you to doing so by throwing an error. 

```javascript
Hash.initialize();
```
2. Now you have to create a new instance of ``Hash``
```javascript
const myRouter = new Hash("router-name");
```

3. Now you can add new Routes to your Router instance.

   ``route()`` method accepts 2 parameters. 
  * ``path``: a String representing the hashed path without the ``#``. 
     eg. if path is ``"#about"`` then remove the ``#``. which is ``"about"``
  * ``data``: ``String | HTMLElement | Object | Function``
     data can be passed in as multiple formats. see the examples below.
  * ``route()`` method returns the router instance. therefore the method is chainable.
     
   _Both Arguments are Mandatory._
 
 > ``"/"`` path determines the root path, which is your default path. so the contents assigned to the ``"/"`` route will be displayed when you open your page. 
 
##### Adding new routes
- ``data: string``

```javascript
Hash.initialize();
const myRouter = new Hash("router-name");
myRouter.route("/", "this will be displayed on your root");
```

- ``data: HTMLElement``

```javascript
Hash.initialize();
const myRouter = new Hash("router-name");

const aboutDiv = document.createElement("div");
aboutDiv.innerHTML = "Hey this is about me";

myRouter.route("about", aboutDiv);
```

- ``data: { template, selector }``
  * ``{ 
    template: "absolute path to file", 
    selector: "css selector" 
    }``
 
 > assuming that you have an html file on ``/pages/contact.html`` and there is an element with id ``contact-form``
 
 _NOTE: Here the ``selector`` is optional._
 _if ``selector`` is not provided, then all the contents of the ``contact.html``'s body will be copied to the route._

```javascript
Hash.initialize();
const myRouter = new Hash("router-name");
myRouter.route("contact", { 
 template: "/pages/contact.html", 
 selector: "#contact-form" 
});
```
``data: Function``
```javascript
Hash.initialize();
const myRouter = new Hash("router-name");
myRouter.route("/", () => {
 return "this data comes from a function";
});
```
****

#### Chaining ``route()`` methods
``instance.route()`` can be chained since it returns the instance itself.

```javascript
Hash.initialize();
const myRouter = new Hash("router-name");
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

```javascript
Hash.EVENTS // all supported events can be accessed via this static property.
```

1. ``open`` - fires when you open a page using instance.open(path).
2. ``doneparsing`` - fires when a intance.route(path, data) parse a template.
3. ``close`` - fires when the ``close()`` method is called. 
4. ``error`` - fires when a parsing error occures on a route.

#### Event Handlers

1. ``addEventListener(event, callback)`` 
```javascript
myRouter.addEventListener("open",function (event){
 // your code goes here..
});
```
3. ``onPageLoad(path, callback)``
```javascript
myRouter.onPageLoad("/", function (event) {
 // your code goes here..
});
```
4. ``onReady(path, callback)``
```javascript
myRouter.onReady("/", function (event) {
 your code goes here..
});
```
5. ``onError(callback)``
```javascript
myRouter.onError(function(){
 // your code goes here..
});
```

#### Instance Methods

```javascript
1. route(path, data)
2. open(path)
3. fetchTemplate({template, selector})
4. onPageLoad(path, callback)
5. onReady(path, callback)
6. onError(callback)
7. addEventListener(event, callback)
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
4. EVENTS
```

****
 
 ### Examples

1. using a ``function`` as the ``data`` argument.
 > function must have a ``return`` statement of a ``String`` or an ``HTMLElement``
 
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
