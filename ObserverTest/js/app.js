const html = document.querySelector('html');
const fotos = document.querySelectorAll('.foto');
const titulo = document.querySelector('.titulo');
const darkMode = document.querySelector('#darkmode');

const obsOptions = {
    root: null,
    rootMargin: "0px",
    threshold: [0, 0.5]
}
document.addEventListener('DOMContentLoaded', () => {
    const isDark = JSON.parse( localStorage.getItem('isDark') );

    toggleDark(isDark);
});

window.onload = () => {
    const footer = document.querySelector('footer');
    window.scrollTo(0,0);
    footer.classList.remove('hidden');

    const observer = new IntersectionObserver(intersect, obsOptions);

    observer.observe(titulo);
    fotos.forEach(entry => {
        observer.observe(entry);
    });
}

darkMode.addEventListener('click', event => {
    if(html.classList.contains("dark")) {
        localStorage.setItem('isDark', 'false');
        toggleDark(false);
        return;
    }
    localStorage.setItem('isDark', 'true');
    toggleDark(true);
    
});

function intersect(entries) {
    entries.forEach(entry => {
        const element = entry.target;

        if(entry.boundingClientRect.top > entry.rootBounds.height) { //Desaparece con el scroll hacia arriba

            element.classList.remove("animate__animated", "animate__fadeInDown", "animate__backInLeft");
            element.classList.add("opacity-0");
            return;
        }
       
        if(entry.intersectionRatio >= 0.5 && entry.boundingClientRect.top > 0){ //Se ve el elemento
        
            element.classList.remove("opacity-0");

            if(element == titulo) {
                element.classList.add("animate__animated", "animate__fadeInDown");
                return;
            }

            element.classList.add("animate__animated", "animate__backInLeft");
        }
    });
}

function toggleDark(toggle) {
    if (toggle) {
        html.classList.add("dark");
        darkMode.firstElementChild.innerHTML = `<path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />`
        return;
    }
    html.classList.remove("dark");
    darkMode.firstElementChild.innerHTML = `<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />`
}