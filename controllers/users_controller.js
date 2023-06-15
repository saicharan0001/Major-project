module.exports.users=function(req,res){
    res.send('iam at user');
}
module.exports.profile=function(req,res){
    res.render('user_profile',{
        title:'user_profile'
    })
}