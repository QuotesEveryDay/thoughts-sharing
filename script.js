window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    let isDrawing = false;
    let currentColor = '#000';
    let currentSize = 5;
  
    // Set up drawing functionality
    function startDrawing(event) {
      isDrawing = true;
      context.beginPath();
      context.moveTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
    }
  
    function draw(event) {
      if (!isDrawing) return;
      context.strokeStyle = currentColor;
      context.lineWidth = currentSize;
      context.lineTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
      context.stroke();
    }
  
    function stopDrawing() {
      isDrawing = false;
    }
  
    // Event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
  
    // Color picker
    const colorPicker = document.getElementById('colorPicker');
    colorPicker.addEventListener('change', () => {
      currentColor = colorPicker.value;
    });
  
    // Hex color input
    const hexInput = document.getElementById('hexInput');
    hexInput.addEventListener('input', () => {
      currentColor = hexInput.value;
    });
  
    // Size slider
    const sizeSlider = document.getElementById('sizeSlider');
    const sizeText = document.getElementById('sizeText');
  
    sizeSlider.addEventListener('input', () => {
      currentSize = sizeSlider.value;
      sizeText.value = currentSize;
    });
  
    // Save drawing
    const saveBtn = document.getElementById('saveBtn');
    saveBtn.addEventListener('click', () => {
      const drawingName = document.getElementById('drawingName').value;
      const imageData = canvas.toDataURL(); // Get the image data URL
  
      // Save drawing to local storage
      const savedDrawings = JSON.parse(localStorage.getItem('savedDrawings')) || [];
  
      if (savedDrawings.length >= 5) {
        alert('Max drawings reached!');
        return;
      }
  
      savedDrawings.push({ name: drawingName, image: imageData });
      localStorage.setItem('savedDrawings', JSON.stringify(savedDrawings));
  
      // Display the saved drawings
      displaySavedDrawings();
  
      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      document.getElementById('drawingName').value = '';
    });
  
    // Clear canvas
    const clearBtn = document.getElementById('clearBtn');
    clearBtn.addEventListener('click', () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    });
  
    // Delete drawing
    function deleteDrawing(index) {
      const savedDrawings = JSON.parse(localStorage.getItem('savedDrawings'));
      savedDrawings.splice(index, 1);
      localStorage.setItem('savedDrawings', JSON.stringify(savedDrawings));
      displaySavedDrawings();
    }
  
    // Display saved drawings
    function displaySavedDrawings() {
      const savedDrawingsContainer = document.getElementById('savedDrawingsContainer');
      savedDrawingsContainer.innerHTML = '';
  
      const savedDrawings = JSON.parse(localStorage.getItem('savedDrawings')) || [];
      savedDrawings.forEach((drawing, index) => {
        const savedDrawing = document.createElement('div');
        savedDrawing.classList.add('savedDrawing');
  
        const imageElement = document.createElement('img');
        imageElement.src = drawing.image;
        imageElement.alt = drawing.name;
  
        const drawingNameElement = document.createElement('div');
        drawingNameElement.classList.add('savedDrawingName');
        drawingNameElement.textContent = drawing.name;
  
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '&#128465;'; // Trash bin icon
        deleteButton.classList.add('deleteButton');
        deleteButton.addEventListener('click', () => deleteDrawing(index));
  
        savedDrawing.appendChild(imageElement);
        savedDrawing.appendChild(drawingNameElement);
        savedDrawing.appendChild(deleteButton);
        savedDrawingsContainer.appendChild(savedDrawing);
  
        // Show border only for the newly saved drawing
        if (index === savedDrawings.length - 1) {
          savedDrawing.classList.add('showBorder');
        }
      });
  
      if (savedDrawings.length > 0) {
        savedDrawingsContainer.classList.add('show'); // Show the container if there are saved drawings
      }
    }
  
    displaySavedDrawings();
  });
  