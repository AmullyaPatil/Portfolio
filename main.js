const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
  };
  
  // header container
  ScrollReveal().reveal(".header_container img", {
    ...scrollRevealOption,
    origin: "right",
  });
  
  ScrollReveal().reveal(".header_container h1", {
    ...scrollRevealOption,
    delay: 500,
  });
  
  ScrollReveal().reveal(".header_container .btn", {
    ...scrollRevealOption,
    delay: 1000,
  });
  
  ScrollReveal().reveal(".header_container a", {
    ...scrollRevealOption,
    delay: 1500,
  });
  
  // service container
  ScrollReveal().reveal(".services_card", {
    ...scrollRevealOption,
    interval: 500,
  });
  
  // projects container
  ScrollReveal().reveal(".projects_card", {
    ...scrollRevealOption,
    interval: 500,
  });
  
  // banner container
  ScrollReveal().reveal(".banner_content", scrollRevealOption);
  
  // blogs container
  ScrollReveal().reveal(".blogs_card", {
    ...scrollRevealOption,
    interval: 500,
  });
  