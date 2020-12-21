function changeTitle() {
    var title = document.getElementById('chart_title');
    var newTitle = prompt('Enter new title:', title.innerHTML);
    if (newTitle === null) { return }
    title.innerHTML = newTitle;
}

function changeTierTitle(t) {
    var title = document.getElementById('t' + t.toString()).getElementsByClassName('tier_title')[0];
    var newTitle = prompt('Enter new label:', title.innerHTML);
    if (newTitle === null) { return }
    title.innerHTML = newTitle;
}

function changeTierColor(t) {
    var title = document.getElementById('t' + t.toString()).getElementsByClassName('tier_title')[0];
    var newColor = prompt('Enter new color:', title.style.backgroundColor);
    if (newColor === null) { return }
    title.style.backgroundColor = newColor;
}

function addImage(t, src=null, top=null, left=null) {
    var tier = document.getElementById('t' + t.toString());
    var content = tier.getElementsByClassName('tier_content')[0];
    var n = content.getElementsByClassName('tier_img').length;

    var img = document.createElement('img');

    if (src === null) {
        src = prompt('Image URL:');

        if (src === null || src === undefined) {
            return;
        }
    }

    img.src = src;

    if (top !== null) {
        img.style.top = top;
    } else {
        img.style.top = tier.getBoundingClientRect().top + 'px';
    }

    if (left !== null) {
        img.style.left = left;
    }

    img.classList.add('tier_img');

    img.addEventListener('dragend', function() {
        moveImage(t, n);
    });

    img.addEventListener('contextmenu', function() {
        img.remove();
    });

    img.onerror = function() {
        img.remove();
    };

    content.appendChild(img);
}

function moveImage(t, n) {
    var tier = document.getElementById('t' + t.toString());
    var bounds = tier.getBoundingClientRect();
    var height = bounds.bottom - bounds.top;

    var img = tier.getElementsByClassName('tier_img')[n];
    var e = window.event;
    var yChange = e.clientY - img.getBoundingClientRect().top - img.height / 2;
    var newY = (e.clientY - img.width / 2);

    img.style.left = (e.clientX - img.height / 2) + 'px';

    //transfer the image to another tier
    if (yChange >= height || yChange < 0) {
        let tiers = document.getElementsByClassName('tier');
        let currentTier = tiers[0];
        let currentI = 0;

        for (let i = 0; i < tiers.length; i++) {
            let thisTier = tiers[i];
            if (Math.abs(thisTier.getBoundingClientRect().top - newY) < Math.abs(currentTier.getBoundingClientRect().top - newY)) {
                currentTier = thisTier;
                currentI = i;
            }
        }

        img.style.top = currentTier.getBoundingClientRect().top + 'px';
        addImage(currentI + 1, img.src, img.style.top, img.style.left);
        img.remove();
    }
}

window.onload = function() {
    document.getElementById('chart').addEventListener('contextmenu', function(e){
        e.preventDefault()
    });
};