const multer = require("multer");
const TaskData = require('../model/TaskData');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/media/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) +'.'+file.mimetype.split('/')[1];
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 15
    },
    fileFilter: fileFilter
}).single('image');


const saveImageToDB = async (taskId, userId, path) => {
 
    try {
        const result = await TaskData.create({
            taskId: taskId,
            content: { type: "image", content: path },
            userId: userId
        });

        return result

    } catch (err) {
        console.error(err);
    }
}

const uploadData = (req, res) => {

            upload(req, res, async function (err) {
              if (err instanceof multer.MulterError) {
                console.log({ err });
              } else if (err) {
                console.log({ error: err });
              }
              
              const saved = await saveImageToDB(
                req.body.taskId,
                req.userId,
                req.file.path.split('/').splice(1).join('/')
              );
              let newSaved = await { ...saved._doc };
              delete newSaved.__v;

              res
                .status(201)
                .json({
                  response: "ok",
                  message: "data uploaded",
                  data: newSaved,
                });
            });
}  
      
      
      module.exports = { uploadData }