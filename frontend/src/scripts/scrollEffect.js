export function applyScrollEffect() {
  // window.addEventListener('scroll', handleScroll);

  // function handleScroll() {
  //   const scrollTop = window.scrollY;
  //   const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

  //   // Calculate scroll progress (0 to 1)
  //   const scrollFraction = Math.min(scrollTop / scrollHeight, 1);

  //   // Define the color range for the effect
  //   const baseOrange = 100;   // Minimum brightness
  //   const maxOrange = 255;    // Maximum brightness

  //   // Interpolate the orange intensity based on scroll position
  //   const orangeIntensity = baseOrange + scrollFraction * (maxOrange - baseOrange);

  //   // Apply the gradient background with dynamic orange
  //   document.body.style.background = `linear-gradient(to bottom, rgb(18, 18, 18), rgb(${orangeIntensity}, ${Math.floor(orangeIntensity * 0.6)}, 18))`;
  // }

  // return () => window.removeEventListener('scroll', handleScroll);
}
