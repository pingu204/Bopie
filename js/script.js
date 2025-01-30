let cardContainer = document.getElementById("cardContainer")
let modalContainer = document.getElementById("modalContainer");

for (item of cards) {
    let card = document.createElement("div");
    card.className = item.new ? "col-sm-4 gallery-item new card" : "col-sm-4 gallery-item card";

    let cover = document.createElement("img");
    cover.src = item.cover;
    cover.className = "cover";
    if (item.images.length != 0) {
        cover.setAttribute("data-bs-toggle", "modal");
        cover.setAttribute("data-bs-target", "#" + item.modalID);
    }

    let caption = document.createElement("div");
    caption.className = "caption";

    card.appendChild(cover);
    card.appendChild(caption);

    let postDate = document.createElement("h6");
    postDate.innerText = item.date + ' ';
    if (item.date == "") {
        let ongoingBadge = document.createElement("span");
        ongoingBadge.innerText = "ONGOING";
        ongoingBadge.className = "badge ongoing";
        postDate.append(ongoingBadge)
    }
    if (item.new) {
        let newBadge = document.createElement("span");
        newBadge.innerText = "NEW";
        newBadge.className = "badge";
        postDate.appendChild(newBadge);
    }

    let postTitle = document.createElement("h3");
    postTitle.innerText = item.title;
    if (item.url) {
        let externalLink = document.createElement("a");
        externalLink.href = item.url;
        externalLink.target = "_blank";

        let icon = document.createElement("i");
        icon.className = "bi bi-youtube";
        externalLink.appendChild(icon);

        postTitle.innerText += ' ';
        postTitle.appendChild(externalLink);
    }

    let postDescription = document.createElement("p");
    postDescription.innerText = item.description;

    caption.appendChild(postDate);
    caption.appendChild(postTitle);
    caption.appendChild(postDescription);

    cardContainer.appendChild(card);

    if (item.images.length != 0) {
        let modal = document.createElement("div");
        modal.className = "modal fade";
        modal.id = item.modalID;

        let modalDialog = document.createElement("div");
        modalDialog.className = "modal-dialog";

        for (url of item.images) {
            let img = document.createElement("img");
            img.src = url;
            img.className = "modal-image";

            modalDialog.appendChild(img);
        }

        modal.appendChild(modalDialog);
        modalContainer.appendChild(modal);
    }
}

var word_counter = 0;   // tracks which word is to be displayed
var i = 0;              // tracks number of letters in the display
var forward = true;
var speed = 50;

typeWrite();

function sleep(ms) { // obtained from https://www.sitepoint.com/delay-sleep-pause-wait/
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
async function typeWrite() {
    element = document.getElementById("typing")

    if (forward) {
        element.innerHTML += strings[word_counter].charAt(i);
        i++;
        if (strings[word_counter].length == i) { // completely typed
            forward = !forward;
            speed = 50;
            await sleep(1000);
        }
    }
    else {
        element.innerHTML = element.innerText.slice(0, -1);
        i--;
        if (i == 0) { // completely erased
            forward = true;
            word_counter = (word_counter + 1) % strings.length;
            speed = 50;
        }
    }
    setTimeout(typeWrite, speed);
    speed *= 0.8;
}

// Loading Screen

let preloader = document.getElementById("preloader")

setTimeout(() => {preloader.style.display = "none";}, 5000);