
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