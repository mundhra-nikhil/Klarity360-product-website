import React from 'react';
import assert from 'assert';
import { render, fireEvent } from '@testing-library/react';
import CapabilitiesSection from '../components/sections/CapabilitiesSection';

describe('CapabilitiesSection Component', () => {
  it('renders section and first feature properly', () => {
    const { getByText, getByRole } = render(<CapabilitiesSection />);
    
    // Check main heading
    assert.ok(getByText(/Built for how enterprise data actually moves/i));
    
    // Check tabs
    const tabList = getByRole('tablist');
    assert.ok(tabList);
    
    const tabs = tabList.querySelectorAll('.caps-tab');
    assert.strictEqual(tabs.length, 5);
    
    // First tab should be active
    assert.ok(tabs[0].classList.contains('is-active'));
  });

  it('switches tabs properly', () => {
    const { getByRole } = render(<CapabilitiesSection />);
    const tabList = getByRole('tablist');
    const tabs = tabList.querySelectorAll('.caps-tab');
    
    // Click second tab
    fireEvent.click(tabs[1]);
    
    // Second tab should be active
    assert.ok(tabs[1].classList.contains('is-active'));
    assert.strictEqual(tabs[0].classList.contains('is-active'), false);
  });
});
