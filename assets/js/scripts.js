// ────────────────────────────────────────────────────────────────────────────────
//      Ofuscação de E-mail (Proteção contra Bots via Base64)
// ────────────────────────────────────────────────────────────────────────────────
const linkEmail = document.getElementById("contato-email");

if (linkEmail) {
    // "julio.gaiotto" e "gmail.com" codificados em Base64
    const u = atob("anVsaW8uZ2Fpb3R0bw==");
    const d = atob("Z21haWwuY29t");
    
    linkEmail.textContent = `${u}@${d}`;
    
    // Opcional: Se for um link <a>, atualiza o href ao interagir
    if (linkEmail.tagName === 'A') {
        linkEmail.addEventListener('mouseenter', () => {
            linkEmail.href = `mailto:${u}@${d}`;
        });
    }
}

// ────────────────────────────────────────────────────────────────────────────────
//      MENU TOGGLE (Com melhoria de acessibilidade)
// ────────────────────────────────────────────────────────────────────────────────
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
        const isActive = menu.classList.toggle('active');
        // Boa prática de acessibilidade (A11y)
        menuToggle.setAttribute('aria-expanded', isActive);
    });
}

// ────────────────────────────────────────────────────────────────────────────────
//      Efeito de iluminação nos cards (Otimizado via CSS Variables)
// ────────────────────────────────────────────────────────────────────────────────
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Passa a posição para o CSS tratar, evitando repaints pesados no JS
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});