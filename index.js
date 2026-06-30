var swiper1 = new Swiper(".feedback-swiper", {
    slidesPerView: 1,
    lazy: true,
    autoHeight: false,
    spaceBetween: 20,
    mousewheel: false,
    direction: 'horizontal',
    loop: true,


    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        601: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1080: {
            slidesPerView: 2,
            spaceBetween: 25,
        },
        1560: {
            slidesPerView: 3,
            spaceBetween: 25,
            mousewheel: false,
        },
    }
});
var swiper2 = new Swiper(".results-swiper", {
    slidesPerView: 1.35,
    lazy: true,
    autoHeight: false,
    spaceBetween: 20,
    mousewheel: false,
    direction: 'horizontal',
    loop: true,


    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        601: {
            slidesPerView: 1.35,
            spaceBetween: 20,
        },
        1080: {
            slidesPerView: 2,
            spaceBetween: 25,
        },
        1560: {
            slidesPerView: 3,
            spaceBetween: 25,
            mousewheel: false,
        },
    }
});

function getStrimixAvid(retries = 5) {
    return new Promise(resolve => {
        const interval = setInterval(() => {
            const value = document.cookie
                .split('; ')
                .find(row => row.startsWith('strimix_avid='))
                ?.split('=')[1];

            if (value || retries <= 0) {
                clearInterval(interval);
                resolve(value || '');
            }

            retries--;
        }, 100);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("header-form");
    if (!form) return;

    UTMUtils.captureUTMs();
    UTMUtils.applyUTMs(form);

    FormUtils.insertHidden(
        form,
        "page_source",
        window.location.origin + window.location.pathname
    );
    FormUtils.insertHidden(form, "Час", new Date().toLocaleTimeString("uk-UA"));

    const phoneInput = form.querySelector('input[name="Телефон"]');
    const userName = form.querySelector(`input[name="Email"]`);
    const phoneError = document.getElementById("phone-error");
    const submitBtn = document.getElementById("submit-btn-1");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const strimixAvid = await getStrimixAvid();
        if (form.dataset.submitted === "true") return;
        form.dataset.submitted = "true";

        const rawPhone = phoneInput.value.trim();
        const phoneObj = PhoneUtils.validatePhone(rawPhone);
        const digits = rawPhone.replace(/\D/g, "");

        if (!phoneObj || PhoneUtils.isObviouslyFakeNumber(digits)) {
            phoneError.style.opacity = "1";
            phoneInput.classList.add("input-error");
            form.dataset.submitted = "false";
            return;
        }
        
        LoaderUtils.show();

        phoneError.style.opacity = "0";
        phoneInput.classList.remove("input-error");

        const normalizedPhone = phoneObj.number;
        phoneInput.value = normalizedPhone;

        const eid = Date.now();
        FormUtils.insertHidden(form, "eid", eid);

        submitBtn.disabled = true;

        try {
            await fetch(
                "https://script.google.com/macros/s/AKfycbz4ZqNEYkrCjpUABrxqJy0LqLoQevnBuUJ1J4ZkIXKQjFYxzczQdiacUWy5pZIDQxvLrQ/exec",
                {
                    method: "POST",
                    body: new FormData(form)
                }
            );
        } catch (err) {
            console.error("Google Sheets error:", err);
        }
        
        const webhookUrl =
    "https://gapi.onlizer.com/api/webhook/olikatkadi-hub.com-9e7d14a5d8124542b60548088bb0980d/1f212331074a4e45851d53b88f0e1831/webhook";

const formData = new FormData(form);
const rawFields = Object.fromEntries(formData.entries());

const FIELD_MAP = {
    "Телефон": "phone",
    "Email": "email"
};

const normalizedFields = {};

Object.keys(rawFields).forEach(key => {
    const mappedKey = FIELD_MAP[key] || key;
    normalizedFields[mappedKey] = rawFields[key];
});

const payload = {
    title: "Реєстрація на автовеб",
    request_type: "",
    stage: 42,
    source: 6,
    page_source: window.location.origin + window.location.pathname,
    eid: eid,
    strimix_avid: strimixAvid || '',

    ...normalizedFields,

    utm_source: localStorage.getItem("utm_source") || "",
    utm_medium: localStorage.getItem("utm_medium") || "",
    utm_campaign: localStorage.getItem("utm_campaign") || "",
    utm_term: localStorage.getItem("utm_term") || "",
    utm_content: localStorage.getItem("utm_content") || "",
};

try {
    await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
} catch (err) {
    console.warn("Webhook error:", err);
}

        if (typeof fbq === "function") {
            fbq("track", "Lead", {}, { eventID: eid });
        }

        const baseUrl = "https://ai-lab.com.ua/join/";
        const startParam = "69c5275f366c2be5fc030a24";

        const tgUrl =
            `${baseUrl}?start=${startParam}` +
            `&eid=${eid}` +
            `&email=${userName.value}` +
            `&phone=${encodeURIComponent(normalizedPhone)}` +
            `&utm_source=${UTMUtils.getUTM("utm_source")}` +
            `&utm_campaign=${UTMUtils.getUTM("utm_campaign")}` +
            `&utm_content=${UTMUtils.getUTM("utm_content")}` +
            `&utm_term=${UTMUtils.getUTM("utm_term")}` +
            `&utm_medium=${UTMUtils.getUTM("utm_medium")}` +
            `&strimix_avid=${encodeURIComponent(strimixAvid || '')}`;

        setTimeout(() => {
            window.location.href = baseUrl;
        }, 50);
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    if (!form) return;

    UTMUtils.captureUTMs();
    UTMUtils.applyUTMs(form);

    FormUtils.insertHidden(
        form,
        "page_source",
        window.location.origin + window.location.pathname
    );
    FormUtils.insertHidden(form, "Час", new Date().toLocaleTimeString("uk-UA"));

    const phoneInput = form.querySelector('input[name="Телефон"]');
    const userName = form.querySelector(`input[name="Email"]`);
    const phoneError = document.getElementById("phone-error1");
    const submitBtn = document.getElementById("submit-btn-2");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const strimixAvid = await getStrimixAvid();
        if (form.dataset.submitted === "true") return;
        form.dataset.submitted = "true";

        const rawPhone = phoneInput.value.trim();
        const phoneObj = PhoneUtils.validatePhone(rawPhone);
        const digits = rawPhone.replace(/\D/g, "");

        if (!phoneObj || PhoneUtils.isObviouslyFakeNumber(digits)) {
            phoneError.style.opacity = "1";
            phoneInput.classList.add("input-error");
            form.dataset.submitted = "false";
            return;
        }
        
        LoaderUtils.show();

        phoneError.style.opacity = "0";
        phoneInput.classList.remove("input-error");

        const normalizedPhone = phoneObj.number;
        phoneInput.value = normalizedPhone;

        const eid = Date.now();
        FormUtils.insertHidden(form, "eid", eid);

        submitBtn.disabled = true;

        try {
            await fetch(
                "https://script.google.com/macros/s/AKfycbz4ZqNEYkrCjpUABrxqJy0LqLoQevnBuUJ1J4ZkIXKQjFYxzczQdiacUWy5pZIDQxvLrQ/exec",
                {
                    method: "POST",
                    body: new FormData(form)
                }
            );
        } catch (err) {
            console.error("Google Sheets error:", err);
        }
        
        const webhookUrl =
    "https://gapi.onlizer.com/api/webhook/olikatkadi-hub.com-9e7d14a5d8124542b60548088bb0980d/1f212331074a4e45851d53b88f0e1831/webhook";

const formData = new FormData(form);
const rawFields = Object.fromEntries(formData.entries());

const FIELD_MAP = {
    "Телефон": "phone",
    "Email": "email"
};

const normalizedFields = {};

Object.keys(rawFields).forEach(key => {
    const mappedKey = FIELD_MAP[key] || key;
    normalizedFields[mappedKey] = rawFields[key];
});

const payload = {
    title: "Реєстрація на автовеб",
    request_type: "",
    stage: 42,
    source: 6,
    page_source: window.location.origin + window.location.pathname,
    eid: eid,
    strimix_avid: strimixAvid || '',

    ...normalizedFields,

    utm_source: localStorage.getItem("utm_source") || "",
    utm_medium: localStorage.getItem("utm_medium") || "",
    utm_campaign: localStorage.getItem("utm_campaign") || "",
    utm_term: localStorage.getItem("utm_term") || "",
    utm_content: localStorage.getItem("utm_content") || "",
};

try {
    await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
} catch (err) {
    console.warn("Webhook error:", err);
}

        if (typeof fbq === "function") {
            fbq("track", "Lead", {}, { eventID: eid });
        }

        const baseUrl = "https://ai-lab.com.ua/join/";

        const tgUrl =
            `?eid=${eid}` +
            `&email=${userName.value}` +
            `&phone=${encodeURIComponent(normalizedPhone)}` +
            `&utm_source=${UTMUtils.getUTM("utm_source")}` +
            `&utm_campaign=${UTMUtils.getUTM("utm_campaign")}` +
            `&utm_content=${UTMUtils.getUTM("utm_content")}` +
            `&utm_term=${UTMUtils.getUTM("utm_term")}` +
            `&utm_medium=${UTMUtils.getUTM("utm_medium")}` +
            `&strimix_avid=${encodeURIComponent(strimixAvid || '')}`;

        setTimeout(() => {
            window.location.href = baseUrl;
        }, 50);
    });
});

document.body.classList.add('loading');

window.onload = function () {
    document.body.style.opacity = '1';
    document.body.classList.remove('loading');
};