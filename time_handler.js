document.addEventListener("DOMContentLoaded", () => {

    const now = new Date();
    const hours = now.getHours();

    const dateEl = document.querySelector(".date-text");
    const timeEl = document.querySelector(".time-text");

    if (!dateEl || !timeEl) return;

    if (hours < 10) {

        dateEl.innerHTML = "Вже сьогодні";
        timeEl.innerHTML = "12:00 / 19:00 <br> за Києвом";

    }

    else if (hours >= 10 && hours < 17) {

        dateEl.innerHTML = "Сьогодні 19:00 <br> Завтра о 12:00";
        timeEl.innerHTML = "За київським <br> часом";

    }

    else {

        dateEl.innerHTML = "Вже завтра";
        timeEl.innerHTML = "12:00 / 19:00 <br> за Києвом";

    }

});