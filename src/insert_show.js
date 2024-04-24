'use strict';

async function execute(){
    document.querySelectorAll("[role='listitem']").forEach(episode => {
        if(episode.innerHTML.includes("polyline")){
            episode.style.display = "block"
        }
    })
}

execute()

