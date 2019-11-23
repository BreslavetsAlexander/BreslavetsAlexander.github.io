const HomePage = {
    goToFormPage() {
        FormPage.render();
    },
    goToProblemPage(problemId) {
        ProblemPage.render(problemId);
        Database.updateProblemViewsNumber(problemId);
    },
    render() {
        document.querySelector(".content-container").innerHTML =
            `
            <div class="text-center new-problem-button mb-4">
                <a href="#" class="btn btn-secondary" onclick="HomePage.goToFormPage()">Задать вопрос</a>
            </div>
            <div id="problems-container"></div>
        `;
        Database.getProblems().forEach(problem => {
            document.querySelector("#problems-container").innerHTML +=
                `
                <div class="my-3 p-3 bg-white rounded shadow-sm">
                    <div class="row">
                        <div class="col-1 text-muted">
                            <div class="rate">
                                <div class="rate__value">${problem.points}</div>
                                <div class="rate__name">Голосов</div>
                            </div>
                        </div>
                        <div class="col-1 text-muted">
                            <div class="rate">
                                <div class="rate__value">${problem.comments.length}</div>
                                <div class="rate__name">Ответов</div>
                            </div>
                        </div>
                        <div class="col-1 text-muted">
                            <div class="rate">
                                <div class="rate__value">${problem.viewsNumber}</div>
                                <div class="rate__name">Просмотров</div>
                            </div>
                        </div>
                        <div class="col pl-5">
                            <div>
                                <h5 onclick="HomePage.goToProblemPage(${problem.id})">
                                    <a href="#">${problem.title}</a>
                                </h5>
                                <div>${ProblemPage.renderBadges(problem)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        })
    }
}

HomePage.render();