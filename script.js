/* ============================================================
 YENOVA HR SOLUTIONS — JavaScript Interactions
 ============================================================ */

(function () {
 'use strict';

 /* ---------- DOM Elements ---------- */
 const navbar = document.getElementById('navbar');
 const hamburger = document.getElementById('hamburger');
 const mobileNav = document.getElementById('mobileNav');
 const mobileLinks = document.querySelectorAll('.mobile-nav-link');
 const contactForm = document.getElementById('contactForm');
 const formSuccess = document.getElementById('formSuccess');

 /* ---------- Navbar Scroll ---------- */
 function handleNavbarScroll() {
 if (window.scrollY > 50) {
 navbar.classList.add('scrolled');
 } else {
 navbar.classList.remove('scrolled');
 }
 }

 window.addEventListener('scroll', handleNavbarScroll, { passive: true });
 handleNavbarScroll();

 /* ---------- Mobile Menu ---------- */
 function openMobileMenu() {
 hamburger.classList.add('active');
 mobileNav.classList.add('active');
 document.body.style.overflow = 'hidden';
 }

 function closeMobileMenu() {
 hamburger.classList.remove('active');
 mobileNav.classList.remove('active');
 document.body.style.overflow = '';
 }

 hamburger.addEventListener('click', function () {
 if (hamburger.classList.contains('active')) {
 closeMobileMenu();
 } else {
 openMobileMenu();
 }
 });

 mobileLinks.forEach(function (link) {
 link.addEventListener('click', function () {
 closeMobileMenu();
 });
 });

 document.addEventListener('click', function (e) {
 if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
 closeMobileMenu();
 }
 });

 /* ---------- Active Nav Link ---------- */
 function setActiveNavLink() {
 const currentPath = window.location.pathname;
 const pageName = currentPath.split('/').pop() || 'index.html';

 document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(function (link) {
 const href = link.getAttribute('href');
 if (href === pageName) {
 link.classList.add('active');
 } else {
 link.classList.remove('active');
 }
 });
 }

 setActiveNavLink();

 /* ---------- Scroll Reveal ---------- */
 function revealOnScroll() {
 const reveals = document.querySelectorAll('.reveal');
 const windowHeight = window.innerHeight;
 const revealPoint = 100;

 reveals.forEach(function (el) {
 const elementTop = el.getBoundingClientRect().top;
 if (elementTop < windowHeight - revealPoint) {
 el.classList.add('visible');
 }
 });
 }

 window.addEventListener('scroll', revealOnScroll, { passive: true });

 // Initial check
 setTimeout(revealOnScroll, 100);

 /* ---------- Contact Form Validation ---------- */
 function showError(id) {
 var errorEl = document.getElementById(id + 'Error');
 var inputEl = document.getElementById(id);
 if (errorEl) errorEl.classList.add('visible');
 if (inputEl) inputEl.classList.add('error');
 }

 function clearError(id) {
 var errorEl = document.getElementById(id + 'Error');
 var inputEl = document.getElementById(id);
 if (errorEl) errorEl.classList.remove('visible');
 if (inputEl) inputEl.classList.remove('error');
 }

 function clearAllErrors() {
 ['fullName', 'workEmail', 'phone', 'interest', 'message'].forEach(function (id) {
 clearError(id);
 });
 }

 function validateEmail(email) {
 return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
 }

 if (contactForm) {
 // Real-time clear on input
 ['fullName', 'workEmail', 'phone', 'interest', 'message'].forEach(function (id) {
 var el = document.getElementById(id);
 if (el) {
 el.addEventListener('input', function () { clearError(id); });
 el.addEventListener('change', function () { clearError(id); });
 }
 });

 contactForm.addEventListener('submit', function (e) {
 e.preventDefault();
 clearAllErrors();

 var isValid = true;
 var fullName = document.getElementById('fullName');
 var workEmail = document.getElementById('workEmail');
 var phone = document.getElementById('phone');
 var interest = document.getElementById('interest');
 var message = document.getElementById('message');

 if (!fullName || !fullName.value.trim()) {
 showError('fullName');
 isValid = false;
 }

 if (!workEmail || !workEmail.value.trim() || !validateEmail(workEmail.value.trim())) {
 showError('workEmail');
 isValid = false;
 }

 if (!phone || !phone.value.trim()) {
 showError('phone');
 isValid = false;
 }

 if (!interest || !interest.value) {
 showError('interest');
 isValid = false;
 }

 if (!message || !message.value.trim()) {
 showError('message');
 isValid = false;
 }

 if (isValid) {
 // Hide form, show success
 contactForm.style.display = 'none';
 if (formSuccess) formSuccess.classList.add('visible');

 // Scroll to success message
 formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
 }
 });
 }

 /* ---------- Smooth Scroll for Anchor Links ---------- */
 document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
 anchor.addEventListener('click', function (e) {
 e.preventDefault();
 var target = document.querySelector(this.getAttribute('href'));
 if (target) {
 target.scrollIntoView({ behavior: 'smooth' });
 }
 });
 });

})();
