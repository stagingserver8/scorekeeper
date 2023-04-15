let hole = 1;
let scores = [];

function updateUI() {
    document.getElementById('holeNumber').innerText = hole;

    let previousScores = scores[hole - 1];
    document.getElementById('michaelScore').value = previousScores ? previousScores.michael : '';
    document.getElementById('zhenyaScore').value = previousScores ? previousScores.zhenya : '';

    document.getElementById('previousHole').disabled = hole === 1;
    document.getElementById('nextHole').style.display = hole === 9 ? 'none' : 'inline-block';
    document.getElementById('finishRound').style.display = hole === 9 ? 'inline-block' : 'none';
}

function nextHole() {
    saveScores();
    hole++;
    updateUI();
}

function previousHole() {
    saveScores();
    hole--;
    updateUI();
}

function saveScores() {
    scores[hole - 1] = {
        michael: parseInt(document.getElementById('michaelScore').value),
        zhenya: parseInt(document.getElementById('zhenyaScore').value)
    };
}

function finishRound() {
    saveScores();
    let totalMichael = 0;
    let totalZhenya = 0;
    let scoreDetails = '';

    scores.forEach((score, index) => {
        totalMichael += score.michael;
        totalZhenya += score.zhenya;
        scoreDetails += `Hole ${index + 1}: Michael: ${score.michael}, Zhenya: ${score.zhenya}<br>`;
    });

    document.getElementById('totalMichael').innerText = totalMichael;
    document.getElementById('totalZhenya').innerText = totalZhenya;
    document.getElementById('scoreDetails').innerHTML = scoreDetails;
    document.getElementById('results').style.display = 'block';
}
