function showDetails(button) {
    const row = button.closest('tr');

    // Set values in the modal (these should correspond to each cell in the row based on your data structure)
    document.getElementById('detailEncounterId').innerText = row.cells[0].innerText;
    document.getElementById('detailEndTidalCo2').innerText = "Placeholder";  // Replace with actual data
    document.getElementById('detailFeedVol').innerText = "Placeholder";      // Replace with actual data
    document.getElementById('detailFeedVolAdm').innerText = "Placeholder";   // Replace with actual data
    document.getElementById('detailFiO2').innerText = "Placeholder";         // Replace with actual data
    document.getElementById('detailFiO2Ratio').innerText = "Placeholder";    // Replace with actual data
    document.getElementById('detailInspTime').innerText = "Placeholder";     // Replace with actual data
    document.getElementById('detailOxygenFlowRate').innerText = "Placeholder";// Replace with actual data
    document.getElementById('detailPeep').innerText = "Placeholder";         // Replace with actual data
    document.getElementById('detailPip').innerText = "Placeholder";          // Replace with actual data
    document.getElementById('detailRespRate').innerText = "Placeholder";     // Replace with actual data
    document.getElementById('detailSip').innerText = "Placeholder";          // Replace with actual data
    document.getElementById('detailTidalVol').innerText = "Placeholder";     // Replace with actual data
    document.getElementById('detailTidalVolActual').innerText = "Placeholder";// Replace with actual data
    document.getElementById('detailTidalVolKg').innerText = "Placeholder";   // Replace with actual data
    document.getElementById('detailTidalVolSpon').innerText = "Placeholder"; // Replace with actual data
    document.getElementById('detailBmi').innerText = "Placeholder";          // Replace with actual data

    // Show the modal
    const detailsModal = new bootstrap.Modal(document.getElementById('detailsModal'));
    detailsModal.show();
  }

  function toggleEdit(button) {
    const row = button.closest('tr');
    const isEditing = button.innerText === 'Save';

    for (let i = 1; i < row.cells.length - 1; i++) {
      row.cells[i].contentEditable = !isEditing;
    }

    button.innerText = isEditing ? 'Edit' : 'Save';
  }

  function deleteRow(button) {
    const row = button.closest('tr');
    row.remove();
  }

  document.getElementById('newPatientForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('patientName').value;
    const dob = document.getElementById('dob').value;
    const admissionDate = document.getElementById('admissionDate').value;
    const referral = document.getElementById('referral').value;
    
    // Get additional details
    const endTidalCo2 = document.getElementById('endTidalCo2').value;
    const feedVolume = document.getElementById('feedVolume').value;
    const feedVolumeAdmin = document.getElementById('feedVolumeAdmin').value;
    const fio2 = document.getElementById('fio2').value;
    const fio2Ratio = document.getElementById('fio2Ratio').value;
    const inspTime = document.getElementById('inspTime').value;
    const oxygenFlowRate = document.getElementById('oxygenFlowRate').value;
    const peep = document.getElementById('peep').value;
    const pip = document.getElementById('pip').value;
    const respRate = document.getElementById('respRate').value;
    const sip = document.getElementById('sip').value;
    const tidalVol = document.getElementById('tidalVol').value;
    const tidalVolActual = document.getElementById('tidalVolActual').value;
    const tidalVolKg = document.getElementById('tidalVolKg').value;
    const tidalVolSpon = document.getElementById('tidalVolSpon').value;
    const bmi = document.getElementById('bmi').value;

    // Create a details object for storing all data in the data attribute
    const patientDetails = {
        name,
        dob,
        admissionDate,
        referral,
        endTidalCo2,
        feedVolume,
        feedVolumeAdmin,
        fio2,
        fio2Ratio,
        inspTime,
        oxygenFlowRate,
        peep,
        pip,
        respRate,
        sip,
        tidalVol,
        tidalVolActual,
        tidalVolKg,
        tidalVolSpon,
        bmi
    };

    // Get the table body
    const tableBody = document.querySelector('table tbody');

    // Create a new row
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <th scope="row">${tableBody.rows.length + 1}</th>
        <td>${name}</td>
        <td>${dob}</td>
        <td>${admissionDate}</td>
        <td>${referral}</td>
        <td>
            <button onclick="showDetails(this)" class="btn btn-info btn-sm" data-patient-details='${JSON.stringify(patientDetails)}'>Details</button>
            <button onclick="toggleEdit(this)" class="btn btn-warning btn-sm">Edit</button>
            <button onclick="deleteRow(this)" class="btn btn-danger btn-sm">Delete</button>
        </td>
    `;

    // Append the new row to the table
    tableBody.appendChild(newRow);

    // Reset the form and close the modal
    document.getElementById('newPatientForm').reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById('newPatientModal'));
    modal.hide();
});

var el = document.getElementById("wrapper");
var toggleButton = document.getElementById("menu-toggle");

toggleButton.onclick = function () {
    el.classList.toggle("toggled");
};

function uploadCSV() {
    const fileInput = document.getElementById('csvFileInput');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please upload a CSV file.');
        return;
    }

    const reader = new FileReader();
    
    reader.onload = function(event) {
        const csvData = event.target.result;
        const rows = csvData.split('\n').map(row => row.split(','));

        // Assuming the first row is the header
        const hasHeader = rows[0][0].toLowerCase().includes("encounter");
        const dataRows = hasHeader ? rows.slice(1) : rows;

        dataRows.forEach((rowData, index) => {
            // Map each CSV column to the correct variable based on the format provided
            const [encounterId, endTidalCo2, feedVol, feedVolAdm, fio2, fio2Ratio, inspTime, oxygenFlowRate, peep, pip, respRate, sip, tidalVol, tidalVolActual, tidalVolKg, tidalVolSpon, bmi, referral] = rowData;

            // Define patient details object
            const patientDetails = {
                encounterId,
                endTidalCo2,
                feedVol,
                feedVolAdm,
                fio2,
                fio2Ratio,
                inspTime,
                oxygenFlowRate,
                peep,
                pip,
                respRate,
                sip,
                tidalVol,
                tidalVolActual,
                tidalVolKg,
                tidalVolSpon,
                bmi,
                referral
            };

            // Add row to table
            addRowToTable(patientDetails);
        });

        alert('CSV data added successfully!');
        fileInput.value = ''; // Reset the file input
    };

    reader.readAsText(file);
}

// Function to add a row to the table with patient details
function addRowToTable(patientDetails) {
    const tableBody = document.querySelector('table tbody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <th scope="row">${tableBody.rows.length + 1}</th>
        <td>${patientDetails.encounterId}</td>
        <td>${patientDetails.endTidalCo2}</td>
        <td>${patientDetails.feedVol}</td>
        <td>${patientDetails.feedVolAdm}</td>
        <td>${patientDetails.fio2}</td>
        <td>${patientDetails.fio2Ratio}</td>
        <td>${patientDetails.inspTime}</td>
        <td>${patientDetails.oxygenFlowRate}</td>
        <td>${patientDetails.peep}</td>
        <td>${patientDetails.pip}</td>
        <td>${patientDetails.respRate}</td>
        <td>${patientDetails.sip}</td>
        <td>${patientDetails.tidalVol}</td>
        <td>${patientDetails.tidalVolActual}</td>
        <td>${patientDetails.tidalVolKg}</td>
        <td>${patientDetails.tidalVolSpon}</td>
        <td>${patientDetails.bmi}</td>
        <td>${patientDetails.referral}</td>
        <td>
            <button 
                onclick="showDetails(this)" 
                class="btn btn-info btn-sm" 
                data-patient-details='${JSON.stringify(patientDetails)}'>
                Details
            </button>
            <button onclick="toggleEdit(this)" class="btn btn-warning btn-sm">Edit</button>
            <button onclick="deleteRow(this)" class="btn btn-danger btn-sm">Delete</button>
        </td>
    `;

    tableBody.appendChild(newRow);
}