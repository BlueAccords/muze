const path = require('path');
const express = require('express');
const cors = require('cors');
module.exports = {
  app: function () {
    const app = express();
    const indexPath = path.join(__dirname, '../dist/index.html');
    const publicPath = express.static(path.join(__dirname, '../dist'));
    
    app.use(publicPath);
    console.log(indexPath);
    app.get('*', function (req, res) {
      res.sendFile(indexPath) 
    });

    app.use(cors())

    return app;
  }
}