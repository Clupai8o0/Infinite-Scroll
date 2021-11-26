// DOM elements
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

//* Global variables
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//* Unsplash api
const count = 5;
const apiKey = "P1nk3Jyvqhip4yuyISM5v0o8G9-7JQo14Y9VDV_a6Zc";
const api = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Helper function to set attributes of DOM elements
//* DRY
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

// Check if all images were loaded
const imageLoaded = () => {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true; //* hiding the loading
		count = 20;
	}
};

// Create Elements For Links & Photos, and add that to DOM
const displayPhotos = () => {
	imagesLoaded = 0;
	totalImages = photosArray.length;

	photosArray.forEach((photos) => {
		const item = document.createElement("a");
		// item.setAttribute('href', photos.links.html);
		// item.setAttribute('target', '_blank');
		setAttributes(item, {
			href: photos.links.html,
			target: "_blank",
		});

		const img = document.createElement("img");
		// img.setAttribute('src', photos.urls.regular);
		// img.setAttribute('alt', photos.alt_description);
		// img.setAttribute("title", photos.alt_description);
		setAttributes(img, {
			src: photos.urls.regular,
			alt: photos.alt_description,
			title: photos.alt_description,
		});

		//* once image is loaded
		img.addEventListener("load", imageLoaded());

		//* Adding the image to the dom
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
};

// Getting photos from Unsplash API
const getPhotos = async () => {
	try {
		const resp = await fetch(api);
		photosArray = await resp.json();
		displayPhotos();
	} catch (err) {
		
	}
};

//* scroll event
// Check to see if scrolling near bottom of the page
window.addEventListener("scroll", () => {
	if (
		window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		getPhotos();
	}
});

// On load
getPhotos();
