{
  /*
  ///////////////JWT ER KAJ://////////////////
    1. 🔒 Role-based access control (RBAC) সহজ হয়ে যায়।
    {
  "email": "dipto@example.com",
  "role": "admin"
}
এর মানে, token দেখে server বুঝতে পারে:

এই ইউজার admin কিনা?

তাকে কি delete বা edit করার অনুমতি দেওয়া হবে?
2. jet er token ta 3 jagai rakha possible 
   -> localstorage
   ->cookies
   ->memory/state/variable/context etc 
3. token er moddhe tin ta jinis thake :
    ->1st dot er moddhe thake header(ate thake jinista kii ar kii kaje eta bebohar hocche)
    ->2nd dot er moddhe thake payLoad(ata te kichu data thake email ta kar tar role kii amn)
    ->3rd dot er moddhe thake signature
4.jwt.sign() mane holo notun akjon user asche tar jonno akta tken genarate korbe



/////////KICHU JINIS BUJTE HOBE:///////////////
1.🧩 ৮. Scalability Angle
JWT server-এ কোনো session store করে না। সুতরাং তুমি হাজার হাজার ইউজার একসাথে handle করতে পারো সহজে — কোনো performance issue ছাড়াই।
2. jwt er bivinno usecase gulo kothai kothai jwt amake subidha dicche jmn url hack nah korte para
3. tin car vabe j jwt use kora jai tar syntex o protita code er mane
4. jwt cookie te set kora save keno ?
5. jwt.sign(payload, secretOrPrivateKey, [options, callback]) ar details
6. jwt token banate app.post() api keno banano hoi? get keno nah?
7. cookie parser install korte hobe bujbo kivabe ?
8. official doc kothai pabo jekhane step by step dewa thakbe cookie niye kivabe kaj korbo? 
9. jwt ar full process ta kothaw kii doc akare ase kina
10. process.env.JWT_ACCESS_SECRET a j secreat ta banaisi ta bananor dorkar ta kii ?
11.// set token in the cookie 
      res.cookie('token',token,{
        httpOnly: true,
        secure: false
      }) 
aikhane express bujlo kivabe j kon user er web e cookie ta save korte hobe?

12. jokhon ami prothombar page e asi baa page reload dii tokhon server side theke akta token amake dai ar ami jokhon server side theke kono data access pete cai tokhon client side theke oi token ta pathai and server side oi tokenta validate kore. tarmane kii serverside client side ke j token ta pathai taa se mone rakhe ? ar tar karone client side sai token ta abar pathale server side ta valid kina check korte pare?

13. const verifyToken=(req,res,next)=>{
console.log("work");
 console.log(req?.cookies);
} aikhane req,res,next aii argument gulo pacche kivabe application api e verifyToken function call korar somoi to ami aii paramiter gulo pass korinai
 
14.  jwt.verify(token,process.env.JWT_ACCESS_SECRET,(err,decoded) aikhane verify ta kore kivabe ? process.env.JWT_ACCESS_SECRET er dorkar kii ?

15. export const myApplicationsPromise = (email,accessToken) => {

  return fetch(`http://localhost:3000/applications?email=${email}`,{
    credentials:'include', aii khetre kii aita importent ??
    headers:{
      authorization:`Beadrer${accessToken}`
    }
  })
  .then((res) => res.json());
}; 

16.app.get("/applications", firebaseVarifyToken, async (req, res) => {} 
  aikhane firebaseVarifyToken ta {} vitor call nah kore aii line e keno kora hoi?
  noramally kono func call korle ta to function er body te call kori tahole aikhane amn keno ? 

  17.  headers:{
      authorization:`Beadrer${accessToken}`
    } headers er moddhe e keno pathai? ?

18. const varifyTokenEmail = (req, res, next) => {
  const email = req.query.email;
  if (email !== req.tokenEmail) {
    return res.status(403).send({ message: "forbidden success" });
  }
  next();
};
varifyTokenEmail aitake midleweare boltesi keno ?












//////////////////JWT USE NAH KORLE KII HOBE://////////////////
1. j urle diye ami signin korsi oii url ta te just email ta change kore dile onner data diye dibe
    




    */
}


{/*
  v61.5 er first e j usecase ta bolse ta buja
  
  */}