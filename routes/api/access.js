const express = require('express');
const router = express.Router();
const authorizeUser = require('../../controllers/authorizeUser');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

const [_, __, Admin] = ROLES_LIST;

router.route('/').post(verifyRoles(Admin), authorizeUser.handleAuthorizeUser);

module.exports = router;
