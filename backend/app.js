const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv =require("dotenv")

dotenv.config(); 

const { WorkflowClient } = require('@temporalio/client');

const app = express();


app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json()); 

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SCREAT;


app.get('/auth/github', (req, res) => {
  const redirect_uri = 'http://localhost:3001/auth/github/callback';
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}`;
  res.redirect(githubAuthUrl);
});


app.get('/auth/github/callback', async (req, res) => {
  const code = req.query.code;


  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
    })
  });

  const tokenData = await tokenResponse.json();
  const access_token = tokenData.access_token;

  
  const userResponse = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

  const userData = await userResponse.json();

  
  res.redirect(`/profile.html?name=${encodeURIComponent(userData.name)}&login=${encodeURIComponent(userData.login)}&avatar=${encodeURIComponent(userData.avatar_url)}`);
});
app.post('/update', async (req, res) => {
  const userData = req.body;

  const client = new WorkflowClient();

  await client.start('updateProfileWorkflow', {
    workflowId: 'user-' + Date.now(),
    taskQueue: 'profile-queue',
    args: [userData],
  });

  res.json({ msg: "Profile update started. It will be saved shortly." });
});

app.listen(3001, () => {
  console.log(' Server running at http://localhost:3001');
});
