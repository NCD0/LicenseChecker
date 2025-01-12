async function checkLicense() {
    try {
        const licenseKey = document.getElementById("licenseKey").value;
        const resultDiv = document.getElementById("result");

        const response = await axios.post('http://localhost:3000/license', { license_key: licenseKey }); 
        const licenses = response.data;

        console.log('Response from server:', licenses); 

        if (licenses.length === 0) {
            console.log('No licenses found.');
            resultDiv.textContent = "No licenses found.";
            resultDiv.style.color = "red"; 
            return;
        }
        resultDiv.style.whiteSpace = "pre-line";
        if (licenses.length > 0 && licenseKey === licenses[0].license_key) {
            resultDiv.textContent = `License Key: ${licenses[0].license_key} is valid.\n` +
                                    `License Type: ${licenses[0].license_type}\n` +
                                    `Creation Date: ${licenses[0].creation_date}\n` +
                                    `Expiry Date: ${licenses[0].expiry_date}`;
            resultDiv.style.color = "green";
        } else {
            resultDiv.textContent = "License is invalid.";
            resultDiv.style.color = "red";
        }

    } catch (error) {
        console.error('Error fetching licenses:', error);
    }
}