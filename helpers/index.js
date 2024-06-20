function rupiah(valuation) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
    valuation,
  )
}

function checkAdmin(req, res, next) {
  if (req.session.userRole !== 'admin') {
    const error = 'You do not have access to this page'
    res.redirect(`/login?error=${error}`)
  }
  next()
}

module.exports = {rupiah, checkAdmin}