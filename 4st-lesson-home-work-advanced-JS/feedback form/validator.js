class Validator {
    constructor(form) {
        this.patterns = {
            name: /[a-zА-Я]+$/i,
            phone: /^\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{4}$/,
            email: /^([a-z]{6})|([a-z]{2}\.[a-z]{4})|([a-z]{2}-[a-z]{4})@(mail\.ru)$/,
            text: /[a-zА-Я]+/i,
        }
        this.errors = {
            name: 'Имя должно содержать только буквы',
            phone: 'Телефон должен быть в формате +7(000)000-0000',
            email: 'E-mail должен иметь вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru',
            text: 'Здесь должен быть произвольный текст'
        }
        this.errorClass = 'error-msg';
        this.form = form;
        this.valid = false;
        this._validateForm();
    }

    _validateForm() {
        let formFields =
            [...document.getElementById(this.form).getElementsByTagName('input')];
        for (let field of formFields) {
            this._validate(field);
        }
    }

    _validate(field) {
        if (this.patterns[field.name]) {
            if (!this.patterns[field.name].test(field.value)) {
                field.classList.add('invalid');
                this._addErrorMsg(field);
            } else {
                field.classList.add('valid');

            }
        }
    }

    _addErrorMsg(field) {
        let error = `<div class="${this.errorClass}">${this.errors[field.name]}</div>`;
        field.parentNode.insertAdjacentHTML('beforeend', error);
    }
};