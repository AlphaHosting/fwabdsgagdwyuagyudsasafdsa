const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = ('-');


client.on('ready', function(){	
    var ms = 40000 ;	
    var setGame =['Fes Maroc RP','http://fmgr.tk'];	
    var i = -1;	
    var j = 0;	
    setInterval(function (){	
        if( i == -1 ){	
j = 1;	
       }	
        if( i == (setGame.length)-1 ){	
            j = -1;	
      }	
       i = i+j;	
        client.user.setGame(setGame[i],`http://www.youtube.com/gg`);	
}, ms);	
    console.log('Bot Is Ready');
});



       
     
       




client.on("message", async message => {
    if(!message.channel.guild) return;
    var prefix = "-";
if(message.content.startsWith(prefix + 'invites')) {
var nul = 0
var guild = message.guild
await guild.fetchInvites()
    .then(invites => {
     invites.forEach(invite => {
        if (invite.inviter === message.author) {
             nul+=invite.uses
            }
        });
    });
  if (nul > 0) {
      console.log(`\n${message.author.tag} has ${nul} invites in ${guild.name}\n`)
      var embed = new Discord.RichEmbed()
          .setColor("#000000")
            .addField(`${message.author.username}`, `You invited **${nul}** Users`)
                  message.channel.send({ embed: embed });
              return;
            } else {
               var embed = new Discord.RichEmbed()
                .setColor("#000000")
                .addField(`${message.author.username}`, `Oops u dont invited any body`)

               message.channel.send({ embed: embed });
                return;
            }
}
});




client.on('message',function(message) {
    let toKick = message.mentions.users.first();
    let toReason = message.content.split(" ").slice(2).join(" ");
    let toEmbed = new Discord.RichEmbed()
   if(message.content.startsWith(prefix + 'kick')) {
       if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply('**# - يجب ان يكون لديك برمشن أداري **');
       if(toKick.bannable) return message.reply("**# - لا أستطيع طرد شخص لديه رتبة أعلى مني!**");
       if(!toReason) return message.reply("**# - Supply a reason!**")
       if(toKick.id === message.author.id) return message.reply("**# لا يمكنك أن تطرد نفسك!**")
       if(!message.guild.member(toKick).bannable) return message.reply("**# - لا أستطيع طرد هذا الشخص!**")
       let toEmbed;
       toEmbed = new Discord.RichEmbed()
       .setTitle("لقد تم طردك من السيرفر!")
       .setThumbnail(toKick.avatarURL)
       .addField("**# - السيرفر:**",message.guild.name,true)
       .addField("**# - السبب:**",toReason,true)
       .addField("**# - طردت من قبل:**",message.author,true)
       if(message.member.hasPermission("KICK_MEMBERS")) return (
           toKick.sendMessage({embed: toEmbed}).then(() => message.guild.member(toKick).kick()).then(() => message.channel.send(`**Done :white_check_mark: Kicked  ${toKick}**`))
       )
       }
});


client.on('message', message => {
    if(!message.channel.guild) return;
  if(message.content.startsWith('-bc')) {
  if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
  if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**للأسف لا تمتلك صلاحية** `ADMINISTRATOR`' );
  let args = message.content.split(' ').slice(1).join(' ');
  let copy = "FMGR STAFF";
  let request = `Requested By ${message.author.username}`;
  if (!args) return message.reply('**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**');message.channel.send(`**هل أنت متأكد من إرسالك البرودكاست؟ \nمحتوى البرودكاست:** \` ${args}\``).then(msg => {
  
  message.guild.members.forEach(m => {
  var bc = new
  Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle('Broadcast')
  .addField('Server', message.guild.name)
  .addField('Sender', message.author.username)
  .addField('Message', args)
  .setThumbnail(message.author.avatarURL)
  .setFooter(copy, client.user.avatarURL);
  m.send({ embed: bc })
  msg.delete();
  })
  })
  
  };
  });

