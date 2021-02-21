let singleChamps = "";
const champRollBtn = document.querySelector(".rollCharBtn");
window.addEventListener('load', () => {
    fetchSingleChampion();
    galleryInt();
});
champRollBtn.addEventListener("click", () => {
    rollChampion(singleChamps);
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

const fetchSingleChampion = () => {
    fetch(`http://localhost:3000/data`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            singleChamps = data[0].data;
        })
};
const rollChampion = (obj) => {
    const result = Object.keys(obj).map((key) => [obj[key]]);
    const resultChampion = result[Math.floor(Math.random() * result.length)];
    displayDailyData(resultChampion[0]);
}
const displayDailyData = (resultChampion) => {
    const photoHolder = document.querySelector(".dailyResult-imageCharacter");
    animationTest(photoHolder);
    console.log(resultChampion);
}
const animationTest = (photo) => {
    photo.parentNode.addEventListener('mousemove', (e) => {
        let xAxis = (window.innerWidth / 2 - e.pageX ) / 220
        let yAxis = (window.innerHeight / 2 - e.pageY ) / 220
        photo.style.transform = `rotateY(${yAxis}deg) rotateX(${xAxis}deg)`;
    })
}