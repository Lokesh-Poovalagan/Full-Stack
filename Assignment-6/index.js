const express = require("express");
const app = express();
const PORT = 3000;

function calculateGrade(avg) {
  if (avg >= 90) return "O";
  if (avg >= 80) return "A";
  if (avg >= 70) return "B";
  if (avg >= 60) return "C";
  return "D";
}

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f9;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            form {
                background-color: white;
                padding: 50px;
                width: 500px;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            input, button {
                display: block;
                margin: 10px 0;
                padding: 8px;
                width: 100%;
                max-width: 600px;
                border-radius:5px;
            }
            button {
                background-color: #00d0d6;
                font-weight:600;
                color: black;
                border: none;
                cursor: pointer;
            }
            button:hover {
                background-color: #4cae4c;
            }
        </style>
        <form action="/student" method="post">
            <h2>Enter Student Marks</h2>
            Name: <input type="text" name="name" required><br>
            Marks 1: <input type="number" name="mark1" required><br>
            Marks 2: <input type="number" name="mark2" required><br>
            Marks 3: <input type="number" name="mark3" required><br>
            Marks 4: <input type="number" name="mark4" required><br>
            Marks 5: <input type="number" name="mark5" required><br>
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post("/student", (req, res) => {
  const { name, mark1, mark2, mark3, mark4, mark5 } = req.body;
  const marksArray = [
    parseFloat(mark1),
    parseFloat(mark2),
    parseFloat(mark3),
    parseFloat(mark4),
    parseFloat(mark5),
  ];

  const totalMarks = marksArray.reduce((a, b) => a + b, 0);
  const avg = totalMarks / marksArray.length;
  const grade = calculateGrade(avg);
  const highest = Math.max(...marksArray);
  const lowest = Math.min(...marksArray);

  res.send(`
        <style>
           body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f9;
                color: #333;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }

            .container {
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                padding: 20px;
                max-width: 400px;
                width: 100%;
                text-align: center;
            }

            h1 {
                font-size: 24px;
                color: black;
                margin-bottom: 20px;
            }

            p {
                font-size: 18px;
                margin: 10px 0;
            }

            a {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 15px;
                background-color: #4CAF50;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
                transition: background-color 0.3s ease;
            }

            a:hover {
                background-color: #45a049;
            }
         </style>
        <div class="container">
        <h1>Results for ${name}</h1>
        <p>Total Marks: ${totalMarks}</p>
        <p>Average: ${avg.toFixed(2)}</p>
        <p>Grade: ${grade}</p>
        <p>Highest Mark: ${highest}</p>
        <p>Lowest Mark: ${lowest}</p>
        <a href="/">Go Back</a>
        </div>
    `);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});