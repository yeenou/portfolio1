const frame = document.querySelector(".wrap");

fetch('data/members.json')
.then(data=>{
    return data.json()
})
.then(json=>{
    console.log(json);

    const memberInfo = json.data;

    let tags = '';

    memberInfo.map((member, index)=>{
        tags+=`
            <article>
                <img src='${member.pic}'>
                <h3>${member.name}</h3>
                <p>${member.position}</p>
            </article>
        `
    })

    frame.innerHTML = tags;0

})