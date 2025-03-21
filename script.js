function toggleDetails(id) {
    var details = document.getElementById(id);
    if (details) {
        details.style.display = (details.style.display === "block") ? "none" : "block";
    } else {
        console.warn("No element found with ID:", id);
    }
}
const sections = document.querySelectorAll('.research-section');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
});

sections.forEach(section => {
    observer.observe(section);
});

document.addEventListener('DOMContentLoaded', function() { // Wait for the DOM to load.
    const resumeButton = document.getElementById('resumeButton');

    resumeButton.addEventListener('click', function() {
        const encodedResumeLink = 'TmFiaWxhTk5vdmFfUmVzdW1lLnBkZg=='; // Replace with your Base64 encoded link
        const decodedResumeLink = atob(encodedResumeLink);

        // Create a temporary anchor element
        const downloadLink = document.createElement('a');
        downloadLink.href = decodedResumeLink;
        downloadLink.download = 'NabilaNNova_Resume.pdf'; // Optional: Specify the download file name
        document.body.appendChild(downloadLink); // Append to the body

        // Trigger the download
        downloadLink.click();

        // Remove the temporary link
        document.body.removeChild(downloadLink);
    });
});