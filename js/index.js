// @ts-nocheck
function validation(form) {
	function createError(input, text) {
		const errorLi = input.parentNode.parentNode.querySelector('.form-error');
		errorLi.classList.add('form-error-show');
		console.log(errorLi);
	}

	let result = true;

	const allInputes = form.querySelectorAll('input');
	for (const input of allInputes) {
		if (input.value == "") {
			createError(input, 'Поле не заполнено!');
			result = false;
		}
	}


	return result;
}

document.getElementById('add-form').addEventListener('submit', function (event) {
	event.preventDefault();

	if (validation(this) == true) {
		alert('Форма проверена успешно!');
	}
});