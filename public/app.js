document.addEventListener('click', event => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id

    remove(id).then(() => {
      event.target.closest('li').remove()
    })
  }

  if(event.target.dataset.type === 'update') {
    const updatedNote = prompt('Введите новое название')
    if(updatedNote) {
      const id = event.target.dataset.id

      update(id, {data:updatedNote}).then(()=>{
        event.target.closest('li').innerHTML=`${updatedNote}
                    <button class="btn btn-primary" data-type="update" data-id=id>Редактировать</button>

            <button class="btn btn-danger" data-type="remove" data-id=id>&times;</button>`
      })
    }
  }
})


async function remove(id) {
  await fetch(`/${id}`, {method: 'DELETE'})
}

async function update(id, data) {
  await fetch(`/${id}`, {method: 'PUT', headers:{
    'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}