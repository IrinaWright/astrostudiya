const Helpers = {
  queryArray: function (e, t) {
    return (
      t || (t = document.body),
      Array.prototype.slice.call(t.querySelectorAll(e))
    );
  },
  ready: function (e) {
    document.readyState == "complete"
      ? e()
      : document.addEventListener("DOMContentLoaded", e);
  },
};


function NavDropdown(element) {
  const self = this;

  this.container = document.querySelector(element);
  this.root = this.container.querySelector(".main-menu__nav");
  this.isCompact = !1;

  this.container.classList.add("noDropdownTransition");

  this.dropdownBackground = this.container.querySelector(".main-menu__bg");
  this.dropdownContainer = this.container.querySelector(".main-menu__holder");
  this.dropdownArrow = this.container.querySelector(".main-menu__arrow");

  this.dropdownSections = Helpers.queryArray(
    ".main-menu__section",
    this.container
  ).map(function (element) {
    return {
      el: element,
      name: element.getAttribute("data-dropdown"),
      content: element.querySelector(".main-menu__content"),
    };
  });

  this.dropdownContainer.addEventListener("mouseenter", function (e) {
    self.stopCloseTimeout();
  });

  this.dropdownContainer.addEventListener("mouseleave", function (e) {
    self.startCloseTimeout();
  });

  this.dropdownRoots = Helpers.queryArray(".main-menu__item", this.root);

  // Add event listeners
  this.dropdownRoots.forEach(function (e, n) {
    e.addEventListener("mouseenter", function (n) {
      self.stopCloseTimeout();
      self.openDropdown(e);
    });

    e.addEventListener("mouseleave", function (e) {
      self.startCloseTimeout();
    });
  });
}

// Prototype an open function
NavDropdown.prototype.openDropdown = function (e) {
  const self = this;

  // if something is active return
  if (this.activeDropdown === e) return;

  this.container.classList.add("dropdownActive");
  this.activeDropdown = e;

  this.dropdownRoots.forEach(function (e, t) {
    e.classList.remove("active");
  });

  e.classList.add("active");

  // ---------------------------------------------------------------------------

  let data = e.getAttribute("data-dropdown"),
    direction = "left",
    offsetWidth,
    offsetHeight,
    content;

  this.dropdownSections.forEach(function (e) {
    e.el.classList.remove("active");
    e.el.classList.remove("left");
    e.el.classList.remove("right");

    e.name == data
      ? (e.el.classList.add("active"),
        (direction = "right"),
        (offsetWidth = e.content.offsetWidth),
        (offsetHeight = e.content.offsetHeight),
        (content = e.content))
      : e.el.classList.add(direction);
  });

  let width = offsetWidth / 520,
    height = offsetHeight / 400,
    offset = e.querySelector(".main-menu__link").getBoundingClientRect(),
    position = offset.left + offset.width / 2 - offsetWidth / 2,
    // adjustedHeight = content.children[0].offsetHeight / height,
    // console.log("adjustedHeight =>", adjustedHeight);
    placement = Math.round(offset.left + offset.width / 2);

  position = Math.round(Math.max(position, 10));

  clearTimeout(this.disableTransitionTimeout);

  this.enableTransitionTimeout = setTimeout(function () {
    self.container.classList.remove("noDropdownTransition");
  }, 50);

  this.dropdownBackground.style.transform =
    "translateX(" +
    position +
    "px) scaleX(" +
    width +
    ") scaleY(" +
    height +
    ")";

  this.dropdownContainer.style.transform = "translateX(" + position + "px)";
  this.dropdownContainer.style.width = offsetWidth + "px";
  this.dropdownContainer.style.height = offsetHeight + "px";

  this.dropdownArrow.style.transform =
    "translateX(" + placement + "px) rotate(45deg)";
};

