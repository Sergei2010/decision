// @ts-nocheck
function validation(form) {
	function removeError(input) {
		const errorLi = input.parentNode.parentNode.querySelector('.form-error');
		if (errorLi.classList.contains('form-error-show')) {
			errorLi.classList.remove('form-error-show');
		}
	}
	function createError(input, text) {
		const errorLi = input.parentNode.parentNode.querySelector('.form-error');
		errorLi.classList.add('form-error-show');
		errorLi.textContent = text;
	}

	function comparePswd(input) {
		let pswd1 = document.getElementById('pswd1');
		let pswd2 = input;
		if (pswd1.value !== pswd2.value) {
			createError(input, 'Пароли не совпадают');
		} else { console.log('Пароли совпадают'); }
	}

	let result = true;

	const allInputes = form.querySelectorAll('input');
	for (const input of allInputes) {
		removeError(input);
		/* CONFIRM PASSWORD */
		if (input.dataset.compare == "true") {
			let pswd1 = document.getElementById('pswd1');
			/* PSWD2, если в диапазоне PSWD1 */
			if (pswd1.value.length > (pswd1.dataset.minLength - 1) || pswd1.value.length < (pswd1.dataset.maxLength - 1)) {
				input.setAttribute('required', 'true');
				input.setAttribute('data-compare', 'false');
				createError(input, 'Поле не заполнено!');
			}
			/* PSWD2, если НЕ в диапазоне PSWD1 */
			if (pswd1.value.length < (pswd1.dataset.minLength - 1) || pswd1.value.length > (pswd1.dataset.maxLength - 1)) {
				removeError(input);
				input.setAttribute('required', 'false');
				console.log('input:', input);
			}
		}

		/* if (input.dataset.compare == 'false' && input.value.length === 0) {
			input.setAttribute('required', 'false');
		}

		if (input.dataset.compare == 'false' && input.value.length !== 0) {
			removeError(input);
			comparePswd(input);
		} */
		/* MIN LENGTH PASSWORD */
		if (input.dataset.minLength) {

			if (input.value.length < input.dataset.minLength) {
				removeError(input);
				createError(input, `Минимальное количество символов: ${input.dataset.minLength}`);
				result = false;
			}
		}
		/* MAX LENGTH PASSWORD */
		if (input.dataset.maxLength) {

			if (input.value.length > input.dataset.maxLength) {
				removeError(input);
				createError(input, `Максимальное количество символов: ${input.dataset.maxLength}`);
				result = false;
			}
		}
		/* REQUIRED */
		if (input.dataset.required == "true") {

			if (input.value == "") {
				removeError(input);
				createError(input, 'Поле не заполнено!');
				result = false;
			}
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