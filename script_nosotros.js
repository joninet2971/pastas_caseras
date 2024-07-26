document.querySelectorAll('.carousel-icons div').forEach(icon => {
    icon.addEventListener('click', () => {
        document.querySelectorAll('.card').forEach(card => card.classList.remove('active'));
        document.getElementById(`card-${icon.getAttribute('data-card')}`).classList.add('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const words = document.querySelectorAll('.word');

    words.forEach((word, index) => {
        setTimeout(() => {
            word.style.transform = 'translateX(150px)';
            word.style.transition = 'transform 4s';
        }, index * 1000);
    });
});

