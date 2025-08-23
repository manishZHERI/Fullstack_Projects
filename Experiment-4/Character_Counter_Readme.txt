CHARACTER COUNTER APP – DESCRIPTION & BREAKDOWN

HTML Structure Breakdown
1. Container (.container)
   - Purpose: Wraps the entire layout in a centered, card-like box.
   - Effect: Provides a clean and focused area for user input and counter display.

2. Textarea (#txtData)
   - Purpose: Allows users to type or paste text.
   - Property: oninput="showCount()" → Automatically triggers the counter update whenever the user types.
   - Effect: Interactive input area for real-time character (and word) counting.

3. Counter Display (#counter / spans)
   - Purpose: Shows the number of characters (and optionally words).
   - Effect: Updates dynamically with every keystroke.

-------------------------------------------------------

CSS Styling Breakdown
1. body
   - Background: #f8f9fa → Light gray tone for a subtle, clean look.
   - Font: Arial, sans-serif → Simple and readable typography.

2. .container
   - Purpose: Main card-style wrapper.
   - Properties & Effects:
     - max-width: 500px; → Prevents the box from stretching too wide.
     - margin: 60px auto; → Centers the box both vertically & horizontally.
     - background: #fff; → Clean white background for contrast.
     - border-radius: 10px; → Rounded corners for a modern look.
     - box-shadow: 0 4px 16px rgba(0,0,0,0.08); → Subtle elevation effect.
     - padding: 32px 24px; → Adequate spacing inside the container.

3. textarea
   - Purpose: Input area styling.
   - Properties & Effects:
     - width: 100%; → Stretches full width.
     - min-height: 120px; → Comfortable typing space.
     - font-size: 1.7em; → Large, readable text.
     - border-radius: 6px; → Smooth rounded edges.
     - border: 1px solid #ccc; → Light gray border for definition.

4. #counter
   - Purpose: Counter text styling.
   - font-weight: bold; → Highlights the number.
   - color: #007bff; → Blue accent color for emphasis.

5. .row / .mt-5
   - Purpose: Layout spacing.
   - margin-bottom: 18px; and margin-top: 2.5rem; → Prevents clutter and adds breathing space.

-------------------------------------------------------

JavaScript Logic Breakdown
1. Function: showCount()
   - Fetches text value from textarea (#txtData).
   - Calculates character count using .length.
   - Updates the counter display (#counter) in real-time.

2. Optional Extension
   - Can also calculate word count using text.trim().split(/\s+/) and display it alongside characters.

-------------------------------------------------------

LEARNING OUTCOMES
1. How to create a real-time character counter in HTML, CSS, and JavaScript.
2. How to use event handling (oninput) to update UI dynamically.
3. How to style a modern card-like container with shadows, rounded corners, and spacing.
4. How to apply JavaScript string methods (length, split, trim) for text analysis.
