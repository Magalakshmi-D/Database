const User=require('../models/user');

exports.createUser = async(req,res)=>{
    const {fullname,email,password,confirmpassword} = req.body;
    const isNewUser = await User.isThisEmailInUse(email);
    if(!isNewUser)
        return res.json({
            success:false,
            message:'This email is already use , try another email',
        })
    const user=await User({fullname,email,password,confirmpassword});
    await user.save();
    res.json(user);
};

exports.useSignIn = async(req,res)=>{
    // res.send('sign in');
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(!user) return res.json({success:false,message:'user not found, with the given email!'})

    const isMatch = await user.comparePassword(password)
    if(!isMatch) return res.json({success:false,message:'email / password does not match!'})
    res.json({success:true,user})
};