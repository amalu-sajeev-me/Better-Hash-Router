# Better-Hash-Router
#### A better routing using hashed anchor tags on your html pages.

### Example 
```javascript
import { Hash } from "better-hash-router";

Hash.initialize();

const myRouter = Hash.router("name");

myRouter.route("home", "text or html to be displayed")
  .route("about", instanceof HTMLElement)
  .route("contact", {template: "/pages/contact.html"});

```
