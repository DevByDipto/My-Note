{/**
    //////////////////JWT INSTALL AND USE PROCCESS:////////////////////
1. $ npm install jsonwebtoken
2. var jwt = require('jsonwebtoken');
3. jwt api toiri kora
 //jwt token related api
    app.post("/jwt", (req, res) => {
      const { email } = req?.body;
      // console.log(email);
      const user = email;
      const token = jwt.sign({ user }, "screet", { expiresIn: "1h" });
      res.send( {token} );
    });

4. token genarate korara client side theke observer er moddhe  jwt api te post kora baa bolte pari email ta pathano
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        const userData = { email: currentUser.email };
        // console.log(userData);
        
        axios
          .post("http://localhost:3000/jwt", userData)
          .then((res) => {
            const token = res.data.token
            localStorage.setItem("token",token) // jodi loaclstorage e set korte cai to set korbo nah hoi onno kothaw
          })
          .catch((err) => console.log(err));
      }
      // console.log('state captured', currentUser)
      setLoading(false);
    });


 ///////////////// jodi token cookie te save korte cai and full proccess ta cookie diye korte cai//////////////////////////////

 1. token genarate korara client side theke observer er moddhe  jwt api te post kora baa bolte pari email ta pathano
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        const userData = { email: currentUser.email };
        // console.log(userData);
        
        axios
          .post("http://localhost:3000/jwt", userData)
          .then((res) => {
            const token = res.data.token
            localStorage.setItem("token",token) // jodi loaclstorage e set korte cai to set korbo nah hoi onno kothaw
          })
          .catch((err) => console.log(err));
      }
      // console.log('state captured', currentUser)
      setLoading(false);
    });


2. server side e user er information ta ccept korbo dorkar porle validate o korbo
3. genarate token in server side
//jwt token related api
    app.post("/jwt", (req, res) => {
      const userData = req?.body;
      // console.log(email);
      const user = email;
      const token = jwt.sign(userData, process.env.JWT_ACCESS_SECRET, { expiresIn: "1h" });
      res.send( {success: true} ); // localstorage e save korle res.send({token}) koratm but aikhane just {success: true} pathabo
    });
aibar kaj cookie te set kora---so,
1. npm i cookie-parser
3. akta screat toiri korte hobe tai colsole e giye node likhe enter -> require('crypto').randomBytes(64).toString('hex') liokhe enter
4. JWT_ACCESS_SECRET=ab8b42d1cdb09f409d1c49aeaafaf9adf7eb250d045bdf452bc900c12da7ac804a13c48c2b3a28c336c117ab3974c3a7a1c0182f3e2a31745ae378d116118bd7
aivabe .env te rakhbo
5.const cookieparser = require('cookie-parser')
6. clinet site theke api call koar somoi withCredentials set korte hobe

        axios
          .post("http://localhost:3000/jwt", userData,{withCredentials: true})
          .then((res) => {
            const token = res.data.token
            localStorage.setItem("token",token)
          })
          .catch((err) => console.log(err));
7. server side e o credential o orging set korte hobe
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
})); 

8. cookie ta set korte hobe
 //jwt token related api
    app.post("/jwt", (req, res) => {
      const userData = req?.body;
      // console.log(email);
      const user = email;
      const token = jwt.sign(userData, process.env.JWT_ACCESS_SECRET, { expiresIn: "1h" });
      // set token in the cookie 
      res.cookie('token',token,{
        httpOnly: true,
        secure: false
      })
      res.send( {success: true} );
    });
 

    ///////////////////////client side theke fetche kora data ana with cookies security///////////////////////////////
   1. use cookieParser as midleware 
   app.use(cookieparser())
   2. client side je khan theke fetch korbo sekhane credentials use korte hobe
   fetch(`http://localhost:3000/applications?email=${email}`,{
    credentials:'include'
  })
  .then((res) => res.json());
3. server side e j api te hit kora hocche se api te giye check kore dekte hobe cookies asche kii nah
app.get("/applications", async (req, res) => {
      const email = req.query.email;
      console.log(req.cookies);

      const query = {
        applicant: email,
      };
      const result = await applicationsCollection.find(query).toArray();

      res.send(result);
    });

4. varifyToken function create kora abong tate
-> check token exists. if not ,retune 401--> unathorized
-> jwt veryfy function. if err , retune 401---> unathorized
code:
//verifyToken
const verifyToken=(req,res,next)=>{
  const token = req?.cookies.token
if(!token){
  return res.status(401).send({message: "unathorized access..."})
}
 jwt.verify(token,process.env.JWT_ACCESS_SECRET,(err,decoded)=>{
if(err){
  return res.status(401).send({message: "unathorized access"})
}
// console.log(decoded.email);

req.decoded = decoded // req a keno set korbo res e noi keno ?

next()
 })
}

5. j api te verifyed korbo se api te check kora j token check korar por email ar api theke asa email ak kina

 app.get("/applications", verifyToken, async (req, res) => {
      const email = req.query.email;
      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "forbidden success" });
      }
      const query = {
        applicant: email,
      };
      const result = await applicationsCollection.find(query).toArray();

      res.send(result);
    });
     
///////////////////////firebase token jwt///////////////////////////////////////

1.export const myApplicationsPromise = (email,accessToken) => {

  return fetch(`http://localhost:3000/applications?email=${email}`,{
    credentials:'include',
    headers:{
      authorization:`Beadrer ${accessToken}`
    }
  })
  .then((res) => res.json());
};
2. // firebase verifycation
const firebaseVarifyToken=(req,res,next)=>{
  const authHeader = req.headers.authorization
  console.log(authHeader);
  
}
 firebaseVarifyToken j api ta verify korte cai sai api te call korte hobe
3. go to firebase prject ->settings->project settings->service account
npm i firebase-admin
4.  go to firebase prject ->settings->project settings->service account aikhan theke pawa code ta copy kore bosate hobe
var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
5. doenload private key and use it in var serviceAccount = require("path/to/serviceAccountKey.json"); there
6. token validation er kaj
// firebase verifycation
const firebaseVarifyToken= async(req,res,next)=>{
  const authHeader = req.headers.authorization
  if(!authHeader || !authHeader.startswith('Bearer ')){
  return  res.status(401).send({ message: "unathorized access..." });
  }
  const token = authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).send({ message: "unathorized access..." });
  }
  const userInfo = await admin.auth().verifyIdToken(token)
req.tokenEmail = userInfo.email
  next()
}
  7.  app.get("/applications", firebaseVarifyToken, async (req, res) => {
      const email = req.query.email;
      if (email !== req.tokenEmail) {
        return res.status(403).send({ message: "forbidden success" });
      }
      const query = {
        applicant: email,
      };
      const result = await applicationsCollection.find(query).toArray();

      res.send(result);
    });
    note: .gitignoire file er moddhe firebaseAdminkey.json likhte hobe



     */}

     function addSugar(cup) {
  cup.sugar = 2;
  // return cup; 
}

const myCup = {};
const result = addSugar({});
console.log(result.sugar);