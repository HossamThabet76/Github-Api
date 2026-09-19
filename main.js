let input=document.querySelector('input')
let button=document.querySelector('button')
let content=document.querySelector('.content')
let span=document.querySelector('.content span')

input.addEventListener('keyup',e=>{
    if(e.key=='Enter'){
        main()
    }
})

button.onclick=function(){
    main()
}
function main(){
    if(input.value==''){
        span.textContent='Please Write Github Username'
        input.focus()
    }
    else{
        fetch(`https://api.github.com/users/${input.value}/repos`)
            .then(repo=>{
                return repo.json()
            })
            .then(repos=>{
                content.innerHTML=''

                repos.forEach(repo => {
                    let div=document.createElement('div')

                    let spn=document.createElement('span')
                    let spnText=document.createTextNode(repo.name)
                    spn.appendChild(spnText)
                    div.appendChild(spn)

                    let star=document.createElement('span')
                    let starText=document.createTextNode(`Stars ${repo.stargazers_count}`)
                    star.appendChild(starText)
                    div.appendChild(star)

                    let a=document.createElement('a')
                    let aText=document.createTextNode('Visit')
                    a.href=`https://${input.value}.github.io/${repo.name}/`
                    a.target='_blank'
                    a.appendChild(aText)
                    div.appendChild(a)

                    content.appendChild(div)
                });
            })
    }
}