const Discord = require("discord.js")
class handling {
  constructor(client, options = {}){
    this.client = client;
    this.webhook = (options.webhook? new Discord.WebhookClient(options.webhook) : false);
    this.stats = options.stats || false;
    if(!this.client) throw new Error('Discord_Client_not_provided', 'missing', 'specified.');
    if(!this.webhook) throw new Error('Webhook_Token_or_Id_not_provided', 'missing', 'specified.');
    this.client.error = new Map();
  }
 


  
  async create(client, guildId, msg, error) {
    if (!client) throw new TypeError("An client was not provided.");
    if (!error) throw new TypeError("An error was not provided.");
    if(!this.webhook) throw new TypeError("You did not added a webhook id or a token in the options");
    const clean = text => {                 
      text = String(text);                 
      let searched = text.split('\n');   
      return searched[0];                
    }
    let cleaned = clean(error);
        if (client.error.has(cleaned)){
        client.error.set(cleaned, { 
        guildid: guildId,
        msg: msg, 
        stack: error.stack,
        error: cleaned , 
        count: client.error.get(cleaned).count +1,
        date: Date.now(),
        msgid: client.error.get(cleaned).msgid,
        channelid: client.error.get(cleaned).channelid,

      });
     
    }else{
      if(client.error.has("allerrors")){
        let allerrors = client.error.get("allerrors").allerrors
        allerrors.push(cleaned)
        client.error.set("allerrors", {
          allerrors: allerrors,
        })
    }else{
        client.error.set("allerrors", {
            allerrors: [cleaned],
        })
     }

      let log = new  Discord.EmbedBuilder();
      log.setTitle("New Error Appeared!")
      if(msg){
       log.addFields([{name:`The Error Was in This Guild **${guildId}**` , value: "```" +  msg +"```"}])
      }
      log.addFields([{ name:"Error", value: "```\njs" +  smaller(error.stack,800 ) +"```"}])
      log.setColor("Red")
      log.setTimestamp();

  
      const servermessage = await this.webhook.send({embeds: [log]});  
      console.log(error)
      client.error.set(cleaned, { 
        guildid: guildId,
        msg: msg, 
        error: cleaned, 
        count: 1,
        stack: error.stack,
        date: Date.now(),
        msgid: servermessage.id,
        channelid: servermessage.channel_id,
      });
    }
    return;
  }
 
   async report(client ,message) {
    try{
      if (!message || !client) throw new TypeError("A client or message was not provided.");
      let allerror = [];
      let count = 0;
      let i;
      if(client.error.has("allerrors")){
    
      for(i = 0; i < client.error.get("allerrors").allerrors.length ; i++){
        let error = client.error.get(client.error.get("allerrors").allerrors[i])
        allerror.push(`**[${error.error}](https://discord.com/channels/${message.guild.id}/${error.channelid}/${error.msgid})** - **${error.count} **`)
        count = count + error.count;
      }
    }
    if(!allerror[0]) allerror.push("No Errors have been found!");
    let report = new Discord.EmbedBuilder();
    report.setTitle("Error Message - Count");
    report.setDescription("```" + i + " Errors happend " + count +" times" + "```\n" + smaller(allerror.join("\n"), 1800));
    report.setFooter({text:"Requested by: " + message.author.tag , iconURL: message.author.displayAvatarURL()});
    report.setTimestamp();
    report.setColor("Yellow");
    message.channel.send({embeds: [report]});
    return;
}catch(error){
  console.log(error);
}
}
 
   

}

module.exports = handling;
function smaller(string, limit){
  if(string.length <= limit){
    return string;
  }
  return string.slice(0,limit) + '...';
}