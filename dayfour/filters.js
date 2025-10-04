range.oninput = () => {
      const newValue = range.value;
     document.body.style.setProperty('--position', newValue + '%');
}
