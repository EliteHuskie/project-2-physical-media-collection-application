//about us button
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

// Contact us submit response
$("#contactUsSubmit").unbind().bind('click', function () {
    $("#contactUsResponse").text("Thank you for your submission!");
    setTimeout(function(){
        $("#contactUsResponse").text("");
        $(".contact-us .btn-close").click();
    },2000)
})


