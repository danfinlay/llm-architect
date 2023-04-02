<button id="save-button" onclick="save()">Save</button>
<button id="export-button" onclick="export(document.getElementById('file-format-dropdown').value, document.getElementById('file-location-input').value)">Export</button>
<select id="file-format-dropdown">
  <option value="pdf">PDF</option>
  <option value="png">PNG</option>
  <option value="jpeg">JPEG</option>
</select>
<input type="text" id="file-location-input">
<div id="error-message-display"></div>

<script>
  function save() {
    // save logic here
  }
  
  function export(fileFormat, fileLocation) {
    // export logic here
  }
  
  function validate() {
    // validation logic here
  }
  
  function setGraphicDesign(graphicDesign) {
    // set graphic design logic here
  }
  
  function setCode(code) {
    // set code logic here
  }
  
  function getGraphicDesign() {
    // get graphic design logic here
  }
  
  function getCode() {
    // get code logic here
  }
  
  // Improvement: Add error message display logic
  function displayErrorMessage(errorMessage) {
    document.getElementById('error-message-display').innerHTML = errorMessage;
  }
  
  // Improvement: Call validate() and displayErrorMessage() when export button is clicked
  document.getElementById('export-button').addEventListener('click', function() {
    var errorMessage = validate();
    if (errorMessage) {
      displayErrorMessage(errorMessage);
    } else {
      displayErrorMessage('');
      export(document.getElementById('file-format-dropdown').value, document.getElementById('file-location-input').value);
    }
  });
</script>