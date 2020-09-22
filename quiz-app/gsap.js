const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

document
  .querySelector(".slider__container > button")
  .addEventListener("click", () => {
    console.log("fsdf");
    tl.to(".slider", { width: "0vw", duration: 1 });
    tl.to(".main__title", { zIndex: -1, duration: 0.5 });
    tl.fromTo("main", { width: "0vw" }, { width: "100vw", duration: 1 });
    tl.fromTo(
      ".quiz__container",
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      "-=1.5"
    );
  });
