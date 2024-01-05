import apiKey from "./api.js";

// API Fetch from NASA API
function getPhoto() {
	const selectedDate = document.querySelector("#date-picker").value;
	try {
		fetch(
			` https://api.nasa.gov/planetary/apod?api_key=2mfNfhPxMoap8kgINsfExw6dGWBqbCRNyhU840lv&date=${selectedDate}`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.media_type === "video") {
					document.querySelector(".wrapper").innerHTML = videoTemplate(
						data.date,
						data.explanation,
						data.title,
						data.url
					);
				} else {
					document.querySelector(".wrapper").innerHTML = htmlTemplate(
						data.date,
						data.explanation,
						data.title,
						data.url
					);
				}
			});
	} catch (error) {
		console.log(error);
	}
	document.querySelector("#date-picker").value = "";
}

function htmlTemplate(date, explanation, title, image, video) {
	return `<div class="wrapper">
  <section class="name-container">
    <h2 class="name">${title}</h2>
    <span class='date'> ${date} </span>
  </section>

  <section class="picture-container">
    <img class="image" src="${image}" alt="A picture taken by NASA">
  </section>

  <section class="comments-container">
    <p class="comments">${explanation}</p>
  </section>
</div>
`;
}

function videoTemplate(date, explanation, title, video) {
	return `<div class="wrapper">
  <section class="name-container">
    <h2 class="name">${title}</h2>
    <span class='date'> ${date} </span>
  </section>

  <section class="picture-container">
    <iframe class="video" src="${video}" frameborder="0"></iframe>
  </section>

  <section class="comments-container">
    <p class="comments">${explanation}</p>
  </section>
</div>
`;
}

document.querySelector(".btn").addEventListener("click", getPhoto);

getPhoto();

/* 

date: "1995-12-23"
explanation: "The third and fourth innermost moons of Saturn were unexpectedly discovered to be gravitational \"shepards.\" The inner moon Prometheus and the outer moon Pandora use their gravitational attraction to define Saturn's outermost ring.  Were any of the smaller chunks of ice and rock that compose Saturn's F Ring to stray, the ring particle would be gravitationally pulled back into place by one of these passing moons.  This complex interaction creates a ring structure with two narrow braids and several unusual knots."
hdurl: "https://apod.nasa.gov/apod/image/f_ring_vg1.gif"
title: "Prometheus, Pandora and Saturn's F Ring"
url: "https://apod.nasa.gov/apod/image/f_ring_vg1.gif"


*/
