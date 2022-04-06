# Better-Hash-Router
#### A better routing using hashed anchor tags on your html pages.

### Example 
```javascript
// ES6
import { Hash } from "better-hash-router";

// CommonJS
const { Hash } = require("better-hash-router");
```

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

```javascript
/* route method accepts 2 parameters. 
 * 1. path: a String representing the hashed path without the #. 
 *    eg. if path is "#about" then remove the #. which is "about"
 * 2. data: String | HTMLElement | Object
 *    data can be passed in as multiple formats. see the examples below.
 */
// Here, data is Passed as a String
myRouter.route("home", "text or html to be displayed");

// Here, data will be passed as an HTMLElement
const aboutDiv = document.createElement("div");
aboutDiv.innerHTML = "Hey this is about me";

myRouter.route("about", aboutDiv);

/* Here data will be passed as an Object.
 * { template: "absolute path to file", selector: "css selector" }
 * NOTE: Here the selector is optional.
 */

myRouter.route("contact", { template: "/pages/contact.html", selector: "#contact-form" });

```

