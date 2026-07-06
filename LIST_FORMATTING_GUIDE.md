# Developer Guide: Formatting Lists in the KLARITY360 Documentation

## 1. The Issue: Broken Ordered Lists
In the original HTML for the "Klarity360 – Insight Agent Migration Tool" documentation, the ordered lists (like "Step 2: Add the Workload from Workload Hub") were rendering as **1. 1. 1. 1.** instead of **1. 2. 3. 4.**.

**Why?** The HTML generator or author wrapped every single `<li>` in its own `<ol>` tag so that they could insert an `<img ...>` tag inside a paragraph block between the steps. Every time a new `<ol>` tag is opened, the browser resets the counter back to 1.

## 2. The Solution: Nested Images
To fix this, **all list items must be contained within a single `<ol>` tag**. Any supplemental content, such as images or paragraphs describing that step, must be nested *inside* the respective `<li>` tag.

### ❌ Incorrect Pattern (Do Not Use)
```html
<ol>
  <li>Step 1 text</li>
</ol>
<p><img src="..."></p>
<ol>
  <li>Step 2 text</li>
</ol>
```

### ✅ Correct Pattern (Use This)
```html
<ol class="list-decimal pl-6 mb-6 space-y-2 text-docs-text-secondary">
    <li>
        Step 1 text
        <p class="mt-2"><img src="..." alt="" /></p>
    </li>
    <li>
        Step 2 text
        <p class="mt-2"><img src="..." alt="" /></p>
    </li>
</ol>
```

## 3. Tailwind CSS Classes Standard

When implementing or fixing lists in the documentation, maintain the existing Tailwind utility classes used in the original design system to ensure visual consistency:

* **Ordered List Container (`<ol>`)**: `list-decimal pl-6 mb-6 space-y-2 text-docs-text-secondary`
* **Primary Bold Text (`<strong>`)**: `font-semibold text-docs-text-primary`
* **Image Paragraph Wrapper (`<p>`)**: Add `mt-2` or similar vertical spacing so the image doesn't crowd the text of the step.
* **Section Headers (`<h2>`)**: `text-3xl font-light tracking-tight mt-12 mb-6`

## 4. Full Corrected Code Block for Step 2

Use the following structure as the baseline template for Step 2 and all subsequent numbered steps that require inline images.

```html
<h2 id="step-2-add-the-workload-from-workload-hub" class="text-3xl font-light tracking-tight mt-12 mb-6">Step 2: Add the Workload from Workload Hub</h2>

<ol class="list-decimal pl-6 mb-6 space-y-2 text-docs-text-secondary">
    
    <li>
        Go to the&nbsp;<strong class="font-semibold text-docs-text-primary">Workload Hub</strong>&nbsp;(you can find it in the Fabric navigation menu).
        <p class="mt-2"><img src="/images/extracted/img_63510573.png" alt="" /></p>
    </li>
    
    <li>
        Search for <strong class="font-semibold text-docs-text-primary">“Klarity360”</strong>
        <p class="mt-2"><img src="/images/extracted/img_0f22933d.png" alt="" /></p>
    </li>
    
    <li>
        Click&nbsp;<strong class="font-semibold text-docs-text-primary">Learn More</strong>&nbsp;to install the workload. You can add it either to a specific&nbsp;<strong class="font-semibold text-docs-text-primary">capacity</strong>&nbsp;or directly to a&nbsp;<strong class="font-semibold text-docs-text-primary">workspace</strong>&nbsp;where you intend to use it.
        <p class="mt-2"><img src="/images/extracted/img_f6544d8c.png" alt="" /></p>
    </li>
    
    <li>
        Click on <strong class="font-semibold text-docs-text-primary">Add.</strong>
        <p class="mt-2"><img src="/images/extracted/img_5854f9ff.png" alt="" /></p>

    </li>

</ol>
```
