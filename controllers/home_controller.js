//module.exports.action(fn name) = function(req,res){};

module.exports.home=function(req,res){
    console.log(req.cookies);
    res.cookie('charan','20');
    return res.render('home',{
        title:'Home'
    });
}
module.exports.users=function(req,res){
    return res.send('<h1> you are in users page </h1>');
}
module.exports.orders=function(req,res){
    return res.send('you are in orders');
}