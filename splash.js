document.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splash-screen');


    if (splash) {

        setTimeout(() => {
            splash.classList.add('hidden');

            setTimeout(() => {
                splash.remove();
            }, 1000);
        }, 4200);
    }
});
