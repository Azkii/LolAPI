fetch(`http://localhost:3000/data`)
.then((res) => {
    return res.json()
})
.then((data) => {
    console.log(data);
})
window.addEventListener('load', () => {
    galleryInt();
});
//FUNctions
const galleryInt = () => {
    const gallery = [
        {
            url: './websiteStatic/gallery/header/yas.png',
            backColor: '#ffc477',
        },
        {
            url: './websiteStatic/gallery/header/xer.png',
            backColor: '#d7f2ff',
        },
        {
            url: './websiteStatic/gallery/header/tal.png',
            backColor: '#d7f2ff',
        },
    ]
    let photoIndex = 1;
    setInterval( () => {
        const photo = document.querySelector(".photoHeader");
        const photoHolder = document.querySelector(".sectionPhoto");
        photo.style.animation= "drop 1s ease";
        photo.style.display = 'none';
        photo.style.display = 'flex';
        photoIndex < gallery.length ? photoIndex++ : photoIndex = 1;
        photoHolder.style.background = gallery[photoIndex-1].backColor;
        photo.src = gallery[photoIndex-1].url;
        photo.addEventListener("animationend",() => {
            photo.style.animation= "";
        })
    },8000);
};