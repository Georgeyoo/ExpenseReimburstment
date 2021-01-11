console.log('44');

const zoomContainer = document.querySelector("#zoom-models");
const cardContainer = document.querySelector("#ticket-card-container");

// Retrieves all tickets for the loggedin User
function getAllTickets() {
    fetch('http://localhost:8080/P1/api/ticket')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            cardContainer.innerHTML = "";
            zoomContainer.innerHTML = "";

            for (let i = 0; i < Object.keys(data).length; i++) {
                let cardDiv = document.createElement('div');
                let newCard = document.createElement('div');
                newCard.setAttribute("class", "uk-card uk-card-small uk-card-hover uk-card-body ticket-card");

                let newTitle = document.createElement('h3');
                newTitle.setAttribute("class", "uk-card-title");
                newTitle.innerText = data[i].name;
                newCard.appendChild(newTitle);

                let newEmail = document.createElement('p');
                newEmail.innerText = `User Email: ${data[i].email}`;
                newCard.appendChild(newEmail);

                let newAmount = document.createElement('p');
                newAmount.innerText = `Amount: $${data[i].amount}`;
                newCard.appendChild(newAmount);

                let dateSubmitted = document.createElement('p');
                dateSubmitted.setAttribute("class", "");
                let datetime = data[i].dateSubmitted; // anything
                let date = new Date(datetime);
                let options = {
                    year: 'numeric', month: 'numeric', day: 'numeric',
                };

                let result = date.toLocaleDateString('en', options);
                dateSubmitted.innerText = `Ticket Creation Date: ${result}`;
                newCard.appendChild(dateSubmitted);

                if (data[i].isChecked === true && data[i].isRejected === false) {
                    let approveIcon = document.createElement('span');
                    approveIcon.innerText = "Approved";
                    approveIcon.setAttribute("class", "uk-label uk-label-success");
                    let checkIcon = document.createElement('span');
                    checkIcon.setAttribute("uk-icon", "icon:check");
                    approveIcon.appendChild(checkIcon);
                    newCard.appendChild(approveIcon);

                } else if (data[i].isChecked === true && data[i].isRejected === true) {
                    let rejectIcon = document.createElement('span');
                    rejectIcon.innerText = "Rejected";
                    rejectIcon.setAttribute("class", "uk-label uk-label-danger");
                    let crossIcon = document.createElement('span');
                    crossIcon.setAttribute("uk-icon", "icon:close");
                    rejectIcon.appendChild(crossIcon);
                    newCard.appendChild(rejectIcon);

                } else if (data[i].isChecked === false) {
                    let awaitingIcon = document.createElement('span');
                    awaitingIcon.innerText = "Awaiting Review";
                    awaitingIcon.setAttribute("class", "uk-label uk-label-warning");
                    let clockIcon = document.createElement('span');
                    clockIcon.setAttribute("uk-icon", "icon:clock");
                    awaitingIcon.appendChild(clockIcon);
                    newCard.appendChild(awaitingIcon);
                }

                let showDetailsDiv = document.createElement('div');
                let showDetails = document.createElement('a');
                showDetails.setAttribute("class", "uk-link-muted ");
                showDetails.setAttribute("uk-toggle", "target: #zoomModal" + i);
                showDetails.innerText = "Show Details";
                showDetailsDiv.appendChild(showDetails);
                newCard.appendChild(showDetailsDiv);

                cardDiv.appendChild(newCard);

                cardContainer.appendChild(cardDiv);

                let zoomSubmitDate = data[i].dateSubmitted
                let zoomSubmitFormated = new Date(zoomSubmitDate);
                let zoomSubmitOptions = {
                    year: 'numeric', month: 'numeric', day: 'numeric'
                };
                let zoomSubmitResult = zoomSubmitFormated.toLocaleDateString('en', zoomSubmitOptions);

                let newZoomContainer =
                    `<div id="zoomModal${i}" uk-modal>
                        <div class="uk-modal-dialog uk-margin-auto-vertical">
    
                            <div class="uk-modal-header">
                                <h3 class="uk-modal-title">${data[i].name}</h3>
                            </div>
                            
                            <div class="uk-modal-body zoomBody" uk-overflow-auto>
                                <p><b>Description:</b> <span class="zoomText">${data[i].desc}<span></p>
                                
                                <p><b>Expense Amount:</b> <span class="zoomText">$${data[i].amount}</span></p>
                                
                                <p><b>Expense Creation Date:</b> <span class="">${zoomSubmitResult}</span></p>
                                
                                <p><b>Department:</b> <span>${data[i].department}</span></p>
                                <p><b>Category:</b> <span>${data[i].category}</span></p>
                                
                            </div>
                            <div class="uk-modal-footer uk-text-right">
                                <button class="uk-button uk-button-primary uk-modal-close" type="button">Close</button>
                            </div>
                        </div>
                    </div>`

                zoomContainer.innerHTML += newZoomContainer
            }

        });
}

