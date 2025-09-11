// // // const express = require('express');
// // // const router = express.Router();
// // // const multer = require('multer');
// // // const path = require('path');
// // // const updateController = require('../controllers/updateController');
// // // const { authMiddleware } = require('../middleware/authMiddleware'); // token verify

// // // // Multer setup for media uploads
// // // const storage = multer.diskStorage({
// // //   destination: function (req, file, cb) {
// // //     cb(null, 'uploads/');
// // //   },
// // //   filename: function (req, file, cb) {
// // //     cb(null, Date.now() + path.extname(file.originalname));
// // //   },
// // // });
// // // const upload = multer({ storage });

// // // // Fetch all updates (public)
// // // router.get('/', updateController.getUpdates);

// // // // Create new update (protected route)
// // // router.post('/', authMiddleware, upload.single('media'), updateController.createUpdate);

// // // module.exports = router;




// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const updateController = require('../controllers/updateController');
// const { authMiddleware } = require('../middleware/authMiddleware'); 

// // Multer setup
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage });

// // Public route to fetch all updates
// router.get('/', updateController.getUpdates);

// // Protected route to create update with multiple media files
// router.post(
//   '/',
//   authMiddleware,
//   upload.array('media', 5), // max 5 files per update
//   updateController.createUpdate
// );

// module.exports = router;





const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const updateController = require('../controllers/updateController');
const { authMiddleware, verifyAdmin } = require('../middleware/authMiddleware'); 

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ Public route to fetch all updates
router.get('/', updateController.getUpdates);

// ✅ Protected route to create update with multiple media files
router.post(
  '/',
  authMiddleware,
  upload.array('media', 5), // max 5 files per update
  updateController.createUpdate
);

// ✅ Admin-only delete route
router.delete('/:id', authMiddleware, verifyAdmin, updateController.deleteUpdate);

module.exports = router;
