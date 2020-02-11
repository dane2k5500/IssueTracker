//Loads the form with new (and existing) issues
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

//Function to create a new issue
function saveIssue(e) {
    var issueDescription = document.getElementById("issueDescriptionInput").value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;

    var issueID = chance.guid();
    var issueStatus = 'Open';

    var newIssue = {
        id: issueID,
        description: issueDescription,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    //If there are no issues, then add one
    if (localStorage.getItem('issues') == null) {
        var issues = [];
        issues.push(newIssue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    //Else, collect the existing issues that are already in local storage
    else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(newIssue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset();
    
    getListOfIssues();
    e.preventDefault();
}

//Function to set the selected issue to "Closed"
function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for (var i = 0; i < issues.length; i++)
    {
        if (issues[i].id == id) {
            issues[i].status = 'Closed';
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));

    getListOfIssues();
}

//Function to delete the selected issue
function deleteIssue(id) {

    var issues = JSON.parse(localStorage.getItem('issues'));

    for (var i = 0; i < issues.length; i++)
    {
        if (issues[i].id == id) {

            //Delete the issue
            issues.splice(i, 1);
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));

    getListOfIssues();
}

//Function to get list of issues
function getListOfIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issueListAssigned = document.getElementById('listOfIssues');

    issueListAssigned.innerHTML = '';

    //Formats the new (and existing) issue
    for (var i = 0; i < issues.length; i++)
    {
        var id = issues[i].id;
        var description = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;

        issueListAssigned.innerHTML += '<div class="well" style="background-color: #E8DAEF">'+
                                       '<h6 style="color: #212F3C">Issue ID: ' + id + '</h6>'+
                                       '<p style="color: #212F3C"><span class="label label-info">' + status + '</span></p>' +
                                       '<h3 style="color: #212F3C">' + description + '</h3>' +
                                       '<p style="color: #212F3C"><span class="glyphicon glyphicon-time"></span> ' + severity + '</p>' +
                                       '<p style="color: #212F3C"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> ' + assignedTo + '</p>' +
                                       '<a href="#" onClick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a>' +
                                       ' <a href="#" onClick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>' +
                                       '</div>';
    }
}