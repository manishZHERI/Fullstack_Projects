const svg = document.getElementById("drawingArea");

let isDrawing = false;
let currentPath = null;

svg.addEventListener("mousedown", (e) => {
    isDrawing = true;

    // Get mouse position relative to SVG
    const point = getMousePosition(e);

    // Create new path element
    currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    currentPath.setAttribute("stroke", "blue");
    currentPath.setAttribute("stroke-width", "2");
    currentPath.setAttribute("fill", "none");
    currentPath.setAttribute("d", `M${point.x},${point.y}`);
    svg.appendChild(currentPath);
});

svg.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;

    const point = getMousePosition(e);
    const d = currentPath.getAttribute("d");
    currentPath.setAttribute("d", `${d} L${point.x},${point.y}`);
});

svg.addEventListener("mouseup", () => {
    isDrawing = false;
});

svg.addEventListener("mouseleave", () => {
    isDrawing = false;
});

function getMousePosition(e) {
    const rect = svg.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}
