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
    displayDailyChamp(resultChampion[0]);
}
const displayDailyChamp = (resultChampion) => {
    //prepere for the new data
    let appendBox = document.querySelector(".dailyResultCharacter");
    appendBox.innerHTML = "";
    // create data
    const h1Theme = document.createElement("h1");
    const sectionBox = document.createElement("div");
    const infoBox = document.createElement("div");
    const imageBcg = document.createElement("img");
    const parInfo = document.createElement("p");
    const h1Info = document.createElement("h1");
    // assigns classes
    sectionBox.classList.add("dailyResult-imageBoxCharacter");
    infoBox.classList.add("dailyResult-infoCharacter");
    imageBcg.classList.add("dailyResult-imageCharacter");
    //asign data
    h1Theme.innerHTML = "Your champion for today";
    parInfo.innerHTML = resultChampion.title;
    h1Info.innerHTML = resultChampion.name;
    imageBcg.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${resultChampion.name}_0.jpg`;
    console.log(imageBcg.src === undefined);
    //append data
    infoBox.appendChild(parInfo);
    infoBox.appendChild(h1Info);

    sectionBox.appendChild(infoBox);
    sectionBox.appendChild(imageBcg);
    
    appendBox.appendChild(h1Theme);
    appendBox.appendChild(sectionBox);
    //set animation
    const photoHolder = document.querySelector(".dailyResult-imageCharacter");
    animationXY(photoHolder);
    console.log(resultChampion);
}
const animationXY = (photo) => {
    photo.parentNode.addEventListener('mousemove', (e) => {
        let xAxis = (window.innerWidth / 2 - e.pageX ) / 220
        let yAxis = (window.innerHeight / 2 - e.pageY ) / 220
        photo.style.transform = `rotateY(${yAxis}deg) rotateX(${xAxis}deg)`;
    })
}