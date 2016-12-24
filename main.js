;(function(){
	"use strict";

	let users = [
		{ name:"Bob", lastName: "Smith",id:"bob",  age: 20, default: true},
		{ name:"Ms.Alice", lastName: "Stone", id:"alice", age: 21},
		{ name:"Ivan", lastName: "Smooth", id:"ivan", age: 23},
	];

	// renderPerson();

	window.addEventListener("popstate", renderPerson);
    window.addEventListener("hashchange", objectChange);

	document.body.addEventListener("click", handleClick);
    
    let idPath, namePath, lastNamePath, agePath;

	function handleClick(ev){
		if(ev.target.localName === "a"){
			ev.preventDefault();
			let id = ev.target.getAttribute("href").slice(1);
            //console.log(id);
            let name = users.find(function(el,i,obj){
                if (id === el.id){
                    console.log(el.name);
                    return el.name;
            }});
            
            let lastName = users.find(function(el,i,obj){
                if (id === el.id){
                    console.log(el.lastName);
                    return el.lastName;
            }});
            
            let age = users.find(function(el,i,obj){
                if (id === el.id){
                    console.log(el.age);
                    return el.age;
            }});
                       
            console.log(ev);
            
			history.pushState({ id }, null, `${location.origin}/${id}/${name['name']}/${lastName['lastName']}/${age['age']}`);
            idPath = `${id}`; namePath = `${name['name']}`; lastNamePath = `${lastName['lastName']}`; agePath = `${age['age']}`;
		}
	}

	function renderPerson(ev){
		console.log(ev);

		if(!ev.state || !ev.state.id) return;

		let user = users.find(el => el.id === ev.state.id),
			data =`${user.name}, ${user.lastName}, ${user.age}`;

		document.querySelector("p").textContent = data;
	}
    
    function objectChange(ev) {
        if(ev.target.localName === "a"){
        ev.preventDefault();
        let id = ev.target.getAttribute("href").slice(1);
        console.log(ev);
        let newPath = window.location.pathname;
        newPath.match(/\w+/);
        let pathArr = newPath.slice(1).split('\/');
        idPath = pathArr[0];
        namePath = pathArr[1];
        lastNamePath = pathArr[2];
        agePath = pathArr[3];
        console.log(pathArr);
        history.pushState({id}, null, `${location.origin}/idPath/namePath/lastNamePath/agePath`);
        console.log(history.pushState({id}, null, `${location.origin}/idPath/namePath/lastNamePath/agePath`));
        console.log(users);
}
    }
})();