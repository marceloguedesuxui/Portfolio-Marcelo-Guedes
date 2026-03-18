
document.addEventListener("DOMContentLoaded", () => {
    const introText = document.querySelector(".hero-text .intro-text");
    if (!introText) return;

    introText.setAttribute("aria-label", introText.innerText);

    const nodes = Array.from(introText.childNodes);
    introText.innerHTML = ""; 

    let charIndex = 0;

    nodes.forEach((node, index) => {
        let text = node.textContent;
        
        if (index === 0) text = text.trimStart();
        
        if (index === nodes.length - 1) text = text.trimEnd();
        
        if (node.nodeType === Node.TEXT_NODE) {
            processText(text, introText);
        } else if (node.nodeName === "STRONG") {
            const strong = document.createElement("strong");
            introText.appendChild(strong);
            processText(text, strong);
        }
    });

    function processText(text, parent) {
        if (text.trim() === "" && text.length > 0) {
            const span = document.createElement("span");
            span.textContent = "\u00A0";
            span.className = "stagger-char-intro";
            span.style.setProperty("--char-index", charIndex);
            parent.appendChild(span);
            charIndex++;
            return;
        }

        const chars = text.split("");
        chars.forEach(char => {
            const span = document.createElement("span");
            span.textContent = char === " " ? "\u00A0" : char;
            span.className = "stagger-char-intro";
            span.style.setProperty("--char-index", charIndex);
            parent.appendChild(span);
            charIndex++;
        });
    }

    setTimeout(() => {
        introText.classList.add("animate-start");
    }, 5200);
});