getAllTickets();


document.querySelector("#ticket-submit").addEventListener("click", function (e) {
    e.preventDefault();
    console.log('button clicked!');

    let title = document.querySelector("#ticket-title").value;
    let desc = document.querySelector("#ticket-desc").value;
    let eId = 0;
    let dId = document.querySelector("#departmentId").value;
    let cId = document.querySelector("#categoryId").value;
    let img = document.querySelector("#ticket-img").files;
    let amount = document.querySelector("#ticket-amount").value;

    // let ticketForm = document.querySelector("#ticket-form");
    // let form = new FormData(document.querySelector("#ticket-form"));

    // for (var p of form.entries()) {
    //     console.log(p[0] + ', ' + p[1]);
    // }

    let data = {
        "userId": eId,
        "departmentId": dId,
        "categoryId": cId,
        "name": title,
        "desc": desc,
        "image": null,
        "dateSubmitted": null,
        "dateStatus": null,
        "isChecked": false,
        "isRejected": false,
        "amount": amount
    }

    // console.log(imgFinal);

    fetch('http://localhost:8080/P1/api/ticket', {
        method: "POST",
        body: JSON.stringify(data)
    })
        .then(response => {
            console.log(response.status);
            getAllTickets();
        })

    // fetch('http://localhost:8080/P1/api/ticket', {
    //     method: "POST",
    //     body: form
    // })
    //     .then(response => {
    //         console.log(response.status);
    //         getAllTickets();
    //     })
})

