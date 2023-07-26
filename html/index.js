// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    let navbar = document.getElementsByTagName("nav");
    let logo = document.getElementById("logo");
    let navbar_parent = navbar[0].parentElement;
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    navbar[0].style.height = `${60}px`;
    logo.style.fontSize = '24px';
    navbar_parent.style.opacity = '.8';
  } else {
    navbar[0].style.height = `${100}px`;
    logo.style.fontSize = '36px';
    navbar_parent.style.opacity = '1';
  }
}


/*Image previewer modal */
function showFullscreenImage(imageElement) {
    const modal = document.getElementById('fullscreen-modal');
    const fullscreenImage = document.getElementById('fullscreen-image');
  
    fullscreenImage.src = imageElement.src;
    modal.className = "modal modal-show";
    //modal.style.display = 'block';
  }
  
  function closeFullscreenImage() {
    const modal = document.getElementById('fullscreen-modal');
    //modal.style.display = 'none';
    modal.className = ["modal"];
  }

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
      // Add your desired action or function here.

      // For example, you can call another function:
       closeFullscreenImage();
    }
  });