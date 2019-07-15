class CustomScrollBar {
  constructor() {
    this.containerScroll = document.querySelector('.fa-has-custom-scrollbar');
    this.drag_active = false;
    this.previouse_y = 0;
    this.relativeMouseY = 0;
  }

  scrollEvent(scrollbar) {
    if(!this.drag_active){
      let scrollTop = this.containerScroll.scrollTop;
      let heightContainer = this.containerScroll.offsetHeight;
      let totalHeight = this.containerScroll.scrollHeight;
      let space = heightContainer - scrollbar.offsetHeight; // space free where we move our scrollbar
      let topPosition = // calculate the final position of Scrollbar
        scrollTop +
        space -
        space * ((totalHeight - heightContainer - scrollTop) / (totalHeight - heightContainer));
      if (topPosition < totalHeight - scrollbar.offsetHeight) {
        scrollbar.setAttribute(
          'style',
          `height: ${Math.round(Number(scrollbar.offsetHeight))}px; transform: translateY(${Math.round(
            Number(topPosition)
          )}px)`
        );
      }
      else {
        scrollbar.setAttribute(
          'style',
          `height: ${Math.round(Number(scrollbar.offsetHeight))}px; transform: translateY(${totalHeight -
            scrollbar.offsetHeight}px)`
        );
      }
    }
  }

  mouseUp(){
    this.drag_active = false;
  }

  mouseDown(event){
    this.drag_active = true;
    this.previouse_y = event.pageY;
    
    this.relativeMouseY = event.layerY;
  }

  mouseMove(event, scrollbar){
    if(this.drag_active){
      event.preventDefault();
      let heightContainer = this.containerScroll.offsetHeight;
      let totalHeight = this.containerScroll.scrollHeight;
      let space = heightContainer - scrollbar.offsetHeight;
      let spaceTop = scrollbar.offsetTop;
      
      let movement = event.pageY - this.previouse_y;
      this.previouse_y = event.pageY;
      let fact = (totalHeight - space) / heightContainer;
      let newScrollTop = spaceTop + (movement * fact);
      
      let htmlTopScrollbar = scrollbar.getBoundingClientRect().top;
      let error = event.y -(htmlTopScrollbar + this.relativeMouseY)
      newScrollTop += error;
      
      if(newScrollTop < 0){
        newScrollTop = 0;
      }
      if(newScrollTop > (totalHeight-scrollbar.offsetHeight)){
        newScrollTop = totalHeight-scrollbar.offsetHeight;
      }
     
      console.log(error);
      
      //scrollbar.style.top = newScrollTop+'px';
      scrollbar.setAttribute(
          'style',
          `height: ${Math.round(Number(scrollbar.offsetHeight))}px; top: ${newScrollTop}px;)`
        );
      //scroll page
      this.containerScroll.scrollTop = newScrollTop*(totalHeight-heightContainer)/(totalHeight-heightContainer+space);
    }
  }

  load() {
    if (!this.containerScroll) return;
    // Create the custom scrollbar and add it to the container
    const scrollbar = document.createElement('div');
    this.containerScroll.appendChild(scrollbar);
    scrollbar.classList.add('fa-custom-scrollbar');
    // Get height of container and total height taken from object inside
    let heightContainer = this.containerScroll.offsetHeight;
    let height = this.containerScroll.scrollHeight;
    // Set the dimension of the scrollbar
    let ratio = height / heightContainer;
    if (ratio <= 1) {
      // If we don't have enought elements inside the container the newBar doesn't need
      scrollbar.setAttribute('style', 'height: 0');
    } else {
      const barHeight = scrollbar.offsetHeight / ratio;
      scrollbar.setAttribute('style', `height: ${barHeight}px`);
      // Add listener to manage scroll with mouse wheel
      this.containerScroll.addEventListener('scroll', () =>
        this.scrollEvent(scrollbar, barHeight)
      );
      // Add listener to manage scroll with drag and drop of scrollbar
      document.addEventListener('mousemove', (event) => this.mouseMove(event, scrollbar, barHeight));
      document.addEventListener('mouseup', () => this.mouseUp());
      scrollbar.addEventListener("mousedown", (event) => this.mouseDown(event));
    }
  }
}

let customScrollbar = new CustomScrollBar();
customScrollbar.load();