import feathers from "@feathersjs/feathers"

//this is the interface for the message data
interface Message{
  id?: number;
  text: string;
}

// a message service that allows to create new
//and return all existing messages
class MessageService{
  messages: Message[] = []
  
  async find() {
    //just return all existing messages
    return this.messages;
  }

  async create(data: Pick<Message, 'text'>) { 
    // the new message is the data text with a unique identifier added
    // using the messages length since it changes whenever we add one
    const message: Message = {
      id: this.messages.length,
      text:data.text
    }

    // add new message to the list
    this.messages.push(message)
    return message

  }
}

const app = feathers()

//register the message service on the feathers appllication
app.use('messages', new MessageService())

app.service('messages').on('created', (message: Message) => {
  console.log('A new message was created: ', message)
})

// a function that creeates messags and then logs
// all existing messages on the servicee
const main = async () => {
  //create a new message on our message service
  await app.service('messages').create({
    text:'Hello Feathers'
  })

  //and another onee
  await app.service('messages').create({
    text:"Hello again"
  });
  //find all messages
  const messages = await app.service('messages').find()

  console.log('All messages found:',messages)
}
main()