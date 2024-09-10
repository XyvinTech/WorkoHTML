// const apiStatesUrl = 'https://countriesnow.space/api/v0.1/countries/states';
// const apiCitiesUrl = 'https://countriesnow.space/api/v0.1/countries/state/cities';
// const country = 'India';

// // Example services list
// const servicesArray = [
//     "AC Repair",
//     "AC Maintenance",
//     "AC Installation",
//     "Washing Machine Repair",
//     "Appliance Repair",
//     "Maintenance",
//     "Refrigerator Repair",
//     "Refrigerator Service",
//     "Refrigerator Installation",
//     "Geyser Repair",
//     "Geyser Installation",
//     "Geyser Servicing",
//     "Washing Machine Installation",
//     "Washing Machine Servicing",
//     "Networking Solutions"
// ];

// const services = [...new Set(servicesArray)];

// let activeAutocompleteType = null; // Track the active autocomplete input

// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM fully loaded and parsed');
//     initializeAutocomplete();
// });

// async function initializeAutocomplete() {
//     try {
//         const states = await fetchStates();
//         setupAutocomplete(document.getElementById('state'), states, 'state');
//         setupAutocomplete(document.getElementById('service'), services, 'service');
//     } catch (error) {
//         console.error('Initialization error:', error);
//     }
// }

// async function fetchStates() {
//     try {
//         console.log('Fetching states...');
//         const response = await fetch(apiStatesUrl);
//         const data = await response.json();
//         console.log('States response:', data);

//         if (data && data.data && Array.isArray(data.data)) {
//             const states = data.data.flatMap(countryData => 
//                 countryData.states ? countryData.states.map(state => state.name) : []
//             );
//             console.log('States extracted:', states);
//             return states;
//         } else {
//             console.error('Unexpected response format for states:', data);
//             return [];
//         }
//     } catch (error) {
//         console.error('Error fetching states:', error);
//         return [];
//     }
// }

// async function fetchCities(state) {
//     try {
//         console.log('Fetching cities for state:', state);
//         const response = await fetch(apiCitiesUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ country: country, state: state })
//         });
//         const data = await response.json();
//         console.log('Cities response:', data);

//         if (data && data.data && Array.isArray(data.data)) {
//             console.log('Cities extracted:', data.data);
//             return data.data;
//         } else {
//             console.error('Unexpected response format for cities:', data);
//             return [];
//         }
//     } catch (error) {
//         console.error('Error fetching cities:', error);
//         return [];
//     }
// }

// function setupAutocomplete(inputElement, items, type) {
//     console.log(`Setting up autocomplete for ${type}`);
    
//     inputElement.addEventListener('click', function (event) {
//         console.log(`Input click event triggered for ${type}`);
//         activeAutocompleteType = type; // Set the active autocomplete type
//         displaySuggestions(this, items, type);
//         event.stopPropagation(); // Prevent the event from propagating to the document
//     });

//     inputElement.addEventListener('input', function () {
//         const value = this.value;
//         console.log(`Input event triggered for ${type}: ${value}`);
//         displaySuggestions(this, items.filter(item => item.toLowerCase().includes(value.toLowerCase())), type);
//     });

//     // Improved click handling logic
//     document.addEventListener('mousedown', function (event) {
//         if (activeAutocompleteType) {
//             const suggestionBoxId = `${activeAutocompleteType}-items`;
//             const suggestionBox = document.getElementById(suggestionBoxId);
//             const inputElement = document.getElementById(activeAutocompleteType);
            
//             // Check if the click is outside the active suggestion box and input element
//             if (
//                 suggestionBox && !suggestionBox.contains(event.target) &&
//                 inputElement && !inputElement.contains(event.target)
//             ) {
//                 console.log(`Click outside detected for ${activeAutocompleteType}`);
//                 closeSuggestions();
//                 activeAutocompleteType = null; // Reset the active autocomplete type
//             }
//         }
//     });
// }

// function displaySuggestions(inputElement, items, type) {
//     console.log(`Displaying suggestions for ${type}:`, items);

