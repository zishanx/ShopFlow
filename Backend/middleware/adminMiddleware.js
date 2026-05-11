
const  admin = (req, res, next) => {
if(req.user.role === 'admin'){
    next()
}else {
    res.staus(403).json("Access denied");
}
}

export default admin