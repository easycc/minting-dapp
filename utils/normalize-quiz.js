module.exports.quizToArrays = function (quiz) {
	let processedQuiz = quiz;

	for (let language of Object.keys(processedQuiz.locales)) {
		processedQuiz.locales[language].blocks = Object.values(processedQuiz.locales[language].blocks);
		processedQuiz.locales[language].blocks = processedQuiz.locales[language].blocks.map(block => {
			let questions = Object.values(block.questions);

			questions = questions.map(question => {
				if (question.answers) {
					let answers = Object.values(question.answers);

					return { ...question, answers };
				}
				return question;
			});

			return { ...block, questions, previewVisited: false };
		});
	}

	return processedQuiz;
};

module.exports.quizToObjects = function (quiz) {
	let processedQuiz = quiz;

	for (let language of Object.keys(processedQuiz.locales)) {
		processedQuiz.locales[language].blocks = processedQuiz.locales[language].blocks.map(block => {
			let { questions } = block;

			block.questions = questions.map(question => {
				if (question.answers && question.answers.length) {
					let answers = { ...question.answers };

					return { ...question, answers };
				}
				return question;
			});

			questions = { ...block.questions };

			return { ...block, questions };
		});

		processedQuiz.locales[language].blocks = { ...processedQuiz.locales[language].blocks };
	}

	return processedQuiz;
};
