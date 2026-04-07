const faqList = document.getElementById("faq-list");
const faqModal = document.getElementById("faq-modal");
const openFaqFormButton = document.getElementById("open-faq-form");
const closeFaqFormButton = document.getElementById("close-faq-form");
const faqForm = document.getElementById("faq-form");

const faqs = [
  {
    question:
      "How does Slack protect the security of my data when using AI features?",
    answer:
      "AI in Slack runs in trusted infrastructure, does not use customer data to train public models, and keeps your information inside secure systems designed for business use.",
  },
  {
    question:
      "How can I pay for Slack? Can I pay by credit card, or can you invoice me?",
    answer:
      "Slack supports self-serve card payments for smaller teams and sales-led invoicing options for larger organizations.",
  },
  {
    question:
      "We want to add new users to our workspace. How will that be billed?",
    answer:
      "New users are typically added on a prorated basis, so your invoice reflects the time left in the current billing cycle.",
  },
];

const toggleFaq = function (button) {
  const item = button.closest(".faq-item");
  const isOpen = item.dataset.open === "true";
  item.dataset.open = isOpen ? "false" : "true";
};

const renderFaqs = () => {
  faqList.innerHTML = "";

  faqs.forEach((faq) => {
    faqList.innerHTML += `
      <div class="faq-item" data-open="false">
        <button class="faq-trigger" onclick="toggleFaq(this)" type="button">
          <span class="faq-question">${faq.question}</span>
          <span class="faq-icon">⌄</span>
        </button>
        <div class="faq-answer">${faq.answer}</div>
      </div>
    `;
  });
};

openFaqFormButton.addEventListener("click", () => {
  faqModal.classList.remove("hidden");
  faqModal.classList.add("flex");
});

closeFaqFormButton.addEventListener("click", () => {
  faqModal.classList.add("hidden");
  faqModal.classList.remove("flex");
  faqForm.reset();
});

faqForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const question = faqForm.question.value.trim();
  const answer = faqForm.answer.value.trim();

  if (!question || !answer) {
    return;
  }

  faqs.push({ question, answer });
  renderFaqs();

  faqModal.classList.add("hidden");
  faqModal.classList.remove("flex");
  faqForm.reset();
});

renderFaqs();
