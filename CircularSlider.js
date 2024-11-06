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
  }

  initialize() {
    return this.options;
  }
}
