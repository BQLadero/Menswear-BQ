function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'es', includedLanguages: 'en,es', 
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE, gaTrack: true }, 
        'google_translate_element');
}