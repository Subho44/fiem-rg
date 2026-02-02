const router = require('express').Router();
const path = require('path');
const multer = require('multer');

const jobctrl = require('../controller/jobcontroller');

//local store with multer
const storage = multer.diskStorage({
    destination:(req,file,cb) => cb(null,path.join(__dirname,'..','uploads','jobs')),
    filename:(req,file,cb) => {
     const ext = path.extname(file.originalname).toLowerCase();
     cb(null, `job_${Date.now()}${ext}`);

    }

});

//allow only image

const filefilter = (req,file,cb) => {
    const allowed = ['image/jpeg','image/png','image/jpg','image/webp'];
    if(allowed.includes(file.mimetype)) cb(null,true);
    else cb(new Error('only image files allow'),false);
};

const upload = multer({
    storage,
    filefilter,
    limits:{fileSize:2*1024*1024}
});

router.post('/',upload.single('jobimage'),jobctrl.createjob);
router.get('/',jobctrl.viewjobs);
router.get('/:id',jobctrl.viewsingeljob);
router.delete('/:id',jobctrl.deletejob);

module.exports = router;