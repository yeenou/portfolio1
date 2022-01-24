const frame = document.querySelector(".member");

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
        <h2>${member.name}</h2>
        <p>${member.position}</p>
        </article>
        `
    })

    frame.innerHTML = tags;0
    
})