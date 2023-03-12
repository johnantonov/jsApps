document.addEventListener('DOMContentLoaded', function() {
    let number = document.getElementById('number')
    document.getElementById('time').addEventListener('click', function(e) {
        let now = document.getElementById('now')
        now.textContent = number.value
        let timeID = setInterval(function() {
            if (number.value != 0) {
                now.textContent = --number.value
            } else {
                clearInterval(timeID)
            }
        }, 1000)
    })
})