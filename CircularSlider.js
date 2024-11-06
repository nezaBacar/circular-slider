const STROKE_WIDTH = 18;
const SVG_URL = "http://www.w3.org/2000/svg";
class CircularSlider {
  constructor(options) {
    const defaultOptions = {
      container: 'Unknown',
      color: '#3498db',
      max: 100,
      min: 0,
      step: 1,
      radius: 50
    };

    this.options = { ...defaultOptions, ...options };

    this.initialize();
  }

  initialize() {
    let svg = document.getElementById('sliders-svg');
    const rect = svg.getBoundingClientRect();
    const center = rect.width / 2;

    // Track circle
    const track = document.createElementNS(SVG_URL, "circle");
    track.setAttribute("cx", center);
    track.setAttribute("cy", center);
    track.setAttribute("r", this.options.radius);
    track.setAttribute("stroke", '#ddd');
    track.setAttribute("stroke-width", STROKE_WIDTH);
    track.setAttribute("fill", "none");
    track.setAttribute("id", `${this.options.container}_track`);

    // Progress path
    const progress = document.createElementNS(SVG_URL, "path");
    progress.setAttribute("stroke", this.options.color);
    progress.setAttribute("stroke-width", STROKE_WIDTH);
    progress.setAttribute("fill", "none");
    progress.setAttribute("stroke-linecap", "round");
    progress.setAttribute("id", `${this.options.container}_progress`);

    // Handle
    const handle = document.createElementNS(SVG_URL, "circle");
    handle.setAttribute("r", STROKE_WIDTH/2 + 4);
    handle.setAttribute("fill", '#fff');
    handle.setAttribute("stroke", '#ddd');
    handle.setAttribute("stroke-width", 2);    
    handle.setAttribute("id", `${this.options.container}_handle`);

    svg.appendChild(track);
    svg.appendChild(progress);
    svg.appendChild(handle);

    this.setPosition();
  }

  setPosition() {
    
  }
}
