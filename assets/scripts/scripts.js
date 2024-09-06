// JavaScript for animating text
// document.addEventListener('DOMContentLoaded', function() {
//     const texts = [
//         document.getElementById('text-1'),
//         document.getElementById('text-2'),
//     ]; // Array of text elements to cycle through

//     let currentIndex = 0;

//     function changeText() {
//         texts[currentIndex].classList.remove('active'); // Fade out current text
//         currentIndex = (currentIndex + 1) % texts.length; // Move to next text
//         texts[currentIndex].classList.add('active'); // Fade in new text
//     }

//     setInterval(changeText, 2000); // Change text every 2 seconds
// });

$('#carousel1').owlCarousel({
    stagePadding: 50,
    autoWidth:false,
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3.5
        }
    }
})

$('#carousel2').owlCarousel({
    stagePadding: 50,
    autoWidth:false,
    loop:false,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3.5
        }
    }
})

document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector(".header");
    const firstSection = document.querySelector("#first-section");
    let lastScrollTop = 0;

    // Calculate the height of the first section
    const firstSectionHeight = firstSection.offsetHeight;

    window.addEventListener("scroll", function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > firstSectionHeight) {
            header.classList.add("sticky");

            if (scrollTop > lastScrollTop) {
                // Scrolling down
                header.classList.add("hidden");
            } else {
                // Scrolling up
                header.classList.remove("hidden");
            }
        } else {
            header.classList.remove("sticky");
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile or negative scrolling
    });
});

(function() {
    emailjs.init("your_user_id"); // Replace with your EmailJS user ID
})();