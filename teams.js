var table = document.getElementById('table');
table.classList.add("table");
//get teams
getTeams = (year) => {
    url = 'https://api.mysportsfeeds.com/v1.2/pull/nfl/' + year + '-regular/overall_team_standings.json?sort=team.city.A'
    var teamArray = [];
    fetch(url, {
        headers: {
            'Authorization': 'Basic '+btoa('ggallegos:software'), 
          }
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            var unModdedTeamArray = json.overallteamstandings.teamstandingsentry
            unModdedTeamArray.forEach(function(obj) { 
                teamArray.push(obj)
            });
            showTeams(teamArray);
        });
}

//show teams function
showTeams = (arr) => {
    for (var i = 0; i < arr.length; i++){
        var team = arr[i];
        var tr = document.createElement('tr');   
        var td1 = document.createElement('td');
        var a = document.createElement('a');

        var teamNameRow = document.createElement('td');
        var passPctRow = document.createElement('td');
        var passAvgRow = document.createElement('td');
        var passIntRow = document.createElement('td');
        var rushAvgRow = document.createElement('td');

        //Add Data to Node
        var teamName = document.createTextNode(team.team.City + " " + team.team.Name);
        var passPct = document.createTextNode(team.stats.PassPct['#text']);
        var passAvg = document.createTextNode(team.stats.PassAvg['#text']);
        var passInt = document.createTextNode(team.stats.PassInt['#text']);
        var rushAvg = document.createTextNode(team.stats.RushAverage['#text']); 

        //Add Data to Row
        teamNameRow.appendChild(teamName);
        passPctRow.appendChild(passPct);
        passAvgRow.appendChild(passAvg);
        passIntRow.appendChild(passInt);
        rushAvgRow.appendChild(rushAvg);

        a.appendChild(teamName);
        teamNameRow.appendChild(a);
        a.href="players.html?team=" + team.team.ID;

        //Add Rows to Table
        tr.appendChild(teamNameRow);
        tr.appendChild(passPctRow);
        tr.appendChild(passAvgRow);
        tr.appendChild(passIntRow)
        tr.appendChild(rushAvgRow)

        table.appendChild(tr);
    }
    document.body.appendChild(table);
}

/**
 * draw the table headers
 */
drawTableHeaders = () => {
    var nameHeader = document.createElement('th');
    var name = document.createTextNode('Name');
    nameHeader.appendChild(name)
    table.appendChild(nameHeader);

    var passPctHeader = document.createElement('th');
    var passPct = document.createTextNode('PASS %');
    passPctHeader.appendChild(passPct)
    table.appendChild(passPctHeader);

    var passAvgHeader = document.createElement('th');
    var passAvg = document.createTextNode('Pass Avg');
    passAvgHeader.appendChild(passAvg)
    table.appendChild(passAvgHeader);

    var passIntHeader = document.createElement('th');
    var passInt = document.createTextNode('Pass Int');
    passIntHeader.appendChild(passInt)
    table.appendChild(passIntHeader);

    var rushAvgHeader = document.createElement('th');
    var rushAvg = document.createTextNode('Rush Avg');
    rushAvgHeader.appendChild(rushAvg)
    table.appendChild(rushAvgHeader);
}

function yearChange() {
    var year = document.getElementById("dropdown").value;
    
    while(table.hasChildNodes())
    {
       table.removeChild(table.firstChild);
    }
    getTeams(year);
    drawTableHeaders();
    //getPlayerInfo(year);
}

drawTableHeaders();
getTeams(2017);