function showDetails(button) {
    const row = button.closest('tr');
    
    // Set values in the modal (these should correspond to each cell in the row based on your data structure)
    document.getElementById('detailEncounterId').innerText = row.cells[0].innerText;
    document.getElementById('detailName').innerText = row.cells[1].innerText;
    document.getElementById('detailDob').innerText = row.cells[2].innerText;
    document.getElementById('detailDoa').innerText = row.cells[3].innerText;
    document.getElementById('detailReferral').innerText = row.cells[4].innerText;
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
  function toggleSearchBar() {
    const searchBar = document.getElementById('searchInput');
    if (searchBar.style.display === 'none' || searchBar.style.display === '') {
      searchBar.style.display = 'block'; // Show search bar
      searchBar.focus(); // Optional: Focus on the search bar when it appears
    } else {
      searchBar.style.display = 'none'; // Hide search bar
    }
  }
  
  function searchPatient() {
    // Get the value of the input field
    const input = document.getElementById('searchInput').value.toLowerCase();
    const tableBody = document.getElementById('patientTableBody');
    const rows = tableBody.getElementsByTagName('tr');

    // Loop through all rows and hide those that don't match the search query
    for (let i = 0; i < rows.length; i++) {
      const nameCell = rows[i].getElementsByTagName('td')[0]; // Corrected: Name is in the first <td> (index 0)
      if (nameCell) {
        const name = nameCell.textContent || nameCell.innerText;
        rows[i].style.display = name.toLowerCase().includes(input) ? '' : 'none';
      } else {
        console.error(`Row ${i + 1} has no <td> elements`);
      }
    }
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

function exportReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Patient Report", 10, 10);
    doc.text(`Encounter ID: ${document.getElementById('detailEncounterId').innerText}`, 10, 20);
    doc.text(`Name: ${document.getElementById('detailName').innerText}`, 10, 30);
    doc.text(`Date of Birth: ${document.getElementById('detailDob').innerText}`, 10, 40);
    doc.text(`Date of Admission: ${document.getElementById('detailDoa').innerText}`, 10, 50);
    doc.text(`Referral: ${document.getElementById('detailReferral').innerText}`, 10, 60);

    doc.text(`End Tidal CO2: ${document.getElementById('detailEndTidalCo2').innerText}`, 10, 70);
    doc.text(`Feed Volume: ${document.getElementById('detailFeedVol').innerText}`, 10, 80);
    doc.text(`Feed Volume Admin: ${document.getElementById('detailFeedVolAdm').innerText}`, 10, 90);
    doc.text(`FiO2: ${document.getElementById('detailFiO2').innerText}`, 10, 100);
    doc.text(`FiO2 Ratio: ${document.getElementById('detailFiO2Ratio').innerText}`, 10, 110);
    doc.text(`Inspiratory Time: ${document.getElementById('detailInspTime').innerText}`, 10, 120);
    doc.text(`Oxygen Flow Rate: ${document.getElementById('detailOxygenFlowRate').innerText}`, 10, 130);
    doc.text(`PEEP: ${document.getElementById('detailPeep').innerText}`, 10, 140);
    doc.text(`PIP: ${document.getElementById('detailPip').innerText}`, 10, 150);
    doc.text(`Respiratory Rate: ${document.getElementById('detailRespRate').innerText}`, 10, 160);
    doc.text(`SIP: ${document.getElementById('detailSip').innerText}`, 10, 170);
    doc.text(`Tidal Volume: ${document.getElementById('detailTidalVol').innerText}`, 10, 180);
    doc.text(`Tidal Volume Actual: ${document.getElementById('detailTidalVolActual').innerText}`, 10, 190);
    doc.text(`Tidal Volume per Kg: ${document.getElementById('detailTidalVolKg').innerText}`, 10, 200);
    doc.text(`Tidal Volume Spontaneous: ${document.getElementById('detailTidalVolSpon').innerText}`, 10, 210);
    doc.text(`BMI: ${document.getElementById('detailBmi').innerText}`, 10, 220);

    doc.save('Patient_Report.pdf');
  }

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

