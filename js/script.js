const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

function generateCards(cards, containerID, type) {
    let cardContainer = document.getElementById(containerID)
    let modalContainer = document.getElementById("modalContainer");

    for (item of cards) {
        let card = document.createElement("div");
        card.className = item.new ? "gallery-item new card" : "gallery-item card";

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
        
        switch(type) {
            case "render":
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
                caption.appendChild(postDate);
                break;
            
            case "design":
                let postDetails = document.createElement("h6");
                
                let photoshopBadge = document.createElement("span");
                photoshopBadge.className = "platform-icon skill-icons--photoshop";
                
                let illustratorBadge = document.createElement("span");
                illustratorBadge.className = "platform-icon skill-icons--illustrator";

                let indesignBadge = document.createElement("span");
                indesignBadge.className = "platform-icon logos--adobe-indesign";
                
                if (item.platforms.includes("photoshop")){
                    postDetails.appendChild(photoshopBadge);
                }
                if (item.platforms.includes("illustrator")){
                    postDetails.appendChild(illustratorBadge);
                }
                if (item.platforms.includes("indesign")){
                    postDetails.appendChild(indesignBadge);
                }
                
                if (item.type != "") {
                    let officialBadge = document.createElement("span");
                    officialBadge.innerText = "COMMISSION";
                    officialBadge.className = "badge";
                    
                    postDetails.appendChild(document.createElement("br"))
                    postDetails.appendChild(officialBadge);
                }
                caption.appendChild(postDetails);
                break;
            
            case "tech":
                let postDeet = document.createElement("h6");
                for (t of item.type) {
                    let officialBadge = document.createElement("span");
                    officialBadge.innerText = t.toUpperCase();
                    officialBadge.className = "badge";

                    postDeet.appendChild(officialBadge);
                }
                
                
                caption.appendChild(postDeet);
                break;
        }
        

        let postTitle = document.createElement("h3");
        postTitle.innerText = item.title;
        if (item.url) {
            for (var key in item.url) {
                //console.log(key);
                var externalLink = document.createElement("a");
                externalLink.href = item.url[key];
                externalLink.target = "_blank";
                let icon = null;

                switch(key) {
                    case "figma":
                        console.log(key);
                        icon = document.createElement("span");
                        icon.className = "gg--figma";
                        externalLink.appendChild(icon);
                        break;
    
                    case "youtube":
                        console.log(key);
                        icon = document.createElement("i");
                        icon.className = "bi bi-youtube";
                        externalLink.appendChild(icon);
                        break;

                    case "github":
                        console.log(key);
                        icon = document.createElement("i");
                        icon.className = "bi bi-github";
                        externalLink.appendChild(icon);
                        break;

                    case "docs":
                        console.log(key);
                        icon = document.createElement("i");
                        icon.className = "bi bi-file-earmark-text-fill";
                        externalLink.appendChild(icon);
                        break;

                }

                console.log(icon);
                
                postTitle.innerText += ' ';
                postTitle.appendChild(externalLink.cloneNode(true));
                //postTitle.appendChild(externalLink);
            }
        }
        

        let postDescription = document.createElement("p");
        postDescription.innerText = item.description;

        
        caption.appendChild(postTitle);
        // caption.appendChild(postDescription);

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
                
                console.log(img.naturalHeight);
                console.log(img.naturalWidth);

                modalDialog.appendChild(img);
            }

            modal.appendChild(modalDialog);
            modalContainer.appendChild(modal);
        }
    }
}

generateCards(renderEntries, "rendersContainer", "render");
generateCards(designEntries, "designsContainer", "design");
generateCards(techEntries, "techContainer", "tech");

var word_counter = 0;   // tracks which word is to be displayed
var i = 0;              // tracks number of letters in the display
var forward = true;
var speed = 50;

goType("typing-intro", intro_strings);

function sleep(ms) { // obtained from https://www.sitepoint.com/delay-sleep-pause-wait/
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
async function goType(id, strings) {

    async function typeWrite() {
        element = document.getElementById(id)
    
        if (forward) {
            if (i==0) {
                element.innerHTML = strings[word_counter].charAt(i);
            }
            else {
                element.innerHTML += strings[word_counter].charAt(i);
            }
            
            i++;
            if (strings[word_counter].length == i) { // completely typed
                forward = !forward;
                speed = 50;
                await sleep(1000);
            }
        }
        else {
            if (i==1) {
                forward = true;
                word_counter = (word_counter + 1) % strings.length;
                speed = 50;
            }
            else {
                element.innerHTML = element.innerText.slice(0, i);
            }
    
            i--;
        }
        setTimeout(typeWrite, speed);
        speed *= 0.95;
    }
    
    typeWrite();
}

// Loading Screen

/* let preloader = document.getElementById("preloader")

setTimeout(() => {preloader.style.display = "none";}, 5000); */