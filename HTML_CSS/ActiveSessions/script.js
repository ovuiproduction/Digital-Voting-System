document.addEventListener('DOMContentLoaded', function() {
    var customSelectWrapper = document.querySelector('.custom-select-wrapper');
    var selectSelected = document.querySelector('.select-selected');
    var selectItems = document.querySelector('.select-items');
    var originalSelect = document.querySelector('.custom-select');

    selectSelected.addEventListener('click', function() {
        selectItems.classList.toggle('select-hide');
        selectSelected.classList.toggle('select-arrow-active');
    });

    selectItems.addEventListener('click', function(e) {
        var target = e.target;
        if (target.tagName.toLowerCase() === 'div') {
            selectSelected.innerHTML = target.innerHTML;
            originalSelect.value = target.getAttribute('data-value');
            selectItems.classList.add('select-hide');
        }
    });

    document.addEventListener('click', function(e) {
        if (!customSelectWrapper.contains(e.target)) {
            selectItems.classList.add('select-hide');
        }
    });
});