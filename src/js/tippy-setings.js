/*
tippy('.myButton', { 
    content: 'Универсальный плагин всплывающих подсказок',
});

tippy('.myButton2', { 
    content: 'Текст прилипала',
    arrow: true,
    placement: 'top',
    delay: 5,
    distance: 15,
    maxWidth: 300, 
    followCursor: true,
    allowHTML: true,
    theme: 'custom',
    ignoreAttributes: true,
});

tippy('.myButton3', { 
    content: 'Текст по клику',
    trigger: 'click',
});

tippy('.myButton4', { 
    content(reference) { 
        const title = reference.getAttribute('title');
        reference.removeAttribute('title');
        return title;
    },
});

tippy('.myButton5', { 
        touchHold: true,
        hideOnClick: false,
        interactive: true,
        placement: 'left',
        distance: 20,
        arrow: true,
        animateFill: false,
        animation: 'shift-away',

});

tippy('.myButton6', { 
    followCursor: true,
    arrow: true,
    placement: 'right',
    content(reference) { 
        const title = reference.getAttribute('title');
        reference.removeAttribute('title');
        return title;
    },
});
*/


// tippy('.scene', { 
//     followCursor: true,
//     arrow: true,
//     placement: 'right',
//     content(reference) { 
//         const title = reference.getAttribute('title');
//         reference.removeAttribute('title');
//         return title;
//     },
// });




tippy('.show-img', { 
	touchHold: true,
	// hideOnClick: false,
	// interactive: true,
	
	// placement: 'left',
	// distance: 20,

	duration: 1000,
	// arrow: true,
	// animateFill: false,
	// animation: 'shift-away',


	// content: template.innerHTML,
	allowHTML: true,
	// hideOnClick: true,

	// content(reference) {
	//    const id = reference.getAttribute('data-template');
	//    const template = document.getElementById(id);
	//    return template.innerHTML;
	//  },
  // allowHTML: true,
});

tippy('.show-title', { 
    content(reference) { 
        const title = reference.getAttribute('title');
        reference.removeAttribute('title');
        return title;
    },
});

tippy('.pricing-button', { 
   // trigger: 'click',
   duration: 100,
   followCursor: 'horizontal',
   offset: [0, -10],
   // followCursor: true,

    position:'bottom',
    // animation:'scale',
    // arrow:'true',
    // theme:'light',
    interactive: true,
});

tippy('.btn-min');

// maxWidth: 350,
// inertia: true,

  tippy('.pricing-button2', {
    // trigger: 'click', // mouseenter, click, focus; manual.
    // placement: 'bottom-end',
    // arrow: true,
    arrowType: 'round',
    animation: 'scale',
    duration: [250, 200],
    theme: 'light-border', // requires CSS resource to work
    // interactive: true,

    // showOnInit: true // to ease styling
  });
