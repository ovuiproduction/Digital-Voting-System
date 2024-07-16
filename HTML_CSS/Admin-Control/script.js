// Select all elements with the class 'menuBtn' and add an onclick event to each
document.querySelectorAll('.menuBtn').forEach(button => {

    button.onclick = function() {
        if(document.querySelector('#menuPage').style.display == 'block'){
            document.querySelector('#menuPage').style.display = 'none';
        }else{
        document.querySelector('#menuPage').style.display = 'block';
        }
    };
});

// Select the element with the id 'menuExitBtn' and add an onclick event
document.querySelector('#menuExitBtn').onclick = function() {
    document.querySelector('#menuPage').style.display = 'none';
};

document.querySelectorAll('.control-option-block button').forEach(button => {
    button.addEventListener('click', function() {
        // Remove 'active' class from all buttons
        document.querySelectorAll('.control-option-block button').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add 'active' class to the clicked button
        this.classList.add('active');
    });
});