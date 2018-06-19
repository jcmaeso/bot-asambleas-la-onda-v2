exports.commandArgs = (ctx, next) => {
  console.log("funciono");
    if (ctx.updateType === 'message' && ctx.updateSubType === 'text') {
      const text = ctx.update.message.text.toLowerCase();
      if (text.startsWith('/')) {
        const match = text.match(/^\/([^\s]+)\s?(.+)?/);
        let args = [];
        let command;
        if (match !== null) {
          if (match[1]) {
            command = match[1];
          }
          if (match[2]) {
            args = match[2];
          }
        }
  
        ctx.state.command = {
          raw: text,
          command,
          args,
        };
      }
    }
    return next();
};
  