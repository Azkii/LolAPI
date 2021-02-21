console.log("xdd");
fetch(`https://lolchallangerapi.herokuapp.com/data`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        console.log(data);
    });