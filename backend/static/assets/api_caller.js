const backend_uri = "http://127.0.0.1:8080";

async function search(word) {
    const response = await fetch('/api/search?w=' + word);
    const data = await response.json();
    document.getElementById('testframe').textContent = JSON.stringify(data);
    return data
}

async function add_word(word, w_type) {
    const data = {'word': word, 'type': w_type};
    const response = await fetch('/api/add_word',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const resp = await response.json();
    console.log(resp.echo)
}

async function get_list(n) {
    const response = await fetch('/api/get_words?n='+n);
    const data = await response.json();
    document.getElementById('testframe').textContent = JSON.stringify(data);
    return data
}