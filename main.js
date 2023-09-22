function calculateDateDifference() {
  const startDate = new Date(document.getElementById('start-date').value);
  const endDateElement = document.getElementById('end-date');
  const todayCheckbox = document.getElementById('today-checkbox');
  const includeCheckbox = document.getElementById('include-checkbox');

  let endDate;

  if (todayCheckbox.checked) {
    endDate = new Date(); 
    endDateElement.disabled = true; 
  } else {
    endDate = new Date(endDateElement.value);
    endDateElement.disabled = false; 
  }

  if (!isNaN(startDate) && !isNaN(endDate)) {
    if (includeCheckbox.checked) {
      endDate.setDate(endDate.getDate() + 1); 
    }

    const differenceInMilliseconds = endDate - startDate;
    const daysDifference = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    const resultElement = document.getElementById('result');
    resultElement.innerText = `Date Difference: ${daysDifference} days`;


    resultElement.style.cursor = 'pointer';
    resultElement.addEventListener('click', function() {
      const textarea = document.createElement('textarea');
      textarea.value = daysDifference;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      
      const alertElement = document.createElement('div');
      alertElement.innerText = 'Copied to clipboard!';
      alertElement.classList.add('alert');
      document.body.appendChild(alertElement);
      setTimeout(function() {
        alertElement.style.opacity = '0';
        setTimeout(function() {
          document.body.removeChild(alertElement);
        }, 300); 
      }, 2000); 
    });
  } else {
    document.getElementById('result').innerText = "Please enter valid start and end dates.";
  }
}

function calculateMeterReading() {
  const currentReading = parseFloat(document.getElementById('current-reading').value);
  const previousReading = parseFloat(document.getElementById('previous-reading').value);
  const applyFormulaCheckbox = document.getElementById('apply-formula-checkbox');
  const applyFormula2Checkbox = document.getElementById('apply-formula2-checkbox');
  const applyFormula3Checkbox = document.getElementById('apply-formula3-checkbox');
  const usageResultElement = document.getElementById('usage-result');

  if (!isNaN(currentReading) && !isNaN(previousReading)) {
    let usage = currentReading - previousReading;
    let finalResult = usage;

    if (applyFormulaCheckbox.checked && applyFormula2Checkbox.checked && applyFormula3Checkbox.checked) {
      usageResultElement.innerText = "Cannot calculate: Both formulas are selected.";
      return;
    } else if (applyFormulaCheckbox.checked) {
      finalResult = (((usage * 1.02264) * 39.0) / 3.6).toFixed(2);
    } else if (applyFormula2Checkbox.checked) {
      finalResult = ((((usage * 2.83) * 1.02264) * 39.0) / 3.6).toFixed(2);
    } else if (applyFormula3Checkbox.checked) {
      finalResult = usage;
    } else {
      usageResultElement.innerText = "Please select a formula.";
      return;
    }

    usageResultElement.innerText = `Usage: ${finalResult} kWh`;
    
    usageResultElement.style.cursor = 'pointer';
    usageResultElement.addEventListener('click', function () {
      const textarea = document.createElement('textarea');
      textarea.value = finalResult;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      
      const alertElement = document.createElement('div');
      alertElement.innerText = 'Copied to clipboard!';
      alertElement.classList.add('alert');
      document.body.appendChild(alertElement);
      setTimeout(function () {
        alertElement.style.opacity = '0';
        setTimeout(function () {
          document.body.removeChild(alertElement);
        }, 300); 
      }, 2000); 
    });
  } else {
    usageResultElement.innerText = "Please enter valid meter readings.";
  }
  
}
function calculateBill() {
  const usage = parseFloat(document.getElementById('usage').value);
  const unitRate = parseFloat(document.getElementById('unit-rate').value);
  const days = parseFloat(document.getElementById('days').value);
  const standingCharge = parseFloat(document.getElementById('standing-charge').value);
  const billResultElement = document.getElementById('bill-result');

  if (!isNaN(usage) && !isNaN(unitRate) && !isNaN(days) && !isNaN(standingCharge)) {
    const billAmount = (usage * unitRate) + (days * standingCharge);
    billResultElement.innerText = `Bill Amount: £${billAmount.toFixed(2)}`;
    

    billResultElement.style.cursor = 'pointer';
    billResultElement.addEventListener('click', function () {
      const textarea = document.createElement('textarea');
      textarea.value = billAmount.toFixed(2);
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      const alertElement = document.createElement('div');
      alertElement.innerText = 'Copied to clipboard!';
      alertElement.classList.add('alert');
      document.body.appendChild(alertElement);
      setTimeout(function () {
        alertElement.style.opacity = '0';
        setTimeout(function () {
          document.body.removeChild(alertElement);
        }, 300);
      }, 2000);
    });
  } else {
    billResultElement.innerText = "Please enter valid values for all fields.";
  }
}