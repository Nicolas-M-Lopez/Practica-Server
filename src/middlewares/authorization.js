export default function authorization(req, res, next) {
    if (req.session?.email === 'admin@admin.com') {
        return next()
    }
    return res.status(401).redirect('http://localhost:8080')
}