//     const suggestionBoxId = `${type}-items`;
//     let suggestionBox = document.getElementById(suggestionBoxId);

//     if (!suggestionBox) {
//         console.log(`Creating suggestion box for ${type}`);
//         suggestionBox = document.createElement('div');
//         suggestionBox.id = suggestionBoxId;
//         suggestionBox.className = 'autocomplete-items';
//         inputElement.parentNode.appendChild(suggestionBox);
//     }

//     suggestionBox.innerHTML = ''; // Clear previous suggestions

//     if (items.length === 0) {
//         console.log(`No results found for ${type}`);
//         suggestionBox.innerHTML = '<div class="autocomplete-item">No results found</div>';
//         suggestionBox.style.display = 'block';
//         return;
//     }

//     items.forEach(item => {
//         const div = document.createElement('div');
//         div.className = 'autocomplete-item';
//         div.innerHTML = item;
//         div.addEventListener('mousedown', function (event) {
//             console.log(`${type} selected: ${item}`);
//             inputElement.value = item;
//             closeSuggestions();
//             if (type === 'state') {
//                 handleStateSelection(item);
//             }
//             event.stopPropagation(); // Prevent click event from propagating to the document
//         });
//         suggestionBox.appendChild(div);
//     });

//     suggestionBox.style.display = 'block';
// }

// function closeSuggestions() {
//     console.log('Closing all suggestion boxes');
//     document.querySelectorAll('.autocomplete-items').forEach(item => {
//         item.style.display = 'none';
//     });
// }

// async function handleStateSelection(state) {
//     console.log('State selected:', state);
//     const cities = await fetchCities(state);
//     const cityInput = document.getElementById('city');
//     cityInput.disabled = false;
//     setupAutocomplete(cityInput, cities, 'city');
// }

// document.addEventListener('DOMContentLoaded', () => {
//     initializeAutocomplete(); // Assuming this function initializes the autocomplete functionality

//     const form = document.getElementById('custom-form');
    
//     form.addEventListener('submit', async (event) => {
//         event.preventDefault(); // Prevent default form submission

//         const formData = new FormData(form);

//         // Convert FormData to a plain object
//         const formObject = {};
//         formData.forEach((value, key) => {
//             formObject[key] = value;
//         });

//         try {
//             // Send form data via email
//             await sendEmail(formObject);

//             // Redirect to the thank you page
//             window.location.href = 'thankyou.html';
//         } catch (error) {
//             console.error('Error sending email:', error);
//         }
//     });
// });

// async function sendEmail(formData) {
//     // Replace these values with your EmailJS configuration
//     const serviceID = 'service_h0zxbti';
//     const templateID = 'template_pw8py8o';
//     const userID = 'SlvWZX1hbOXBA6-e-';

//     const data = {
//         service_id: serviceID,
//         template_id: templateID,
//         user_id: userID,
//         template_params: {
//             'from_name': formData.first_name + ' ' + formData.last_name,
//             'first_name': formData.first_name,
//             'last_name': formData.last_name,
//             'email': formData.email,
//             'phone': formData.country_code + ' ' + formData.phone,
//             'state': formData.state,
//             'city': formData.city,
//             'service': formData.service
//         }
//     };

//     const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     });

//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     console.log('SUCCESS!', response);
// }


const apiCities = ['Gurugram', 'Noida', 'Greater Noida', 'Faridabad', 'Delhi', 'Ghaziabad'];
const servicesArray = [
    "AC Repair", "AC Maintenance", "AC Installation", "Washing Machine Repair", "Appliance Repair",
    "Maintenance", "Refrigerator Repair", "Refrigerator Service", "Refrigerator Installation",
    "Geyser Repair", "Geyser Installation", "Geyser Servicing", "Washing Machine Installation",
    "Washing Machine Servicing", "Networking Solutions"
];
const ACservicesArray = [
    "AC Repair", "AC Maintenance", "AC Installation"
];

const services = [...new Set(servicesArray)];
const acServices = [...new Set(ACservicesArray)];

let activeAutocompleteType = null; // Track the active autocomplete input

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    initializeAutocomplete();
});

