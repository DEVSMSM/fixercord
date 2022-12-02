# Fixercord

Its Simple Package To which catches and save discord errors and Find Every Bug In Your Code!

<p>
    <a href="https://www.npmjs.com/package/fixercord" target="_blank"><img src="https://nodei.co/npm/fixercord.png?downloads=true&downloadRank=true&stars=true"></a>
  </p>
<a href="https://www.npmjs.com/package/fixercord" target="_blank"><img alt="npm" src="https://img.shields.io/npm/dt/fixercord?logo=npm&style=flat-square"></a>
<a href="https://github.com/devsmsm/fixercord/stargazers" target="_blank"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/devsmsm/fixercord?logo=github&logoColor=white&style=flat-square"></a>

# Download
**You Can download it from npm**:
```
For Discord.js v14 Users:
npm i fixercord
&
For Discord.js v13 Users:
npm i fixercord@0.0.2
```


# Setting Up

**First we Add the module(into your main bot file)**
```js
const Fixer = require("fixercord");
const client = new Discord.Client();
const fix = new Fixer(client, {
  webhook: {id: `Discord Webhook id for error logging`, token: `Discord Webhooktoken for error logging`}
})// You Can Change const fix to global.fix or client.fix to easy defined
```
# Example
**This Example For Logging Error**
```js
client.on('messageCreate', async message => {
 try{
    if(message.author.bot) return;
    if(message.content.startsWith("hello") || message.author.bot) return message.chaneel.send("Hello Welcome!"); 

// the error here is "chaneel" , the right thing is "channel" 
//When The Error Happens Again. error will not send again 
  } catch (error){
    fix.create(client, message.guild.id, message.content, error)
  }
});
```

# Catch Unhandeld Error
**This Code Will Catch All Unhandeld Errors**
```js
process.on('unhandledRejection', async (error) => { 
  fix.create(client,undefined, undefined, error)
});
// Add This Code On Main File
```
# Need Help ?

**For Any Problems Feel Free To Ask Question Or Any Suggestions** ```</SmSm#8700>```