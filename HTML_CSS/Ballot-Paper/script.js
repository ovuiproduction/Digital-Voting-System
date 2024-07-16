document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.ballot-paper-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Reset all lights to red
            const allLights = document.querySelectorAll('.ballot-indication-light');
            allLights.forEach(light => {
                light.classList.remove('active');
            });

            // Find the closest li element
            const li = button.closest('li');
            if (li) {
                // Find the ballot-indication-light within this li and set it to green
                const light = li.querySelector('.ballot-indication-light');
                if (light) {
                    light.classList.add('active');
                }
            }
        });
    });
});
