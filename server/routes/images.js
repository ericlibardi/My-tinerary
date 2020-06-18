const express = require('express')
const imageModel = require('../model/imageModel')
const router = express.Router()
const key = require("../keys")

/* const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" +Date.now() +path.extname(file.originalname))
    }
  });

var upload = multer({storage:storage})

router.get("/:id", (req, res) => {
    const oneImage = imageModel.findOne({_id: req.params.id})
    console.log(oneImage)
})

router.get('/images/:id', (req, res) => {
    var filename = req.params.id;
    
    imageModel.findOne({'_id': req.params.id }, (err, result) => {
    
        if (err) return console.log(err)
    
       res.contentType('image/jpeg');
       res.send(result.image.image.buffer)
      
      })
    })
  

router.get('/all',
    (req, res) => {
        imageModel.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
    });

 */

/* const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

var imageFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error("Only image files are accepted!"), false);
        }
        cb(null, true);
        };

const upload = multer({ storage: storage, fileFilter: imageFilter });*/

const upload = require('../multer')

const cloudinary = require("cloudinary");
cloudinary.config({
cloud_name: "dauygo7be",
api_key: key.CLOUDINARY_API_KEY, // THIS IS COMING FROM CLOUDINARY WHICH WE SAVED FROM EARLIER
api_secret: key.CLOUDINARY_API_SECRET // ALSO COMING FROM CLOUDINARY WHICH WE SAVED EARLIER
});


router.post("/add", upload.single("image"), (req, res) => {

    cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
        if(err) {
            req.json(err.message);
        }
        req.body.image = result.secure_url;
        req.body.imageId = result.public_id;

        imageModel.create(req.body, function(err, image) {
            if (err) {
                res.json(err.message);
                console.log(res.data)
            } else {
                res.send("complete")
            }
        })
    })
})

module.exports = router