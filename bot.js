const token = '1865886053:AAGJO8bLkHo-9gqVpfKqW9ICSqo8ITgW-us'
const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(token,{polling: true})
let usersIdS = []
    let destroy
bot.on ('message',async(msg) => {
    console.log(msg)
    const text = msg.text
    const chatId = msg.chat.id
    let userId = msg.from.id
    const destroyId = userId
    if(text === '/start')
    {
    await bot.sendMessage(chatId,'Enter: @teg and quantity')
    }
    
    let shablon = text.match(/\s(@\w+)/) && text.match(/\s(@\w+)/)[0]
    if(text === `/уничтожь${shablon}`) 
    {
        await bot.sendMessage(chatId,'Так точно!')
        destroy = 1
        usersIdS.push(destroyId)
    }
    console.log(shablon)
    if ((text === '/хватит')&&(msg.from.id === usersIdS[0]))
    {
        await bot.sendMessage(chatId,'Слушаюсь,хазяин!') 
        destroy = 0
    }
    
        if ((text === '/хватит')&&(msg.from.id != usersIdS[0])) 
    {
        await bot.sendMessage(chatId,'Иди нахуй!') 
    }
    //console.log(msg.from.id)
    //console.log(usersIdS)
    if(shablon != null)
    {
        const intervalId1 = setInterval(async() =>
        {
            await bot.sendMessage(chatId,shablon)
            if(destroy != 1)
            {
                clearInterval(intervalId1)
                usersIdS.length = 0
            }
        } ,1500)
    }
    let Q = text.match(/(\d+)$/) && text.match(/(\d+)$/)[0]
    let T = text.match(/^(@\w+)/) && text.match(/^(@\w+)/)[0]
    let i = 0
    if(T != null)
    {
        const intervalId = setInterval(async() =>
        {
            await bot.sendMessage(chatId,T)
            i++
            if(i===Number(Q))
            {
            clearInterval(intervalId)
            }
        } ,1500)
    }
    else
    {
        if((text!='/start')&&(text!='/хватит')&&(text!=`/уничтожь${shablon}`))
        await bot.sendMessage(chatId,'Wrong teg, try again')
    }
})