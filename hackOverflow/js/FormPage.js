const FormPage = {
	addProblem() {
		const problemTitle = document.querySelector("#problem-title").value;
		const problemText = document.querySelector("#problem-text").value;
		const problemKeywords = document.querySelector("#problem-keywords").value;
		if (problemText && problemText && problemKeywords) {
			Database.addProblem(problemTitle, problemText, problemKeywords);
			HomePage.render();
		}
	},
	render() {
		document.querySelector(".logo").addEventListener('click', () => {
			HomePage.render();
		});
		document.querySelector(".content-container").innerHTML =
			`
			<div class="row mt-5 mb-5">
				<div class="col-8 offset-2 text-center">
					<h2>Задать вопрос</h2>
				</div>
			</div>
			<div class="my-3 p-3 bg-white rounded shadow-sm">
				<div class="row">
					<div class="col-12">
						<form action="">
							<div class="form-group">
								<input id="problem-title" class="form-control" type="text" placeholder="Название вопроса">
							</div>
							<div class="form-group">
								<input id="problem-keywords" class="form-control" type="text" placeholder="Через запятую перечислите ключевые слова">
							</div>
							<div class="form-group">
								<textarea id="problem-text" class="form-control" rows="3" placeholder="Текст вопроса"></textarea>
							</div>
							<button id="add-problem" onclick="event.preventDefault(); FormPage.addProblem()" type="submit" class="btn btn-primary">
								Задать вопрос
							</button>
						</form>
					</div>
				</div>
			</div>
		`;
	}
}