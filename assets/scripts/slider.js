document.addEventListener("DOMContentLoaded", () => {
    const marqueeContent = document.getElementById('marquee-content');
    const marqueeContainer = document.querySelector('.marquee-container');

    // Clone the content and append it
    const marqueeContentClone = marqueeContent.cloneNode(true);
    marqueeContent.appendChild(marqueeContentClone);

    // Calculate the width of the original content
    const marqueeContentWidth = marqueeContent.offsetWidth;

    // Set the animation duration based on the content width
    const scrollDuration = marqueeContentWidth / 100; // Adjust the divisor to control speed

    marqueeContent.style.animationDuration = `${scrollDuration}s`;
});