function initializeAutocomplete() {
    if(document.getElementById('city')){
        setupAutocomplete(document.getElementById('city'), apiCities, 'city');
    }
    if(document.getElementById('service')){
        setupAutocomplete(document.getElementById('service'), services, 'service');
    }
    if(document.getElementById('ACservice')){
        setupAutocomplete(document.getElementById('ACservice'), acServices, 'ACservice');
    }
}

function setupAutocomplete(inputElement, items, type) {
    console.log(`Setting up autocomplete for ${type}`);
    
    inputElement.addEventListener('click', function (event) {
        console.log(`Input click event triggered for ${type}`);
        activeAutocompleteType = type; // Set the active autocomplete type
        displaySuggestions(this, items, type);
        event.stopPropagation(); // Prevent the event from propagating to the document
    });

    inputElement.addEventListener('input', function () {
        const value = this.value;
        console.log(`Input event triggered for ${type}: ${value}`);
        displaySuggestions(this, items.filter(item => item.toLowerCase().includes(value.toLowerCase())), type);
    });

    document.addEventListener('mousedown', function (event) {
        if (activeAutocompleteType) {
            const suggestionBoxId = `${activeAutocompleteType}-items`;
            const suggestionBox = document.getElementById(suggestionBoxId);
            const inputElement = document.getElementById(activeAutocompleteType);
            
            // Check if the click is outside the active suggestion box and input element
            if (
                suggestionBox && !suggestionBox.contains(event.target) &&
                inputElement && !inputElement.contains(event.target)
            ) {
                console.log(`Click outside detected for ${activeAutocompleteType}`);
                closeSuggestions();
                activeAutocompleteType = null; // Reset the active autocomplete type
            }
        }
    });
}

function displaySuggestions(inputElement, items, type) {
    console.log(`Displaying suggestions for ${type}:`, items);

    const suggestionBoxId = `${type}-items`;
    let suggestionBox = document.getElementById(suggestionBoxId);

    if (!suggestionBox) {
        console.log(`Creating suggestion box for ${type}`);
        suggestionBox = document.createElement('div');
        suggestionBox.id = suggestionBoxId;
        suggestionBox.className = 'autocomplete-items';
        inputElement.parentNode.appendChild(suggestionBox);
    }

    suggestionBox.innerHTML = ''; // Clear previous suggestions

    if (items.length === 0) {
        console.log(`No results found for ${type}`);
        suggestionBox.innerHTML = '<div class="autocomplete-item">No results found</div>';
        suggestionBox.style.display = 'block';
        return;
    }

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'autocomplete-item';
        div.innerHTML = item;
        div.addEventListener('mousedown', function (event) {
            console.log(`${type} selected: ${item}`);
            inputElement.value = item;
            closeSuggestions();
            event.stopPropagation(); // Prevent click event from propagating to the document
        });
        suggestionBox.appendChild(div);
    });

    suggestionBox.style.display = 'block';
}

function closeSuggestions() {
    console.log('Closing all suggestion boxes');
    document.querySelectorAll('.autocomplete-items').forEach(item => {
        item.style.display = 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeAutocomplete(); // Assuming this function initializes the autocomplete functionality

    const form = document.getElementById('custom-form');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);

        // Convert FormData to a plain object
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        try {
            // Send form data via email
            await sendEmail(formObject);

            // Redirect to the thank you page
            window.location.href = 'thankyou.html';
        } catch (error) {
            console.error('Error sending email:', error);
        }
    });
});

async function sendEmail(formData) {
    // Replace these values with your EmailJS configuration
    const serviceID = 'service_h0zxbti';
    const templateID = 'template_pw8py8o';
    const userID = 'SlvWZX1hbOXBA6-e-';

    const data = {
        service_id: serviceID,
        template_id: templateID,
        user_id: userID,
        template_params: {
            'from_name': formData.first_name + ' ' + formData.last_name,
            'first_name': formData.first_name,
            'last_name': formData.last_name,
            'email': formData.email,
            'phone': formData.country_code + ' ' + formData.phone,
            'city': formData.city,
            'service': formData.service
        }
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log('SUCCESS!', response);
}