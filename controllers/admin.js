const Product = require('../models/product');

exports.getAddTicket = (req, res, next) => {
  res.render('admin/edit-ticket', {
    pageTitle: 'Add Ticket',
    path: '/admin/add-ticket',
    editing: false
  });
};

exports.postAddTicket = (req, res, next) => {
  console.log("req body", req.body)
  const performance_title = req.body.performance_title;
  const performance_time = req.body.performance_time;
  const ticket_price = req.body.ticket_price;
  const customer_name = req.body.customer_name;
  const product = new Product({
    performance_title: performance_title,
    performance_time: performance_time,
    ticket_price: ticket_price,
    customer_name: customer_name,
    creation_date: new Date()
  });
  product
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Ticket');
      res.redirect('/admin/tickets');
    })
    .catch(err => {
      res.status(400).send(err.message);
    });
};

exports.getEditTicket = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-ticket', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-ticket',
        editing: editMode,
        ticket: product
      });
    })
    .catch(err => next(err));
};

exports.postEditTicket = (req, res, next) => {
  const tktId = req.body.ticketId;
  const performance_title = req.body.performance_title;
  const performance_time = req.body.performance_time;
  const ticket_price = req.body.ticket_price;
  const customer_name = req.body.customer_name;

  Product.findById(tktId)
    .then(product => {
      product.performance_title = performance_title;
      product.performance_time = performance_time;
      product.ticket_price = ticket_price;
      product.customer_name = customer_name;
      return product.save();
    })
    .then(result => {
      console.log('UPDATED TICKET!');
      res.redirect('/admin/tickets');
    })
    .catch(err => next(err));
};

exports.getTickets = (req, res, next) => {
  
  Product.find()
    .then(products => {
      res.render('admin/tickets', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/tickets'
      });
      
    })
    .catch(err => {
      console.log(err)
    });
};

exports.postDeleteTicket = (req, res, next) => {
  const tktId = req.body.ticketId;
  Product.findByIdAndRemove(tktId)
    .then(() => {
      console.log('Deleted Ticket');
      res.redirect('/admin/tickets');
    })
    .catch(err => console.log(err));
};

exports.moneyEarned = ( req, res, next) => {
  Product.aggregate([
    { $match: { creation_date : { $gte: new Date('2021-03-17T11:40:19.295+00:00'), $lte: new Date('2021-05-19T11:40:19.295+00:00')}}},
    { $addFields: { month : (new Date("$creation_date")).getMonth()}},
    
  ])
  .then(records => {
    let newdata = records.map(item => {
      item['month'] = new Date(item.creation_date).getMonth().toString();
      return item;
    })
    let obj = {};
    for (let i=0; i< newdata.length; i++) {
      if (Object.keys(obj).includes(newdata[i].month)) {
        obj[[newdata[i].month]] =  obj[[newdata[i].month]]  + newdata[i].ticket_price;
      } else {
      
        obj[[newdata[i].month]]  = newdata[i].ticket_price
      }
    }
    let final = [];
    var month = new Array(12);
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    for (item of Object.keys(obj)) {
      final.push({
        month: month[item],
        summaryProfit: obj[item]
      })
    }
    console.log("final earnings: ", final)
  })

  .catch(err => {
    console.log(err);
  })
}

exports.numberOfCust = ( req, res, next) => {
  Product.aggregate([
    { $match: { creation_date : { $gte: new Date('2021-03-17T11:40:19.295+00:00'), $lte: new Date('2021-05-19T11:40:19.295+00:00')}}},   
  ])
  .then(records => {
    let newdata = records.map(item => {
      item['month'] = new Date(item.creation_date).getMonth().toString();
      return item;
    })
    let obj = {};

    for (let i=0; i< newdata.length; i++) {
      if (Object.keys(obj).includes(newdata[i].month)) {
        obj[[newdata[i].month]] =  obj[[newdata[i].month]]  + 1;
      } else {
      
        obj[[newdata[i].month]]  = 1
      }
    }
    let final = [];
    var month = new Array(12);
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    for (item of Object.keys(obj)) {
      final.push({
        month: month[item],
        summaryVisits: obj[item]
      })
    }
    console.log("monthwise customers: ", final)
  })

  .catch(err => {
    console.log(err);
  })
}
