let searchHistory = [];

function generateURL() {
    let topic = document.getElementById("topic").value.trim();
    let language = document.getElementById("language").value.trim();
    let stars = document.getElementById("stars").value || 50;
    let updated = document.getElementById("updated").value || "2024-01-01";
    let mode = document.getElementById("mode").value;

    if (!topic || !language) {
        alert("Please enter both topic and language!");
        return;
    }

    let query = "";
    if (mode === "readme") {
        query = `${topic} in:readme language:${language} stars:>${stars} pushed:>${updated}`;
    } else if (mode === "name") {
        query = `${topic} in:name language:${language} stars:>${stars} pushed:>${updated}`;
    } else if (mode === "topic") {
        query = `topic:${topic} language:${language} stars:>${stars} pushed:>${updated}`;
    } else if (mode === "forks") {
        query = `${topic} language:${language} forks:>20 stars:>${stars} pushed:>${updated} sort:forks`;
    } else if (mode === "recent") {
        query = `${topic} language:${language} stars:>${stars} pushed:>${updated} sort:updated`;
    }

    let url = `https://github.com/search?q=${encodeURIComponent(query)}&type=repositories`;

    if (!searchHistory.includes(url)) {
        searchHistory.unshift(url);
        if (searchHistory.length > 5) searchHistory.pop();
        updateHistory();
    }

    window.open(url, "_blank");
}

function updateHistory() {
    const historyList = document.getElementById("historyList");
    const historySection = document.getElementById("historySection");
    
    if (searchHistory.length > 0) {
        historySection.style.display = "block";
        historyList.innerHTML = searchHistory.map(url => 
            `<a href="${url}" target="_blank">${url}</a>`
        ).join("");
    } else {
        historySection.style.display = "none";
    }
}

document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        generateURL();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const dateInput = document.getElementById("updated");
    if (!dateInput.value) {
        const today = new Date();
        dateInput.value = today.toISOString().split('T')[0];
    }
});
