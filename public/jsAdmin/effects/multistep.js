// // MULTI STEP SIGNUP FORM
// const multistepForm = document.querySelector(".signup-form");
// const stepForms = Array.from(multistepForm.children);

// multistepForm.addEventListener("click", (e) => {
//   let currStep = parseInt(e.target.closest(".signup-step").dataset.step) - 1;

//   const inputs = Array.from(stepForms[currStep].querySelectorAll("input"));
//   const validity = inputs.every((input) => input.reportValidity());
//   if (validity) {
//     if (e.target.matches("[data-prev]")) {
//       currStep -= 1;
//     } else if (e.target.matches("[data-next]")) {
//       currStep += 1;
//     }
//     showCurrentForm(currStep);
//   }
// });

// multistepForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const completeNotification = document.querySelector(".signup-complete");
//   completeNotification.classList.add("active");
//   setTimeout(function () {
//     multistepForm.submit();
//   }, 2500);
// });

// function showCurrentForm(currStep) {
//   stepForms.forEach((step, index) => {
//     step.classList.toggle("active", index === currStep);
//   });
// }
// // ----------------------------
