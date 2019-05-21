const express = require('express'),
    path = require('path');

const app = express();

app.use(express.static('../Exam'));

app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname, './src/index.html'));
});

app.listen(process.env.PORT || 4200, () => {
  console.log('Server started');
})
