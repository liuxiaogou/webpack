import add from './other'
function greeter(person: string) {
    return "Hello, " + person;
}

let user = "Jane User";
console.log(add(1,5))
document.body.innerHTML = greeter(user);
console.log(greeter(user));