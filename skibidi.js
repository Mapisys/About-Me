document.addEventListener("DOMContentLoaded", () => {
    const glitchTexts = document.querySelectorAll(".glitch-text");

    const glitchEffect = () => {
        glitchTexts.forEach(text => {
            const x = Math.random() * 4 - 2;
            const y = Math.random() * 4 - 2;
            text.style.transform = `translate(${x}px, ${y}px)`;
        });
        requestAnimationFrame(glitchEffect);
    };
    requestAnimationFrame(glitchEffect);

    fetch("projects.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load projects.");
            return response.json();
        })
        .then(data => {
            const projectsContainer = document.getElementById("projects-container");
            if (!projectsContainer) return;
            projectsContainer.innerHTML = ""; 

            data.projects.forEach(project => {
                const projectElement = document.createElement("div");
                projectElement.classList.add("project");
                projectElement.innerHTML = `
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank" rel="noopener noreferrer">View Project</a>
                `;
                projectsContainer.appendChild(projectElement);
            });
        })
        .catch(error => {
            console.error("Error loading projects:", error);
            document.getElementById("projects-container").innerHTML = "<p>Failed to load projects.</p>";
        });
});
