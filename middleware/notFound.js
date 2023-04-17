const notFound = (req,res) => {
  res.json({msg:'the route you entered does not exist'})
}

module.exports = notFound