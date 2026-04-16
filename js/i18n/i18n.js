'use strict';

let translations = {};

function applyTranslations(locale) {
    const dictionary = translations[locale];
    if (!dictionary) {
        console.warn(`Translations for "${locale}" not found.`);
        return;
    }
    /* ---- Text content ---- */
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        const text = dictionary[key];
        if (text !== undefined) {
            element.innerHTML = text;
        }
    });
    /* ---- ALT attributes ---- */
    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
        const key = element.dataset.i18nAlt;
        if (dictionary[key]) 
            element.alt = dictionary[key];
        }
    );
    /* ---- TITLE attributes ---- */
    document.querySelectorAll('[data-i18ntitle]').forEach(element => {
        const key = element.dataset.i18nTitle;
        if (dictionary[key])
            element.title = dictionary[key];
        }
    );
    // Update document language for accessibility
    document.documentElement.lang = locale;
}

function switchLanguage(locale) {
    applyTranslations(locale);
    applyDateFormat(locale);
    localStorage.setItem('preferredLanguage', locale);
}

// Load translation file
fetch('/js/i18n/translations.json')
    .then(response => response.json())
    .then(data => {
        translations = data;
        // Retrieve saved language or default to English
        const savedLanguage =
        localStorage.getItem('preferredLanguage') || 'en';
        switchLanguage(savedLanguage);
    })
    .catch(error => {
        console.error('Failed to load translations:', error);
    });

//switchLanguage('es'); // Default to Spanish on initial load

function createDateFormatter(locale) {
    // Map application locale to regional formatting rules
    const dateLocale = locale === 'es' ? 'es-ES' : 'en-GB';
    // Create and return a reusable formatter
    return new Intl.DateTimeFormat(dateLocale, {
        weekday: 'long', // full weekday name
        year: 'numeric', // four-digit year
        month: 'long', // full month name
        day: 'numeric' // day number
    });
}

function formatDate(date, formatter) {
    return formatter.format(date);
}

function applyDateFormat(locale) {
    // Create formatter once (efficient and reusable)
    const formatter = createDateFormatter(locale);
    // Select all elements declaring a date
    const dateElements = document.querySelectorAll('[data-date]');
    dateElements.forEach(el => {
        // Read and sanitise the date string from HTML
        const dateStr = (el.dataset.date || '').trim();
        if (!dateStr) 
            return;
        // Convert ISO string into a Date object
        const date = new Date(dateStr);
        // Defensive validation
        if (isNaN(date)) {
            console.error('Invalid date in data-date:', dateStr);
            el.textContent = 'Invalid date';
            return;
        }
        // Apply formatting
        el.textContent = formatDate(date, formatter);
    });
}
