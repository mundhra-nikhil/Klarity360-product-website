import React from 'react';
import assert from 'assert';
import { render, fireEvent } from '@testing-library/react';
import FeatureArchitectureExplorer from '../components/sections/feature-explorer/FeatureArchitectureExplorer';
import { featureDiagrams } from '../lib/feature-diagrams';

describe('FeatureArchitectureExplorer Component', () => {
  it('renders correctly with given feature diagram', () => {
    const props = featureDiagrams[0];
    const { getByText, container } = render(<FeatureArchitectureExplorer {...props} />);
    
    // Check title renders
    assert.ok(getByText(props.title));
    
    // Check if the steps render
    props.steps.forEach(step => {
      const els = container.querySelectorAll('.fae-step-title');
      assert.ok(els.length > 0);
    });
    
    // Check if there are rendered tiles (nodes)
    const tiles = container.querySelectorAll('.fae-tile');
    assert.ok(tiles.length > 0);
  });
  
  it('changes active step on click', () => {
    const props = featureDiagrams[0];
    const { container } = render(<FeatureArchitectureExplorer {...props} />);
    
    // Default first step is active, click on the second step
    if (props.steps.length > 1) {
      const stepTitles = container.querySelectorAll('.fae-step-title');
      if (stepTitles.length > 1) {
        fireEvent.click(stepTitles[1]);
        const stepButton = stepTitles[1].closest('.fae-step');
        assert.ok(stepButton?.classList.contains('is-active'));
      }
    }
  });
});
