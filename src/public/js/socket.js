const socket = io()

const form = document.getElementById('form')
const input = document.getElementById('input')
const messages = document.getElementById('messages')

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(input.value){
        socket.emit('message', input.value);
        input.value = '';
    }
});

socket.on('message', (msg)=>{
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0,document.body.scrollHeight);

})
socket.on('loadProducts',(data)=>{
    console.log(data);
});
socket.emit('message','Hola me estoy comunicando desde un websocket')

socket.on('evento_para_socket_individual',data =>(console.log(data)));

socket.on('evento_para_todos_menos_el_socket_actual', data =>(console.log(data)));