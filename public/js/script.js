(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })();

  document.addEventListener("DOMContentLoaded", () => {
  const filters = document.querySelectorAll(".filter");
  const filtersContainer = document.getElementById("filters");
  const params = new URLSearchParams(window.location.search);
  let currentCategory = params.get("category") || "all";

  filters.forEach((filter) => {
    if (filter.dataset.category.toLowerCase() === currentCategory.toLowerCase()) {
      filter.classList.add("active");

      const filterRect = filter.getBoundingClientRect();
      const containerRect = filtersContainer.getBoundingClientRect();

      if (
        filterRect.left < containerRect.left ||
        filterRect.right > containerRect.right
      ) {
        filter.scrollIntoView({
          inline: "center",
          block: "nearest"
        });
      }

    } else {
      filter.classList.remove("active");
    }
  });
});



  // Tax toggle logic
  let taxSwitch = document.getElementById("flexSwitchCheckDefault");
  taxSwitch.addEventListener("click", () => {
    let taxInfo = document.getElementsByClassName("tax-info");
    for (let info of taxInfo) {
      info.style.display = info.style.display !== "inline" ? "inline" : "none";
    }
  });

  // Scroll hints
  const scrollRight = document.getElementById("scroll-hint");
  const scrollLeft = document.getElementById("scroll-hint-left");
  const filtersContainer = document.getElementById("filters");

  const scrollByItems = (direction = "right") => {
    const filterItems = document.querySelectorAll(".filter");
    if (filterItems.length === 0) return;

    const itemWidth = filterItems[0].offsetWidth + parseFloat(getComputedStyle(filterItems[0]).marginRight);
    const scrollDistance = itemWidth * 4;

    filtersContainer.scrollBy({
      left: direction === "right" ? scrollDistance : -scrollDistance,
      behavior: "smooth"
    });
  };

  scrollRight.addEventListener("click", () => scrollByItems("right"));
  scrollLeft.addEventListener("click", () => scrollByItems("left"));

  function updateScrollHintVisibility() {
    const scrollLeftVal = filtersContainer.scrollLeft;
    const maxScrollLeft = filtersContainer.scrollWidth - filtersContainer.clientWidth;

    // Show/hide right arrow
    if (scrollLeftVal >= maxScrollLeft - 5 || maxScrollLeft <= 0) {
      scrollRight.style.display = "none";
    } else {
      scrollRight.style.display = "block";
    }

    // Show/hide left arrow
    if (scrollLeftVal <= 5) {
      scrollLeft.style.display = "none";
    } else {
      scrollLeft.style.display = "block";
    }
  }

  filtersContainer.addEventListener("scroll", updateScrollHintVisibility);
  window.addEventListener("load", updateScrollHintVisibility);
  window.addEventListener("resize", updateScrollHintVisibility);