// Q&A Form Submission
const qnaForm = document.getElementById('qna-form');
const questionsList = document.querySelector('.questions-list');

if (qnaForm) {
    qnaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('question-title').value;
        const content = document.getElementById('question-content').value;

        const newQuestion = document.createElement('div');
        newQuestion.classList.add('question');
        newQuestion.innerHTML = `
            <h3 class="question-title">${title}</h3>
            <p class="question-author">Posted by <span>You</span> on <span>${new Date().toLocaleDateString()}</span></p>
            <p class="question-content">${content}</p>
        `;

        questionsList.prepend(newQuestion);
        qnaForm.reset();
    });
}

// Comment Form Submission
const commentForm = document.getElementById('comment-form');
const commentsList = document.querySelector('.comments-list');

if (commentForm) {
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const content = document.getElementById('comment-content').value;

        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        newComment.innerHTML = `
            <p class="comment-author">Posted by <span>You</span> on <span>${new Date().toLocaleDateString()}</span></p>
            <p class="comment-content">${content}</p>
        `;

        commentsList.prepend(newComment);
        commentForm.reset();
    });
}