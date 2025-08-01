const urlqueryparams = new URLSearchParams();

 console.log(urlqueryparams)
// তুমি যদি পুরো অবজেক্টকেই console.log() করো, সেটা browser console-এ একটা object summary হিসেবে দেখাবে:

// URLSearchParams { size: 0 }
// এখানে size: 0 মানে এই object এ 0টা key-value pair আছে।

console.log(window.location.search);
// aita current query path ta dai

const urlqueryparamssss = new URLSearchParams(window.location.search);
    console.log(urlqueryparamssss.toString());
    console.log(urlqueryparamssss);

    //urlqueryparamssss.toString() aikhane aivabe use korai current query path ta key value akare pawa jai

    // urlqueryparamssss aitar value URLSearchParams { size: 1 }
    // এখানে size: 1 মানে এই object এ 1টা key-value pair আছে।

    // URLSearchParams use korar koi akta lav ase jmn
    //  ate itaration kora jai
    // er moddhe kono object pass korle ta string akare ber hoi  
    // get kore key dile value pawa jai doc dekle bujbo
    // amn onek kichu te use kora jai