$("#personal-sort-by-date").on("click", function (e) {
    e.preventDefault();
    console.log('ive been clicked');
    cardContainer.innerHTML = "";
    zoomContainer.innerHTML = "";

    fetch('http://localhost:8080/P1/api/ticket')
        .then(response => response.json())
        .then(data => {

            console.log(data);

            // use slice() to copy the array and not just make a reference
            let byDate = data.slice(0);
            byDate.sort(function (a, b) {
                return b.dateStatus - a.dateStatus;
            });
            console.log('by date:');
            console.log(byDate);

            for (let i = 0; i < Object.keys(byDate).length; i++) {
                let cardDiv = document.createElement('div');
                let newCard = document.createElement('div');
                newCard.setAttribute("class", "uk-card uk-card-small uk-card-hover uk-card-body ticket-card");

                let newTitle = document.createElement('h3');
                newTitle.setAttribute("class", "uk-card-title");
                newTitle.innerText = byDate[i].name;
                newCard.appendChild(newTitle);

                let newEmail = document.createElement('p');
                newEmail.innerText = `User Email: ${byDate[i].email}`;
                newCard.appendChild(newEmail);

                let newAmount = document.createElement('p');
                newAmount.innerText = `Amount: $${byDate[i].amount}`;
                newCard.appendChild(newAmount);

                let dateSubmitted = document.createElement('p');
                dateSubmitted.setAttribute("class", "");
                let datetime = byDate[i].dateSubmitted; // anything
                let date = new Date(datetime);
                let options = {
                    year: 'numeric', month: 'numeric', day: 'numeric',
                };

                let result = date.toLocaleDateString('en', options);
                dateSubmitted.innerText = `Ticket Creation Date: ${result}`;
                newCard.appendChild(dateSubmitted);

                if (byDate[i].isChecked === true && byDate[i].isRejected === false) {
                    let approveIcon = document.createElement('span');
                    approveIcon.innerText = "Approved";
                    approveIcon.setAttribute("class", "uk-label uk-label-success");
                    let checkIcon = document.createElement('span');
                    checkIcon.setAttribute("uk-icon", "icon:check");
                    approveIcon.appendChild(checkIcon);
                    newCard.appendChild(approveIcon);

                } else if (byDate[i].isChecked === true && byDate[i].isRejected === true) {
                    let rejectIcon = document.createElement('span');
                    rejectIcon.innerText = "Rejected";
                    rejectIcon.setAttribute("class", "uk-label uk-label-danger");
                    let crossIcon = document.createElement('span');
                    crossIcon.setAttribute("uk-icon", "icon:close");
                    rejectIcon.appendChild(crossIcon);
                    newCard.appendChild(rejectIcon);

                } else if (byDate[i].isChecked === false) {
                    let awaitingIcon = document.createElement('span');
                    awaitingIcon.innerText = "Awaiting Review";
                    awaitingIcon.setAttribute("class", "uk-label uk-label-warning");
                    let clockIcon = document.createElement('span');
                    clockIcon.setAttribute("uk-icon", "icon:clock");
                    awaitingIcon.appendChild(clockIcon);
                    newCard.appendChild(awaitingIcon);
                }

                let showDetailsDiv = document.createElement('div');
                let showDetails = document.createElement('a');
                showDetails.setAttribute("class", "uk-link-muted ");
                showDetails.setAttribute("uk-toggle", "target: #zoomModal" + i);
                showDetails.innerText = "Show Details";
                showDetailsDiv.appendChild(showDetails);
                newCard.appendChild(showDetailsDiv);

                cardDiv.appendChild(newCard);

                cardContainer.appendChild(cardDiv);

                let zoomSubmitDate = byDate[i].dateSubmitted
                let zoomSubmitFormated = new Date(zoomSubmitDate);
                let zoomSubmitOptions = {
                    year: 'numeric', month: 'numeric', day: 'numeric'
                };
                let zoomSubmitResult = zoomSubmitFormated.toLocaleDateString('en', zoomSubmitOptions);

                let newZoomContainer =
                    `<div id="zoomModal${i}" uk-modal>
                        <div class="uk-modal-dialog uk-margin-auto-vertical">
    
                            <div class="uk-modal-header">
                                <h3 class="uk-modal-title">${byDate[i].name}</h3>
                            </div>
                            
                            <div class="uk-modal-body zoomBody" uk-overflow-auto>
                                <p><b>Description:</b> <span class="zoomText">${byDate[i].desc}<span></p>
                                
                                <p><b>Expense Amount:</b> <span class="zoomText">$${byDate[i].amount}</span></p>
                                
                                <p><b>Expense Creation Date:</b> <span class="">${zoomSubmitResult}</span></p>
                                
                                <p><b>Department:</b> <span>${byDate[i].department}</span></p>
                                <p><b>Category:</b> <span>${byDate[i].category}</span></p>
                                
                            </div>
                            <div class="uk-modal-footer uk-text-right">
                                <button class="uk-button uk-button-primary uk-modal-close" type="button">Close</button>
                            </div>
                        </div>
                    </div>`

                zoomContainer.innerHTML += newZoomContainer
            }

        })
    return false;

})


