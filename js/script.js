// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Fungsi Pesan Sambutan Dinamis ---
    const greetingMessageElement = document.getElementById('greeting-message');
    if (greetingMessageElement) {
        // Meminta nama pengguna
        const userName = prompt("Halo! Silakan masukkan nama Anda:");
        if (userName) {
            greetingMessageElement.textContent = `Hi ${userName}, Selamat Datang di Website!`;
        } else {
            greetingMessageElement.textContent = `Hi Pengunjung, Selamat Datang di Website!`;
        }
    }

    // --- 2. Navigasi Halaman ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const pageSections = document.querySelectorAll('.page-section');
    const hamburger = document.querySelector('.hamburger');
    const mobileNavLinks = document.querySelector('.nav-links');

    // Fungsi untuk menampilkan halaman yang dipilih
    const showPage = (pageId) => {
        pageSections.forEach(section => {
            section.classList.remove('active'); // Sembunyikan semua section
        });
        const activeSection = document.getElementById(pageId);
        if (activeSection) {
            activeSection.classList.add('active'); // Tampilkan section yang sesuai
        }

        // Hapus kelas 'active' dari semua link navigasi
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        // Tambahkan kelas 'active' ke link yang diklik
        const clickedLink = document.querySelector(`.nav-links a[data-page="${pageId}"]`);
        if (clickedLink) {
            clickedLink.classList.add('active');
        }
    };

    // Tambahkan event listener ke setiap link navigasi
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Mencegah perilaku default link
            const pageId = event.target.dataset.page; // Ambil ID halaman dari data-page attribute
            showPage(pageId);

            // Sembunyikan menu mobile setelah link diklik (jika aktif)
            if (mobileNavLinks.classList.contains('active')) {
                mobileNavLinks.classList.remove('active');
            }
        });
    });

    // Event listener untuk hamburger menu (mobile)
    hamburger.addEventListener('click', () => {
        mobileNavLinks.classList.toggle('active');
    });

    // Tampilkan halaman 'home' secara default saat pertama kali dimuat
    showPage('home');

    // --- 3. Validasi Formulir dan Tampilan Data ---
    const messageUsForm = document.getElementById('message-us-form');
    const formOutput = document.getElementById('form-output');
    const outputData = document.getElementById('output-data');

    if (messageUsForm) {
        messageUsForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Mencegah pengiriman formulir default

            // Ambil elemen input
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const messageInput = document.getElementById('message');

            // Ambil elemen pesan error
            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const phoneError = document.getElementById('phone-error');
            const messageError = document.getElementById('message-error');

            // Reset pesan error sebelumnya
            nameError.textContent = '';
            emailError.textContent = '';
            phoneError.textContent = '';
            messageError.textContent = '';

            let isValid = true; // Flag validasi

            // Validasi Nama
            if (nameInput.value.trim() === '') {
                nameError.textContent = 'Nama tidak boleh kosong.';
                isValid = false;
            }

            // Validasi Email
            if (emailInput.value.trim() === '') {
                emailError.textContent = 'Email tidak boleh kosong.';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                emailError.textContent = 'Format email tidak valid.';
                isValid = false;
            }

            // Validasi Nomor Telepon (contoh sederhana: hanya angka)
            if (phoneInput.value.trim() === '') {
                phoneError.textContent = 'Nomor telepon tidak boleh kosong.';
                isValid = false;
            } else if (!/^\d+$/.test(phoneInput.value)) { // Hanya angka
                phoneError.textContent = 'Nomor telepon hanya boleh berisi angka.';
                isValid = false;
            }

            // Validasi Pesan
            if (messageInput.value.trim() === '') {
                messageError.textContent = 'Pesan tidak boleh kosong.';
                isValid = false;
            }

            // Jika semua validasi berhasil
            if (isValid) {
                // Kumpulkan data formulir
                const formData = {
                    Nama: nameInput.value.trim(),
                    Email: emailInput.value.trim(),
                    'Nomor Telepon': phoneInput.value.trim(),
                    Pesan: messageInput.value.trim()
                };

                // Tampilkan data di area output
                outputData.textContent = JSON.stringify(formData, null, 2); // Format JSON dengan indentasi 2 spasi
                formOutput.style.display = 'block'; // Tampilkan area output

                // Opsional: Reset formulir setelah pengiriman
                messageUsForm.reset();
            } else {
                formOutput.style.display = 'none'; // Sembunyikan output jika ada error
            }
        });
    }
});
