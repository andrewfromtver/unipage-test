function auth(key, type, time, lang) {
  let xhr = new XMLHttpRequest();

  return new Promise((resolve) => {

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        resolve(xhr);
      }
      else {
        return;
      }
    };

    xhr.open('GET', `https://api.themoviedb.org/3/trending/${type}/${time}?api_key=${key}&language=${lang}`);
    xhr.send();
  });
}

$('#search').click( () => {
  event.preventDefault();

  let key = $('#key').val(),
      type = $('#type').val(),
      time = $('#time').val(),
      lang = $('#lang').val(),
      res = auth(key, type, time, lang);

  res
    .then( (e) => {
      let result = $('#result')[0];
      if (e.status == 200) {
        result.innerHTML = '';
        JSON.parse(e.response).results.forEach(e => {
          result.innerHTML += `
            <h3 style="text-align: center;">${e.title || e.name || '¯|_(ツ)_|¯'}</h3>
            <p style="text-align: center;">${e.overview || '¯|_(ツ)_|¯'}</p>
          `; 
        });;
      }
      else {
        alert(JSON.parse(e.response).status_message);
      }
    })
});