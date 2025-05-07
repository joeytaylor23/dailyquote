document.addEventListener('DOMContentLoaded', () => {
  const quoteText = document.getElementById('quote');
  const authorText = document.getElementById('author');
  const newQuoteBtn = document.getElementById('new-quote');
  const speakBtn = document.getElementById('speak-quote');

  async function getQuote() {
    quoteText.textContent = 'Loading...';
    authorText.textContent = '';

    try {
      const res = await fetch('https://api.quotable.io/random');
      const data = await res.json();
      quoteText.textContent = `"${data.content}"`;
      authorText.textContent = `— ${data.author}`;
    } catch (error) {
      quoteText.textContent = 'Sorry, failed to load quote.';
      console.error(error);
    }
  }

  function speakQuote() {
    const quote = quoteText.textContent;
    const author = authorText.textContent;
    const speech = new SpeechSynthesisUtterance(`${quote} ${author}`);
    window.speechSynthesis.speak(speech);
  }

  newQuoteBtn.addEventListener('click', getQuote);
  speakBtn.addEventListener('click', speakQuote);

  getQuote();
});