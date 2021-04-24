const express = require('express');
const app = express.Router();
const TYPES = require('../constants/mediaTypes')
const multer = require('multer');
const path = require('path');
const fs = require('fs')
const fsPromises = fs.promises;
const repository = require('../repositories/mediaRepository');
const upload = multer({
  dest: '../uploads'
});

app.get('/get-image', (req,res) => {
  const name = req.query.name;
res.sendFile(path.join(__dirname, name));
});


app.get('/images', async (req,res) => {
  const images = await repository.findByType(TYPES.IMAGE);
  res.json(images);
});

app.get('/videos', async (req,res) => {
  const images = await repository.findByType(TYPES.VIDEO);
  res.json(images);
});

app.use(function (req, res, next) {
  if (req.user && req.user.state === USERSTATE.ADMIN) {
    next();
  } else {
    res.send('Access denied');
  }
});

app.post('/upload-images', upload.array('files', 20), async (req, res) => {
  
    for (let file of req.files) {
        const extname = path.extname(file.originalname).toLowerCase();
        const tempPath = file.path;
        const tempWithExt =  tempPath + extname;
        const targetPath = path.join(__dirname, tempWithExt);
        await fsPromises.rename(tempPath, targetPath);

        const media = await repository.create({link: tempWithExt, type: TYPES.IMAGE});
    }
    res.json([]);
  
    });

    app.post('/upload-video',  async (req, res) => {
        const { link } = req.body;
         const video = await repository.create({link, type: TYPES.VIDEO});
        res.json(video);
      
        });

    
      app.delete('/:id', async (req, res) => {
        try {
          const { id } = req.params;
          const file = await repository.findById(id);
        
          if (file.type === TYPES.IMAGE) {
            const res = await fsPromises.unlink(path.join(__dirname, file.link));
          }
        await repository.deleteById(id);
          res.status(200).json([]);
        } catch (e) {
      console.log(e)
        }
        
      });

module.exports = app;
