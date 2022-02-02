const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-URL");
const bookmakrsContainer = document.getElementById("bookmarks-container")

let bookmarks = [];

// show modal, focus on first input
function showModal() {
    modal.classList.add("show-modal");
    websiteNameEl.focus();
}

// event listeners for modal
modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", () => modal.classList.remove("show-modal"));
window.addEventListener("click", (e) => (e.target === modal ? modal.classList.remove("show-modal") : false ))
// validate form
function validate(nameValue, urlValue) {
const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g;
const regex = new RegExp(expression);

if (!nameValue || !urlValue) {
    alert("please submit values for all fields.");
    return false;
}

if (!urlValue.match(regex)) {
alert("please provide a valid web adress");
return false;
}
// Valid 
return true;
} 

//  to build bookmarks dom
function buildBookmarks() {
    // remove all bookmarks before loading
    bookmakrsContainer.textContent = ""

    // build items 
    bookmarks.forEach((bookmark) => {
        const { name, url} = bookmark;
        // Item div
        const item = document.createElement("div");
        item.classList.add("item");
        // close Icon
        const closeIcon = document.createElement("i");
        closeIcon.classList.add("fas", "fa-times");
        closeIcon.setAttribute("title", "Delete Boomark");
        closeIcon.setAttribute("onclick", `deleteBookmark("${url}")`);
        // Favicon/ link container
        const linkInfo = document.createElement("div");
        linkInfo.classList.add("name");
        // Favicon
        const favicon = document.createElement("img");
        favicon.setAttribute("src", `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        favicon.setAttribute("alt", "Favicon");
        // Link
        const link = document.createElement("a");
        link.setAttribute("href", `${url}`);
        link.setAttribute("target", "_blank");
        link.textContent = name;
        // append to book marks container
        linkInfo.append(favicon, link);
        item.append(closeIcon, linkInfo);
        bookmakrsContainer.appendChild(item);
        })
}

// fetch bookmarks
function fetchBookmarks() {
    // get bookmarks from local storage
    if (localStorage.getItem("bookmarks")) {
        bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
    } else {
        // create bookmark array in localstorage
        bookmarks = [
        {
            name: "Jacinto Desgin",
            url: "https://jacinto.desgin",
        },
        ];
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
    buildBookmarks();
}
//Delete bookmark

function deleteBookmark(url) {
    bookmarks.forEach((bookmark, i) => {
        if(bookmark.url === url) {
            bookmarks.splice(i, 1);

        }
    })
    // update bookmarks array in local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarks()
}



// handle data from form
function storebookmark(e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if (!urlValue.includes('https://') && !urlValue.includes('http://')) {
     urlValue = `https://${urlValue}`;
} 
if (!validate(nameValue, urlValue)) {
    return false;
}
const bookmark = {
    name: nameValue,
    url: urlValue,
};
bookmarks.push(bookmark);
localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
fetchBookmarks();
bookmarkForm.reset();
websiteNameEl.focus();
}
bookmarkForm.addEventListener("submit", storebookmark);

// on load 
fetchBookmarks();