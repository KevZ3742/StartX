(function () {
    const favicon = document.getElementById("favicon");

    const darkFavicon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'%3E%3Cpath fill='white' d='M280.4 148.3L96 300.1V464c0 8.8 7.2 16 16 16l112-.3c8.8 0 16-7.2 16-16V368c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16v95.7c0 8.8 7.2 16 16 16l112 .3c8.8 0 16-7.2 16-16V300L295.7 148.3c-9.4-7.8-23-7.8-32.3 0zM571.6 251.5L488 182.6V44c0-6.6-5.4-12-12-12h-56c-6.6 0-12 5.4-12 12v72.6L318.5 43c-18.6-15.4-45.5-15.4-64.1 0L4.3 251.5C-4.2 258.7-1.3 272 10.7 272H35c6.6 0 12-5.4 12-12V268L288 72.6 529 268v-8c0-6.6 5.4-12 12-12h24.3c12 0 14.9-13.3 6.3-20.5z'/%3E%3C/svg%3E";

    const lightFavicon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'%3E%3Cpath fill='black' d='M280.4 148.3L96 300.1V464c0 8.8 7.2 16 16 16l112-.3c8.8 0 16-7.2 16-16V368c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16v95.7c0 8.8 7.2 16 16 16l112 .3c8.8 0 16-7.2 16-16V300L295.7 148.3c-9.4-7.8-23-7.8-32.3 0zM571.6 251.5L488 182.6V44c0-6.6-5.4-12-12-12h-56c-6.6 0-12 5.4-12 12v72.6L318.5 43c-18.6-15.4-45.5-15.4-64.1 0L4.3 251.5C-4.2 258.7-1.3 272 10.7 272H35c6.6 0 12-5.4 12-12V268L288 72.6 529 268v-8c0-6.6 5.4-12 12-12h24.3c12 0 14.9-13.3 6.3-20.5z'/%3E%3C/svg%3E";

    function updateFavicon() {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        favicon.href = isDark ? darkFavicon : lightFavicon;
    }

    updateFavicon();
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateFavicon);
})();
