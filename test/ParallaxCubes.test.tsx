import React from 'react';
import assert from 'assert';
import { render } from '@testing-library/react';
import ParallaxCubes from '../components/ui/ParallaxCubes';

describe('ParallaxCubes Component', () => {
  it('renders HOME_CUBES when staticMode is false', () => {
    const { container } = render(<ParallaxCubes staticMode={false} />);
    // HOME_CUBES has 8 elements
    const cubes = container.querySelectorAll('.parallax-cube-wrapper');
    assert.strictEqual(cubes.length, 8);
  });

  it('renders DOCS_CUBES when staticMode is true', () => {
    const { container } = render(<ParallaxCubes staticMode={true} />);
    // DOCS_CUBES has 5 elements
    const cubes = container.querySelectorAll('.parallax-cube-wrapper');
    assert.strictEqual(cubes.length, 5);
  });
});
