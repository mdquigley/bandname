const submit = document.getElementById('submit');
const input = document.getElementById('input');
const name = document.getElementById('name');
const avail = document.getElementById('avail');
const warning = document.getElementById('warning');


const signupURL = "https://bandcamp.com/signup?new_domain=";

const regex = /^[a-z0-9][a-z0-9-]+[a-z0-9]$/i;

function validateInput(text) {
    return text.match(regex);
}

submit.onclick = function lookUp() {

    if (validateInput(input.value)) {

        const bandname = input.value.toLowerCase();
        const url = 'https://' + bandname + '.bandcamp.com';

        const myRequest = new Request(url);
        fetch(myRequest).then(function (response) {

            name.innerText = bandname;
            warning.innerText = (response.url.includes(signupURL) ? '🤘\n' : '😭\n');
            avail.innerText = '.bandcamp.com is ' + (response.url.includes(signupURL) ? 'available!' : 'not available');

        })
    } else if (input.value !== "") {
        name.innerText = '';
        warning.innerText = '⚠️\n';
        avail.innerText = 'Band names must start and end with a letter or number, and may include dashes anywhere in the middle.\n\ngood-example123 ✅\n-bad-example- ❌';
    } else {
        name.innerText = '';
        warning.innerText = '';
        avail.innerText = '';
    }
}

input.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        submit.click();
    }
});