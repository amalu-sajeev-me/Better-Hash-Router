# Better-Hash-Router
#### A better routing using hashed anchor tags on your html pages.

### Example 
```javascript
// ES6
import { Hash } from "better-hash-router";

// CommonJS
const { Hash } = require("better-hash-router");
```


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
  * **path**: a String representing the hashed path without the #. 
     eg. if path is "#about" then remove the #. which is "about"
  * **data**: String | HTMLElement | Object
     data can be passed in as multiple formats. see the examples below.
     
   _Both Arguments are Mandatory._
 
 
- Here, data is Passed as a String

```javascript
myRouter.route("home", "text or html to be displayed");
```

- Here, data will be passed as an HTMLElement

```javascript
const aboutDiv = document.createElement("div");
aboutDiv.innerHTML = "Hey this is about me";

myRouter.route("about", aboutDiv);
```

- Here data will be passed as an Object.
  * { **template**: "absolute path to file", **selector**: "css selector" }
 
 _NOTE: Here the selector is optional._

```javascript
myRouter.route("contact", { 
 template: "/pages/contact.html", 
 selector: "#contact-form" 
});
```
****

#### Chaining route() methods
instance.route() can be chained since it returns the instance itself.

```javascript
const myRouter = Hash.router("navigation");
myRouter
.route("about", "this page shows info about me")
.route("contact", "my contact info")
.route("any_other_route", "some interesting stuff"); 

// goto yourdomain:port/#any_other_route to see the content
```
#### Manually open a page
instance.open() can be used to open a path manually.
- accepts an argument **Path** as a String

```javascript
const button = document.getElementById("contact-button");
button.addEventListener("click", event => {
myRouter.open("contact");
});
```
****
#### Events

1. "open" - fires when you open a page using instance.open(path).
2. "doneparsing" - fires when a intance.route(path, data) parse a template.

#### Event Handlers

1. addEventListener - instance.addEventListener("event", callback).
2. onPageLoad - instance.onPageLoad("path", callback).

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

## CONTRIBUTOR
[Amalu Sajeev](https:www.amalusajeev.me)

> Feel free to reach out to me..
