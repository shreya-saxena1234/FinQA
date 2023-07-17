// const dropArea = document.querySelector('.drop_box');
// const button = dropArea.querySelector('button');
// const dragText = dropArea.querySelector('header');
// const input = dropArea.querySelector('input');

// button.onclick = () => {
//   input.click();
// };

// input.addEventListener('change', (e) => {
//   const fileName = e.target.files[0].name;
//   const filedata = `
//     <form action="" method="post">
//     <div class="form">
//     <h4>${fileName}</h4>
//     <input type="email" placeholder="Enter email upload file">
//     <button class="btn">Upload</button>
//     </div>
//     </form>`;
//   dropArea.innerHTML = filedata;
// });

document.getElementById("fileID").addEventListener("change", handleFileUpload);

function handleFileUpload(event) {
  const file = event.target.files[0];
  console.log("Selected file:", file);
}