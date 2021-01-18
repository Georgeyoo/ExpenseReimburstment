console.log('24');

const zoomContainer = document.querySelector("#zoom-models");
const cardContainer = document.querySelector("#ticket-card-container");

// Retrieves all tickets for the loggedin User
fetch('http://localhost:8080/P1/api/ticket')
    .then(response => response.json())
    .then(data => {
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

                let dateViewed = document.createElement('p');
                dateViewed.setAttribute("class", "");
                let datetime = data[i].dateStatus; // anything
                let date = new Date(datetime);
                let options = {
                    year: 'numeric', month: 'numeric', day: 'numeric',
                };

                let result = date.toLocaleDateString('en', options);
                dateViewed.innerText = `Ticket status changed on: ${result}`;
                newCard.appendChild(dateViewed);

            } else if (data[i].isChecked === true && data[i].isRejected === true) {
                let rejectIcon = document.createElement('span');
                rejectIcon.innerText = "Rejected";
                rejectIcon.setAttribute("class", "uk-label uk-label-danger");
                let crossIcon = document.createElement('span');
                crossIcon.setAttribute("uk-icon", "icon:close");
                rejectIcon.appendChild(crossIcon);
                newCard.appendChild(rejectIcon);

                let dateViewed = document.createElement('p');
                dateViewed.setAttribute("class", "");
                let datetime = data[i].dateStatus; // anything
                let date = new Date(datetime);
                let options = {
                    year: 'numeric', month: 'numeric', day: 'numeric',
                };

                let result = date.toLocaleDateString('en', options);
                dateViewed.innerText = `Ticket status changed on: ${result}`;
                newCard.appendChild(dateViewed);
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

const adminCardContainer = document.querySelector("#admin-card-container");

// Retrieves all tickets Except for Current User (Admin)
function adminCall() {
    fetch('http://localhost:8080/P1/api/admin/ticket')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            adminCardContainer.innerHTML = "";
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


                let btnDiv = document.createElement('div');
                btnDiv.setAttribute("class", "uk-margin-auto-vertical");


                let ticketId = data[i].t_id;

                let approveBtn = document.createElement('button');
                approveBtn.setAttribute("class", "uk-button uk-button-primary uk-margin-small-right approveBtn");
                approveBtn.setAttribute("uk-icon", "check");
                approveBtn.setAttribute("id", ("approveBtn"));
                approveBtn.setAttribute("value", ticketId);
                btnDiv.appendChild(approveBtn);

                let rejectBtn = document.createElement('button');
                rejectBtn.setAttribute("class", "uk-button uk-button-danger approveBtn");
                rejectBtn.setAttribute("uk-icon", "close");
                rejectBtn.setAttribute("id", ("rejectBtn"));
                rejectBtn.setAttribute("value", ticketId);
                btnDiv.appendChild(rejectBtn);

                newCard.appendChild(btnDiv);

                let showDetailsDiv = document.createElement('div');
                let showDetails = document.createElement('a');
                showDetails.setAttribute("class", "uk-link-muted ");
                showDetails.setAttribute("uk-toggle", "target: #zoomModal" + i);
                showDetails.innerText = "Show Details";
                showDetailsDiv.appendChild(showDetails);
                newCard.appendChild(showDetailsDiv);

                cardDiv.appendChild(newCard);


                adminCardContainer.appendChild(cardDiv);

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

adminCall();

$(adminCardContainer).on('click', '#approveBtn', function (e) {
    console.log("Clicked the approve Button: " + e.target.id);
    console.log(e.target.value);
    let data = new URLSearchParams();
    data.append("id", e.target.value)

    fetch('http://localhost:8080/P1/api/admin/approve?' + data.toString(), {
        method: "PUT"
    })
        .then(response => {
            console.log(response);
            adminCall();
        })
        .catch(err => console.log(err));
})

$(adminCardContainer).on('click', '#rejectBtn', function (e) {
    console.log("Clicked the reject Button: " + e.target.id);
    console.log(e.target.value);
    let data = new URLSearchParams();
    data.append("id", e.target.value)
    fetch('http://localhost:8080/P1/api/admin/reject?' + data.toString(), {
        method: "PUT"
    })
        .then(response => {
            console.log(response);
            adminCall();
        })
        .catch(err => console.log(err));
});

// Search by email
function fetchTicketsByEmail() {
    let data = new URLSearchParams();
    let searchCardContainer = document.querySelector("#search-card-container");

    searchCardContainer.innerHTML = "";

    data.append("email", document.querySelector("#search-input-email").value);


    fetch('http://localhost:8080/P1/api/admin/ticketByEmail?' + data.toString(), {
        method: "GET"
    })
        .then(response => response.json())
        .then(data => {

            console.log(data);
            zoomContainer.innerHTML = "";
            for (let i = 0; i < Object.keys(data).length; i++) {
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

                searchCardContainer.appendChild(cardDiv);

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
}


document.querySelector("#ticket-submit").addEventListener("click", function (e) {
    // e.preventDefault();
    console.log('button clicked!');

    let title = document.querySelector("#ticket-title").value;
    let desc = document.querySelector("#ticket-desc").value;
    let eId = 0;
    let dId = document.querySelector("#departmentId").value;
    let cId = document.querySelector("#categoryId").value;
    let img = document.querySelector("#ticket-title").value;
    let amount = document.querySelector("#ticket-amount").value;

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

    fetch('http://localhost:8080/P1/api/ticket', {
        method: "POST",
        body: JSON.stringify(data)
    }).then(response => {
        //location.reload();
        console.log(response);
    })

})

$("#email-sort-by-date").on("click", function (e) {
    e.preventDefault();
    let data = new URLSearchParams();
    let searchCardContainer = document.querySelector("#search-card-container");

    searchCardContainer.innerHTML = "";

    data.append("email", document.querySelector("#search-input-email").value);


    fetch('http://localhost:8080/P1/api/admin/ticketByEmail?' + data.toString(), {
        method: "GET"
    })
        .then(response => response.json())
        .then(data => {
            zoomContainer.innerHTML = "";
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
                newCard.setAttribute("class", "uk-card-small uk-card-default uk-card-body ticket-card");

                let newTitle = document.createElement('h3');
                newTitle.setAttribute("class", "uk-card-title");
                newTitle.innerText = byDate[i].name;
                newCard.appendChild(newTitle);

                let newEmail = document.createElement('p');
                newEmail.innerText = `User Email: ${byDate[i].email}`;
                newCard.appendChild(newEmail);

                let newAmount = document.createElement('p');
                newAmount.innerText = `Amount: ${byDate[i].amount}`;
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

                searchCardContainer.appendChild(cardDiv);

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


$("#personal-sort-by-date").on("click", function (e) {
    e.preventDefault();

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
                newCard.setAttribute("class", "uk-card-small uk-card-default uk-card-body ticket-card");

                let newTitle = document.createElement('h3');
                newTitle.setAttribute("class", "uk-card-title");
                newTitle.innerText = byDate[i].name;
                newCard.appendChild(newTitle);

                let newEmail = document.createElement('p');
                newEmail.innerText = `User Email: ${byDate[i].email}`;
                newCard.appendChild(newEmail);

                let newAmount = document.createElement('p');
                newAmount.innerText = `Amount: ${byDate[i].amount}`;
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

                    let dateViewed = document.createElement('p');
                    dateViewed.setAttribute("class", "");
                    let datetime = byDate[i].dateStatus; // anything
                    let date = new Date(datetime);
                    let options = {
                        year: 'numeric', month: 'numeric', day: 'numeric',
                    };

                    let result = date.toLocaleDateString('en', options);
                    dateViewed.innerText = `Ticket status changed on: ${result}`;
                    newCard.appendChild(dateViewed);
                } else if (byDate[i].isChecked === true && byDate[i].isRejected === true) {
                    let rejectIcon = document.createElement('span');
                    rejectIcon.innerText = "Rejected";
                    rejectIcon.setAttribute("class", "uk-label uk-label-danger");
                    let crossIcon = document.createElement('span');
                    crossIcon.setAttribute("uk-icon", "icon:close");
                    rejectIcon.appendChild(crossIcon);
                    newCard.appendChild(rejectIcon);

                    let dateViewed = document.createElement('p');
                    dateViewed.setAttribute("class", "");
                    let datetime = byDate[i].dateStatus; // anything
                    let date = new Date(datetime);
                    let options = {
                        year: 'numeric', month: 'numeric', day: 'numeric',
                    };

                    let result = date.toLocaleDateString('en', options);
                    dateViewed.innerText = `Ticket status changed on: ${result}`;
                    newCard.appendChild(dateViewed);
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


$("#admin-sort-by-date").on("click", function (e) {

    e.preventDefault();

    adminCardContainer.innerHTML = "";
    zoomContainer.innerHTML = "";

    fetch('http://localhost:8080/P1/api/admin/ticket')
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
                newAmount.innerText = `Amount: ${byDate[i].amount}`;
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


                let btnDiv = document.createElement('div');
                btnDiv.setAttribute("class", "uk-margin-auto-vertical");


                let ticketId = byDate[i].t_id;

                let approveBtn = document.createElement('button');
                approveBtn.setAttribute("class", "uk-button uk-button-primary uk-margin-small-right approveBtn");
                approveBtn.setAttribute("uk-icon", "check");
                approveBtn.setAttribute("id", ("approveBtn"));
                approveBtn.setAttribute("value", ticketId);
                btnDiv.appendChild(approveBtn);

                let rejectBtn = document.createElement('button');
                rejectBtn.setAttribute("class", "uk-button uk-button-danger approveBtn");
                rejectBtn.setAttribute("uk-icon", "close");
                rejectBtn.setAttribute("id", ("rejectBtn"));
                rejectBtn.setAttribute("value", ticketId);
                btnDiv.appendChild(rejectBtn);

                newCard.appendChild(btnDiv);

                let showDetailsDiv = document.createElement('div');
                let showDetails = document.createElement('a');
                showDetails.setAttribute("class", "uk-link-muted ");
                showDetails.setAttribute("uk-toggle", "target: #zoomModal" + i);
                showDetails.innerText = "Show Details";
                showDetailsDiv.appendChild(showDetails);
                newCard.appendChild(showDetailsDiv);

                cardDiv.appendChild(newCard);

                adminCardContainer.appendChild(cardDiv);

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

                    let dateViewed = document.createElement('p');
                    dateViewed.setAttribute("class", "");
                    let datetime = data[i].dateStatus; // anything
                    let date = new Date(datetime);
                    let options = {
                        year: 'numeric', month: 'numeric', day: 'numeric',
                    };

                    let result = date.toLocaleDateString('en', options);
                    dateViewed.innerText = `Ticket status changed on: ${result}`;
                    newCard.appendChild(dateViewed);

                } else if (data[i].isChecked === true && data[i].isRejected === true) {
                    let rejectIcon = document.createElement('span');
                    rejectIcon.innerText = "Rejected";
                    rejectIcon.setAttribute("class", "uk-label uk-label-danger");
                    let crossIcon = document.createElement('span');
                    crossIcon.setAttribute("uk-icon", "icon:close");
                    rejectIcon.appendChild(crossIcon);
                    newCard.appendChild(rejectIcon);

                    let dateViewed = document.createElement('p');
                    dateViewed.setAttribute("class", "");
                    let datetime = data[i].dateStatus; // anything
                    let date = new Date(datetime);
                    let options = {
                        year: 'numeric', month: 'numeric', day: 'numeric',
                    };

                    let result = date.toLocaleDateString('en', options);
                    dateViewed.innerText = `Ticket status changed on: ${result}`;
                    newCard.appendChild(dateViewed);

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