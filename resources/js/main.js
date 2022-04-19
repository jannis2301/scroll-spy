//querySelector returns the first elem within the DOM that matches
//querySelectorAll returns a static (not live) NodeList representing a list of the DOMs elements that match the specified group of selectors.
let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  section.forEach(sec => {

    let top = window.scrollY; //returns the number of pixels that the document is currently scrolled vertically.
    console.log(`scrollY: ${top}`);
    let offset = sec.offsetTop - 150; //returns the distance of the outer border of the current element relative to the inner border of the top of the offsetParent, the closest positioned ancestor element
    console.log(`Offset top: ${offset}`);
    let height = sec.offsetHeight;
    console.log(`Offset height: ${height}`); //returns the height of an element, including vertical padding and borders, as an integer
    let id = sec.getAttribute('id'); //gets the value of an attribute of an element

    if (top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector(`header nav a[href*=${id}]`).classList.add('active');
        //[att*=val] Represents an element with the att attribute whose value contains at least one instance of the substring "val". If "val" is the empty string then the selector does not represent anything.
      });
    }
  });
}