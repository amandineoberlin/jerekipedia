document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('switchoff').addEventListener('click', function() {
    this.style.display = 'none';

    var switchon = document.getElementById('switchon');
    switchon.style.display = 'block';

    var body = document.getElementById('main');
    var glyph = document.getElementById('glyph');
    body.className = 'jerekipedia grey';
    glyph.className = 'glyphicon glyphicon-off glyph-red';

    chrome.runtime.sendMessage({ active: false });
  });

  document.getElementById('switchon').addEventListener('click', function() {
    this.style.display = 'none';

    var switchoff = document.getElementById('switchoff');
    switchoff.style.display = 'block';

    var body = document.getElementById('main');
    var glyph = document.getElementById('glyph');
    body.className = 'jerekipedia green';
    glyph.className = 'glyphicon glyphicon-off glyph-red';

    chrome.runtime.sendMessage({ active: true });
  });

  chrome.runtime.sendMessage({ active: true });
});
