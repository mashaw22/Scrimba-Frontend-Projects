let postsArray = []
let form = document.getElementById("new-post")
const titleInput = document.getElementById("post-title")
const bodyInput = document.getElementById("post-body")

function renderPosts() {
    let html = ""
        for (let post of postsArray) {
            html += `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <hr />
            `
        }
        document.getElementById("blog-list").innerHTML = html
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(response => response.json())
    .then(data => {
        postsArray = data.slice(0, 5)
        renderPosts()
    })


form.addEventListener("submit", function(e) {
    e.preventDefault()
    const postTitle = titleInput.value
    const postBody = bodyInput.value
    const data = {
        title: postTitle,
        body: postBody
    }
    
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
        .then(response => response.json())
        .then(post => {
            postsArray.unshift(post)
            renderPosts()
            form.reset()
        })
})

