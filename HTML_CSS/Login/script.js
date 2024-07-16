let loginBtn = document.getElementById('loginbtn');
let signupBtn = document.getElementById('signupbtn');
let loginActive = document.getElementById('loginActive');
let signupActive = document.getElementById('signupActive');
let formBlock = document.getElementById('formBlock');

// event listeners for the text animation of input label
function attachEventListeners() {
    document.getElementById('loginInputVoterId')?.addEventListener('focus', () => {
        document.getElementById('loginLabelVoterID').classList.add('label-input-voterid-after');
        document.getElementById('loginLabelVoterID').classList.remove('label-input-voterid-before');
    });

    document.getElementById('loginInputVoterId')?.addEventListener('blur', () => {
        if (!document.getElementById('loginInputVoterId').value) {
            document.getElementById('loginLabelVoterID').classList.add('label-input-voterid-before');
            document.getElementById('loginLabelVoterID').classList.remove('label-input-voterid-after');
        }
    });

    document.getElementById('loginInputPassword')?.addEventListener('focus', () => {
        document.getElementById('loginLabelPassword').classList.add('label-input-voterid-after');
        document.getElementById('loginLabelPassword').classList.remove('label-input-voterid-before');
    });

    document.getElementById('loginInputPassword')?.addEventListener('blur', () => {
        if (!document.getElementById('loginInputPassword').value) {
            document.getElementById('loginLabelPassword').classList.add('label-input-voterid-before');
            document.getElementById('loginLabelPassword').classList.remove('label-input-voterid-after');
        }
    });

    document.getElementById('signupInputVoterId')?.addEventListener('focus', () => {
        document.getElementById('signupLabelVoterID').classList.add('label-input-voterid-after');
        document.getElementById('signupLabelVoterID').classList.remove('label-input-voterid-before');
    });

    document.getElementById('signupInputVoterId')?.addEventListener('blur', () => {
        if (!document.getElementById('signupInputVoterId').value) {
            document.getElementById('signupLabelVoterID').classList.add('label-input-voterid-before');
            document.getElementById('signupLabelVoterID').classList.remove('label-input-voterid-after');
        }
    });

    document.getElementById('signupInputPassword')?.addEventListener('focus', () => {
        document.getElementById('signupLabelPassword').classList.add('label-input-voterid-after');
        document.getElementById('signupLabelPassword').classList.remove('label-input-voterid-before');
    });

    document.getElementById('signupInputPassword')?.addEventListener('blur', () => {
        if (!document.getElementById('signupInputPassword').value) {
            document.getElementById('signupLabelPassword').classList.add('label-input-voterid-before');
            document.getElementById('signupLabelPassword').classList.remove('label-input-voterid-after');
        }
    });

    document.getElementById('signupInputConfirmPassword')?.addEventListener('focus', () => {
        document.getElementById('signupLabelConfirmPassword').classList.add('label-input-voterid-after');
        document.getElementById('signupLabelConfirmPassword').classList.remove('label-input-voterid-before');
    });

    document.getElementById('signupInputConfirmPassword')?.addEventListener('blur', () => {
        if (!document.getElementById('signupInputConfirmPassword').value) {
            document.getElementById('signupLabelConfirmPassword').classList.add('label-input-voterid-before');
            document.getElementById('signupLabelConfirmPassword').classList.remove('label-input-voterid-after');
        }
    });
}
// function for loading login form
function loadLoginForm() {
    formBlock.innerHTML = `
        <form class="login-form-block" action="/home" method="post">
            <div class="input-text-field">
                <div class="input-block-1">
                    <label id="loginLabelVoterID" class="label-input-voterid-before" for="loginInputVoterId">Enter Voter ID</label>
                    <br>
                    <input class="input-voterid" id="loginInputVoterId" name="voterid" placeholder="" type="text">
                </div>
            </div>
            <div class="input-text-field">
                <div class="input-block-1">
                    <label id="loginLabelPassword" class="label-input-voterid-before" for="loginInputPassword">Enter Password</label>
                    <br>
                    <input class="input-voterid" id="loginInputPassword" name="password" placeholder="" type="password">
                </div>
            </div>
            <div class="input-text-field sumbitbtnfield">
                <button class="submitbtn" type="submit">Submit</button>
            </div>
        </form>
    `;
    attachEventListeners();
}

// functon for loading signup form
function loadSignupForm() {
    formBlock.innerHTML = `
        <form class="login-form-block" action="/login" method="post">
            <div class="input-text-field">
                <div class="input-block-1">
                    <label id="signupLabelVoterID" class="label-input-voterid-before" for="signupInputVoterId">Enter Voter ID</label>
                    <br>
                    <input class="input-voterid" id="signupInputVoterId" name="voterid" placeholder="" type="text">
                </div>
            </div>
            <div class="input-text-field">
                <div class="input-block-1">
                    <label id="signupLabelPassword" class="label-input-voterid-before" for="signupInputPassword">Enter Password</label>
                    <br>
                    <input class="input-voterid" id="signupInputPassword" name="password" placeholder="" type="password">
                </div>
            </div>
            <div class="input-text-field">
                <div class="input-block-1">
                    <label id="signupLabelConfirmPassword" class="label-input-voterid-before" for="signupInputConfirmPassword">Confirm Password</label>
                    <br>
                    <input class="input-voterid" id="signupInputConfirmPassword" name="confirmpassword" placeholder="" type="password">
                </div>
            </div>
            <div class="input-text-field sumbitbtnfield">
                <button class="submitbtn" type="submit">Submit</button>
            </div>
        </form>
    `;
    attachEventListeners();
}

// on login btn click 
loginBtn.onclick = function() {
    loginActive.classList.add("active");
    signupActive.classList.remove("active");
    loadLoginForm();
};

// on signup btn click
signupBtn.onclick = function() {
    loginActive.classList.remove("active");
    signupActive.classList.add("active");
    loadSignupForm();
};

// Initial load based on the state of the buttons
if (loginBtn.checked) {
    loadLoginForm();
} else if (signupBtn.checked) {
    loadSignupForm();
}

// frequently Asked question block logic
document.querySelectorAll('.Frequently-Asked-question-block').forEach(questionBlock => {
    questionBlock.addEventListener('click', function() {
        const solution = questionBlock.nextElementSibling;
        const icon = questionBlock.querySelector('.down-icon');

        // Check if the clicked solution is already active
        const isActive = solution.classList.contains('active-solution');

        // Close all solutions
        document.querySelectorAll('.solution').forEach(solution => {
            solution.classList.remove('active-solution');
            solution.style.maxHeight = null;
        });
        // Reset all icons to down arrow
        document.querySelectorAll('.down-icon').forEach(otherIcon => {
            otherIcon.classList.add('fa-angle-down');
            otherIcon.classList.remove('fa-angle-up');
        });

        // If the clicked solution was not active, open it
        if (!isActive) {
            icon.classList.add('fa-angle-up');
            icon.classList.remove('fa-angle-down');
            solution.classList.add('active-solution');
        }
    });
});