//Gets the editor textarea from the html file
let editor = document.querySelector('#editor')

//Get the file you want to edit and puts it in the editor
let socket = io()
let text = 'Error'
socket.on('open', data => {
    text = data
    editor.value = text
})


//Save the script to the right file when the save button is clicked
let save = document.querySelector('#save')
save.onclick = () => {
    socket.emit('save', editor.value)  
}

//Reset the editor if the reset button is clicked
let reset = document.querySelector('#reset')
reset.onclick = () => {
    let resetting = prompt('Are you sure you want to reset? All progress will be lost.').toLowerCase()
    if (resetting.match(/y|yes|ya/)) {
        editor.value = text
    } else {
        alert('Not resetting')
    }
    
}

//End the editor if the exit button is clicked
let exit = document.querySelector('#exit')
exit.onclick = () => {
    let closing = prompt('Are you sure you want to exit? All saves will be committed.').toLowerCase()
    if (closing.match(/y|yes|ya/)) {
        socket.emit('close')
        window.close()
    } else {
        alert('Window not closing')
    }
}


let color = document.querySelector('#color')
let font = document.querySelector('#font-family')
let size = document.querySelector('#font-size')
let savePref = document.querySelector('#save-pref')
let textarea = document.querySelector('textarea')

//Preferences button
savePref.onclick = () => {
    textarea.style.color = color.value
    textarea.style.fontFamily = font.options[font.selectedIndex].value
    textarea.style.fontSize = size.options[size.selectedIndex].value + 'px'
}

//Place a character when the user presses ", {, or [
let del = false
let delVal
textarea.onkeypress = e => {
    let val
    if (e.key === 'Delete' && del) {
        
    }

    if (e.key === '{') {
        val = '}'
    } else if (e.key === '"') {
        val = '"'
    } else if (e.key === '[') {
        val = '['
    } else {
        del = false
        return
    }
    if (textarea.selectionStart || textarea.selectionStart == '0') {
        let start = textarea.selectionStart;
        let end = textarea.selectionEnd;
        textarea.value = textarea.value.substring(0, start)
            + val
            + textarea.value.substring(end, textarea.value.length);
    } else {
        myField.value += val
    }
    del = true
    delVal = val
}