$("#personal-approved").on("click", function (e) {
    console.log('hey!')
    e.preventDefault();

    cardContainer.innerHTML = "";
    zoomContainer.innerHTML = "";

    fetch('http://localhost:8080/P1/api/ticket')
        .then(response => response.json())
        .then(data => {

            console.log(data);

            for (let i = 0; i < Object.keys(data).length; i++) {

                if (data[i].isChecked === true && data[i].isRejected === false) {
                    let cardDiv = document.createElement('div');

                    let newCard = document.createElement('div');
                    newCard.setAttribute("class", "uk-card-small uk-card-default uk-card-body ticket-card");

                    let newTitle = document.createElement('h3');
                    newTitle.setAttribute("class", "uk-card-title");
                    newTitle.innerText = data[i].name;
                    newCard.appendChild(newTitle);

                    let newEmail = document.createElement('p');
                    newEmail.innerText = `User Email: ${data[i].email}`;
                    newCard.appendChild(newEmail);

                    let newAmount = document.createElement('p');
                    newAmount.innerText = `Amount: ${data[i].amount}`;
                    newCard.appendChild(newAmount);

                    let dateSubmitted = document.createElement('p');
                    dateSubmitted.setAttribute("class", "");
                    let datetime = data[i].dateSubmitted; // anything
                    let date = new Date(datetime);
                    let options = {
                        year: 'numeric', month: 'numeric', day: 'numeric',
                    };

                    let result = date.toLocaleDateString('en', options);
                    dateSubmitted.innerText = `Ticket Creation Date: ${result}`;
                    newCard.appendChild(dateSubmitted);

                    let approveIcon = document.createElement('span');
                    approveIcon.innerText = "Approved";
                    approveIcon.setAttribute("class", "uk-label uk-label-success");
                    let checkIcon = document.createElement('span');
                    checkIcon.setAttribute("uk-icon", "icon:check");
                    approveIcon.appendChild(checkIcon);
                    newCard.appendChild(approveIcon);

                    let showDetailsDiv = document.createElement('div');
                    let showDetails = document.createElement('a');
                    showDetails.setAttribute("class", "uk-link-muted ");
                    showDetails.setAttribute("uk-toggle", "target: #zoomModal" + i);
                    showDetails.innerText = "Show Details";
                    showDetailsDiv.appendChild(showDetails);
                    newCard.appendChild(showDetailsDiv);

                    cardDiv.appendChild(newCard);

                    cardContainer.appendChild(cardDiv);

                    let zoomSubmitDate = data[i].dateSubmitted
                    let zoomSubmitFormated = new Date(zoomSubmitDate);
                    let zoomSubmitOptions = {
                        year: 'numeric', month: 'numeric', day: 'numeric'
                    };
                    let zoomSubmitResult = zoomSubmitFormated.toLocaleDateString('en', zoomSubmitOptions);

                    let newZoomContainer =
                        `<div id="zoomModal${i}" uk-modal>
                            <div class="uk-modal-dialog uk-margin-auto-vertical">
        
                                <div class="uk-modal-header">
                                    <h3 class="uk-modal-title">${data[i].name}</h3>
                                </div>
                                
                                <div class="uk-modal-body zoomBody" uk-overflow-auto>
                                    <p><b>Description:</b> <span class="zoomText">${data[i].desc}<span></p>
                                    
                                    <p><b>Expense Amount:</b> <span class="zoomText">$${data[i].amount}</span></p>
                                    
                                    <p><b>Expense Creation Date:</b> <span class="">${zoomSubmitResult}</span></p>
                                    
                                    <p><b>Department:</b> <span>${data[i].department}</span></p>
                                    <p><b>Category:</b> <span>${data[i].category}</span></p>
                                    
                                </div>
                                <div class="uk-modal-footer uk-text-right">
                                    <button class="uk-button uk-button-primary uk-modal-close" type="button">Close</button>
                                </div>
                            </div>
                        </div>`

                    zoomContainer.innerHTML += newZoomContainer


                }

            }

        })
    return false;
})

