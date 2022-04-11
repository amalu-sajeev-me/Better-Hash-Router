// @ts-nocheck
// import { Hash } from "https://unpkg.com/better-hash-router@latest";
import { Hash } from "../dist/Hash.js";

Hash.initialize();

const myNavigation = new Hash("navigation");

myNavigation
  .route(
    "/",
    "hello world click <a href='#contact'>here</a> for the contact page"
  )
  .route("contact", {
    template: "examples/pages/contact.html",
    selector: "#contact",
  })
  .route(
    "me",
    "hello world click <a href='#contact'>here</a> for the contact page"
  );

// console.log(myNavigation.availableRoutes);
myNavigation.onPageLoad("contact", () => {
  console.log("helloooo");
});
myNavigation.addEventListener("unknown", (e) => {
  console.log(e.detail);
});
console.log(location.hash);
if (location.hash === "") {
  console.log("/" in myNavigation.availableRoutes);
}
// myNavigation.onReady("/", () => {
//   console.log("/" in myNavigation.availableRoutes);
// });
