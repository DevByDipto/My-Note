{/*
  

📘 JWT Verification সম্পূর্ণ বোঝাপড়া (Note Format)
🔐 ১. jwt.verify(token, secret) কী করে?
Client যখন server-এ একটি request পাঠায়, সে সাথে token পাঠায় (usually via Authorization header)।

Server jwt.verify(token, secret) ব্যবহার করে token টি যাচাই করে।

এটি মূলত ৩টি জিনিস যাচাই করে:

Signature valid কিনা

Token expire হয়ে গেছে কিনা

Token কে modify করা হয়েছে কিনা

🧱 ২. JWT Token গঠিত হয় ৩টি অংশে:
text
Copy
Edit
HEADER.PAYLOAD.SIGNATURE
Header → Algorithm + Type info (e.g., HS256, JWT)

Payload → User data (e.g., { name: "dipto", role: "admin" })

Signature → Server এই Header + Payload কে তার গোপন secret key দিয়ে HMAC করে বানায়

🔁 ৩. Verification-এর ধরন:
js
Copy
Edit
if (generatedSignature === tokenSignature) {
   ✅ Valid token
} else {
   ❌ Invalid or Tampered token
}
এখানে generatedSignature মানে:

Server client পাঠানো token এর header ও payload নিয়ে, নিজের secret দিয়ে আবার hash করে নতুন করে signature বানায়।

এবং সেই signature টি client পাঠানো token এর signature এর সাথে compare করে।

❗ ৪. Server কি আগের token store করে রাখে?
না, JWT পুরোপুরি stateless।

Server কখনোই কোন token বা signature store করে না।
সে শুধুমাত্র নিজের কাছে রাখা secret key দিয়ে token verify করে।

🎯 ৫. তাহলে কি একই payload মানে সবসময় একই signature?
না, সবসময় না।
কারণ JWT তে সাধারণত iat (issued at) এবং exp (expiry) timestamp থাকে।
তাই প্রতিবার jwt.sign() চালালে নতুন timestamp যুক্ত হয় — যার ফলে signature ও বদলায়।

✅ ৬. সারসংক্ষেপে পুরো verification process:
ধাপ	কী হয়
১	Client একটি token সহ request পাঠায়
২	Server token কে তিন ভাগে ভাঙে: header, payload, signature
৩	Server আবার header+payload নিয়ে নিজে generatedSignature বানায়
৪	Server compare করে client পাঠানো signature এর সাথে
৫	Match হলে valid, নাহলে invalid

📌 এক লাইনে মনে রাখো:
🔑 jwt.verify() মানে: token এর header + payload কে নিয়ে আবার signature বানিয়ে client এর পাঠানো signature এর সাথে compare করা — যাতে বোঝা যায় token modify করা হয়েছে কিনা।

এই note-টি তুমি future reference হিসেবে ব্যবহার করতে পারো ✅
চাইলে আমি এটা PDF বা downloadable Markdown file হিসেবেও বানিয়ে দিতে পারি — বললেই করে দিচ্ছি! 
    
    */}