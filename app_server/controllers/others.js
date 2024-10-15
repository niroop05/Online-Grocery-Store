/* GET 'about' page */
const about = function(req, res) {
    res.render('generic-text', {
      title: 'About Online Groceries',
    });
  };
  
    module.exports = {
        about
      };