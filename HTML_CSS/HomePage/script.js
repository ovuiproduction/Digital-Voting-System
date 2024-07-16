let imageSource = [
    './image/coursel-image-1.jpg',
    './image/coursel-image-2.png',
    './image/coursel-image-1.jpg'
];

let leftSlideBtn = document.getElementById('leftSlideBtn');
let rightSlideBtn = document.getElementById('rightSlideBtn');

let i = 0;

leftSlideBtn.onclick = function() {
    i = (i - 1 + imageSource.length) % imageSource.length;
    document.getElementsByClassName('home-coursel-div')[0].style.backgroundImage = `url(${imageSource[i]})`;
};

rightSlideBtn.onclick = function() {
    i = (i + 1) % imageSource.length;
    document.getElementsByClassName('home-coursel-div')[0].style.backgroundImage = `url(${imageSource[i]})`;
};

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