const socket = io()

const form = document.getElementById('form')
const title = document.getElementById('title')
const description = document.getElementById('description')
const messages = document.getElementById('messages')

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log(
        form['title'].value,
        form['description'].value,)
    const saveProducts = (title,description) =>{
            socket.emit('newProduct',{
                title,description
        })};
        saveProducts(form['title'].value,form['description'].value);
    if(title.value){
        socket.emit('message', title.value);
        socket.emit('message', description.value);
        title.value = '';
    }
});

socket.on('message', (msg)=>{
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0,document.body.scrollHeight);

})
const loadProducts = () =>{
    socket.on('loadProducts',(data)=>{
    console.log(data);
})};


socket.emit('message','Hola me estoy comunicando desde un websocket')

socket.on('evento_para_socket_individual',data =>(console.log(data)));

socket.on('evento_para_todos_menos_el_socket_actual', data =>(console.log(data)));