$("#personal-awaiting").on("click", function (e) {
    console.log('hey!')
    e.preventDefault();

    cardContainer.innerHTML = "";
    zoomContainer.innerHTML = "";

    fetch('http://localhost:8080/P1/api/ticket')
        .then(response => response.json())
        .then(data => {

            console.log(data);

            for (let i = 0; i < Object.keys(data).length; i++) {

                if (data[i].isChecked === false) {
                    let cardDiv = document.createElement('div');

                    let newCard = document.createElement('div');
                    newCard.setAttribute("class", "uk-card-small uk-card-default uk-card-body ticket-card");

                    let newTitle = document.createElement('h3');
                    newTitle.setAttribute("class", "uk-card-title");
                    newTitle.innerText = data[i].name;
                    newCard.appendChild(newTitle);

                    let newEmail = document.createElement('p');
                    newEmail.innerText = `User Email: ${data[i].email}`;
                    newCard.appendChild(newEmail);

                    let newAmount = document.createElement('p');
                    newAmount.innerText = `Amount: ${data[i].amount}`;
                    newCard.appendChild(newAmount);

                    let dateSubmitted = document.createElement('p');
                    dateSubmitted.setAttribute("class", "");
                    let datetime = data[i].dateSubmitted; // anything
                    let date = new Date(datetime);
                    let options = {
                        year: 'numeric', month: 'numeric', day: 'numeric',
                    };

                    let result = date.toLocaleDateString('en', options);
                    dateSubmitted.innerText = `Ticket Creation Date: ${result}`;
                    newCard.appendChild(dateSubmitted);

                    let awaitingIcon = document.createElement('span');
                    awaitingIcon.innerText = "Awaiting Review";
                    awaitingIcon.setAttribute("class", "uk-label uk-label-warning");
                    let clockIcon = document.createElement('span');
                    clockIcon.setAttribute("uk-icon", "icon:clock");
                    awaitingIcon.appendChild(clockIcon);
                    newCard.appendChild(awaitingIcon);

                    let showDetailsDiv = document.createElement('div');
                    let showDetails = document.createElement('a');
                    showDetails.setAttribute("class", "uk-link-muted ");
                    showDetails.setAttribute("uk-toggle", "target: #zoomModal" + i);
                    showDetails.innerText = "Show Details";
                    showDetailsDiv.appendChild(showDetails);
                    newCard.appendChild(showDetailsDiv);

                    cardDiv.appendChild(newCard);

                    cardContainer.appendChild(cardDiv);

                    let zoomSubmitDate = data[i].dateSubmitted
                    let zoomSubmitFormated = new Date(zoomSubmitDate);
                    let zoomSubmitOptions = {
                        year: 'numeric', month: 'numeric', day: 'numeric'
                    };
                    let zoomSubmitResult = zoomSubmitFormated.toLocaleDateString('en', zoomSubmitOptions);

                    let newZoomContainer =
                        `<div id="zoomModal${i}" uk-modal>
                            <div class="uk-modal-dialog uk-margin-auto-vertical">
        
                                <div class="uk-modal-header">
                                    <h3 class="uk-modal-title">${data[i].name}</h3>
                                </div>
                                
                                <div class="uk-modal-body zoomBody" uk-overflow-auto>
                                    <p><b>Description:</b> <span class="zoomText">${data[i].desc}<span></p>
                                    
                                    <p><b>Expense Amount:</b> <span class="zoomText">$${data[i].amount}</span></p>
                                    
                                    <p><b>Expense Creation Date:</b> <span class="">${zoomSubmitResult}</span></p>
                                    
                                    <p><b>Department:</b> <span>${data[i].department}</span></p>
                                    <p><b>Category:</b> <span>${data[i].category}</span></p>
                                    
                                </div>
                                <div class="uk-modal-footer uk-text-right">
                                    <button class="uk-button uk-button-primary uk-modal-close" type="button">Close</button>
                                </div>
                            </div>
                        </div>`

                    zoomContainer.innerHTML += newZoomContainer


                }

            }

        })
    return false;
})

