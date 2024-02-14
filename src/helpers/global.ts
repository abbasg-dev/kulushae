export const setLanguagePreference = (lang: string) => {
    localStorage.setItem('selectedLanguage', lang);
}

export const getLanguagePreference = () => {
    return localStorage.getItem('selectedLanguage') || 'en';
}

export const formatNumberWithCommas = (val: number) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const hidePhoneNumber = (number) => {
    // Splitting the phone number into different parts
    const country = number.substring(0, 3);
    const area = number.substring(3, 6);
    const local = number.substring(6);

    // Hiding the area code
    const hiddenArea = area.replace(/./g, '*');

    // Hiding the local number
    const hiddenLocal = local.replace(/./g, '*');

    // Combining the hidden parts with the country code
    const hiddenNumber = country + hiddenArea + hiddenLocal;
    
    return hiddenNumber;
}
