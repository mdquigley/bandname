const submit = document.getElementById('submit');
const input = document.getElementById('input');
const bname = document.getElementById('bname');
const avail = document.getElementById('avail');
const warning = document.getElementById('warning');
const claim = document.getElementById('claim');

const signup = "Signup | Bandcamp";

const regex = /^[a-z0-9][a-z0-9-]+[a-z0-9]$/i;

function validateInput(text) {
    return text.match(regex);
}

submit.addEventListener('click', async function () {

    if (validateInput(input.value)) {

        const bandname = input.value.toLowerCase();

        const url = 'https://bandname-proxy.herokuapp.com/https://' + bandname + '.bandcamp.com';

        clearResults();
        bname.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';

        const myRequest = new Request(url);
        let response;

        $.ajax({
            url: url,
            complete: function (data) {
                response = $.parseHTML(data.responseText)[1].innerText;
                console.log(response);
                clearResults();
                bname.innerText = bandname;
                warning.innerText = (response.includes(signup) ? '🤘\n' : '😭\n');
                avail.innerText = '.bandcamp.com is ' + (response.includes(signup) ? 'available!' : 'not available');
                avail.classList.remove("rules");

                if (response.includes(signup)) {
                    claim.classList.remove('hidden');
                    claim.classList.add('claim');
                    claim.setAttribute('href', "https://bandcamp.com/signup?new_domain=" + bandname);
                }


            },
            error: function (data) {
                clearResults();
                console.log(data)
                avail.innerText = ('There has been a problem with your fetch operation: ' + data.responseText);
            }
        });



    } else if (input.value !== "") {
        clearResults();
        warning.innerText = '⚠️\n';
        avail.innerText = 'Band names can include letters, numbers, and dashes.\nThey cannot begin or end with a dash.\n\n✅ good-example123\n❌ -bad-example-';
        avail.classList.add("rules");
    } else {
        clearResults();
        avail.classList.remove("rules");
    }
});

input.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        submit.click();
    }
});

function clearResults() {
    bname.innerText = '';
    warning.innerText = '';
    avail.innerText = '';
    claim.classList.remove("claim");
    claim.classList.add('hidden');
    claim.setAttribute('href', "#");
}