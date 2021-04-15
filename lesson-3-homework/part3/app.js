const feedbox = document.getElementsByClassName("feed-box")[0]

window.onscroll = function() {
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        loadFeed()
    }
}

function loadFeed() {
    let url = "http://127.0.0.1:12345"

    let request = new XMLHttpRequest()
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            let json = JSON.parse(request.responseText)
            console.log(json)
            buildFeed(json.data)
        }
    }
    request.open("GET", url, true)
    request.send()
}

loadFeed()

function buildFeed(data) {
    for (let v of data) {
        console.log(v)
        if (v["single_mode"]) {
            feedbox.appendChild(buildSingleMode(v))
        }
    }
}

function buildSingleMode(data) {
    let singleBox = document.createElement("div")
    singleBox.className = "single-mode"

    let singleBoxL = document.createElement("div")
    singleBoxL.className = "single-mode-lbox"
    singleBoxL.appendChild(buildImg("http:" + data.image_url))

    let singleBoxR = document.createElement("div")
    singleBoxR.className = "single-mode-rbox"

    let singleBoxRI = document.createElement("div")
    singleBoxRI.className = "single-mode-rbox-inner"

    singleBoxRI.appendChild(buildTitle(data.title, "toutiao.com"+data.source_url))
    singleBoxRI.appendChild(buildFooter(data.source, data.comments_count))
    singleBoxR.appendChild(singleBoxRI)
    singleBox.appendChild(singleBoxL)
    singleBox.appendChild(singleBoxR)


    return singleBox
}

function buildImg(url) {
    let a = document.createElement("a")
    a.className = "img-wrap"
    let img = document.createElement("img")
    img.className = "lazy-load-img"
    img.src = url
    a.appendChild(img)
    return a
}

function buildTitle(str, href) {
    let title = document.createElement("div")
    title.className = "title-box"

    let a = document.createElement("a")
    a.className = "link"
    a.href = href
    a.textContent = str

    title.appendChild(a)
    return title
}

function buildFooter(source_media, comments_count) {
    let footer = document.createElement("div")
    footer.className = "footer-bar"

    let l = document.createElement("div")
    l.className = "footer-bar-left"

    let source = document.createElement("a")
    source.className = "footer-bar-action source"
    source.textContent = source_media

    let comment = document.createElement("a")
    comment.className = "footer-bar-action source"
    comment.textContent = " ⋅ " + comments_count + "comments"

    let tim = document.createElement("span")
    tim.className = "footer-bar-action time"
    tim.textContent = " ⋅ 56 years later"

    l.appendChild(source)
    l.appendChild(comment)
    l.appendChild(tim)
    footer.appendChild(l)

    return footer
}