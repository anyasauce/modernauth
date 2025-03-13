// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-in-out'
});

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const form = document.getElementById('loginForm');
    const captchaInput = document.getElementById('captchaResult');
    const loginButton = document.getElementById('loginButton');
    const num1Element = document.getElementById('num1');
    const num2Element = document.getElementById('num2');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('floatingPassword');
    const captchaSuccess = document.getElementById('captchaSuccess');

    const num1 = Math.floor(Math.random() * 50) + 1;
    const num2 = Math.floor(Math.random() * 50) + 1;
    num1Element.textContent = num1;
    num2Element.textContent = num2;
    const captchaSum = num1 + num2;

    captchaInput.addEventListener('input', function () {
        if (parseInt(captchaInput.value) === captchaSum) {
            loginButton.disabled = false;
            captchaInput.classList.add('captcha-valid');
            captchaSuccess.classList.add('active');
        } else {
            loginButton.disabled = true;
            captchaInput.classList.remove('captcha-valid');
            captchaSuccess.classList.remove('active');
        }
    });

    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.innerHTML = type === 'password' ? '<i class="bi bi-eye-slash"></i>' : '<i class="bi bi-eye"></i>';
    });

    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add('was-validated');
        } else if (parseInt(captchaInput.value) !== captchaSum) {
            event.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Captcha Failed',
                text: 'Please solve the captcha correctly.',
                confirmButtonColor: '#4f8df9',
                background: '#1e1e1e',
                color: '#f5f5f5'
            });
        } else {
            event.preventDefault();
            loginButton.classList.add('loading');

            setTimeout(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'Welcome back to SmartHome Iloilo!',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    background: '#1e1e1e',
                    color: '#f5f5f5'
                }).then(() => {
                    form.submit();
                });
            }, 1000);
        }
    });

    const slideUpElements = document.querySelectorAll('.slide-up');
    slideUpElements.forEach(element => {
        element.classList.add('active');
    });


    document.getElementById('forgotPasswordForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const button = this.querySelector('button');
        button.classList.add('loading');

        setTimeout(() => {
            button.classList.remove('loading');
            alert('Reset link sent to your email!');
            const modal = bootstrap.Modal.getInstance(document.getElementById('forgotPasswordModal'));
            modal.hide();
        }, 2000);
    });
});

