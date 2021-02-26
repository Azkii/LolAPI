let singleChamps = "";
let challengeList = "";
let singleChallenges = "";
let partyChallenges = "";
const champRollBtn = document.querySelector(".rollCharBtn");
const singleChallBtn = document.querySelector(".singleChallBtn");
const partyChallBtn = document.querySelector(".partyChallBtn");

const createChallengeBtn = document.querySelector(".ChallangeForm-submit");

window.addEventListener('load', () => {
    fetchSingleChampion();
    fetchChallenges();
    galleryInt();
});
champRollBtn.addEventListener("click", () => {
    rollChampion(singleChamps);
});
singleChallBtn.addEventListener("click", () => {
    rollSingleChallenge(singleChallenges);
});
partyChallBtn.addEventListener("click", () => {
    rollPartyChallenge(partyChallenges);
});

createChallengeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.querySelector(".ChallangeForm-name").value;
    const desc = document.querySelector(".ChallangeForm-descInput").value;
    const type = document.querySelector(".ChallangeForm-selectType").value;
    const level = document.querySelector(".ChallangeForm-selectLevel").value;

    pushToChallengesLifeTime(title,desc,type,level);

    const convertedData = convertChallengeToLocal(title,desc,type,level);
    localStorage.setItem(title,convertedData);


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
//fetch challenges
const fetchChallenges = () => {
    fetch(`http://localhost:3000/challenges`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        updateData().forEach((value) => {
            data.push(value);
        })
        challengeList = data;
        convertChallnges(challengeList);
    })
};
//fetch char 
const fetchSingleChampion = () => {
    fetch(`http://localhost:3000/champions`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            singleChamps = data[0].data;
        })
};
//convert challenges to 2 sections
const convertChallnges = (data) => {
    singleChallenges = data.filter((data) => {
        return data.type === "singleChallenge";
    });
    partyChallenges = data.filter((data) => {
        return data.type === "partyChallenge";
    });
}
//roling the challenge for today
const rollChampion = (obj) => {
    const result = Object.keys(obj).map((key) => [obj[key]]);
    const resultChampion = result[Math.floor(Math.random() * result.length)];
    displayDailyChamp(resultChampion[0]);
}

const rollSingleChallenge = (singleChallenges) => {
    console.log("rolling single")
    const resultChallange = singleChallenges[Math.floor(Math.random() * singleChallenges.length)];
    console.log(resultChallange);
    displayDailyChallenge(resultChallange);
};

const rollPartyChallenge = (partyChallenges) => {
    console.log("rolling party");
    const resultChallange = partyChallenges[Math.floor(Math.random() * partyChallenges.length)];
    console.log(resultChallange);
    displayDailyChallenge(resultChallange);
};
//display data
const displayDailyChamp = (resultChampion) => {
    //prepere for the new data
    let appendBox = document.querySelector(".dailyResultCharacter");
    appendBox.innerHTML = "";
    // create dataBox
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
}

const displayDailyChallenge = (resultChallenge) => {
    //prepere for the new data
    let appendBox = document.querySelector(".dailyResultCharacter");
    appendBox.innerHTML = "";
    // create dataBox
    const h1Theme = document.createElement("h1");
    const sectionBox = document.createElement("div");
    const infoBox = document.createElement("div");
    const imageBox = document.createElement("div");
    const challengeImage = document.createElement("img");
    const h1Title = document.createElement("h1");
    const parDesc = document.createElement("p");
    const h2Level = document.createElement("h2");
    // assigns classes
    sectionBox.classList.add("challengeResult");
    infoBox.classList.add("challengeInfo");
    imageBox.classList.add("challengePhoto");
    //assigns data
    h1Theme.innerHTML = "Your challenge for today:";
    challengeImage.src = "";
    h1Title.innerHTML = resultChallenge.name;
    parDesc.innerHTML = resultChallenge.EN;
    h2Level.innerHTML = `Level: ${resultChallenge.level}`;
    //append data
    infoBox.appendChild(h1Title);
    infoBox.appendChild(parDesc);
    infoBox.appendChild(h2Level);

    imageBox.appendChild(challengeImage);

    sectionBox.appendChild(imageBox);
    sectionBox.appendChild(infoBox);

    appendBox.appendChild(h1Theme);
    appendBox.appendChild(sectionBox);
};

//convert Challenge To Local
const convertChallengeToLocal = (title,desc,type,level) => {
    return [99,type,title,"",desc,level,""];
};
//Update random when fetching from local
const updateData = () => {
    console.log("updating");
    let items = {...localStorage};
    items = Object.keys(items).map((key) => [items[key]]);
    return items.map((value) => {
        return fixedItem = convertToObjcetChallenge(value[0].split(","));
    });
};
//ConvertToObjectChallenge
const convertToObjcetChallenge = (data) => {
    return {
        "id": +data[0],
        "type": data[1],
        "name": data[2],
        "PL": data[3],
        "EN": data[4],
        "level": data[5],
	    "questType": data[6]
    }
};
//pushtochallangesinrealTime
const pushToChallengesLifeTime = (title,desc,type,level) => {
    const data = {
        "id": 99,
        "type": type,
        "name": title,
        "PL": "",
        "EN": desc,
        "level": level,
	    "questType": "",
    };
    (data.type === "singleChalleng") ? singleChallenges.push(data) : partyChallenges.push(data);
};