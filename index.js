const SLIDERS = [
  { container: 'Transportation', radius: 40, max: 100, min: 0, step: 1, color: '#ff51a7' },
  { container: 'Food', radius: 80, max: 1000, min: 0, step: 100, color: '#038fff' },
  { container: 'Insurance', radius: 120, max: 200, min: 0, step: 1, color: '#02ff6d' },
  { container: 'Entertainment', radius: 160, max: 100, min: 0, step: 5, color: '#ffff00' },
  { container: 'Healthcare', radius: 200, max: 300, min: 0, step: 5, color: '#91d0f7' }
];

SLIDERS.forEach(item => {
  new CircularSlider(item);
});
