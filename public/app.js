'use strict';

(function() {
  const form = document.getElementsByTagName('form')[0];
  const input = document.getElementById('search');
  const results = document.getElementById('results');
  const recent = document.getElementById('recent');

  input.addEventListener('focus', function(event) {
    recent.style.display = 'block';
    fetchRecentSearches(recent);
  });

  input.addEventListener('blur', function(event) {
    // recent.style.display = 'none';
  });

  recent.addEventListener('click', function(event) {
    input.value = event.target.textContent;
    recent.style.display = 'none';
    fetchImages(input.value, results);
  });

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    recent.style.display = 'none';
    fetchImages(input.value, results);
  });

  function fetchRecentSearches(target) {
    fetch('/recent')
      .then(res => res.json())
      .then(searches => appendRecentSearches(searches, target))
      .catch(err => console.error(err));
  }

  function appendRecentSearches(searches, target) {
    target.innerHTML = '';
    for (let i = 0; i < searches.length; i++) {
      const li = document.createElement('li');
      li.textContent = searches[i].query;
      target.appendChild(li);
    }
  }

  function fetchImages(query, target) {
    fetch('/search/' + encodeURIComponent(query))
      .then(res => res.json())
      .then(images => appendImages(images, target))
      .catch(err => console.error(err));
  }

  function appendImages(images, target) {
    target.innerHTML = '';
    for (let i = 0; i < images.length; i++) {
      const div = document.createElement('div');
      const a = document.createElement('a');
      const img = document.createElement('img');
      const title = document.createElement('span');
      a.href = images[i].url;
      a.target = '_blank';
      img.src = images[i].sizes.small[320] || images[i].sizes.small[240];
      img.title = images[i].title;
      a.appendChild(img);
      a.appendChild(title);
      div.appendChild(a);
      target.appendChild(div);
    }
  }
})();
