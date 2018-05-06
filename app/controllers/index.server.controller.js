/*The render function will render our index page.*/
exports.render = function(req, res) {
  /* Add other preprocessing for the index here */

//  // session page views:
//  if (req.session.page_views) {
//    req.session.page_views++;
//    console.log("You visited this page " + req.session.page_views + " times");
//    // res.send("You visited this page " + req.session.page_views + " times");
//  } else {
//    req.session.page_views = 1;
//    console.log("Welcome to this page for the first time!");
//    // res.send("Welcome to this page for the first time!");
//  }

  res.render('index', {
    /* Add other attributes to pass to the index.ejs here. */
    title : 'Park Reservation'
  });
};
