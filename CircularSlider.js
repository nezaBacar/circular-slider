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
    this.value = 0;
    this.dragging = false;

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

    this.updateProgressPath();
    this.addEventListeners();
  }

  updateProgressPath() {
    const svg = document.getElementById('sliders-svg');
    const rect = svg.getBoundingClientRect();
    const center = rect.width / 2;

    const normalizedValue = (this.value - this.options.min) / (this.options.max - this.options.min);
    const angle = normalizedValue * (2 * Math.PI);
    const adjustedAngle = angle - (Math.PI / 2);

    const x = center + this.options.radius * Math.cos(adjustedAngle);
    const y = center + this.options.radius * Math.sin(adjustedAngle);

    const largeArcFlag = this.value > (this.options.max - this.options.min) / 2 ? 1 : 0;
    const startX = center;
    const startY = center - this.options.radius;

    // Path that defines a circular arc relative to the center of the SVG
    const arcPath = `
      M ${startX} ${startY} 
      A ${this.options.radius} ${this.options.radius} 0 ${largeArcFlag} 1 ${x} ${y}`;

    const progress = document.getElementById(`${this.options.container}_progress`);
    progress.setAttribute("d", arcPath);

    const handle = document.getElementById(`${this.options.container}_handle`);
    handle.setAttribute("cx", x);
    handle.setAttribute("cy", y);
  }

  addEventListeners() {
    const track = document.getElementById(`${this.options.container}_track`);
    track.addEventListener("mousedown", this.startDrag.bind(this));
    track.addEventListener("touchstart", this.startDrag.bind(this));

    const progress = document.getElementById(`${this.options.container}_progress`);
    progress.addEventListener("mousedown", this.startDrag.bind(this));
    progress.addEventListener("touchstart", this.startDrag.bind(this));

    const handle = document.getElementById(`${this.options.container}_handle`);
    handle.addEventListener("mousedown", this.startDrag.bind(this));
    handle.addEventListener("touchstart", this.startDrag.bind(this));

    document.addEventListener("mousemove", this.onDrag.bind(this));
    document.addEventListener("touchmove", this.onDrag.bind(this));
    
    document.addEventListener("mouseup", this.endDrag.bind(this));
    document.addEventListener("touchend", this.endDrag.bind(this));
  }

  startDrag(event) {
    // Stop scrolling while dragging
    event.preventDefault();
    this.dragging = true;
    this.updateValue(event);
  }

  onDrag(event) {
    if (this.dragging)
      this.updateValue(event);
  }

  endDrag() {
    this.dragging = false;
  }

  updateValue(event) {
    const svg = document.getElementById('sliders-svg');
    const rect = svg.getBoundingClientRect();
    const center = rect.width / 2;

    const x = event.clientX - rect.left - center;
    const y = event.clientY - rect.top - center;

    const angle = Math.atan2(y, x);

    const alignedAngleToTop = angle < -Math.PI / 2 ? angle + 2 * Math.PI : angle;
    const normalizedAngle = (alignedAngleToTop + Math.PI / 2) / (2 * Math.PI);
    const normalizedValue = normalizedAngle * (this.options.max - this.options.min) + this.options.min;

    this.value = Math.round(normalizedValue / this.options.step) * this.options.step;

    this.updateProgressPath();
  }
}
