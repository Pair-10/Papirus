let storedToken = localStorage.getItem('Token');
export const token = storedToken ? storedToken : "";

// localStorage'da token güncellendiğinde yeni değeri almak için bir dinleyici ekler
window.addEventListener('storage', () => {
    storedToken = localStorage.getItem('Token');
});
