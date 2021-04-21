function execute(msg, arg) {
  console.log(msg);
  msg.reply("pong");
}
module.exports = { name: "ping", description: "Ping!", execute };
