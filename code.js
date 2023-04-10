let numberOfHoles;
let currentHole = 1;
let player1Scores = [];
let player2Scores = [];
const playerName1 = "Michael";
const playerName2 = "Zhenya";

function startGame() {
    numberOfHoles = parseInt(document.getElementById("holeNumber").value);
    currentHole = 1;
    player1Scores = [];
    player2Scores = [];
    document.getElementById("scorecard").innerHTML = `
      <div id="holeScore">
        <br>
        <label for="player1Score">Enter ${playerName1}'s score for hole ${currentHole}:</label>
        <input type="number" id="player1Score">
        <br>
        <br>
        <label for="player2Score">Enter ${playerName2}'s score for hole ${currentHole}:</label>
        <input type="number" id="player2Score">
        <br>
        <button onclick="nextHole(false)">Previous Hole</button>
        <button onclick="nextHole(true)">Next Hole</button>
      </div>`;
  }
  
  function nextHole(next) {
    const player1Score = parseInt(document.getElementById("player1Score").value);
    const player2Score = parseInt(document.getElementById("player2Score").value);
    if (!isNaN(player1Score) && !isNaN(player2Score)) {
      player1Scores[currentHole - 1] = player1Score;
      player2Scores[currentHole - 1] = player2Score;
      if (next) {
        currentHole++;
      } else {
        currentHole--;
      }
      if (currentHole <= numberOfHoles && currentHole > 0) {
        document.getElementById("holeScore").innerHTML = `
          <br>
        <label for="player1Score">Enter ${playerName1}'s score for hole ${currentHole}:</label>
              <input type="number" id="player1Score" value="${player1Scores[currentHole - 1] || ''}">
          <br>
          <br>
          <label for="player2Score">Enter ${playerName2}'s score for hole ${currentHole}:</label>
         <input type="number" id="player2Score" value="${player2Scores[currentHole - 1] || ''}">
          <br>
          <br>
         <button onclick="nextHole(false)">Previous Hole</button>
          <button onclick="nextHole(true)">Next Hole</button>`;
      } else if (currentHole == numberOfHoles + 1) {
        displayResults();
      }
    }
  }
  function displayResults() {
    let total1 = 0;
    let total2 = 0;
    let output = `
      <h2>Final Results</h2>
      <table>
        <tr>
          <th>Hole</th>
          <th>${playerName1}</th>
          <th>${playerName2}</th>
        </tr>`;
    for (let i = 0; i < numberOfHoles; i++) {
      output += `
        <tr>
          <td>${i + 1}</td>
          <td>${player1Scores[i]}</td>
          <td>${player2Scores[i]}</td>
        </tr>`;
      total1 += player1Scores[i];
      total2 += player2Scores[i];
    }
    output += `
        <tr>
          <td>Total</td>
          <td>${total1}</td>
          <td>${total2}</td>
        </tr>
      </table>
      <div>
        <button onclick="takeSelfie()">SELFIE TIME</button>
        <button id="saveBtn" disabled>TAKE SHOT</button>
      </div>
      <div id="camera"></div>`;
    document.getElementById("scorecard").innerHTML = output;
  }
  
  function takeSelfie() {
    const cameraDiv = document.getElementById("camera");
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
  
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      video.srcObject = stream;
      cameraDiv.appendChild(video);
      video.play();
      const saveBtn = document.getElementById("saveBtn");
      saveBtn.disabled = false;
      saveBtn.addEventListener("click", () => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const link = document.createElement("a");
        link.download = "selfie.png";
        link.href = canvas.toDataURL();
        link.click();
        video.pause();
        video.srcObject = null;
        cameraDiv.removeChild(video);
        saveBtn.disabled = true;
      });
    });
  }
  