const form = document.querySelector('form');

if (!form) { /* ReqJ1 */
    console.log('No form found; my JS.js exiting');
    exit(0);
}

function updatePreview() { /* ReqJ2 */ 
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const phone = document.querySelector('#phone').value;

    let radio = '';
    if (document.querySelector('#suggestion').checked)
        radio = 'Suggestion';
    else if (document.querySelector('#correction').checked)
        radio = 'Correction';

    let checks = [];
    if (document.querySelector('#profession').checked)
        checks.push('Profession');
    if (document.querySelector('#teamFan').checked)
        checks.push('Team fan');
    if (document.querySelector('#playerFan').checked)
        checks.push('Player fan');
    let check = checks.join(', ');

    const favorite = document.querySelector('#category').value;
    const message = document.querySelector('#message').value;

    preview.innerHTML = `
        <h3>Contact Preview</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message for:</strong> ${radio}</p>
        <p><strong>Involved because:</strong> ${check}</p>
        <p><strong>Favorite:</strong> ${favorite}</p>
        <p><strong>Message:</strong> ${message}</p>
    `;
}

function checkValidityState(field) { /* ReqJ3 */
    field.classList.remove('valid', 'invalid');

    if (field.checkValidity()) {
        field.classList.add('valid');
    }else {
        field.classList.add('invalid');
    }
}

function validateForm() { /* ReqJ4 */
    const errorBox = document.getElementById('error-box');

    errorBox.textContent = '';
    errorBox.classList.remove('visible');
    
    const form = document.querySelector('form');
    if (!form.reportValidity()) {
        return false;
    }

    const customError = checkCustomRules();
    if (customError) {
        errorBox.textContent = customError;
        errorBox.classList.add('visible');
        return false;
    }

    return true;
}

function checkCustomRules() { /* ReqJ5 */
    const correctionSelected = document.querySelector('#correction').checked;
    const message = document.querySelector('#message').value;

    if (correctionSelected && !message == "") { // custom rule, correction are not allowed
        document.querySelector('#correction').focus(); /* ReqJ6 */
        return 'Everything is perfect, no corrections needed for this web';
    }

    return null;
}

function handleKeydown(event) { /* ReqJ7 */
    if (event.key == 'Enter') {
        document.getElementById('submit-btn').classList.add('highlight');
    }
}

function handleMouseOver(element) { /* ReqJ8 */
    element.classList.add('highlight');
}

function handleMouseOut(element) { /* ReqJ8 */
    element.classList.remove('highlight');
}
