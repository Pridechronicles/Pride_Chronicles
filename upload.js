document.getElementById('uploadBtn').addEventListener('click', function() {
    const fileInput = document.getElementById('bookFile');
    const status = document.getElementById('uploadStatus');

    if (fileInput.files.length === 0) {
        status.innerText = "Please select a file.";
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'pride_chronicles_books');

    fetch('https://api.cloudinary.com/v1_1/dtefzxfj3/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.secure_url) {
            status.innerText = "Upload successful!";
            const bookList = document.getElementById('bookList');
            const link = document.createElement('a');
            link.href = data.secure_url;
            link.innerText = "Download: " + file.name;
            link.target = "_blank";
            bookList.appendChild(link);
        } else {
            status.innerText = "Upload failed. Please try again.";
        }
    })
    .catch(error => {
        console.error("Error uploading:", error);
        status.innerText = "Error uploading file.";
    });
});
