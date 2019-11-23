const ProblemPage = {
    updateCommentPoints(commentId, problemId, a) {
        Database.updateCommentPoints(problemId, commentId, a);
        this.render(problemId);
    },
    updateProblemPoints(problemId, a) {
        Database.updateProblemPoints(problemId, a);
        this.render(problemId);
    },
    addComment(problemId) {
        const commentContent = document.querySelector('#textarea-comment').value;
        if (commentContent) {
            Database.addComment(problemId, commentContent);
            this.render(problemId);
        }
    },
    renderBadges(problem) {
        let s = '';
        problem.badges.forEach(badge => {
            s += `<a href="#" class="badge badge-dark">${badge.toUpperCase()}</a> `
        });
        return s;
    },
    renderComments(problem) {
        let s = '';
        problem.comments.forEach(comment => {
            s += `
                <div class="pl-4 mb-3 bg-white d-flex align-items-center">
                    <div class="vote mr-4">
                        <a href="#" class="vote__plus" onclick="event.preventDefault(); ProblemPage.updateCommentPoints(${comment.id}, ${problem.id}, ${1})">
                            <i class="fas fa-chevron-up"></i>
                        </a>
                        <div class="vote__value">${comment.points}</div>
                        <a href="#" class="vote__minus" onclick="event.preventDefault(); ProblemPage.updateCommentPoints(${comment.id}, ${problem.id}, ${-1})">
                            <i class="fas fa-chevron-down"></i>
                        </a>
                    </div>
                    <p>${comment.content}</p>
                </div>
                `
        })
        return s;
    },
    renderCommentForm(problem) {
        return `
                    <div class="my-3 p-3 bg-white rounded shadow-sm">
                        <div class="row">
                            <div class="col-12">
                                <form action="">
                                    <div class="form-group">
                                        <h3>Ваш ответ:</h3>
                                        <textarea class="form-control" id="textarea-comment" rows="3"></textarea>
                                    </div>
                                    <button id="add-comment-btn" onclick="event.preventDefault(); ProblemPage.addComment(${problem.id})" type="submit" class="btn btn-primary">
                                        Комментировать
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                `
    },
    render(problemId) {
        document.querySelector('.logo').addEventListener('click', () => {
            HomePage.render();
        });
        const problem = Database.getProblems().find(item => item.id === problemId);
        document.querySelector('.content-container').innerHTML =
            `
                <div class="row mt-5 mb-5">
                    <div class="col-8 offset-2 text-center">
                        <h2>${problem.title}</h2>
                        ${this.renderBadges(problem)}
                    </div>
                </div>
                <div class="pl-4 bg-white d-flex align-items-center">
                    <div class="vote mr-4">
                        <a href="#" class="vote__plus" onclick="event.preventDefault(); ProblemPage.updateProblemPoints(${problem.id}, ${1})">
                            <i class="fas fa-chevron-up"></i>
                        </a>
                        <div class="vote__value">${problem.points}</div>
                        <a href="#" class="vote__minus" onclick="event.preventDefault(); ProblemPage.updateProblemPoints(${problem.id}, ${-1})">
                            <i class="fas fa-chevron-down"></i>
                        </a>
                    </div>
                    <p>${problem.content}</p>
                </div>
                <h2 class="mt-3 text-center">Комментарии: ${problem.comments.length}</h2>
                <div>${this.renderComments(problem)}</div>
                ${this.renderCommentForm(problem)}
            `;
    }
}