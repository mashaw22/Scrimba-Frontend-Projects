fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        console.log(data.urls.regular)
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        document.getElementById("author").textContent = `By: ${data.user.name}` 
    })
    .catch(err => {
        console.log("Something went wrong!") 
        document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1416230789844-1998de481fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDY0ODQ1NzI&ixlib=rb-1.2.1&q=80&w=1080")`
        document.getElementById("author").textContent = `By: Anisur Rahman`
        // This is where I can handle the error
        // Choose to use a default background image
    })

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong.")
        }
        return res.json()})
    .then(data => {
        console.log(data.name)
        console.log(data.image.small) 
        console.log(data.market_data.current_price.usd)
        document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name} ${data.market_data.current_price.usd}</span>`
        document.getElementById("crypto").innerHTML += `
            <p>🎯  $${data.market_data.current_price.usd}</p>
            <p>🔼  $${data.market_data.high_24h.usd}</p>
            <p>🔽  $${data.market_data.low_24h.usd}</p>
        `
    })
    .catch(err => console.error(err))

function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}
    
setInterval(getCurrentTime, 1000)

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if(!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src="${iconUrl}"/>
                <p class="weather-temp">${Math.round(data.main.temp)}°F</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
})

