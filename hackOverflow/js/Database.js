const Database = {
    problems: [{
            id: 1,
            title: 'Заголовок проблемы. На него можно нажать и перейти к описанию проблемы',
            content: 'Описание проблемы 1',
            points: 2,
            viewsNumber: 7,
            badges: ['js', 'json'],
            comments: [{
                    id: 1,
                    content: 'Можно комментировать',
                    points: 3,
                },
                {
                    id: 2,
                    content: 'Можно голосовать за комментарий',
                    points: 5
                },
            ]
        },
        {
            id: 2,
            title: 'Есть возможность задать вопрос',
            content: 'Описание проблемы 2',
            points: 5,
            viewsNumber: 3,
            badges: ['c++'],
            comments: []
        }
    ],
    addProblem(title, content, keywords) {
        this.problems.push({
            id: this.problems.length + 1,
            title,
            content,
            points: 0,
            viewsNumber: 0,
            badges: [...keywords.split(',')],
            comments: []
        });
        this.saveProblems();
    },
    addComment(problemId, content) {
        const problem = this.problems.find(item => item.id === problemId);
        problem.comments.push({
            id: Date.now() + problem.id,
            content,
            points: 0
        });
        this.saveProblems();
    },
    updateCommentPoints(problemId, commentId, a) {
        const problem = this.problems.find(item => item.id === problemId);
        const comment = problem.comments.find(item => item.id === commentId);
        comment.points += a;
        this.saveProblems();
    },
    updateProblemViewsNumber(problemId) {
        const problem = this.problems.find(item => item.id === problemId);
        problem.viewsNumber++;
        this.saveProblems();
    },
    updateProblemPoints(problemId, a) {
        const problem = this.problems.find(item => item.id === problemId);
        problem.points += a;
        this.saveProblems();
    },
    saveProblems() {
        localStorage.setItem('db', JSON.stringify(this.problems));
    },
    getProblems() {
        if (localStorage.getItem('db')) {
            this.problems = JSON.parse(localStorage.getItem('db'));
        }
        return this.problems;
    }
}