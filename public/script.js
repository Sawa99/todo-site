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

    const tasksContainer = document.getElementById("tasks");
    tasksContainer.appendChild(box);
    document.getElementById("task").value = "";

    let startX = 0;

    box.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    box.addEventListener("touchend", (e) => {
        const endX = e.changedTouches[0].clientX;
        const deltaX = endX - startX;

        if (deltaX > 50) {
            const feedback = document.createElement("div");
            feedback.className = "feedback complete";
            feedback.innerText = "Completed";
            box.appendChild(feedback);

            setTimeout(() => {
                box.classList.add("completed");
                feedback.remove();
            }, 800); // Show animation before applying .completed
        } else if (deltaX < -50) {
            const feedback = document.createElement("div");
            feedback.className = "feedback delete";
            feedback.innerText = "Deleting...";
            box.appendChild(feedback);

            setTimeout(() => {
                box.remove();
            }, 800); // Wait for animation before removing
        }
    });
}
