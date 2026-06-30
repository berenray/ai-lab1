document.addEventListener("DOMContentLoaded", () => {

    const PARAM_KEYS = [
        "utm_source",
        "utm_campaign",
        "utm_content",
        "utm_term",
        "utm_medium",
        "eid",
        "email",
        "strimix_avid",
        "phone"
    ];

    const params = new URLSearchParams(window.location.search);

    /* 1. Save UTMs from landing URL */
    PARAM_KEYS.forEach(key => {
        const value = params.get(key);
        if (value) {
            localStorage.setItem(key, value);
        }
    });

    const links = document.querySelectorAll("a[href]");

    links.forEach(link => {

        try {

            const url = new URL(link.href, window.location.origin);

            PARAM_KEYS.forEach(key => {
                const storedValue = localStorage.getItem(key);
                if (storedValue) {
                    url.searchParams.set(key, storedValue);
                }
            });
            url.searchParams.set("strimix_avid", window.StrimixGlobal.getUserId().toString());
            link.href = url.toString();

        } catch(e) {}

    });
});

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".btn");

    btn.addEventListener("click", function () {
        const eid = Date.now();

        if (typeof fbq === "function") {
            fbq("track", "Lead", {}, { eventID: eid });
        }
    });
});