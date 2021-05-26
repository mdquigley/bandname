const submit = document.getElementById('submit');
const input = document.getElementById('input');
const bname = document.getElementById('bname');
const avail = document.getElementById('avail');
const warning = document.getElementById('warning');


const signupURL = "https://bandcamp.com/signup?new_domain=";

const regex = /^[a-z0-9][a-z0-9-]+[a-z0-9]$/i;

function validateInput(text) {
    return text.match(regex);
}

submit.addEventListener('click', async function () {

    if (validateInput(input.value)) {

        const bandname = input.value.toLowerCase();
        const url = 'https://' + bandname + '.bandcamp.com';

        const myRequest = new Request(url);
        await fetch(myRequest).then(function (response) {

            bname.innerText = bandname;
            warning.innerText = (response.url.includes(signupURL) ? '🤘\n' : '😭\n');
            avail.innerText = '.bandcamp.com is ' + (response.url.includes(signupURL) ? 'available!' : 'not available');
            avail.classList.remove("rules");

        })
    } else if (input.value !== "") {
        bname.innerText = '';
        warning.innerText = '⚠️\n';
        avail.innerText = 'Band names must start and end with a letter or number, and may include dashes anywhere in the middle.\n\ngood-example123 ✅\n-bad-example- ❌';
        avail.classList.add("rules");
    } else {
        bname.innerText = '';
        warning.innerText = '';
        avail.innerText = '';
        avail.classList.remove("rules");
    }
});

input.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        submit.click();
    }
});