NavDropdown.prototype.closeDropdown = function () {
  const self = this;

  if (!this.activeDropdown) return;

  this.dropdownSections.forEach(function (e) {
    e.el.classList.remove("active");
    e.el.classList.remove("left");
    e.el.classList.remove("right");
  });

  this.dropdownRoots.forEach(function (e, t) {
    e.classList.remove("active");
  });

  clearTimeout(this.enableTransitionTimeout);

  this.disableTransitionTimeout = setTimeout(function () {
    self.container.classList.add("noDropdownTransition");
  }, 50);

  this.container.classList.remove("dropdownActive");
  this.activeDropdown = undefined;

  this.dropdownBackground.removeAttribute("style");
  this.dropdownContainer.removeAttribute("style");
  this.dropdownArrow.removeAttribute("style");
};

NavDropdown.prototype.startCloseTimeout = function () {
  const self = this;

  this.closeDropdownTimeout = setTimeout(function () {
    self.closeDropdown();
  }, 50);
};

NavDropdown.prototype.stopCloseTimeout = function () {
  const self = this;

  clearTimeout(self.closeDropdownTimeout);
};

// Initialize on document ready
Helpers.ready(function () {
  new NavDropdown(".main-menu");
});

// ======================================

let lastScrollTop = 0;
const elem = document.querySelector(".main-menu");
const menuNav = document.querySelector(".main-menu__nav");
const menuLogo = document.querySelector(".main-menu__logo");

const logo = document.getElementById("logo");
window.onscroll = onScroll;

function onScroll(e) {
  var top = window.pageYOffset;

  if (lastScrollTop > top) {
    // elem.classList.remove("none");
    menuNav.classList.remove("none");
    // menuLogo.classList.remove("none");
    // logo.classList.remove("logo-min");
    // logo.style.transform = "scale(1)";
  } else if (lastScrollTop < top) {
    // elem.classList.add("none");
//======
    menuNav.classList.add("none");
//======
    // menuLogo.classList.add("none");
    if (!elem.classList.contains("mobile")) {
      menuLogo.classList.add("logo-transform");
    }
    // logo.classList.add("logo-transform");
    // elem.classList.add("back-ground");
  }

  lastScrollTop = top;
}

let menuLink = document.getElementsByClassName("main-menu__link");
// const arrowButton = document.querySelector(".arrow-button__hover");

 window.addEventListener('scroll', function() {

  if (!elem.classList.contains("mobile")) {
   if (pageYOffset < 100) {
	  menuLogo.classList.remove("logo-transform");
   }
  }

   if (pageYOffset < 120) {
    elem.classList.remove("background");
    for (let link of menuLink) {
      link.classList.remove("color");
    }
    // arrowButton.style.stroke = "#ffffff";
    menuNav.classList.remove("bgnav");
   } else {
    elem.classList.add("background");
    for (let link of menuLink) {
      link.classList.add("color");
    }
    // arrowButton.style.stroke = "#a6b4c3";
    menuNav.classList.add("bgnav");
   }
 });

// ==================================

(function() {

if(window.innerWidth < 670) {
  menuLogo.classList.add("logo-mobile");
  // menuNav.classList.add("bgnav");
}

  const html = document.querySelector("html");
  const dotsMenu = document.querySelector(".burger");
  const mainMenu = document.getElementById("main-menu");
  const mainNone = document.querySelector("main");
  const footerNone = document.querySelector("footer");
  
    const $mainMenuContainer = document.querySelector(".main-menu__container");
  $mainMenuContainer.addEventListener("click", () => {
    html.classList.remove("visible");
    dotsMenu.classList.remove("mobile");
    mainMenu.classList.remove("mobile");
    mainNone.classList.remove("display-none");
    footerNone.classList.remove("display-none");
    menuNav.classList.remove("bgnav-mobile");
  });
 
  
  dotsMenu.addEventListener("click", () => {
    html.classList.toggle("visible");
    dotsMenu.classList.toggle("mobile");
    mainMenu.classList.toggle("mobile");
    mainNone.classList.toggle("display-none");
    footerNone.classList.toggle("display-none");
    menuNav.classList.toggle("bgnav-mobile");
  });

}).call(this);
