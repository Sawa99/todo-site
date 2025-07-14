//Theme changer
const setTheme = theme => document.documentElement.className = theme;

function create() {
    const text = document.getElementById("task").value;
    if (!text.trim()) return;

    const box = document.createElement("div");
    box.setAttribute("class", "itembox");
    box.style.position = "relative";
    box.style.overflow = "hidden";

    const holder = document.createElement("p");
    holder.setAttribute("class", "output");
    holder.innerText = text;
    box.appendChild(holder);

    document.getElementById("tasks").appendChild(box);
    document.getElementById("task").value = "";

    let startX = 0;
    let endX = 0;

    box.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    box.addEventListener("touchend", (e) => {
        endX = e.changedTouches[0].clientX;
        const deltaX = endX - startX;

        if (deltaX > 50) {
            box.classList.add("completed");
        } else if (deltaX < -50) {
            box.remove();
        }
    });
};

//keybinds it to enter
const input = document.getElementById('task');

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        create();
    }
});