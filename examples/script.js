import { Hash } from "../index.js";

Hash.initialize();

const myNavigation = Hash.router("navigation");

myNavigation
  .route(
    "/",
    "hello world click <a href='#contact'>here</a> for the contact page"
  )
  .route("contact", {
    template: "examples/pages/contact.html",
    selector: "#contact",
  });