$("#personal-rejected").on("click", function (e) {
    console.log('hey!')
    e.preventDefault();

    cardContainer.innerHTML = "";
    zoomContainer.innerHTML = "";

    fetch('http://localhost:8080/P1/api/ticket')
        .then(response => response.json())
        .then(data => {

            console.log(data);

            for (let i = 0; i < Object.keys(data).length; i++) {

                if (data[i].isChecked === true && data[i].isRejected === true) {
                    let cardDiv = document.createElement('div');

                    let newCard = document.createElement('div');
                    newCard.setAttribute("class", "uk-card-small uk-card-default uk-card-body ticket-card");

                    let newTitle = document.createElement('h3');
                    newTitle.setAttribute("class", "uk-card-title");
                    newTitle.innerText = data[i].name;
                    newCard.appendChild(newTitle);

                    let newEmail = document.createElement('p');
                    newEmail.innerText = `User Email: ${data[i].email}`;
                    newCard.appendChild(newEmail);

                    let newAmount = document.createElement('p');
                    newAmount.innerText = `Amount: ${data[i].amount}`;
                    newCard.appendChild(newAmount);

                    let dateSubmitted = document.createElement('p');
                    dateSubmitted.setAttribute("class", "");
                    let datetime = data[i].dateSubmitted; // anything
                    let date = new Date(datetime);
                    let options = {
                        year: 'numeric', month: 'numeric', day: 'numeric',
                    };

                    let result = date.toLocaleDateString('en', options);
                    dateSubmitted.innerText = `Ticket Creation Date: ${result}`;
                    newCard.appendChild(dateSubmitted);

                    let rejectIcon = document.createElement('span');
                    rejectIcon.innerText = "Rejected";
                    rejectIcon.setAttribute("class", "uk-label uk-label-danger");
                    let crossIcon = document.createElement('span');
                    crossIcon.setAttribute("uk-icon", "icon:close");
                    rejectIcon.appendChild(crossIcon);
                    newCard.appendChild(rejectIcon);

                    let showDetailsDiv = document.createElement('div');
                    let showDetails = document.createElement('a');
                    showDetails.setAttribute("class", "uk-link-muted ");
                    showDetails.setAttribute("uk-toggle", "target: #zoomModal" + i);
                    showDetails.innerText = "Show Details";
                    showDetailsDiv.appendChild(showDetails);
                    newCard.appendChild(showDetailsDiv);

                    cardDiv.appendChild(newCard);

                    cardContainer.appendChild(cardDiv);

                    let zoomSubmitDate = data[i].dateSubmitted
                    let zoomSubmitFormated = new Date(zoomSubmitDate);
                    let zoomSubmitOptions = {
                        year: 'numeric', month: 'numeric', day: 'numeric'
                    };
                    let zoomSubmitResult = zoomSubmitFormated.toLocaleDateString('en', zoomSubmitOptions);

                    let newZoomContainer =
                        `<div id="zoomModal${i}" uk-modal>
                            <div class="uk-modal-dialog uk-margin-auto-vertical">
        
                                <div class="uk-modal-header">
                                    <h3 class="uk-modal-title">${data[i].name}</h3>
                                </div>
                                
                                <div class="uk-modal-body zoomBody" uk-overflow-auto>
                                    <p><b>Description:</b> <span class="zoomText">${data[i].desc}<span></p>
                                    
                                    <p><b>Expense Amount:</b> <span class="zoomText">$${data[i].amount}</span></p>
                                    
                                    <p><b>Expense Creation Date:</b> <span class="">${zoomSubmitResult}</span></p>
                                    
                                    <p><b>Department:</b> <span>${data[i].department}</span></p>
                                    <p><b>Category:</b> <span>${data[i].category}</span></p>
                                    
                                </div>
                                <div class="uk-modal-footer uk-text-right">
                                    <button class="uk-button uk-button-primary uk-modal-close" type="button">Close</button>
                                </div>
                            </div>
                        </div>`

                    zoomContainer.innerHTML += newZoomContainer


                }

            }

        })
    return false;
})