client.on("message", function(message) {
    let toBan = message.mentions.users.first();
    let toReason = message.content.split(" ").slice(2).join(" ");
    let toEmbed = new Discord.RichEmbed()
   if(message.content.startsWith(prefix + "ban")) {
       if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("**# - يجب ان يكون لديك برمشن أداري  **");
       if(!toBan) return message.reply("**# - يجب ان تقوم بمنشن شخص معين**");
       if(toBan.id === ("${client.user.id}")) return message.reply("** لا يمكنك أن تحظرني! **");
       if(toBan === message.member.guild.owner) return message.reply("** لا يمكنك حظر مالك السيرفر!**");
       if(toBan.bannable) return message.reply("**# - لا أستطيع حظر شخص لديه رتبة أعلى مني!**");
       if(!toReason) return message.reply("**# - Supply a reason!**")
       if(toBan.id === message.author.id) return message.reply("** لا يمكنك أن تحظر نفسك!**")
       if(!message.guild.member(toBan).bannable) return message.reply("** # - لا أستطيع حظر هذا الشخص!**")
       let toEmbed;
       toEmbed = new Discord.RichEmbed()
       .setTitle("لقد تم حظرك من السيرفر :wave:مرحبا")
       .setThumbnail(toBan.avatarURL)
       .addField("** # - السيرفر:**",message.guild.name,true)
       .addField("** # - السبب:**",toReason,true)
       .addField("** # - حظرت من قبل:**",message.author,true)
       if(message.member.hasPermission("BAN_MEMBERS")) return (
           toBan.sendMessage({embed: toEmbed}).then(() => message.guild.member(toBan).ban({reason: toReason})).then(() => message.channel.send(`**Done :white_check_mark: Banned  ${toBan}**`))
       );
       
   }
}); 



client.on('message', async message => {
    let args = message.content.split(" ");
    if(message.content.startsWith(prefix + "mute")) {
      if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply('# - ملحوظة :  يجب ان يكون لديك برمشن أداري . ').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });
   
      if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply('# - ملحوظة : يجب ان يكون البوت لديه برمشن أداري').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });
   
      let mention = message.mentions.members.first();
      if(!mention) return message.reply('# - ملحوظة : يجب ان تقوم بمنشن شخص معين .').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });
   
      if(mention.highestRole.position >= message.guild.member(message.author).highestRole.positon) return message.reply('# - ملحوظة : لا يمكنك اعطاء ميوت لشخص اعلي من رتبتك .').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });
      if(mention.highestRole.positon >= message.guild.member(client.user).highestRole.positon) return message.reply('# - ملحوظه : لا يمكنك اعطاء ميوت لشخص اعلي من رتبتك').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });
      if(mention.id === message.author.id) return message.reply('# - ملحوظه : لا يمكنك ان تعطي ميوت لنفسك .').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });
   
      let duration = args[2];
      if(!duration) return message.reply('# - ملحوظه : يجب ان تضع وقت .').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });
   
      if(isNaN(duration)) return message.reply('# - ملحوظه : يجب تحديد وقت زمني صحيح').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });
   
      let sbb = message.content.split(" ").slice(3).join(" ");
      if(!sbb) sbb = "غير معروف .";
   
      let thisEmbed = new Discord.RichEmbed()
      .setAuthor(mention.user.username, mention.user.avatarURL)
      .setTitle('# - لقد تم أعطائك ميوت .')
      .setThumbnail(mention.user.avatarURL)
      .addField('# - السيرفر',message.guild.name,true)
      .addField('# - تم اعطائك ميوت بواسطة',message.author,true)
      .addField('# - السبب',reason)
   
      let role = message.guild.roles.find('name', 'Muted') || message.guild.roles.get(r => r.name === 'Muted');
      if(!role) try {
        message.guild.createRole({
          name: "Muted",
          permissions: 0
        }).then(r => {
          message.guild.channels.forEach(c => {
            c.overwritePermissions(r , {
              SEND_MESSAGES: false,
              READ_MESSAGES_HISTORY: false,
              ADD_REACTIONS: false
            });
          });
        });
      } catch(e) {
        console.log(e.stack);
      }
      mention.addRole(role).then(() => {
        mention.send(thisEmbed);
        message.channel.send(`**:white_check_mark: ${mention.user.username} Muted ! :zipper_mouth:  **  `);
        mention.setMute(true);
      });
      setTimeout(() => {
        if(duration === 0) return;
        if(!mention.has.roles(role)) return;
        mention.setMute(false);
        mention.removeRole(role);
        message.channel.send(`**:white_check_mark: ${mention.user.username} Unmuted **   `);
      },duration * 60000);
    } else if(message.content.startsWith(prefix + "unmute")) {
      let mention = message.mentions.members.first();
      let role = message.guild.roles.find('name', 'Muted') || message.guild.roles.get(r => r.name === 'Muted');
      if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply('# - ملحوظة :  يجب ان يكون لديك برمشن أداري . ').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });
   
      if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply('# - ملحوظة : يجب ان يكون البوت لديه برمشن أداري').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });
   
      if(!mention) return message.reply('# - ملحوظه : يجب منشن شخص لفك الميوت عنهه .').then(msg => {
        msg.delete(3500);
        message.delete(3500);
      });
   
        mention.removeRole(role);
        mention.setMute(false);
        message.channel.send(`**:white_check_mark: ${mention.user.username} Unmuted ! **  `);
    }
  });


client.login(process.env.BOT_TOKEN);
