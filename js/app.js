

// timeline sphere
let tl = gsap.timeline({ repeat: 0 });
//  sphere descente verticalement sur a prospos
tl.fromTo(".sphere1", { x: 0, y: -88, ease: "none" }, { x: 0, y: -5, duration: 0.2, ease: "bounce" })
  // il parcourt horizontalement a prospos
  .fromTo(".sphere1", { x: 0, y: -5, ease: "none", rotation: 0 }, { x: 175, y: 0, duration: 0.2, rotation: 180 })
  //  sphere descente verticalement sur projet
  .fromTo(".sphere1", { x: 175, y: 0, ease: "none", rotation: 0 }, { x: 180, y: 40, duration: 0.1, rotation: 90 })
  // il parcourt horizontalement projet
  .fromTo(".sphere1", { x: 180, y: 40, ease: "none", rotation: 0 }, { x: 255, y: 40, duration: 0.2, rotation: 90 })
  //  sphere descente horizontale sur projet
  .fromTo(".sphere1", { x: 260, y: 40, ease: "none", rotation: 0 }, { x: 275, y: 45, duration: 0.1, rotation: 22.5 })
  // il descend sur contact
  .fromTo(".sphere1", { x: 280, y: 45, ease: "none", rotation: 0 }, { x: 280, y: 75, duration: 0.1, rotation: 90 })
  //sphere descente horizontale sur contact
  .fromTo(".sphere1", { x: 280, y: 75, ease: "none", rotation: 0 }, { x: 390, y: 75, duration: 0.2, rotation: 90 })
//sphere descente horizontale sur sphere
  .fromTo(".sphere1", { x: 390, y: 80, rotation: 0 }, { x: 390, y: 300, duration: 0.2, rotation: 90,ease: "bounce"})
  // mise au milieux
  .fromTo(".sphere1", { x: 390, y: 300, rotation: 0 }, { x: 600, y: 300, duration: 0.2, rotation: 300,ease: "none"})
  .to(".sphere1", { scale: 2, duration: 0.3, ease: "power2.inOut" });


// timeline propos
let tl2 = gsap.timeline({ repeat: 0 });
tl2.to(".propos", { x: 0, y: 35, duration: 0.3, ease: "bounce" })
  .to(".propos", { x: 0, y: 0, duration: 0.3, ease: "bounce", delay: 0.25 });

// timeline projet
let tl3 = gsap.timeline({ repeat: 0 });
tl3.to(".projet", { x: 0, y: 85, duration: 0.3, ease: "bounce", delay: 0.3 })
.to(".projet", { x: 0, y: 0, duration: 0.1, ease: "bounce", delay: 0.3 });

// timeline contact
let tl4 = gsap.timeline({ repeat: 0 });
tl4.to(".contact", { x: 0, y: 115, duration: 0.3, ease: "bounce", delay: 0.6 })
.to(".contact", { x: 0, y: 0, duration: 0.1, ease: "bounce", delay: 0.4 });
