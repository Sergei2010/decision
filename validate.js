// @ts-nocheck
// Существуют разные способы получить DOM-узел; здесь мы определяем саму форму и
// поле ввода email и элемент span, в который поместим сообщение об ошибке
const form = document.getElementsByTagName('form')[0];

const password = document.getElementById('password');
const passwordError = document.querySelector('#password + span.error');

password.addEventListener('input', function (event) {
	// Каждый раз, когда пользователь что-то вводит,
	// мы проверяем, являются ли поля формы валидными

	if (password.validity.valid) {
		// Если на момент валидации какое-то сообщение об ошибке уже отображается,
		// если поле валидно, удаляем сообщение
		passwordError.textContent = ''; // Сбросить содержимое сообщения
		passwordError.className = 'error'; // Сбросить визуальное состояние сообщения
	} else {
		// Если поле не валидно, показываем правильную ошибку
		showError();
	}
});

form.addEventListener('submit', function (event) {
	// Если поле email валидно, позволяем форме отправляться

	if (!email.validity.valid) {
		// Если поле email не валидно, отображаем соответствующее сообщение об ошибке
		showError();
		// Затем предотвращаем стандартное событие отправки формы
		event.preventDefault();
	}
});

function showError() {
	if (password.validity.valueMissing) {
		// Если поле пустое,
		// отображаем следующее сообщение об ошибке
		passwordError.textContent = 'Необходимо ввести пароль';
	} else if (password.validity.typeMismatch) {
		// Если поле содержит не email-адрес,
		// отображаем следующее сообщение об ошибке
		emailError.textContent = 'Пароль должен быть не менее 6 символов';
	} else if (email.validity.tooShort) {
		// Если содержимое слишком короткое,
		// отображаем следующее сообщение об ошибке
		passwordError.textContent = `Пароль должен содержать  ${password.minLength} characters; Вы ввели ${password.value.length}.`;
	}

	// Задаём соответствующую стилизацию
	passwordError.className = 'error active';
}
