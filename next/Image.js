{/*
   ১. Next.js Image Component কী করে?
Next.js এর next/image component:

📦 ছবিকে automatically optimize করে (server-side এ) – যেমন:

image size কমানো

webp format এ রূপান্তর করা

responsive image serve করা (different device size অনুযায়ী)

🧠 এর server-side loader image কে serve করে /_next/image API এর মাধ্যমে।

🖥️ এরপর optimized image client-side এ render হয় <img> tag এর মাধ্যমে।





    2. 🧠 এর server-side loader image কে serve করে /_next/image API এর মাধ্যমে। 
    aii kothar mane kii ?

    এই লাইনের মানে ধাপে ধাপে:
🔸 server-side loader বলতে কী বোঝায়?
Next.js-এর Image component এর পিছনে একটা loader function কাজ করে যেটা server-side এ চলে।

এই loader:

image এর actual URL নেয়

optimize করে

তারপরে একটা special optimized URL তৈরি করে

🔸 /_next/image API এর মাধ্যমে serve করে মানে কী?
Next.js optimized image গুলো serve করে এই special internal API রুট দিয়ে:


/_next/image?url=...&w=...&q=...
🔧 এই path টি browser থেকে request করে optimized image.

"অর্থাৎ, image টা ultimately fetch করে client side এ, optimized image link এর মাধ্যমে"  
*/}