function closeModal() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('heroVideo');
    video.pause();
    video.currentTime = 0;
    modal.classList.add('hidden');
}
function toggleFAQ(item) {
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    answer.classList.toggle('hidden');
    icon.style.transform = answer.classList.contains('hidden')
        ? 'rotate(0deg)'
        : 'rotate(180deg)';
}