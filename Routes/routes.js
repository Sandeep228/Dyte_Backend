const router=require('express').Router;
const {addData,getData}=require('../controller/control.js');


router.post('/',addData);
router.get('/',getData);

module.exports = router;