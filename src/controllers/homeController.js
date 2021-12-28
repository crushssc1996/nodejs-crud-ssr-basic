let getHomePage = (req, res) => {
  // xu li logic, call qua services
  // service call xuong db, lay data
  // let data = yield dataService.getUserFromSubgroup();
  res.render('index.ejs');
}

module.exports = {
  getHomePage
}