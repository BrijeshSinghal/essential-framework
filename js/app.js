let tags = document.querySelectorAll("*");
let html = ``;
tags.forEach((tag) => {
	if (tag.className) html += `${tag}: ${tag.className}<br>`;
});

document.querySelector("#source").innerHTML = html;
