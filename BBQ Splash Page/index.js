let emailCollectorForm = document.getElementById("email-collector")
let ourMainContent = document.getElementById("main-content")

emailCollectorForm.addEventListener("submit", event => {
    event.preventDefault()
    
    let ourFormData = new FormData(event.target)
    let userFirstName = ourFormData.get("firstName")
        
    let updatedHTMLContent = `
    <h2>Congratulations, ${userFirstName}!</h2>

    <p>You're on your way to becoming a BBQ Master</p>

    <p class="fine-print">We'll never share your information without your permission.</p>
`
    ourMainContent.innerHTML = updatedHTMLContent
})