$("#personal-all").on("click", function (e) {
    console.log('hey!')
    e.preventDefault();

    cardContainer.innerHTML = "";
    zoomContainer.innerHTML = "";

    fetch('http://localhost:8080/P1/api/ticket')
        .then(response => response.json())
        .then(data => {

            for (let i = 0; i < Object.keys(data).length; i++) {
                let cardDiv = document.createElement('div');
                let newCard = document.createElement('div');
                newCard.setAttribute("class", "uk-card uk-card-small uk-card-hover uk-card-body ticket-card");

                let newTitle = document.createElement('h3');
                newTitle.setAttribute("class", "uk-card-title");
                newTitle.innerText = data[i].name;
                newCard.appendChild(newTitle);

                let newEmail = document.createElement('p');
                newEmail.innerText = `User Email: ${data[i].email}`;
                newCard.appendChild(newEmail);

                let newAmount = document.createElement('p');
                newAmount.innerText = `Amount: ${data[i].amount}`;
                newCard.appendChild(newAmount);

                let dateSubmitted = document.createElement('p');
                dateSubmitted.setAttribute("class", "");
                let datetime = data[i].dateSubmitted; // anything
                let date = new Date(datetime);
                let options = {
                    year: 'numeric', month: 'numeric', day: 'numeric',
                };

                let result = date.toLocaleDateString('en', options);
                dateSubmitted.innerText = `Ticket Creation Date: ${result}`;
                newCard.appendChild(dateSubmitted);

                if (data[i].isChecked === true && data[i].isRejected === false) {
                    let approveIcon = document.createElement('span');
                    approveIcon.innerText = "Approved";
                    approveIcon.setAttribute("class", "uk-label uk-label-success");
                    let checkIcon = document.createElement('span');
                    checkIcon.setAttribute("uk-icon", "icon:check");
                    approveIcon.appendChild(checkIcon);
                    newCard.appendChild(approveIcon);

                } else if (data[i].isChecked === true && data[i].isRejected === true) {
                    let rejectIcon = document.createElement('span');
                    rejectIcon.innerText = "Rejected";
                    rejectIcon.setAttribute("class", "uk-label uk-label-danger");
                    let crossIcon = document.createElement('span');
                    crossIcon.setAttribute("uk-icon", "icon:close");
                    rejectIcon.appendChild(crossIcon);
                    newCard.appendChild(rejectIcon);

                } else if (data[i].isChecked === false) {
                    let awaitingIcon = document.createElement('span');
                    awaitingIcon.innerText = "Awaiting Review";
                    awaitingIcon.setAttribute("class", "uk-label uk-label-warning");
                    let clockIcon = document.createElement('span');
                    clockIcon.setAttribute("uk-icon", "icon:clock");
                    awaitingIcon.appendChild(clockIcon);
                    newCard.appendChild(awaitingIcon);
                }

                let showDetailsDiv = document.createElement('div');
                let showDetails = document.createElement('a');
                showDetails.setAttribute("class", "uk-link-muted ");
                showDetails.setAttribute("uk-toggle", "target: #zoomModal" + i);
                showDetails.innerText = "Show Details";
                showDetailsDiv.appendChild(showDetails);
                newCard.appendChild(showDetailsDiv);

                cardDiv.appendChild(newCard);

                cardContainer.appendChild(cardDiv);

                let zoomSubmitDate = data[i].dateSubmitted
                let zoomSubmitFormated = new Date(zoomSubmitDate);
                let zoomSubmitOptions = {
                    year: 'numeric', month: 'numeric', day: 'numeric'
                };
                let zoomSubmitResult = zoomSubmitFormated.toLocaleDateString('en', zoomSubmitOptions);

                let newZoomContainer =
                    `<div id="zoomModal${i}" uk-modal>
                        <div class="uk-modal-dialog uk-margin-auto-vertical">
    
                            <div class="uk-modal-header">
                                <h3 class="uk-modal-title">${data[i].name}</h3>
                            </div>
                            
                            <div class="uk-modal-body zoomBody" uk-overflow-auto>
                                <p><b>Description:</b> <span class="zoomText">${data[i].desc}<span></p>
                                
                                <p><b>Expense Amount:</b> <span class="zoomText">$${data[i].amount}</span></p>
                                
                                <p><b>Expense Creation Date:</b> <span class="">${zoomSubmitResult}</span></p>
                                
                                <p><b>Department:</b> <span>${data[i].department}</span></p>
                                <p><b>Category:</b> <span>${data[i].category}</span></p>
                                
                            </div>
                            <div class="uk-modal-footer uk-text-right">
                                <button class="uk-button uk-button-primary uk-modal-close" type="button">Close</button>
                            </div>
                        </div>
                    </div>`

                zoomContainer.innerHTML += newZoomContainer
            }

        })
    return false;
})