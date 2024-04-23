'use strict';

(function() {
    document.querySelectorAll("[role='listitem']").forEach(episode => {
        if(episode.innerHTML.includes("polyline")){
            episode.style.display = 'none';
        }
    })
})();


